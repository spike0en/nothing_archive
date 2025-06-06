#!/bin/bash
#
# SPDX-FileCopyrightText: luk1337
# SPDX-License-Identifier: MIT
#
# Modified by: spike0en

# === Configuration ===
# Exit immediately if a command exits with a non-zero status.
set -e

# Get number of available CPU cores and limit to maximum of 32 for optimal performance
DETECTED_CORES=$(nproc)
CORES=$((DETECTED_CORES > 32 ? 32 : DETECTED_CORES))
echo "Detected $DETECTED_CORES CPU cores, using $CORES cores for parallel processing (max 32)"

# Set thread limits for various operations
ZIP_THREADS=$((CORES > 8 ? 8 : CORES))          # zip/unzip operations limited to 8 threads
TAR_THREADS=$CORES                               # tar can use all available cores
ARIA2C_CONNECTIONS=$((CORES > 16 ? 16 : CORES)) # aria2c max 16 connections per server
PARALLEL_JOBS=$CORES                             # GNU parallel jobs
COMPRESSION_THREADS=$CORES                       # 7z compression threads

echo "Thread allocation - ZIP: $ZIP_THREADS, TAR: $TAR_THREADS, ARIA2C: $ARIA2C_CONNECTIONS, PARALLEL: $PARALLEL_JOBS, 7Z: $COMPRESSION_THREADS"

# Set environment variables for parallelism
export MAKEFLAGS="-j$CORES"
export PARALLEL="-j$PARALLEL_JOBS"

# Store original working directory and create absolute paths
ORIGINAL_DIR=$(pwd)
OTA_EXTRACTOR="$ORIGINAL_DIR/bin/ota_extractor"
DEVICES_JSON="$ORIGINAL_DIR/devices.json"
OUTPUT_DIR="$ORIGINAL_DIR/out"

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Optimize memory usage with 32GB RAM limit
if command -v free >/dev/null 2>&1; then
    AVAILABLE_RAM=$(free -m | awk 'NR==2{print $7}')
    MAX_RAM_LIMIT=32768  # 32GB in MB
    
    # Use either available RAM/2 or 32GB limit, whichever is smaller
    MEMORY_LIMIT=$((AVAILABLE_RAM < MAX_RAM_LIMIT ? AVAILABLE_RAM / 2 : MAX_RAM_LIMIT / 2))
    export _7Z_MEMORY_LIMIT="${MEMORY_LIMIT}M"
    
    echo "Available RAM: ${AVAILABLE_RAM}MB, Setting 7z memory limit to $_7Z_MEMORY_LIMIT"
fi

# Check tmpfs space and use it if sufficient (require at least 8GB free)
REQUIRED_SPACE_KB=8388608  # 8GB in KB
USE_TMPFS=false

if [ -d "/dev/shm" ]; then
    AVAILABLE_SPACE_KB=$(df /dev/shm --output=avail | tail -1)
    AVAILABLE_SPACE_GB=$((AVAILABLE_SPACE_KB / 1048576))
    echo "Available tmpfs space: ${AVAILABLE_SPACE_GB}GB"
    
    if [ "$AVAILABLE_SPACE_KB" -gt "$REQUIRED_SPACE_KB" ]; then
        TEMP_DIR="/dev/shm/ota_processing_$$"
        USE_TMPFS=true
        echo "Using tmpfs for temporary storage: $TEMP_DIR"
    else
        echo "Insufficient tmpfs space (${AVAILABLE_SPACE_GB}GB < 8GB required), using local storage"
        TEMP_DIR="$ORIGINAL_DIR/temp_$$"
    fi
else
    echo "tmpfs not available, using local storage"
    TEMP_DIR="$ORIGINAL_DIR/temp_$$"
fi

# Create temporary directory
mkdir -p "$TEMP_DIR"
echo "Working directory: $TEMP_DIR"
cd "$TEMP_DIR"

# Validate required files exist
if [ ! -f "$OTA_EXTRACTOR" ]; then
    echo "Error: ota_extractor binary not found at $OTA_EXTRACTOR" >&2
    exit 1
fi

if [ ! -f "$DEVICES_JSON" ]; then
    echo "Error: devices.json not found at $DEVICES_JSON" >&2
    exit 1
fi

# Ensure the ota_extractor binary is executable
chmod +x "$OTA_EXTRACTOR"

# === Helper Functions ===
# Download ota file using gdown (for Google Drive links)
download_with_gdown() {
    echo "Downloading with gdown: $1"
    gdown --fuzzy "$1" -O ota.zip
}

# Download ota file using aria2c with proper connection limits
download_with_aria2c() {
    echo "Downloading with aria2c using $ARIA2C_CONNECTIONS connections: $1"
    # Respect aria2c's max-connection-per-server limit of 16
    aria2c -x$ARIA2C_CONNECTIONS -s$ARIA2C_CONNECTIONS "$1" -o ota.zip
}

# Determine the correct download method based on URL and calls it
download_file() {
    local url="$1"
    echo "Processing URL: $url"
    if [[ "$url" == *"drive.google.com"* ]]; then
        download_with_gdown "$url"
    else
        download_with_aria2c "$url"
    fi
}

# Optimized unzip function with thread limiting
unzip_threaded() {
    local archive="$1"
    local target="$2"
    echo "Extracting $archive using optimized extraction..."
    
    # Use parallel unzip if available, otherwise fallback to standard unzip
    if command -v pigz >/dev/null 2>&1 && command -v parallel >/dev/null 2>&1; then
        unzip -p "$archive" "$target" | parallel --pipe --round-robin -j $ZIP_THREADS 'cat'
    else
        unzip "$archive" "$target"
    fi
}

# === Initial Validation ===
# Check if at least one URL is provided
if [ -z "$1" ]; then
    echo "Error: No OTA URL provided." >&2
    cleanup_and_exit 1
fi

# Cleanup function for proper resource management
cleanup_and_exit() {
    local exit_code=${1:-0}
    echo "Cleaning up temporary files..."
    
    # Copy any output files back to original directory
    if [ -d "out" ]; then
        cp -r out/* "$OUTPUT_DIR/" 2>/dev/null || true
    fi
    
    # Return to original directory and cleanup temp
    cd "$ORIGINAL_DIR"
    rm -rf "$TEMP_DIR"
    
    exit $exit_code
}

# Set trap for cleanup on script exit
trap 'cleanup_and_exit $?' EXIT INT TERM

# Extract the post-build fingerprint string from metadata
extract_fingerprint() {
    unzip -p ota.zip META-INF/com/android/metadata | grep "^post-build=" | cut -d'=' -f2 || echo "InvalidFingerprint"
}

# Extract the POST_OTA_VERSION from payload_properties.txt
extract_version() {
    unzip -p ota.zip payload_properties.txt | grep "^POST_OTA_VERSION=" | cut -d'=' -f2 || echo "UnknownVersion"
}

# Detect the device model by searching metadata/properties for device model keywords from devices.json
detect_model() {
    local detected_model="UnknownModel"
    local models=$(jq -r '.devices | keys[]' "$DEVICES_JSON")
    if [ -z "$models" ]; then
        echo "Error: Could not read models from $DEVICES_JSON or jq is not installed." >&2
        echo "$detected_model"
        return
    fi

    # Check metadata first
    local metadata_content=$(unzip -p ota.zip META-INF/com/android/metadata 2>/dev/null || echo "")
    if [ -n "$metadata_content" ]; then
        for model in $models; do
            # Use grep -qi for quiet, case-insensitive check
            if echo "$metadata_content" | grep -qi "$model"; then
                detected_model="$model"
                echo "$detected_model"
                return
            fi
        done
    fi

    # If not found in metadata, check payload_properties.txt
    local properties_content=$(unzip -p ota.zip payload_properties.txt 2>/dev/null || echo "")
     if [ -n "$properties_content" ]; then
        for model in $models; do
             if echo "$properties_content" | grep -qi "$model"; then # Use grep -qi
                detected_model="$model"
                echo "$detected_model"
                return
            fi
        done
    fi

    echo "$detected_model" # Return "UnknownModel" if no match
}

# === Download and Model Detection ===
echo "Downloading initial OTA package..."
download_file "$1"
echo "Download complete."

# Check available space after download
if [ "$USE_TMPFS" = true ]; then
    CURRENT_SPACE_KB=$(df /dev/shm --output=avail | tail -1)
    CURRENT_SPACE_GB=$((CURRENT_SPACE_KB / 1048576))
    echo "Remaining tmpfs space: ${CURRENT_SPACE_GB}GB"
    
    if [ "$CURRENT_SPACE_KB" -lt 2097152 ]; then  # Less than 2GB remaining
        echo "Warning: Low tmpfs space remaining, consider monitoring disk usage"
    fi
fi

echo "Detecting device model..."
MODEL=$(detect_model)
echo "Detected model: $MODEL"

if [ "$MODEL" == "UnknownModel" ]; then
    echo "Error: Auto model detection has failed!" >&2
    cleanup_and_exit 1
fi

# === Initial Payload Extraction ===
echo "Extracting initial payload..."
unzip ota.zip payload.bin || { echo "Failed to unzip payload"; cleanup_and_exit 1; }
mv payload.bin payload_working.bin
TAG=$(extract_version)
FINGERPRINT=$(extract_fingerprint)
BODY="[$TAG]($1) (full)"
rm ota.zip

# === Prepare Working Directories ===
echo "Creating required directories..."
mkdir -p ota out dyn syn

# Extract images from the main payload
"$OTA_EXTRACTOR" -output_dir ota -payload payload_working.bin || { echo "Error: Failed to extract initial payload"; cleanup_and_exit 1; }
echo "Initial payload extracted."
rm payload_working.bin

# === Incremental Updates ===
# Shift arguments to remove the first URL which has been processed
shift
# Process remaining arguments (if any) as incremental URLs
for i in "$@"; do
    echo "Processing incremental OTA: $i"
    download_file "$i"
    unzip ota.zip payload.bin || { echo "Failed to unzip incremental payload"; cleanup_and_exit 1; }
    mv payload.bin payload_working.bin
    TAG=$(extract_version) # Update TAG (release name) to the latest POST_OTA_VERSION
    FINGERPRINT=$(extract_fingerprint)  # Update fingerprint for the latest incremental
    BODY="$BODY -> [$TAG]($i)"
    rm ota.zip

    mkdir ota_new
    # Apply incremental update
    "$OTA_EXTRACTOR" -input-dir ota -output_dir ota_new -payload payload_working.bin || { echo "Error: Failed to extract incremental payload for $i"; cleanup_and_exit 1; }
    rm -rf ota
    mv ota_new ota
    rm payload_working.bin
done

# === Prepare Release Information ===
# Format the final fingerprint for the release body
BODY=$(printf "%s\n\n**Fingerprint:**\n%s" "$BODY" "${FINGERPRINT//|/$'\n'}")

# Append the GitHub Actions run URL to the release body
if [ -n "$GITHUB_RUN_ID" ]; then
    RUN_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"
    BODY=$(printf "%s\n\n**Workflow Run**: [Here](%s)" "$BODY" "$RUN_URL")
fi

# === Fetch Partition Information ===
echo "Fetching partition lists for model: $MODEL"

# Get partition lists dynamically from devices.json using jq
BOOT_PARTITIONS=$(jq -r --arg model "$MODEL" '.devices[$model].boot_partitions | join(" ")' "$DEVICES_JSON")
LOGICAL_PARTITIONS=$(jq -r --arg model "$MODEL" '.devices[$model].logical_partitions | join(" ")' "$DEVICES_JSON")

# Check if partitions were successfully retrieved
if [ -z "$BOOT_PARTITIONS" ] || [ "$BOOT_PARTITIONS" == "null" ] || [ -z "$LOGICAL_PARTITIONS" ] || [ "$LOGICAL_PARTITIONS" == "null" ]; then
    echo "Error: Could not find partition info for model '$MODEL' in $DEVICES_JSON or jq failed." >&2
    cleanup_and_exit 1
fi

echo "Using dynamically fetched partitions for model: $MODEL"
echo "Boot Partitions: $BOOT_PARTITIONS"
echo "Logical Partitions: $LOGICAL_PARTITIONS"

# === Generate Hashes (Optimized for Parallel Processing) ===
echo "Generating file hashes using $PARALLEL_JOBS parallel jobs..."
# Switch to the directory containing extracted images
cd ota

# Generate hashes for all extracted image files with parallel processing
for h in md5 sha1 sha256 xxh128; do
    if [ "$h" = "xxh128" ]; then
        echo "--- ${h^^} Hashes ---"
        ls * | parallel -j $PARALLEL_JOBS xxh128sum 2>/dev/null | sort -k2 -V | tee ../out/${TAG}-hash.$h
    else
        echo "--- ${h^^} Hashes ---"
        ls * | parallel -j $PARALLEL_JOBS "openssl dgst -${h} -r" 2>/dev/null | sort -k2 -V | tee ../out/${TAG}-hash.$h
    fi
done

# === Organize Images ===
echo "Organizing images..."
# Move boot-related images to `syn` directory
for f in $BOOT_PARTITIONS; do
    [ -f "${f}.img" ] && mv "${f}.img" ../syn
done

# Move logical partition images to `dyn` directory
for f in $LOGICAL_PARTITIONS; do
    [ -f "${f}.img" ] && mv "${f}.img" ../dyn
done

# === Archive Images with Thread Optimization ===
echo "Archiving images using optimized compression settings..."

# Function for threaded tar creation (if needed)
create_tar_archive() {
    local source_dir="$1"
    local output_file="$2"
    echo "Creating tar archive: $output_file"
    
    if command -v pigz >/dev/null 2>&1; then
        # Use pigz for parallel gzip compression
        tar --use-compress-program="pigz -p $TAR_THREADS" -cf "$output_file" -C "$source_dir" .
    else
        # Fallback to standard tar with threading if available
        tar -cf "$output_file" -C "$source_dir" .
    fi
}

# Archive with optimized 7z compression using proper thread limits
cd ../syn && 7z a -mmt$COMPRESSION_THREADS -mx6 ../out/${TAG}-image-boot.7z * && rm -rf ../syn &  
cd ../ota && 7z a -mmt$COMPRESSION_THREADS -mx6 ../out/${TAG}-image-firmware.7z * && rm -rf ../ota &  
cd ../dyn && 7z a -mmt$COMPRESSION_THREADS -mx6 -v1g ../out/${TAG}-image-logical.7z * && rm -rf ../dyn & 
wait

echo "All archives created successfully using optimized compression with thread limits."

# === Set GitHub Actions Outputs ===
if [ -n "$GITHUB_OUTPUT" ]; then
    echo "Setting GitHub Actions outputs..."
    # Output tag name and release body for the release action
    {
        echo "tag=$TAG"
        echo "release_name=$TAG" 
        echo "body<<EOF"
        echo "$BODY"
        echo "EOF"
    } >> "$GITHUB_OUTPUT"
fi

# Final space check
if [ "$USE_TMPFS" = true ]; then
    FINAL_SPACE_KB=$(df /dev/shm --output=avail | tail -1)
    FINAL_SPACE_GB=$((FINAL_SPACE_KB / 1048576))
    echo "Final tmpfs space: ${FINAL_SPACE_GB}GB"
fi

echo "Script completed successfully with optimized performance using $CORES CPU cores."
echo "Thread allocation summary - ZIP: $ZIP_THREADS, TAR: $TAR_THREADS, 7Z: $COMPRESSION_THREADS, PARALLEL: $PARALLEL_JOBS"

# Cleanup will be handled by the trap
trap - EXIT
cleanup_and_exit 0

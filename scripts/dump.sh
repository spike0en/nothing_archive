#!/bin/bash
#
# SPDX-FileCopyrightText: luk1337
# SPDX-License-Identifier: MIT
#
# Modified by: spike0en

# === Configuration ===
# Exit immediately if a command exits with a non-zero status.
set -e

# Ensure the ota_extractor binary is executable
chmod +x ./bin/ota_extractor

# === Helper Functions ===
# Download ota file using gdown (for Google Drive links)
download_with_gdown() {
    echo "Downloading with gdown: $1"
    gdown --fuzzy "$1" -O ota.zip
}

# Download ota file using aria2c (for other URLs)
download_with_aria2c() {
    echo "Downloading with aria2c: $1"
    aria2c -x5 "$1" -o ota.zip
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

# === Initial Validation ===
# Check if at least one URL is provided
if [ -z "$1" ]; then
    echo "Error: No OTA URL provided." >&2
    exit 1
fi
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
    local models=$(jq -r '.devices | keys[]' devices.json)
    if [ -z "$models" ]; then
        echo "Error: Could not read models from devices.json or jq is not installed." >&2
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

echo "Detecting device model..."
MODEL=$(detect_model)
echo "Detected model: $MODEL"

if [ "$MODEL" == "UnknownModel" ]; then
    echo "Error: Auto model detection has failed!" >&2
    rm -f ota.zip
    exit 1
fi

# === Initial Payload Extraction ===
echo "Extracting initial payload..."
unzip ota.zip payload.bin || { echo "Failed to unzip payload"; exit 1; }
mv payload.bin payload_working.bin
TAG=$(extract_version)
FINGERPRINT=$(extract_fingerprint)
BODY="[$TAG]($1) (full)"
rm ota.zip

# === Prepare Working Directories ===
echo "Creating required directories..."
mkdir -p ota out dyn syn

# Extract images from the main payload
./bin/ota_extractor -output_dir ota -payload payload_working.bin || { echo "Error: Failed to extract initial payload"; exit 1; }
echo "Initial payload extracted."
rm payload_working.bin

# === Incremental Updates ===
# Shift arguments to remove the first URL which has been processed
shift
# Process remaining arguments (if any) as incremental URLs
for i in "$@"; do
    echo "Processing incremental OTA: $i"
    download_file "$i"
    unzip ota.zip payload.bin || { echo "Failed to unzip incremental payload"; exit 1; }
    mv payload.bin payload_working.bin
    TAG=$(extract_version) # Update TAG (release name) to the latest POST_OTA_VERSION
    FINGERPRINT=$(extract_fingerprint)  # Update fingerprint for the latest incremental
    BODY="$BODY -> [$TAG]($i)"
    rm ota.zip

    mkdir ota_new
    # Apply incremental update
    ./bin/ota_extractor -input-dir ota -output_dir ota_new -payload payload_working.bin || { echo "Error: Failed to extract incremental payload for $i"; exit 1; }
    rm -rf ota
    mv ota_new ota
    rm payload_working.bin
done

# === Prepare Release Information ===
# Format the final fingerprint for the release body
BODY=$(printf "%s\n\n**Fingerprint:**\n%s" "$BODY" "${FINGERPRINT//|/$'\n'}")

# === Fetch Partition Information ===
echo "Fetching partition lists for model: $MODEL"

# Get partition lists dynamically from devices.json using jq
BOOT_PARTITIONS=$(jq -r --arg model "$MODEL" '.devices[$model].boot_partitions | join(" ")' devices.json)
LOGICAL_PARTITIONS=$(jq -r --arg model "$MODEL" '.devices[$model].logical_partitions | join(" ")' devices.json)

# Check if partitions were successfully retrieved
if [ -z "$BOOT_PARTITIONS" ] || [ "$BOOT_PARTITIONS" == "null" ] || [ -z "$LOGICAL_PARTITIONS" ] || [ "$LOGICAL_PARTITIONS" == "null" ]; then
    echo "Error: Could not find partition info for model '$MODEL' in devices.json or jq failed." >&2
    # Clean up intermediate files if they exist
    rm -f ota.zip payload_working.bin
    exit 1
fi

echo "Using dynamically fetched partitions for model: $MODEL"
echo "Boot Partitions: $BOOT_PARTITIONS"
echo "Logical Partitions: $LOGICAL_PARTITIONS"

# === Generate Hashes ===
echo "Generating file hashes..."
# Switch to the directory containing extracted images
cd ota

# Generate hashes for all extracted image files
for h in md5 sha1 sha256 xxh128; do
    if [ "$h" = "xxh128" ]; then
        ls * | parallel xxh128sum | sort -k2 -V > ../out/${TAG}-hash.$h
    else
        ls * | parallel "openssl dgst -${h} -r" | sort -k2 -V > ../out/${TAG}-hash.$h
    fi
done

# === Organize Images ===
echo "Organizing images..."
# Move boot-related images to `syn` directory
for f in $BOOT_PARTITIONS; do
    mv ${f}.img ../syn
done

# Move logical partition images to `dyn` directory
for f in $LOGICAL_PARTITIONS; do
    mv ${f}.img ../dyn
done

# === Archive Images ===
echo "Archiving images..."
# Archive boot, firmware (remaining in ota), and logical images in parallel
# Remove source directories after successful archiving
cd ../syn && 7z a -mmt4 -mx6 ../out/${TAG}-image-boot.7z * && rm -rf ../syn &  
cd ../ota && 7z a -mmt4 -mx6 ../out/${TAG}-image-firmware.7z * && rm -rf ../ota &  
cd ../dyn && 7z a -mmt4 -mx6 -v1g ../out/${TAG}-image-logical.7z * && rm -rf ../dyn & 
wait

# === Set GitHub Actions Outputs ===
echo "Setting GitHub Actions outputs..."
# Output tag name and release body for the release action
{
    echo "tag=$TAG"
    echo "release_name=$TAG" 
    echo "body<<EOF"
    echo "$BODY"
    echo "EOF"
} >> "$GITHUB_OUTPUT"

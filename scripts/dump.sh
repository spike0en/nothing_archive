#!/bin/bash
#
# SPDX-FileCopyrightText: luk1337
# SPDX-License-Identifier: MIT
#
# Modified by: spike0en

# === Configuration ===
set -e
ORIGINAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export LD_LIBRARY_PATH="$ORIGINAL_DIR/bin:$LD_LIBRARY_PATH"

DETECTED_CORES=$(nproc)
CORES=$((DETECTED_CORES > 44 ? 44 : DETECTED_CORES))
echo "Detected $DETECTED_CORES CPU cores, using $CORES cores for parallel processing"

ARIA2C_CONNECTIONS=$((CORES > 16 ? 16 : CORES))
PARALLEL_JOBS=$CORES
COMPRESSION_THREADS=$CORES

echo "Thread allocation - ARIA2C: $ARIA2C_CONNECTIONS, PARALLEL: $PARALLEL_JOBS, 7Z: $COMPRESSION_THREADS"

export PARALLEL="-j$PARALLEL_JOBS"


OTA_EXTRACTOR="$ORIGINAL_DIR/bin/ota_extractor"
DEVICES_JSON="$ORIGINAL_DIR/scripts/devices.json"
OUTPUT_DIR="$ORIGINAL_DIR/out"

mkdir -p "$OUTPUT_DIR"

# === Helper Functions ===

download_with_gdown() {
    echo "Downloading with gdown: $1"
    gdown --fuzzy "$1" -O ota.zip
}

download_with_aria2c() {
    echo "Downloading with aria2c using $ARIA2C_CONNECTIONS connections: $1"
    aria2c -x$ARIA2C_CONNECTIONS -s$ARIA2C_CONNECTIONS "$1" -o ota.zip
}

download_file() {
    local url="$1"
    echo "Processing URL: $url"
    if [[ "$url" == *"drive.google.com"* ]]; then
        download_with_gdown "$url"
    else
        download_with_aria2c "$url"
    fi
}

if [ -z "$1" ]; then
    echo "Error: No OTA URL provided." >&2
    exit 1
fi

extract_fingerprint() {
    unzip -p ota.zip META-INF/com/android/metadata | grep "^post-build=" | cut -d'=' -f2 || echo "InvalidFingerprint"
}

extract_version() {
    unzip -p ota.zip payload_properties.txt | grep "^POST_OTA_VERSION=" | cut -d'=' -f2 || echo "UnknownVersion"
}

detect_model() {
    local detected_model="UnknownModel"
    local models=$(jq -r '.devices | keys[]' "$DEVICES_JSON")
    
    if [ -z "$models" ]; then
        echo "Error: Could not read models from $DEVICES_JSON or jq is not installed." >&2
        echo "$detected_model"
        return
    fi

    local metadata_content=$(unzip -p ota.zip META-INF/com/android/metadata 2>/dev/null || echo "")
    if [ -n "$metadata_content" ]; then
        for model in $models; do
            if echo "$metadata_content" | grep -qi "\b$model\b"; then
                detected_model="$model"
                echo "$detected_model"
                return
            fi
        done
    fi

    local properties_content=$(unzip -p ota.zip payload_properties.txt 2>/dev/null || echo "")
     if [ -n "$properties_content" ]; then
        for model in $models; do
             if echo "$properties_content" | grep -qi "\b$model\b"; then
                detected_model="$model"
                echo "$detected_model"
                return
            fi
        done
    fi

    if [ -n "$FALLBACK_MODEL" ]; then
        echo "Auto-detection failed. Using provided fallback model: $FALLBACK_MODEL" >&2
        echo "$FALLBACK_MODEL"
        return
    fi
    
    echo "$detected_model"
}

# === Main Execution ===

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

echo "Extracting initial payload..."
chmod +x "$OTA_EXTRACTOR"
unzip ota.zip payload.bin || { echo "Failed to unzip payload"; rm -f ota.zip; exit 1; }
mv payload.bin payload_working.bin

TAG=$(extract_version)
FINGERPRINT=$(extract_fingerprint)
BODY="[$TAG]($1) (full)"
rm ota.zip

mkdir -p ota out dyn boot

"$OTA_EXTRACTOR" -output_dir ota -payload payload_working.bin || { echo "Error: Failed to extract initial payload"; rm -f payload_working.bin; exit 1; }
echo "Initial payload extracted."
rm payload_working.bin

# === Incremental Updates ===

shift
for i in "$@"; do
    echo "Processing incremental OTA: $i"
    download_file "$i"
    unzip ota.zip payload.bin || { echo "Failed to unzip incremental payload"; rm -f ota.zip; exit 1; }
    mv payload.bin payload_working.bin
    
    TAG=$(extract_version)
    FINGERPRINT=$(extract_fingerprint)
    BODY="$BODY -> [$TAG]($i)"
    rm ota.zip

    mkdir -p ota_new
    "$OTA_EXTRACTOR" -input-dir ota -output_dir ota_new -payload payload_working.bin || { echo "Error: Failed to extract incremental payload for $i"; rm -f payload_working.bin; exit 1; }
    rm -rf ota
    mv ota_new ota
    rm payload_working.bin
done

# === Prepare Release Information ===

BODY=$(printf "%s\n\n**Fingerprint:**\n%s" "$BODY" "${FINGERPRINT//|/$'\n'}")

if [ -n "$GITHUB_RUN_ID" ]; then
    RUN_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"
    BODY=$(printf "%s\n\n**Workflow Run**: [Here](%s)" "$BODY" "$RUN_URL")
fi

# === Fetch Partition Information ===

echo "Fetching partition lists for model: $MODEL"

BOOT_PARTITIONS=$(jq -r --arg model "$MODEL" '.devices[$model].boot_partitions | join(" ")' "$DEVICES_JSON")
LOGICAL_PARTITIONS=$(jq -r --arg model "$MODEL" '.devices[$model].logical_partitions | join(" ")' "$DEVICES_JSON")

if [ -z "$BOOT_PARTITIONS" ] || [ "$BOOT_PARTITIONS" == "null" ] || [ -z "$LOGICAL_PARTITIONS" ] || [ "$LOGICAL_PARTITIONS" == "null" ]; then
    echo "Error: Could not find partition info for model '$MODEL' in $DEVICES_JSON or jq failed." >&2
    rm -f ota.zip payload_working.bin
    exit 1
fi

echo "Using dynamically fetched partitions for model: $MODEL"
echo "Boot Partitions: $BOOT_PARTITIONS"
echo "Logical Partitions: $LOGICAL_PARTITIONS"

# === Generate SHA-256 Hashes ===

echo "Generating file hashes using $PARALLEL_JOBS parallel jobs..."
cd ota

echo "--- SHA256 Hashes ---"
find . -maxdepth 1 -type f -print0 | parallel -0 -j $PARALLEL_JOBS "openssl dgst -sha256 -r" 2>/dev/null | sort -k2 -V | tee ../out/${TAG}-hash.sha256

# === Organize Images ===

echo "Organizing images..."

for f in $BOOT_PARTITIONS; do
    [ -f "${f}.img" ] && mv "${f}.img" ../boot
done

for f in $LOGICAL_PARTITIONS; do
    [ -f "${f}.img" ] && mv "${f}.img" ../dyn
done

# === Archive Images ===

echo "Archiving images using optimized compression settings..."

if [ -d "../boot" ] && [ "$(ls -A ../boot 2>/dev/null)" ]; then
    (cd ../boot && 7z a -mmt$COMPRESSION_THREADS -mx6 ../out/${TAG}-image-boot.7z * && rm -rf ../boot) &
fi

if [ -d "../ota" ] && [ "$(ls -A ../ota 2>/dev/null)" ]; then
    (cd ../ota && 7z a -mmt$COMPRESSION_THREADS -mx6 ../out/${TAG}-image-firmware.7z * && rm -rf ../ota) &
fi

if [ -d "../dyn" ] && [ "$(ls -A ../dyn 2>/dev/null)" ]; then
    (cd ../dyn && 7z a -mmt$COMPRESSION_THREADS -mx6 -v2000M ../out/${TAG}-image-logical.7z * && rm -rf ../dyn) &
fi

wait

# === Set GitHub Actions Outputs ===

echo "Setting GitHub Actions outputs..."

RELEASE_TAG_NAME="$TAG"
if [ -n "$INPUT_NAME" ]; then
    echo "Using provided input name '$INPUT_NAME' as release tag name."
    RELEASE_TAG_NAME="$INPUT_NAME"
else
    echo "No input name provided, using extracted tag '$TAG' as release tag name."
fi

if [ -n "$GITHUB_OUTPUT" ]; then
    {
        echo "release_tag=$RELEASE_TAG_NAME"
        echo "release_name=$TAG"
        echo "body<<EOF"
        echo "$BODY"
        echo "EOF"
    } >> "$GITHUB_OUTPUT"
fi

echo "Script completed successfully."

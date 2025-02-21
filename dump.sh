#!/bin/bash
#
# SPDX-FileCopyrightText: luk1337
# SPDX-License-Identifier: MIT
#
# Modified by: spike0en

# Print every command and exit immediately on failure
set -ex 

# Set execute permissions for ota_extractor
chmod +x ./bin/ota_extractor

# Download OTA firmware with aria2c or gdown based on the link format, renaming it to ota.zip
download_with_gdown() {
    echo "Downloading with gdown: $1"
    gdown --fuzzy "$1" -O ota.zip
}

download_with_aria2c() {
    echo "Downloading with aria2c: $1"
    aria2c -x5 "$1" -o ota.zip
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

# Exit if no URL is provided
if [ -z "$1" ]; then
    echo "No URL provided."
    exit 1
fi

# Download the main OTA firmware
download_file "$1"

# Extract and process payload
unzip ota.zip payload.bin || { echo "Failed to unzip payload"; exit 1; }
mv payload.bin payload_working.bin
TAG=$(unzip -p ota.zip payload_properties.txt | grep ^POST_OTA_VERSION= | cut -b 18-)
BODY="[$TAG]($1) (full)"
rm ota.zip

# Create `ota` directory 
mkdir -p ota

# Perform extraction on payload_working.bin
./bin/ota_extractor -output_dir ota -payload payload_working.bin || { echo "Failed to extract payload"; exit 1; }
rm payload_working.bin

# Apply incrementals when available
for i in "${@:2}"; do
    download_file "$i"
    unzip ota.zip payload.bin || { echo "Failed to unzip incremental payload"; exit 1; }
    mv payload.bin payload_working.bin
    TAG=$(unzip -p ota.zip payload_properties.txt | grep ^POST_OTA_VERSION= | cut -b 18-)
    BODY="$BODY -> [$TAG]($i)"
    rm ota.zip

    mkdir ota_new
    ./bin/ota_extractor -input-dir ota -output_dir ota_new -payload payload_working.bin || { echo "Failed to extract incremental payload"; exit 1; }
    rm -rf ota
    mv ota_new ota
    rm payload_working.bin
done

# Create required directories
mkdir -p out dyn syn

# Switch to `ota` directory
cd ota

# Generate hashes for all files in the `ota` directory and send them to `out` (tagged with `-hash`)
for h in md5 sha1 sha256 xxh128; do
    if [ "$h" = "xxh128" ]; then
        ls * | parallel xxh128sum | sort -k2 -V > ../out/${TAG}-hash.$h
    else
        ls * | parallel "openssl dgst -${h} -r" | sort -k2 -V > ../out/${TAG}-hash.$h
    fi
done

# Move the `boot` category image files from `ota` to `syn` directory
for f in boot dtbo init_boot vendor_boot vbmeta; do
    mv ${f}.img ../syn
done

# Move the `logical` category image files from `ota` to `syn` directory
for f in odm vendor system_ext system vendor_dlkm odm_dlkm system_dlkm product vbmeta_system vbmeta_vendor; do
    mv ${f}.img ../dyn 
done

# Archive images in parallel and remove directories after success
cd ../syn && 7z a -mmt4 -mx6 ../out/${TAG}-image-boot.7z * && rm -rf ../syn &  
cd ../ota && 7z a -mmt4 -mx6 ../out/${TAG}-image-firmware.7z * && rm -rf ../ota &  
cd ../dyn && 7z a -mmt4 -mx6 -v1g ../out/${TAG}-image-logical.7z * && rm -rf ../dyn & 
wait

# Echo tag name, release body, and release history
echo "tag=$TAG" >> "$GITHUB_OUTPUT"
echo "body=$BODY" >> "$GITHUB_OUTPUT"

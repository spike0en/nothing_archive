#!/usr/bin/env bash
# SPDX-FileCopyrightText: spike0en
# SPDX-License-Identifier: MIT

set -e

echo ""
echo "Extraction Utility for Nothing Archive Files"
echo "---------------------------------------------------------"

if ! command -v 7z &> /dev/null; then
    echo "[ERROR] 7z command not found!"
    echo "Please install 7-zip (e.g., sudo apt install p7zip-full or dnf install p7zip)"
    exit 1
fi

echo "[INFO] 7-zip found at: $(command -v 7z)"

# Setup working directory (assumes script is placed alongside archives)
ORIGINAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ORIGINAL_DIR" || exit 1
echo "[INFO] Current working directory: $PWD"
echo ""

BOOT=0
FIRMWARE=0
LOGICAL=0

# Detect available category archives securely
shopt -s nullglob
boot_files=(*-image-boot.7z)
firmware_files=(*-image-firmware.7z)
logical_files=(*-image-logical.7z.001)
shopt -u nullglob

if [ ${#boot_files[@]} -gt 0 ]; then BOOT=1; fi
if [ ${#firmware_files[@]} -gt 0 ]; then FIRMWARE=1; fi
if [ ${#logical_files[@]} -gt 0 ]; then LOGICAL=1; fi

if [ $BOOT -eq 0 ] && [ $FIRMWARE -eq 0 ] && [ $LOGICAL -eq 0 ]; then
    echo "[WARNING] No valid image files found for extraction!"
    exit 1
fi

echo "Select categories to extract (e.g., 12 for Boot and Firmware):"
[ $BOOT -eq 1 ] && echo "[1] Boot"
[ $FIRMWARE -eq 1 ] && echo "[2] Firmware"
[ $LOGICAL -eq 1 ] && echo "[3] Logical"
echo "[A] All"
echo "[X] Exit"
echo ""

read -p "Enter your selection: " CHOICE

if [[ "${CHOICE,,}" == "x" ]]; then
    exit 0
fi

EXTRACT_BOOT=0
EXTRACT_FIRMWARE=0
EXTRACT_LOGICAL=0

if [[ "${CHOICE,,}" == "a" ]]; then
    EXTRACT_BOOT=1
    EXTRACT_FIRMWARE=1
    EXTRACT_LOGICAL=1
else
    if [[ "$CHOICE" == *"1"* ]]; then EXTRACT_BOOT=1; fi
    if [[ "$CHOICE" == *"2"* ]]; then EXTRACT_FIRMWARE=1; fi
    if [[ "$CHOICE" == *"3"* ]]; then EXTRACT_LOGICAL=1; fi
fi

if [ $EXTRACT_BOOT -eq 0 ] && [ $EXTRACT_FIRMWARE -eq 0 ] && [ $EXTRACT_LOGICAL -eq 0 ]; then
    echo "[ERROR] No valid selection made. Exiting..."
    exit 1
fi

echo ""
read -p "Proceed with default timestamped extraction directory? (Y/n): " CHOICE_DIR
CHOICE_DIR=${CHOICE_DIR:-Y}

if [[ "${CHOICE_DIR,,}" == "y" ]]; then
    EXTRACT_DIR="$ORIGINAL_DIR/flash_$(date +'%Y%m%d_%H%M%S')"
else
    echo ""
    read -p "Enter custom extraction directory path: " EXTRACT_DIR
    # Expand tilde if provided
    EXTRACT_DIR="${EXTRACT_DIR/#\~/$HOME}"
fi

mkdir -p "$EXTRACT_DIR"
echo "[INFO] Extraction directory: $EXTRACT_DIR"
echo ""

echo "Extracting files..."
echo "---------------------------------------------------------"

if [ $EXTRACT_BOOT -eq 1 ]; then
    for f in "${boot_files[@]}"; do
        echo "[EXTRACT] $f"
        7z x "$f" -aoa -o"$EXTRACT_DIR"
    done
fi

if [ $EXTRACT_FIRMWARE -eq 1 ]; then
    for f in "${firmware_files[@]}"; do
        echo "[EXTRACT] $f"
        7z x "$f" -aoa -o"$EXTRACT_DIR"
    done
fi

if [ $EXTRACT_LOGICAL -eq 1 ]; then
    for f in "${logical_files[@]}"; do
        echo "[EXTRACT] $f - Multi-part archive"
        7z x "$f" -aoa -o"$EXTRACT_DIR"
    done
fi

echo ""
echo "[SUCCESS] Extraction complete."
echo ""

read -p "Do you want to download the Fastboot flashing script for your model? (Y/n): " DOWNLOAD_CHOICE
DOWNLOAD_CHOICE=${DOWNLOAD_CHOICE:-Y}
if [[ "${DOWNLOAD_CHOICE,,}" != "y" ]]; then
    echo "Skipping script download..."
else
    echo ""
    echo "Select your device model for the flashing script:"
    echo "[1] Nothing Phone (1)"
    echo "[2] Nothing Phone (2)"
    echo "[3] Nothing Phone (2a) Series"
    echo "[4] Nothing Phone (3a) Series"
    echo "[5] Nothing Phone (3)"
    echo "[6] Nothing Phone (4a)"
    echo "[7] CMF Phone (1) - Phone (2) Pro"
    echo "[X] Exit"
    echo ""
    
    read -p "Enter your selection: " DEVICE_CHOICE
    
    FLASH_SCRIPT_URL=""
    case "$DEVICE_CHOICE" in
        1) FLASH_SCRIPT_URL="https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/spacewar/Linux/flash_all.sh" ;;
        2) FLASH_SCRIPT_URL="https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/pong/Linux/flash_all.sh" ;;
        3) FLASH_SCRIPT_URL="https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/pacman/Linux/flash_all.sh" ;;
        4) FLASH_SCRIPT_URL="https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/asteroids/Linux/flash_all.sh" ;;
        5) FLASH_SCRIPT_URL="https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/metroid/Linux/flash_all.sh" ;;
        6) FLASH_SCRIPT_URL="https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/frogger/Linux/flash_all.sh" ;;		
        7) FLASH_SCRIPT_URL="https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/galaga-tetris/Linux/flash_all.sh" ;;
        [xX]) exit 0 ;;
        *)
            echo "[ERROR] Invalid selection. Exiting..."
            exit 1
            ;;
    esac
    
    MAX_RETRIES=3
    RETRY_DELAY=5
    echo ""
    
    SUCCESS=0
    for ((i=1; i<=MAX_RETRIES; i++)); do
        echo "[DOWNLOAD] Attempt $i of $MAX_RETRIES: Downloading flash script..."
        if curl -L -o "$EXTRACT_DIR/flash_all.sh" "$FLASH_SCRIPT_URL"; then
            SUCCESS=1
            chmod +x "$EXTRACT_DIR/flash_all.sh"
            break
        fi
        echo "[WARNING] Download failed. Retrying in $RETRY_DELAY seconds..."
        sleep $RETRY_DELAY
    done
    
    if [ $SUCCESS -eq 0 ]; then
        echo "[ERROR] All download attempts failed! Please check your internet connection."
        exit 1
    fi
    
    echo "[SUCCESS] Download complete. Saved to: $EXTRACT_DIR/flash_all.sh"
    echo ""
fi

read -p "Open extracted folder in file manager? (Y/n): " OPEN_DIR
OPEN_DIR=${OPEN_DIR:-Y}
if [[ "${OPEN_DIR,,}" == "y" ]]; then
    if command -v xdg-open &> /dev/null; then
        xdg-open "$EXTRACT_DIR" &
    elif grep -qi microsoft /proc/version &> /dev/null && command -v explorer.exe &> /dev/null; then
        # Use Windows Explorer if in WSL
        explorer.exe "$(wslpath -w "$EXTRACT_DIR")"
    else
        echo "[WARNING] Auto-open failed: neither 'xdg-open' nor WSL 'explorer.exe' found."
    fi
fi

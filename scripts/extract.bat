:: SPDX-FileCopyrightText: spike0en
:: SPDX-License-Identifier: MIT

@echo off
setlocal enabledelayedexpansion
title Extraction Utility for Nothing Archive Files

:: =========================================================
:: Extraction Utility for Nothing Archive Files
:: Repository: https://github.com/spike0en/nothing_archive
:: Author: Spike (spike0en)
:: =========================================================
echo.
echo Extraction Utility for Nothing Archive Files
echo ---------------------------------------------------------

:: Discover 7-Zip executable
set "SEVENZIP="
for %%I in (
    "%ProgramFiles%\7-Zip\7z.exe"
    "%ProgramFiles(x86)%\7-Zip\7z.exe"
    "%UserProfile%\AppData\Local\7-Zip\7z.exe"
    "C:\7z.exe"
) do if exist "%%~I" set "SEVENZIP=%%~I"

if not defined SEVENZIP (
    echo [ERROR] 7-Zip not found!
    echo Please install 7-Zip from: https://www.7-zip.org/download.html
    echo After installation, run this script again.
    pause
    exit /b 1
)
echo [INFO] 7-Zip found at: %SEVENZIP%

:: Setup working directory
set "ORIGINAL_DIR=%~dp0"
if "%ORIGINAL_DIR:~-1%"=="\" set "ORIGINAL_DIR=%ORIGINAL_DIR:~0,-1%"
cd /d "%ORIGINAL_DIR%"
echo [INFO] Current working directory: %CD%
echo.

:: Detect available category archives
set "BOOT="
set "FIRMWARE="
set "LOGICAL="

for %%F in (*-image-boot.7z) do set "BOOT=1"
for %%F in (*-image-firmware.7z) do set "FIRMWARE=1"
for %%F in (*-image-logical.7z.001) do set "LOGICAL=1"

if not defined BOOT if not defined FIRMWARE if not defined LOGICAL (
    echo [WARNING] No valid image files found for extraction!
    pause
    exit /b 1
)

:: Prompt for categories to extract
echo Select categories to extract (e.g., 12 for Boot and Firmware):
if defined BOOT echo [1] Boot
if defined FIRMWARE echo [2] Firmware
if defined LOGICAL echo [3] Logical
echo [A] All
echo [X] Exit
echo.

set /p CHOICE=Enter your selection: 
if /I "%CHOICE%"=="X" exit /b 0

set "EXTRACT_BOOT="
set "EXTRACT_FIRMWARE="
set "EXTRACT_LOGICAL="

if /I "%CHOICE%"=="A" (
    set "EXTRACT_BOOT=1"
    set "EXTRACT_FIRMWARE=1"
    set "EXTRACT_LOGICAL=1"
) else if not "%CHOICE%"=="" (
    if not "%CHOICE:1=%"=="%CHOICE%" set "EXTRACT_BOOT=1"
    if not "%CHOICE:2=%"=="%CHOICE%" set "EXTRACT_FIRMWARE=1"
    if not "%CHOICE:3=%"=="%CHOICE%" set "EXTRACT_LOGICAL=1"
)

if not defined EXTRACT_BOOT if not defined EXTRACT_FIRMWARE if not defined EXTRACT_LOGICAL (
    echo [ERROR] No valid selection made. Exiting...
    pause
    exit /b 1
)

:: Configure extraction directory
echo.
set "choice_dir=Y"
set /p "choice_dir=Proceed with default timestamped extraction directory? (Y/N) [Y]: "
if /I "%choice_dir%"=="Y" (
    for /f %%I in ('powershell -command "Get-Date -Format 'yyyyMMdd_HHmmss'"') do set "EXTRACT_DIR=%ORIGINAL_DIR%\flash_%%I"
) else (
    echo.
    set /p EXTRACT_DIR=Enter custom extraction directory path: 
)

if not exist "%EXTRACT_DIR%" mkdir "%EXTRACT_DIR%"
echo [INFO] Extraction directory: %EXTRACT_DIR%
echo.

:: Execute Extraction
echo Extracting files...
echo ---------------------------------------------------------

if defined EXTRACT_BOOT (
    for %%F in (*-image-boot.7z) do (
        echo [EXTRACT] %%F
        "%SEVENZIP%" x "%%F" -aoa -o"%EXTRACT_DIR%"
    )
)

if defined EXTRACT_FIRMWARE (
    for %%F in (*-image-firmware.7z) do (
        echo [EXTRACT] %%F
        "%SEVENZIP%" x "%%F" -aoa -o"%EXTRACT_DIR%"
    )
)

if defined EXTRACT_LOGICAL (
    for %%F in (*-image-logical.7z.001) do (
        echo [EXTRACT] %%F - Multi-part archive
        "%SEVENZIP%" x "%%F" -aoa -o"%EXTRACT_DIR%"
    )
)

echo.
echo [SUCCESS] Extraction complete.
echo.

:: Download the fastboot flashing script
set "DOWNLOAD_CHOICE=Y"
set /p "DOWNLOAD_CHOICE=Do you want to download the Fastboot flashing script for your model? (Y/N) [Y]: "
if /I not "%DOWNLOAD_CHOICE%"=="Y" (
    echo Skipping script download...
    goto POST_DOWNLOAD
)

echo.
echo Select your device model for the flashing script:
echo [1] Nothing Phone (1)
echo [2] Nothing Phone (2)
echo [3] Nothing Phone (2a) Series
echo [4] Nothing Phone (3a) Series
echo [5] Nothing Phone (3)
echo [6] Nothing Phone (4a)
echo [7] CMF Phone (1) - Phone (2) Pro
echo [X] Exit
echo.

set /p DEVICE_CHOICE=Enter your selection: 

set "FLASH_SCRIPT_URL="
if "%DEVICE_CHOICE%"=="1" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/spacewar/Windows/flash_all.bat"
if "%DEVICE_CHOICE%"=="2" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/pong/Windows/flash_all.bat"
if "%DEVICE_CHOICE%"=="3" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/pacman/Windows/flash_all.bat"
if "%DEVICE_CHOICE%"=="4" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/asteroids/Windows/flash_all.bat"
if "%DEVICE_CHOICE%"=="5" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/metroid/Windows/flash_all.bat"
if "%DEVICE_CHOICE%"=="6" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/frogger/Windows/flash_all.bat"
if "%DEVICE_CHOICE%"=="7" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/galaga-tetris/Windows/flash_all.bat"
if /I "%DEVICE_CHOICE%"=="X" exit /b 0

if "%FLASH_SCRIPT_URL%"=="" (
    echo [ERROR] Invalid selection. Exiting...
    pause
    exit /b 1
)

:: Download with retries
set "MAX_RETRIES=3"
set "RETRY_DELAY=5"
echo.

for /L %%i in (1,1,%MAX_RETRIES%) do (
    echo [DOWNLOAD] Attempt %%i of %MAX_RETRIES%: Downloading flash script...
    curl --ssl-no-revoke -L -o "%EXTRACT_DIR%\flash_all.bat" "%FLASH_SCRIPT_URL%" && goto :success
    echo [WARNING] Download failed. Retrying in %RETRY_DELAY% seconds...
    timeout /t %RETRY_DELAY% /nobreak >nul
)

echo [ERROR] All download attempts failed! Please check your internet connection.
pause
exit /b 1

:success
echo [SUCCESS] Download complete. Saved to: %EXTRACT_DIR%\flash_all.bat
echo.

:POST_DOWNLOAD
set /p open_dir=Open extracted folder in Explorer? (Y/N): 
if /I "%open_dir%"=="Y" start "" "%EXTRACT_DIR%"

echo.
echo Press any key to exit...
pause >nul

:: SPDX-FileCopyrightText: spike0en
:: SPDX-License-Identifier: MIT

@echo off
setlocal enabledelayedexpansion
title Extraction Utility for Nothing Archive Files

:: Find 7-Zip executable in expected locations
set "SEVENZIP="
for %%I in (
    "%ProgramFiles%\7-Zip\7z.exe"
    "%ProgramFiles(x86)%\7-Zip\7z.exe"
    "%UserProfile%\AppData\Local\7-Zip\7z.exe"
    "C:\7z.exe"
) do if exist %%I set "SEVENZIP=%%I"

echo.
echo =========================================================
echo Extraction Utility for Nothing Archive Files         
echo https://github.com/spike0en/nothing_archive 
echo https://t.me/s/nothing_archive 
echo Author: Spike (spike0en)
echo =========================================================
echo.

echo =========================================================
echo Checking for 7-Zip Existence      
echo =========================================================
echo.
:: Check if 7-Zip was found
if defined SEVENZIP (
    echo 7-Zip found at: %SEVENZIP%
) else (
    echo 7-Zip not found!
    echo Please install 7-Zip from the link given below: 
    echo https://www.7-zip.org/download.html
    echo After installation run this script again...
    echo ===============================================
    pause
    exit /b
)

echo.
echo =========================================================
echo Current working directory:
echo %CD%
echo =========================================================

:: Detect available categories archives in working dir
set "BOOT="
set "FIRMWARE="
set "LOGICAL="

for %%F in (*-image-boot.7z) do set BOOT=1
for %%F in (*-image-firmware.7z) do set FIRMWARE=1
for %%F in (*-image-logical.7z.001) do set LOGICAL=1

:: If no matching files found, exit
if not defined BOOT if not defined FIRMWARE if not defined LOGICAL (
    echo No valid image files found for extraction!
    pause
    exit /b
)

:: Prompt user to validate which category archives to extract
echo.
echo Select which categories to extract 
echo (e.g., 12 for Boot and Firmware):
echo.
if defined BOOT echo [1] Boot
if defined FIRMWARE echo [2] Firmware
if defined LOGICAL echo [3] Logical
echo [A] All
echo [X] Exit
echo.

set /p CHOICE=Enter your selection: 

:: Handle multiple selections
set "EXTRACT_BOOT="
set "EXTRACT_FIRMWARE="
set "EXTRACT_LOGICAL="

:: If user enters a valid choice, enable extraction for selected categories
if not "%CHOICE%"=="" (
    if not "%CHOICE:1=%"=="%CHOICE%" set EXTRACT_BOOT=1
    if not "%CHOICE:2=%"=="%CHOICE%" set EXTRACT_FIRMWARE=1
    if not "%CHOICE:3=%"=="%CHOICE%" set EXTRACT_LOGICAL=1
)

:: If user selects 'A', enable all categories
if /I "%CHOICE%"=="A" (
    set EXTRACT_BOOT=1
    set EXTRACT_FIRMWARE=1
    set EXTRACT_LOGICAL=1
)

:: If user selects 'X', exit the script
if /I "%CHOICE%"=="X" exit /b

:: If no category selected, exit
if not defined EXTRACT_BOOT if not defined EXTRACT_FIRMWARE if not defined EXTRACT_LOGICAL (
    echo No valid selection made. Exiting...
    pause
    exit /b
)

echo.
echo =========================================================
echo.
set /p choice=Proceed with default extraction directory? (Y/N): 

if /I "%choice%"=="Y" (
    :: Generate timestamp-based folder name using PowerShell
    for /f %%I in ('powershell -command "Get-Date -Format 'yyyyMMdd_HHmmss'"') do set "EXTRACT_DIR=%CD%\flash_%%I"
) else (
    echo.
    set /p EXTRACT_DIR=Enter custom extraction directory path: 
)

:: Ensure directory exists
if not exist "%EXTRACT_DIR%" mkdir "%EXTRACT_DIR%"

echo.
echo =========================================================
echo Extraction directory set to:
echo %EXTRACT_DIR%
echo =========================================================
echo.

:: Start extracting based on user choices
echo Extracting files...
echo ---------------------------------------------------

if defined EXTRACT_BOOT (
    for %%F in (*-image-boot.7z) do (
        echo Extracting: %%F
        %SEVENZIP% x "%%F" -aoa -o"%EXTRACT_DIR%"
    )
)

if defined EXTRACT_FIRMWARE (
    for %%F in (*-image-firmware.7z) do (
        echo Extracting: %%F
        %SEVENZIP% x "%%F" -aoa -o"%EXTRACT_DIR%"
    )
)

if defined EXTRACT_LOGICAL (
    for %%F in (*-image-logical.7z.001) do (
        echo Extracting multi-part archive: %%F
        %SEVENZIP% x "%%F" -aoa -o"%EXTRACT_DIR%"
    )
)

echo.
echo =========================================================
echo Extraction complete.
echo =========================================================
echo.
:: Ask user if they want to download the flash script
set /p DOWNLOAD_CHOICE=Do you want to download the flashing script for your model? (Y/N): 

if /I "%DOWNLOAD_CHOICE%"=="N" (
    echo Skipping script download...
    goto POST_DOWNLOAD
)

if /I not "%DOWNLOAD_CHOICE%"=="Y" (
    echo Invalid input. Skipping download...
    goto POST_DOWNLOAD
)

echo.
echo =========================================================
echo Download Fastboot Flashing Script   
echo https://github.com/spike0en/nothing_fastboot_flasher 
echo Ensure that an active internet connection is available!
echo =========================================================

:: Prompt user for device model selection
echo.
echo =========================================================
echo Select your device model:
echo [1] Nothing Phone (1)
echo [2] Nothing Phone (2)
echo [3] Nothing Phone (2a) Series
echo [4] Nothing Phone (3a) Series
echo [5] CMF Phone (1)
echo [X] Exit
echo =========================================================
echo.

set /p DEVICE_CHOICE=Enter your selection: 

:: Map user choice to the correct URL
set "FLASH_SCRIPT_URL="
if "%DEVICE_CHOICE%"=="1" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/spacewar/Windows/flash_all.bat"
if "%DEVICE_CHOICE%"=="2" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/pong/Windows/flash_all.bat"
if "%DEVICE_CHOICE%"=="3" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/pacman/Windows/flash_all.bat"
if "%DEVICE_CHOICE%"=="4" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/asteroids/Windows/flash_all.bat"
if "%DEVICE_CHOICE%"=="5" set "FLASH_SCRIPT_URL=https://raw.githubusercontent.com/spike0en/nothing_fastboot_flasher/tetris/Windows/flash_all.bat"
if /I "%DEVICE_CHOICE%"=="X" exit /b

:: Validate selection
if "%FLASH_SCRIPT_URL%"=="" (
    echo Invalid selection. Exiting...
    pause
    exit /b
)

:: Ensure extraction directory exists
if not exist "%EXTRACT_DIR%" mkdir "%EXTRACT_DIR%"

:: Download the corresponding flash_all.bat script using curl and retry on failure
set "MAX_RETRIES=3"
set "RETRY_DELAY=5"

for /L %%i in (1,1,%MAX_RETRIES%) do (
    echo Attempt %%i of %MAX_RETRIES%: Downloading...
    curl --ssl-no-revoke -L -o "%EXTRACT_DIR%\flash_all.bat" "%FLASH_SCRIPT_URL%" && goto :success
    echo Download failed. Retrying in %RETRY_DELAY% seconds...
    timeout /t %RETRY_DELAY% /nobreak >nul
)

echo All download attempts failed! Please check your internet connection.
pause
exit /b

:success
echo Download complete. Saved to: %EXTRACT_DIR%\flash_all.bat
echo.
echo =========================================================
echo.

:POST_DOWNLOAD
:: Ask user if they want to open the extracted folder
set /p open_dir=Open extract dir in Explorer? (Y/N): 
if /I "%open_dir%"=="Y" (
    start "" "%EXTRACT_DIR%"
)

echo.
echo Press any key to exit...
pause >nul

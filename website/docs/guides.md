---
sidebar_position: 4
title: Guides
description: Step-by-step guides for bootloader unlocking, rooting, OTA updates, and Nothing device customization.
keywords: [nothing bootloader unlock, root nothing phone, nothing fastboot, nothing ota updates, nothing dialer codes, remap essential key]
---

# How-to Guides

Step-by-step guides on several aspects.


## General Use & Troubleshooting

Tips, tricks, and general guides for everyday use.

### OTA Sideloading

:::note

- Bootloader unlocking is **not mandatory** to sideload incremental OTA updates. Skip Step A unless you are a rooted user.
- Sideloading official incremental or full OTA updates is safe as long as they are downloaded directly from this archive.
- Do not use third-party sources. All firmware in the Nothing Archive is sourced directly from Nothing’s official OEM servers.  
  This can be verified by inspecting the download URL(s) in the incremental OTA section, which point to official server and not third-party file hosts.
- The built-in Nothing OS offline updater only accepts OEM-signed update packages.
- The updater verifies the firmware hash before installation and will fail if an incorrect or mismatched OTA zip is used.
- The same verification applies to full OTA packages; they will not install unless their integrity is intact.
- Because of these checks, it is not possible to brick your device by sideloading an official OTA zip on a locked bootloader.
- For Open Beta Test updates, sideload them via `Nothing Beta Updater Hub` (name might change in future) provided by the OEM if the dialer method does not work
  You can launch the interface from Settings. This happens when you have installed the OEM's beta updater app which overrides the stock inbuilt version.
- For visual references, see the images [here](https://github.com/spike0en/nothing_archive/tree/main/assets/sideloading) in the listed order.

:::

<br />

A. **Restoring Stock Partitions (For Rooted Users Only)**  
  :::tip
  If your bootloader is locked, skip directly to Point B!
  :::

1. **Check your current Nothing OS version:**  
   - Go to `Settings > About phone > Tap the device banner`.  
   - Note down the build number.  

2. **Fetch stock images for your current firmware build:**  
   - Download the `-boot-image.7z` file.  
   - Extract the archive to obtain `.img` files.  

3. **Identify the required partitions:**  
   - **Qualcomm Devices:** `boot`, `init_boot`, `vendor_boot`, `recovery`, `vbmeta`  
   - **MediaTek Devices:** `init_boot`, `vbmeta`, `lk`

4. **Flash stock partitions** in bootloader mode:  
   :::note
   Only modified partitions are required to be flashed. Also skip any missing partitions based on your SoC platform. 
   :::
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   fastboot flash --slot=all lk lk.img
   ```

5. **Reboot to system and update via System Updater:**
   - If the update **fails**, proceed with **manual sideloading** in the next section.

6. **Restoring Root (Optional):**
   - After updating, you may re-root by **flashing a patched boot image** for the updated NOS version.
   - **Modules will remain intact** after re-rooting.

<br />

B. **Proceed with Sideloading** 

 - **Download the Correct Update Firmware File:**  
   - Find the correct OTA firmware file for your device from [here](/docs/firmware).

 - **How to Select the Right File?**  
   - Navigate to the repository and select your device model.  
   - Look for the Incremental OTA column.  
   - **Verify your current OS Build Number**:  
    - Go to: `Settings > System > About Phone`.  
    - Tap the **device banner** and note the **Build Number**.

 - **Example:**  
   - Suppose your **Phone (2)** has the build number: `Pong_U2.6-241016-1700` 
    - Assuming the latest available OTA update is: `Pong_V3.0-241226-2001`
    - The corresponding update pathway would be: `Pong_U2.6-241016-1700` -> `Pong_V3.0-241226-2001`
   - Ensure you select the correct pathway based on your device and OS version.
    - Refer to [this](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg) for better clarity.

 - **Create the `ota` Folder:** 
   - Create a folder named `ota` in your device's **internal storage**, full path being:  
     ```text
     /sdcard/ota/
     ```
   - Move the downloaded `<firmware>.zip` file to this folder.

 - **Access the Nothing Offline OTA Updater:**  
    - Open the **Phone app** and dial:  
      ```text
      *#*#682#*#*
      ```
   - This will launch the built-in offline updater tool.  
   - The UI may show `NothingOfflineOtaUpdate` or `NOTHING BETA OTA UPDATE` — both work.

 - **Apply the Update:**  
   - The updater will automatically detect the update file.  
   - If not detected, manually browse and import the OTA file.  
   - Tap `Directly Apply OTA` or `Update` (based on the app UI).  
   - Wait for the update to complete —your device will reboot automatically.

:::note

- If the updater shows an **unknown error**, try using the **"Browse"** option instead of manually copying the file to the **"ota"** folder.
- **Full OTA firmware** can be sideloaded if incremental OTA fails.
- **Full OTA cannot be used to downgrade** — it can only update to the same or a higher build.
- **Unlocked bootloader users** can flash full OTA via custom recoveries (e.g., OrangeFox for Phone (2)).
- **Not every release has a Full OTA file** — use incrementals instead in such cases.

:::


<hr />

### Safe Mode

- [Rebooting to Safe Mode](https://www.hardreset.info/devices/nothing/nothing-phone-2/safe-mode/)


<hr />

### Dialer Codes

Dialer codes (USSD) that you can dial to access hidden menus and diagnostics.

| Code | Function |
|------|----------|
| `*#06#` | Shows IMEI and Serial Number |
| `*#07#` | Displays SAR levels and regulatory info |
| `*#*#569#*#*` | Opens Nothing Feedback / Log tool |
| `*#*#0#*#*` | Hardware test menu (screen, sensors, touch) |
| `*#*#9#*#*` | Opens Nothing Diagnostics menu |
| `*#*#225#*#*` | Shows Calendar storage info |
| `*#*#426#*#*` | Google Play / Firebase diagnostic info |
| `*#*#4636#*#*` | Testing menu (phone, battery, usage stats, Wi-Fi) |
| `*#*#682#*#*` | Opens Offline OTA Updater (won't work if Nothing Beta Hub is installed) |


---

## Device Features & Accessories

Guides for specific hardware tweaks and pairings.

### Unlocking Bauhaus Theme

The Bauhaus-inspired theme is a special edition feature that can be unlocked across various Nothing phone models.

#### Phone (2a) Special Edition
- [Unlock Hidden Feature](https://nothing.community/d/11058-hidden-feature-of-phone-2a-special-edition) by RapidZapper

#### Other Nothing Models

**Requirements:**
- PC with ADB & Fastboot
- [SetEdit App](https://github.com/MuntashirAkon/SetEdit)

**Steps:**

1. **Enable Developer Options:** Go to `Settings > About phone > Tap "Build number" 7 times`.
2. **Enable USB Debugging:** Go to `Settings > System > Developer options > Enable USB Debugging`.
3. **Install SetEdit via ADB:**
   - Rename the downloaded APK to `SetEdit.apk`.
   - Run the following command:
     ```sh
     adb install --bypass-low-target-sdk-block SetEdit.apk
     ```
4. **Unlock the Theme:**
   - Open SetEdit and grant any requested permissions.
   - In the **System Table**, look for `theme_bauhaus_enable`.
   - Set the value to `1` (Set it back to `0` to disable).
5. **Apply the Theme:**
   - Go to Nothing Launcher Settings and apply the new theme.

:::warning

- **Do NOT modify any other values in SetEdit!!**
- Changing random system settings may cause instability or system issues.

:::

### Essential Key Remapping

Guides for remapping the Essential Key on Phone (3):

| Guide | Author |
|-------|--------|
| [Reddit Guide](https://www.reddit.com/r/NothingTech/comments/1jzljrf/guide_how_to_remap_the_essential_key_on_the_phone/) | acruzjumper, McKeviin, DKmarc & Pealoaf |
| [Quick Remap Guide](https://www.reddit.com/r/NothingTech/comments/1jv6gea/quick_guide_to_remap_the_essential_space_button/) | David_Ign |
| [XDA Guide](https://xdaforums.com/t/how-to-disable-or-remap-the-essentials-button.4755184/) | rwilco12 |
| [GitHub Guide](https://github.com/z3phydev/How-to-remap-or-disable-the-Essential-Key) | z3phydev |


<hr />

### Gadgetbridge Related

- [Supported Models and features](https://gadgetbridge.org/gadgets/wearables/nothing/)
- [Nothing CMF server pairing](https://gadgetbridge.org/basics/pairing/nothing-cmf-server/)


---

## Advanced Guides

:::warning
Recommended for power users only. These procedures can brick your device or void warranty if done incorrectly.
:::

These guides are ordered chronologically. It is highly recommended to follow this exact sequence.

### Prerequisites & Tools

Essential tools for advanced guides below.

#### USB Drivers

Essential drivers for USB file transfers and device recognition.

- [Google USB Drivers for Windows](https://dl.google.com/android/repository/usb_driver_r13-windows.zip)
- Installation guides: [USB](https://droidwin.com/android-usb-drivers) | [Fastboot](https://droidwin.com/how-to-install-fastboot-drivers-in-windows-11/)

#### Platform Tools (ADB & Fastboot)

Download Android SDK Platform-Tools:
- [Windows / Linux / macOS](https://developer.android.com/studio/releases/platform-tools)
- [Installation Guide](https://www.xda-developers.com/install-adb-windows-macos-linux/)

**Windows (winget):**
```cmd
winget install --id=Google.PlatformTools -e
```

**macOS/Linux (Homebrew):**
```bash
brew install --cask android-platform-tools
```


<hr />

### Unlocking Bootloader

:::info

- Unlocking the bootloader voids the OEM warranty. However, you can reflash the stock ROM and relock the bootloader to restore it.
- Regardless of other factors, you will lose Widevine L1/DRM certification, which will downgrade to L3.  
- You will lose [device integrity](https://developer.android.com/google/play/integrity/overview), which may cause apps relying on this to stop working unless fixed later with root access.  
  [This guide](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) may be helpful for resolving this issue. 

:::

A. **Prerequisites**
- **Backup your data** (unlocking will erase everything).
- **Install ADB & Fastboot tools** – [Download here](https://developer.android.com/studio/releases/platform-tools).
- **Install USB drivers** – [Google USB Drivers](https://developer.android.com/studio/run/win-usb).
- **Enable Developer Options**:
  - `Settings > About phone > Tap "Build number" 7 times.`
- **Enable USB Debugging & OEM Unlocking**:
  - `Settings > System > Developer options > Enable USB Debugging & OEM Unlocking.`
- **Remove Screen Lock/PIN/Password and Logged-in Accounts (optional but recommended)**
  - Removing accounts before relocking the bootloader helps prevent Google FRP (Factory Reset Protection) lock. If FRP is triggered, the device will ask for the previously linked Google account after a factory reset. If you forget the credentials or can't access the account, you may be locked out of your device. To avoid this, it's recommended to remove all Google accounts before relocking.

B. **Unlocking Process**
- **Connect your phone to a PC** via USB.
- **Open a command prompt** in the platform-tools folder:
  - Windows: `Shift + Right Click` > **Open Command Prompt/Powershell here**.
  - Mac/Linux: Open **Terminal** and navigate to platform-tools.
- **Verify device connection**:
  ```sh
  adb devices
  ```
  If prompted, allow USB debugging on the phone.

- **Reboot to bootloader:**
   ```sh
   adb reboot bootloader
   ```

- **Verify fastboot connection:**
   ```sh
   fastboot devices
   ```
   If no device is detected, reinstall USB drivers.

- **Unlock the bootloader:**
   ```sh
   fastboot flashing unlock
   ```

- **Confirm on your phone:**
  - Use **Volume Keys** to navigate and **Power Button** to confirm.
  - Your device will **erase all data** and reboot.

C. **Post-Unlock**
  - Set up your phone again.
  - **Verify bootloader status**:
    ```sh
    Settings > System > Developer options > OEM Unlocking should be enabled.
    ```

  - Bootloader is now unlocked and your device will show an Orange State warning at boot—this is normal.


<hr />

### Rooting

:::info

- Rooting **voids the OEM warranty** and may break OTA updates unless stock images are restored before updating.
- Always ensure the **boot / init_boot image exactly matches your current firmware build**.
  Flashing an incorrect or mismatched image **will cause bootloops**.
- **Always use `init_boot` over `boot` image for rooting if the partition exists**.
- Rooting requires an **unlocked bootloader**.
- Users can also refer to the visual guides linked alongside: [orailnoor](https://www.youtube.com/watch?v=v0i4rftKNWs) | [Droidwin](https://www.youtube.com/watch?v=4T1ZHDUCBsw) | [EpicDroid](https://www.youtube.com/watch?v=vXIBfyX7s-k).

:::

<br />

A. **Prerequisites**
- **Unlocked bootloader** with **USB Debugging enabled**
- A **PC with ADB & Fastboot**  
  *or* another Android phone with **USB-OTG + ADB app (e.g. [Bugjaeger](https://play.google.com/store/apps/details?id=eu.sisik.hackendebug&hl=en_IN))**  
  *or* a **custom recovery (e.g. TWRP / OrangeFox / AOSP based recoveries)**
- Basic familiarity with **ADB / Fastboot**
- **Stock firmware** matching your current build (for extracting images)
- Recommended root solutions:
  - [Magisk](https://github.com/topjohnwu/Magisk/releases) | [Installation](https://topjohnwu.github.io/Magisk/install.html)
  - [KernelSU (KSU)](https://github.com/tiann/KernelSU) | [Installation](https://kernelsu.org/guide/installation.html)
  - [KernelSU Next (KSUN)](https://github.com/KernelSU-Next/KernelSU-Next) | [Installation](https://kernelsu-next.github.io/webpage/pages/installation.html)

<br />

B. **Check Current Software Version**
- On your phone, navigate to: Settings > About phone > Tap the Nothing OS banner.
- **Note down the Build Number**
- Example: `Pong_B4.0-251119-1654`
- Ignore any regional suffix like `IND`/`EEA`/`TUR` and so on.

<br />

C. **Fetch Stock Boot / Init_boot Image**
- Navigate to the [release index](/docs/firmware).
- Select your **device model**
- Open **OTA Images** for your exact build
- Download the corresponding archive: `*-image-boot.img.7z` from release assets.

- Extract the archive and locate:
  - `init_boot.img` **(preferred, if present)**
  - `boot.img` (only if `init_boot` does not exist)

- **Transfer the image to your device**
  ```sh
  adb push init_boot.img /sdcard/Download/
  # or
  adb push boot.img /sdcard/Download/
  ```

<br />

D. **Patch the Image**

**Magisk**
- Install the latest Magisk APK on your device.
- Open Magisk → Install → Select and Patch a File.
- Choose the transferred `init_boot` (preferred) / `boot` image. 
- Magisk will generate: `magisk_patched-XXXXX.img`

<br />

**KernelSU / KernelSU Next**  

:::note

- For Nothing Phone (2): KSU based root method is supported with stock `boot.img`. But KSUN or SUSFS support requires a custom compiled kernel with the patches added.
- Known pre-patched custom kernel options available include: 
  [arter97 kernel](https://xdaforums.com/t/r44-arter97-kernel-for-nothing-phone-2.4631313/) - KSU prepatched. Does not support NOS 4.0+ yet | 
  [Meteoric Kernel (EOL)](https://github.com/HELLBOY017/kernel_nothing_sm8475) - KSUN + SUSFS prepatched. Does not support NOS 4.0+. |
  [Wild Kernel fork](https://github.com/MiguVT/Meteoric_KernelSU_SUSFS) - KSU + SUSFS prepatched. | 
  [Wild Kernel](https://github.com/WildKernels/GKI_KernelSU_SUSFS) - KSUN + SUSFS prepatched. Supports 5.10-android12. 
- Nothing models with Android 13+ vendors out of box i.e, ones launched after Phone (2) will support KSUN patching method.

:::

- Patching method is similar to that of magisk. From the KSU/KSUN manager tap on not installed > patch the `init_boot.img` and transfer the patched image to PC.

- Reboot to bootloader:
  ```sh
  adb reboot bootloader
  ```

- Flash the patched image
  ```bash
  fastboot flash init_boot <drag and drop patched_init_boot.img>
  ```

- Reboot to system:
  ```bash
  fastboot reboot
  ``` 

- The device should be rooted with KSU/KSUN.


<hr />

### Play Integrity

| Guide | Link |
|-------|------|
| Fix Play Integrity & Root Detection | [Wiki](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) |


<hr />

### Backing Up Essential Partitions

:::info

- After unlocking the bootloader, it is crucial to back up essential partitions such as `persist`, `modemst1`, `modemst2`, `fsg`, etc., **before** flashing custom ROMs or kernels.
- These partitions contain important data, including IMEI, network settings, and fingerprint sensor calibration.
- If lost or corrupted, your device may experience **loss of cellular connectivity, fingerprint issues, or even become bricked**.
- Creating backups ensures you can **restore your device** if something goes wrong.

:::

A. **Requirements**
- **Unlocked bootloader**
- **Root access** (via Magisk/KSU/Apatch)
- **Termux app** (install via F-Droid or Play Store)
- **Check Partition Paths:**
  - **Qcom devices:** `/dev/block/bootdevice/by-name/`
  - **MTK devices:** `/dev/block/by-name/`

B. **Backup Instructions**
- **For Qualcomm (QCom) Devices:**
  - Open **Termux** and grant root access using:
    ```sh
    su
    ```

  - Copy and paste the following command in one go:
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    This will create image files of **all partitions except `super` & `userdata`** in the **Internal Storage** inside a folder named **"partitions_backup"**.

  - **[Optional]** If the above command fails, try this alternative:
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **For MediaTek (MTK) Devices:**
  - Open **Termux** and grant root access using:
    ```sh
    su
    ```

  - Copy and paste all the following commands in one go:
    ```sh
    mkdir -p /sdcard/partitions_backup/
    cd /sdcard/partitions_backup
    dd if=/dev/block/by-name/nvram of=/sdcard/partitions_backup/nvram.img
    dd if=/dev/block/by-name/nvdata of=/sdcard/partitions_backup/nvdata.img
    dd if=/dev/block/by-name/persist of=/sdcard/partitions_backup/persist.img
    dd if=/dev/block/by-name/nvcfg of=/sdcard/partitions_backup/nvcfg.img
    dd if=/dev/block/by-name/protect1 of=/sdcard/partitions_backup/protect1.img
    dd if=/dev/block/by-name/protect2 of=/sdcard/partitions_backup/protect2.img
    ```

C. **Storing Backup**
  - Move the **"partitions_backup"** folder to your **PC or secure storage**.
  - **Do NOT share these backups!** They contain unique device data like IMEI.

D. **Restoring Partitions**
 - **MTK Devices:**
   ```sh
   fastboot flash nvram nvram.img
   fastboot flash nvdata nvdata.img
   fastboot flash nvcfg nvcfg.img
   fastboot flash persist persist.img
   ```
   Reboot to **recovery mode** → Perform **factory reset** → Reboot to **system**.
   - Ref link: [Nothing Phone (2a) DVT Engineering Sample: Recovering Baseband and IMEI Records](https://bluehomewu.github.io/posts/Restoring-Baseband-and-IMEI-on-Nothing-Phone-2a-DVT/)
   - Post was written with Chinese(Traditional) language but can be translated to English using browser translation features.


 - **QCom Devices:**
   ```sh
   fastboot flash persist persist.img
   fastboot flash modemst1 modemst1.img
   fastboot flash modemst2 modemst2.img
   ```
   **Factory reset is not mandatory in this case.**


<hr />

### Flashing Stock ROM (Unbrick / Downgrade)

:::note

- This is the only recommended method for manually clean flashing to a newer version of stock firmware or downgrading.
- For a better understanding, refer to the visual guides linked alongside: [Droidwin](https://www.youtube.com/watch?v=YCYEjdC3oHM) | [The Nothing Lab](https://www.youtube.com/watch?v=l0P9gosl64s) | [QZX Tech](https://www.youtube.com/watch?v=66H2MVElyAY)

:::

A. **Preparation of Flashing Folder:**
  - Download the following files for your device model and firmware build, and place them in a dedicated folder:
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x
    - `-hash.sha256` - This is optional but recommended for verifying file integrity and detecting missing parts.

  - Install 7-Zip from https://www.7-zip.org/

  - Optional (**recommended**): You can use extraction scripts instead of manual steps:
    - [Windows](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.bat)
    - [Bash](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.sh)
    - Run the script from the same folder where the downloaded files are located.

  - Extract files:
    - Windows: Right-click → Extract to "*\"
    - Bash users: `7za -y x "*.7z*"`

  - In rare cases, download managers may modify the extensions of split logical files.
  - Rename:
    - `-image-logical.7z.001.7z` → `-image-logical.7z.001`
    - `-image-logical.7z.002.7z` → `-image-logical.7z.002`
  - Then retry the extraction.

B. **Proceeding with Flashing:**
  - Install compatible USB drivers from [here](https://developer.android.com/studio/run/win-usb).
  - Ensure that `Android Bootloader Interface` is visible in **Device Manager** when the device is in **bootloader mode**.
  - If the extraction script was used earlier, execute it directly. Otherwise:
    - Move all extracted image files into a single folder along with the [Nothing Fastboot Flasher Script](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download).
    - Place the `-hash.sha256` file in the same directory. 
    - Always download the latest script to ensure hotfixes are included.
  - Run the script while connected to the internet (to fetch latest `platform-tools`) and follow the prompts:
    - Answer the confirmation questionnaire.
    - Skip or proceed with hash checks accordingly. 
    - Choose whether to wipe data: (Y/N) [Clean Flash / Downgrade = `Y` | Dirty Flash / Upgrade = `N`]
    - Choose whether to flash to both slots: (Y/N)
    - Disable Android Verified Boot: (N) [Please note that if you choose `Y` here, bootloader cannot be unlocked later on!]
  - Verify that all partitions have been successfully flashed.
    - If successful, choose to reboot to system: (Y)
    - If errors occur, reboot to bootloader and reflash after addressing the failure. Rebooting to system without doing so might result in soft/hard bricks.


<hr />

### Relocking Bootloader

A. **Prerequisites**
  - Remove **Screen Lock/PIN/Password and Logged-in Accounts** (optional but recommended).
  - Clean-flash the **stock ROM** following [Flashing Guide](#flashing-stock-rom-unbrick--downgrade). **Relocking the bootloader with modified partitions without flashing stock firmware may brick the device!**
  - Backup all data (relocking will **erase everything**).
  - Install **ADB & Fastboot tools** and USB drivers if not already set up.

B. **Relocking Process**
  - If you are in the system, reboot to bootloader:
    ```sh
    adb reboot bootloader
    ```

  - Verify fastboot connection:
    ```sh
    fastboot devices
    ```

  - Initiate bootloader relocking:
    ```sh
    fastboot flashing lock
    ```

  - Confirm on your phone:
    - Use **Volume Keys** to navigate and **Power Button** to confirm.
    - The device will be formatted and reboot with a locked bootloader.

C. **Post-Relock**
  - Set up your device again.
  - The bootloader is now locked!


---

## Aftermarket Development

:::note
This section is community-managed and not affiliated with Nothing. Unlocking the bootloader will void your OEM warranty.
:::

Stay updated with custom ROMs, kernels, and development projects.

### Device Update Channels (Telegram)

**Nothing:**
| Device | Channel |
|--------|---------|
| Phone (1) | [Updates](https://t.me/s/NothingPhone1Updates) |
| Phone (2) | [Updates](https://t.me/s/NothingPhone2updates) |
| Phone (2a) Series | [Updates](https://t.me/s/NothingPhone2aUpdates) |
| Phone (3a) Series | [Updates](https://t.me/s/NothingPhone3aUpdates) |
| Phone (3) | [Updates](https://t.me/s/Phone3Updates) |
| Phone (4a) Series| [Updates](https://t.me/s/Phone4aUpdates) |

**CMF by Nothing:**
| Device | Channel |
|--------|---------|
| Phone (1) | [Updates](https://t.me/s/CMFPhone1Updates) |
| Phone (2) Pro / Phone (3a) Lite | [Updates](https://t.me/s/CMFPhone2GlobalUpdates) |



**English** | [Deutsch](README_de-DE.md) | [Español](README_es-ES.md) | [Français](README_fr-FR.md) | [हिन्दी](README_hi-IN.md) | [Italiano](README_it-IT.md) | [日本語](README_ja-JP.md) | [Русский](README_ru-RU.md) | [Türkçe](README_tr-TR.md) | [简体中文](README_zh-CN.md)

# Nothing Archive

<img src="../assets/branding/logo.png" width="96" alt="Nothing Archive Logo">

[![Hits](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive&label=Hits&icon=github&color=%23b02a37&labelColor=2E2E3F)](https://github.com/spike0en/nothing_archive)

[![Stars](https://img.shields.io/github/stars/spike0en/nothing_archive?label=Stars&logo=github&logoColor=white&color=fb481f&labelColor=2E2E3F&style=flat)](https://github.com/spike0en/nothing_archive/stargazers)
[![Contributors](https://img.shields.io/github/contributors/spike0en/nothing_archive?label=Contributors&logo=github&logoColor=white&color=2b2a7b&labelColor=2E2E3F&style=flat)](https://github.com/spike0en/nothing_archive/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/spike0en/nothing_archive?label=Forks&logo=github&logoColor=white&color=eeb705&labelColor=2E2E3F&style=flat)](https://github.com/spike0en/nothing_archive/network/members)

[![Flashing Scripts](https://img.shields.io/badge/Fastboot%20Flashing%20Scripts-2E2E3F?logo=github&logoColor=white&labelColor=2E2E3F&color=67119E&style=flat)](https://github.com/spike0en/nothing_flasher)
[![Support](https://img.shields.io/badge/Nothing%20Community-2E2E3F?style=flat&logo=telegram&logoColor=white&color=1986F2&labelColor=2E2E3F)](https://t.me/s/Nothing_Archive)

[![Total Downloads](https://img.shields.io/github/downloads/spike0en/nothing_archive/total?label=Downloads&logo=github&logoColor=white&color=9E9D10&labelColor=2E2E3F&style=flat)](https://github.com/spike0en/nothing_archive/releases)
[![Latest Release](https://img.shields.io/github/release/spike0en/nothing_archive?label=Latest&logo=git&logoColor=white&color=18673F&labelColor=2E2E3F&style=flat)](https://github.com/spike0en/nothing_archive/releases/latest)

---

## Index 📑

- [About the Project](#overview-)
- [Disclaimer](#disclaimer-)
- [Notes](#notes-)
- [Categorization](#categorization-)
- [Downloads](#downloads-)
- [Integrity](#integrity-check-)
- **Guides**
  - [OTA Sideloading](#i-ota-sideloading-)
  - [Unlocking Bootloader](#ii-unlocking-bootloader-)
  - [Backing Up Partitions](#iii-backing-up-essential-partitions-after-unlocking-bootloader-)
  - [Flashing Stock ROM Using Fastboot](#iv-flashing-the-stock-rom-using-fastboot-)
  - [Relocking Bootloader](#v-relocking-bootloader-)
- [Acknowledgments](#acknowledgments-)
- [Support the Project](#support-the-project-)

---

## Overview 🔍

**Nothing Archive** is the most up-to-date Nothing OS firmware repository, offering official OTA updates, full firmware packages, and stock OTA images for **Nothing Phone 1, Phone 2, Phone 2a, Phone 2a Plus, Phone 3a, Phone 3a Pro**, and **CMF Phone 1**, all sourced directly from official OEM servers. All files are [archived](https://archive.org/details/nothing-archive), ensuring easy access and long-term preservation.

### Features & Benefits:

- 📡 **Direct OTA Indexing** – Tracks **Nothing OS OTA update links** from official servers, providing access to **incremental and full updates** for Nothing and CMF devices.
- 🛠️ **Manual Installation (Sideloading)** – Install **Nothing OS firmware manually** during staged rollouts or when OTA updates fail using the inbuilt **offline Nothing OS offline updater or beta updater app** or via **ADB sideload** using a custom recovery when available.
- 📦 **Stock OTA Images** – Provides **unmodified OTA images** utilizing AOSP’s OTA extraction tool that allows extracting incremental OTA updates, thus enabling **upgrades, downgrades, and partition flashing** when **full firmware packages** are unavailable.
- 🔓 **Rooting & Unrooting Support** – Provides **stock boot images for Magisk, KernelSU, and Apatch**, while also allowing **unrooting** by flashing the original boot image to keep **OTA updates functional** when modified partitions are detected.
- ⚡ **Flash Firmware & Unbrick Devices** – Provides **fastboot-flashable Nothing OS firmware** to help **resolve boot loops, recover soft-bricked devices, and restore the stock ROM**, as long as fastboot is accessible.

---

## Disclaimer 🚨

By using this archive, users acknowledge and accept these terms:
- **✅ Authenticity** – All firmware files in this archive are **unaltered, unmodified, and sourced directly from the OEM**.
- **⚠️ Flash at Your Own Risk** – Installing firmware on an **unlocked bootloader** device carries inherent risks. Follow instructions carefully to **avoid bricking your device**.
- **📌 Compatibility** – Ensure the firmware matches your **Nothing or CMF device variant** before installation.
- **🚫 No Warranty or Official Support** – This is a **community-driven project, unaffiliated with [Nothing](https://nothing.tech)**. Any **update failures, software bugs, or device issues** remain the OEM’s responsibility. The author and contributors **are not liable for bricked devices** due to incorrect flashing, misuse, or firmware modifications. Always download firmware **directly from this archive** to ensure integrity.
- **🛡️ Open Source Integrity** – Redistribution is permitted **only with proper attribution**. Users are encouraged to support and share this project **to maintain its availability**. **Reselling freely available firmware is strictly prohibited!**

---

## Notes 📝

- Releases for OTA images are tagged and named using the format: `<POST_OTA_VERSION>` and `<POST_OTA_VERSION>`_`<NothingOS Version>`, as shown [here](https://github.com/spike0en/nothing_archive/releases), respectively.
- Region-specific releases are tagged using the format: `<POST_OTA_VERSION>`-`<GLO/EEA>`, applicable to certain older `Spacewar` builds that are not unified. Here, G = GLO (Global), and E = EEA (European Economic Area).
- Nothing OS Open Beta releases are denoted by `-OB` wherever applicable.
- Android Developer preview releases are tagged as `0.0.0-dev`+`<Device Codename>`.`<Incremental Date>`.
- Unless specifically stated otherwise in the release notes, the releases published here are compatible with all regional and color variants of the device.
- For detailed instructions on interpreting the required incremental OTA firmware, refer to [this section](#i-ota-sideloading-).

---

## Categorization 📂

The **unmodified** stock OTA image files are archived in `.7z` format and categorized into three distinct groups based on the nature of their partitions: **Boot**, **Firmware**, and **Logical**, for the respective models as follows:

<details>
  <summary>Nothing</summary>

<br>

| Device | Boot (`-image-boot.7z`) | Firmware (`-image-firmware.7z`) | Logical (`-image-logical.7z.001-00x`) |
|--------|-------------------------|---------------------------------|---------------------------------------|
| **Phone (3)** | `boot`, `dtbo`, `init_boot`, `recovery`, `vbmeta`, `vbmeta_system`, `vbmeta_vendor`, `vendor_boot` **(Total: 8)** | `abl`, `aop`, `aop_config`, `bluetooth`, `cpucp`, `cpucp_dtb`, `devcfg`, `dsp`, `featenabler`, `hyp`, `imagefv`, `keymaster`, `modem`, `multiimgoem`, `multiimgqti`, `pvmfw`, `qupfw`, `shrm`, `soccp_dcd`, `soccp_debug`, `tz`, `uefi`, `uefisecapp`, `xbl`, `xbl_config`, `xbl_ramdump` **(Total: 26)** | `odm`, `product`, `system`, `system_dlkm`, `system_ext`, `vendor`, `vendor_dlkm` **(Total: 7)** |
| **Phone (3a) / Phone (3a) Pro** | `boot`, `init_boot`, `dtbo`, `recovery`, `vbmeta`, `vbmeta_system`, `vbmeta_vendor`, `vendor_boot` **(Total: 8)** | `abl`, `aop`, `aop_config`, `bluetooth`, `cpucp`, `cpucp_dtb`, `devcfg`, `dsp`, `featenabler`, `hyp`, `imagefv`, `keymaster`, `modem`, `multiimgoem`, `pvmfw`, `qupfw`, `shrm`, `tz`, `uefi`, `uefisecapp`, `xbl`, `xbl_config`, `xbl_ramdump` **(Total: 23)** | `system`, `system_dlkm`, `system_ext`, `product`, `vendor`, `vendor_dlkm`, `odm` **(Total: 7)** |
| **Phone (2a) / (2a) Plus** | `boot`, `dtbo`, `init_boot`, `vendor_boot`, `vbmeta` **(Total: 5)** | `apusys`, `audio_dsp`, `ccu`, `connsys_bt`, `connsys_gnss`, `connsys_wifi`, `dpm`, `gpueb`, `gz`, `lk`, `logo`, `mcf_ota`, `mcupm`, `md1img`, `mvpu_algo`, `pi_img`, `preloader_raw`, `scp`, `spmfw`, `sspm`, `tee`, `vcp` **(Total: 22)** | `odm`, `vendor`, `system_ext`, `system`, `vendor_dlkm`, `odm_dlkm`, `system_dlkm`, `product`, `vbmeta_system`, `vbmeta_vendor` **(Total: 10)** |
| **Phone (2)**       | `boot`, `dtbo`, `vendor_boot`, `recovery`, `vbmeta`, `vbmeta_system`, `vbmeta_vendor` **(Total: 7)** | `abl`, `aop`, `aop_config`, `bluetooth`, `cpucp`, `devcfg`, `dsp`, `featenabler`, `hyp`, `imagefv`, `keymaster`, `modem`, `multiimgoem`, `multiimgqti`, `qupfw`, `qweslicstore`, `shrm`, `tz`, `uefi`, `uefisecapp`, `xbl`, `xbl_config`, `xbl_ramdump` **(Total: 23)** | `system`, `system_ext`, `product`, `vendor`, `vendor_dlkm`, `odm` **(Total: 6)** |
| **Phone (1)**       | `boot`, `dtbo`, `vendor_boot`, `vbmeta` **(Total: 4)** | `abl`, `aop`, `bluetooth`, `cpucp`, `devcfg`, `dsp`, `featenabler`, `hyp`, `imagefv`, `keymaster`, `modem`, `multiimgoem`, `qupfw`, `shrm`, `tz`, `uefisecapp`, `xbl`, `xbl_config` **(Total: 18)** | `system`, `system_ext`, `product`, `vendor`, `odm`, `vbmeta_system`, `vbmeta_vendor` **(Total: 7)** |

<br>

</details>

<details>
  <summary>CMF by Nothing</summary>

<br>

| Device | Boot (`-image-boot.7z`) | Firmware (`-image-firmware.7z`) | Logical (`-image-logical.7z.001-00x`) |
|--------|-------------------------|---------------------------------|---------------------------------------|
| **Phone (1)**           | `boot`, `dtbo`, `init_boot`, `vendor_boot`, `vbmeta` **(Total: 5)** | `apusys`, `ccu`, `connsys_bt`, `connsys_gnss`, `connsys_wifi`, `dpm`, `gpueb`, `gz`, `lk`, `logo`, `mcf_ota`, `modem`, `mcupm`, `pi_img`, `preloader_raw`, `scp`, `spmfw`, `sspm`, `tee`, `vcp` **(Total: 20)** | `odm`, `vendor`, `system_ext`, `system`, `vendor_dlkm`, `odm_dlkm`, `system_dlkm`, `product`, `vbmeta_system`, `vbmeta_vendor` **(Total: 10)** |
| **Phone (2) Pro**       | `boot`, `dtbo`, `init_boot`, `vendor_boot`, `vbmeta` **(Total: 5)** | `apusys`, `ccu`, `connsys_bt`, `connsys_gnss`, `connsys_wifi`, `dpm`, `gpueb`, `gz`, `lk`, `logo`, `mcf_ota`, `modem`, `mcupm`, `pi_img`, `preloader_raw`, `scp`, `spmfw`, `sspm`, `tee`, `vcp` **(Total: 20)** | `odm`, `vendor`, `system_ext`, `system`, `vendor_dlkm`, `odm_dlkm`, `system_dlkm`, `product`, `vbmeta_system`, `vbmeta_vendor` **(Total: 10)** |

<br>

</details>

---

## Downloads 📥

Select your **device model** from the dropdown list below to access it's **Release Index**:

---

#### I. Nothing

<details>
  <summary>Phone (3) - Metroid</summary>

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.5 | Metroid-V3.5-250911-2112 | Metroid_V3.5-250829-1700 -> [Metroid_V3.5-250911-2112](https://android.googleapis.com/packages/ota-api/package/c57a7b2a7de6971cc97a0e769cc7909beccc5f25.zip) // Metroid_V3.5-250808-1022 -> [Metroid_V3.5-250911-2112](https://android.googleapis.com/packages/ota-api/package/9f779d3361a0f08cf0865f13874919051413be81.zip) // Metroid_V3.5-250801-1847 -> [Metroid_V3.5-250911-2112](https://android.googleapis.com/packages/ota-api/package/78628297b74161ea5161c4cb61da8fde3ccc6a2e.zip) // Metroid_V3.5-250719-1646 -> [Metroid_V3.5-250911-2112](https://android.googleapis.com/packages/ota-api/package/5fb1c328dfd5886966c56fb05ae9d4d1ad429ec4.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250911-2112) |
| 3.5 | Metroid-V3.5-250829-1700 | Metroid_V3.5-250808-1022 -> [Metroid_V3.5-250829-1700](https://android.googleapis.com/packages/ota-api/package/aa9c5e748bf7084416541eff6bb9a04ea49bcb28.zip) // Metroid_V3.5-250801-1847 -> [Metroid_V3.5-250829-1700](https://android.googleapis.com/packages/ota-api/package/800eb2b95dde5cc1f982d6bb7af546f84cf4a79f.zip) // Metroid_V3.5-250719-1646 -> [Metroid_V3.5-250829-1700](https://android.googleapis.com/packages/ota-api/package/3272a6349ef665eb2a469b42e44188dd3a1561f0.zip) // Metroid_V3.5-250711-2047 -> [Metroid_V3.5-250829-1700](https://android.googleapis.com/packages/ota-api/package/28889f16775447e96bb6d0b44301deac323d3f8c.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/metroid/Metroid_V3.5-250829-1700.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250829-1700) |
| 3.5 | Metroid-V3.5-250808-1022 | Metroid_V3.5-250719-1646 -> [Metroid_V3.5-250808-1022](https://android.googleapis.com/packages/ota-api/package/5b85eb173eced57b515400c9c729c442bc44caec.zip) // Metroid_V3.5-250711-2047 -> [Metroid_V3.5-250808-1022](https://android.googleapis.com/packages/ota-api/package/6847621734461a21e61e95fa2cf1e25178f0a3aa.zip) // Metroid_V3.5-250626-1934 -> [Metroid_V3.5-250808-1022](https://android.googleapis.com/packages/ota-api/package/882f5da98172b53da86a3c6b95ce78e4d5bb72c8.zip) // Metroid_V3.5-250529-1404 -> [Metroid_V3.5-250808-1022](https://android.googleapis.com/packages/ota-api/package/c415d85f74dba4f691c00cdc4cf27dd6a9d02e29.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/metroid/Metroid_V3.5-250808-1022.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250808-1022) |
| 3.5 | Metroid-V3.5-250801-1847 | Metroid_V3.5-250719-1646 -> [Metroid_V3.5-250801-1847](https://android.googleapis.com/packages/ota-api/package/04d47b1a083b61ce07c1897cce87354395cd7047.zip) // Metroid_V3.5-250711-2047 -> [Metroid_V3.5-250801-1847](https://android.googleapis.com/packages/ota-api/package/5a2924f1a1ad3ddeccce7747b950f673aa74d90c.zip) // Metroid_V3.5-250626-1934 -> [Metroid_V3.5-250801-1847](https://android.googleapis.com/packages/ota-api/package/e5b4c6213f2efe61f8048e75d3f0a6a86f2cc2e5.zip) // Metroid_V3.5-250626-1934 -> [Metroid_V3.5-250801-1847](https://android.googleapis.com/packages/ota-api/package/c3e279ea77cd8b057972b87a4740c2f89fffe556.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250801-1847) |
| 3.5 | Metroid-V3.5-250719-1646 | Metroid_V3.5-250711-2047 -> [Metroid_V3.5-250719-1646](https://android.googleapis.com/packages/ota-api/package/c1501de03858f3ac4e6fbfcae468ff07e8c336fa.zip) // Metroid_V3.5-250626-1934 -> [Metroid_V3.5-250719-1646](https://android.googleapis.com/packages/ota-api/package/21e8ef236eee740213eca42aa307f680014c3666.zip) // Metroid_V3.5-250529-1404-> [Metroid_V3.5-250719-1646](https://android.googleapis.com/packages/ota-api/package/3f7ea84647f828e625d46246aec0004e0fa419ae.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/metroid/Metroid_V3.5-250719-1646.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250719-1646) |
| 3.5 | Metroid-V3.5-250711-2047 | Metroid_V3.5-250626-1934 -> [Metroid-V3.5-250711-2047](https://android.googleapis.com/packages/ota-api/package/6096b0ce17b226e8b9707f9a911631fa3138d46f.zip) // Metroid_V3.5-250529-1404-> [Metroid_V3.5-250711-2047](https://android.googleapis.com/packages/ota-api/package/30545d507c2922f6d1e3da12b1782cdf175ff84a.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/metroid/Metroid_V3.5-250711-2047.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250711-2047) |

</details>

<details>
  <summary>Phone (3a) & (3a) Pro - Asteroids</summary>

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.2 | Asteroids-V3.2-250717-1803 | Asteroids_V3.1-250610-1841 -> [Asteroids_V3.2-250717-1803](https://android.googleapis.com/packages/ota-api/package/c054376e8b3cb9f1016e8607e0e4d5c8ffb41524.zip) // Asteroids_V3.1-250529-1004 -> [Asteroids_V3.2-250717-1803](https://android.googleapis.com/packages/ota-api/package/975912e4073f69a85bbe7b379a5c5cf3ef486726.zip) // Asteroids_V3.1-250417-1222 -> [Asteroids_V3.2-250717-1803](https://android.googleapis.com/packages/ota-api/package/e4e9355b2352daf48ff53585d904c679a611aa5a.zip) // Asteroids_V3.1-250417-1222 -> [Asteroids_V3.2-250717-1803](https://android.googleapis.com/packages/ota-api/package/75c693ea7bf17f551eae0a4c0b2fe3c627e2249f.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/asteroids/Asteroids_V3.2-250717-1803.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.2-250717-1803) |
| 3.1 | Asteroids-V3.1-250610-1841 | Asteroids_V3.1-250529-1004 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/751d943338f6302e218b32dafc387276f91ce475.zip) // Asteroids_V3.1-250417-1222 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/dae1cbcfdcebbadd9309c0e3a4ff9a7d6100760f.zip) // Asteroids_V3.1-250401-1916 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/ea0bf8656f7c43b1e4c2cc08b522929683edcb61.zip) // Asteroids_V3.1-250320-2319 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/af84c3d391a7b26885233c1e444c417692e3fd88.zip) // Asteroids_V3.1-250302-1856 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/a0d44359189d797802d63139a5ed9f2d89b44a40.zip) // Asteroids_V3.1-250217-2235 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/b6fef110e6d2bbbdde5060aeda5ad051eabe10df.zip) // Asteroids_V3.1-250112-1904 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/d2f884d6face92c94c4384abba7b0be68d844986.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/asteroids/Asteroids_V3.1-250610-1841_3.1.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250610-1841) |
| 3.1 | Asteroids-V3.1-250529-1004 | Asteroids_V3.1-250417-1222 -> [Asteroids_V3.1-250529-1004](https://android.googleapis.com/packages/ota-api/package/bb4ea2cfe39afd38ce5651b93f941b896fbdb1d2.zip) // Asteroids_V3.1-250401-1916 -> [Asteroids_V3.1-250529-1004](https://android.googleapis.com/packages/ota-api/package/595a347d8bce1a4cb3c9b1294c483333d67eb7f4.zip) // Asteroids_V3.1-250320-2319 -> [Asteroids_V3.1-250529-1004](https://android.googleapis.com/packages/ota-api/package/3d2a622115e7b08ee5ffea6c1abc2c1928780f34.zip) // Asteroids_V3.1-250302-1856 -> [Asteroids_V3.1-250529-1004](https://android.googleapis.com/packages/ota-api/package/12600b3370548d79a80736a4c9905dfdcb0464ca.zip) // Asteroids_V3.1-250217-2233 -> [Asteroids_V3.1-250529-1004](https://android.googleapis.com/packages/ota-api/package/80825995bffdaad67484e0ceff8f223a0547e65f.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/asteroids/Asteroids_V3.1-250529-1004_3.1.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250529-1004) | 
| 3.1 | Asteroids-V3.1-250417-1222 | Asteroids_V3.1-250401-1916 -> [Asteroids_V3.1-250417-1222](https://android.googleapis.com/packages/ota-api/package/f0a8832f0491e155c320d4b5a7d1461170584c28.zip) // Asteroids_V3.1-250217-2233 -> [Asteroids_V3.1-250417-1222](https://android.googleapis.com/packages/ota-api/package/9c818c381116185d877894aa4933afeeb67d6aee.zip) // Asteroids_V3.1-250320-2319 -> [Asteroids_V3.1-250417-1222](https://android.googleapis.com/packages/ota-api/package/3dc5e6784f8e90a47bc1288c27ee4402dcee36f1.zip) // Asteroids_V3.1-250302-1856 -> [Asteroids_V3.1-250417-1222](https://android.googleapis.com/packages/ota-api/package/6293e6c7a350c3a5d7c7b88fabad8d2b6c60fe11.zip) // Asteroids_V3.1-241231-1753 -> [Asteroids_V3.1-250417-1222](https://android.googleapis.com/packages/ota-api/package/8c9a682fb5f497d7a58b99c363c7c501f177cb0d.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/asteroids/Asteroids_V3.1-250417-1222_3.1.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250417-1222) | 
| 3.1 | Asteroids-V3.1-250401-1916 | Asteroids_V3.1-250320-2319 -> [Asteroids_V3.1-250401-1916](https://android.googleapis.com/packages/ota-api/package/7e7529e0a66fe15b700be9987afd23d31559cb66.zip) // Asteroids_V3.1-250302-1856 -> [Asteroids_V3.1-250401-1916](https://android.googleapis.com/packages/ota-api/package/96051b62fff440ccbb3f1d255bc0a1a11c77cca3.zip) // Asteroids_V3.1-241231-1753 -> [Asteroids_V3.1-250401-1916](https://android.googleapis.com/packages/ota-api/package/26318cf7accc06198ecdd5b1065a0b6b765073b4.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250401-1916)
| 3.1 | Asteroids-V3.1-250320-2319 | Asteroids_V3.1-250302-1856 -> [Asteroids_V3.1-250320-2319](https://android.googleapis.com/packages/ota-api/package/2d06383bd0ee5af9165156087167f2e86bbdffae.zip) // Asteroids_V3.1-241231-1753 -> [Asteroids_V3.1-250320-2319](https://android.googleapis.com/packages/ota-api/package/98084a85c4cebe2ff9c7e44e817c5053bdc26a4d.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/asteroids/Asteroids_V3.1-250320-2319_3.1.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250320-2319)
| 3.1 | Asteroids-V3.1-250302-1856 | Asteroids_V3.1-250217-2235 -> [Asteroids_V3.1-250302-1856](https://android.googleapis.com/packages/ota-api/package/4d1092626406b96e5f1e5e31d727b0d71ed4cbf3.zip) // Asteroids_V3.1-241231-1753 -> [Asteroids_V3.1-250302-1856](https://android.googleapis.com/packages/ota-api/package/9d8b54d1cb47c80c233319560d1720ccb5bd1c5e.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/156adca4d6d6cf50e385a3ddf5b9569af62b1bef.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250302-1856)
| 3.1 | Asteroids-V3.1-250217-2235 | Asteroids_V3.1-250112-1904 -> [Asteroids_V3.1-250217-2235](https://android.googleapis.com/packages/ota-api/package/ced682b69a20c21a8359ede518813c6ded14a1c2.zip) // Asteroids_V3.1-241231-1753 -> [Asteroids_V3.1-250217-2235](https://android.googleapis.com/packages/ota-api/package/a201b6cb78c1fdabd65af36a122847fbfce77edb.zip)  | N/A | N/A |

</details>

<details>
  <summary>Phone (2a) Plus - PacmanPro</summary>

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.2 | PacmanPro-V3.2-250904-1704 | PacmanPro_V3.2-250904-1704 -> [PacmanPro_V3.2-250904-1704](https://android.googleapis.com/packages/ota-api/package/ea0572e6c8c298e6ecc218088786eb0f3e3718c4.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.2-250904-1704) |
| 3.2 | PacmanPro-V3.2-250731-1640 | PacmanPro_V3.2-250609-1917 -> [PacmanPro_V3.2-250904-1704](https://android.googleapis.com/packages/ota-api/package/a758d5fe45d11e19421152927afbc1b219406665.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacmanpro/PacmanPro_V3.2-250731-1640.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.2-250731-1640) | 
| 3.2 | PacmanPro-V3.2-250609-1917 | PacmanPro_V3.0-250410-1524 -> [PacmanPro_V3.2-250609-1917](https://android.googleapis.com/packages/ota-api/package/6acbb260eb3b61c889f7f4d7ef1933b17e89ee9c.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacmanpro/PacmanPro_V3.2-250609-1917_3.2.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.2-250609-1917)
| 3.0 | PacmanPro-V3.0-250410-1524 | PacmanPro_V3.0-250207-2041 -> [PacmanPro-V3.0-250410-1524](https://android.googleapis.com/packages/ota-api/package/487046e4603aa8b9028eb847dac1fd8cc40035fd.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacmanpro/PacmanPro_V3.0-250410-1524_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.0-250410-1524) |
| 3.0 | PacmanPro-V3.0-250207-2041 | PacmanPro_V3.0-241226-1537 -> [PacmanPro_V3.0-250207-2041](https://android.googleapis.com/packages/ota-api/package/ea9af989918db06e6510fff9d59552d5a429191b.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacmanpro/PacmanPro_V3.0-250207-2041_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.0-250207-2041) |
| 3.0 | PacmanPro-V3.0-241226-1537 | PacmanPro_V3.0-241126-1448 -> [PacmanPro_V3.0-241226-1537](https://android.googleapis.com/packages/ota-api/package/920e82afd0cb40da211a887baeb5297224c3a2c8.zip) // PacmanPro_U2.6-241217-1545 -> [PacmanPro_V3.0-241226-1537](https://android.googleapis.com/packages/ota-api/package/76b3f6ca552d54d5438aef2d8685586250e8b6ca.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacmanpro/PacmanPro_V3.0-241226-1537_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.0-241226-1537) |
| 3.0 OB-1 | PacmanPro-V3.0-241126-1448 | PacmanPro_U2.6-241125-2243 -> [PacmanPro_V3.0-241126-1448](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241125_224310_20241126_144811.zip?Expires=1993198031&Signature=CUmhVNk~bhACxtqLFXzj4Wr6b1~Bvc6F7-TVE~3reJLIp1K534egj9liWfX45VscVKmyMXFjr~nRTXjLw7DE4CuYAtyd43DkvUhasyDNTyeVHOoiGa1dZznANiP1y4TTg-ATCAVovwv3kVHlZGhii7a~T8gYNGXsUPdknC-L-6dgI1AVutlQ2sYE4axXuGp2BOq9S6dvG28xkmdQWyZrxomo1bFXsPpiEcAfiL94UP2HNQ23RVmLfyElVWpZxscGQgHfTmMtcl3aJxAxCcUedMj3KThkkfV~k9sMhiB2Vn-5s43l5gW6wu3E6FbiWYaeRtQ65SDr9AZs4B0cDV-pGA__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.0-241126-1448) |
| 2.6 | PacmanPro-U2.6-241217-1545 | PacmanPro_U2.6-241125-2243 -> [PacmanPro_U2.6-241217-1545](https://android.googleapis.com/packages/ota-api/package/bbb9972e05e68086de1843050939e8ca1a75e39e.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_U2.6-241217-1545) |
| 2.6 | PacmanPro-U2.6-241125-2243 | PacmanPro_U2.6-240924 -> [PacmanPro_U2.6-241125-2243](https://android.googleapis.com/packages/ota-api/package/b0e5614fca80d0cb2bdfa3d4bfca1e3c77560265.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_U2.6-241125-2243) |
| 2.6 | PacmanPro-U2.6-240924-2223 | PacmanPro_U2.6-240723-1102 -> [PacmanPro_U2.6-240924-2223](https://android.googleapis.com/packages/ota-api/package/b8d1f9e6b3de2f85bc2ca29632bb11b23686078f.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacmanpro/PacmanPro_U2.6-240924-2223_2.6.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_U2.6-240924-2223) |
| 2.6 | PacmanPro-U2.6-240723-1102 | N/A | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacmanpro/PacmanPro_U2.6-240723-1102.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_U2.6-240723-1102) |

</details>

<details>
  <summary>Phone (2a) - Pacman</summary>

<br>

**Note**: Versions 2.5.3 to 2.5.5A are compatible only with the Milk, White, and Black variants of the device. Versions 2.5.6 and higher support all color variants, including Blue and the Special Edition.

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.2 | Pacman-V3.2-250904-1648 | Pacman_V3.2-250815-1642 -> [Pacman_V3.2-250904-1648](https://android.googleapis.com/packages/ota-api/package/2229ecaa33df35f0f4174271bb2291aabd7f5811.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.2-250904-1648) |
| 3.2 | Pacman-V3.2-250815-1642 | Pacman_V3.2-250620-1021 -> [Pacman_V3.2-250815-1642](https://android.googleapis.com/packages/ota-api/package/2359cd4c93d3a3c5fc703e0124dfc74069ca9ca0.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacman/Pacman_V3.2-250815-1642.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.2-250815-1642) |
| 3.2 | Pacman-V3.2-250620-1021 | Pacman_V3.0-250527-2137 -> [Pacman_V3.2-250620-1021](https://android.googleapis.com/packages/ota-api/package/72a4e9a0f1fc5eabc408537027cede9803990369.zip) // Pacman_V3.0-250429-1922 -> [Pacman_V3.2-250620-1021](https://android.googleapis.com/packages/ota-api/package/e2f0d29a68bb5316dcc9de92a0c0954da33c2a2c.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.2-250620-1021) |
| 3.0 | Pacman-V3.0-250527-2137 | Pacman_V3.0-250429-1922 -> [Pacman_V3.0-250527-2137](https://android.googleapis.com/packages/ota-api/package/47276a2590ee508de676cf3bbed01ea1ca948566.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-250527-2137) |
| 3.0 | Pacman-V3.0-250429-1922 | Pacman_V3.0-250304-1904 -> [Pacman_V3.0-250429-1922](https://android.googleapis.com/packages/ota-api/package/22f105448598ae68cf6df552a8a0548dc6ec768c.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacman/Pacman_V3.0-250429-1922_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-250429-1922) |
| 3.0 | Pacman-V3.0-250304-1904 | Pacman_V3.0-250114-1909 -> [Pacman_V3.0-250304-1904](https://android.googleapis.com/packages/ota-api/package/5872828e517f2a3c6fd69156d814e8e2df6d1115.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacman/Pacman_V3.0-250304-1904_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-250304-1904) |
| 3.0 | Pacman-V3.0-250114-1909 | Pacman_V3.0-250103-1741 -> [Pacman_V3.0-250114-1909](https://android.googleapis.com/packages/ota-api/package/b087f08204adfcd5ef226f2559fc8c1d3e613dc9.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-250114-1909) |
| 3.0 | Pacman-V3.0-250103-1741 | Pacman_V3.0-241210-2057 -> [Pacman_V3.0-250103-1741](https://android.googleapis.com/packages/ota-api/package/34c43764d71f9df1c6c1575cc35134c68acebcb6.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacman/Pacman_V3.0-241210-2057.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-250103-1741) |
| 3.0 | Pacman-V3.0-241210-2057 | Pacman_U2.6-241021_2253 -> [Pacman_V3.0-241210-2057](https://android.googleapis.com/packages/ota-api/package/7e81406e8f6908b1504620ca979cb8fa80dc84cb.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacman/Pacman_V3.0-241210-2057_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-241210-2057) |
| 3.0 OB-2 | Pacman-V3.0-241031-2105 | Pacman_V3.0-240923-2135 -> [Pacman_V3.0-241031-2105](https://android.googleapis.com/packages/ota-api/package/d19689ac9fa0e4df5ab2a65c8ae9a52442e62a04.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-241031-2105) |
| 2.6 | Pacman-U2.6-241021-2253 | Pacman_U2.6-240828-1906 -> [Pacman_U2.6-241021-2253](https://android.googleapis.com/packages/ota-api/package/5452dd9d6232cef1e3ba7562b5de822e291bea17.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.6-241021-2253) |
| 3.0 OB-1 | Pacman-V3.0-240923-2135 | Pacman_U2.6-240828-1906 -> [Pacman_V3.0-240923-2135](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20240828_190644_20240923_213518.zip?Expires=1987558972&Signature=E0YjB7bUlCSxcNULPatdqUt26FtNPfZ2OieUhBPCP11MOqyRMbDOP~mRAz0hVy7loN-V97l68rEbrvFeBKOP5ONguXkD0MBaezQfnYLtQJXfIRdXjVXwXBE6jeOi-KragO0NdhPV~fHPBmI06Fn0P4wKPX-vr-R4Hw00QnqPx1lC~YrAHYN2G3pkGdvKvYowJjECI6gufVgDjgZyAAbgzMYtNuB3GfqtqxBowCo7peT4g3iQuBu81exTWW0bTc6Fw9wNuWbnU-UPvu3B7EWG19sETZdvWNRj-79loQWAlNwVNHou9ADheeTzDgBygkd7MZGCQmXhm-E8UBesgFwqbQ__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-240923-2135) |
| 2.6 | Pacman-U2.6-240828-1906 | Pacman_U2.6-240701-2308 -> [Pacman_U2.6-240828-1906](https://android.googleapis.com/packages/ota-api/package/a36018db578fa81b74c8150812104e530fc75d0d.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.6-240828-1906) |
| 2.6 | Pacman-U2.6-240701-2308 | Pacman_U2.5-240522-1818 -> [Pacman_U2.6-240701-2308](https://android.googleapis.com/packages/ota-api/package/8351e1949122ca88c8149ebef62e986a1cc7b4d3.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.6-240701-2308) |
| 2.5.6 | Pacman-U2.5-240522-1818 | Pacman_U2.5-240419-2235 -> [Pacman_U2.5-240522-1818](https://android.googleapis.com/packages/ota-api/package/eb753e881f986f0807b7b8c0e34754145bb594e0.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240522-1818) |
| 2.5.5A | Pacman-U2.5-240419-2235 | Pacman_U2.5-240410-1238 -> [Pacman_U2.5-240419-2235](https://android.googleapis.com/packages/ota-api/package/0f96a78ccd851e6c91abbb7d64ad1fc2691617ea.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240419-2235) |
| 2.5.5 | Pacman-U2.5-240410-1238 | Pacman_U2.5-240322-1016 -> [Pacman_U2.5-240410-1238](https://android.googleapis.com/packages/ota-api/package/cba47167162f5940362699d12bc16d4ef3f5beef.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240410-1238) |
| 2.5.4A | Pacman-U2.5-240322-1016 | N/A | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacman/Pacman_U2.5-240322-1016_2.5.4A.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240322-1016) |
| 2.5.4 | Pacman-U2.5-240315-0035 | N/A | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacman/Pacman_U2.5-240315-0035_2.5.4.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240315-0035) |
| 2.5.3 | Pacman-U2.5-240301-2206 | N/A | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacman/Pacman_U2.5-240301-2206_2.5.3.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240301-2206) |
| 2.5 | Pacman-U2.5-231207-0042 | N/A | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pacman/Pacman_U2.5-231207-0042_2.5.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-231207-0042) |

<br>

</details>

<details>
  <summary>Phone (2) - Pong</summary>

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.2 | Pong-V3.2-250917-1451 | Pong_V3.2-250828-1921 -> [Pong_V3.2-250917-1451](https://android.googleapis.com/packages/ota-api/package/e57db3f2ff14fa60f69fcafa345e02153c1d8890.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.2-250917-1451) |
| 3.2 | Pong-V3.2-250828-1921 | Pong_V3.2-250708-2227 -> [Pong_V3.2-250828-1921](https://android.googleapis.com/packages/ota-api/package/b7d257746e624dbb4051707e935413987baa3ca7.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.2-250828-1921.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.2-250828-1921) |
| 3.2 | Pong-V3.2-250708-2227 | Pong_V3.0-250506-1805 -> [Pong_V3.2-250708-2227](https://android.googleapis.com/packages/ota-api/package/18bf3f8eb03e336eba7cc4c690bf5df6648a24ea.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.2-250708-2227.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.2-250708-2227) |
| 3.0 | Pong-V3.0-250506-1805 | Pong_V3.0-250304-1717 -> [Pong_V3.0-250506-1805](https://android.googleapis.com/packages/ota-api/package/8ebd2971dfa9244d5aba6e8d6d845da093c4e5cf.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong-V3.0-250506-1805_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-250506-1805) |
| 3.0 | Pong-V3.0-250304-1717 | Pong_V3.0-250113-1723 -> [Pong_V3.0-250304-1717](https://android.googleapis.com/packages/ota-api/package/ad7d429c8bb14709a5676e6bc8cf6965ce663945.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.0-250304-1717_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-250304-1717) |
| 3.0 | Pong-V3.0-250113-1723 | Pong_V3.0-241226-2001 -> [Pong_V3.0-250113-1723](https://android.googleapis.com/packages/ota-api/package/2d4ff3545f89bf68eca8f54f2dc6bb94da625ae3.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.0-250113-1723_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-250113-1723) |
| 3.0 | Pong-V3.0-241226-2001 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241226-2001](https://android.googleapis.com/packages/ota-api/package/dccd75a44c18bf956e56c82e2cd7f6861c10cad5.zip) // Pong_V3.0-241207-0124 -> [Pong_V3.0-241226-2001](https://android.googleapis.com/packages/ota-api/package/c256635e9442c1fe8de48a9c93cf199c779a7b27.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.0-241226-2001_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-241226-2001) |
| 3.0 | Pong-V3.0-241207-0124 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241207-0124](https://android.googleapis.com/packages/ota-api/package/75ded7f0b0553a9e590c9c85434a1dde5b23df9a.zip) // Pong_V3.0-241028-1925 -> [Pong_V3.0-241207-0124](https://android.googleapis.com/packages/ota-api/package/b5b75a650caf20c5b06d8a29a9d595783c6b3e72.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.0-241207-0124_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-241207-0124) |
| 3.0 OB-1 | Pong-V3.0-241028-1925 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241028-1925](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241016_170017_20241028_192505.zip?Expires=1990059626&Signature=MrORjWYMh5XXPMFhasr3rphaclJXtvXPnr9Gwj1BTFBL3K8k8J2fe~1eaw9E-ZMmu5FyaNFtchFj5NayGlJzBni0XxmWX6Y8NkXrVlWVmTqj6G1qgujUYJQiDSAgMIxh8k~Zoi5LI-tY9Lb5nDhCOuqX4zWVBETCjXiSnHPx5u8zEmOz7-jE7TUBwg5RWGDNUKRQBa2ax1vRBvkWEIrn0c9YXosm1ot1ArAAmT3KzLBHYOPQj1n6FjEvixU1Ul7mvaxsX5oZ0eMnyonH7aC9x4p01l3pNQyI4r8Ikx~LuSA5DxF0Fqtj9IXbkxNY0F7oBelkt4c8Z8SOpTJ5J3ufVA__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-241028-1925) |
| 2.6 | Pong-U2.6-241016-1700 | Pong_U2.6-240828-1751 -> [Pong_U2.6-241016-1700](https://android.googleapis.com/packages/ota-api/package/b281c8062dcf2a584a524b433907cfeb514df51a.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_U2.6-241016-1700_2.6.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.6-241016-1700) |
| 2.6 | Pong-U2.6-240828-1751 | Pong_U2.6-240628-0430 -> [Pong_U2.6-240828-1751](https://android.googleapis.com/packages/ota-api/package/429c8fba7521ddf3ada2faebd57ba5cd0ca67408.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.6-240828-1751) |
| 2.6 | Pong-U2.6-240628-0430 | Pong_U2.5-240606-1801 -> [Pong_U2.6-240628-0430](https://android.googleapis.com/packages/ota-api/package/6fd26cf6ec1ab4520ab384caad5a6d79ded15ae8.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.6-240628-0430) |
| 2.5.6 | Pong-U2.5-240606-1801 | Pong_U2.5-240419-0138 -> [Pong_U2.5-240606-1801](https://android.googleapis.com/packages/ota-api/package/4d850df66992c4b79ce4d714a27216518ca541e4.zip) // Pong_U2.5-240418-1248 -> [Pong_U2.5-240606-1801](https://android.googleapis.com/packages/ota-api/package/5ea6aefb7bca17c9b477ec7ac17d6412c0f90f3b.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-240606-1801) |
| 2.5.5 | Pong-U2.5-240418-1248 | Pong_U2.5-240327-2140 -> [Pong_U2.5-240418-1248](https://android.googleapis.com/packages/ota-api/package/93383c8b9c42fc40f89df861159c6b52408bc6e6.zip) // Pong_U2.5-240410-1247 -> [Pong_U2.5-240418-1248](https://android.googleapis.com/packages/ota-api/package/04163fecbb7a8617636e9d1773c86ae9f1caf30b.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-240418-1248) |
| 2.5.5 | Pong-U2.5-240410-1247 | Pong_U2.5-240327-2140 -> [Pong_U2.5-240410-1247](https://android.googleapis.com/packages/ota-api/package/44a00fa0a6226aa51f54ee5e5418e0935275d542.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_U2.5-240410-1247_2.5.5.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-240410-1247) |
| 2.5.3 | Pong-U2.5-240327-2140 | Pong_U2.5-240116-1446 -> [Pong_U2.5-240327-2140](https://android.googleapis.com/packages/ota-api/package/20eda7e4eafbfe2900393c177a32c352607c2570.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/dfe935ebb68be6b68d2570b10a96120d27ed05b5.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-240327-2140) |
| 2.5.2 | Pong-U2.5-240116-1446 | Pong_U2.5-231228-1342 -> [Pong_U2.5-240116-1446](https://android.googleapis.com/packages/ota-api/package/d77ffb26d8f29e851f6452dcdbc335749b2d60c8.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_U2.5-240116-1446_2.5.2.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-240116-1446) |
| 2.5.1A | Pong-U2.5-231228-1342 | Pong_U2.5-231208-2206 -> [Pong_U2.5-231228-1342](https://android.googleapis.com/packages/ota-api/package/88f8c09ad5275c83182cc441c1b6806619947832.zip) | [Here]((https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_U2.5-231228-1342_2.5.1A.zip)) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-231228-1342) |
| 2.5.1 | Pong-U2.5-231208-2206 | Pong_T2.0-231024-2214 -> [Pong_U2.5-231208-2206](https://android.googleapis.com/packages/ota-api/package/f3f0db09cdde9dcd118da68821a445af7b0963cc.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_U2.5-231208-2206_2.5.1.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-231208-2206) |
| 2.5 OB-2 | Pong-U2.5-231102-1201 | Pong_U2.5-231007-2102 -> [Pong_U2.5-231102-1201](https://archive.org/download/nothing-archive/incremental_ota/pong/Pong_U2.5-231007-2102_Pong_U2.5-231102-1201.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_U2.5-231102-1201_2.5_OB-2.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-231102-1201) |
| 2.5 OB-1 | Pong-U2.5-231007-2102 | N/A | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong-U2.5-231007-2102_2.5_OB-1.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-231007-2102) |
| 2.0.4 | Pong-T2.0-231024-2214 | Pong_T2.0-230906-1933 -> [Pong_T2.0-231024-2214](https://android.googleapis.com/packages/ota-api/package/e6d937f462c864b3ca25ada7f83a7905f82df6ed.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_T2.0-231024-2214_2.0.4.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-231024-2214) |
| 2.0.3 | Pong-T2.0-230906-1933 | Pong_T2.0-230818-1943 -> [Pong_T2.0-230906-1933](https://android.googleapis.com/packages/ota-api/package/8ba0e8f6c57cd50a63104ca3ba8afdd10c292c78.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_T2.0-230906-1933_2.0.3.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-230906-1933) |
| 2.0.2A | Pong-T2.0-230818-1943 | Pong_T2.0-230801-1740 -> [Pong_T2.0-230818-1943](https://android.googleapis.com/packages/ota-api/package/6d60ccd4ca081be661beb675c29a41c10fc765c4.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-230818-1943) |
| 2.0.2 | Pong-T2.0-230801-1740 | Pong_T2.0-230719-1458 -> [Pong_T2.0-230801-1740](https://android.googleapis.com/packages/ota-api/package/35989af612c8ac3ed916257ab5f32ee2d90d16a0.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/fa8a143ace9337699f068e5b1629cafd60f8fbd9.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-230801-1740) |
| 2.0.1A | Pong-T2.0-230719-1458 | Pong_T2.0-230709-2003 -> [Pong_T2.0-230719-1458](https://android.googleapis.com/packages/ota-api/package/d0f3e3e897154d513c91634ad225da1b724c9455.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-230719-1458) |
| 2.0.1 | Pong-T2.0-230709-2003 | N/A | [Here](https://android.googleapis.com/packages/ota-api/package/7becde0f47753b99a7cc37ff27713ba8a48ef51a.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-230709-2003) |

<br>

</details>

<details>
  <summary>Phone (1) - Spacewar</summary>

<br>

**Note: Builds older than Nothing OS version 1.5.1 OB-2 for Spacewar are region-specific. GLO = Global (including India) & EEA = European Economic Area**

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.2 | Spacewar-V3.2-250804-2110 | Spacewar_V3.2-250701-1737 -> [Spacewar_V3.2-250804-2110](https://android.googleapis.com/packages/ota-api/package/2b2b895c2eabba86dd8d48faf874cbf230ba2651.zip) // Spacewar_V3.2-250610-1104 -> [Spacewar_V3.2-250804-2110](https://android.googleapis.com/packages/ota-api/package/09ff0da78cbf698fb697d3f573cab5997e6cb69a.zip) // Spacewar_V3.0-250409-2129 -> [Spacewar_V3.2-250804-2110](https://android.googleapis.com/packages/ota-api/package/d770e856077f531a79fcf97204f646527b713299.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_V3.2-250804-2110.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.2-250804-2110) |
| 3.2 | Spacewar-V3.2-250701-1737 | Spacewar_V3.2-250610-1104 -> [Spacewar_V3.2-250701-1737](https://android.googleapis.com/packages/ota-api/package/c79b7ecaa1ddfb197af08e463de5b5508b6aa5ec.zip) // Spacewar_V3.0-250409-2129 -> [Spacewar_V3.2-250701-1737](https://android.googleapis.com/packages/ota-api/package/f1a59559dac381c47728b80714f002f410200dcc.zip) // Spacewar_V3.0-250303-1817 -> [Spacewar_V3.2-250701-1737](https://android.googleapis.com/packages/ota-api/package/4484a5f47b8baba520d243132b355fd75ae7f224.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.2-250701-1737) |
| 3.2 | Spacewar-V3.2-250610-1104 | Spacewar_V3.0-250409-2129 -> [Spacewar_V3.2-250610-1104](https://android.googleapis.com/packages/ota-api/package/f65af9ef8ae723584cc27626ec040c1b12b4436a.zip) // Spacewar_V3.0-250303-1817 -> [Spacewar_V3.2-250610-1104](https://android.googleapis.com/packages/ota-api/package/b764b5ddfac5b046b9cb631fed85fc3040c56473.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_V3.2-250610-1104_3.2.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.2-250610-1104) |
| 3.0 | Spacewar-V3.0-250409-2129 | Spacewar_V3.0-250303-1817 -> [Spacewar_V3.0-250409-2129](https://android.googleapis.com/packages/ota-api/package/6313fdd718db499bc5f6b596fa9278275dd5db3a.zip) // Spacewar_V3.0-250218-1552 -> [Spacewar_V3.0-250409-2129](https://android.googleapis.com/packages/ota-api/package/f652a4b31c3fa223157e0b0caef93d2e9260c9b2.zip) // Spacewar_V3.0-250108-1938 -> [Spacewar_V3.0-250409-2129](https://android.googleapis.com/packages/ota-api/package/223e86f537f54e32d8d85eb9546c5d249d1af05f.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_V3.0-250409-2129_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.0-250409-2129) |
| 3.0 | Spacewar-V3.0-250303-1817 | Spacewar_V3.0-250218-1552 -> [Spacewar_V3.0-250303-1817](https://android.googleapis.com/packages/ota-api/package/6a97fd481d72295a21d0c0d42e2cb4ef802b5ee9.zip) // Spacewar_V3.0-250108-1938 -> [Spacewar-V3.0-250303-1817](https://android.googleapis.com/packages/ota-api/package/d1a2ee17c40de03a0bc3bbb139c8a284e23a7a7b.zip) // Spacewar_U2.6-241031-1818 -> [Spacewar-V3.0-250303-1817](https://android.googleapis.com/packages/ota-api/package/059bfd265ba8f85b06329834304de8e516b0d33c.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_V3.0-250303-1817_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.0-250303-1817) |
| 3.0 | Spacewar-V3.0-250218-1552 | Spacewar_V3.0-250108-1938 -> [Spacewar_V3.0-250218-1552](https://android.googleapis.com/packages/ota-api/package/556f03d356f4a672c04658a7d351305904a515b3.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.0-250218-1552) |
| 3.0 | Spacewar-V3.0-250108-1938 | Spacewar_V3.0-241211-0926 -> [Spacewar_V3.0-250108-1938](https://android.googleapis.com/packages/ota-api/package/5120cc00410342a673f19758eff45337443d934c.zip) // Spacewar_U2.6-241031-1818 -> [Spacewar_V3.0-250108-1938](https://android.googleapis.com/packages/ota-api/package/6090fa491107f5cd6c02527eec962da40ea2fe35.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_V3.0-250108-1938_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.0-250108-1938) |
| 3.0 OB-1 | Spacewar-V3.0-241211-0926 | Spacewar_U2.6-241031-1818 -> [Spacewar_V3.0-241211-0926](https://android.googleapis.com/packages/ota-api/package/3c291e4fb02cd41d58cececb5ee4855d719eb6b7.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.0-241211-0926) |
| 2.6 | Spacewar-U2.6-241031-1818 | Spacewar_U2.6-240904-1634 -> [Spacewar_U2.6-241031-1818](https://android.googleapis.com/packages/ota-api/package/c479de02126d8b5d2044600cc2107a36000aa7a4.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/ea1bbddf05a019dfe73499cbbac43a0c12b585bc.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.6-241031-1818) |
| 2.6 | Spacewar-U2.6-240904-1634 | Spacewar_U2.6-240705-1617 -> [Spacewar_U2.6-240904-1634](https://android.googleapis.com/packages/ota-api/package/159a36df32499e2153475db11ef1f6b8775770f2.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.6-240904-1634) |
| 2.6 | Spacewar-U2.6-240705-1617 | Spacewar_U2.5-240612-2149 -> [Spacewar_U2.6-240705-1617](https://android.googleapis.com/packages/ota-api/package/879c1c1c8fc99eb43a6378d716ae8704a78924b3.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_U2.6-240705-1617_2.6.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.6-240705-1617) |
| 2.5.6 | Spacewar-U2.5-240612-2149 | Spacewar_U2.5-240419-1617 -> [Spacewar_U2.5-240612-2149](https://android.googleapis.com/packages/ota-api/package/54c1298c0fbeae5b9f2454762183beb074d883b5.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_U2.5-240612-2149_2.5.6.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.5-240612-2149) |
| 2.5.3A | Spacewar-U2.5-240317-2245 | Spacewar_U2.5-240301-1852 -> [Spacewar_U2.5-240317-2245](https://android.googleapis.com/packages/ota-api/package/176fffc72ad05488556821215d3e10ffc939ff35.zip) // Spacewar_U2.5-240207-1031 -> [Spacewar_U2.5-240317-2245](https://android.googleapis.com/packages/ota-api/package/158f65d4c44323ac9ea4c0c64e97b0a37d9aac74.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/af8523121e2e73f564bb78ceb3074deec7222c6b.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.5-240317-2245) |
| 2.5.3 | Spacewar-U2.5-240301-1852 | Spacewar_U2.5-240207-1031 -> [Spacewar_U2.5-240301-1852](https://android.googleapis.com/packages/ota-api/package/993ef2c61a5d996015d7ff07f955cc8dbb6344c4.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.5-240301-1852) |
| 2.5.2.HOTFIX | Spacewar-U2.5-240207-1031 | Spacewar_U2.5-240119-1910 -> [Spacewar-U2.5-240207-1031](https://android.googleapis.com/packages/ota-api/package/af7de84da8337982201cbd7da8cee51ddc9d0241.zip) // Spacewar_T2.0-231110-1731 -> [Spacewar_U2.5-240207-1031](https://android.googleapis.com/packages/ota-api/package/11d4669cdf0b425d4f8e237f71edc849062365da.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/80dec3051c16eb22f456e8682917f0849b749ba8.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.5-240207-1031) |
| 2.5.2 | Spacewar-U2.5-240119-1910 | Spacewar_T2.0-231110-1731 -> [Spacewar_U2.5-240119-1910](https://android.googleapis.com/packages/ota-api/package/af7de84da8337982201cbd7da8cee51ddc9d0241.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.5-240119-1910) |
| 2.0.5 | Spacewar-T2.0-231110-1731 | Spacewar_T2.0-231006-1014 -> [Spacewar_T2.0-231110-1731](https://android.googleapis.com/packages/ota-api/package/d7a07c6103f9aa3cfc93a83d8d15d547f6281b67.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/d8c21c8c162c9677ba78e51305abaf5b0ccd30e2.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T2.0-231110-1731) |
| 2.0.4 | Spacewar-T2.0-231006-1014 | Spacewar_T2.0-230901-1652 -> [Spacewar_T2.0-231006-1014](https://android.googleapis.com/packages/ota-api/package/d7a07c6103f9aa3cfc93a83d8d15d547f6281b67.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/d8c21c8c162c9677ba78e51305abaf5b0ccd30e2.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T2.0-231006-1014) |
| 2.0.2.HOTFIX | Spacewar-T2.0-230901-1652 | Spacewar_T2.0-230822-1751 -> [Spacewar_T2.0-230901-1652](https://android.googleapis.com/packages/ota-api/package/1adc1351b0bd9a7a75efe40b3aa8baa7c6eb054f.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_U2.5-240207-1031_2.5.2-Hotfix.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T2.0-230901-1652) |
| 2.0.2 | Spacewar-T2.0-230822-1751 | Spacewar_T1.5-230706-1942 -> [Spacewar_T2.0-230822-1751](https://android.googleapis.com/packages/ota-api/package/117f22e84abcb24eea583125ef69ab938643f914.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T2.0-230822-1751) |
| 1.5.6​ | Spacewar-T1.5-230706-1942 | Spacewar_T1.5-230619-0042 -> [Spacewar_T1.5-230706-1942](https://android.googleapis.com/packages/ota-api/package/9b59f7c44dee9c7712b163af950a554d63950ff3.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230706-1942) |
| 1.5.5 | Spacewar-T1.5-230619-0042 | Spacewar_T1.5-230428-2017 -> [Spacewar_T1.5-230619-0042](https://android.googleapis.com/packages/ota-api/package/b0d72e21232dfd4392c6eaaeb651dcfd163007f3.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/1d156af4eb59f85c62c7921e6c4a97c2761bcc3b.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230619-0042) |
| 1.5.4 | Spacewar-T1.5-230428-2017 | Spacewar_T1.5-230317-2039 -> [Spacewar_T1.5-230428-2017](https://android.googleapis.com/packages/ota-api/package/da75a517b2ab113621a45c01fad5f8867caea71c.zip) // Spacewar_T1.5-230213-2131 -> [Spacewar_T1.5-230428-2017](https://android.googleapis.com/packages/ota-api/package/945010bc8ae5f6e2171c54bb2fee51a99ca16223.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230428-2017) |
| 1.5.3.HOTFIX | Spacewar-T1.5-230317-2039 | Spacewar_T1.5-230310-1650 -> [Spacewar_T1.5-230317-2039](https://android.googleapis.com/packages/ota-api/package/364c55148c84d22efab1c58953d807e40da040a9.zip) | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_T1.5-230317-2039_1.5.3-Hotfix.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230317-2039) |
| 1.5.3 | Spacewar-T1.5-230310-1650 | Spacewar_T1.5-230213-2131 -> [Spacewar_T1.5-230310-1650](https://android.googleapis.com/packages/ota-api/package/68158669e0fc6d6eee95e2612c2e84ed840faeec.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230310-1650) |
| 1.5.2​ | Spacewar-T1.5-230213-2131 | Spacewar_T1.5-230114-2357-GLO -> [Spacewar_T1.5-230213-2131](https://android.googleapis.com/packages/ota-api/package/e77cd22198a67cbed75b059470797a5dd66a3d5e.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230213-2131) |
| 1.5.1 OB-2 HOTFIX | Spacewar-T1.5-230114-2357 | Spacewar_T1.5-230111-0014 -> [Spacewar_T1.5-230114-2357](https://android.googleapis.com/packages/ota-api/package/0266138566534b1728271c1412fa152409bcc751.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/edit/Spacewar_T1.5-230114-2357) |
| 1.5.1 OB-2 | Spacewar-T1.5-230111-0014 | Spacewar_T1.5-221215-1313-GLO -> [Spacewar_T1.5-230111-0014](https://android.googleapis.com/packages/ota-api/package/e27879949aee0ad565b8e4790ec58a42a3b30303.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/edit/Spacewar_T1.5-230111-0014) |
| 1.5.0 OB-1 | Spacewar-T1.5-221215-1313 | Spacewar_S1.1-221121-2306-GLO -> [Spacewar_T1.5-221215-1313-GLO](https://android.googleapis.com/packages/ota-api/package/f23d049819ca42c0c455d1c36716cfa3bb386448.zip) // Spacewar_S1.1-221129-1525-EEA -> [Spacewar-T1.5-221215-1313-EEA](https://android.googleapis.com/packages/ota-api/package/66a78cc6105fb8182a3a07383756862655700192.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-221215-1313-GLO) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-221215-1313-EEA) |
| 1.1.8 | Spacewar-S1.1-230112-1613 | Spacewar_S1.1_221129-1525-GLO -> [Spacewar_S1.1-230112-1613](https://android.googleapis.com/packages/ota-api/package/deeb8830c86e0f9b89ae3170ada164b64de02c2c.zip) // Spacewar_S1.1-221129-1525-EEA -> [Spacewar_S1.1-230112-1613](https://android.googleapis.com/packages/ota-api/package/c4313bd73c334c10db148217d3b9edffc2725077.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-230112-1613-GLO) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-230112-1613-EEA) |
| 1.1.7.HOTFIX | Spacewar-S1.1-221129-1525 | Spacewar_S1.1-221121-2306 -> [Spacewar_S1.1-221129-1525-EEA](https://android.googleapis.com/packages/ota-api/package/5a8a872c8fa2071424af6272bd78806f55d4aeda.zip) | N/A | [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-221129-1525-EEA) |
| 1.1.7 | Spacewar-S1.1-221121-2306 | Spacewar_S1.1-221121-2306-GLO -> [Spacewar_S1.1-221121-2306-GLO](https://android.googleapis.com/packages/ota-api/package/6d5f9ec32b7c80e07859cdf74daaefd612ac652f.zip) // Spacewar_S1.1-221121-2306-EEA -> [Spacewar_S1.1-221121-2306-EEA](https://android.googleapis.com/packages/ota-api/package/9c41fd92080af076c6e3abddbaefc7eac75c3edc.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/254815bb72cdbddd5c9dd7cde6d10c95becc6542.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/0e6855d19dbcdf328449e4d06386a6257bb1aadd.zip) | [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-221121-2306-EEA) |
| 1.1.6 | Spacewar-S1.1-221022-1221 | Spacewar_S1.1-221008-1815-GLO -> [Spacewar_S1.1-221022-1221-GLO](https://android.googleapis.com/packages/ota-api/package/f63f3cc420a5a4af639dec4d25adcb865a9a235d.zip) // Spacewar_S1.1-220921-2238-EEA -> [Spacewar_S1.1-221022-1221-EEA](https://android.googleapis.com/packages/ota-api/package/10fefd93aaed7b4d478ebfcea69d789121ee859b.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/99a4c814632616b365017129fa9f7e9e0080fb59.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-221022-1221-EEA) |
| 1.1.5 | Spacewar-S1.1-221008-1815 | Spacewar_S1.1-220921-2238-GLO -> [Spacewar_S1.1-221008-1815-GLO](https://android.googleapis.com/packages/ota-api/package/97d10eb70f173b7ce5a223a8d1f6d6fd42cfed5c.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-221008-1815-GLO) |
| 1.1.4.HOTFIX | Spacewar-S1.1-220921-2238 | Spacewar_S1.1-220913-2137-GLO -> [Spacewar_S1.1-220921-2238-GLO](https://android.googleapis.com/packages/ota-api/package/6cf1147321de57c159e26a0531760042d23c20ad.zip) // Spacewar_S1.1-220913-2137-EEA -> [Spacewar_S1.1-220921-2238-EEA](https://android.googleapis.com/packages/ota-api/package/288523074fe4af0c0680beee17b2df5a5dd84f7c.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/54b8dbd1c303be00ef156c602b756c76d8d9b6e1.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/4c0e18215e374ff95f733dedbd2ebc3f1824e1c8.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220921-2238-GLO) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220921-2238-EEA) |
| 1.1.4 | Spacewar-S1.1-220913-2137 | Spacewar_S1.1-220813-1608-GLO -> [Spacewar_S1.1-220913-2137-GLO](https://android.googleapis.com/packages/ota-api/package/82ab3ed9150c788615767667c35568032bd81e66.zip) // Spacewar-S1.1-220813-1608-EEA -> [Spacewar_S1.1-220913-2137-EEA](https://android.googleapis.com/packages/ota-api/package/8841b46d4ec2df9c4c110a6af2e85a34460bba01.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220913-2137-GLO) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar-S1.1-220913-2137-EEA) |
| 1.1.3 | Spacewar-S1.1-220813-1608 | Spacewar_S1.1-220728-0051-GLO -> [Spacewar_S1.1-220813-1608-GLO](https://android.googleapis.com/packages/ota-api/package/d2e43b858fd93f46d136a424f3756ae2d5decbc3.zip) // Spacewar_S1.1-220728-0051-EEA -> [Spacewar_S1.1-220813-1608-EEA](https://android.googleapis.com/packages/ota-api/package/9441a6b477bf0a5ac205fa93ae37a341181b1341.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/ee4a8d890091f980aa40142d68f46abb1f08e0c5.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/a6f363b6709ec67910b4018526d9525ccb4075f9.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220813-1608-GLO) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220813-1608-EEA) |
| 1.1.2 | Spacewar-S1.1-220728-0051 | Spacewar_S1.1-220716-0150-GLO -> [Spacewar_S1.1-220728-0051-GLO](https://android.googleapis.com/packages/ota-api/package/a85e848885537f271ed8e13cbb9d929e8a76463b.zip) // Spacewar_S1.1-220716-0150-EEA -> [Spacewar_S1.1-220728-0051-EEA](https://android.googleapis.com/packages/ota-api/package/449a23b112bfd5dcfe59a231500e732663cc3f3d.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/a244285dfb5aef198999463c2d55f353ed0e7b1b.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/0f77244380edcc46a4d60397f5c22ea911352bfe.zip) |  [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220728-0051-GLO) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220728-0051-EEA) |
| 1.1.0 | Spacewar-S1.1-220716-0150 | Spacewar_S1.0-220705-2027-GLO -> [Spacewar_S1.1-220716-0150-GLO](https://android.googleapis.com/packages/ota-api/package/88765a64183594df6f06d23b57ef75107d38c9e2.zip) // Spacewar_S1.0-220705-2027-EEA -> [Spacewar_S1.1-220716-0150-EEA](https://android.googleapis.com/packages/ota-api/package/3b2975594ff4e5935d54a4f0b3125306af933d6c.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/e4c58031ffcd430294bd99cfb7df45a2645bef21.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/c9d6795361da9d8364c7a7fefd26ccebbc529fdf.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220716-0150-GLO) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220716-0150-EEA) |
| 1.0.2 | Spacewar-S1.0-220705-2027 | N/A | [GLO](https://android.googleapis.com/packages/ota-api/package/fad5d83167989dd71ef9adbb4243a8baa02956e6.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/09a261dea24fa76050bf9b03fff232dbab9b3a28.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.0-220705-2027-GLO) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.0-220705-2027-EEA) |
| 1.0.1 | Spacewar-S1.0-22 | N/A | [EEA](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_S1.0-22_1.0.1-EEA.zip) | [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.0-22-EEA) |

<br>

</details>

---

#### II. CMF by Nothing

<details>
  <summary>Phone (2) Pro - Galaga</summary>

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.2 | Galaga-V3.2-250903-2153 | Galaga_V3.2-250715-1813 -> [Galaga_V3.2-250903-2153](https://android.googleapis.com/packages/ota-api/package/6cb57da75874606dd4248382cdd11cc7f43da59d.zip) // Galaga_V3.2-250616-1258 -> [Galaga_V3.2-250903-2153](https://android.googleapis.com/packages/ota-api/package/5d26a7b7c27081a303bd2633219934ffeaebdc99.zip) // Galaga_V3.2-250526-1427 -> [Galaga_V3.2-250903-2153](https://android.googleapis.com/packages/ota-api/package/7de0e7c6c157f812acc248df0240a426aea7651c.zip) // Galaga_V3.2-250507-1139 -> [Galaga_V3.2-250903-2153](https://android.googleapis.com/packages/ota-api/package/7e45972eba5847663234b8d40729bab2be7c6855.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_V3.2-250903-2153) |
| 3.2 | Galaga-V3.2-250715-1813 | Galaga_V3.2-250616-1258 -> [Galaga_V3.2-250715-1813](https://android.googleapis.com/packages/ota-api/package/3a534c0674c4705af690e2bd4bf56c88ed3c25ee.zip) // Galaga_V3.2-250526-1427 -> [Galaga_V3.2-250715-1813](https://android.googleapis.com/packages/ota-api/package/1f8f3f76359bdd77249ce53b5ff467dc4d0900a7.zip) // Galaga_V3.2-250507-1139 -> [Galaga_V3.2-250715-1813](https://android.googleapis.com/packages/ota-api/package/db620c080c5edd651d38ec62f7c7af1301ad4273.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_V3.2-250715-1813) |
| 3.2 | Galaga-V3.2-250616-1258 | Galaga_V3.2-250526-1427 -> [Galaga_V3.2-250616-1258](https://android.googleapis.com/packages/ota-api/package/0fcc224468e66ef3fcc4d7d776a32179e1af3710.zip) // Galaga_V3.2-250507-1139 -> [Galaga_V3.2-250616-1258](https://android.googleapis.com/packages/ota-api/package/e2c1e13e78416d6449e18f7e37e1f923ff0f838a.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_V3.2-250616-1258) |
| 3.2 | Galaga-V3.2-250526-1427 | Galaga_V3.2-250507-1139 -> [Galaga_V3.2-250526-1427](https://android.googleapis.com/packages/ota-api/package/e6d8ab2dee0c6751bc5b806d316bf47b11ec2593.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_V3.2-250526-1427) | 
| 3.2 | Galaga-V3.2-250507-1139 | N/A | [Here](https://android.googleapis.com/packages/ota-api/package/2800780fa49032a870618ec026097f5a09aa805b.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_V3.2-250507-1139) | 
| 3.2 | Galaga-V3.2-250425-1517 | Galaga_V3.2-250312-1750 -> [Galaga_V3.2-250425-1517](https://android.googleapis.com/packages/ota-api/package/e7e4b8e861c37de0460a8c95b358fbeb4e2a12d2.zip) | N/A | N/A |

<br>

</details> 

<details>
  <summary>Phone (1) - Tetris</summary>

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.2 | Tetris-V3.2-250723-1800 | Tetris_V3.2-250609-2111 -> [Tetris_V3.2-250723-1800](https://android.googleapis.com/packages/ota-api/package/37933617e6847e797acb24a1734fd17b1b43fd17.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.2-250723-1800) | 
| 3.2 | Tetris-V3.2-250609-2111 | Tetris_V3.0-250421-2015 -> [Tetris_V3.2-250609-2111](https://android.googleapis.com/packages/ota-api/package/9701916b6254b90a0e6353bb80fe719cff810f11.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.2-250609-2111) | 
| 3.0 | Tetris-V3.0-250421-2015 | Tetris_V3.0-250409-1734 -> [Tetris_V3.0-250421-2015](https://android.googleapis.com/packages/ota-api/package/b4eacb9ca70132469e3ae598b6f4fb6a7cc271f9.zip) // Tetris_V3.0-250208-2015 -> [Tetris_V3.0-250421-2015](https://android.googleapis.com/packages/ota-api/package/a052b413979b4ef715023c39ab6b63d9e178bfa1.zip) // Tetris_U2.6-241204-2338 -> [Tetris_V3.0-250421-2015](https://android.googleapis.com/packages/ota-api/package/df48cea7579d72dbbddc782fb1ed278be0923875.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.0-250421-2015) | 
| 3.0 | Tetris-V3.0-250409-1734 | Tetris_V3.0-250208-2015 -> [Tetris_V3.0-250409-1734](https://android.googleapis.com/packages/ota-api/package/3c2cba7417cb5b2b8abb6a171d5c26a24702ac0f.zip) // Tetris_U2.6-241204-2338 -> [Tetris_V3.0-250409-1734](https://android.googleapis.com/packages/ota-api/package/0dbc7a921c2a2716a06b2e0e9baa5c75eec8074e.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.0-250409-1734) |
| 3.0 | Tetris-V3.0-250208-2015 | Tetris_V3.0-250111-2249 -> [Tetris_V3.0-250208-2015](https://android.googleapis.com/packages/ota-api/package/b7baa86871347adcf54b1b7d80aa6129e0755627.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.0-250208-2015) |
| 3.0 | Tetris-V3.0-250111-2249 | Tetris_U2.6-241204-2338 -> [Tetris_V3.0-250111-2249](https://android.googleapis.com/packages/ota-api/package/5dccb5b8fedd073b498b7ca3ea364ab9dc3702d8.zip) // Tetris_V3.0-241205-0050 -> [Tetris_V3.0-250111-2249](https://android.googleapis.com/packages/ota-api/package/67feb668686ad7363ef39906168530af25c265b9.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.0-250111-2249) |
| 3.0 OB-1 | Tetris-V3.0-241205-0050 | Tetris_U2.6-241125-2107 -> [Tetris_V3.0-241205-0050](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241125_210739_20241205_005022.zip?Expires=1993023098&Signature=c7Wzv7dfnpD1TbSb~imjm9sGWwpQrCgY9caLXO94DbUK~yQvCFs6yxqMXTUTdZtFhZOXp4BR7b2qwF1bXMHrJg-Kb7gEq5087yZEKOx6UJUFzOmth97BxvfxmIt6ROiwhLJ2~7U9XwZnD4oI8cgGfFaGS6EL21KrOIax1groWS09mh6Ogm-ssLjsc~-1qCQU2ogNHtu2Yt6AfWPAvZ7dpMb4WBN2qjrKJdRjzMTuCyH6zud8S42Bwyw0UefY-OA2pFoMti0KKUCyPwGlQxOvAZiKfZS6n6RBNkhekQzaPi-G0mG1m0kujK8e01fdT769RfTESbuwlBceCsemnktj3w__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.0-241205-0050) |
| 2.6 | Tetris-U2.6-241204-2338 | Tetris_U2.6-241125-2107 -> [Tetris_U2.6-241204-2338](https://android.googleapis.com/packages/ota-api/package/4f5070152393f8d3e4a584cc83a55b510fcacc95.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-241204-2338) |
| 2.6 | Tetris-U2.6-241125-2107 | Tetris_U2.6-241021-2030 -> [Tetris_U2.6-241125-2107](https://android.googleapis.com/packages/ota-api/package/e8139bd6d603532ce29cf276eca4e612fb2aad20.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-241125-2107) |
| 2.6 | Tetris-U2.6-241021-2030 | Tetris_U2.6-240910-1735 -> [Tetris_U2.6-241021-2030](https://android.googleapis.com/packages/ota-api/package/c7ee5ac3622008faa41032a4fbf6b6b9767f6d20.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-241021-2030) |
| 2.6 | Tetris-U2.6-240910-1735 | Tetris_U2.6-240719-2323 -> [Tetris_U2.6-240910-1735](https://android.googleapis.com/packages/ota-api/package/fb3dc5e18523b52114448abf236be119fe561787.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/adf8245c2d0cd50895ddece5f2366da80b2675c4.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240910-1735) |
| 2.6 | Tetris-U2.6-240828-2341 | Tetris_U2.6-240813-2046 -> [Tetris-U2.6-240828-2341](https://android.googleapis.com/packages/ota-api/package/6140b9ee7974e0c531694f18f972243a5c48be6b.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240828-2341) |
| 2.6 | Tetris-U2.6-240813-2046 | Tetris_U2.6-240729-1047 -> [Tetris_U2.6-240813-2046](https://android.googleapis.com/packages/ota-api/package/397fb089fe692ccbda135dcc8434d90add1388a5.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240813-2046) |
| 2.6 | Tetris-U2.6-240729-1047 | Tetris_U2.6-240702-2200 -> [Tetris_U2.6-240729-1047](https://android.googleapis.com/packages/ota-api/package/48fe84d5164a62417debe07bfff5d7c3ba19046e.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240729-1047) |
| 2.6 | Tetris-U2.6-240713-1955 | Tetris_U2.6-240702-2200 -> [Tetris-U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/24c251bfc97dbe9a32777af2677e979e38bfcef2.zip) // Tetris_U2.6-240606-1805 -> [Tetris_U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/d84e482fad907cef29a0de4dc344d18e61adf42a.zip) // Tetris_U2.6-240524-1536 -> [Tetris_U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/72b82b535759b4559d0eb60c20e9ceabd303872a.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240713-1955) |
| 2.6 | Tetris-U2.6-240702-2200 | N/A | [Here](https://archive.org/download/nothing-archive/spike0en/fullota/tetris/Tetris_U2.6-240702-2200_2.6.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240702-2200) |

<br>

</details>

---

## Integrity Check ✅

You can check the downloaded OTA image file's integrity using the following commands for both Bash (Linux/macOS) and Windows environments:

### Bash (Linux/macOS)

```bash
sha256sum -c *-hash.sha256
```

### Windows

```bash
certutil -hashfile <filename> SHA256
```
- Alternatively users can use open source utilites like [OpenHashTab](https://github.com/namazso/OpenHashTab)

## Guides 📖

### I. OTA Sideloading 🔄

> For visual references, please refer to [these images](https://github.com/spike0en/nothing_archive/tree/main/assets/sideloading) in their respective order.

<br>

A. **Disclaimer**  
  - Sideloading or manually installing official incremental OTA updates is **completely safe**, as long as you download them **directly from Spike’s Nothing Archive**.  
  - **Do not use third-party sources**—all firmware from the Nothing Archive is sourced directly from the OEM’s official servers.  
  - The **built-in Nothing OS offline updater tool** only accepts updates **signed by the OEM**, ensuring security.  
  - The **updater verifies the hash** of the firmware before installation.  

<br>

B. **Restoring Stock Partitions (For Rooted Users Only)**  
  > **If your bootloader is locked, skip directly to Point C!**  

1. **Check your current Nothing OS version:**  
   - Go to `Settings > About phone > Tap the device banner`.  
   - Note down the build number.  

2. **Fetch stock images for your current firmware build:**  
   - Download the `-boot-image.7z` file.  
   - Extract the archive to obtain `.img` files.  

3. **Identify the required partitions:**  
   - **Qualcomm Devices:** `boot`, `init_boot` `vendor_boot`, `recovery`, `vbmeta`  
   - **MediaTek Devices:** `init_boot`, `recovery`, `vbmeta`  

4. **Flash stock partitions** in bootloader mode:  
   > Only modified partitions are required to be flashed. Also skip any missing partitions based on your SoC platform. 
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   ```

5. **Reboot to system and update via System Updater:**
   - If the update **fails**, proceed with **manual sideloading** in the next section.

6. **Restoring Root (Optional):**
   - After updating, you may re-root by **flashing a patched boot image** for the updated NOS version.
   - **Modules will remain intact** after re-rooting.

<br>

C. **Proceed with Sideloading** 

 - **Download the Correct Update Firmware File:**  
   - Find the correct OTA firmware file for your device from [here](#downloads-).

 - **How to Select the Right File?**  
   - Navigate to the repository and select your device model.  
   - Look for the Incremental OTA column.  
   - **Verify your current OS Build Number**:  
    - Go to: `Settings > System > About Phone`.  
    - Tap the **device banner** and note the **Build Number**.

 - **Example:**  
   - Suppose your **Phone (2)** has the build number: `Pong_U2.6-241016-1700` 
   - Assuming the latest available OTA update available being: `Pong_V3.0-241226-2001`
   - The corresponding update pathway would be: `Pong_U2.6-241016-1700 -> Pong_V3.0-241226-2001`
   - Ensure you select the correct pathway based on your device and OS version.
    - Refer to [this](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg) for better clarity.

 - **Create the `ota` Folder:** 
   - Create a folder named `ota` in your device's **internal storage**, full path being:  
     ```
     /sdcard/ota/
     ```
   - Move the downloaded `<firmware>.zip` file to this folder.

 - **Access the Nothing Offline OTA Updater:**  
    - Open the **Phone app** and dial:  
      ```
      *#*#682#*#*
      ```
   - This will launch the built-in offline updater tool.  
   - The UI may show `NothingOfflineOtaUpdate` or `NOTHING BETA OTA UPDATE` — both work.

 - **Apply the Update:**  
   - The updater will automatically detect the update file.  
   - If not detected, manually browse and import the OTA file.  
   - Tap `Directly Apply OTA` or `Update` (based on the app UI).  
   - Wait for the update to complete —your device will reboot automatically.

- **Note:**  
  - If the updater shows an **unknown error**, try using the **"Browse"** option instead of manually copying the file to the **"ota"** folder.
  - **Full OTA firmware** can be sideloaded if incremental OTA fails.
    - **Full OTA cannot be used to downgrade** — it can only update to the same or a higher build.
    - **Unlocked bootloader users** can flash full OTA via custom recoveries (e.g., OrangeFox for Phone (2)).
  - **Not every release has a Full OTA file** — use incrementals instead in such cases.

---

### II. Unlocking Bootloader 🔓

A. Prerequisites
- **Backup your data** (unlocking will erase everything).
- **Install ADB & Fastboot tools** – [Download here](https://developer.android.com/studio/releases/platform-tools).
- **Install USB drivers** – [Google USB Drivers](https://developer.android.com/studio/run/win-usb).
- **Enable Developer Options**:
  - `Settings > About phone > Tap "Build number" 7 times.`
- **Enable USB Debugging & OEM Unlocking**:
  - `Settings > System > Developer options > Enable USB Debugging & OEM Unlocking.`
- **Remove Screen Lock/PIN/Password and Logged-in Accounts (optional but recommended)**
  - Removing accounts before relocking the bootloader helps prevent Google FRP (Factory Reset Protection) lock. If FRP is triggered, the device will ask for the previously linked Google account after a factory reset. If you forget the credentials or can't access the account, you may be locked out of your device. To avoid this, it's recommended to remove all Google accounts before relocking.

B. Unlocking Process
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

C. Post-Unlock
  - Set up your phone again.
  - **Verify bootloader status**:
    ```sh
    Settings > System > Developer options > OEM Unlocking should be enabled.
    ```

  - Bootloader is now unlocked and your device will show an Orange State warning at boot—this is normal.

---

### III. Backing Up Essential Partitions After Unlocking Bootloader 💾

A. Why Backup?
- After unlocking the bootloader, it is crucial to back up essential partitions such as `persist`, `modemst1`, `modemst2`, `fsg`, etc., **before** flashing custom ROMs or kernels.
- These partitions contain important data, including IMEI, network settings, and fingerprint sensor calibration.
- If lost or corrupted, your device may experience **loss of cellular connectivity, fingerprint issues, or even become bricked**.
- Creating backups ensures you can **restore your device** if something goes wrong.

B. Requirements
- **Unlocked bootloader**
- **Root access** (via Magisk/KSU/Apatch)
- **Termux app** (install via F-Droid or Play Store)
- **Check Partition Paths:**
  - **Qcom devices:** `/dev/block/bootdevice/by-name/`
  - **MTK devices:** `/dev/block/by-name/`

C. Backup Instructions
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

D. Storing Backup
  - Move the **"partitions_backup"** folder to your **PC or secure storage**.
  - **Do NOT share these backups!** They contain unique device data like IMEI.

E. Restoring Partitions
 - **MTK Devices:**
   ```sh
   fastboot flash nvram nvram.img
   fastboot flash nvdata nvdata.img
   fastboot flash nvcfg nvcfg.img
   fastboot flash persist persist.img
   ```
   Reboot to **recovery mode** → Perform **factory reset** → Reboot to **system**.

 - **QCom Devices:**
   ```sh
   fastboot flash persist persist.img
   fastboot flash modemst1 modemst1.img
   fastboot flash modemst2 modemst2.img
   ```
   **Factory reset is not mandatory in this case.**

---

### IV. Flashing the Stock ROM Using Fastboot ⚡

> Visual guide by QZX Tech: [Here](https://www.youtube.com/watch?v=66H2MVElyAY)

A. **Preparation of Flashing Folder:**
  - Download the following files for your device model and firmware build and place them in a dedicated folder:
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x

  - Install 7-Zip from [here](https://www.7-zip.org/).
  - Extract files:
    - Windows: Right-click → Extract to "*\"
    - Bash users:
      `7za -y x "*.7z*"`

B. **Proceeding with Flashing:**
  - Install compatible USB drivers from [here](https://developer.android.com/studio/run/win-usb).
  - Ensure that `Android Bootloader Interface` is visible in **Device Manager** when the device is in **bootloader mode**.
  - If the extraction script was used earlier, execute it directly. Otherwise:
    - Move all extracted image files into a single folder along with the [Fastboot Flashing Script](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download).
    - Always download the latest script to ensure hotfixes are included.
  - Run the script while connected to the internet (to fetch latest `platform-tools`) and follow the prompts:
    - Answer the confirmation questionnaire.
    - Choose whether to wipe data: (Y/N)
    - Choose whether to flash to both slots: (Y/N)
    - Disable Android Verified Boot: (N)
  - Verify that all partitions have been successfully flashed.
    - If successful, choose to reboot to system: (Y)
    - If errors occur, reboot to bootloader and reflash after addressing the failure.

---

### V. Relocking Bootloader 🔒

A. **Prerequisites**
  - Remove **Screen Lock/PIN/Password and Logged-in Accounts** (optional but recommended).
  - Clean-flash the **stock ROM** following [Flashing Guide](#iv-flashing-the-stock-rom-using-fastboot-). **Relocking the bootloader with modified partitions without flashing stock firmware may brick the device!**
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

## Acknowledgments 🤝

Special thanks to these contributors for their invaluable work and support:
- **[luk1337](https://github.com/luk1337/oplus_archive)** – Pioneered the use of AOSP’s OTA extraction tool, enabling the extraction of incremental OTA updates.
- **[arter97](https://github.com/arter97/nothing_archive)** – Adapted the above project for **Nothing Phone (2)**.
- **[LukeSkyD](https://github.com/LukeSkyD)** – Maintains the [Nothing Phone (1) Repo](https://xdaforums.com/t/nothing-phone-1-repo-nos-ota-img-guide-root.4464039/), which served as a key reference for earlier builds.
- **[XelXen](https://github.com/XelXen)** - Designed the logo and banner for the project’s branding.
- Individuals who contributed to the localization efforts, helping to make this project accessible to a broader audience.

---

## Support the Project ⭐

If this archive has been helpful, please consider **[starring the repository](https://github.com/spike0en/nothing_archive/stargazers)**. Your support helps keep the project discoverable and active!

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
</picture>

---

**English** | [日本語](/README_ja-JP.md)

# Nothing Archive

<img src="assets/logo.png" width="96" alt="Nothing Archive Logo">

[![Total Downloads](https://img.shields.io/github/downloads/spike0en/nothing_archive/total?logo=github&logoColor=white&label=Total%20Downloads&color=007377)](https://github.com/spike0en/nothing_archive/releases)
[![Latest Release](https://img.shields.io/github/release/spike0en/nothing_archive?label=Latest%20Release&logo=git&logoColor=white&color=1E6091)](https://github.com/spike0en/nothing_archive/releases/latest)

[![Open Pull Requests](https://img.shields.io/github/issues-pr/spike0en/nothing_archive?logo=github&color=F4A261)](https://github.com/spike0en/nothing_archive/pulls)
[![Workflow Status](https://img.shields.io/github/actions/workflow/status/spike0en/nothing_archive/dump.yml?branch=main&label=Build&color=2DC653&logo=github)](https://github.com/spike0en/nothing_archive/actions/workflows/dump.yml)
[![Closed Pull Requests](https://img.shields.io/github/issues-pr-closed/spike0en/nothing_archive?logo=github&color=E76F51)](https://github.com/spike0en/nothing_archive/pulls?q=is%3Apr+is%3Aclosed)

[![Visitors](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive&count_bg=%2300A6A6&title_bg=%234A4A4A&icon=github.svg&icon_color=%23FFFFFF&title=Visitors&edge_flat=false)](https://github.com/spike0en/nothing_archive)
[![Contributors](https://img.shields.io/github/contributors/spike0en/nothing_archive?logo=github&color=9B5DE5)](https://github.com/spike0en/nothing_archive/graphs/contributors)
[![Stars](https://img.shields.io/github/stars/spike0en/nothing_archive?logo=github&color=D4AF37)](#support-the-project-)
[![Forks](https://img.shields.io/github/forks/spike0en/nothing_archive?logo=github&color=468FAF)](https://github.com/spike0en/nothing_archive/network/members)

---

## Index 📑

- [About the Project](#overview-)
- [Disclaimer](#disclaimer-)
- [Notes](#notes-)
- [Categorization](#categorization-)
- [Downloads](#downloads-)
- [Integrity](#integrity-check-)
- **Guides**
  - [Unlocking Bootloader](#i-unlocking-bootloader-)
  - [Backing Up Partitions](#ii-backing-up-essential-partitions-after-unlocking-bootloader-)
  - [Flashing Stock ROM Using Fastboot](#iii-flashing-the-stock-rom-using-fastboot-)
  - [Relocking Bootloader](#iv-relocking-bootloader-)
- [Acknowledgments](#acknowledgments-)
- [Support the Project](#support-the-project-)

---

## Overview 🔍

**Nothing Archive** is the most up-to-date Nothing OS firmware repository, offering official OTA updates, full firmware packages, and stock OTA images for **Nothing Phone (1), Phone (2), Phone (2a), Phone (2a) Plus, Phone (3a), Phone (3a) Pro**, and **CMF Phone (1)**, all sourced directly from official OEM servers. All files are [archived](https://archive.org/details/nothing-archive), ensuring easy access and long-term preservation.

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

- Releases for OTA images are tagged and named using the format: `<NothingOS Version>`+`<Device Codename>`.`<Incremental Date>` and `<POST_OTA_VERSION>`_`<NothingOS Version>`, as shown [here](https://github.com/spike0en/nothing_archive/releases), respectively.
- Region-specific releases are tagged using the format: `<NothingOS Version>`-`<G or E>`+`<Device Codename>`.`<Incremental Date>`, applicable to certain older [Spacewar](#nothing-phone-1) builds that are not unified. Here, G = GLO (Global), and E = EEA (European Economic Area).
- For releases with a Nothing OS version in the format X.Y.Za and X.Y, tags are renamed to X.Y.0-A and X.Y.0 respectively for proper sorting (e.g., `2.5.5A` → `2.5.5-A`, `2.6` → `2.6.0`, `3.0` → `3.0.0`).
- Nothing OS Open Beta releases are denoted by `-OB` wherever applicable.
- Android Developer preview releases are tagged as `0.0.0-dev`+`<Device Codename>`.`<Incremental Date>`.
- Unless specifically stated otherwise in the release notes, the releases published here are compatible with all regional and color variants of the device.
- For detailed instructions on interpreting the required incremental OTA firmware, refer to this [OTA Sideloading Guide](https://telegra.ph/OTA-Sideloading-Guide-for-Nothing-Devices-01-17).

---

## Categorization 📂

The **unmodified** stock OTA image files are archived in `.7z` format and categorized into three distinct groups based on the nature of their partitions: **Boot**, **Firmware**, and **Logical**, for the respective models as follows:

<details>
  <summary>Nothing</summary>

<br>

| Device | Boot (`-image-boot.7z`) | Firmware (`-image-firmware.7z`) | Logical (`-image-logical.7z.001-00x`) |
|--------|-------------------------|---------------------------------|---------------------------------------|
| **Phone (1)**       | `boot`, `dtbo`, `vendor_boot`, `vbmeta` **(Total: 4)** | `abl`, `aop`, `bluetooth`, `cpucp`, `devcfg`, `dsp`, `featenabler`, `hyp`, `imagefv`, `keymaster`, `modem`, `multiimgoem`, `qupfw`, `shrm`, `tz`, `uefisecapp`, `xbl`, `xbl_config` **(Total: 18)** | `system`, `system_ext`, `product`, `vendor`, `odm`, `vbmeta_system`, `vbmeta_vendor` **(Total: 7)** |
| **Phone (2)**       | `boot`, `dtbo`, `vendor_boot`, `recovery`, `vbmeta`, `vbmeta_system`, `vbmeta_vendor` **(Total: 7)** | `abl`, `aop`, `aop_config`, `bluetooth`, `cpucp`, `devcfg`, `dsp`, `featenabler`, `hyp`, `imagefv`, `keymaster`, `modem`, `multiimgoem`, `multiimgqti`, `qupfw`, `qweslicstore`, `shrm`, `tz`, `uefi`, `uefisecapp`, `xbl`, `xbl_config`, `xbl_ramdump` **(Total: 23)** | `system`, `system_ext`, `product`, `vendor`, `vendor_dlkm`, `odm` **(Total: 6)** |
| **Phone (2a) / (2a) Plus** | `boot`, `dtbo`, `init_boot`, `vendor_boot`, `vbmeta` **(Total: 5)** | `apusys`, `audio_dsp`, `ccu`, `connsys_bt`, `connsys_gnss`, `connsys_wifi`, `dpm`, `gpueb`, `gz`, `lk`, `logo`, `mcf_ota`, `mcupm`, `md1img`, `mvpu_algo`, `pi_img`, `preloader_raw`, `scp`, `spmfw`, `sspm`, `tee`, `vcp` **(Total: 22)** | `odm`, `vendor`, `system_ext`, `system`, `vendor_dlkm`, `odm_dlkm`, `system_dlkm`, `product`, `vbmeta_system`, `vbmeta_vendor` **(Total: 10)** |
| **Phone (3a) / Phone (3a) Pro** | `boot`, `init_boot`, `dtbo`, `recovery`, `vbmeta`, `vbmeta_system`, `vbmeta_vendor`, `vendor_boot` **(Total: 8)** | `abl`, `aop`, `aop_config`, `bluetooth`, `cpucp`, `cpucp_dtb`, `devcfg`, `dsp`, `featenabler`, `hyp`, `imagefv`, `keymaster`, `modem`, `multiimgoem`, `pvmfw`, `qupfw`, `shrm`, `tz`, `uefi`, `uefisecapp`, `xbl`, `xbl_config`, `xbl_ramdump` **(Total: 23)** | `system`, `system_dlkm`, `system_ext`, `product`, `vendor`, `vendor_dlkm`, `odm` **(Total: 7)** |

<br>

</details>

<details>
  <summary>CMF by Nothing</summary>

<br>

| Device | Boot (`-image-boot.7z`) | Firmware (`-image-firmware.7z`) | Logical (`-image-logical.7z.001-00x`) |
|--------|-------------------------|---------------------------------|---------------------------------------|
| **Phone (1)**           | `boot`, `dtbo`, `init_boot`, `vendor_boot`, `vbmeta` **(Total: 5)** | `apusys`, `ccu`, `connsys_bt`, `connsys_gnss`, `connsys_wifi`, `dpm`, `gpueb`, `gz`, `lk`, `logo`, `mcf_ota`, `modem`, `mcupm`, `pi_img`, `preloader_raw`, `scp`, `spmfw`, `sspm`, `tee`, `vcp` **(Total: 20)** | `odm`, `vendor`, `system_ext`, `system`, `vendor_dlkm`, `odm_dlkm`, `system_dlkm`, `product`, `vbmeta_system`, `vbmeta_vendor` **(Total: 10)** |

<br>

</details>

---

## Downloads 📥

Select your **device model** from the dropdown list below to access it's **Release Index**:

<details>
  <summary>Nothing Phone (1) - Spacewar</summary>

<br>

**Note: Builds older than Nothing OS version 1.5.1 OB-2 for Spacewar are region-specific. GLO = Global (including India) & EEA = European Economic Area**

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.0 | Spacewar-V3.0-250303-1817 | Spacewar_V3.0-250218-1552 -> [Spacewar-V3.0-250303-1817](https://android.googleapis.com/packages/ota-api/package/6a97fd481d72295a21d0c0d42e2cb4ef802b5ee9.zip) // Spacewar_V3.0-250108-1938 -> [Spacewar-V3.0-250303-1817](https://android.googleapis.com/packages/ota-api/package/d1a2ee17c40de03a0bc3bbb139c8a284e23a7a7b.zip) // Spacewar_U2.6-241031-1818 -> [Spacewar-V3.0-250303-1817](https://android.googleapis.com/packages/ota-api/package/059bfd265ba8f85b06329834304de8e516b0d33c.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+spacewar.250303) |
| 3.0 | Spacewar-V3.0-250218-1552 | Spacewar_V3.0-250108-1938 -> [Spacewar_V3.0-250218-1552](https://android.googleapis.com/packages/ota-api/package/556f03d356f4a672c04658a7d351305904a515b3.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+spacewar.250218) |
| 3.0 | Spacewar-V3.0-250108-1938 | Spacewar_V3.0-241211-0926 -> [Spacewar_V3.0-250108-1938](https://android.googleapis.com/packages/ota-api/package/5120cc00410342a673f19758eff45337443d934c.zip) // Spacewar_U2.6-241031-1818 -> [Spacewar_V3.0-250108-1938](https://android.googleapis.com/packages/ota-api/package/6090fa491107f5cd6c02527eec962da40ea2fe35.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/spacewar/Spacewar_V3.0-250108-1938_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+spacewar.250108) |
| 3.0 OB-1 | Spacewar-V3.0-241211-0926 | Spacewar_U2.6-241031-1818 -> [Spacewar_V3.0-241211-0926](https://android.googleapis.com/packages/ota-api/package/3c291e4fb02cd41d58cececb5ee4855d719eb6b7.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+spacewar.241211) |
| 2.6 | Spacewar-U2.6-241031-1818 | Spacewar_U2.6-240904-1634 -> [Spacewar_U2.6-241031-1818](https://android.googleapis.com/packages/ota-api/package/c479de02126d8b5d2044600cc2107a36000aa7a4.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/ea1bbddf05a019dfe73499cbbac43a0c12b585bc.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+spacewar.241031) |
| 2.6 | Spacewar-U2.6-240904-1634 | Spacewar_U2.6-240705-1617 -> [Spacewar_U2.6-240904-1634](https://android.googleapis.com/packages/ota-api/package/159a36df32499e2153475db11ef1f6b8775770f2.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+spacewar.240705) |
| 2.6 | Spacewar-U2.6-240705-1617 | Spacewar_U2.5-240612-2149 -> [Spacewar_U2.6-240705-1617](https://android.googleapis.com/packages/ota-api/package/879c1c1c8fc99eb43a6378d716ae8704a78924b3.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/spacewar/Spacewar_U2.6-240705-1617_2.6.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+spacewar.240705) |
| 2.5.6 | Spacewar-U2.5-240612-2149 | Spacewar_U2.5-240419-1617 -> [Spacewar_U2.5-240612-2149](https://android.googleapis.com/packages/ota-api/package/54c1298c0fbeae5b9f2454762183beb074d883b5.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/spacewar/Spacewar_U2.5-240612-2149_2.5.6.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.6+spacewar.240612) |
| 2.5.3A | Spacewar-U2.5-240317-2245 | Spacewar_U2.5-240301-1852 -> [Spacewar_U2.5-240317-2245](https://android.googleapis.com/packages/ota-api/package/176fffc72ad05488556821215d3e10ffc939ff35.zip) // Spacewar_U2.5-240207-1031 -> [Spacewar_U2.5-240317-2245](https://android.googleapis.com/packages/ota-api/package/158f65d4c44323ac9ea4c0c64e97b0a37d9aac74.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/af8523121e2e73f564bb78ceb3074deec7222c6b.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.3-A+spacewar.240317) |
| 2.5.3 | Spacewar-U2.5-240301-1852 | Spacewar_U2.5-240207-1031 -> [Spacewar_U2.5-240301-1852](https://android.googleapis.com/packages/ota-api/package/993ef2c61a5d996015d7ff07f955cc8dbb6344c4.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.3+spacewar.240301) |
| 2.5.2.HOTFIX | Spacewar-U2.5-240207-1031 | Spacewar_U2.5-240119-1910 -> [Spacewar-U2.5-240207-1031](https://android.googleapis.com/packages/ota-api/package/af7de84da8337982201cbd7da8cee51ddc9d0241.zip) // Spacewar_T2.0-231110-1731 -> [Spacewar_U2.5-240207-1031](https://android.googleapis.com/packages/ota-api/package/11d4669cdf0b425d4f8e237f71edc849062365da.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/80dec3051c16eb22f456e8682917f0849b749ba8.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.2+spacewar.240207) |
| 2.5.2 | Spacewar-U2.5-240119-1910 | Spacewar_T2.0-231110-1731 -> [Spacewar_U2.5-240119-1910](https://android.googleapis.com/packages/ota-api/package/af7de84da8337982201cbd7da8cee51ddc9d0241.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.2+spacewar.240119) |
| 2.0.5 | Spacewar-T2.0-231110-1731 | Spacewar_T2.0-231006-1014 -> [Spacewar_T2.0-231110-1731](https://android.googleapis.com/packages/ota-api/package/d7a07c6103f9aa3cfc93a83d8d15d547f6281b67.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/d8c21c8c162c9677ba78e51305abaf5b0ccd30e2.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.0.5+spacewar.231110) |
| 2.0.4 | Spacewar-T2.0-231006-1014 | Spacewar_T2.0-230901-1652 -> [Spacewar_T2.0-231006-1014](https://android.googleapis.com/packages/ota-api/package/d7a07c6103f9aa3cfc93a83d8d15d547f6281b67.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/d8c21c8c162c9677ba78e51305abaf5b0ccd30e2.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.0.4+spacewar.231006) |
| 2.0.2.HOTFIX | Spacewar-T2.0-230901-1652 | Spacewar_T2.0-230822-1751 -> [Spacewar_T2.0-230901-1652](https://android.googleapis.com/packages/ota-api/package/1adc1351b0bd9a7a75efe40b3aa8baa7c6eb054f.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/spacewar/Spacewar_U2.5-240207-1031_2.5.2-Hotfix.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.0.2+spacewar.230901) |
| 2.0.2 | Spacewar-T2.0-230822-1751 | Spacewar_T1.5-230706-1942 -> [Spacewar_T2.0-230822-1751](https://android.googleapis.com/packages/ota-api/package/117f22e84abcb24eea583125ef69ab938643f914.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.0.2+spacewar.230822) |
| 1.5.6​ | Spacewar-T1.5-230706-1942 | Spacewar_T1.5-230619-0042 -> [Spacewar_T1.5-230706-1942](https://android.googleapis.com/packages/ota-api/package/9b59f7c44dee9c7712b163af950a554d63950ff3.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/1.5.6+spacewar.230706) |
| 1.5.5 | Spacewar-T1.5-230619-0042 | Spacewar_T1.5-230428-2017 -> [Spacewar_T1.5-230619-0042](https://android.googleapis.com/packages/ota-api/package/b0d72e21232dfd4392c6eaaeb651dcfd163007f3.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/1d156af4eb59f85c62c7921e6c4a97c2761bcc3b.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/1.5.5+spacewar.230619) |
| 1.5.4 | Spacewar_T1.5-230428-2017 | Spacewar_T1.5-230317-2039 -> [Spacewar_T1.5-230428-2017](https://android.googleapis.com/packages/ota-api/package/da75a517b2ab113621a45c01fad5f8867caea71c.zip) // Spacewar_T1.5-230213-2131 -> [Spacewar_T1.5-230428-2017](https://android.googleapis.com/packages/ota-api/package/945010bc8ae5f6e2171c54bb2fee51a99ca16223.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/1.5.4+spacewar.230428) |
| 1.5.3.HOTFIX | Spacewar_T1.5-230317-2039 | Spacewar_T1.5-230310-1650 -> [Spacewar_T1.5-230317-2039](https://android.googleapis.com/packages/ota-api/package/364c55148c84d22efab1c58953d807e40da040a9.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/spacewar/Spacewar_T1.5-230317-2039_1.5.3-Hotfix.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/1.5.3+spacewar.230317) |
| 1.5.3 | Spacewar-T1.5-230310-1650 | Spacewar_T1.5-230213-2131 -> [Spacewar_T1.5-230310-1650](https://android.googleapis.com/packages/ota-api/package/68158669e0fc6d6eee95e2612c2e84ed840faeec.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/1.5.3+spacewar.230310) |
| 1.5.2​ | Spacewar-T1.5-230213-2131 | Spacewar_T1.5-230114-2357-GLO -> [Spacewar_T1.5-230213-2131](https://android.googleapis.com/packages/ota-api/package/e77cd22198a67cbed75b059470797a5dd66a3d5e.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/1.5.2+spacewar.230213) |
| 1.5.1 OB-2 HOTFIX | Spacewar-T1.5-230114-2357 | Spacewar_T1.5-230111-0014 -> [Spacewar_T1.5-230114-2357](https://android.googleapis.com/packages/ota-api/package/0266138566534b1728271c1412fa152409bcc751.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/edit/1.5.1+spacewar.230114) |
| 1.5.1 OB-2 | Spacewar-T1.5-230111-0014 | Spacewar_T1.5-221215-1313-GLO -> [Spacewar_T1.5-230111-0014](https://android.googleapis.com/packages/ota-api/package/e27879949aee0ad565b8e4790ec58a42a3b30303.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/edit/1.5.1+spacewar.230111) |
| 1.5.0 OB-1 | Spacewar-T1.5-221215-1313 | Spacewar_S1.1-221121-2306-GLO -> [Spacewar_T1.5-221215-1313-GLO](https://android.googleapis.com/packages/ota-api/package/f23d049819ca42c0c455d1c36716cfa3bb386448.zip) // Spacewar_S1.1-221129-1525-EEA -> [Spacewar-T1.5-221215-1313-EEA](https://android.googleapis.com/packages/ota-api/package/66a78cc6105fb8182a3a07383756862655700192.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/1.5.0-G+spacewar.221215) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/1.5.0-E+spacewar.221215) |
| 1.1.8 | Spacewar-S1.1-230112-1613 | Spacewar_S1.1_221129-1525-GLO -> [Spacewar_S1.1-230112-1613](https://android.googleapis.com/packages/ota-api/package/deeb8830c86e0f9b89ae3170ada164b64de02c2c.zip) // Spacewar_S1.1-221129-1525-EEA -> [Spacewar_S1.1-230112-1613](https://android.googleapis.com/packages/ota-api/package/c4313bd73c334c10db148217d3b9edffc2725077.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/1.1.8-G+spacewar.230112) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/1.1.8-E+spacewar.230112) |
| 1.1.7.HOTFIX | Spacewar-S1.1-221129-1525-EEA | Spacewar_S1.1-221121-2306 -> [Spacewar_S1.1-221129-1525-EEA](https://android.googleapis.com/packages/ota-api/package/5a8a872c8fa2071424af6272bd78806f55d4aeda.zip) | N/A | [EEA](https://github.com/spike0en/nothing_archive/releases/tag/1.1.7-E+spacewar.221129) |
| 1.1.7 | Spacewar-S1.1-221121-2306 | Spacewar_S1.1-221121-2306-GLO -> [Spacewar_S1.1-221121-2306-GLO](https://android.googleapis.com/packages/ota-api/package/6d5f9ec32b7c80e07859cdf74daaefd612ac652f.zip) // Spacewar_S1.1-221121-2306-EEA -> [Spacewar_S1.1-221121-2306-EEA](https://android.googleapis.com/packages/ota-api/package/9c41fd92080af076c6e3abddbaefc7eac75c3edc.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/254815bb72cdbddd5c9dd7cde6d10c95becc6542.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/0e6855d19dbcdf328449e4d06386a6257bb1aadd.zip) | [EEA](https://github.com/spike0en/nothing_archive/releases/tag/1.1.7-E+spacewar.221121) |
| 1.1.6 | Spacewar-S1.1-221022-1221 | Spacewar_S1.1-221008-1815-GLO -> [Spacewar_S1.1-221022-1221-GLO](https://android.googleapis.com/packages/ota-api/package/f63f3cc420a5a4af639dec4d25adcb865a9a235d.zip) // Spacewar_S1.1-220921-2238-EEA -> [Spacewar_S1.1-221022-1221-EEA](https://android.googleapis.com/packages/ota-api/package/10fefd93aaed7b4d478ebfcea69d789121ee859b.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/99a4c814632616b365017129fa9f7e9e0080fb59.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/1.1.6-G+spacewar.221022) |
| 1.1.5 | Spacewar-S1.1-221008-1815-GLO | Spacewar_S1.1-220921-2238-GLO -> [Spacewar_S1.1-221008-1815-GLO](https://android.googleapis.com/packages/ota-api/package/97d10eb70f173b7ce5a223a8d1f6d6fd42cfed5c.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/1.1.5-G+spacewar.221008) |
| 1.1.4.HOTFIX | Spacewar-S1.1-220921-2238 | Spacewar_S1.1-220913-2137-GLO -> [Spacewar_S1.1-220921-2238-GLO](https://android.googleapis.com/packages/ota-api/package/6cf1147321de57c159e26a0531760042d23c20ad.zip) // Spacewar_S1.1-220913-2137-EEA -> [Spacewar_S1.1-220921-2238-EEA](https://android.googleapis.com/packages/ota-api/package/288523074fe4af0c0680beee17b2df5a5dd84f7c.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/54b8dbd1c303be00ef156c602b756c76d8d9b6e1.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/4c0e18215e374ff95f733dedbd2ebc3f1824e1c8.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/1.1.4-G+spacewar.220921) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/1.1.4-E+spacewar.220921) |
| 1.1.4 | Spacewar-S1.1-220913-2137 | Spacewar_S1.1-220813-1608-GLO -> [Spacewar_S1.1-220913-2137-GLO](https://android.googleapis.com/packages/ota-api/package/82ab3ed9150c788615767667c35568032bd81e66.zip) // Spacewar-S1.1-220813-1608-EEA -> [Spacewar_S1.1-220913-2137-EEA](https://android.googleapis.com/packages/ota-api/package/8841b46d4ec2df9c4c110a6af2e85a34460bba01.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/1.1.4-G+spacewar.220913) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/1.1.4-E+spacewar.220913) |
| 1.1.3 | Spacewar-S1.1-220813-1608 | Spacewar_S1.1-220728-0051-GLO -> [Spacewar_S1.1-220813-1608-GLO](https://android.googleapis.com/packages/ota-api/package/d2e43b858fd93f46d136a424f3756ae2d5decbc3.zip) // Spacewar_S1.1-220728-0051-EEA -> [Spacewar_S1.1-220813-1608-EEA](https://android.googleapis.com/packages/ota-api/package/9441a6b477bf0a5ac205fa93ae37a341181b1341.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/ee4a8d890091f980aa40142d68f46abb1f08e0c5.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/a6f363b6709ec67910b4018526d9525ccb4075f9.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/1.1.3-G+spacewar.220813) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/1.1.3-E+spacewar.220813) |
| 1.1.2 | Spacewar-S1.1-220728-0051 | Spacewar_S1.1-220716-0150-GLO -> [Spacewar_S1.1-220728-0051-GLO](https://android.googleapis.com/packages/ota-api/package/a85e848885537f271ed8e13cbb9d929e8a76463b.zip) // Spacewar_S1.1-220716-0150-EEA -> [Spacewar_S1.1-220728-0051-EEA](https://android.googleapis.com/packages/ota-api/package/449a23b112bfd5dcfe59a231500e732663cc3f3d.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/a244285dfb5aef198999463c2d55f353ed0e7b1b.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/0f77244380edcc46a4d60397f5c22ea911352bfe.zip) |  [GLO](https://github.com/spike0en/nothing_archive/releases/tag/1.1.2-G+spacewar.220728) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/1.1.2-E+spacewar.220728) |
| 1.1.0 | Spacewar-S1.1-220716-0150 | Spacewar_S1.0-220705-2027-GLO -> [Spacewar_S1.1-220716-0150-GLO](https://android.googleapis.com/packages/ota-api/package/88765a64183594df6f06d23b57ef75107d38c9e2.zip) // Spacewar_S1.0-220705-2027-EEA -> [Spacewar_S1.1-220716-0150-EEA](https://android.googleapis.com/packages/ota-api/package/3b2975594ff4e5935d54a4f0b3125306af933d6c.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/e4c58031ffcd430294bd99cfb7df45a2645bef21.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/c9d6795361da9d8364c7a7fefd26ccebbc529fdf.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/1.1.0-G+spacewar.220716) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/1.1.0-E+spacewar.220716) |
| 1.0.2 | Spacewar-S1.0-220705-2027 | N/A | [GLO](https://android.googleapis.com/packages/ota-api/package/fad5d83167989dd71ef9adbb4243a8baa02956e6.zip) // [EEA](https://android.googleapis.com/packages/ota-api/package/09a261dea24fa76050bf9b03fff232dbab9b3a28.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/1.0.2-G+spacewar.220705) // [EEA](https://github.com/spike0en/nothing_archive/releases/tag/1.0.2-E+spacewar.220705) |
| 1.0.1 | Spacewar-S1.0-22 | N/A | [EEA](https://archive.org/download/nothing-archive/full_ota/spacewar/Spacewar_S1.0-22_1.0.1-EEA.zip) | [EEA](https://github.com/spike0en/nothing_archive/releases/tag/1.0.1-E+spacewar.220000) |

<br>

</details>

<details>
  <summary>Nothing Phone (2) - Pong</summary>

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.0 | Pong-V3.0-250304-1717 | Pong_V3.0-250113-1723 -> [Pong_V3.0-250304-1717](https://android.googleapis.com/packages/ota-api/package/ad7d429c8bb14709a5676e6bc8cf6965ce663945.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pong.250304) |
| 3.0 | Pong-V3.0-250113-1723 | Pong_V3.0-241226-2001 -> [Pong_V3.0-250113-1723](https://android.googleapis.com/packages/ota-api/package/2d4ff3545f89bf68eca8f54f2dc6bb94da625ae3.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pong/Pong_V3.0-250113-1723_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pong.250113) |
| 3.0 | Pong-V3.0-241226-2001 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241226-2001](https://android.googleapis.com/packages/ota-api/package/dccd75a44c18bf956e56c82e2cd7f6861c10cad5.zip) // Pong_V3.0-241207-0124 -> [Pong_V3.0-241226-2001](https://android.googleapis.com/packages/ota-api/package/c256635e9442c1fe8de48a9c93cf199c779a7b27.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pong/Pong_V3.0-241226-2001_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pong.241226) |
| 3.0 | Pong-V3.0-241207-0124 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241207-0124](https://android.googleapis.com/packages/ota-api/package/75ded7f0b0553a9e590c9c85434a1dde5b23df9a.zip) // Pong_V3.0-241028-1925 -> [Pong_V3.0-241207-0124](https://android.googleapis.com/packages/ota-api/package/b5b75a650caf20c5b06d8a29a9d595783c6b3e72.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pong/Pong_V3.0-241207-0124_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pong.241207) |
| 3.0 OB-1 | Pong-V3.0-241028-1925 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241028-1925](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241016_170017_20241028_192505.zip?Expires=1990059626&Signature=MrORjWYMh5XXPMFhasr3rphaclJXtvXPnr9Gwj1BTFBL3K8k8J2fe~1eaw9E-ZMmu5FyaNFtchFj5NayGlJzBni0XxmWX6Y8NkXrVlWVmTqj6G1qgujUYJQiDSAgMIxh8k~Zoi5LI-tY9Lb5nDhCOuqX4zWVBETCjXiSnHPx5u8zEmOz7-jE7TUBwg5RWGDNUKRQBa2ax1vRBvkWEIrn0c9YXosm1ot1ArAAmT3KzLBHYOPQj1n6FjEvixU1Ul7mvaxsX5oZ0eMnyonH7aC9x4p01l3pNQyI4r8Ikx~LuSA5DxF0Fqtj9IXbkxNY0F7oBelkt4c8Z8SOpTJ5J3ufVA__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pong.241028) |
| 2.6 | Pong-U2.6-241016-1700 | Pong_U2.6-240828-1751 -> [Pong_U2.6-241016-1700](https://android.googleapis.com/packages/ota-api/package/b281c8062dcf2a584a524b433907cfeb514df51a.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.6-241016-1700_2.6.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+pong.241016) |
| 2.6 | Pong-U2.6-240828-1751 | Pong_U2.6-240628-0430 -> [Pong_U2.6-240828-1751](https://android.googleapis.com/packages/ota-api/package/429c8fba7521ddf3ada2faebd57ba5cd0ca67408.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+pong.240828) |
| 2.6 | Pong-U2.6-240628-0430 | Pong_U2.5-240606-1801 -> [Pong_U2.6-240628-0430](https://android.googleapis.com/packages/ota-api/package/6fd26cf6ec1ab4520ab384caad5a6d79ded15ae8.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+pong.240628) |
| 2.5.6 | Pong-U2.5-240606-1801 | Pong_U2.5-240419-0138 -> [Pong_U2.5-240606-1801](https://android.googleapis.com/packages/ota-api/package/4d850df66992c4b79ce4d714a27216518ca541e4.zip) // Pong_U2.5-240418-1248 -> [Pong_U2.5-240606-1801](https://android.googleapis.com/packages/ota-api/package/5ea6aefb7bca17c9b477ec7ac17d6412c0f90f3b.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.6+pong.240606) |
| 2.5.5 | Pong-U2.5-240418-1248 | Pong_U2.5-240327-2140 -> [Pong_U2.5-240418-1248](https://android.googleapis.com/packages/ota-api/package/93383c8b9c42fc40f89df861159c6b52408bc6e6.zip) // Pong_U2.5-240410-1247 -> [Pong_U2.5-240418-1248](https://android.googleapis.com/packages/ota-api/package/04163fecbb7a8617636e9d1773c86ae9f1caf30b.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.5+pong.240418) |
| 2.5.5 | Pong-U2.5-240410-1247 | Pong_U2.5-240327-2140 -> [Pong_U2.5-240410-1247](https://android.googleapis.com/packages/ota-api/package/44a00fa0a6226aa51f54ee5e5418e0935275d542.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.5-240410-1247_2.5.5.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.5+pong.240410) |
| 2.5.3 | Pong-U2.5-240327-2140 | Pong_U2.5-240116-1446 -> [Pong_U2.5-240327-2140](https://android.googleapis.com/packages/ota-api/package/20eda7e4eafbfe2900393c177a32c352607c2570.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/dfe935ebb68be6b68d2570b10a96120d27ed05b5.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.3+pong.240327) |
| 2.5.2 | Pong-U2.5-240116-1446 | Pong_U2.5-231228-1342 -> [Pong_U2.5-240116-1446](https://android.googleapis.com/packages/ota-api/package/d77ffb26d8f29e851f6452dcdbc335749b2d60c8.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.5-240116-1446_2.5.2.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.2+pong.240116) |
| 2.5.1A | Pong-U2.5-231228-1342 | Pong_U2.5-231208-2206 -> [Pong_U2.5-231228-1342](https://android.googleapis.com/packages/ota-api/package/88f8c09ad5275c83182cc441c1b6806619947832.zip) | [Here]((https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.5-231228-1342_2.5.1A.zip)) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.1-A+pong.231228) |
| 2.5.1 | Pong-U2.5-231208-2206 | Pong_T2.0-231024-2214 -> [Pong_U2.5-231208-2206](https://android.googleapis.com/packages/ota-api/package/f3f0db09cdde9dcd118da68821a445af7b0963cc.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.5-231208-2206_2.5.1.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.1+pong.231208) |
| 2.5 OB-2 | Pong-U2.5-231102-1201 | Pong_U2.5-231007-2102 -> [Pong_U2.5-231102-1201](https://archive.org/download/nothing-archive/incremental_ota/pong/Pong_U2.5-231007-2102_Pong_U2.5-231102-1201.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.5-231102-1201_2.5_OB-2.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.0+pong.231102) |
| 2.5 OB-1 | Pong-U2.5-231007-2102 | N/A | [Here](https://archive.org/download/nothing-archive/full_ota/pong/Pong-U2.5-231007-2102_2.5_OB-1.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.0+pong.231007) |
| 2.0.4 | Pong-T2.0-231024-2214 | Pong_T2.0-230906-1933 -> [Pong_T2.0-231024-2214](https://android.googleapis.com/packages/ota-api/package/e6d937f462c864b3ca25ada7f83a7905f82df6ed.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pong/Pong_T2.0-231024-2214_2.0.4.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.0.4+pong.231024) |
| 2.0.3 | Pong-T2.0-230906-1933 | Pong_T2.0-230818-1943 -> [Pong_T2.0-230906-1933](https://android.googleapis.com/packages/ota-api/package/8ba0e8f6c57cd50a63104ca3ba8afdd10c292c78.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pong/Pong_T2.0-230906-1933_2.0.3.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.0.3+pong.230906) |
| 2.0.2A | Pong-T2.0-230818-1943 | Pong_T2.0-230801-1740 -> [Pong_T2.0-230818-1943](https://android.googleapis.com/packages/ota-api/package/6d60ccd4ca081be661beb675c29a41c10fc765c4.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.0.2-A+pong.230818) |
| 2.0.2 | Pong-T2.0-230801-1740 | Pong_T2.0-230719-1458 -> [Pong_T2.0-230801-1740](https://android.googleapis.com/packages/ota-api/package/35989af612c8ac3ed916257ab5f32ee2d90d16a0.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/fa8a143ace9337699f068e5b1629cafd60f8fbd9.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.0.2+pong.230801) |
| 2.0.1A | Pong-T2.0-230719-1458 | Pong_T2.0-230709-2003 -> [Pong_T2.0-230719-1458](https://android.googleapis.com/packages/ota-api/package/d0f3e3e897154d513c91634ad225da1b724c9455.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.0.1-A+pong.230719) |
| 2.0.1 | Pong-T2.0-230709-2003 | N/A | [Here](https://android.googleapis.com/packages/ota-api/package/7becde0f47753b99a7cc37ff27713ba8a48ef51a.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.0.1+pong.230709) |

<br>

</details>

<details>
  <summary>Nothing Phone (2a) - Pacman</summary>

<br>

**Note**: Versions 2.5.3 to 2.5.5A are compatible only with the Milk, White, and Black variants of the device. Versions 2.5.6 and higher support all color variants, including Blue and the Special Edition.

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.0 | Pacman-V3.0-250114-1909 | Pacman_V3.0-250103-1741 -> [Pacman_V3.0-250114-1909](https://android.googleapis.com/packages/ota-api/package/b087f08204adfcd5ef226f2559fc8c1d3e613dc9.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pacman.250114) |
| 3.0 | Pacman-V3.0-250103-1741 | Pacman_V3.0-241210-2057 -> [Pacman_V3.0-250103-1741](https://android.googleapis.com/packages/ota-api/package/34c43764d71f9df1c6c1575cc35134c68acebcb6.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pacman/Pacman_V3.0-241210-2057.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pacman.250103) |
| 3.0 | Pacman-V3.0-241210-2057 | Pacman-U2.6-241021_2253 -> [Pacman_V3.0-241210-2057](https://android.googleapis.com/packages/ota-api/package/7e81406e8f6908b1504620ca979cb8fa80dc84cb.zip) | N/A | [Here](https://android.googleapis.com/packages/ota-api/package/7e81406e8f6908b1504620ca979cb8fa80dc84cb.zip) |
| 3.0 OB-2 | Pacman-V3.0-241031-2105 | Pacman_V3.0-240923-2135 -> [Pacman_V3.0-241031-2105](https://android.googleapis.com/packages/ota-api/package/d19689ac9fa0e4df5ab2a65c8ae9a52442e62a04.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pacman.241031) |
| 2.6 | Pacman-U2.6-241021-2253 | Pacman_U2.6-240828-1906 -> [Pacman_U2.6-241021-2253](https://android.googleapis.com/packages/ota-api/package/5452dd9d6232cef1e3ba7562b5de822e291bea17.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+pacman.241021) |
| 3.0 OB-1 | Pacman-V3.0-240923-2135 | Pacman_U2.6-240828-1906 -> [Pacman_V3.0-240923-2135](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20240828_190644_20240923_213518.zip?Expires=1987558972&Signature=E0YjB7bUlCSxcNULPatdqUt26FtNPfZ2OieUhBPCP11MOqyRMbDOP~mRAz0hVy7loN-V97l68rEbrvFeBKOP5ONguXkD0MBaezQfnYLtQJXfIRdXjVXwXBE6jeOi-KragO0NdhPV~fHPBmI06Fn0P4wKPX-vr-R4Hw00QnqPx1lC~YrAHYN2G3pkGdvKvYowJjECI6gufVgDjgZyAAbgzMYtNuB3GfqtqxBowCo7peT4g3iQuBu81exTWW0bTc6Fw9wNuWbnU-UPvu3B7EWG19sETZdvWNRj-79loQWAlNwVNHou9ADheeTzDgBygkd7MZGCQmXhm-E8UBesgFwqbQ__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pacman.241031) |
| 2.6 | Pacman-U2.6-240828-1906 | Pacman_U2.6-240701-2308 -> [Pacman_U2.6-240828-1906](https://android.googleapis.com/packages/ota-api/package/a36018db578fa81b74c8150812104e530fc75d0d.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+pacman.240828) |
| 2.6 | Pacman-U2.6-240701-2308 | Pacman_U2.5-240522-1818 -> [Pacman_U2.6-240701-2308](https://android.googleapis.com/packages/ota-api/package/8351e1949122ca88c8149ebef62e986a1cc7b4d3.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+pacman.240701) |
| 2.5.6 | Pacman-U2.5-240522-1818 | Pacman_U2.5-240419-2235 -> [Pacman_U2.5-240522-1818](https://android.googleapis.com/packages/ota-api/package/eb753e881f986f0807b7b8c0e34754145bb594e0.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.6+pacman.240522) |
| 2.5.5A | Pacman-U2.5-240419-2235 | Pacman_U2.5-240410-1238 -> [Pacman_U2.5-240419-2235](https://android.googleapis.com/packages/ota-api/package/0f96a78ccd851e6c91abbb7d64ad1fc2691617ea.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.5-A-pacman_240419) |
| 2.5.5 | Pacman-U2.5-240410-1238 | Pacman_U2.5-240322-1016 -> [Pacman_U2.5-240410-1238](https://android.googleapis.com/packages/ota-api/package/cba47167162f5940362699d12bc16d4ef3f5beef.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.5+pacman.240410) |
| 2.5.4A | Pacman-U2.5-240322-1016 | N/A | [Here](https://archive.org/download/nothing-archive/full_ota/pacman/Pacman_U2.5-240322-1016_2.5.4A.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.4-A+pacman.240322) |
| 2.5.4 | Pacman-U2.5-240315-0035 | N/A | [Here](https://archive.org/download/nothing-archive/full_ota/pacman/Pacman_U2.5-240315-0035_2.5.4.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.4+pacman.240315) |
| 2.5.3 | Pacman-U2.5-240301-2206 | N/A | [Here](https://archive.org/download/nothing-archive/full_ota/pacman/Pacman_U2.5-240301-2206_2.5.3.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.3+pacman.240301) |
| 2.5 | Pacman-U2.5-231207-0042 | N/A | [Here](https://archive.org/download/nothing-archive/full_ota/pacman/Pacman_U2.5-231207-0042_2.5.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.5.0+pacman.231207) |

<br>

</details>

<details>
  <summary>Nothing Phone (2a) Plus - PacmanPro</summary>

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.0 | PacmanPro-V3.0-250207-2041 | PacmanPro_V3.0-241226-1537 -> [PacmanPro_V3.0-250207-2041](https://android.googleapis.com/packages/ota-api/package/ea9af989918db06e6510fff9d59552d5a429191b.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pacmanpro.250207) |
| 3.0 | PacmanPro-V3.0-241226-1537 | PacmanPro_V3.0-241126-1448 -> [PacmanPro_V3.0-241226-1537](https://android.googleapis.com/packages/ota-api/package/920e82afd0cb40da211a887baeb5297224c3a2c8.zip) // PacmanPro_U2.6-241217-1545 -> [PacmanPro_V3.0-241226-1537](https://android.googleapis.com/packages/ota-api/package/76b3f6ca552d54d5438aef2d8685586250e8b6ca.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pacmanpro/PacmanPro_V3.0-241226-1537_3.0.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pacmanpro.241226) |
| 3.0 OB-1 | PacmanPro-V3.0-241126-1448 | PacmanPro_U2.6-241125-2243 -> [PacmanPro_V3.0-241126-1448](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241125_224310_20241126_144811.zip?Expires=1993198031&Signature=CUmhVNk~bhACxtqLFXzj4Wr6b1~Bvc6F7-TVE~3reJLIp1K534egj9liWfX45VscVKmyMXFjr~nRTXjLw7DE4CuYAtyd43DkvUhasyDNTyeVHOoiGa1dZznANiP1y4TTg-ATCAVovwv3kVHlZGhii7a~T8gYNGXsUPdknC-L-6dgI1AVutlQ2sYE4axXuGp2BOq9S6dvG28xkmdQWyZrxomo1bFXsPpiEcAfiL94UP2HNQ23RVmLfyElVWpZxscGQgHfTmMtcl3aJxAxCcUedMj3KThkkfV~k9sMhiB2Vn-5s43l5gW6wu3E6FbiWYaeRtQ65SDr9AZs4B0cDV-pGA__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+pacmanpro.241126) |
| 2.6 | PacmanPro-U2.6-241217-1545 | PacmanPro_U2.6-241125-2243 -> [PacmanPro_U2.6-241217-1545](https://android.googleapis.com/packages/ota-api/package/bbb9972e05e68086de1843050939e8ca1a75e39e.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+pacmanpro.241217) |
| 2.6 | PacmanPro-U2.6-241125-2243 | PacmanPro_U2.6-240924 -> [PacmanPro_U2.6-241125-2243](https://android.googleapis.com/packages/ota-api/package/b0e5614fca80d0cb2bdfa3d4bfca1e3c77560265.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+pacmanpro.241125) |
| 2.6 | PacmanPro-U2.6-240924-2223 | PacmanPro_U2.6-240723-1102 -> [PacmanPro_U2.6-240924-2223](https://android.googleapis.com/packages/ota-api/package/b8d1f9e6b3de2f85bc2ca29632bb11b23686078f.zip) | [Here](https://archive.org/download/nothing-archive/full_ota/pacmanpro/PacmanPro_U2.6-240924-2223_2.6.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+pacmanpro.240924) |
| 2.6 | PacmanPro-U2.6-240723-1102 | N/A | [Here](https://archive.org/download/nothing-archive/full_ota/pacmanpro/PacmanPro_U2.6-240723-1102.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+pacmanpro.240827) |

</details>

<details>
  <summary>Nothing Phone (3a) & (3a) Pro - Asteroids</summary>

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.1 | Asteroids-V3.1-250302-1856 | Asteroids_V3.1-250217-2235 -> [Asteroids-V3.1-250302-1856](https://android.googleapis.com/packages/ota-api/package/4d1092626406b96e5f1e5e31d727b0d71ed4cbf3.zip) // Asteroids_V3.1-241231-1753 -> [Asteroids-V3.1-250302-1856](https://android.googleapis.com/packages/ota-api/package/9d8b54d1cb47c80c233319560d1720ccb5bd1c5e.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.1.0+asteroids.250302)
| 3.1 | Asteroids-V3.1-250217-2235 | Asteroids_V3.1-250112-1904 -> [Asteroids-V3.1-250217-2235](https://android.googleapis.com/packages/ota-api/package/ced682b69a20c21a8359ede518813c6ded14a1c2.zip) // Asteroids_V3.1-241231-1753 -> [Asteroids-V3.1-250217-2235](https://android.googleapis.com/packages/ota-api/package/a201b6cb78c1fdabd65af36a122847fbfce77edb.zip)  | N/A | N/A |

</details>

<details>
  <summary>CMF Phone (1) - Tetris</summary>

<br>

| **Nothing OS Version** | **Build No.**     | **Incremental OTA**                                | **Full OTA**                           | **OTA Images**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.0 | Tetris-V3.0-250208-2015 | Tetris_V3.0-250111-2249 -> [Tetris_V3.0-250208-2015](https://android.googleapis.com/packages/ota-api/package/b7baa86871347adcf54b1b7d80aa6129e0755627.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+tetris.250208) |
| 3.0 | Tetris-V3.0-250111-2249 | Tetris_U2.6-241204-2338 -> [Tetris_V3.0-250111-2249](https://android.googleapis.com/packages/ota-api/package/5dccb5b8fedd073b498b7ca3ea364ab9dc3702d8.zip) // Tetris_V3.0-241205-0050 -> [Tetris_V3.0-250111-2249](https://android.googleapis.com/packages/ota-api/package/67feb668686ad7363ef39906168530af25c265b9.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+tetris.250111) |
| 3.0 OB-1 | Tetris-V3.0-241205-0050 | Tetris_U2.6-241125-2107 -> [Tetris_V3.0-241205-0050](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241125_210739_20241205_005022.zip?Expires=1993023098&Signature=c7Wzv7dfnpD1TbSb~imjm9sGWwpQrCgY9caLXO94DbUK~yQvCFs6yxqMXTUTdZtFhZOXp4BR7b2qwF1bXMHrJg-Kb7gEq5087yZEKOx6UJUFzOmth97BxvfxmIt6ROiwhLJ2~7U9XwZnD4oI8cgGfFaGS6EL21KrOIax1groWS09mh6Ogm-ssLjsc~-1qCQU2ogNHtu2Yt6AfWPAvZ7dpMb4WBN2qjrKJdRjzMTuCyH6zud8S42Bwyw0UefY-OA2pFoMti0KKUCyPwGlQxOvAZiKfZS6n6RBNkhekQzaPi-G0mG1m0kujK8e01fdT769RfTESbuwlBceCsemnktj3w__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0+tetris.241205) |
| 2.6 | Tetris-U2.6-241204-2338 | Tetris_U2.6-241125-2107 -> [Tetris_U2.6-241204-2338](https://android.googleapis.com/packages/ota-api/package/4f5070152393f8d3e4a584cc83a55b510fcacc95.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+tetris.241204) |
| 2.6 | Tetris-U2.6-241125-2107 | Tetris_U2.6-241021-2030 -> [Tetris_U2.6-241125-2107](https://android.googleapis.com/packages/ota-api/package/e8139bd6d603532ce29cf276eca4e612fb2aad20.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+tetris.241125) |
| 2.6 | Tetris-U2.6-241021-2030 | Tetris_U2.6-240910-1735 -> [Tetris_U2.6-241021-2030](https://android.googleapis.com/packages/ota-api/package/c7ee5ac3622008faa41032a4fbf6b6b9767f6d20.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+tetris.241021) |
| 2.6 | Tetris-U2.6-240910-1735 | Tetris_U2.6-240719-2323 -> [Tetris_U2.6-240910-1735](https://android.googleapis.com/packages/ota-api/package/fb3dc5e18523b52114448abf236be119fe561787.zip) | [Here](https://android.googleapis.com/packages/ota-api/package/adf8245c2d0cd50895ddece5f2366da80b2675c4.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+tetris.240910) |
| 2.6 | Tetris-U2.6-240828-2341 | Tetris_U2.6-240813-2046 -> [Tetris-U2.6-240828-2341](https://android.googleapis.com/packages/ota-api/package/6140b9ee7974e0c531694f18f972243a5c48be6b.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+tetris.240828) |
| 2.6 | Tetris-U2.6-240813-2046 | Tetris_U2.6-240729-1047 -> [Tetris_U2.6-240813-2046](https://android.googleapis.com/packages/ota-api/package/397fb089fe692ccbda135dcc8434d90add1388a5.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+tetris.240813) |
| 2.6 | Tetris-U2.6-240729-1047 | Tetris_U2.6-240702-2200 -> [Tetris_U2.6-240729-1047](https://android.googleapis.com/packages/ota-api/package/48fe84d5164a62417debe07bfff5d7c3ba19046e.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+tetris.240729) |
| 2.6 | Tetris-U2.6-240713-1955 | Tetris_U2.6-240702-2200 -> [Tetris-U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/24c251bfc97dbe9a32777af2677e979e38bfcef2.zip) // Tetris_U2.6-240606-1805 -> [Tetris_U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/d84e482fad907cef29a0de4dc344d18e61adf42a.zip) // Tetris_U2.6-240524-1536 -> [Tetris_U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/72b82b535759b4559d0eb60c20e9ceabd303872a.zip) | N/A | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+tetris.240713) |
| 2.6 | Tetris-U2.6-240702-2200 | N/A | [Here](https://archive.org/download/nothing-archive/full_ota/tetris/Tetris_U2.6-240702-2200_2.6.zip) | [Here](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0+tetris.240702) |

<br>

</details>

---

## Integrity Check ✅

- You can check the downloaded OTA image file's integrity with one of the following commands :

``` bash
  md5sum -c *-hash.md5
  sha1sum -c *-hash.sha1
  sha256sum -c *-hash.sha256
  xxh128sum -c *-hash.xxh128
```
- xxh128 is usually the fastest.

---

## Guides 📖

### I. Unlocking Bootloader 🔓

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

### II. Backing Up Essential Partitions After Unlocking Bootloader 💾

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
  - **QCom devices:** `/dev/block/bootdevice/by-name/`
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

### III. Flashing the Stock ROM Using Fastboot ⚡

A. **Preparation of Flashing Folder:**
  - Download the following files for your device model and firmware build and place them in a dedicated folder:
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x

  - Install 7-Zip from [here](https://www.7-zip.org/).
  - Extract files:
    - Windows: Right-click → Extract to "*\"
    - Bash users:
      7za -y x "*7z*"

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

### IV. Relocking Bootloader 🔒

A. **Prerequisites**
  - Remove **Screen Lock/PIN/Password and Logged-in Accounts** (optional but recommended).
  - Clean-flash the **stock ROM** following [Flashing Guide](#iii-flashing-the-stock-rom-using-fastboot-). **Relocking the bootloader with modified partitions without flashing stock firmware may brick the device!**
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
- **[Re*Index.(ot_inc)](https://github.com/reindex-ot)** – Provided the Japanese translation, helping make the archive more accessible.
- **[XelXen](https://github.com/XelXen)** - Designed the logo and banner for the project’s branding.

---

## Support the Project ⭐

If this archive has been helpful, please consider **[starring the repository](https://github.com/spike0en/nothing_archive/stargazers)**. Your support helps keep the project discoverable and active!

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
</picture>

---

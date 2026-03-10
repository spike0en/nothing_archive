---
sidebar_position: 7
title: Guides
description: Step-by-step guides for bootloader unlocking, rooting, OTA updates, and Nothing device customization.
keywords: [nothing bootloader unlock, root nothing phone, nothing fastboot, nothing ota updates, nothing dialer codes, remap essential key]
---

# How-to Guides

Step-by-step guides for Nothing device owners.

## Prerequisites & Tools

Essential tools for advanced guides below.

### USB Drivers

Essential drivers for USB file transfers and device recognition.

- [Google USB Drivers for Windows](https://dl.google.com/android/repository/usb_driver_r13-windows.zip)
- Installation guides: [USB](https://droidwin.com/android-usb-drivers) | [Fastboot](https://droidwin.com/how-to-install-fastboot-drivers-in-windows-11/)

### Platform Tools (ADB & Fastboot)

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

---

## General Guides

Tips, tricks, and general guides for everyone.

### Manual OTA Updates

Skip step I.(B) if your device is not rooted or has a locked bootloader (stock partitions unmodified). For locked bootloader devices, use the dialer method. For open beta updates, use the `Beta Updater Hub` app as the dialer code won't work.

- [Manual OTA Sideloading Guide](https://github.com/spike0en/nothing_archive?tab=readme-ov-file#i-ota-sideloading-) by spike0en

### Safe Mode

- [Rebooting to Safe Mode](https://www.hardreset.info/devices/nothing/nothing-phone-2/safe-mode/)

### Phone (2a) SE Hidden Feature

- [Unlock Hidden Feature](https://nothing.community/d/11058-hidden-feature-of-phone-2a-special-edition) by RapidZapper

### Essential Key Remapping

Guides for remapping the Essential Key on Phone (3):

| Guide | Author |
|-------|--------|
| [Reddit Guide](https://www.reddit.com/r/NothingTech/comments/1jzljrf/guide_how_to_remap_the_essential_key_on_the_phone/) | acruzjumper, McKeviin, DKmarc & Pealoaf |
| [Quick Remap Guide](https://www.reddit.com/r/NothingTech/comments/1jv6gea/quick_guide_to_remap_the_essential_space_button/) | David_Ign |
| [XDA Guide](https://xdaforums.com/t/how-to-disable-or-remap-the-essentials-button.4755184/) | rwilco12 |
| [GitHub Guide](https://github.com/z3phydev/How-to-remap-or-disable-the-Essential-Key) | z3phydev |

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

## Advanced Guides

:::warning
Recommended for power users only. These procedures can brick your device or void warranty if done incorrectly.
:::

### Bootloader

| Guide | Link |
|-------|------|
| Unlocking Bootloader | [Guide](https://github.com/spike0en/nothing_archive?tab=readme-ov-file#unlocking-bootloader) |
| Relocking Bootloader | [Guide](https://github.com/spike0en/nothing_archive?tab=readme-ov-file#relocking-bootloader) |

### Rooting

| Guide | Link |
|-------|------|
| Rooting Nothing Phones | [Guide](https://github.com/spike0en/nothing_archive?tab=readme-ov-file#rooting) |
| Backup Essential Partitions | [Guide](https://github.com/spike0en/nothing_archive?tab=readme-ov-file#backing-up-essential-partitions-after-unlocking-bootloader) |

### Firmware

| Guide | Link |
|-------|------|
| Flashing Stock ROM / Unbricking / Downgrading | [Guide](https://github.com/spike0en/nothing_archive?tab=readme-ov-file#flashing-the-stock-rom-using-fastboot-) |

### Play Integrity

| Guide | Link |
|-------|------|
| Fix Play Integrity & Root Detection | [Wiki](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) |

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

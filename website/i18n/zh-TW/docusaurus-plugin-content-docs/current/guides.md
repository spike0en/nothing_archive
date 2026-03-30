---
sidebar_position: 4
title: 教學指南
description: Bootloader 解鎖、Root 取得、OTA 更新及 Nothing 裝置自訂化的逐步操作指南。
keywords: [nothing bootloader 解鎖, root nothing phone, nothing fastboot, nothing ota 更新, nothing 撥號代碼, 重新對應 essential key]
---

# 操作指南

各種主題的逐步操作指南。

## 一般指南

適合所有人的實用技巧與通用指南。

### OTA 側載

:::note

- 側載增量 OTA 更新**不需要**解鎖 Bootloader。除非你是已 Root 的使用者，否則請跳過步驟 A。
- 只要直接從本儲存庫下載，側載官方增量或完整 OTA 更新是安全的。
- 請勿使用第三方來源。Nothing Archive 中的所有韌體均直接取自 Nothing 官方 OEM 伺服器。
  你可以透過檢查增量 OTA 區段中的下載網址來驗證，這些網址指向官方伺服器，而非第三方檔案托管服務。
- Nothing OS 內建的離線更新程式僅接受 OEM 簽署的更新套件。
- 更新程式在安裝前會驗證韌體雜湊值，若使用不正確或不相符的 OTA zip 檔，將會失敗。
- 完整 OTA 套件也適用相同的驗證機制；若完整性有問題，將無法安裝。
- 由於上述驗證機制，在已鎖定 Bootloader 的裝置上側載官方 OTA zip，不可能造成磚機。
- 對於 Open Beta Test 更新，若撥號方式無效，請透過 OEM 提供的 `Nothing Beta Updater Hub`（名稱未來可能變更）進行側載。
  你可以從設定中啟動此介面。當你安裝了 OEM 的 Beta 更新程式應用程式（覆蓋了內建原廠版本）時，便會發生此情況。
- 如需視覺參考，請依序查看[這裡](https://github.com/spike0en/nothing_archive/tree/main/assets/sideloading)的圖片。

:::

<br />

A. **還原原廠分割區（僅限已 Root 的使用者）**
  :::tip
  若你的 Bootloader 已鎖定，請直接跳到步驟 B！
  :::

1. **確認目前的 Nothing OS 版本：**
   - 前往 `設定 > 關於手機 > 點擊裝置橫幅`。
   - 記下版本號碼。

2. **取得目前韌體版本的原廠映像：**
   - 下載 `-boot-image.7z` 檔案。
   - 解壓縮封存檔以取得 `.img` 檔案。

3. **確認所需分割區：**
   - **高通（Qualcomm）裝置：** `boot`、`init_boot`、`vendor_boot`、`recovery`、`vbmeta`
   - **聯發科（MediaTek）裝置：** `init_boot`、`vbmeta`、`lk`

4. 在 Bootloader 模式下**刷入原廠分割區：**
   :::note
   僅需刷入已修改的分割區。此外，請根據你的 SoC 平台跳過不存在的分割區。
   :::
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   fastboot flash --slot=all lk lk.img
   ```

5. **重新開機進入系統並透過系統更新程式更新：**
   - 若更新**失敗**，請繼續下一節的**手動側載**步驟。

6. **恢復 Root 權限（選用）：**
   - 更新後，你可以透過**刷入已更新 NOS 版本的修補 Boot 映像**來重新取得 Root 權限。
   - 重新 Root 後，**模組將保持完整**。

<br />

B. **進行側載**

 - **下載正確的更新韌體檔案：**
   - 從[這裡](/docs/firmware)找到適合你裝置的 OTA 韌體檔案。

 - **如何選擇正確的檔案？**
   - 前往儲存庫並選擇你的裝置型號。
   - 找到增量 OTA 欄位。
   - **確認目前的 OS 版本號碼**：
    - 前往：`設定 > 系統 > 關於手機`。
    - 點擊**裝置橫幅**並記下**版本號碼**。

 - **範例：**
   - 假設你的 **Phone (2)** 版本號碼為：`Pong_U2.6-241016-1700`
    - 假設最新可用的 OTA 更新為：`Pong_V3.0-241226-2001`
    - 對應的更新路徑為：`Pong_U2.6-241016-1700` -> `Pong_V3.0-241226-2001`
   - 請根據你的裝置和 OS 版本選擇正確的更新路徑。
    - 參考[此圖](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg)以獲得更清楚的說明。

 - **建立 `ota` 資料夾：**
   - 在裝置的**內部儲存空間**建立一個名為 `ota` 的資料夾，完整路徑為：
     ```text
     /sdcard/ota/
     ```
   - 將下載的 `<韌體>.zip` 檔案移動到此資料夾。

 - **存取 Nothing 離線 OTA 更新程式：**
    - 開啟**電話應用程式**並撥號：
      ```text
      *#*#682#*#*
      ```
   - 這將啟動內建的離線更新工具。
   - UI 可能顯示 `NothingOfflineOtaUpdate` 或 `NOTHING BETA OTA UPDATE`——兩者均可使用。

 - **套用更新：**
   - 更新程式將自動偵測更新檔案。
   - 若未自動偵測到，請手動瀏覽並匯入 OTA 檔案。
   - 點擊 `直接套用 OTA` 或 `更新`（依應用程式 UI 而定）。
   - 等待更新完成——裝置將自動重新開機。

:::note

- 若更新程式顯示**未知錯誤**，請嘗試使用**「瀏覽」**選項，而非手動複製檔案到 **"ota"** 資料夾。
- 若增量 OTA 失敗，可以側載**完整 OTA 韌體**。
- **完整 OTA 無法用於降級**——只能更新至相同或更高版本。
- **已解鎖 Bootloader 的使用者**可透過自訂 Recovery（如 Phone (2) 的 OrangeFox）刷入完整 OTA。
- **並非每個版本都有完整 OTA 檔案**——此類情況請改用增量更新。

:::

<hr />

### 安全模式

- [重新開機進入安全模式](https://www.hardreset.info/devices/nothing/nothing-phone-2/safe-mode/)

<hr />

### Phone (2a) SE 隱藏功能

- [解鎖隱藏功能](https://nothing.community/d/11058-hidden-feature-of-phone-2a-special-edition)，作者：RapidZapper

<hr />

### 撥號代碼

你可以撥打以下撥號代碼（USSD）以存取隱藏選單和診斷工具。

| 代碼 | 功能 |
|------|------|
| `*#06#` | 顯示 IMEI 和序號 |
| `*#07#` | 顯示 SAR 值和法規資訊 |
| `*#*#569#*#*` | 開啟 Nothing 回饋 / 日誌工具 |
| `*#*#0#*#*` | 硬體測試選單（螢幕、感應器、觸控） |
| `*#*#9#*#*` | 開啟 Nothing 診斷選單 |
| `*#*#225#*#*` | 顯示行事曆儲存資訊 |
| `*#*#426#*#*` | Google Play / Firebase 診斷資訊 |
| `*#*#4636#*#*` | 測試選單（電話、電池、使用統計、Wi-Fi） |
| `*#*#682#*#*` | 開啟離線 OTA 更新程式（若已安裝 Nothing Beta Hub 則無效） |

---

## 進階指南

:::warning
僅建議進階使用者操作。若操作不當，以下程序可能導致磚機或使保固失效。
:::

### 必要工具

以下進階指南所需的基本工具。

#### USB 驅動程式

用於 USB 檔案傳輸和裝置辨識的必要驅動程式。

- [適用於 Windows 的 Google USB 驅動程式](https://dl.google.com/android/repository/usb_driver_r13-windows.zip)
- 安裝指南：[USB](https://droidwin.com/android-usb-drivers) | [Fastboot](https://droidwin.com/how-to-install-fastboot-drivers-in-windows-11/)

#### Platform Tools（ADB 與 Fastboot）

下載 Android SDK Platform-Tools：
- [Windows / Linux / macOS](https://developer.android.com/studio/releases/platform-tools)
- [安裝指南](https://www.xda-developers.com/install-adb-windows-macos-linux/)

**Windows（winget）：**
```cmd
winget install --id=Google.PlatformTools -e
```

**macOS/Linux（Homebrew）：**
```bash
brew install --cask android-platform-tools
```

---

### Essential Key 重新對應

Phone (3) Essential Key 重新對應指南：

| 指南 | 作者 |
|------|------|
| [Reddit 指南](https://www.reddit.com/r/NothingTech/comments/1jzljrf/guide_how_to_remap_the_essential_key_on_the_phone/) | acruzjumper、McKeviin、DKmarc 與 Pealoaf |
| [快速重新對應指南](https://www.reddit.com/r/NothingTech/comments/1jv6gea/quick_guide_to_remap_the_essential_space_button/) | David_Ign |
| [XDA 指南](https://xdaforums.com/t/how-to-disable-or-remap-the-essentials-button.4755184/) | rwilco12 |
| [GitHub 指南](https://github.com/z3phydev/How-to-remap-or-disable-the-Essential-Key) | z3phydev |

---

### 解鎖 Bootloader

:::info

- 解鎖 Bootloader 將使 OEM 保固失效。但你可以重新刷入原廠 ROM 並鎖定 Bootloader 來恢復保固。
- 無論其他因素如何，你都將失去 Widevine L1/DRM 認證，降級至 L3。
- 你將失去[裝置完整性](https://developer.android.com/google/play/integrity/overview)，可能導致依賴此機制的應用程式停止運作，除非事後透過 Root 權限修復。
  [此指南](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection)可能有助於解決此問題。

:::

A. **前提條件**
- **備份資料**（解鎖將清除所有資料）。
- **安裝 ADB 與 Fastboot 工具** – [點此下載](https://developer.android.com/studio/releases/platform-tools)。
- **安裝 USB 驅動程式** – [Google USB 驅動程式](https://developer.android.com/studio/run/win-usb)。
- **啟用開發者選項**：
  - `設定 > 關於手機 > 連點「版本號碼」7 次`
- **啟用 USB 偵錯與 OEM 解鎖**：
  - `設定 > 系統 > 開發者選項 > 啟用 USB 偵錯與 OEM 解鎖`
- **移除螢幕鎖定/PIN/密碼及已登入帳號（選用，但建議執行）**
  - 在重新鎖定 Bootloader 前移除帳號，有助於防止 Google FRP（原廠重置保護）鎖定。若觸發 FRP，裝置在原廠重置後將要求輸入先前綁定的 Google 帳號。若忘記登入資訊或無法存取帳號，可能被鎖定在裝置外。為避免此情況，建議在重新鎖定前移除所有 Google 帳號。

B. **解鎖流程**
- 透過 USB 將手機連接至電腦。
- 在 platform-tools 資料夾中開啟命令提示字元：
  - Windows：`Shift + 右鍵` > **在此處開啟命令提示字元/PowerShell**。
  - Mac/Linux：開啟**終端機**並切換至 platform-tools 目錄。
- **驗證裝置連線**：
  ```sh
  adb devices
  ```
  若出現提示，請在手機上允許 USB 偵錯。

- **重新開機進入 Bootloader：**
   ```sh
   adb reboot bootloader
   ```

- **驗證 Fastboot 連線：**
   ```sh
   fastboot devices
   ```
   若未偵測到裝置，請重新安裝 USB 驅動程式。

- **解鎖 Bootloader：**
   ```sh
   fastboot flashing unlock
   ```

- **在手機上確認：**
  - 使用**音量鍵**導覽並用**電源鍵**確認。
  - 裝置將**清除所有資料**並重新開機。

C. **解鎖後續步驟**
  - 重新設定手機。
  - **確認 Bootloader 狀態**：
    ```sh
    設定 > 系統 > 開發者選項 > 應已啟用 OEM 解鎖
    ```

  - Bootloader 現已解鎖，裝置開機時將顯示橘色狀態警告——這是正常現象。

<hr />

### 取得 Root 權限

:::info

- Root **將使 OEM 保固失效**，且可能在更新前若未還原原廠映像的情況下中斷 OTA 更新。
- 請確保 **boot / init_boot 映像與目前的韌體版本完全相符**。
  刷入不正確或不相符的映像**將導致開機迴圈**。
- **若該分割區存在，請優先使用 `init_boot` 而非 `boot` 映像來取得 Root**。
- 取得 Root 需要**已解鎖的 Bootloader**。
- 使用者也可以參考以下影片視覺指南：[orailnoor](https://www.youtube.com/watch?v=v0i4rftKNWs) | [Droidwin](https://www.youtube.com/watch?v=4T1ZHDUCBsw) | [EpicDroid](https://www.youtube.com/watch?v=vXIBfyX7s-k)。

:::

<br />

A. **前提條件**
- **已解鎖的 Bootloader** 且**已啟用 USB 偵錯**
- 已安裝 **ADB 與 Fastboot 的電腦**
  *或* 另一台 Android 手機，搭配 **USB-OTG + ADB 應用程式（如 [Bugjaeger](https://play.google.com/store/apps/details?id=eu.sisik.hackendebug&hl=en_IN)）**
  *或* **自訂 Recovery（如 TWRP / OrangeFox / AOSP 系 Recovery）**
- 熟悉 **ADB / Fastboot** 基本操作
- 與目前版本相符的**原廠韌體**（用於提取映像）
- 推薦的 Root 解決方案：
  - [Magisk](https://github.com/topjohnwu/Magisk/releases) | [安裝說明](https://topjohnwu.github.io/Magisk/install.html)
  - [KernelSU (KSU)](https://github.com/tiann/KernelSU) | [安裝說明](https://kernelsu.org/guide/installation.html)
  - [KernelSU Next (KSUN)](https://github.com/KernelSU-Next/KernelSU-Next) | [安裝說明](https://kernelsu-next.github.io/webpage/pages/installation.html)

<br />

B. **確認目前的軟體版本**
- 在手機上前往：設定 > 關於手機 > 點擊 Nothing OS 橫幅。
- **記下版本號碼**
- 範例：`Pong_B4.0-251119-1654`
- 忽略地區後綴，如 `IND`/`EEA`/`TUR` 等。

<br />

C. **取得原廠 Boot / Init_boot 映像**
- 前往[版本索引](/docs/firmware)。
- 選擇你的**裝置型號**
- 開啟對應版本的 **OTA 映像**
- 從版本資源中下載對應的封存檔：`*-image-boot.img.7z`。

- 解壓縮封存檔並找到：
  - `init_boot.img` **（優先使用，若存在）**
  - `boot.img`（僅在 `init_boot` 不存在時使用）

- **將映像傳輸到裝置**
  ```sh
  adb push init_boot.img /sdcard/Download/
  # 或
  adb push boot.img /sdcard/Download/
  ```

<br />

D. **修補映像**

**Magisk**
- 在裝置上安裝最新的 Magisk APK。
- 開啟 Magisk → 安裝 → 選擇並修補檔案。
- 選擇已傳輸的 `init_boot`（優先）/ `boot` 映像。
- Magisk 將生成：`magisk_patched-XXXXX.img`

<br />

**KernelSU / KernelSU Next**

:::note

- 對於 Nothing Phone (2)：KSU 系 Root 方法支援使用原廠 `boot.img`。但 KSUN 或 SUSFS 支援需要已加入修補的自訂編譯核心。
- 已知可用的預先修補自訂核心選項包括：
  [arter97 核心](https://xdaforums.com/t/r44-arter97-kernel-for-nothing-phone-2.4631313/) - 已預先修補 KSU。尚不支援 NOS 4.0+。 |
  [Meteoric Kernel（已停止維護）](https://github.com/HELLBOY017/kernel_nothing_sm8475) - 已預先修補 KSUN + SUSFS。不支援 NOS 4.0+。 |
  [Wild Kernel fork](https://github.com/MiguVT/Meteoric_KernelSU_SUSFS) - 已預先修補 KSU + SUSFS。 |
  [Wild Kernel](https://github.com/WildKernels/GKI_KernelSU_SUSFS) - 已預先修補 KSUN + SUSFS。支援 5.10-android12。
- 出廠搭載 Android 13+ 供應商的 Nothing 型號（即 Phone (2) 之後發布的型號）將支援 KSUN 修補方法。

:::

- 修補方法與 Magisk 類似。在 KSU/KSUN 管理員中點擊「未安裝」> 修補 `init_boot.img` 並將修補後的映像傳輸至電腦。

- 重新開機進入 Bootloader：
  ```sh
  adb reboot bootloader
  ```

- 刷入修補後的映像
  ```bash
  fastboot flash init_boot <拖曳並放入 patched_init_boot.img>
  ```

- 重新開機進入系統：
  ```bash
  fastboot reboot
  ```

- 裝置現在應已透過 KSU/KSUN 取得 Root 權限。

<hr />

### 備份重要分割區

:::info

- 解鎖 Bootloader 後，在刷入自訂 ROM 或核心**之前**，備份 `persist`、`modemst1`、`modemst2`、`fsg` 等重要分割區至關重要。
- 這些分割區包含重要資料，包括 IMEI、網路設定及指紋感應器校準資料。
- 若遺失或損毀，你的裝置可能出現**行動網路中斷、指紋問題，甚至磚機**。
- 建立備份確保出現問題時能**還原裝置**。

:::

A. **需求**
- **已解鎖的 Bootloader**
- **Root 權限**（透過 Magisk/KSU/Apatch）
- **Termux 應用程式**（透過 F-Droid 或 Play 商店安裝）
- **確認分割區路徑：**
  - **高通（Qcom）裝置：** `/dev/block/bootdevice/by-name/`
  - **聯發科（MTK）裝置：** `/dev/block/by-name/`

B. **備份說明**
- **高通（QCom）裝置：**
  - 開啟 **Termux** 並使用以下指令取得 Root 存取權：
    ```sh
    su
    ```

  - 一次複製並貼上以下指令：
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    這將在**內部儲存空間**的 **"partitions_backup"** 資料夾中建立**除 `super` 與 `userdata` 之外所有分割區**的映像檔。

  - **[選用]** 若上述指令失敗，請嘗試以下替代方案：
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **聯發科（MTK）裝置：**
  - 開啟 **Termux** 並使用以下指令取得 Root 存取權：
    ```sh
    su
    ```

  - 一次複製並貼上以下所有指令：
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

C. **儲存備份**
  - 將 **"partitions_backup"** 資料夾移動至**電腦或安全儲存空間**。
  - **請勿分享這些備份！** 它們包含裝置的唯一資料，例如 IMEI。

D. **還原分割區**
 - **聯發科（MTK）裝置：**
   ```sh
   fastboot flash nvram nvram.img
   fastboot flash nvdata nvdata.img
   fastboot flash nvcfg nvcfg.img
   fastboot flash persist persist.img
   ```
   重新開機進入 **Recovery 模式** → 執行**原廠重置** → 重新開機進入**系統**。
   - 參考連結：[Nothing Phone (2a) DVT 工程機：還原基頻與 IMEI 紀錄](https://bluehomewu.github.io/posts/Restoring-Baseband-and-IMEI-on-Nothing-Phone-2a-DVT/)
   - 文章以繁體中文撰寫，可使用瀏覽器翻譯功能翻譯成英文。

 - **高通（QCom）裝置：**
   ```sh
   fastboot flash persist persist.img
   fastboot flash modemst1 modemst1.img
   fastboot flash modemst2 modemst2.img
   ```
   **此情況下不需要進行原廠重置。**

<hr />

### 刷入原廠 ROM（救磚 / 降級）

:::note

- 這是手動乾淨刷機至較新版本原廠韌體或進行降級的唯一推薦方法。
- 如需更好地理解操作步驟，請參考以下影片視覺指南：[Droidwin](https://www.youtube.com/watch?v=YCYEjdC3oHM) | [The Nothing Lab](https://www.youtube.com/watch?v=l0P9gosl64s) | [QZX Tech](https://www.youtube.com/watch?v=66H2MVElyAY)

:::

A. **準備刷機資料夾：**
  - 為你的裝置型號和韌體版本下載以下檔案，並將其放入專用資料夾：
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x
    - `-hash.sha256` - 這是選用的，但建議用於驗證檔案完整性和偵測缺失部分。

  - 從 https://www.7-zip.org/ 安裝 7-Zip

  - 選用（**建議**）：你可以使用提取腳本代替手動步驟：
    - [Windows](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.bat)
    - [Bash](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.sh)
    - 請從下載檔案所在的資料夾執行腳本。

  - 解壓縮檔案：
    - Windows：右鍵 → 解壓縮到 "*\"
    - Bash 使用者：`7za -y x "*.7z*"`

  - 在少數情況下，下載管理員可能會修改分割邏輯檔案的副檔名。
  - 重新命名：
    - `-image-logical.7z.001.7z` → `-image-logical.7z.001`
    - `-image-logical.7z.002.7z` → `-image-logical.7z.002`
  - 然後重試解壓縮。

B. **進行刷機：**
  - 從[這裡](https://developer.android.com/studio/run/win-usb)安裝相容的 USB 驅動程式。
  - 確保裝置在 **Bootloader 模式**下，**裝置管理員**中可看到 `Android Bootloader Interface`。
  - 若先前已使用提取腳本，請直接執行。否則：
    - 將所有提取的映像檔與 [Nothing Fastboot 刷機腳本](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download)放入同一資料夾。
    - 將 `-hash.sha256` 檔案放在同一目錄中。
    - 請始終下載最新版腳本以確保包含最新修補。
  - 連線至網際網路執行腳本（以取得最新 `platform-tools`），並依照提示操作：
    - 回答確認問卷。
    - 依需求跳過或進行雜湊值檢查。
    - 選擇是否清除資料：(Y/N)【乾淨刷機 / 降級 = `Y` | 髒刷 / 升級 = `N`】
    - 選擇是否刷入兩個插槽：(Y/N)
    - 停用 Android 驗證啟動：(N)【請注意，若選擇 `Y`，之後將無法解鎖 Bootloader！】
  - 確認所有分割區已成功刷入。
    - 若成功，選擇重新開機進入系統：(Y)
    - 若發生錯誤，請重新開機進入 Bootloader 並在解決錯誤後重新刷機。未解決錯誤就重新開機進入系統可能導致軟磚或硬磚。

<hr />

### 重新鎖定 Bootloader

A. **前提條件**
  - 移除**螢幕鎖定/PIN/密碼及已登入帳號**（選用，但建議執行）。
  - 依照[刷機指南](#刷入原廠-rom救磚--降級)乾淨刷入**原廠 ROM**。**在未刷入原廠韌體的情況下以修改過的分割區重新鎖定 Bootloader 可能導致磚機！**
  - 備份所有資料（重新鎖定將**清除所有資料**）。
  - 若尚未設定，請安裝 **ADB 與 Fastboot 工具**及 USB 驅動程式。

B. **重新鎖定流程**
  - 若你在系統中，重新開機進入 Bootloader：
    ```sh
    adb reboot bootloader
    ```

  - 驗證 Fastboot 連線：
    ```sh
    fastboot devices
    ```

  - 開始重新鎖定 Bootloader：
    ```sh
    fastboot flashing lock
    ```

  - 在手機上確認：
    - 使用**音量鍵**導覽並用**電源鍵**確認。
    - 裝置將被格式化並以已鎖定的 Bootloader 重新開機。

C. **重新鎖定後續步驟**
  - 重新設定你的裝置。
  - Bootloader 現已鎖定！

<hr />

### Play 完整性

| 指南 | 連結 |
|------|------|
| 修復 Play 完整性與 Root 偵測 | [Wiki](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) |

---

## 售後開發

:::note
此章節由社群管理，與 Nothing 官方無關。解鎖 Bootloader 將使 OEM 保固失效。
:::

獲取自訂 ROM、核心及開發專案的最新資訊。

### 裝置更新頻道（Telegram）

**Nothing：**
| 裝置 | 頻道 |
|------|------|
| Phone (1) | [更新](https://t.me/s/NothingPhone1Updates) |
| Phone (2) | [更新](https://t.me/s/NothingPhone2updates) |
| Phone (2a) 系列 | [更新](https://t.me/s/NothingPhone2aUpdates) |
| Phone (3a) 系列 | [更新](https://t.me/s/NothingPhone3aUpdates) |
| Phone (3) | [更新](https://t.me/s/Phone3Updates) |
| Phone (4a) 系列 | [更新](https://t.me/s/Phone4aUpdates) |

**CMF by Nothing：**
| 裝置 | 頻道 |
|------|------|
| Phone (1) | [更新](https://t.me/s/CMFPhone1Updates) |
| Phone (2) Pro / Phone (3a) Lite | [更新](https://t.me/s/CMFPhone2GlobalUpdates) |

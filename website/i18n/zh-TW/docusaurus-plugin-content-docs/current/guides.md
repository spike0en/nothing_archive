---
sidebar_position: 4
title: 指南
description: 關於解鎖開機載入程式、取得 root 權限、OTA 更新以及 Nothing 裝置自訂的逐步指南。
keywords: [nothing 解鎖開機載入程式, nothing root, nothing fastboot, nothing ota 更新, nothing 撥號碼, 自訂 essential 按鍵]
---

# 操作指南

關於各個方面的逐步操作指南。

## 一般使用與故障排除

日常生活使用的秘訣、技巧以及通用指南。

### OTA 側載 (Sideloading)

:::note

- 側載增量 OTA 更新 **並非必須** 解鎖開機載入程式 (bootloader)。除非你是 root 用戶，否則請跳過步驟 A。
- 只要直接從此存檔下載，側載官方增量或完整 OTA 更新都是安全的。
- 請勿使用第三方來源。Nothing 存檔中的所有韌體均直接源自 Nothing 的官方 OEM 伺服器。  
  這可以透過檢查增量 OTA 部分中的下載 URL 來驗證，這些 URL 指向官方伺服器，而非第三方檔案託管商。
- Nothing OS 內建的離線更新程式僅接受 OEM 簽名的更新包。
- 更新程式在安裝前會驗證韌體雜湊值，如果使用了錯誤或不匹配的 OTA zip 檔案，則會失敗。
- 同樣的驗證也適用於完整 OTA 包；除非其完整性完好無損，否則不會安裝。
- 由於這些檢查，在鎖定的開機載入程式上側載官方 OTA zip 檔案是不可能導致裝置損壞（brick）的。
- 對於公開測試版 (Open Beta) 更新，如果撥號器方法無效，請透過 OEM 提供的 `Nothing Beta Updater Hub`（名稱將來可能會更改）進行側載。
  你可以從「設定」中啟動該介面。當你安裝了 OEM 的測試版更新程式應用（會覆蓋系統內建版本）時，就會出現這種情況。
- 視覺參考請按所列順序查看 [這裡](https://github.com/spike0en/nothing_archive/tree/main/assets/sideloading) 的圖片。

:::

<br />

A. **還原原廠分割區（僅限 Root 用戶）**  
  :::tip
  如果你的開機載入程式已鎖定，請直接跳到 B 點！
  :::

1. **檢查當前 Nothing OS 版本：**  
   - 前往 `設定 > 關於手機 > 點擊裝置橫幅`。  
   - 記下版本號。  

2. **取得當前韌體版本的原廠映像：**  
   - 下載 `-boot-image.7z` 檔案。  
   - 解壓存檔以取得 `.img` 檔案。  

3. **識別所需分區：**  
   - **Qualcomm 裝置：** `boot`, `init_boot`, `vendor_boot`, `recovery`, `vbmeta`  
   - **MediaTek 裝置：** `init_boot`, `vbmeta`, `lk`

4. **在開機載入程式模式下刷入原廠分區：**  
   :::note
   僅需刷入修改過的分區。此外，請根據你的 SoC 平台跳過任何缺失的分區。 
   :::
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   fastboot flash --slot=all lk lk.img
   ```

5. **重啟至系統並透過系統更新程式進行更新：**
   - 如果更新 **失敗**，請繼續執行下一節中的 **手動側載**。

6. **還原 Root（可選）：**
   - 更新後，你可以透過為更新後的 NOS 版本 **刷入已修補的開機映像** 來重新取得 root 權限。
   - 重新取得 root 後，**模組將保持不變**。

<br />

B. **繼續進行側載** 

 - **下載正確的更新韌體檔案：**  
   - 從 [這裡](/docs/firmware) 找到適用於你裝置的正確 OTA 韌體檔案。

 - **如何選擇正確的檔案？**  
   - 導航到儲存庫並選擇你的裝置型號。  
   - 查看「增量 OTA (Incremental OTA)」列。  
   - **驗證你當前的手機系統版本號**:  
     - 前往：`設定 > 系統 > 關於手機`。  
     - 點擊 **裝置橫幅** 並記下 **版本號**。

 - **範例：**  
   - 假設你的 **Phone (2)** 版本號為：`Pong_U2.6-241016-1700` 
     - 假設最新可用的 OTA 更新為：`Pong_V3.0-241226-2001`
     - 對應的更新路徑為：`Pong_U2.6-241016-1700` -> `Pong_V3.0-241226-2001`
   - 請務必根據你的裝置和系統版本選擇正確的路徑。
     - 欲了解更多詳情，請參考 [此圖](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg)。

 - **建立 `ota` 資料夾：** 
   - 在裝置的 **內部儲存空間** 中建立一個名為 `ota` 的資料夾，完整路徑為：  
     ```text
     /sdcard/ota/
     ```
   - 將下載的 `<firmware>.zip` 檔案移動到此資料夾中。

 - **訪問 Nothing 離線 OTA 更新程式：**  
    - 開啟 **電話應用** 並撥打：  
      ```text
      *#*#682#*#*
      ```
   - 這將啟動內建的離線更新工具。  
   - 介面可能會顯示 `NothingOfflineOtaUpdate` 或 `NOTHING BETA OTA UPDATE` —— 兩者皆可。

 - **應用更新：**  
   - 更新程式將自動檢測更新檔案。  
   - 如果未檢測到，請手動瀏覽並導入 OTA 檔案。  
   - 點擊 `Directly Apply OTA` 或 `Update`（根據應用介面而定）。  
   - 等待更新完成 —— 你的裝置將自動重啟。

:::note

- 如果更新程式顯示 **未知錯誤**，請嘗試使用 **「瀏覽 (Browse)」** 選項，而不是手動將檔案複製到 **「ota」** 資料夾。
- 如果增量 OTA 失敗，可以側載 **完整 OTA 韌體**。
- **完整 OTA 不能用於降級** —— 它只能更新到相同或更高的版本。
- **已解鎖開機載入程式的用戶** 可以透過自訂 recovery（例如各型號適用之 OrangeFox 或 TWRP）刷入完整 OTA。
- **並非每個版本都有完整 OTA 檔案** —— 在這種情況下請使用增量更新。

:::


<hr />

### 安全模式

- [重啟至安全模式](https://www.hardreset.info/devices/nothing/nothing-phone-2/safe-mode/)


<hr />

### 撥號碼

你可以撥打撥號碼 (USSD) 來訪問隱藏選單和診斷程式。

| 代碼 | 功能 |
|------|----------|
| `*#06#` | 顯示 IMEI 和序列號 |
| `*#07#` | 顯示 SAR 等級和法規資訊 |
| `*#*#569#*#*` | 開啟 Nothing 反饋 / 日誌工具 |
| `*#*#0#*#*` | 硬體測試選單（螢幕、感測器、觸摸） |
| `*#*#9#*#*` | 開啟 Nothing 診斷選單 |
| `*#*#225#*#*` | 顯示日曆儲存資訊 |
| `*#*#426#*#*` | Google Play / Firebase 診斷資訊 |
| `*#*#4636#*#*` | 測試選單（手機、電池、使用統計、Wi-Fi） |
| `*#*#682#*#*` | 開啟離線 OTA 更新程式（如果安裝了 Nothing Beta Hub 則無效） |


---

## 裝置功能與配件

特定硬體調整和配對指南。

### 電池資訊檢查

:::info
- 已在 Nothing Phone (3a)、Phone (3) 和 Phone (4a) 系列上測試。
- 可能不適用於其他裝置或未來的 Nothing OS 版本 (4.0 / 4.1+)。
- 這僅允許您查看現有的系統數據，並適用於原廠 Nothing OS 韌體。
- 它不會修改任何內容，也不會影響您的保固。
:::

本指南說明如何開啟 Nothing OS 中隱藏的 **電池資訊** 頁面，該頁面通常僅限於歐盟版本，但可以使用此方法在其他地區版本上存取。

#### 要求
- [Shizuku (Fork)](https://github.com/thedjchi/Shizuku)
- [Root Activity Launcher](https://sourceforge.net/projects/androidsage/files/Root%20Activity%20Launcher/)

#### 步驟
1. 安裝這兩個應用程式。
2. 按照以下 [指南](https://shizuku.rikka.app/guide/setup/) 設定 Shizuku。
3. 授予 Shizuku 對 Root Activity Launcher 的權限。
4. 開啟 Root Activity Launcher 並搜尋 **Settings** (設定)。
5. 展開 Settings 項目並啟動列為以下的 **Battery Information** 子活動：
   ```
   com.android.settings/com.nothing.settings.NtSettings$BatteryInformationActivity
   ```
6. 您現在應該會看到 **電池資訊** 頁面，顯示原廠安裝電池的**最大容量**、**循環次數**、**生產日期**和**首次使用日期**。

<hr />

### 解鎖 Bauhaus 主題

以 Bauhaus 為靈感的主題是一項特殊版本功能，可以在多款 Nothing 手機型號上解鎖。

#### Phone (2a) Special Edition
- [解鎖隱藏功能](https://nothing.community/d/11058-hidden-feature-of-phone-2a-special-edition)（由 RapidZapper 提供）

#### 其他 Nothing 型號

**要求：**
- 配備 ADB & Fastboot 的電腦
- [SetEdit 應用程式](https://github.com/MuntashirAkon/SetEdit)

**步驟：**

1. **啟用開發者選項：** 前往 `設定 > 關於手機 > 點擊「版本號」7 次`。
2. **啟用 USB 除錯：** 前往 `設定 > 系統 > 開發者選項 > 啟用 USB 除錯`。
3. **透過 ADB 安裝 SetEdit：**
   - 將下載的 APK 重命名為 `SetEdit.apk`。
   - 執行以下指令：
     ```sh
     adb install --bypass-low-target-sdk-block SetEdit.apk
     ```
4. **解鎖主題：**
   - 開啟 SetEdit 並授予所有要求的權限。
   - 在 **System Table** 中尋找 `theme_bauhaus_enable`。
   - 將值設定為 `1`（設定回 `0` 即可停用）。
5. **應用主題：**
   - 前往 Nothing Launcher 設定並應用新主題。

:::warning

- **請勿修改 SetEdit 中的任何其他值！！**
- 隨意更改系統設定可能會導致系統不穩定或出現問題。

:::


<hr />

### Essential 按鍵重新映射

Phone (3) 上 Essential 按鍵重新映射指南：

| 指南 | 作者 |
|-------|--------|
| [Reddit 指南](https://www.reddit.com/r/NothingTech/comments/1jzljrf/guide_how_to_remap_the_essential_key_on_the_phone/) | acruzjumper, McKeviin, DKmarc & Pealoaf |
| [快速映射指南](https://www.reddit.com/r/NothingTech/comments/1jv6gea/quick_guide_to_remap_the_essential_space_button/) | David_Ign |
| [XDA 指南](https://xdaforums.com/t/how-to-disable-or-remap-the-essentials-button.4755184/) | rwilco12 |
| [GitHub 指南](https://github.com/z3phydev/How-to-remap-or-disable-the-Essential-Key) | z3phydev |


<hr />

### Gadgetbridge 相關

- [支援的型號和功能](https://gadgetbridge.org/gadgets/wearables/nothing/)
- [Nothing CMF 伺服器配對](https://gadgetbridge.org/basics/pairing/nothing-cmf-server/)


---

## 高級指南

:::warning
僅建議高級用戶使用。如果操作不當，這些步驟可能會導致裝置損壞（brick）或使保固失效。
:::

這些指南按時間順序排列。強烈建議嚴格遵守此順序。

### 先決條件與工具

以下高級指南所需的必備工具。

#### USB 驅動程式

USB 檔案傳輸和裝置識別所需的必備驅動程式。

- [適用於 Windows 的 Google USB 驅動程式](https://dl.google.com/android/repository/usb_driver_r13-windows.zip)
- 安裝指南：[USB](https://droidwin.com/android-usb-drivers) | [Fastboot](https://droidwin.com/how-to-install-fastboot-drivers-in-windows-11/)

#### 平台工具 (ADB & Fastboot)

下載 Android SDK Platform-Tools：
- [Windows / Linux / macOS](https://developer.android.com/studio/releases/platform-tools)
- [安裝指南](https://www.xda-developers.com/install-adb-windows-macos-linux/)

**Windows (winget):**
```cmd
winget install --id=Google.PlatformTools -e
```

**macOS/Linux (Homebrew):**
```bash
brew install --cask android-platform-tools
```


<hr />

### 解鎖開機載入程式 (Bootloader)

:::info

- 解鎖開機載入程式會使 OEM 保固失效。但是，你可以重新刷入原廠 ROM 並重新鎖定開機載入程式以還原保固。
- 無論其他因素如何，你都將失去 Widevine L1/DRM 認證，這將降級為 L3。  
- 你將失去 [裝置完整性 (device integrity)](https://developer.android.com/google/play/integrity/overview)，這可能導致依賴此認證的應用程式停止工作，除非稍後透過 root 權限進行修復。  
  [此指南](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) 可能對解決此問題有所幫助。 

:::

A. **先決條件**
- **備份你的資料**（解鎖將清除所有內容）。
- **安裝 ADB & Fastboot 工具** —— [點此下載](https://developer.android.com/studio/releases/platform-tools)。
- **安裝 USB 驅動程式** —— [Google USB 驅動程式](https://developer.android.com/studio/run/win-usb)。
- **啟用開發者選項**：
  - `設定 > 關於手機 > 點擊「版本號」7 次。`
- **啟用 USB 除錯和 OEM 解鎖**：
  - `設定 > 系統 > 開發者選項 > 啟用 USB 除錯和 OEM 解鎖。`
- **移除螢幕鎖/PIN/密碼和已登錄的帳號（可選但建議）**
  - 在重新鎖定開機載入程式之前移除帳號有助於防止 Google FRP (原廠重置保護) 鎖定。如果觸發了 FRP，裝置在還原出廠設定後將要求提供之前連結的 Google 帳號。如果你忘記了憑據或無法訪問該帳號，你可能會被鎖在裝置之外。為了避免這種情況，建議在重新鎖定之前移除所有 Google 帳號。

B. **解鎖過程**
- **透過 USB 將手機連接到電腦**。
- **在 platform-tools 資料夾中開啟命令提示字元**：
  - Windows：`Shift + 右鍵點擊` > **在此處開啟命令提示字元/Powershell**。
  - Mac/Linux：開啟 **終端 (Terminal)** 並導航到 platform-tools。
- **驗證裝置連接**：
  ```sh
  adb devices
  ```
  如果彈出提示，請在手機上允許 USB 除錯。

- **重啟至開機載入程式：**
    ```sh
    adb reboot bootloader
    ```

- **驗證 fastboot 連接：**
    ```sh
    fastboot devices
    ```
    如果未檢測到裝置，請重新安裝 USB 驅動程式。

- **解鎖開機載入程式：**
    ```sh
    fastboot flashing unlock
    ```

- **在手機上確認：**
  - 使用 **音量鍵** 導航，使用 **電源鍵** 確認。
  - 你的裝置將 **清除所有資料** 並重啟。

C. **解鎖後**
  - 重新設定你的手機。
  - **驗證開機載入程式狀態**：
    ```sh
    設定 > 系統 > 開發者選項 > OEM 解鎖應為已啟用。
    ```

  - 開機載入程式現在已解鎖，你的裝置在啟動時將顯示 Orange State 警告 —— 這是正常現象。


<hr />

### Root

:::info

- Root 會 **使 OEM 保固失效**，並且除非在更新前還原原廠映像，否則可能會破壞 OTA 更新。
- 務必確保 **boot / init_boot 映像與你當前的韌體版本完全匹配**。
  刷入錯誤或不匹配的映像 **會導致無限重啟 (bootloops)**。
- **如果分區存在，請務必使用 `init_boot` 而非 `boot` 映像進行 root**。
- Root 需要 **已解鎖的開機載入程式**。
- 用戶也可以參考並排連結的視覺指南：[orailnoor](https://www.youtube.com/watch?v=v0i4rftKNWs) | [Droidwin](https://www.youtube.com/watch?v=4T1ZHDUCBsw) | [EpicDroid](https://www.youtube.com/watch?v=vXIBfyX7s-k)。

:::

<br />

A. **先決條件**
- **已解鎖開機載入程式** 並 **啟用了 USB 除錯**
- **配備 ADB & Fastboot 的電腦**  
  *或* 另一部安裝了 **USB-OTG + ADB 應用程式（例如 [Bugjaeger](https://play.google.com/store/apps/details?id=eu.sisik.hackendebug&hl=en_IN)）** 的 Android 手機  
  *或* **自訂 recovery（例如 TWRP / OrangeFox / 基於 AOSP 的 recovery）**
- 對 **ADB / Fastboot** 的基本了解
- 與你當前版本匹配的 **原廠韌體**（用於提取映像）
- 推薦的 root 解決方案：
  - [Magisk](https://github.com/topjohnwu/Magisk/releases) | [安裝指南](https://topjohnwu.github.io/Magisk/install.html)
  - [KernelSU (KSU)](https://github.com/tiann/KernelSU) | [安裝指南](https://kernelsu.org/guide/installation.html)
  - [KernelSU Next (KSUN)](https://github.com/KernelSU-Next/KernelSU-Next) | [安裝指南](https://kernelsu-next.github.io/webpage/pages/installation.html)

<br />

B. **檢查當前軟體版本**
- 在手機上，導航至：設定 > 關於手機 > 點擊 Nothing OS 橫幅。
- **記下版本號 (Build Number)**
- 範例：`Pong_B4.0-251119-1654`
- 忽略任何區域後綴，如 `IND` / `EEA` / `TUR` 等。

<br />

C. **取得原廠 Boot / Init_boot 映像**
- 導航到 [發布索引](/docs/firmware)。
- 選擇你的 **裝置型號**
- 開啟適用於你確切版本的 **OTA 映像**
- 從發布資源中下載對應的存檔：`*-image-boot.img.7z`。

- 解壓存檔並找到：
  - `init_boot.img` **（如果存在，優先選用）**
  - `boot.img`（僅在 `init_boot` 不存在時選用）

- **將映像傳輸到你的裝置**
  ```sh
  adb push init_boot.img /sdcard/Download/
  # 或
  adb push boot.img /sdcard/Download/
  ```

<br />

D. **修補映像**

**Magisk**
- 在裝置上安裝最新的 Magisk APK。
- 開啟 Magisk → 安裝 → 選擇並修補一個檔案。
- 選擇傳輸的 `init_boot`（優先）/ `boot` 映像。 
- Magisk 將生成：`magisk_patched-XXXXX.img`

<br />

**KernelSU / KernelSU Next**  

:::note

- 對於 Nothing Phone (2)：原廠 `boot.img` 支援基於 KSU 的 root 方法。但 KSUN 或 SUSFS 支援需要帶有修補程式的自訂編譯核心。
- 已知的預修補自訂核心選項包括： 
  [arter97 核心](https://xdaforums.com/t/r44-arter97-kernel-for-nothing-phone-2.4631313/) - KSU 預修補。尚不支援 NOS 4.0+ | 
  [Meteoric 核心 (EOL)](https://github.com/HELLBOY017/kernel_nothing_sm8475) - KSUN + SUSFS 預修補。不支援 NOS 4.0+。 |
  [Wild 核心分支](https://github.com/MiguVT/Meteoric_KernelSU_SUSFS) - KSU + SUSFS 預修補。 | 
  [Wild 核心](https://github.com/WildKernels/GKI_KernelSU_SUSFS) - KSUN + SUSFS 預修補。支援 5.10-android12。 
- 出廠自帶 Android 13+ 供應商的 Nothing 型號（即 Phone (2) 之後發布的型號）將支援 KSUN 修補方法。

:::

- 修補方法與 Magisk 類似。在 KSU/KSUN 管理器中點擊「未安裝」> 修補 `init_boot.img` 並將修補後的映像傳輸到電腦。

- 重啟至開機載入程式：
  ```sh
  adb reboot bootloader
  ```

- 刷入修補後的映像
  ```bash
  fastboot flash init_boot <拖放修補後的映像檔案>
  ```

- 重啟至系統：
  ```bash
  fastboot reboot
  ``` 

- 裝置應已透過 KSU/KSUN 取得 root 權限。


<hr />

### Play Integrity

| 指南 | 連結 |
|-------|------|
| 修復 Play Integrity 和 Root 檢測 | [Wiki](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) |


<hr />

### 備份核心分區

:::info

- 在解鎖開機載入程式後，在刷入自訂 ROM 或核心 **之前**，備份核心分區（如 `persist`, `modemst1`, `modemst2`, `fsg` 等）至關重要。
- 這些分區包含重要資料，包括 IMEI、網路設定和指紋感測器校準。
- 如果丟失或損壞，你的裝置可能會 **失去移動網路連接、指紋識別問題，甚至損壞 (brick)**。
- 建立備份可確保你在出現問題時可以 **還原裝置**。

:::

A. **要求**
- **已解鎖開機載入程式**
- **Root 權限**（透過 Magisk/KSU/Apatch）
- **Termux 應用**（透過 F-Droid 或 Play 商店安裝）
- **檢查分區路徑：**
  - **高通 (Qcom) 裝置：** `/dev/block/bootdevice/by-name/`
  - **聯發科 (MTK) 裝置：** `/dev/block/by-name/`

B. **備份說明**
- **對於高通 (Qualcomm/QCom) 裝置：**
  - 開啟 **Termux** 並使用以下指令授予 root 權限：
    ```sh
    su
    ```

  - 一次性複製並貼上以下指令：
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    這將在 **內部儲存空間** 的「partitions_backup」資料夾中建立 **除 `super` 和 `userdata` 以外的所有分區** 的映像檔案。

  - **[可選]** 如果上述指令失敗，請嘗試此替代方案：
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **對於聯發科 (MediaTek/MTK) 裝置：**
  - 開啟 **Termux** 並使用以下指令授予 root 權限：
    ```sh
    su
    ```

  - 一次性複製並貼上以下所有指令：
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
  - 將「partitions_backup」資料夾移動到你的 **電腦或安全儲存裝置**。
  - **請勿分享這些備份！** 它們包含 IMEI 等唯一的裝置資料。

D. **還原分區**
 - **MTK 裝置：**
    ```sh
    fastboot flash nvram nvram.img
    fastboot flash nvdata nvdata.img
    fastboot flash nvcfg nvcfg.img
    fastboot flash persist persist.img
    ```
    重啟至 **recovery 模式** → 執行 **還原出廠設定 (factory reset)** → 重啟至 **系統**。
    - 參考連結：[Nothing Phone (2a) DVT 工程樣機：還原基頻和 IMEI 記錄](https://bluehomewu.github.io/posts/Restoring-Baseband-and-IMEI-on-Nothing-Phone-2a-DVT/)
    - 該帖子以繁體中文撰寫，可以使用瀏覽器翻譯功能翻譯。

 - **QCom 裝置：**
    ```sh
    fastboot flash persist persist.img
    fastboot flash modemst1 modemst1.img
    fastboot flash modemst2 modemst2.img
    ```
    **在這種情況下，還原出廠設定並非必須。**


<hr />

### 刷入原廠 ROM（修復救磚 / 降級）

:::note

- 這是手動全新刷入較新版本原廠韌體或降級的唯一推薦方法。
- 欲深入了解，請參考並排連結的視覺指南：[Droidwin](https://www.youtube.com/watch?v=YCYEjdC3oHM) | [The Nothing Lab](https://www.youtube.com/watch?v=l0P9gosl64s) | [QZX Tech](https://www.youtube.com/watch?v=66H2MVElyAY)

:::

A. **準備刷機資料夾：**
  - 下載適用於你裝置型號和韌體版本的以下檔案，並將它們放在一個專用資料夾中：
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x
    - `-hash.sha256` —— 這是可選的，但建議用於驗證檔案完整性和檢測缺失部分。

  - 從 https://www.7-zip.org/ 安裝 7-Zip。

  - 可選（**推薦**）：你可以使用提取腳本而不是手動步驟：
    - [Windows](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.bat)
    - [Bash](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.sh)
    - 在下載檔案所在的資料夾中執行腳本。

  - 提取檔案：
    - Windows：右鍵點擊 → 「提取到 "*\"」
    - Bash 用戶：`7za -y x "*.7z*"`

  - 在極少數情況下，下載管理器可能會修改分段邏輯檔案的擴展名。
  - 重命名：
    - `-image-logical.7z.001.7z` → `-image-logical.7z.001`
    - `-image-logical.7z.002.7z` → `-image-logical.7z.002`
  - 然後重試提取。

B. **進行刷機：**
  - 從 [這裡](https://developer.android.com/studio/run/win-usb) 安裝相容的 USB 驅動程式。
  - 確保裝置處於 **開機載入程式模式** 時，**裝置管理員** 中可見「Android Bootloader Interface」。
  - 如果之前使用了提取腳本，請直接執行它。否則：
    - 將所有提取的映像檔案移動到一個資料夾中，連同 [Nothing Fastboot Flasher 腳本](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download)。
    - 將 `-hash.sha256` 檔案放在同一目錄中。 
    - 務必下載最新腳本以確保包含熱修復程式。
  - 在聯網狀態下執行腳本（以取得最新的 `platform-tools`）並按照提示操作：
    - 回答確認問卷。
    - 根據情況跳過或進行雜湊檢查。 
    - 選擇是否清除資料：(Y/N) [全新刷機 / 降級 = `Y` | 覆蓋刷機 / 升級 = `N`]
    - 選擇是否刷入兩個插槽：(Y/N)
    - 停用 Android 已驗證開機 (Android Verified Boot)：(N) [請注意，如果你在此處選擇 `Y`，以後將無法解鎖開機載入程式！]
  - 驗證所有分區是否已成功刷入。
    - 如果成功，選擇重啟至系統：(Y)
    - 如果出現錯誤，請在解決故障後重啟至開機載入程式並重新刷入。在未解決問題的情況下重啟至系統可能會導致裝置損壞 (brick)。


<hr />

### 重新鎖定開機載入程式 (Bootloader)

A. **先決條件**
  - 移除 **螢幕鎖/PIN/密碼和已登錄的帳號**（可選但建議）。
  - 按照 [刷機指南](#刷入原廠-rom修復救磚--降級) 全新刷入 **原廠 ROM**。**在未刷入原廠韌體的情況下，使用修改過的分區重新鎖定開機載入程式可能會損壞裝置！**
  - 備份所有資料（重新鎖定將 **清除所有內容**）。
  - 如果尚未設定，請安裝 **ADB & Fastboot 工具** 和 USB 驅動程式。

B. **重新鎖定過程**
  - 如果你在系統中，重啟至開機載入程式：
    ```sh
    adb reboot bootloader
    ```

  - 驗證 fastboot 連接：
    ```sh
    fastboot devices
    ```

  - 下達重新鎖定指令：
    ```sh
    fastboot flashing lock
    ```

  - 在手機上確認：
    - 使用 **音量鍵** 導航，使用 **電源鍵** 確認。
    - 裝置將被格式化並以鎖定的開機載入程式重啟。

C. **重新鎖定後**
  - 重新設定你的裝置。
  - 開機載入程式現已鎖定！
---

## 深度救磚 (Hard Unbrick)

:::note

僅當無法使用 [刷入原廠 ROM 指南](#刷入原廠-rom修復救磚--降級) 還原裝置時，才應參考本部分。

:::

### 驅動程式

安裝適合您裝置 SoC 製造商的驅動程式。

- **Qualcomm HS-USB 9008 驅動程式：** [OneDrive](https://itraps-my.sharepoint.com/personal/public_builds_itraps_onmicrosoft_com/_layouts/15/onedrive.aspx?viewid=fce5f287%2D4883%2D4f5a%2Daf37%2D29642c53cfdf&id=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers%2FQualcomm%2DHS%2DUSB%2DQDLoader%2D9008%2DDriver%2Ezip&parent=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers) // [Microsoft Update 目錄](https://catalog.update.microsoft.com/Search.aspx?q=qualcomm%20hs-usb)
- **MediaTek 驅動程式：** [MediaFire](https://www.mediafire.com/file/w0z94wwe4lkka7q/MTK-Driver-v5.2307.zip/file) // [OneDrive](https://itraps-my.sharepoint.com/personal/public_builds_itraps_onmicrosoft_com/_layouts/15/onedrive.aspx?viewid=fce5f287%2D4883%2D4f5a%2Daf37%2D29642c53cfdf&id=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers%2FQualcomm%2DHS%2DUSB%2DQDLoader%2D9008%2DDriver%2Ezip&parent=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers)

### EDL 資料線 (Qualcomm)

- 請注意，如果在使用原裝資料線且已安裝開發者驅動的情況下，刷機工具仍無法識別裝置，則基於 Snapdragon 的裝置可能需要 **Hydra v2 資料線**。
- **驗證：** 在關機狀態下，同時按住 **音量 +** 和 **音量 -** 鍵，然後將資料線連接到電腦。如果使用 Hydra v2 資料線，請在連接時按下線上的按鈕。
- 有關製作 EDL 資料線的 **DIY 方法**，請參閱[此指南](https://xdaforums.com/t/edl-cable-for-nothing-phone-2.4654742/)。

### 官方刷機工具

:::danger 免責聲明

- 以下列出的工具是流傳於網路上的**官方服務工具**。**使用風險自負。**
- 專案作者與貢獻者對使用這些工具導致的任何意外後果或損害**不承擔任何責任**。
- 這些工具可能會隨着未來的韌體更新隨時失效。
- 它們**不適用於**常規的原廠 ROM 刷入。僅在以下**最後手段**的情況下使用：
  - 裝置完全沒有反應（深度磚機，黑屏）。
  - 無法進入 Fastboot 模式（即使安裝了正確的驅動）。
  - 您所在地區沒有官方服務支援，且裝置已過保固期。
- 不保證對這些工具的後續支援，也不會受理取得未來版本的請求。

:::

#### Nothing 裝置：
- [Phone (1)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgDVNZLx9PuARKU5ZYHxTw1RAesDD6ZYA9ncgyk_6jpU3_M?e=RnzUwd)
- [Phone (2)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgA-PysiaC16Qow4EA9_CfP0AbYCgxOlahRyJjB7LQw8RZo?e=4jK0yh)
- [Phone (2a)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgCYxRHWxndKRLFNcO9zLhjcAQunpBStuG-OAetxx1hvsQs?e=mqYlE8)
- [Phone (2a) Plus](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgBuoaxqlNkYR63Fa_z0tGl-AVHKWsuj27LeyhMoXtghwJc?e=fOQp2m)
- [Phone (3a) 系列](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgBcJ6YHDfGhSL_TZ8P0WfJXAfKNm7BoxC_uMe071vRmhsM?e=El0x5j)
- [Phone (3)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgCDb2UqoryZSIBDYMu52jjjAQ5Uq5INNOnhOHbH2jr0EpY?e=h8lKHX)
- [Phone (3a) Lite](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgA33YYMKQxUTZplrWoGIji5AfviLdYkUHlh4H2LjQ0_FQQ?e=rBIZ3y)
- [Phone (4a)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgAhqokf-Be4SY2YdeeOr9mrAT-5OsO2Ay-x6UqaAynpKHU?e=X4mojq)

#### CMF by Nothing 裝置：
- [Phone (1)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgA4tWOkyg4WRqsTmrbNiKECAX3M-2SCUeDFiJ1eraslW7c?e=4mDouI)
- [Phone (2) Pro](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgDUePBy5E6TS5zgqO0MqkVEAQ9C7aMdohvQ6FpMr-RxWdQ?e=sebyob)

### 其他資源

可用於研究或高級用途的其他指南和項目：

- [非官方 Qualcomm Firehose / Sahara / Streaming / Diag 工具](https://github.com/bkerler/edl)（由 bkerler 提供）
- [NTPI Dumper](https://github.com/AaronXenos/ntpi_dumper)（由 AaronXenos 提供）
- [Phone (2a) 系列深度救磚助手](https://github.com/mistrmochov/nothing-pacman-hardbrick)（由 mistrmochov 提供）
- [Phone (2a) 系列刷機工具](https://github.com/R0rt1z2/pacman-flash-tool)（由 R0rt1z2 提供）
- [Nothing 手機 Firehose 驗證檔案](https://github.com/plusonsoy/nothing_edl)（由 plusonsoy 提供）


---


## 售後開發

## 售後開發

隨時了解自訂 ROM、核心和開發項目的最新動態。

:::note

- 此部分由 [Telegram](https://t.me/Nothing_Archive) 社群管理，不隸屬於 Nothing。
- 下方的連結提供了來自 Telegram 頻道的篩選搜尋結果，無需註冊即可查看。但是，如果你對修補系統、發揮裝置的最大潛力或保持獲取最新發布感興趣，建議你註冊並參與各個裝置的討論聊天室以尋求支援或與愛好者社群交流。
- 有時下方的連結可能沒有任何結果，這意味著某些類別的內容尚未推出、開發或尚未由該型號的可靠維護者維護。
- 解鎖開機載入程式並刷入自訂韌體將使你的 OEM 保固失效。如果相關貼文中有所提及，請閱讀所有刷機指南，並參考隨附的支援聊天室或該型號的討論群組。

:::

### 裝置更新頻道 (Telegram)

**Nothing:**

| 裝置 | ROM | Recovery | Kernel | Updates |
|------|-----|----------|--------|---------|
| Phone (1) | [此處](https://t.me/s/NothingPhone1Updates?q=%23ROM) | [此處](https://t.me/s/NothingPhone1Updates?q=%23Recovery) | [此處](https://t.me/s/NothingPhone1Updates?q=%23Kernel) | [此處](https://t.me/s/NothingPhone1Updates?q=%23OTA) |
| Phone (2) | [此處](https://t.me/s/NothingPhone2updates?q=%23ROM) | [此處](https://t.me/s/NothingPhone2updates?q=%23Recovery) | [此處](https://t.me/s/NothingPhone2updates?q=%23Kernel) | [此處](https://t.me/s/NothingPhone2updates?q=%23OTA) |
| Phone (2a) 系列 | [此處](https://t.me/s/NothingPhone2aUpdates?q=%23ROM) | [此處](https://t.me/s/NothingPhone2aUpdates?q=%23Recovery) | [此處](https://t.me/s/NothingPhone2aUpdates?q=%23Kernel) | [此處](https://t.me/s/NothingPhone2aUpdates?q=%23OTA) |
| Phone (3a) 系列 | [此處](https://t.me/s/NothingPhone3aUpdates?q=%23ROM) | [此處](https://t.me/s/NothingPhone3aUpdates?q=%23Recovery) | [此處](https://t.me/s/NothingPhone3aUpdates?q=%23Kernel) | [此處](https://t.me/s/NothingPhone3aUpdates?q=%23OTA) |
| Phone (3) | [此處](https://t.me/s/Phone3Updates?q=%23ROM) | [此處](https://t.me/s/Phone3Updates?q=%23Recovery) | [此處](https://t.me/s/Phone3Updates?q=%23Kernel) | [此處](https://t.me/s/Phone3Updates?q=%23OTA) |
| Phone (4a) 系列 | [此處](https://t.me/s/Phone4aUpdates?q=%23ROM) | [此處](https://t.me/s/Phone4aUpdates?q=%23Recovery) | [此處](https://t.me/s/Phone4aUpdates?q=%23Kernel) | [此處](https://t.me/s/Phone4aUpdates?q=%23OTA) |

**CMF by Nothing:**

| 裝置 | ROM | Recovery | Kernel | Updates |
|------|-----|----------|--------|---------|
| Phone (1) | [此處](https://t.me/s/CMFPhone1Updates?q=%23ROM) | [此處](https://t.me/s/CMFPhone1Updates?q=%23Recovery) | [此處](https://t.me/s/CMFPhone1Updates?q=%23Kernel) | [此處](https://t.me/s/CMFPhone1Updates?q=%23OTA) |
| Phone (2) Pro / Phone (3a) Lite | [此處](https://t.me/s/CMFPhone2GlobalUpdates?q=%23ROM) | [此處](https://t.me/s/CMFPhone2GlobalUpdates?q=%23Recovery) | [此處](https://t.me/s/CMFPhone2GlobalUpdates?q=%23Kernel) | [此處](https://t.me/s/CMFPhone2GlobalUpdates?q=%23OTA) |

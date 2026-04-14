---
sidebar_position: 4
title: 指南
description: 關於解鎖啟動加載程序、獲獲取 root 權限、OTA 更新以及 Nothing 設備自定義的逐步指南。
keywords: [nothing 解鎖啟動加載程序, nothing root, nothing fastboot, nothing ota 更新, nothing 撥號代碼, 自定義 essential 按鍵]
---

# 操作指南

關於各個方面的逐步操作指南。

## 一般使用與故障排除

日常生活使用的秘訣、技巧以及通用指南。

### OTA 側載 (Sideloading)

:::note

- 側載增量 OTA 更新 **並非必須** 解鎖啟動加載程序 (bootloader)。除非你是 root 用戶，否則請跳過步驟 A。
- 只要直接從此存檔下載，側載官方增量或完整 OTA 更新都是安全的。
- 請勿使用第三方來源。Nothing 存檔中的所有固件均直接源自 Nothing 的官方 OEM 服務器。  
  這可以通過檢查增量 OTA 部分中的下載 URL 來驗證，這些 URL 指向官方服務器，而非第三方文件託管商。
- Nothing OS 內置的離線更新程序僅接受 OEM 簽名的更新包。
- 更新程序在安裝前會驗證固件哈希值，如果使用了錯誤或不匹配的 OTA zip 文件，則會失敗。
- 同樣的驗證也適用於完整 OTA 包；除非其完整性完好無損，否則不會安裝。
- 由於這些檢查，在鎖定的啟動加載程序上側載官方 OTA zip 文件是不可能導致設備損壞（brick）的。
- 對於公開測試版 (Open Beta) 更新，如果撥號器方法無效，請通過 OEM 提供的 `Nothing Beta Updater Hub`（名稱將來可能會更改）進行側載。
  你可以從「設置」中啟動該界面。當你安裝了 OEM 的測試版更新程序應用（會覆蓋系統內置版本）時，就會出現這種情況。
- 視覺參考請按所列順序查看 [這裡](https://github.com/spike0en/nothing_archive/tree/main/assets/sideloading) 的圖片。

:::

<br />

A. **恢復原廠分區（僅限 Root 用戶）**  
  :::tip
  如果你的啟動加載程序已鎖定，請直接跳到 B 點！
  :::

1. **檢查當前 Nothing OS 版本：**  
   - 前往 `設置 > 關於手機 > 點擊設備橫幅`。  
   - 記下版本號。  

2. **獲取當前固件版本的原廠鏡像：**  
   - 下載 `-boot-image.7z` 文件。  
   - 解壓存檔以獲取 `.img` 文件。  

3. **識別所需分區：**  
   - **Qualcomm 設備：** `boot`, `init_boot`, `vendor_boot`, `recovery`, `vbmeta`  
   - **MediaTek 設備：** `init_boot`, `vbmeta`, `lk`

4. **在啟動加載程序模式下刷入原廠分區：**  
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

5. **重啟至系統並通過系統更新程序進行更新：**
   - 如果更新 **失敗**，請繼續執行下一節中的 **手動側載**。

6. **恢復 Root（可選）：**
   - 更新後，你可以通過為更新後的 NOS 版本 **刷入已修補的引導鏡像** 來重新獲取 root 權限。
   - 重新獲取 root 後，**模塊將保持不變**。

<br />

B. **繼續進行側載** 

 - **下載正確的更新固件文件：**  
   - 從 [這裡](/docs/firmware) 找到適用於你設備的正確 OTA 固件文件。

 - **如何選擇正確的文件？**  
   - 導航到存儲庫並選擇你的設備型號。  
   - 查看「增量 OTA (Incremental OTA)」列。  
   - **驗證你當前的手機系統版本號**:  
     - 前往：`設置 > 系統 > 關於手機`。  
     - 點擊 **設備橫幅** 並記下 **版本號**。

 - **範例：**  
   - 假設你的 **Phone (2)** 版本號為：`Pong_U2.6-241016-1700` 
     - 假設最新可用的 OTA 更新為：`Pong_V3.0-241226-2001`
     - 對應的更新路徑為：`Pong_U2.6-241016-1700` -> `Pong_V3.0-241226-2001`
   - 請務必根據你的設備和系統版本選擇正確的路徑。
     - 欲了解更多詳情，請參考 [此圖](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg)。

 - **創建 `ota` 文件夾：** 
   - 在設備的 **內部存儲** 中創建一個名為 `ota` 的文件夾，完整路徑為：  
     ```text
     /sdcard/ota/
     ```
   - 將下載的 `<firmware>.zip` 文件移動到此文件夾中。

 - **訪問 Nothing 離線 OTA 更新程序：**  
    - 打開 **電話應用** 並撥打：  
      ```text
      *#*#682#*#*
      ```
   - 這將啟動內置的離線更新工具。  
   - 界面可能會顯示 `NothingOfflineOtaUpdate` 或 `NOTHING BETA OTA UPDATE` —— 兩者皆可。

 - **應用更新：**  
   - 更新程序將自動檢測更新文件。  
   - 如果未檢測到，請手動瀏覽並導入 OTA 文件。  
   - 點擊 `Directly Apply OTA` 或 `Update`（根據應用界面而定）。  
   - 等待更新完成 —— 你的設備將自動重啟。

:::note

- 如果更新程序顯示 **未知錯誤**，請嘗試使用 **「瀏覽 (Browse)」** 選項，而不是手動將文件複製到 **「ota」** 文件夾。
- 如果增量 OTA 失敗，可以側載 **完整 OTA 固件**。
- **完整 OTA 不能用於降級** —— 它只能更新到相同或更高的版本。
- **已解鎖啟動加載程序的用戶** 可以通過自定義 recovery（例如各型號適用之 OrangeFox 或 TWRP）刷入完整 OTA。
- **並非每個版本都有完整 OTA 文件** —— 在這種情況下請使用增量更新。

:::


<hr />

### 安全模式

- [重啟至安全模式](https://www.hardreset.info/devices/nothing/nothing-phone-2/safe-mode/)


<hr />

### 撥號代碼

你可以撥打撥號代碼 (USSD) 來訪問隱藏菜單和診斷程序。

| 代碼 | 功能 |
|------|----------|
| `*#06#` | 顯示 IMEI 和序列號 |
| `*#07#` | 顯示 SAR 等級和法規信息 |
| `*#*#569#*#*` | 打開 Nothing 反饋 / 日誌工具 |
| `*#*#0#*#*` | 硬件測試菜單（屏幕、傳感器、觸摸） |
| `*#*#9#*#*` | 打開 Nothing 診斷菜單 |
| `*#*#225#*#*` | 顯示日曆存儲信息 |
| `*#*#426#*#*` | Google Play / Firebase 診斷信息 |
| `*#*#4636#*#*` | 測試菜單（手機、電池、使用統計、Wi-Fi） |
| `*#*#682#*#*` | 打開離線 OTA 更新程序（如果安裝了 Nothing Beta Hub 則無效） |


---

## 設備功能與配件

特定硬件調整和配對指南。

### 解鎖 Bauhaus 主題

以 Bauhaus 為靈感的主題是一項特殊版本功能，可以在多款 Nothing 手機型號上解鎖。

#### Phone (2a) Special Edition
- [解鎖隱藏功能](https://nothing.community/d/11058-hidden-feature-of-phone-2a-special-edition)（由 RapidZapper 提供）

#### 其他 Nothing 型號

**要求：**
- 配備 ADB & Fastboot 的電腦
- [SetEdit 應用程序](https://github.com/MuntashirAkon/SetEdit)

**步驟：**

1. **啟用開發者選項：** 前往 `設置 > 關於手機 > 點擊「版本號」7 次`。
2. **啟用 USB 調試：** 前往 `設置 > 系統 > 開發者選項 > 啟用 USB 調試`。
3. **通過 ADB 安裝 SetEdit：**
   - 將下載的 APK 重命名為 `SetEdit.apk`。
   - 運行以下命令：
     ```sh
     adb install --bypass-low-target-sdk-block SetEdit.apk
     ```
4. **解鎖主題：**
   - 打開 SetEdit 並授予所有要求的權限。
   - 在 **System Table** 中尋找 `theme_bauhaus_enable`。
   - 將值設置為 `1`（設置回 `0` 即可禁用）。
5. **應用主題：**
   - 前往 Nothing Launcher 設置並應用新主題。

:::warning

- **請勿修改 SetEdit 中的任何其他值！！**
- 隨意更改系統設置可能會導致系統不穩定或出現問題。

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

- [支持的型號和功能](https://gadgetbridge.org/gadgets/wearables/nothing/)
- [Nothing CMF 服務器配對](https://gadgetbridge.org/basics/pairing/nothing-cmf-server/)


---

## 高級指南

:::warning
僅建議高級用戶使用。如果操作不當，這些步驟可能會導致設備損壞（brick）或使保修失效。
:::

這些指南按時間順序排列。強烈建議嚴格遵守此順序。

### 先決條件與工具

以下高級指南所需的必備工具。

#### USB 驅動程序

USB 文件傳輸和設備識別所需的必備驅動程序。

- [適用於 Windows 的 Google USB 驅動程序](https://dl.google.com/android/repository/usb_driver_r13-windows.zip)
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

### 解鎖啟動加載程序 (Bootloader)

:::info

- 解鎖啟動加載程序會使 OEM 保修失效。但是，你可以重新刷入原廠 ROM 並重新鎖定啟動加載程序以恢復保修。
- 無論其他因素如何，你都將失去 Widevine L1/DRM 認證，這將降級為 L3。  
- 你將失去 [設備完整性 (device integrity)](https://developer.android.com/google/play/integrity/overview)，這可能導致依賴此認證的應用程序停止工作，除非稍後通過 root 權限進行修復。  
  [此指南](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) 可能對解決此問題有所幫助。 

:::

A. **先決條件**
- **備份你的數據**（解鎖將擦除所有內容）。
- **安裝 ADB & Fastboot 工具** —— [點此下載](https://developer.android.com/studio/releases/platform-tools)。
- **安裝 USB 驅動程序** —— [Google USB 驅動程序](https://developer.android.com/studio/run/win-usb)。
- **啟用開發者選項**：
  - `設置 > 關於手機 > 點擊「版本號」7 次。`
- **啟用 USB 調試和 OEM 解鎖**：
  - `設置 > 系統 > 開發者選項 > 啟用 USB 調試和 OEM 解鎖。`
- **移除屏幕鎖/PIN/密碼和已登錄的帳戶（可選但建議）**
  - 在重新鎖定啟動加載程序之前移除帳戶有助於防止 Google FRP (出廠重置保護) 鎖定。如果觸發了 FRP，設備在出廠重置後將要求提供之前鏈接的 Google 帳戶。如果你忘記了憑據或無法訪問該帳戶，你可能會被鎖在設備之外。為了避免這種情況，建議在重新鎖定之前移除所有 Google 帳戶。

B. **解鎖過程**
- **通過 USB 將手機連接到電腦**。
- **在 platform-tools 文件夾中打開命令提示符**：
  - Windows：`Shift + 右鍵點擊` > **在此處打開命令提示符/Powershell**。
  - Mac/Linux：打開 **終端 (Terminal)** 並導航到 platform-tools。
- **驗證設備連接**：
  ```sh
  adb devices
  ```
  如果彈出提示，請在手機上允許 USB 調試。

- **重啟至啟動加載程序：**
    ```sh
    adb reboot bootloader
    ```

- **驗證 fastboot 連接：**
    ```sh
    fastboot devices
    ```
    如果未檢測到設備，請重新安裝 USB 驅動程序。

- **解鎖啟動加載程序：**
    ```sh
    fastboot flashing unlock
    ```

- **在手機上確認：**
  - 使用 **音量鍵** 導航，使用 **電源鍵** 確認。
  - 你的設備將 **擦除所有數據** 並重啟。

C. **解鎖後**
  - 重新設置你的手機。
  - **驗證啟動加載程序狀態**：
    ```sh
    設置 > 系統 > 開發者選項 > OEM 解鎖應為已啟用。
    ```

  - 啟動加載程序現在已解鎖，你的設備在啟動時將顯示 Orange State 警告 —— 這是正常現象。


<hr />

### Root

:::info

- Root 會 **使 OEM 保修失效**，並且除非在更新前恢復原廠鏡像，否則可能會破壞 OTA 更新。
- 務必確保 **boot / init_boot 鏡像與你當前的固件版本完全匹配**。
  刷入錯誤或不匹配的鏡像 **會導致無限重啟 (bootloops)**。
- **如果分區存在，請務必使用 `init_boot` 而非 `boot` 鏡像進行 root**。
- Root 需要 **已解鎖的啟動加載程序**。
- 用戶也可以參考並排鏈接的視覺指南：[orailnoor](https://www.youtube.com/watch?v=v0i4rftKNWs) | [Droidwin](https://www.youtube.com/watch?v=4T1ZHDUCBsw) | [EpicDroid](https://www.youtube.com/watch?v=vXIBfyX7s-k)。

:::

<br />

A. **先決條件**
- **已解鎖啟動加載程序** 並 **啟用了 USB 調試**
- **配備 ADB & Fastboot 的電腦**  
  *或* 另一部安裝了 **USB-OTG + ADB 應用程序（例如 [Bugjaeger](https://play.google.com/store/apps/details?id=eu.sisik.hackendebug&hl=en_IN)）** 的安卓手機  
  *或* **自定義 recovery（例如 TWRP / OrangeFox / 基於 AOSP 的 recovery）**
- 對 **ADB / Fastboot** 的基本了解
- 與你當前版本匹配的 **原廠固件**（用於提取鏡像）
- 推薦的 root 解決方案：
  - [Magisk](https://github.com/topjohnwu/Magisk/releases) | [安裝指南](https://topjohnwu.github.io/Magisk/install.html)
  - [KernelSU (KSU)](https://github.com/tiann/KernelSU) | [安裝指南](https://kernelsu.org/guide/installation.html)
  - [KernelSU Next (KSUN)](https://github.com/KernelSU-Next/KernelSU-Next) | [安裝指南](https://kernelsu-next.github.io/webpage/pages/installation.html)

<br />

B. **檢查當前軟件版本**
- 在手機上，導航至：設置 > 關於手機 > 點擊 Nothing OS 橫幅。
- **記下版本號 (Build Number)**
- 範例：`Pong_B4.0-251119-1654`
- 忽略任何區域後綴，如 `IND` / `EEA` / `TUR` 等。

<br />

C. **獲取原廠 Boot / Init_boot 鏡像**
- 導航到 [發布索引](/docs/firmware)。
- 選擇你的 **設備型號**
- 打開適用於你確切版本的 **OTA 鏡像**
- 從發布資源中下載對應的存檔：`*-image-boot.img.7z`。

- 解壓存檔並找到：
  - `init_boot.img` **（如果存在，優先選用）**
  - `boot.img`（僅在 `init_boot` 不存在時選用）

- **將鏡像傳輸到你的設備**
  ```sh
  adb push init_boot.img /sdcard/Download/
  # 或
  adb push boot.img /sdcard/Download/
  ```

<br />

D. **修補鏡像**

**Magisk**
- 在設備上安裝最新的 Magisk APK。
- 打開 Magisk → 安裝 → 選擇並修補一個文件。
- 選擇傳輸的 `init_boot`（優先）/ `boot` 鏡像。 
- Magisk 將生成：`magisk_patched-XXXXX.img`

<br />

**KernelSU / KernelSU Next**  

:::note

- 對於 Nothing Phone (2)：原廠 `boot.img` 支持基於 KSU 的 root 方法。但 KSUN 或 SUSFS 支持需要帶有修補程序的自定義編譯內核。
- 已知的預修補自定義內核選項包括： 
  [arter97 內核](https://xdaforums.com/t/r44-arter97-kernel-for-nothing-phone-2.4631313/) - KSU 預修補。尚不支持 NOS 4.0+ | 
  [Meteoric 內核 (EOL)](https://github.com/HELLBOY017/kernel_nothing_sm8475) - KSUN + SUSFS 預修補。不支持 NOS 4.0+。 |
  [Wild 內核分支](https://github.com/MiguVT/Meteoric_KernelSU_SUSFS) - KSU + SUSFS 預修補。 | 
  [Wild 內核](https://github.com/WildKernels/GKI_KernelSU_SUSFS) - KSUN + SUSFS 預修補。支持 5.10-android12。 
- 出廠自帶 Android 13+ 供應商的 Nothing 型號（即 Phone (2) 之後發布的型號）將支持 KSUN 修補方法。

:::

- 修補方法與 Magisk 類似。在 KSU/KSUN 管理器中點擊「未安裝」> 修補 `init_boot.img` 並將修補後的鏡像傳輸到電腦。

- 重啟至啟動加載程序：
  ```sh
  adb reboot bootloader
  ```

- 刷入修補後的鏡像
  ```bash
  fastboot flash init_boot <拖放修補後的鏡像文件>
  ```

- 重啟至系統：
  ```bash
  fastboot reboot
  ``` 

- 設備應已通過 KSU/KSUN 獲取 root 權限。


<hr />

### Play Integrity

| 指南 | 鏈接 |
|-------|------|
| 修復 Play Integrity 和 Root 檢測 | [Wiki](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) |


<hr />

### 備份核心分區

:::info

- 在解鎖啟動加載程序後，在刷入自定義 ROM 或內核 **之前**，備份核心分區（如 `persist`, `modemst1`, `modemst2`, `fsg` 等）至關重要。
- 這些分區包含重要數據，包括 IMEI、網絡設置和指紋傳感器校準。
- 如果丟失或損壞，你的設備可能會 **失去移動網絡連接、指紋識別問題，甚至損壞 (brick)**。
- 創建備份可確保你在出現問題時可以 **恢復設備**。

:::

A. **要求**
- **已解鎖啟動加載程序**
- **Root 權限**（通過 Magisk/KSU/Apatch）
- **Termux 應用**（通過 F-Droid 或 Play 商店安裝）
- **檢查分區路徑：**
  - **高通 (Qcom) 設備：** `/dev/block/bootdevice/by-name/`
  - **聯發科 (MTK) 設備：** `/dev/block/by-name/`

B. **備份說明**
- **對於高通 (Qualcomm/QCom) 設備：**
  - 打開 **Termux** 並使用以下命令授予 root 權限：
    ```sh
    su
    ```

  - 一次性複製並粘貼以下命令：
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    這將在 **內部存儲** 的「partitions_backup」文件夾中創建 **除 `super` 和 `userdata` 以外的所有分區** 的鏡像文件。

  - **[可選]** 如果上述命令失敗，請嘗試此替代方案：
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **對於聯發科 (MediaTek/MTK) 設備：**
  - 打開 **Termux** 並使用以下命令授予 root 權限：
    ```sh
    su
    ```

  - 一次性複製並粘貼以下所有命令：
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

C. **存儲備份**
  - 將「partitions_backup」文件夾移動到你的 **電腦或安全存儲設備**。
  - **請勿分享這些備份！** 它們包含 IMEI 等唯一的設備數據。

D. **恢復分區**
 - **MTK 設備：**
    ```sh
    fastboot flash nvram nvram.img
    fastboot flash nvdata nvdata.img
    fastboot flash nvcfg nvcfg.img
    fastboot flash persist persist.img
    ```
    重啟至 **recovery 模式** → 執行 **出廠重置 (factory reset)** → 重啟至 **系統**。
    - 參考鏈接：[Nothing Phone (2a) DVT 工程樣機：恢復基帶和 IMEI 記錄](https://bluehomewu.github.io/posts/Restoring-Baseband-and-IMEI-on-Nothing-Phone-2a-DVT/)
    - 該帖子以繁體中文撰寫，可以使用瀏覽器翻譯功能翻譯。

 - **QCom 設備：**
    ```sh
    fastboot flash persist persist.img
    fastboot flash modemst1 modemst1.img
    fastboot flash modemst2 modemst2.img
    ```
    **在這種情況下，出廠重置並非必須。**


<hr />

### 刷入原廠 ROM（修復救磚 / 降級）

:::note

- 這是手動全新刷入較新版本原廠固件或降級的唯一推薦方法。
- 欲深入了解，請參考並排鏈接的視覺指南：[Droidwin](https://www.youtube.com/watch?v=YCYEjdC3oHM) | [The Nothing Lab](https://www.youtube.com/watch?v=l0P9gosl64s) | [QZX Tech](https://www.youtube.com/watch?v=66H2MVElyAY)

:::

A. **準備刷機文件夾：**
  - 下載適用於你設備型號和固件版本的以下文件，並將它們放在一個專用文件夾中：
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x
    - `-hash.sha256` —— 這是可選的，但建議用於驗證文件完整性和檢測缺失部分。

  - 從 https://www.7-zip.org/ 安裝 7-Zip。

  - 可選（**推薦**）：你可以使用提取腳本而不是手動步驟：
    - [Windows](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.bat)
    - [Bash](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.sh)
    - 在下載文件所在的文件夾中運行腳本。

  - 提取文件：
    - Windows：右鍵點擊 → 「提取到 "*\"」
    - Bash 用戶：`7za -y x "*.7z*"`

  - 在極少數情況下，下載管理器可能會修改分段邏輯文件的擴展名。
  - 重命名：
    - `-image-logical.7z.001.7z` → `-image-logical.7z.001`
    - `-image-logical.7z.002.7z` → `-image-logical.7z.002`
  - 然後重試提取。

B. **進行刷機：**
  - 從 [這裡](https://developer.android.com/studio/run/win-usb) 安裝兼容的 USB 驅動程序。
  - 確保設備處於 **啟動加載程序模式** 時，**設備管理器** 中可見「Android Bootloader Interface」。
  - 如果之前使用了提取腳本，請直接執行它。否則：
    - 將所有提取的鏡像文件移動到一個文件夾中，連同 [Nothing Fastboot Flasher 腳本](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download)。
    - 將 `-hash.sha256` 文件放在同一目錄中。 
    - 務必下載最新腳本以確保包含熱修復程序。
  - 在聯網狀態下運行腳本（以獲取最新的 `platform-tools`）並按照提示操作：
    - 回答確認問卷。
    - 根據情況跳過或進行哈希檢查。 
    - 選擇是否清除數據：(Y/N) [全新刷機 / 降級 = `Y` | 覆蓋刷機 / 升級 = `N`]
    - 選擇是否刷入兩個插槽：(Y/N)
    - 禁用安卓驗證啟動 (Android Verified Boot)：(N) [請注意，如果你在此處選擇 `Y`，以後將無法解鎖啟動加載程序！]
  - 驗證所有分區是否已成功刷入。
    - 如果成功，選擇重啟至系統：(Y)
    - 如果出現錯誤，請在解決故障後重啟至啟動加載程序並重新刷入。在未解決問題的情況下重啟至系統可能會導致設備損壞 (brick)。


<hr />

### 重新鎖定啟動加載程序 (Bootloader)

A. **先決條件**
  - 移除 **屏幕鎖/PIN/密碼和已登錄的帳戶**（可選但建議）。
  - 按照 [刷機指南](#刷入原廠-rom修復救磚--降級) 全新刷入 **原廠 ROM**。**在未刷入原廠固件的情況下，使用修改過的分區重新鎖定啟動加載程序可能會損壞設備！**
  - 備備份所有數據（重新鎖定將 **擦除所有內容**）。
  - 如果尚未設置，請安裝 **ADB & Fastboot 工具** 和 USB 驅動程序。

B. **重新鎖定過程**
  - 如果你在系統中，重啟至啟動加載程序：
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
    - 設備將被格式化並以鎖定的啟動加載程序重啟。

C. **重新鎖定後**
  - 重新設置你的設備。
  - 啟動加載程序現已鎖定！


---

## 售後開發

:::note
此部分由社區管理，不隸屬於 Nothing。解鎖啟動加載程序將使你的 OEM 保修失效。
:::

隨時了解自定義 ROM、內核和開發項目的最新動態。

### 設備更新頻道 (Telegram)

**Nothing:**
| 設備 | 頻道 |
|--------|---------|
| Phone (1) | [更新](https://t.me/s/NothingPhone1Updates) |
| Phone (2) | [更新](https://t.me/s/NothingPhone2updates) |
| Phone (2a) 系列 | [更新](https://t.me/s/NothingPhone2aUpdates) |
| Phone (3a) 系列 | [更新](https://t.me/s/NothingPhone3aUpdates) |
| Phone (3) | [更新](https://t.me/s/Phone3Updates) |
| Phone (4a) 系列| [更新](https://t.me/s/Phone4aUpdates) |

**CMF by Nothing:**
| 設備 | 頻道 |
|--------|---------|
| Phone (1) | [更新](https://t.me/s/CMFPhone1Updates) |
| Phone (2) Pro / Phone (3a) Lite | [更新](https://t.me/s/CMFPhone2GlobalUpdates) |

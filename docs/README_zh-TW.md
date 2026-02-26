<div align="center">
  <img src="../assets/branding/logo.png" width="128" alt="Nothing Archive Logo">
  <h1>Nothing Archive</h1>
  <p>您的 Nothing OS 韌體、原廠 OTA 映像檔以及 Nothing 與 CMF by Nothing 裝置綜合指南的最終來源。</p>
  <br>

<div align="center">

[![Downloads](https://img.shields.io/badge/版本索引-B23131?style=for-the-badge&logo=github&logoColor=white)](#downloads)

[![Guides](https://img.shields.io/badge/使用指南-18673F?style=for-the-badge&logo=readthedocs&logoColor=white)](#guides)
[![OTA Changelogs](https://img.shields.io/badge/OTA_更新日誌-008080?style=for-the-badge&logo=github&logoColor=white)](#changelogs)

[![Discussion](https://img.shields.io/badge/討論群組-0088cc?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/s/Nothing_Archive)
[![Nothing Flasher](https://img.shields.io/badge/Nothing_Flasher-67119E?style=for-the-badge&logo=github&logoColor=white)](https://github.com/spike0en/nothing_flasher)
[![Awesome Nothing Index](https://img.shields.io/badge/Nothing_索引-B06676?style=for-the-badge&logo=github&logoColor=white)](https://github.com/spike0en/awesome_nothing)

[![Hits](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive&label=瀏覽量&icon=github&color=%23b02a37&labelColor=2E2E3F&message=&style=for-the-badge)](https://github.com/spike0en/nothing_archive)
[![Stars](https://img.shields.io/github/stars/spike0en/nothing_archive?style=for-the-badge&logo=github&logoColor=white)](https://github.com/spike0en/nothing_archive/stargazers)
[![Total Downloads](https://img.shields.io/github/downloads/spike0en/nothing_archive/total?style=for-the-badge&logo=github&logoColor=white)](https://github.com/spike0en/nothing_archive/releases)

</div>

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

<div align="center">
  <br>
  🌍 <strong>可用語言</strong><br />
  <br>
  
  [English](README.md) • [Deutsch](README_de-DE.md) • [Español](README_es-ES.md) •
  [Français](README_fr-FR.md) • [हिन्दी](README_hi-IN.md) • [Italiano](README_it-IT.md) •
  [日本語](README_ja-JP.md) • [Русский](README_ru-RU.md) • [Türkçe](README_tr-TR.md) •
  [簡體中文](README_zh-CN.md) • [繁體中文](README_zh-TW.md)
  </div>

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

</div>

## 支援本專案

如果這個專案對您有幫助，請考慮為本倉庫點亮 [Star <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png" alt="Star" width="20" height="20" />](https://github.com/spike0en/nothing_archive/stargazers)。這有助於提高專案的曝光率並鼓勵維護。謝謝！

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
    <img alt="Star 歷史圖表" src="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" width="500" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);" />
  </picture>
</div>

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

## 概覽

Nothing Archive 是目前最新最完整的 Nothing OS 韌體資料庫，提供官方 OTA 更新、完整韌體包以及適用於 Nothing 和 CMF by Nothing 手機的原廠 OTA 映像檔。所有檔案均直接源自官方 OEM 伺服器並已進行[存檔](https://archive.org/details/nothing-archive)，以利長期儲存與存取。

### 特色與優勢

- **直接 OTA 索引**：追蹤來自官方伺服器的 Nothing OS OTA 更新連結，提供增量更新與全量更新的存取。
- **手動安裝**：在分階段推播期間或更新失敗時，使用內建的離線更新器或透過 ADB sideload 手動安裝韌體。
- **原廠 OTA 映像檔**：在缺乏完整包的情況下，提供未經修改的映像檔供升級、降級和分割區刷寫使用。
- **Root 與還原支援**：提供用於 Magisk、KernelSU 和 Apatch 的原廠 boot 映像檔，並允許透過刷回原始 boot 映像檔來取消 Root。
- **裝置修復**：提供可透過 fastboot 刷寫的 Nothing OS 韌體，用於解決無限重啟（Boot loop）、救磚（Soft-brick）以及復原原廠系統。

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

## 免責宣告

使用本存檔庫即表示使用者承認並接受以下條款：

- **真實性**：所有韌體檔案均未經更改、未經修改，且直接源自 OEM 廠商。
- **刷機風險自負**：在解鎖 Bootloader 的裝置上安裝韌體具有固有風險。請仔細遵循說明，以避免裝置變磚。
- **相容性**：安裝前請確保韌體與您的 Nothing 或 CMF 裝置型號相符。
- **無保固**：這是一個社群驅動的專案，與 [Nothing](https://nothing.tech) 官方無關。作者和貢獻者不對因誤用或修改韌體導致的裝置損壞負責。
- **完整性**：僅在提供適當標註的情況下允許重新分發。嚴禁轉售這些免費提供的韌體。

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

## 注意事項

- OTA 映像檔的版本標記格式為 `<POST_OTA_VERSION>`，如[發布頁面](https://github.com/spike0en/nothing_archive/releases)所示。
- 特定區域的版本會標記為 `<POST_OTA_VERSION>-<GLO/EEA>`，適用於較舊的 Spacewar 建構版本。GLO = 全球版；EEA = 歐洲經濟區。
- Nothing OS 公開測試版標記為 `OBT`。
- Android 開發者預覽版標記為 `0.0.0-dev` + `<裝置代號>.<增量日期>`。
- 除非另有說明，否則發布版本與裝置的所有區域和顏色變體相容。

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

## 檔案分類

未經修改的原廠 OTA 映像檔以 `.7z` 格式封存，並分為三組：Boot（啟動）、Firmware（韌體）和 Logical（邏輯）。

<details>
  <summary>Nothing 裝置</summary>

| 裝置 | Boot (`-image-boot.7z`) | Firmware (`-image-firmware.7z`) | Logical (`-image-logical.7z.001-00x`) |
| :--- | :--- | :--- | :--- |
| **Phone (3)** | `boot`, `dtbo`, `init_boot`, `recovery`, `vbmeta`, `vbmeta_system`, `vbmeta_vendor`, `vendor_boot` (共 8 個) | `abl`, `aop`, `aop_config`, `bluetooth`, `cpucp`, `cpucp_dtb`, `devcfg`, `dsp`, `featenabler`, `hyp`, `imagefv`, `keymaster`, `modem`, `multiimgoem`, `multiimgqti`, `pvmfw`, `qupfw`, `shrm`, `soccp_dcd`, `soccp_debug`, `tz`, `uefi`, `uefisecapp`, `xbl`, `xbl_config`, `xbl_ramdump` (共 26 個) | `odm`, `product`, `system`, `system_dlkm`, `system_ext`, `vendor`, `vendor_dlkm` (共 7 個) |
| **Phone (3a) / Pro** | `boot`, `init_boot`, `dtbo`, `recovery`, `vbmeta`, `vbmeta_system`, `vbmeta_vendor`, `vendor_boot` (共 8 個) | `abl`, `aop`, `aop_config`, `bluetooth`, `cpucp`, `cpucp_dtb`, `devcfg`, `dsp`, `featenabler`, `hyp`, `imagefv`, `keymaster`, `modem`, `multiimgoem`, `pvmfw`, `qupfw`, `shrm`, `tz`, `uefi`, `uefisecapp`, `xbl`, `xbl_config`, `xbl_ramdump` (共 23 個) | `system`, `system_dlkm`, `system_ext`, `product`, `vendor`, `vendor_dlkm`, `odm` (共 7 個) |
| **Phone (3a) Lite** | `boot`, `dtbo`, `init_boot`, `vendor_boot`, `vbmeta`, `vbmeta_system`, `vbmeta_vendor` (共 7 個) | `apusys`, `ccu`, `connsys_bt`, `connsys_gnss`, `connsys_wifi`, `dpm`, `gpueb`, `gz`, `lk`, `logo`, `mcf_ota`, `modem`, `mcupm`, `pi_img`, `preloader_raw`, `scp`, `spmfw`, `sspm`, `tee`, `vcp` (共 20 個) | `odm`, `vendor`, `system_ext`, `system`, `vendor_dlkm`, `odm_dlkm`, `system_dlkm`, `product` (共 8 個) |
| **Phone (2a) / Plus** | `boot`, `dtbo`, `init_boot`, `vendor_boot`, `vbmeta` (共 5 個) | `apusys`, `audio_dsp`, `ccu`, `connsys_bt`, `connsys_gnss`, `connsys_wifi`, `dpm`, `gpueb`, `gz`, `lk`, `logo`, `mcf_ota`, `mcupm`, `md1img`, `mvpu_algo`, `pi_img`, `preloader_raw`, `scp`, `spmfw`, `sspm`, `tee`, `vcp` (共 22 個) | `odm`, `vendor`, `system_ext`, `system`, `vendor_dlkm`, `odm_dlkm`, `system_dlkm`, `product`, `vbmeta_system`, `vbmeta_vendor` (共 10 個) |
| **Phone (2)** | `boot`, `dtbo`, `vendor_boot`, `recovery`, `vbmeta`, `vbmeta_system`, `vbmeta_vendor` (共 7 個) | `abl`, `aop`, `aop_config`, `bluetooth`, `cpucp`, `devcfg`, `dsp`, `featenabler`, `hyp`, `imagefv`, `keymaster`, `modem`, `multiimgoem`, `multiimgqti`, `qupfw`, `qweslicstore`, `shrm`, `tz`, `uefi`, `uefisecapp`, `xbl`, `xbl_config`, `xbl_ramdump` (共 23 個) | `system`, `system_ext`, `product`, `vendor`, `vendor_dlkm`, `odm` (共 6 個) |
| **Phone (1)** | `boot`, `dtbo`, `vendor_boot`, `vbmeta` (共 4 個) | `abl`, `aop`, `bluetooth`, `cpucp`, `devcfg`, `dsp`, `featenabler`, `hyp`, `imagefv`, `keymaster`, `modem`, `multiimgoem`, `qupfw`, `shrm`, `tz`, `uefisecapp`, `xbl`, `xbl_config` (共 18 個) | `system`, `system_ext`, `product`, `vendor`, `odm`, `vbmeta_system`, `vbmeta_vendor` (共 7 個) |

</details>

<details>
  <summary>CMF by Nothing 裝置</summary>

| 裝置 | Boot (`-image-boot.7z`) | Firmware (`-image-firmware.7z`) | Logical (`-image-logical.7z.001-00x`) |
| :--- | :--- | :--- | :--- |
| **Phone (1)** | `boot`, `dtbo`, `init_boot`, `vendor_boot`, `vbmeta` (共 5 個) | `apusys`, `ccu`, `connsys_bt`, `connsys_gnss`, `connsys_wifi`, `dpm`, `gpueb`, `gz`, `lk`, `logo`, `mcf_ota`, `modem`, `mcupm`, `pi_img`, `preloader_raw`, `scp`, `spmfw`, `sspm`, `tee`, `vcp` (共 20 個) | `odm`, `vendor`, `system_ext`, `system`, `vendor_dlkm`, `odm_dlkm`, `system_dlkm`, `product`, `vbmeta_system`, `vbmeta_vendor` (共 10 個) |
| **Phone (2) Pro** | `boot`, `dtbo`, `init_boot`, `vendor_boot`, `vbmeta` (共 5 個) | `apusys`, `ccu`, `connsys_bt`, `connsys_gnss`, `connsys_wifi`, `dpm`, `gpueb`, `gz`, `lk`, `logo`, `mcf_ota`, `modem`, `mcupm`, `pi_img`, `preloader_raw`, `scp`, `spmfw`, `sspm`, `tee`, `vcp` (共 20 個) | `odm`, `vendor`, `system_ext`, `system`, `vendor_dlkm`, `odm_dlkm`, `system_dlkm`, `product`, `vbmeta_system`, `vbmeta_vendor` (共 10 個) |

</details>

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

## 下載

選擇您的裝置型號以存取其版本索引。

### Nothing Phones

<details>
  <summary>Phone (1) - Spacewar</summary>

<br>

> **備註**: 1.5.1 OBT-2 之前的版本為特定區域版本。GLO = 全球版（包括印度）；EEA = 歐洲經濟區。

<br>

| **Nothing OS 版本** | **建構編號**     | **增量 / Delta OTA**                        | **全量 OTA**                           | **OTA 映像檔**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 3.2 | Spacewar-V3.2-260206-1016 | Spacewar_V3.2-251231-0041 -> [Spacewar_V3.2-260206-1016](https://android.googleapis.com/packages/ota-api/package/ce258ffe51e9e208b6ab65b2d0ce9fff4f5a5c8c.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.2-260206-1016) |
| 3.2 | Spacewar-V3.2-251231-0041 | Spacewar_V3.2-251219-1652 -> [Spacewar_V3.2-251231-0041](https://android.googleapis.com/packages/ota-api/package/6fc6fe1b1d60691f574ca167a0f7565625aff090.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.2-251231-0041) |
| 3.2 | Spacewar-V3.2-251219-1652 | Spacewar_V3.2-250926-1631 -> [Spacewar_V3.2-251219-1652](https://android.googleapis.com/packages/ota-api/package/d6cb9faafb8c2bc5ae13f50ca1cde7fc5561eda3.zip) <br> Spacewar_V3.2-250804-2110 -> [Spacewar_V3.2-251219-1652](https://android.googleapis.com/packages/ota-api/package/9b2a2699b03c24f470c067ce936417a03c455e73.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.2-251219-1652) |
| 3.2 | Spacewar-V3.2-250926-1631 | Spacewar_V3.2-250804-2110 -> [Spacewar_V3.2-250926-1631](https://android.googleapis.com/packages/ota-api/package/3a005afe9d0251edbda65e3a682923eb41a9334b.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_V3.2-250926-1631.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.2-250926-1631) |
| 3.2 | Spacewar-V3.2-250804-2110 | Spacewar_V3.2-250701-1737 -> [Spacewar_V3.2-250804-2110](https://android.googleapis.com/packages/ota-api/package/2b2b895c2eabba86dd8d48faf874cbf230ba2651.zip) <br> Spacewar_V3.2-250610-1104 -> [Spacewar_V3.2-250804-2110](https://android.googleapis.com/packages/ota-api/package/09ff0da78cbf698fb697d3f573cab5997e6cb69a.zip) <br> Spacewar_V3.0-250409-2129 -> [Spacewar_V3.2-250804-2110](https://android.googleapis.com/packages/ota-api/package/d770e856077f531a79fcf97204f646527b713299.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_V3.2-250804-2110.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.2-250804-2110) |
| 3.2 | Spacewar-V3.2-250701-1737 | Spacewar_V3.2-250610-1104 -> [Spacewar_V3.2-250701-1737](https://android.googleapis.com/packages/ota-api/package/c79b7ecaa1ddfb197af08e463de5b5508b6aa5ec.zip) <br> Spacewar_V3.0-250409-2129 -> [Spacewar_V3.2-250701-1737](https://android.googleapis.com/packages/ota-api/package/f1a59559dac381c47728b80714f002f410200dcc.zip) <br> Spacewar_V3.0-250303-1817 -> [Spacewar_V3.2-250701-1737](https://android.googleapis.com/packages/ota-api/package/4484a5f47b8baba520d243132b355fd75ae7f224.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.2-250701-1737) |
| 3.2 | Spacewar-V3.2-250610-1104 | Spacewar_V3.0-250409-2129 -> [Spacewar_V3.2-250610-1104](https://android.googleapis.com/packages/ota-api/package/f65af9ef8ae723584cc27626ec040c1b12b4436a.zip) <br> Spacewar_V3.0-250303-1817 -> [Spacewar_V3.2-250610-1104](https://android.googleapis.com/packages/ota-api/package/b764b5ddfac5b046b9cb631fed85fc3040c56473.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_V3.2-250610-1104_3.2.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.2-250610-1104) |
| 3.0 | Spacewar-V3.0-250409-2129 | Spacewar_V3.0-250303-1817 -> [Spacewar_V3.0-250409-2129](https://android.googleapis.com/packages/ota-api/package/6313fdd718db499bc5f6b596fa9278275dd5db3a.zip) <br> Spacewar_V3.0-250218-1552 -> [Spacewar_V3.0-250409-2129](https://android.googleapis.com/packages/ota-api/package/f652a4b31c3fa223157e0b0caef93d2e9260c9b2.zip) <br> Spacewar_V3.0-250108-1938 -> [Spacewar_V3.0-250409-2129](https://android.googleapis.com/packages/ota-api/package/223e86f537f54e32d8d85eb9546c5d249d1af05f.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_V3.0-250409-2129_3.0.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.0-250409-2129) |
| 3.0 | Spacewar-V3.0-250303-1817 | Spacewar_V3.0-250218-1552 -> [Spacewar_V3.0-250303-1817](https://android.googleapis.com/packages/ota-api/package/6a97fd481d72295a21d0c0d42e2cb4ef802b5ee9.zip) <br> Spacewar_V3.0-250108-1938 -> [Spacewar-V3.0-250303-1817](https://android.googleapis.com/packages/ota-api/package/d1a2ee17c40de03a0bc3bbb139c8a284e23a7a7b.zip) <br> Spacewar_U2.6-241031-1818 -> [Spacewar-V3.0-250303-1817](https://android.googleapis.com/packages/ota-api/package/059bfd265ba8f85b06329834304de8e516b0d33c.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_V3.0-250303-1817_3.0.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.0-250303-1817) |
| 3.0 | Spacewar-V3.0-250218-1552 | Spacewar_V3.0-250108-1938 -> [Spacewar_V3.0-250218-1552](https://android.googleapis.com/packages/ota-api/package/556f03d356f4a672c04658a7d351305904a515b3.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.0-250218-1552) |
| 3.0 | Spacewar-V3.0-250108-1938 | Spacewar_V3.0-241211-0926 -> [Spacewar_V3.0-250108-1938](https://android.googleapis.com/packages/ota-api/package/5120cc00410342a673f19758eff45337443d934c.zip) <br> Spacewar_U2.6-241031-1818 -> [Spacewar_V3.0-250108-1938](https://android.googleapis.com/packages/ota-api/package/6090fa491107f5cd6c02527eec962da40ea2fe35.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_V3.0-250108-1938_3.0.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.0-250108-1938) |
| 3.0 OBT-1 | Spacewar-V3.0-241211-0926 | Spacewar_U2.6-241031-1818 -> [Spacewar_V3.0-241211-0926](https://android.googleapis.com/packages/ota-api/package/3c291e4fb02cd41d58cececb5ee4855d719eb6b7.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_V3.0-241211-0926) |
| 2.6 | Spacewar-U2.6-241031-1818 | Spacewar_U2.6-240904-1634 -> [Spacewar_U2.6-241031-1818](https://android.googleapis.com/packages/ota-api/package/c479de02126d8b5d2044600cc2107a36000aa7a4.zip) | [此處](https://android.googleapis.com/packages/ota-api/package/ea1bbddf05a019dfe73499cbbac43a0c12b585bc.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.6-241031-1818) |
| 2.6 | Spacewar-U2.6-240904-1634 | Spacewar_U2.6-240705-1617 -> [Spacewar_U2.6-240904-1634](https://android.googleapis.com/packages/ota-api/package/159a36df32499e2153475db11ef1f6b8775770f2.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.6-240904-1634) |
| 2.6 | Spacewar-U2.6-240705-1617 | Spacewar_U2.5-240612-2149 -> [Spacewar_U2.6-240705-1617](https://android.googleapis.com/packages/ota-api/package/879c1c1c8fc99eb43a6378d716ae8704a78924b3.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_U2.6-240705-1617_2.6.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.6-240705-1617) |
| 2.5.6 | Spacewar-U2.5-240612-2149 | Spacewar_U2.5-240419-1617 -> [Spacewar_U2.5-240612-2149](https://android.googleapis.com/packages/ota-api/package/54c1298c0fbeae5b9f2454762183beb074d883b5.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_U2.5-240612-2149_2.5.6.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.5-240612-2149) |
| 2.5.3A | Spacewar-U2.5-240317-2245 | Spacewar_U2.5-240301-1852 -> [Spacewar_U2.5-240317-2245](https://android.googleapis.com/packages/ota-api/package/176fffc72ad05488556821215d3e10ffc939ff35.zip) <br> Spacewar_U2.5-240207-1031 -> [Spacewar_U2.5-240317-2245](https://android.googleapis.com/packages/ota-api/package/158f65d4c44323ac9ea4c0c64e97b0a37d9aac74.zip) | [此處](https://android.googleapis.com/packages/ota-api/package/af8523121e2e73f564bb78ceb3074deec7222c6b.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.5-240317-2245) |
| 2.5.3 | Spacewar-U2.5-240301-1852 | Spacewar_U2.5-240207-1031 -> [Spacewar_U2.5-240301-1852](https://android.googleapis.com/packages/ota-api/package/993ef2c61a5d996015d7ff07f955cc8dbb6344c4.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.5-240301-1852) |
| 2.5.2.HOTFIX | Spacewar-U2.5-240207-1031 | Spacewar_U2.5-240119-1910 -> [Spacewar-U2.5-240207-1031](https://android.googleapis.com/packages/ota-api/package/af7de84da8337982201cbd7da8cee51ddc9d0241.zip) <br> Spacewar_T2.0-231110-1731 -> [Spacewar_U2.5-240207-1031](https://android.googleapis.com/packages/ota-api/package/11d4669cdf0b425d4f8e237f71edc849062365da.zip) | [此處](https://android.googleapis.com/packages/ota-api/package/80dec3051c16eb22f456e8682917f0849b749ba8.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.5-240207-1031) |
| 2.5.2 | Spacewar-U2.5-240119-1910 | Spacewar_T2.0-231110-1731 -> [Spacewar_U2.5-240119-1910](https://android.googleapis.com/packages/ota-api/package/af7de84da8337982201cbd7da8cee51ddc9d0241.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_U2.5-240119-1910) |
| 2.0.5 | Spacewar-T2.0-231110-1731 | Spacewar_T2.0-231006-1014 -> [Spacewar_T2.0-231110-1731](https://android.googleapis.com/packages/ota-api/package/d7a07c6103f9aa3cfc93a83d8d15d547f6281b67.zip) | [此處](https://android.googleapis.com/packages/ota-api/package/d8c21c8c162c9677ba78e51305abaf5b0ccd30e2.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T2.0-231110-1731) |
| 2.0.4 | Spacewar-T2.0-231006-1014 | Spacewar_T2.0-230901-1652 -> [Spacewar_T2.0-231006-1014](https://android.googleapis.com/packages/ota-api/package/d7a07c6103f9aa3cfc93a83d8d15d547f6281b67.zip) | [此處](https://android.googleapis.com/packages/ota-api/package/d8c21c8c162c9677ba78e51305abaf5b0ccd30e2.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T2.0-231006-1014) |
| 2.0.2.HOTFIX | Spacewar-T2.0-230901-1652 | Spacewar_T2.0-230822-1751 -> [Spacewar_T2.0-230901-1652](https://android.googleapis.com/packages/ota-api/package/1adc1351b0bd9a7a75efe40b3aa8baa7c6eb054f.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_U2.5-240207-1031_2.5.2-Hotfix.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T2.0-230901-1652) |
| 2.0.2 | Spacewar-T2.0-230822-1751 | Spacewar_T1.5-230706-1942 -> [Spacewar_T2.0-230822-1751](https://android.googleapis.com/packages/ota-api/package/117f22e84abcb24eea583125ef69ab938643f914.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T2.0-230822-1751) |
| 1.5.6​ | Spacewar-T1.5-230706-1942 | Spacewar_T1.5-230619-0042 -> [Spacewar_T1.5-230706-1942](https://android.googleapis.com/packages/ota-api/package/9b59f7c44dee9c7712b163af950a554d63950ff3.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230706-1942) |
| 1.5.5 | Spacewar-T1.5-230619-0042 | Spacewar_T1.5-230428-2017 -> [Spacewar_T1.5-230619-0042](https://android.googleapis.com/packages/ota-api/package/b0d72e21232dfd4392c6eaaeb651dcfd163007f3.zip) | [此處](https://android.googleapis.com/packages/ota-api/package/1d156af4eb59f85c62c7921e6c4a97c2761bcc3b.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230619-0042) |
| 1.5.4 | Spacewar-T1.5-230428-2017 | Spacewar_T1.5-230317-2039 -> [Spacewar_T1.5-230428-2017](https://android.googleapis.com/packages/ota-api/package/da75a517b2ab113621a45c01fad5f8867caea71c.zip) <br> Spacewar_T1.5-230213-2131 -> [Spacewar_T1.5-230428-2017](https://android.googleapis.com/packages/ota-api/package/945010bc8ae5f6e2171c54bb2fee51a99ca16223.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230428-2017) |
| 1.5.3.HOTFIX | Spacewar-T1.5-230317-2039 | Spacewar_T1.5-230310-1650 -> [Spacewar_T1.5-230317-2039](https://android.googleapis.com/packages/ota-api/package/364c55148c84d22efab1c58953d807e40da040a9.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_T1.5-230317-2039_1.5.3-Hotfix.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230317-2039) |
| 1.5.3 | Spacewar-T1.5-230310-1650 | Spacewar_T1.5-230213-2131 -> [Spacewar_T1.5-230310-1650](https://android.googleapis.com/packages/ota-api/package/68158669e0fc6d6eee95e2612c2e84ed840faeec.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230310-1650) |
| 1.5.2​ | Spacewar-T1.5-230213-2131 | Spacewar_T1.5-230114-2357-GLO -> [Spacewar_T1.5-230213-2131](https://android.googleapis.com/packages/ota-api/package/e77cd22198a67cbed75b059470797a5dd66a3d5e.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-230213-2131) |
| 1.5.1 OBT-2 HOTFIX | Spacewar-T1.5-230114-2357 | Spacewar_T1.5-230111-0014 -> [Spacewar_T1.5-230114-2357](https://android.googleapis.com/packages/ota-api/package/0266138566534b1728271c1412fa152409bcc751.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/edit/Spacewar_T1.5-230114-2357) |
| 1.5.1 OBT-2 | Spacewar-T1.5-230111-0014 | Spacewar_T1.5-221215-1313-GLO -> [Spacewar_T1.5-230111-0014](https://android.googleapis.com/packages/ota-api/package/e27879949aee0ad565b8e4790ec58a42a3b30303.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/edit/Spacewar_T1.5-230111-0014) |
| 1.5.0 OBT-1 | Spacewar-T1.5-221215-1313 | Spacewar_S1.1-221121-2306-GLO -> [Spacewar_T1.5-221215-1313-GLO](https://android.googleapis.com/packages/ota-api/package/f23d049819ca42c0c455d1c36716cfa3bb386448.zip) <br> Spacewar_S1.1-221129-1525-EEA -> [Spacewar-T1.5-221215-1313-EEA](https://android.googleapis.com/packages/ota-api/package/66a78cc6105fb8182a3a07383756862655700192.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-221215-1313-GLO) <br> [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_T1.5-221215-1313-EEA) |
| 1.1.8 | Spacewar-S1.1-230112-1613 | Spacewar_S1.1_221129-1525-GLO -> [Spacewar_S1.1-230112-1613](https://android.googleapis.com/packages/ota-api/package/deeb8830c86e0f9b89ae3170ada164b64de02c2c.zip) <br> Spacewar_S1.1-221129-1525-EEA -> [Spacewar_S1.1-230112-1613](https://android.googleapis.com/packages/ota-api/package/c4313bd73c334c10db148217d3b9edffc2725077.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-230112-1613-GLO) <br> [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-230112-1613-EEA) |
| 1.1.7.HOTFIX | Spacewar-S1.1-221129-1525 | Spacewar_S1.1-221121-2306 -> [Spacewar_S1.1-221129-1525-EEA](https://android.googleapis.com/packages/ota-api/package/5a8a872c8fa2071424af6272bd78806f55d4aeda.zip) | N/A | [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-221129-1525-EEA) |
| 1.1.7 | Spacewar-S1.1-221121-2306 | Spacewar_S1.1-221121-2306-GLO -> [Spacewar_S1.1-221121-2306-GLO](https://android.googleapis.com/packages/ota-api/package/6d5f9ec32b7c80e07859cdf74daaefd612ac652f.zip) <br> Spacewar_S1.1-221121-2306-EEA -> [Spacewar_S1.1-221121-2306-EEA](https://android.googleapis.com/packages/ota-api/package/9c41fd92080af076c6e3abddbaefc7eac75c3edc.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/254815bb72cdbddd5c9dd7cde6d10c95becc6542.zip) <br> [EEA](https://android.googleapis.com/packages/ota-api/package/0e6855d19dbcdf328449e4d06386a6257bb1aadd.zip) | [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-221121-2306-EEA) |
| 1.1.6 | Spacewar-S1.1-221022-1221 | Spacewar_S1.1-221008-1815-GLO -> [Spacewar_S1.1-221022-1221-GLO](https://android.googleapis.com/packages/ota-api/package/f63f3cc420a5a4af639dec4d25adcb865a9a235d.zip) <br> Spacewar_S1.1-220921-2238-EEA -> [Spacewar_S1.1-221022-1221-EEA](https://android.googleapis.com/packages/ota-api/package/10fefd93aaed7b4d478ebfcea69d789121ee859b.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/99a4c814632616b365017129fa9f7e9e0080fb59.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-221022-1221-EEA) |
| 1.1.5 | Spacewar-S1.1-221008-1815 | Spacewar_S1.1-220921-2238-GLO -> [Spacewar_S1.1-221008-1815-GLO](https://android.googleapis.com/packages/ota-api/package/97d10eb70f173b7ce5a223a8d1f6d6fd42cfed5c.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-221008-1815-GLO) |
| 1.1.4.HOTFIX | Spacewar-S1.1-220921-2238 | Spacewar_S1.1-220913-2137-GLO -> [Spacewar_S1.1-220921-2238-GLO](https://android.googleapis.com/packages/ota-api/package/6cf1147321de57c159e26a0531760042d23c20ad.zip) <br> Spacewar_S1.1-220913-2137-EEA -> [Spacewar_S1.1-220921-2238-EEA](https://android.googleapis.com/packages/ota-api/package/288523074fe4af0c0680beee17b2df5a5dd84f7c.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/54b8dbd1c303be00ef156c602b756c76d8d9b6e1.zip) <br> [EEA](https://android.googleapis.com/packages/ota-api/package/4c0e18215e374ff95f733dedbd2ebc3f1824e1c8.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220921-2238-GLO) <br> [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220921-2238-EEA) |
| 1.1.4 | Spacewar-S1.1-220913-2137 | Spacewar_S1.1-220813-1608-GLO -> [Spacewar_S1.1-220913-2137-GLO](https://android.googleapis.com/packages/ota-api/package/82ab3ed9150c788615767667c35568032bd81e66.zip) <br> Spacewar-S1.1-220813-1608-EEA -> [Spacewar_S1.1-220913-2137-EEA](https://android.googleapis.com/packages/ota-api/package/8841b46d4ec2df9c4c110a6af2e85a34460bba01.zip) | N/A | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220913-2137-GLO) <br> [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar-S1.1-220913-2137-EEA) |
| 1.1.3 | Spacewar-S1.1-220813-1608 | Spacewar_S1.1-220728-0051-GLO -> [Spacewar_S1.1-220813-1608-GLO](https://android.googleapis.com/packages/ota-api/package/d2e43b858fd93f46d136a424f3756ae2d5decbc3.zip) <br> Spacewar_S1.1-220728-0051-EEA -> [Spacewar_S1.1-220813-1608-EEA](https://android.googleapis.com/packages/ota-api/package/9441a6b477bf0a5ac205fa93ae37a341181b1341.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/ee4a8d890091f980aa40142d68f46abb1f08e0c5.zip) <br> [EEA](https://android.googleapis.com/packages/ota-api/package/a6f363b6709ec67910b4018526d9525ccb4075f9.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220813-1608-GLO) <br> [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220813-1608-EEA) |
| 1.1.2 | Spacewar-S1.1-220728-0051 | Spacewar_S1.1-220716-0150-GLO -> [Spacewar_S1.1-220728-0051-GLO](https://android.googleapis.com/packages/ota-api/package/a85e848885537f271ed8e13cbb9d929e8a76463b.zip) <br> Spacewar_S1.1-220716-0150-EEA -> [Spacewar_S1.1-220728-0051-EEA](https://android.googleapis.com/packages/ota-api/package/449a23b112bfd5dcfe59a231500e732663cc3f3d.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/a244285dfb5aef198999463c2d55f353ed0e7b1b.zip) <br> [EEA](https://android.googleapis.com/packages/ota-api/package/0f77244380edcc46a4d60397f5c22ea911352bfe.zip) |  [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220728-0051-GLO) <br> [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220728-0051-EEA) |
| 1.1.0 | Spacewar-S1.1-220716-0150 | Spacewar_S1.0-220705-2027-GLO -> [Spacewar_S1.1-220716-0150-GLO](https://android.googleapis.com/packages/ota-api/package/88765a64183594df6f06d23b57ef75107d38c9e2.zip) <br> Spacewar_S1.0-220705-2027-EEA -> [Spacewar_S1.1-220716-0150-EEA](https://android.googleapis.com/packages/ota-api/package/3b2975594ff4e5935d54a4f0b3125306af933d6c.zip) | [GLO](https://android.googleapis.com/packages/ota-api/package/e4c58031ffcd430294bd99cfb7df45a2645bef21.zip) <br> [EEA](https://android.googleapis.com/packages/ota-api/package/c9d6795361da9d8364c7a7fefd26ccebbc529fdf.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220716-0150-GLO) <br> [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.1-220716-0150-EEA) |
| 1.0.2 | Spacewar-S1.0-220705-2027 | N/A | [GLO](https://android.googleapis.com/packages/ota-api/package/fad5d83167989dd71ef9adbb4243a8baa02956e6.zip) <br> [EEA](https://android.googleapis.com/packages/ota-api/package/09a261dea24fa76050bf9b03fff232dbab9b3a28.zip) | [GLO](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.0-220705-2027-GLO) <br> [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.0-220705-2027-EEA) |
| 1.0.1 | Spacewar-S1.0-22 | N/A | [EEA](https://archive.org/download/nothing-archive/spike0en/fullota/spacewar/Spacewar_S1.0-22_1.0.1-EEA.zip) | [EEA](https://github.com/spike0en/nothing_archive/releases/tag/Spacewar_S1.0-22-EEA) |

<br>

</details>

<details>
  <summary>Phone (2) - Pong</summary>

<br>

| **Nothing OS 版本** | **建構編號**     | **增量 / Delta OTA**                        | **全量 OTA**                           | **OTA 映像檔**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 4.0 | Pong-B4.0-251226-1110 | Pong_B4.0-251119-1654 -> [Pong_B4.0-251226-1110](https://android.googleapis.com/packages/ota-api/package/cc72bd378d5c87ddc5c4e5d6ecee074f5c6d5886.zip) <br> Pong_V3.2-250917-1451 -> [Pong_B4.0-251226-1110](https://android.googleapis.com/packages/ota-api/package/b24f00fb58ac92ab437ecd4006133303be5ac970.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_B4.0-251226-1110) |
| 4.0 | Pong-B4.0-251119-1654 | Pong_V3.2-250917-1451 -> [Pong_B4.0-251119-1654](https://android.googleapis.com/packages/ota-api/package/0b1a9c638a70e7454e46a6459d9f20e6cd5953b8.zip) <br> Pong_B4.0-250928-2003 -> [Pong_B4.0-251119-1654](https://android.googleapis.com/packages/ota-api/package/90245a90f85f0046dbfce45edb06c0f5f8d2b5b4.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_B4.0-251119-1654.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_B4.0-251119-1654) |
| 4.0 OBT-1 | Pong-B4.0-250928-2003 | Pong_V3.2-250917-1451 -> [Pong_B4.0-250928-2003](https://android.googleapis.com/packages/ota-api/package/5435cd3144ed3835c7c27a6e65eb2cd3dda1a03c.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_B4.0-250928-2003) |
| 3.2 | Pong-V3.2-250917-1451 | Pong_V3.2-250828-1921 -> [Pong_V3.2-250917-1451](https://android.googleapis.com/packages/ota-api/package/e57db3f2ff14fa60f69fcafa345e02153c1d8890.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.2-250917-1451.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.2-250917-1451) |
| 3.2 | Pong-V3.2-250828-1921 | Pong_V3.2-250708-2227 -> [Pong_V3.2-250828-1921](https://android.googleapis.com/packages/ota-api/package/b7d257746e624dbb4051707e935413987baa3ca7.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.2-250828-1921.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.2-250828-1921) |
| 3.2 | Pong-V3.2-250708-2227 | Pong_V3.0-250506-1805 -> [Pong_V3.2-250708-2227](https://android.googleapis.com/packages/ota-api/package/18bf3f8eb03e336eba7cc4c690bf5df6648a24ea.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.2-250708-2227.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.2-250708-2227) |
| 3.0 | Pong-V3.0-250506-1805 | Pong_V3.0-250304-1717 -> [Pong_V3.0-250506-1805](https://android.googleapis.com/packages/ota-api/package/8ebd2971dfa9244d5aba6e8d6d845da093c4e5cf.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong-V3.0-250506-1805_3.0.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-250506-1805) |
| 3.0 | Pong-V3.0-250304-1717 | Pong_V3.0-250113-1723 -> [Pong_V3.0-250304-1717](https://android.googleapis.com/packages/ota-api/package/ad7d429c8bb14709a5676e6bc8cf6965ce663945.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.0-250304-1717_3.0.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-250304-1717) |
| 3.0 | Pong-V3.0-250113-1723 | Pong_V3.0-241226-2001 -> [Pong_V3.0-250113-1723](https://android.googleapis.com/packages/ota-api/package/2d4ff3545f89bf68eca8f54f2dc6bb94da625ae3.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.0-250113-1723_3.0.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-250113-1723) |
| 3.0 | Pong-V3.0-241226-2001 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241226-2001](https://android.googleapis.com/packages/ota-api/package/dccd75a44c18bf956e56c82e2cd7f6861c10cad5.zip) <br> Pong_V3.0-241207-0124 -> [Pong_V3.0-241226-2001](https://android.googleapis.com/packages/ota-api/package/c256635e9442c1fe8de48a9c93cf199c779a7b27.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.0-241226-2001_3.0.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-241226-2001) |
| 3.0 | Pong-V3.0-241207-0124 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241207-0124](https://android.googleapis.com/packages/ota-api/package/75ded7f0b0553a9e590c9c85434a1dde5b23df9a.zip) <br> Pong_V3.0-241028-1925 -> [Pong_V3.0-241207-0124](https://android.googleapis.com/packages/ota-api/package/b5b75a650caf20c5b06d8a29a9d595783c6b3e72.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_V3.0-241207-0124_3.0.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-241207-0124) |
| 3.0 OBT-1 | Pong-V3.0-241028-1925 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241028-1925](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241016_170017_20241028_192505.zip?Expires=1990059626&Signature=MrORjWYMh5XXPMFhasr3rphaclJXtvXPnr9Gwj1BTFBL3K8k8J2fe~1eaw9E-ZMmu5FyaNFtchFj5NayGlJzBni0XxmWX6Y8NkXrVlWVmTqj6G1qgujUYJQiDSAgMIxh8k~Zoi5LI-tY9Lb5nDhCOuqX4zWVBETCjXiSnHPx5u8zEmOz7-jE7TUBwg5RWGDNUKRQBa2ax1vRBvkWEIrn0c9YXosm1ot1ArAAmT3KzLBHYOPQj1n6FjEvixU1Ul7mvaxsX5oZ0eMnyonH7aC9x4p01l3pNQyI4r8Ikx~LuSA5DxF0Fqtj9IXbkxNY0F7oBelkt4c8Z8SOpTJ5J3ufVA__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_V3.0-241028-1925) |
| 2.6 | Pong-U2.6-241016-1700 | Pong_U2.6-240828-1751 -> [Pong_U2.6-241016-1700](https://android.googleapis.com/packages/ota-api/package/b281c8062dcf2a584a524b433907cfeb514df51a.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_U2.6-241016-1700_2.6.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.6-241016-1700) |
| 2.6 | Pong-U2.6-240828-1751 | Pong_U2.6-240628-0430 -> [Pong_U2.6-240828-1751](https://android.googleapis.com/packages/ota-api/package/429c8fba7521ddf3ada2faebd57ba5cd0ca67408.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.6-240828-1751) |
| 2.6 | Pong-U2.6-240628-0430 | Pong_U2.5-240606-1801 -> [Pong_U2.6-240628-0430](https://android.googleapis.com/packages/ota-api/package/6fd26cf6ec1ab4520ab384caad5a6d79ded15ae8.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.6-240628-0430) |
| 2.5.6 | Pong-U2.5-240606-1801 | Pong_U2.5-240419-0138 -> [Pong_U2.5-240606-1801](https://android.googleapis.com/packages/ota-api/package/4d850df66992c4b79ce4d714a27216518ca541e4.zip) <br> Pong_U2.5-240418-1248 -> [Pong_U2.5-240606-1801](https://android.googleapis.com/packages/ota-api/package/5ea6aefb7bca17c9b477ec7ac17d6412c0f90f3b.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-240606-1801) |
| 2.5.5 | Pong-U2.5-240418-1248 | Pong_U2.5-240327-2140 -> [Pong_U2.5-240418-1248](https://android.googleapis.com/packages/ota-api/package/93383c8b9c42fc40f89df861159c6b52408bc6e6.zip) <br> Pong_U2.5-240410-1247 -> [Pong_U2.5-240418-1248](https://android.googleapis.com/packages/ota-api/package/04163fecbb7a8617636e9d1773c86ae9f1caf30b.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-240418-1248) |
| 2.5.5 | Pong-U2.5-240410-1247 | Pong_U2.5-240327-2140 -> [Pong_U2.5-240410-1247](https://android.googleapis.com/packages/ota-api/package/44a00fa0a6226aa51f54ee5e5418e0935275d542.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_U2.5-240410-1247_2.5.5.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-240410-1247) |
| 2.5.3 | Pong-U2.5-240327-2140 | Pong_U2.5-240116-1446 -> [Pong_U2.5-240327-2140](https://android.googleapis.com/packages/ota-api/package/20eda7e4eafbfe2900393c177a32c352607c2570.zip) | [此處](https://android.googleapis.com/packages/ota-api/package/dfe935ebb68be6b68d2570b10a96120d27ed05b5.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-240327-2140) |
| 2.5.2 | Pong-U2.5-240116-1446 | Pong_U2.5-231228-1342 -> [Pong_U2.5-240116-1446](https://android.googleapis.com/packages/ota-api/package/d77ffb26d8f29e851f6452dcdbc335749b2d60c8.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_U2.5-240116-1446_2.5.2.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-240116-1446) |
| 2.5.1A | Pong-U2.5-231228-1342 | Pong_U2.5-231208-2206 -> [Pong_U2.5-231228-1342](https://android.googleapis.com/packages/ota-api/package/88f8c09ad5275c83182cc441c1b6806619947832.zip) | [此處]((https://archive.org/download/nothing-archive/spike0en/fullota/pong/Pong_U2.5-231228-1342_2.5.1A.zip)) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-231228-1342) |
| 2.5.1 | Pong-U2.5-231208-2206 | Pong_T2.0-231024-2214 -> [Pong_U2.5-231208-2206](https://android.googleapis.com/packages/ota-api/package/f3f0db09cdde9dcd118da68821a445af7b0963cc.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-231208-2206) |
| 2.5 OBT-2 | Pong-U2.5-231102-1201 | Pong_U2.5-231007-2102 -> [Pong_U2.5-231102-1201](https://archive.org/download/nothing-archive/incremental_ota/pong/Pong_U2.5-231007-2102_Pong_U2.5-231102-1201.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-231102-1201) |
| 2.5 OBT-1 | Pong-U2.5-231007-2102 | N/A | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_U2.5-231007-2102) |
| 2.0.4 | Pong-T2.0-231024-2214 | Pong_T2.0-230906-1933 -> [Pong_T2.0-231024-2214](https://android.googleapis.com/packages/ota-api/package/e6d937f462c864b3ca25ada7f83a7905f82df6ed.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-231024-2214) |
| 2.0.3 | Pong-T2.0-230906-1933 | Pong_T2.0-230818-1943 -> [Pong_T2.0-230906-1933](https://android.googleapis.com/packages/ota-api/package/8ba0e8f6c57cd50a63104ca3ba8afdd10c292c78.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-230906-1933) |
| 2.0.2A | Pong-T2.0-230818-1943 | Pong_T2.0-230801-1740 -> [Pong_T2.0-230818-1943](https://android.googleapis.com/packages/ota-api/package/6d60ccd4ca081be661beb675c29a41c10fc765c4.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-230818-1943) |
| 2.0.2 | Pong-T2.0-230801-1740 | Pong_T2.0-230719-1458 -> [Pong_T2.0-230801-1740](https://android.googleapis.com/packages/ota-api/package/35989af612c8ac3ed916257ab5f32ee2d90d16a0.zip) | [此處](https://android.googleapis.com/packages/ota-api/package/fa8a143ace9337699f068e5b1629cafd60f8fbd9.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-230801-1740) |
| 2.0.1A | Pong-T2.0-230719-1458 | Pong_T2.0-230709-2003 -> [Pong_T2.0-230719-1458](https://android.googleapis.com/packages/ota-api/package/d0f3e3e897154d513c91634ad225da1b724c9455.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-230719-1458) |
| 2.0.1 | Pong-T2.0-230709-2003 | N/A | [此處](https://android.googleapis.com/packages/ota-api/package/7becde0f47753b99a7cc37ff27713ba8a48ef51a.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pong_T2.0-230709-2003) |

<br>

</details>

<details>
  <summary>Phone (2a) - Pacman</summary>

<br>

> **備註**: 2.5.3 至 2.5.5A 版本僅與 Milk、White 及 Black 變體相容。2.5.6 及更高版本支援所有顏色變體。

<br>

| **Nothing OS 版本** | **建構編號**     | **增量 / Delta OTA**                        | **全量 OTA**                           | **OTA 映像檔**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 4.0 | Pacman-B4.0-251230-2052 | Pacman_B4.0-251128-2240 -> [Pacman_B4.0-251230-2052](https://android.googleapis.com/packages/ota-api/package/f12d8b7f3ee3d33144b5be269146b4c712f6e283.zip) <br> Pacman_B4.0-251120-1747 -> [Pacman_B4.0-251230-2052](https://android.googleapis.com/packages/ota-api/package/fb382432542b231f6a14abaf0d3d4fc09a6da93d.zip) <br> Pacman_V3.2-250904-1648 -> [Pacman_B4.0-251230-2052](https://android.googleapis.com/packages/ota-api/package/47ff66624b80bbb2ee1d85cf86f238742c4b3c9d.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_B4.0-251230-2052) |
| 4.0 | Pacman-B4.0-251128-2240 | Pacman_B4.0-251120-1747 -> [Pacman_B4.0-251128-2240](https://android.googleapis.com/packages/ota-api/package/a62960e645856acc9e1e310d75feecae7de2b5ea.zip) <br> Pacman_B4.0-250917-2235 -> [Pacman_B4.0-251128-2240](https://android.googleapis.com/packages/ota-api/package/25a891fd18f0a8461b6acf146be4d530601e04bf.zip) <br> Pacman_V3.2-250904-1648 -> [Pacman_B4.0-251128-2240](https://android.googleapis.com/packages/ota-api/package/10c6c89d3c97a6f2338394096035e3129fcf8398.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pacman/Pacman_B4.0-251128-2240.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_B4.0-251128-2240) |
| 4.0 | Pacman-B4.0-251120-1747 | Pacman_V3.2-250904-1648 -> [Pacman_B4.0-251120-1747](https://android.googleapis.com/packages/ota-api/package/43e01fe74a44ba5fcb5061db745538a7ff96c3ae.zip) <br> Pacman_B4.0-250917-2235 -> [Pacman_B4.0-251120-1747](https://android.googleapis.com/packages/ota-api/package/25529b0794d736d850da7b4c326eb41687453640.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_B4.0-251120-1747) |
| 4.0 OBT-1 | Pacman-B4.0-250917-2235 | Pacman_V3.2-250904-1648 -> [Pacman_B4.0-250917-2235](https://android.googleapis.com/packages/ota-api/package/03c22b742c569dea44721ac421dba0a785166483.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_B4.0-250917-2235) |
| 3.2 | Pacman-V3.2-250904-1648 | Pacman_V3.2-250815-1642 -> [Pacman_V3.2-250904-1648](https://android.googleapis.com/packages/ota-api/package/2229ecaa33df35f0f4174271bb2291aabd7f5811.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pacman/Pacman_V3.2-250904-1648.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.2-250904-1648) |
| 3.2 | Pacman-V3.2-250815-1642 | Pacman_V3.2-250620-1021 -> [Pacman_V3.2-250815-1642](https://android.googleapis.com/packages/ota-api/package/2359cd4c93d3a3c5fc703e0124dfc74069ca9ca0.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.2-250815-1642) |
| 3.2 | Pacman-V3.2-250620-1021 | Pacman_V3.0-250527-2137 -> [Pacman_V3.2-250620-1021](https://android.googleapis.com/packages/ota-api/package/72a4e9a0f1fc5eabc408537027cede9803990369.zip) <br> Pacman_V3.0-250429-1922 -> [Pacman_V3.2-250620-1021](https://android.googleapis.com/packages/ota-api/package/e2f0d29a68bb5316dcc9de92a0c0954da33c2a2c.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.2-250620-1021) |
| 3.0 | Pacman-V3.0-250527-2137 | Pacman_V3.0-250429-1922 -> [Pacman_V3.0-250527-2137](https://android.googleapis.com/packages/ota-api/package/47276a2590ee508de676cf3bbed01ea1ca948566.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-250527-2137) |
| 3.0 | Pacman-V3.0-250429-1922 | Pacman_V3.0-250304-1904 -> [Pacman_V3.0-250429-1922](https://android.googleapis.com/packages/ota-api/package/22f105448598ae68cf6df552a8a0548dc6ec768c.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-250429-1922) |
| 3.0 | Pacman-V3.0-250304-1904 | Pacman_V3.0-250114-1909 -> [Pacman_V3.0-250304-1904](https://android.googleapis.com/packages/ota-api/package/5872828e517f2a3c6fd69156d814e8e2df6d1115.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-250304-1904) |
| 3.0 | Pacman-V3.0-250114-1909 | Pacman_V3.0-250103-1741 -> [Pacman_V3.0-250114-1909](https://android.googleapis.com/packages/ota-api/package/b087f08204adfcd5ef226f2559fc8c1d3e613dc9.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-250114-1909) |
| 3.0 | Pacman-V3.0-250103-1741 | Pacman_V3.0-241210-2057 -> [Pacman_V3.0-250103-1741](https://android.googleapis.com/packages/ota-api/package/34c43764d71f9df1c6c1575cc35134c68acebcb6.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-250103-1741) |
| 3.0 | Pacman-V3.0-241210-2057 | Pacman_U2.6-241021_2253 -> [Pacman_V3.0-241210-2057](https://android.googleapis.com/packages/ota-api/package/7e81406e8f6908b1504620ca979cb8fa80dc84cb.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-241210-2057) |
| 3.0 OBT-2 | Pacman-V3.0-241031-2105 | Pacman_V3.0-240923-2135 -> [Pacman_V3.0-241031-2105](https://android.googleapis.com/packages/ota-api/package/d19689ac9fa0e4df5ab2a65c8ae9a52442e62a04.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-241031-2105) |
| 2.6 | Pacman-U2.6-241021-2253 | Pacman_U2.6-240828-1906 -> [Pacman_U2.6-241021-2253](https://android.googleapis.com/packages/ota-api/package/5452dd9d6232cef1e3ba7562b5de822e291bea17.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.6-241021-2253) |
| 3.0 OBT-1 | Pacman-V3.0-240923-2135 | Pacman_U2.6-240828-1906 -> [Pacman_V3.0-240923-2135](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20240828_190644_20240923_213518.zip?Expires=1987558972&Signature=E0YjB7bUlCSxcNULPatdqUt26FtNPfZ2OieUhBPCP11MOqyRMbDOP~mRAz0hVy7loN-V97l68rEbrvFeBKOP5ONguXkD0MBaezQfnYLtQJXfIRdXjVXwXBE6jeOi-KragO0NdhPV~fHPBmI06Fn0P4wKPX-vr-R4Hw00QnqPx1lC~YrAHYN2G3pkGdvKvYowJjECI6gufVgDjgZyAAbgzMYtNuB3GfqtqxBowCo7peT4g3iQuBu81exTWW0bTc6Fw9wNuWbnU-UPvu3B7EWG19sETZdvWNRj-79loQWAlNwVNHou9ADheeTzDgBygkd7MZGCQmXhm-E8UBesgFwqbQ__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_V3.0-240923-2135) |
| 2.6 | Pacman-U2.6-240828-1906 | Pacman_U2.6-240701-2308 -> [Pacman_U2.6-240828-1906](https://android.googleapis.com/packages/ota-api/package/a36018db578fa81b74c8150812104e530fc75d0d.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.6-240828-1906) |
| 2.6 | Pacman-U2.6-240701-2308 | Pacman_U2.5-240522-1818 -> [Pacman_U2.6-240701-2308](https://android.googleapis.com/packages/ota-api/package/8351e1949122ca88c8149ebef62e986a1cc7b4d3.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.6-240701-2308) |
| 2.5.6 | Pacman-U2.5-240522-1818 | Pacman_U2.5-240419-2235 -> [Pacman_U2.5-240522-1818](https://android.googleapis.com/packages/ota-api/package/eb753e881f986f0807b7b8c0e34754145bb594e0.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240522-1818) |
| 2.5.5A | Pacman-U2.5-240419-2235 | Pacman_U2.5-240410-1238 -> [Pacman_U2.5-240419-2235](https://android.googleapis.com/packages/ota-api/package/0f96a78ccd851e6c91abbb7d64ad1fc2691617ea.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240419-2235) |
| 2.5.5 | Pacman-U2.5-240410-1238 | Pacman_U2.5-240322-1016 -> [Pacman_U2.5-240410-1238](https://android.googleapis.com/packages/ota-api/package/cba47167162f5940362699d12bc16d4ef3f5beef.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240410-1238) |
| 2.5.4A | Pacman-U2.5-240322-1016 | N/A | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240322-1016) |
| 2.5.4 | Pacman-U2.5-240315-0035 | N/A | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240315-0035) |
| 2.5.3 | Pacman-U2.5-240301-2206 | N/A | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-240301-2206) |
| 2.5 | Pacman-U2.5-231207-0042 | N/A | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Pacman_U2.5-231207-0042) |

<br>

</details>

<details>
  <summary>Phone (2a) Plus - PacmanPro</summary>

<br>

| **Nothing OS 版本** | **建構編號**     | **增量 / Delta OTA**                        | **全量 OTA**                           | **OTA 映像檔**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 4.0 | PacmanPro-B4.0-251230-2052 | PacmanPro_B4.0-251128-2246 -> [PacmanPro_B4.0-251230-2052](https://android.googleapis.com/packages/ota-api/package/284f1a74c98fa37854c184db00bcd93f9374d22e.zip) <br> PacmanPro_B4.0-251120-1812 -> [PacmanPro_B4.0-251230-2052](https://android.googleapis.com/packages/ota-api/package/172acc24a95932533805afc90aa61c19d5bc0253.zip) <br> PacmanPro_V3.2-250904-1704-> [PacmanPro_B4.0-251230-2052](https://android.googleapis.com/packages/ota-api/package/39bfcff590618cf5bf39bbfba305849857a0bc9b.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_B4.0-251230-2052) |
| 4.0 | PacmanPro-B4.0-251128-2246 | PacmanPro_B4.0-251120-1812 -> [PacmanPro_B4.0-251128-2246](https://android.googleapis.com/packages/ota-api/package/47918bd38b5cbddaabbd3efe41bf5f3f689da258.zip) <br> PacmanPro_B4.0-250917-2235 -> [PacmanPro_B4.0-251128-2246](https://android.googleapis.com/packages/ota-api/package/29ea35bd8e77cc05bbad0c0b61cd37723b0907e4.zip) <br> PacmanPro_V3.2-250904-1704 -> [PacmanPro_B4.0-251128-2246](https://android.googleapis.com/packages/ota-api/package/f7788a5cb81ba5d86f476b003e4596cbc1133a33.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pacmanpro/PacmanPro_B4.0-251128-2246.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_B4.0-251128-2246) |
| 4.0 | PacmanPro-B4.0-251120-1812 | PacmanPro_V3.2-250904-1704 -> [PacmanPro_B4.0-251120-1812](https://android.googleapis.com/packages/ota-api/package/bd6ca05cb891039af8f5c4314544c6734034ba46.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_B4.0-251120-1812) |
| 4.0 OBT-1 | PacmanPro-B4.0-250917-2235 | PacmanPro_V3.2-250904-1704 -> [PacmanPro_B4.0-250917-2235](https://android.googleapis.com/packages/ota-api/package/ea3df1135cd1245b51c9e3cba46798acdc85a6f8.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_B4.0-250917-2235) |
| 3.2 | PacmanPro-V3.2-250904-1704 | PacmanPro_V3.2-250731-1640 -> [PacmanPro_V3.2-250904-1704](https://android.googleapis.com/packages/ota-api/package/ea0572e6c8c298e6ecc218088786eb0f3e3718c4.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.2-250904-1704) |
| 3.2 | PacmanPro-V3.2-250731-1640 | PacmanPro_V3.2-250609-1917 -> [PacmanPro_V3.2-250731-1640](https://android.googleapis.com/packages/ota-api/package/a758d5fe45d11e19421152927afbc1b219406665.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/pacmanpro/PacmanPro_V3.2-250731-1640.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.2-250731-1640) | 
| 3.2 | PacmanPro-V3.2-250609-1917 | PacmanPro_V3.0-250410-1524 -> [PacmanPro_V3.2-250609-1917](https://android.googleapis.com/packages/ota-api/package/6acbb260eb3b61c889f7f4d7ef1933b17e89ee9c.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.2-250609-1917)
| 3.0 | PacmanPro-V3.0-250410-1524 | PacmanPro_V3.0-250207-2041 -> [PacmanPro-V3.0-250410-1524](https://android.googleapis.com/packages/ota-api/package/487046e4603aa8b9028eb847dac1fd8cc40035fd.zip) | N/A |
| 3.0 | PacmanPro-V3.0-250207-2041 | PacmanPro_V3.0-241226-1537 -> [PacmanPro_V3.0-250207-2041](https://android.googleapis.com/packages/ota-api/package/ea9af989918db06e6510fff9d59552d5a429191b.zip) | N/A |
| 3.0 | PacmanPro-V3.0-241226-1537 | PacmanPro_V3.0-241126-1448 -> [PacmanPro_V3.0-241226-1537](https://android.googleapis.com/packages/ota-api/package/920e82afd0cb40da211a887baeb5297224c3a2c8.zip) <br> PacmanPro_U2.6-241217-1545 -> [PacmanPro_V3.0-241226-1537](https://android.googleapis.com/packages/ota-api/package/76b3f6ca552d54d5438aef2d8685586250e8b6ca.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.0-241226-1537) |
| 3.0 OBT-1 | PacmanPro-V3.0-241126-1448 | PacmanPro_U2.6-241125-2243 -> [PacmanPro_V3.0-241126-1448](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241125_224310_20241126_144811.zip?Expires=1993198031&Signature=CUmhVNk~bhACxtqLFXzj4Wr6b1~Bvc6F7-TVE~3reJLIp1K534egj9liWfX45VscVKmyMXFjr~nRTXjLw7DE4CuYAtyd43DkvUhasyDNTyeVHOoiGa1dZznANiP1y4TTg-ATCAVovwv3kVHlZGhii7a~T8gYNGXsUPdknC-L-6dgI1AVutlQ2sYE4axXuGp2BOq9S6dvG28xkmdQWyZrxomo1bFXsPpiEcAfiL94UP2HNQ23RVmLfyElVWpZxscGQgHfTmMtcl3aJxAxCcUedMj3KThkkfV~k9sMhiB2Vn-5s43l5gW6wu3E6FbiWYaeRtQ65SDr9AZs4B0cDV-pGA__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_V3.0-241126-1448) |
| 2.6 | PacmanPro-U2.6-241217-1545 | PacmanPro_U2.6-241125-2243 -> [PacmanPro_U2.6-241217-1545](https://android.googleapis.com/packages/ota-api/package/bbb9972e05e68086de1843050939e8ca1a75e39e.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_U2.6-241217-1545) |
| 2.6 | PacmanPro-U2.6-241125-2243 | PacmanPro_U2.6-240924 -> [PacmanPro_U2.6-241125-2243](https://android.googleapis.com/packages/ota-api/package/b0e5614fca80d0cb2bdfa3d4bfca1e3c77560265.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_U2.6-241125-2243) |
| 2.6 | PacmanPro-U2.6-240924-2223 | PacmanPro_U2.6-240723-1102 -> [PacmanPro_U2.6-240924-2223](https://android.googleapis.com/packages/ota-api/package/b8d1f9e6b3de2f85bc2ca29632bb11b23686078f.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_U2.6-240924-2223) |
| 2.6 | PacmanPro-U2.6-240723-1102 | N/A | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/PacmanPro_U2.6-240723-1102) |

<br>

</details>

<details>
  <summary>Phone (3a) & (3a) Pro - Asteroids</summary>

<br>

| **Nothing OS 版本** | **建構編號**     | **增量 / Delta OTA**                        | **全量 OTA**                           | **OTA 映像檔**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 4.0 | Asteroids-B4.0-251229-2335 | Asteroids_B4.0-251118-1551 -> [Asteroids_B4.0-251229-2335](https://android.googleapis.com/packages/ota-api/package/9b268ebcca32a5d1736b68e914cfadb3705e3cbd.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_B4.0-251229-2335) |
| 4.0 | Asteroids-B4.0-251118-1551 | Asteroids_V3.2-251013-1406 -> [Asteroids_B4.0-251118-1551](https://android.googleapis.com/packages/ota-api/package/57c73fc36c537c04005cebe08bba0cd91d211f3a.zip) <br> Asteroids_B4.0-251027-1838 -> [Asteroids_B4.0-251118-1551](https://android.googleapis.com/packages/ota-api/package/9fbd9be78cf88c4c55a383d2af19370780771738.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/asteroids/Asteroids_B4.0-251118-1551.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_B4.0-251118-1551) |
| 4.0 OBT-2 | Asteroids-B4.0-251027-1838 | Asteroids_B4.0-251021-1539 -> [Asteroids_B4.0-251027-1838](https://android.googleapis.com/packages/ota-api/package/931752945d793bb52362ed4a666adb893185bd9f.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_B4.0-251027-1838) |
| 4.0 OBT-1 | Asteroids-B4.0-251021-1539 | Asteroids_V3.2-251013-1406 -> [Asteroids_B4.0-251021-1539](https://android.googleapis.com/packages/ota-api/package/738d956d39a686922c8cd51d8d757cf4310eb045.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_B4.0-251021-1539) |
| 3.2 | Asteroids-V3.2-251013-1406 | Asteroids_V3.2-250924-1736 -> [Asteroids_V3.2-251013-1406](https://android.googleapis.com/packages/ota-api/package/8ccbc509fe686266c92622dfb7c7351cf2bd613b.zip) <br> Asteroids_V3.2-250717-1803 -> [Asteroids_V3.2-251013-1406](https://android.googleapis.com/packages/ota-api/package/19e604861d7f0fff552ac7ae482809a24b6e25ce.zip) <br> Asteroids_V3.1-250610-1841 -> [Asteroids_V3.2-251013-1406](https://android.googleapis.com/packages/ota-api/package/a83df4d8e0f6abba0cf12925a701ebf9c0e41072.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/asteroids/Asteroids_V3.2-251013-1406.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.2-251013-1406) |
| 3.2 | Asteroids-V3.2-250924-1736 | Asteroids_V3.2-250717-1803 -> [Asteroids_V3.2-250924-1736](https://android.googleapis.com/packages/ota-api/package/f542e2b281b195ab2a511be4e1468d7d14685c46.zip) <br> Asteroids_V3.1-250610-1841 -> [Asteroids_V3.2-250924-1736](https://android.googleapis.com/packages/ota-api/package/a2491a01f7bb5e8a8507985acf279d99eaa27b79.zip) | N/A |
| 3.2 | Asteroids-V3.2-250717-1803 | Asteroids_V3.1-250610-1841 -> [Asteroids_V3.2-250717-1803](https://android.googleapis.com/packages/ota-api/package/c054376e8b3cb9f1016e8607e0e4d5c8ffb41524.zip) <br> Asteroids_V3.1-250529-1004 -> [Asteroids_V3.2-250717-1803](https://android.googleapis.com/packages/ota-api/package/975912e4073f69a85bbe7b379a5c5cf3ef486726.zip) <br> Asteroids_V3.1-250417-1222 -> [Asteroids_V3.2-250717-1803](https://android.googleapis.com/packages/ota-api/package/e4e9355b2352daf48ff53585d904c679a611aa5a.zip) <br> Asteroids_V3.1-250417-1222 -> [Asteroids_V3.2-250717-1803](https://android.googleapis.com/packages/ota-api/package/75c693ea7bf17f551eae0a4c0b2fe3c627e2249f.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.2-250717-1803) |
| 3.1 | Asteroids-V3.1-250610-1841 | Asteroids_V3.1-250529-1004 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/751d943338f6302e218b32dafc387276f91ce475.zip) <br> Asteroids_V3.1-250417-1222 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/dae1cbcfdcebbadd9309c0e3a4ff9a7d6100760f.zip) <br> Asteroids_V3.1-250401-1916 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/ea0bf8656f7c43b1e4c2cc08b522929683edcb61.zip) <br> Asteroids_V3.1-250320-2319 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/af84c3d391a7b26885233c1e444c417692e3fd88.zip) <br> Asteroids_V3.1-250302-1856 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/a0d44359189d797802d63139a5ed9f2d89b44a40.zip) <br> Asteroids_V3.1-250217-2235 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/b6fef110e6d2bbbdde5060aeda5ad051eabe10df.zip) <br> Asteroids_V3.1-250112-1904 -> [Asteroids_V3.1-250610-1841](https://android.googleapis.com/packages/ota-api/package/d2f884d6face92c94c4384abba7b0be68d844986.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250610-1841) |
| 3.1 | Asteroids-V3.1-250529-1004 | Asteroids_V3.1-250417-1222 -> [Asteroids_V3.1-250529-1004](https://android.googleapis.com/packages/ota-api/package/bb4ea2cfe39afd38ce5651b93f941b896fbdb1d2.zip) <br> Asteroids_V3.1-250401-1916 -> [Asteroids_V3.1-250529-1004](https://android.googleapis.com/packages/ota-api/package/595a347d8bce1a4cb3c9b1294c483333d67eb7f4.zip) <br> Asteroids_V3.1-250320-2319 -> [Asteroids_V3.1-250529-1004](https://android.googleapis.com/packages/ota-api/package/3d2a622115e7b08ee5ffea6c1abc2c1928780f34.zip) <br> Asteroids_V3.1-250302-1856 -> [Asteroids_V3.1-250529-1004](https://android.googleapis.com/packages/ota-api/package/12600b3370548d79a80736a4c9905dfdcb0464ca.zip) <br> Asteroids_V3.1-250217-2233 -> [Asteroids_V3.1-250529-1004](https://android.googleapis.com/packages/ota-api/package/80825995bffdaad67484e0ceff8f223a0547e65f.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250529-1004) | 
| 3.1 | Asteroids-V3.1-250417-1222 | Asteroids_V3.1-250401-1916 -> [Asteroids_V3.1-250417-1222](https://android.googleapis.com/packages/ota-api/package/f0a8832f0491e155c320d4b5a7d1461170584c28.zip) <br> Asteroids_V3.1-250217-2233 -> [Asteroids_V3.1-250417-1222](https://android.googleapis.com/packages/ota-api/package/9c818c381116185d877894aa4933afeeb67d6aee.zip) <br> Asteroids_V3.1-250320-2319 -> [Asteroids_V3.1-250417-1222](https://android.googleapis.com/packages/ota-api/package/3dc5e6784f8e90a47bc1288c27ee4402dcee36f1.zip) <br> Asteroids_V3.1-250302-1856 -> [Asteroids_V3.1-250417-1222](https://android.googleapis.com/packages/ota-api/package/6293e6c7a350c3a5d7c7b88fabad8d2b6c60fe11.zip) <br> Asteroids_V3.1-241231-1753 -> [Asteroids_V3.1-250417-1222](https://android.googleapis.com/packages/ota-api/package/8c9a682fb5f497d7a58b99c363c7c501f177cb0d.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250417-1222) | 
| 3.1 | Asteroids-V3.1-250401-1916 | Asteroids_V3.1-250320-2319 -> [Asteroids_V3.1-250401-1916](https://android.googleapis.com/packages/ota-api/package/7e7529e0a66fe15b700be9987afd23d31559cb66.zip) <br> Asteroids_V3.1-250302-1856 -> [Asteroids_V3.1-250401-1916](https://android.googleapis.com/packages/ota-api/package/96051b62fff440ccbb3f1d255bc0a1a11c77cca3.zip) <br> Asteroids_V3.1-241231-1753 -> [Asteroids_V3.1-250401-1916](https://android.googleapis.com/packages/ota-api/package/26318cf7accc06198ecdd5b1065a0b6b765073b4.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250401-1916)
| 3.1 | Asteroids-V3.1-250320-2319 | Asteroids_V3.1-250302-1856 -> [Asteroids_V3.1-250320-2319](https://android.googleapis.com/packages/ota-api/package/2d06383bd0ee5af9165156087167f2e86bbdffae.zip) <br> Asteroids_V3.1-241231-1753 -> [Asteroids_V3.1-250320-2319](https://android.googleapis.com/packages/ota-api/package/98084a85c4cebe2ff9c7e44e817c5053bdc26a4d.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250320-2319)
| 3.1 | Asteroids-V3.1-250302-1856 | Asteroids_V3.1-250217-2235 -> [Asteroids_V3.1-250302-1856](https://android.googleapis.com/packages/ota-api/package/4d1092626406b96e5f1e5e31d727b0d71ed4cbf3.zip) <br> Asteroids_V3.1-241231-1753 -> [Asteroids_V3.1-250302-1856](https://android.googleapis.com/packages/ota-api/package/9d8b54d1cb47c80c233319560d1720ccb5bd1c5e.zip) | [此處](https://android.googleapis.com/packages/ota-api/package/156adca4d6d6cf50e385a3ddf5b9569af62b1bef.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Asteroids_V3.1-250302-1856)
| 3.1 | Asteroids-V3.1-250217-2235 | Asteroids_V3.1-250112-1904 -> [Asteroids_V3.1-250217-2235](https://android.googleapis.com/packages/ota-api/package/ced682b69a20c21a8359ede518813c6ded14a1c2.zip) <br> Asteroids_V3.1-241231-1753 -> [Asteroids_V3.1-250217-2235](https://android.googleapis.com/packages/ota-api/package/a201b6cb78c1fdabd65af36a122847fbfce77edb.zip)  | N/A | N/A |

<br>

</details>

<details>
  <summary>Phone (3) - Metroid</summary>

<br>

| **Nothing OS 版本** | **建構編號**     | **增量 / Delta OTA**                        | **全量 OTA**                           | **OTA 映像檔**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 4.0 | Metroid-B4.0-260206-1135 | Metroid_B4.0-251224-1229 -> [Metroid_B4.0-260206-1135](https://android.googleapis.com/packages/ota-api/package/1758dbc5f0beabfbb31b3ebf042121be7f98af14.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_B4.0-260206-1135) |
| 4.0 | Metroid-B4.0-251224-1229 | Metroid_B4.0-251117-1909 -> [Metroid_B4.0-251224-1229](https://android.googleapis.com/packages/ota-api/package/8b96a9ad74c44a089a86c213103c624ee74088ae.zip)| N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_B4.0-251224-1229) |
| 4.0 | Metroid-B4.0-251117-1909 | Metroid_V3.5-250923-1421 -> [Metroid_B4.0-251117-1909](https://android.googleapis.com/packages/ota-api/package/f276b64163f41969ebdc98a19f9b172c6c845828.zip) <br> Metroid_B4.0-250917-1218 -> [Metroid_B4.0-251117-1909](https://android.googleapis.com/packages/ota-api/package/6bf2aeba7156bfba319cd9eef3ebd572b6c75416.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/metroid/Metroid_B4.0-251117-1909.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_B4.0-251117-1909) |
| 4.0 | Metroid-B4.0-251117-1909 | Metroid_V3.5-250923-1421 -> [Metroid_B4.0-251117-1909](https://android.googleapis.com/packages/ota-api/package/f276b64163f41969ebdc98a19f9b172c6c845828.zip) <br> Metroid_B4.0-250917-1218 -> [Metroid_B4.0-251117-1909](https://android.googleapis.com/packages/ota-api/package/6bf2aeba7156bfba319cd9eef3ebd572b6c75416.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/metroid/Metroid_B4.0-251117-1909.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_B4.0-251117-1909) |
| 3.5 | Metroid-V3.5-250923-1421 | Metroid_V3.5-250911-2112 -> [Metroid_V3.5-250923-1421](https://android.googleapis.com/packages/ota-api/package/532c1bbbbfdd19968ec20d03737fae84dfc493c8.zip) <br> Metroid_V3.5-250829-1700 -> [Metroid_V3.5-250923-1421](https://android.googleapis.com/packages/ota-api/package/366bed6e3522d281d66cad74fca25ce75b7e79d2.zip) <br> Metroid_V3.5-250808-1022 -> [Metroid_V3.5-250923-1421](https://android.googleapis.com/packages/ota-api/package/3ea0b949a855369b673ad59758cf73e078596ed7.zip) <br> Metroid_V3.5-250801-1847 -> [Metroid_V3.5-250923-1421](https://android.googleapis.com/packages/ota-api/package/be40070e17d94a3cee56b126fff5146053fff314.zip) <br> Metroid_V3.5-250719-1646 -> [Metroid_V3.5-250923-1421](https://android.googleapis.com/packages/ota-api/package/b03a94cba2e9813ff9e4a88eb436d07f9c193ddb.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/metroid/Metroid_V3.5-250923-1421.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250923-1421) |
| 4.0 OBT-1 | Metroid-B4.0-250917-1218 | Metroid_V3.5-250911-2112 -> [Metroid_B4.0-250917-1218](https://android.googleapis.com/packages/ota-api/package/53f6a536fde478009c529eaa48d176c02da93177.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_B4.0-250917-1218) |
| 3.5 | Metroid-V3.5-250911-2112 | Metroid_V3.5-250829-1700 -> [Metroid_V3.5-250911-2112](https://android.googleapis.com/packages/ota-api/package/c57a7b2a7de6971cc97a0e769cc7909beccc5f25.zip) <br> Metroid_V3.5-250808-1022 -> [Metroid_V3.5-250911-2112](https://android.googleapis.com/packages/ota-api/package/9f779d3361a0f08cf0865f13874919051413be81.zip) <br> Metroid_V3.5-250801-1847 -> [Metroid_V3.5-250911-2112](https://android.googleapis.com/packages/ota-api/package/78628297b74161ea5161c4cb61da8fde3ccc6a2e.zip) <br> Metroid_V3.5-250719-1646 -> [Metroid_V3.5-250911-2112](https://android.googleapis.com/packages/ota-api/package/5fb1c328dfd5886966c56fb05ae9d4d1ad429ec4.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250911-2112) |
| 3.5 | Metroid-V3.5-250829-1700 | Metroid_V3.5-250808-1022 -> [Metroid_V3.5-250829-1700](https://android.googleapis.com/packages/ota-api/package/aa9c5e748bf7084416541eff6bb9a04ea49bcb28.zip) <br> Metroid_V3.5-250801-1847 -> [Metroid_V3.5-250829-1700](https://android.googleapis.com/packages/ota-api/package/800eb2b95dde5cc1f982d6bb7af546f84cf4a79f.zip) <br> Metroid_V3.5-250719-1646 -> [Metroid_V3.5-250829-1700](https://android.googleapis.com/packages/ota-api/package/3272a6349ef665eb2a469b42e44188dd3a1561f0.zip) <br> Metroid_V3.5-250711-2047 -> [Metroid_V3.5-250829-1700](https://android.googleapis.com/packages/ota-api/package/28889f16775447e96bb6d0b44301deac323d3f8c.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/metroid/Metroid_V3.5-250829-1700.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250829-1700) |
| 3.5 | Metroid-V3.5-250808-1022 | Metroid_V3.5-250719-1646 -> [Metroid_V3.5-250808-1022](https://android.googleapis.com/packages/ota-api/package/5b85eb173eced57b515400c9c729c442bc44caec.zip) <br> Metroid_V3.5-250711-2047 -> [Metroid_V3.5-250808-1022](https://android.googleapis.com/packages/ota-api/package/6847621734461a21e61e95fa2cf1e25178f0a3aa.zip) <br> Metroid_V3.5-250626-1934 -> [Metroid_V3.5-250808-1022](https://android.googleapis.com/packages/ota-api/package/882f5da98172b53da86a3c6b95ce78e4d5bb72c8.zip) <br> Metroid_V3.5-250529-1404 -> [Metroid_V3.5-250808-1022](https://android.googleapis.com/packages/ota-api/package/c415d85f74dba4f691c00cdc4cf27dd6a9d02e29.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250808-1022) |
| 3.5 | Metroid-V3.5-250801-1847 | Metroid_V3.5-250719-1646 -> [Metroid_V3.5-250801-1847](https://android.googleapis.com/packages/ota-api/package/04d47b1a083b61ce07c1897cce87354395cd7047.zip) <br> Metroid_V3.5-250711-2047 -> [Metroid_V3.5-250801-1847](https://android.googleapis.com/packages/ota-api/package/5a2924f1a1ad3ddeccce7747b950f673aa74d90c.zip) <br> Metroid_V3.5-250626-1934 -> [Metroid_V3.5-250801-1847](https://android.googleapis.com/packages/ota-api/package/e5b4c6213f2efe61f8048e75d3f0a6a86f2cc2e5.zip) <br> Metroid_V3.5-250626-1934 -> [Metroid_V3.5-250801-1847](https://android.googleapis.com/packages/ota-api/package/c3e279ea77cd8b057972b87a4740c2f89fffe556.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250801-1847) |
| 3.5 | Metroid-V3.5-250719-1646 | Metroid_V3.5-250711-2047 -> [Metroid_V3.5-250719-1646](https://android.googleapis.com/packages/ota-api/package/c1501de03858f3ac4e6fbfcae468ff07e8c336fa.zip) <br> Metroid_V3.5-250626-1934 -> [Metroid_V3.5-250719-1646](https://android.googleapis.com/packages/ota-api/package/21e8ef236eee740213eca42aa307f680014c3666.zip) <br> Metroid_V3.5-250529-1404-> [Metroid_V3.5-250719-1646](https://android.googleapis.com/packages/ota-api/package/3f7ea84647f828e625d46246aec0004e0fa419ae.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250719-1646) |
| 3.5 | Metroid-V3.5-250711-2047 | Metroid_V3.5-250626-1934 -> [Metroid-V3.5-250711-2047](https://android.googleapis.com/packages/ota-api/package/6096b0ce17b226e8b9707f9a911631fa3138d46f.zip) <br> Metroid_V3.5-250529-1404-> [Metroid_V3.5-250711-2047](https://android.googleapis.com/packages/ota-api/package/30545d507c2922f6d1e3da12b1782cdf175ff84a.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Metroid_V3.5-250711-2047) |

<br>

</details>

<details>
  <summary>Phone (3a) Lite - Galaxian</summary>

<br>

| **Nothing OS 版本** | **建構編號**     | **增量 / Delta OTA**                        | **全量 OTA**                           | **OTA 映像檔**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 4.0 | Galaxian-B4.0-260116-1904 | Galaxian_V3.5-251222-1801 -> [Galaxian_B4.0-260116-1904](https://android.googleapis.com/packages/ota-api/package/2fc06239e0a38f2e2a61eb158fd827851e183095.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaxian_B4.0-260116-1904) |
| 3.5 | Galaxian-V3.5-251222-1801 | Galaxian_V3.5-251212-1008 -> [Galaxian_V3.5-251222-1801](https://android.googleapis.com/packages/ota-api/package/1146f774dcd2c969f3f401b14029b60d9364c0c6.zip) <br> Galaxian_V3.5-251122-0841 -> [Galaxian_V3.5-251222-1801](https://android.googleapis.com/packages/ota-api/package/cf0340177f293ec3787792424e0d922b88025804.zip) <br> Galaxian_V3.5-251029-1642 -> [Galaxian_V3.5-251222-1801](https://android.googleapis.com/packages/ota-api/package/8bf2f433bd8834f1e4f02b017fbec475ec42d21f.zip) <br> Galaxian_V3.5-250829-1700 -> [Galaxian_V3.5-251222-1801](https://android.googleapis.com/packages/ota-api/package/d8f1e8e610889705a16abaee16a6615e3e25aa3d.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaxian_V3.5-251222-1801) |
| 3.5 | Galaxian-V3.5-251212-1008 | Galaxian_V3.5-251122-0841 -> [Galaxian_V3.5-251212-1008](https://android.googleapis.com/packages/ota-api/package/420976e40caeaae5806fd56ab1e238cb0c13b605.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaxian_V3.5-251212-1008) |
| 3.5 | Galaxian-V3.5-251122-0841 | Galaxian_V3.5-251029-1642 -> [Galaxian_V3.5-251122-0841](https://android.googleapis.com/packages/ota-api/package/b4340758c69d138b9b2357076391f530833d0b92.zip) <br> Galaxian_V3.5-250829-1700 -> [Galaxian_V3.5-251122-0841](https://android.googleapis.com/packages/ota-api/package/e8244388b29883c3a2ce6806c71460e567072c23.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaxian_V3.5-251122-0841) |
| 3.5 | Galaxian-V3.5-251029-1642 | Galaxian_V3.5-250829-1700 -> [Galaxian_V3.5-251029-1642](https://android.googleapis.com/packages/ota-api/package/0b5b0e6d070dd8835fa6e80f4b5750d689d85152.zip) | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/galaxian/Galaxian_V3.5-251029-1642.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaxian_V3.5-251029-1642) |

<br>

</details>

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

### CMF by Nothing Phones

<details>
  <summary>Phone (1) - Tetris</summary>

<br>

| **Nothing OS 版本** | **建構編號**     | **增量 / Delta OTA**                        | **全量 OTA**                           | **OTA 映像檔**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 4.0 | Tetris-B4.0-260108-1653 | Tetris_B4.0-251216-1717 -> [Tetris_B4.0-260108-1653](https://android.googleapis.com/packages/ota-api/package/f0662772e6d75a5ac630fd29073fc3130079f123.zip) <br> Tetris_V3.2-250925-1843 -> [Tetris_B4.0-260108-1653](https://android.googleapis.com/packages/ota-api/package/319fa518fe569a4900bbf67c1f658e23218e4116.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_B4.0-260108-1653) |
| 4.0 | Tetris-B4.0-251216-1717 | Tetris_V3.2-250925-1843 -> [Tetris_B4.0-251216-1717](https://android.googleapis.com/packages/ota-api/package/248ea05642c639ea459e0d71c70bf9cbdfe48c74.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_B4.0-251216-1717) |
| 3.2 | Tetris-V3.2-250925-1843 | Tetris_V3.2-250723-1800 -> [Tetris_V3.2-250925-1843](https://android.googleapis.com/packages/ota-api/package/d1a4c6895f2b59b0a0af0d7767676fa22ab853ca.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.2-250925-1843) |
| 3.2 | Tetris-V3.2-250723-1800 | Tetris_V3.2-250609-2111 -> [Tetris_V3.2-250723-1800](https://android.googleapis.com/packages/ota-api/package/37933617e6847e797acb24a1734fd17b1b43fd17.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.2-250723-1800) | 
| 3.2 | Tetris-V3.2-250609-2111 | Tetris_V3.0-250421-2015 -> [Tetris_V3.2-250609-2111](https://android.googleapis.com/packages/ota-api/package/9701916b6254b90a0e6353bb80fe719cff810f11.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.2-250609-2111) | 
| 3.0 | Tetris-V3.0-250421-2015 | Tetris_V3.0-250409-1734 -> [Tetris_V3.0-250421-2015](https://android.googleapis.com/packages/ota-api/package/b4eacb9ca70132469e3ae598b6f4fb6a7cc271f9.zip) <br> Tetris_V3.0-250208-2015 -> [Tetris_V3.0-250421-2015](https://android.googleapis.com/packages/ota-api/package/a052b413979b4ef715023c39ab6b63d9e178bfa1.zip) <br> Tetris_U2.6-241204-2338 -> [Tetris_V3.0-250421-2015](https://android.googleapis.com/packages/ota-api/package/df48cea7579d72dbbddc782fb1ed278be0923875.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.0-250421-2015) | 
| 3.0 | Tetris-V3.0-250409-1734 | Tetris_V3.0-250208-2015 -> [Tetris_V3.0-250409-1734](https://android.googleapis.com/packages/ota-api/package/3c2cba7417cb5b2b8abb6a171d5c26a24702ac0f.zip) <br> Tetris_U2.6-241204-2338 -> [Tetris_V3.0-250409-1734](https://android.googleapis.com/packages/ota-api/package/0dbc7a921c2a2716a06b2e0e9baa5c75eec8074e.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.0-250409-1734) |
| 3.0 | Tetris-V3.0-250208-2015 | Tetris_V3.0-250111-2249 -> [Tetris_V3.0-250208-2015](https://android.googleapis.com/packages/ota-api/package/b7baa86871347adcf54b1b7d80aa6129e0755627.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.0-250208-2015) |
| 3.0 | Tetris-V3.0-250111-2249 | Tetris_U2.6-241204-2338 -> [Tetris_V3.0-250111-2249](https://android.googleapis.com/packages/ota-api/package/5dccb5b8fedd073b498b7ca3ea364ab9dc3702d8.zip) <br> Tetris_V3.0-241205-0050 -> [Tetris_V3.0-250111-2249](https://android.googleapis.com/packages/ota-api/package/67feb668686ad7363ef39906168530af25c265b9.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.0-250111-2249) |
| 3.0 OBT-1 | Tetris-V3.0-241205-0050 | Tetris_U2.6-241125-2107 -> [Tetris_V3.0-241205-0050](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241125_210739_20241205_005022.zip?Expires=1993023098&Signature=c7Wzv7dfnpD1TbSb~imjm9sGWwpQrCgY9caLXO94DbUK~yQvCFs6yxqMXTUTdZtFhZOXp4BR7b2qwF1bXMHrJg-Kb7gEq5087yZEKOx6UJUFzOmth97BxvfxmIt6ROiwhLJ2~7U9XwZnD4oI8cgGfFaGS6EL21KrOIax1groWS09mh6Ogm-ssLjsc~-1qCQU2ogNHtu2Yt6AfWPAvZ7dpMb4WBN2qjrKJdRjzMTuCyH6zud8S42Bwyw0UefY-OA2pFoMti0KKUCyPwGlQxOvAZiKfZS6n6RBNkhekQzaPi-G0mG1m0kujK8e01fdT769RfTESbuwlBceCsemnktj3w__&Key-Pair-Id=K1EOR8HYJKSWP1) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_V3.0-241205-0050) |
| 2.6 | Tetris-U2.6-241204-2338 | Tetris_U2.6-241125-2107 -> [Tetris_U2.6-241204-2338](https://android.googleapis.com/packages/ota-api/package/4f5070152393f8d3e4a584cc83a55b510fcacc95.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-241204-2338) |
| 2.6 | Tetris-U2.6-241125-2107 | Tetris_U2.6-241021-2030 -> [Tetris_U2.6-241125-2107](https://android.googleapis.com/packages/ota-api/package/e8139bd6d603532ce29cf276eca4e612fb2aad20.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-241125-2107) |
| 2.6 | Tetris-U2.6-241021-2030 | Tetris_U2.6-240910-1735 -> [Tetris_U2.6-241021-2030](https://android.googleapis.com/packages/ota-api/package/c7ee5ac3622008faa41032a4fbf6b6b9767f6d20.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-241021-2030) |
| 2.6 | Tetris-U2.6-240910-1735 | Tetris_U2.6-240719-2323 -> [Tetris_U2.6-240910-1735](https://android.googleapis.com/packages/ota-api/package/fb3dc5e18523b52114448abf236be119fe561787.zip) | [此處](https://android.googleapis.com/packages/ota-api/package/adf8245c2d0cd50895ddece5f2366da80b2675c4.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240910-1735) |
| 2.6 | Tetris-U2.6-240828-2341 | Tetris_U2.6-240813-2046 -> [Tetris-U2.6-240828-2341](https://android.googleapis.com/packages/ota-api/package/6140b9ee7974e0c531694f18f972243a5c48be6b.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240828-2341) |
| 2.6 | Tetris-U2.6-240813-2046 | Tetris_U2.6-240729-1047 -> [Tetris_U2.6-240813-2046](https://android.googleapis.com/packages/ota-api/package/397fb089fe692ccbda135dcc8434d90add1388a5.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240813-2046) |
| 2.6 | Tetris-U2.6-240729-1047 | Tetris_U2.6-240702-2200 -> [Tetris_U2.6-240729-1047](https://android.googleapis.com/packages/ota-api/package/48fe84d5164a62417debe07bfff5d7c3ba19046e.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240729-1047) |
| 2.6 | Tetris-U2.6-240713-1955 | Tetris_U2.6-240702-2200 -> [Tetris-U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/24c251bfc97dbe9a32777af2677e979e38bfcef2.zip) <br> Tetris_U2.6-240606-1805 -> [Tetris_U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/d84e482fad907cef29a0de4dc344d18e61adf42a.zip) <br> Tetris_U2.6-240524-1536 -> [Tetris_U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/72b82b535759b4559d0eb60c20e9ceabd303872a.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240713-1955) |
| 2.6 | Tetris-U2.6-240702-2200 | N/A | [此處](https://archive.org/download/nothing-archive/spike0en/fullota/tetris/Tetris_U2.6-240702-2200_2.6.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Tetris_U2.6-240702-2200) |

<br>

</details>

<details>
  <summary>Phone (2) Pro - Galaga</summary>

<br>

| **Nothing OS 版本** | **建構編號**     | **增量 / Delta OTA**                        | **全量 OTA**                           | **OTA 映像檔**          |
|------------------------|-------------------|----------------------------------------------------|----------------------------------------|-------------------------|
| 4.0 | Galaga-B4.0-260108-1654 | Galaga_B4.0-251218-2326 -> [Galaga_B4.0-260108-1654](https://android.googleapis.com/packages/ota-api/package/15f986e0126f0ca3abc51c723a0c3361e65ced8f.zip) <br> Galaga_V3.2-251103-2121 -> [Galaga_B4.0-260108-1654](https://android.googleapis.com/packages/ota-api/package/1c2e923c94f934fb3957d85a1f4a96f6f325e763.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_B4.0-260108-1654) |
| 4.0 | Galaga-B4.0-251218-2326 | Galaga_V3.2-251103-2121 -> [Galaga_B4.0-251218-2326](https://android.googleapis.com/packages/ota-api/package/efa331e5b51ed67ea0dda9e86cba9992a00f222f.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_B4.0-251218-2326) |
| 3.2 | Galaga-V3.2-251103-2121 | Galaga_V3.2-250903-2153 -> [Galaga_V3.2-251103-2121](https://android.googleapis.com/packages/ota-api/package/4d82ecba33cb1ec6127426051c95f5f15a531fce.zip) <br> Galaga_V3.2-250715-1813 -> [Galaga_V3.2-251103-2121](https://android.googleapis.com/packages/ota-api/package/5310b4e126619b1073ab522c9ec1fd1b53789417.zip) <br> Galaga_V3.2-250526-1427 -> [Galaga_V3.2-251103-2121](https://android.googleapis.com/packages/ota-api/package/49b6d63a836a21160bcb1e81329178935e1a73b2.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_V3.2-251103-2121) |
| 3.2 | Galaga-V3.2-250903-2153 | Galaga_V3.2-250715-1813 -> [Galaga_V3.2-250903-2153](https://android.googleapis.com/packages/ota-api/package/6cb57da75874606dd4248382cdd11cc7f43da59d.zip) <br> Galaga_V3.2-250616-1258 -> [Galaga_V3.2-250903-2153](https://android.googleapis.com/packages/ota-api/package/5d26a7b7c27081a303bd2633219934ffeaebdc99.zip) <br> Galaga_V3.2-250526-1427 -> [Galaga_V3.2-250903-2153](https://android.googleapis.com/packages/ota-api/package/7de0e7c6c157f812acc248df0240a426aea7651c.zip) <br> Galaga_V3.2-250507-1139 -> [Galaga_V3.2-250903-2153](https://android.googleapis.com/packages/ota-api/package/7e45972eba5847663234b8d40729bab2be7c6855.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_V3.2-250903-2153) |
| 3.2 | Galaga-V3.2-250715-1813 | Galaga_V3.2-250616-1258 -> [Galaga_V3.2-250715-1813](https://android.googleapis.com/packages/ota-api/package/3a534c0674c4705af690e2bd4bf56c88ed3c25ee.zip) <br> Galaga_V3.2-250526-1427 -> [Galaga_V3.2-250715-1813](https://android.googleapis.com/packages/ota-api/package/1f8f3f76359bdd77249ce53b5ff467dc4d0900a7.zip) <br> Galaga_V3.2-250507-1139 -> [Galaga_V3.2-250715-1813](https://android.googleapis.com/packages/ota-api/package/db620c080c5edd651d38ec62f7c7af1301ad4273.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_V3.2-250715-1813) |
| 3.2 | Galaga-V3.2-250616-1258 | Galaga_V3.2-250526-1427 -> [Galaga_V3.2-250616-1258](https://android.googleapis.com/packages/ota-api/package/0fcc224468e66ef3fcc4d7d776a32179e1af3710.zip) <br> Galaga_V3.2-250507-1139 -> [Galaga_V3.2-250616-1258](https://android.googleapis.com/packages/ota-api/package/e2c1e13e78416d6449e18f7e37e1f923ff0f838a.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_V3.2-250616-1258) |
| 3.2 | Galaga-V3.2-250526-1427 | Galaga_V3.2-250507-1139 -> [Galaga_V3.2-250526-1427](https://android.googleapis.com/packages/ota-api/package/e6d8ab2dee0c6751bc5b806d316bf47b11ec2593.zip) | N/A | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_V3.2-250526-1427) | 
| 3.2 | Galaga-V3.2-250507-1139 | N/A | [此處](https://android.googleapis.com/packages/ota-api/package/2800780fa49032a870618ec026097f5a09aa805b.zip) | [此處](https://github.com/spike0en/nothing_archive/releases/tag/Galaga_V3.2-250507-1139) | 
| 3.2 | Galaga-V3.2-250425-1517 | Galaga_V3.2-250312-1750 -> [Galaga_V3.2-250425-1517](https://android.googleapis.com/packages/ota-api/package/e7e4b8e861c37de0460a8c95b358fbeb4e2a12d2.zip) | N/A | N/A |

<br>

</details> 

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

## 完整性檢查

使用以下指令驗證下載檔案的完整性：

### Bash (Linux/macOS)
```bash
sha256sum -c *-hash.sha256
```

### Windows
```powershell
certutil -hashfile <filename> SHA256
```
> 使用者也可以使用像 [OpenHashTab](https://github.com/namazso/OpenHashTab) 這樣的開源工具。

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

## 更新日誌 (Changelogs)

取得每個裝置詳細的 OTA 更新日誌，依相應的 Nothing OS 建構版本號命名：

> [!Note]
> 更新日誌僅適用於 2025 年 12 月 17 日或之後發佈的版本。

- [Nothing Phone (1)](../assets/changelogs/spacewar/)
- [Nothing Phone (2)](../assets/changelogs/pong/)
- [Nothing Phone (2a)](../assets/changelogs/pacman/)
- [Nothing Phone (2a) Plus](../assets/changelogs/pacmanpro/)
- [Nothing Phone (3a) / (3a) Pro](../assets/changelogs/asteroids/)
- [Nothing Phone (3)](../assets/changelogs/metroid/)
- [Nothing Phone (3a) Lite](../assets/changelogs/galaxian/)

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

- [CMF Phone (1)](../assets/changelogs/tetris/)
- [CMF Phone (2) Pro](../assets/changelogs/galaga/)

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

## 使用指南

### OTA 側載 (Sideloading)

> [!NOTE]
> - 側載增量 OTA 更新 **不需要** 解鎖 Bootloader。除非您是 Root 使用者，否則請跳過步驟 A。
> - 只要直接從本存檔庫下載官方增量或全量 OTA 更新，側載就是安全的。
> - 請勿使用第三方來源。Nothing Archive 中的所有韌體均直接源自 Nothing 的官方 OEM 伺服器。  
>   這可以透過檢查增量 OTA 部分的下載 URL 來驗證，這些 URL 指向官方伺服器，而非第三方檔案代管網站。
> - 內建的 Nothing OS 離線更新器僅接受 OEM 簽名的更新包。
> - 更新器在安裝前會驗證韌體雜湊值，如果使用了不正確或不匹配的 OTA zip，更新將失敗。
> - 同樣的驗證也適用於全量 OTA 包；除非其完整性完好，否則不會安裝。
> - 由於有這些檢查，在鎖定的 Bootloader 上側載官方 OTA zip 是不可能導致變磚的。
> - 對於公開測試版 (OBT) 更新，如果撥號器方法不起作用，請透過 OEM 提供的 `Nothing Beta Updater Hub`（未來名稱可能會變更）側載。
>   您可以從「設定」中啟動該介面。當您安裝了 OEM 的 Beta 更新器應用程式時，它會覆蓋原廠內建版本。
> - 視覺參考請按順序參閱[此處](../assets/sideloading)的圖片。

<br>

A. **還原原廠分割區 (僅限 Root 使用者)**  
  > **如果您的 Bootloader 已鎖定，請直接跳到 B 點！**  

1. **檢查目前的 Nothing OS 版本：**  
   - 前往 `設定 > 關於手機 > 點擊裝置橫幅`。  
   - 記下建構編號。  

2. **取得目前韌體版本的原廠映像檔：**  
   - 下載 `-boot-image.7z` 檔案。  
   - 解壓縮存檔以取得 `.img` 檔案。  

3. **識別所需的分割區：**  
   - **高通 (Qualcomm) 裝置：** `boot`, `init_boot` `vendor_boot`, `recovery`, `vbmeta`  
   - **聯發科 (MediaTek) 裝置：** `init_boot`, `vbmeta`, `lk`

4. **在 bootloader 模式下刷寫原廠分割區：**  
   > 僅需要刷寫已修改的分割區。同時根據您的 SoC 平台跳過任何缺失的分割區。 
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   fastboot flash --slot=all lk lk.img
   ```

5. **重啟至系統並透過系統更新器進行更新：**
   - 如果更新 **失敗**，請繼續下一節的手動側載。

6. **復原 Root (選用)：**
   - 更新後，您可以透過 **刷寫更新後 NOS 版本的修補 boot 映像檔** 來重新 Root。
   - 重新 Root 後 **模組將保持不變**。

<br>

B. **開始側載 (Sideloading)** 

 - **下載正確的更新韌體檔案：**  
   - 從[此處](#downloads-)尋找適合您裝置的正確 OTA 韌體檔案。

 - **如何選擇正確的檔案？**  
   - 前往儲存庫並選擇您的裝置型號。  
   - 查看「增量 OTA (Incremental OTA)」欄位。  
   - **驗證您目前的 OS 建構編號**：  
    - 前往：`設定 > 系統 > 關於手機`。  
    - 點擊 **裝置橫幅** 並記下 **建構編號**。

 - **範例：**  
   - 假設您的 **Phone (2)** 建構編號為：`Pong_U2.6-241016-1700` 
   - 假設最新可用的 OTA 更新為：`Pong_V3.0-241226-2001`
   - 對應的更新路徑將是：`Pong_U2.6-241016-1700 -> Pong_V3.0-241226-2001`
   - 確保根據您的裝置和作業系統版本選擇正確的路徑。
    - 參考[此圖](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg)以獲得更清晰的了解。

 - **建立 `ota` 資料夾：** 
   - 在裝置的 **內部儲存空間** 中建立一個名為 `ota` 的資料夾，完整路徑為：  
     ```
     /sdcard/ota/
     ```
   - 將下載的 `<韌體>.zip` 檔案移動到此資料夾中。

 - **存取 Nothing 離線 OTA 更新器：**  
    - 打開 **電話 App** 並撥打：  
      ```
      *#*#682#*#*
      ```
   - 這將啟動內建的離線更新工具。  
   - UI 可能會顯示 `NothingOfflineOtaUpdate` 或 `NOTHING BETA OTA UPDATE` —— 兩者皆可。

 - **套用更新：**  
   - 更新器會自動偵測更新檔案。  
   - 如果未偵測到，請手動瀏覽並匯入 OTA 檔案。  
   - 點擊 `Directly Apply OTA` 或 `Update`（根據 App UI）。  
   - 等待更新完成 —— 您的裝置將自動重啟。

- **備註：**  
  - 如果更新器顯示 **未知錯誤 (unknown error)**，請嘗試使用 **「Browse (瀏覽)」** 選項，而不是手動將檔案複製到 **「ota」** 資料夾。
  - 如果增量 OTA 失敗，可以側載 **全量 (Full) OTA 韌體**。
    - **全量 OTA 不能用於降級** —— 它只能更新到相同或更高的版本。
    - **已解鎖 Bootloader 的使用者** 可以透過第三方 recovery 刷寫全量 OTA（例如適用於 Phone (2) 的 OrangeFox）。
  - **並非每個發佈版本都有全量 OTA 檔案** —— 在這種情況下請使用增量更新。

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

### 解鎖 Bootloader

> [!IMPORTANT]
> - 解鎖 bootloader 會使 OEM 保固失效。但是，您可以重新刷寫原廠 ROM 並重新鎖定 bootloader 以復原保固。
> - 無論其他因素如何，您都將失去 Widevine L1/DRM 認證，這將降級至 L3（影響影音串流品質）。  
> - 您將失去 [裝置完整性 (device integrity)](https://developer.android.com/google/play/integrity/overview)，這可能會導致依賴此項的 App 停止運作，除非稍後透過 Root 權限修復。  
>   [此指南](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) 對於解決此問題可能會有幫助。 

A. 前提條件
- **備份您的資料**（解鎖將擦除所有內容）。
- **安裝 ADB & Fastboot 工具** – [在此下載](https://developer.android.com/studio/releases/platform-tools)。
- **安裝 USB 驅動程式** – [Google USB 驅動程式](https://developer.android.com/studio/run/win-usb)。
- **啟用開發者選項**：
  - `設定 > 關於手機 > 連點「建構編號」7 次。`
- **啟用 USB 偵錯與 OEM 解鎖**：
  - `設定 > 系統 > 開發者選項 > 啟用 USB 偵錯與 OEM 解鎖。`
- **移除螢幕鎖定/PIN/密碼及已登入的帳號 (選用但建議執行)**
  - 在重新鎖定 bootloader 之前移除帳號有助於防止 Google FRP (出廠重設保護) 鎖定。如果觸發了 FRP，裝置將在出廠重設後要求登入先前連結的 Google 帳號。如果您忘記憑據或無法存取帳號，您可能會被鎖在裝置之外。為了避免這種情況，建議在重新鎖定前移除所有 Google 帳號。

B. 解鎖過程
- 透過 USB 將您的手機 **連線到電腦**。
- 在 platform-tools 資料夾中 **開啟命令提示字元**：
  - Windows：`Shift + 右鍵點擊` > **在此處開啟命令提示字元/Powershell**。
  - Mac/Linux：開啟 **終端機** 並導航至 platform-tools。
- **驗證裝置連接**：
  ```sh
  adb devices
  ```
  如果出現提示，請在手機上允許 USB 偵錯。

- **重啟至 bootloader：**
   ```sh
   adb reboot bootloader
   ```

- **驗證 fastboot 連接：**
   ```sh
   fastboot devices
   ```
   如果未偵測到裝置，請重新安裝 USB 驅動程式。

- **解鎖 bootloader：**
   ```sh
   fastboot flashing unlock
   ```

- **在手機上確認：**
  - 使用 **音量鍵** 導航並使用 **電源鍵** 確認。
  - 您的裝置將 **擦除所有資料** 並重啟。

C. 解鎖後
  - 重新設定您的手機。
  - **驗證 bootloader 狀態**：
    ```sh
    設定 > 系統 > 開發者選項 > OEM 解鎖應顯示為已啟用。
    ```

  - Bootloader 現在已解鎖，您的裝置在開機時會顯示 Orange State 警告 —— 這是正常現象。

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

### Root

> [!IMPORTANT]
> - Root **會使 OEM 保固失效**，並且除非在更新前復原原廠映像檔，否則可能會破壞 OTA 更新。
> - 務必確保 **boot / init_boot 映像檔與您目前的韌體版本完全相符**。
>   刷寫不正確或不匹配的映像檔 **將導致無限重啟**。
> - **如果分割區存在，請務必優先使用 `init_boot` 而非 `boot` 映像檔來進行 Root**。
> - Root 需要 **解鎖 Bootloader**。
> - 使用者也可以參考旁邊連結的視覺指南：[orailnoor](https://www.youtube.com/watch?v=v0i4rftKNWs) | [Droidwin](https://www.youtube.com/watch?v=4T1ZHDUCBsw) | [EpicDroid](https://www.youtube.com/watch?v=vXIBfyX7s-k)。

<br>

A. **前提條件**
- **已解鎖的 bootloader** 且 **已啟用 USB 偵錯**
- 一台 **裝有 ADB & Fastboot 的電腦**  
  *或者* 另一台具備 **USB-OTG + ADB App (例如 [Bugjaeger](https://play.google.com/store/apps/details?id=eu.sisik.hackendebug&hl=en_IN))** 的 Android 手機  
  *或者* **第三方 recovery (例如 TWRP / OrangeFox / 基於 AOSP 的 recovery)**
- 對 **ADB / Fastboot** 的基本熟悉程度
- 與您目前版本相符的 **原廠韌體** (用於提取映像檔)
- 推薦的 Root 方案：
  - [Magisk](https://github.com/topjohnwu/Magisk/releases) | [安裝](https://topjohnwu.github.io/Magisk/install.html)
  - [KernelSU (KSU)](https://github.com/tiann/KernelSU) | [安裝](https://kernelsu.org/guide/installation.html)
  - [KernelSU Next (KSUN)](https://github.com/KernelSU-Next/KernelSU-Next) | [安裝](https://kernelsu-next.github.io/webpage/pages/installation.html)

<br>

B. **檢查目前的軟體版本**
- 在您的手機上導航至：設定 > 關於手機 > 點擊 Nothing OS 橫幅。
- **記下建構編號 (Build Number)**
- 範例：`Pong_B4.0-251119-1654`
- 忽略任何地區後綴，如 `IND`/`EEA`/`TUR` 等。

<br>

C. **取得原廠 Boot / Init_boot 映像檔**
- 導航至 [發佈索引 (release index)](#downloads)。
- 選擇您的 **裝置型號**
- 開啟與您的版本完全相符的 **OTA Images**
- 從發佈資產中下載相應的存檔：`*-image-boot.img.7z`。

- 解壓縮存檔並找到：
  - `init_boot.img` **(如果存在，優先使用)**
  - `boot.img` (僅在 `init_boot` 不存在時使用)

- **將映像檔傳輸到您的裝置**
  ```sh
  adb push init_boot.img /sdcard/Download/
  # 或
  adb push boot.img /sdcard/Download/
  ```

<br>

D. **修補映像檔**  

**Magisk**
- 在您的裝置上安裝最新的 Magisk APK。
- 開啟 Magisk → 安裝 → 選擇並修補檔案。
- 選擇傳輸的 `init_boot` (優先) / `boot` 映像檔。 
- Magisk 將生成：`magisk_patched-XXXXX.img`

<br>

**KernelSU / KernelSU Next**  

> [!NOTE]
> - 對於 Nothing Phone (2)：支援基於 KSU 的 Root 方法與原廠 `boot.img`。但 KSUN 或 SUSFS 支援需要使用已增加修補程式的自訂編譯核心。
> - 已知的預先修補自訂核心選項包括： 
>  [arter97 kernel](https://xdaforums.com/t/r44-arter97-kernel-for-nothing-phone-2.4631313/) - KSU 預修補。尚不支援 NOS 4.0+ | 
>  [Meteoric Kernel (EOL)](https://github.com/HELLBOY017/kernel_nothing_sm8475) - KSUN + SUSFS 預修補。不支援 NOS 4.0+。 |
   [Wild Kernel fork](https://github.com/MiguVT/Meteoric_KernelSU_SUSFS) - KSU + SUSFS 預修補。 | 
   [Wild Kernel](https://github.com/WildKernels/GKI_KernelSU_SUSFS) - KSUN + SUSFS 預修補。支援 5.10-android12。 
> - 出廠即搭載 Android 13+ vendor 的 Nothing 型號（即 Phone (2) 之後推出的型號）將支援 KSUN 修補方法。

- 修補方法與 Magisk 類似。從 KSU/KSUN 管理員中點擊「未安裝」> 修補 `init_boot.img` 並將修補後的映像檔傳送到電腦。

- 重啟至 bootloader：
  ```sh
  adb reboot bootloader
  ```

- 刷寫修補後的映像檔
  ```bash
  fastboot flash init_boot <拖放修補後的_init_boot.img>
  ```

- 重啟至系統：
  ```bash
  fastboot reboot
  ``` 

- 裝置現在應該已透過 KSU/KSUN 獲得 Root 權限。

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

### 在解鎖 Bootloader 後備份必要的分割區

> [!IMPORTANT] 
> - 解鎖 bootloader 後，在刷寫自訂 ROM 或核心 **之前**，備份 `persist`、`modemst1`、`modemst2`、`fsg` 等必要分割區至關重要。
> - 這些分割區包含重要資料，包括 IMEI、網路設定和指紋感測器校準。
> - 如果遺失或損毀，您的裝置可能會遇到 **行動網路連接遺失、指紋問題，甚至變磚**。
> - 建立備份可確保如果出問題，您可以 **還原您的裝置**。

A. 要求
- **已解鎖的 bootloader**
- **Root 權限** (透過 Magisk/KSU/Apatch)
- **Termux App** (透過 F-Droid 或 Play Store 安裝)
- **檢查分割區路徑：**
  - **高通 (Qcom) 裝置：** `/dev/block/bootdevice/by-name/`
  - **聯發科 (MTK) 裝置：** `/dev/block/by-name/`

B. 備份說明
- **對於高通 (Qualcomm) 裝置：**
  - 開啟 **Termux** 並使用以下指令授予 Root 權限：
    ```sh
    su
    ```

  - 一次性複製並貼上以下指令：
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    這將在 **內部儲存空間** 名為 **「partitions_backup」** 的資料夾中建立 **除 `super` 和 `userdata` 以外所有分割區** 的映像檔。

  - **[選用]** 如果上述指令失敗，請嘗試此替代方案：
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **對於聯發科 (MediaTek) 裝置：**
  - 開啟 **Termux** 並使用以下指令授予 Root 權限：
    ```sh
    su
    ```

  - 一次性複製並貼上所有以下指令：
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

C. 儲存備份
  - 將 **「partitions_backup」** 資料夾移動到您的 **電腦或安全儲存空間**。
  - **切勿分享這些備份！** 它們包含 IMEI 等唯一的裝置資料。

D. 還原分割區
 - **聯發科 (MTK) 裝置：**
   ```sh
   fastboot flash nvram nvram.img
   fastboot flash nvdata nvdata.img
   fastboot flash nvcfg nvcfg.img
   fastboot flash persist persist.img
   ```
   重啟至 **recovery 模式** → 執行 **出廠重設 (factory reset)** → 重啟至 **系統**。
   - 參考連結：[Nothing Phone (2a) DVT 工程樣機：復原基頻與 IMEI 記錄](https://bluehomewu.github.io/posts/Restoring-Baseband-and-IMEI-on-Nothing-Phone-2a-DVT/)
   - 該文章以繁體中文編寫。


 - **高通 (QCom) 裝置：**
   ```sh
   fastboot flash persist persist.img
   fastboot flash modemst1 modemst1.img
   fastboot flash modemst2 modemst2.img
   ```
   **在這種情況下，出廠重設不是強制性的。**

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

### 使用 Fastboot 刷寫原廠 ROM

> [!NOTE]
> - 這是手動全新安裝 (Clean Flash) 到較新版本原廠韌體或進行降級的唯一推薦方法。
> - 為了更好的理解，請參考旁邊連結的視覺指南：[Droidwin](https://www.youtube.com/watch?v=YCYEjdC3oHM) | [The Nothing Lab](https://www.youtube.com/watch?v=l0P9gosl64s) | [QZX Tech](https://www.youtube.com/watch?v=66H2MVElyAY)

A. **準備刷機資料夾：**
  - 下載適用於您的裝置型號和韌體建構版本的以下檔案，並將它們放在一個專用資料夾中：
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x
    - `-hash.sha256` - 這是選用的，但建議用於驗證映像檔的完整性並檢查是否有缺失檔案。 

  - 從[此處](https://www.7-zip.org/)安裝 7-Zip。
  - 解壓縮檔案：
    - Windows：右鍵點擊 → 解壓縮到 "*\"
    - Bash 使用者：
      `7za -y x "*.7z*"`
    - 在極少數情況下，下載管理器可能會更改分割邏輯檔案的副檔名。請將 `image-logical.7z.001.7z`、`image-logical.7z.002.7z` 等重新命名為 `image-logical.7z.001`、`image-logical.7z.002`，然後重試解壓縮。

B. **開始刷機：**
  - 從[此處](https://developer.android.com/studio/run/win-usb)安裝相容的 USB 驅動程式。
  - 確保裝置在 **bootloader 模式** 下時，**裝置管理員** 中可以看到 `Android Bootloader Interface`。
  - 如果之前使用了提取腳本，請直接執行它。否則：
    - 將所有提取的映像檔與 [Nothing Fastboot Flasher Script](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download) 移至同一個資料夾。
    - 將 `-hash.sha256` 檔案放在同一個目錄下。 
    - 務必下載最新腳本以確保包含熱修復 (hotfixes)。
  - 在連接網路的情況下執行腳本（以取得最新的 `platform-tools`）並按照提示操作：
    - 回答確認問卷。
    - 根據需要跳過或繼續執行雜湊 (hash) 檢查。 
    - 選擇是否擦除資料：(Y/N) [全新安裝 / 降級 = `Y` | 覆蓋安裝 (Dirty Flash) / 升級 = `N`]
    - 選擇是否刷寫到兩個插槽：(Y/N)
    - 停用 Android 驗證啟動 (Android Verified Boot)：(N) [請注意，如果您在此處選擇 `Y`，之後將無法重新鎖定 bootloader！]
  - 驗證所有分割區是否已成功刷寫。
    - 如果成功，選擇重啟至系統：(Y)
    - 如果發生錯誤，請重啟至 bootloader 並在解決失敗原因後重新刷寫。如果不這樣做就重啟至系統，可能會導致軟磚或硬磚。
    
<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

### 重新鎖定 Bootloader

A. **前提條件**
  - 移除 **螢幕鎖定/PIN/密碼及已登入的帳號** (選用但建議執行)。
  - 按照 [刷寫指南](#iv-flashing-the-stock-rom-using-fastboot-) 全新刷寫 **原廠 ROM**。**在具有修改分割區的情況下重新鎖定 bootloader 而不刷寫原廠韌體可能會使裝置變磚！**
  - 備份所有資料（重新鎖定將 **擦除所有內容**）。
  - 如果尚未設定，請安裝 **ADB & Fastboot 工具** 及 USB 驅動程式。

B. **重新鎖定過程**
  - 如果您在系統中，請重啟至 bootloader：
    ```sh
    adb reboot bootloader
    ```

  - 驗證 fastboot 連接：
    ```sh
    fastboot devices
    ```

  - 啟動 bootloader 重新鎖定：
    ```sh
    fastboot flashing lock
    ```

  - 在手機上確認：
    - 使用 **音量鍵** 導航並使用 **電源鍵** 確認。
    - 裝置將被格式化並重啟，bootloader 已鎖定。

C. **重新鎖定後**
  - 重新設定您的裝置。
  - Bootloader 現在已鎖定！

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

## 致謝

特別感謝：
*   **[luk1337](https://github.com/luk1337/oplus_archive)**：提供 AOSP OTA 提取工具。
*   **[arter97](https://github.com/arter97/nothing_archive)**：為 Phone (2) 適配存檔。
*   **[PhatWalrus](https://github.com/PHATWalrus)** & **[Daniel Springer](https://github.com/Daniel210191)**：提供自代管 runner 實例。
*   **[LukeSkyD](https://xdaforums.com/t/nothing-phone-1-repo-nos-ota-img-guide-root.4464039/)**：提供早期建構參考。
*   **[XelXen](../assets/branding)**：提供專案品牌與設計。

<div align="center">
  <br>
  <span style="font-size: 30px;">••••••••••••••••••••••</span>
  <br>
</div>

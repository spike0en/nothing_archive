[English](README.md) | [Deutsch](README_de-DE.md) | [Español](README_es-ES.md) | [Français](README_fr-FR.md) | [हिन्दी](README_hi-IN.md) | [Italiano](README_it-IT.md) | [日本語](README_ja-JP.md) | [Русский](README_ru-RU.md) | [Türkçe](README_tr-TR.md) | **简体中文**

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

## 目录 📑

- [关于项目](#关于项目-)
- [免责声明](#免责声明-)
- [注释](#注释-)
- [分类](#分类-)
- [下载](#下载-)
- [完整性检查](#完整性检查-)
- **指南**
  - [OTA 侧载](#i-ota-侧载-)
  - [解锁 Bootloader](#ii-解锁-bootloader-)
  - [备份分区](#iii-备份分区-)
  - [使用 Fastboot 刷写 原厂 ROM](#iv-使用-fastboot-刷写-原厂-rom-)
  - [重新锁定 Bootloader](#v-重新锁定-bootloader-)
- [致谢](#致谢-)
- [支持该项目](#支持该项目-)

---

## 关于项目 🔍

**Nothing Archive** 是最新的 Nothing OS 固件仓库，提供适用于 **Nothing Phone 1、Phone 2、Phone 2a、Phone 2a Plus、Phone 3a、Phone 3a Pro** 和 **CMF Phone 1** 的官方 OTA 更新、完整固件包和原厂 OTA 镜像，所有文件均直接来自官方 OEM 服务器。所有文件均已存档，确保轻松访问和长期保存。

### 功能与优势：

- 📡 **直观的 OTA 目录** – 跟踪来自官方服务器的 **Nothing OS OTA 更新链接**，为 Nothing 和 CMF 设备提供**增量更新 和 完整更新**。
- 🛠️ **允许手动安装（侧载）** – 在分阶段发布期间或 OTA 更新失败时，允许使用内置的**离线 Nothing OS 离线更新程序 或 Beta 更新程序应用**或通过**ADB 侧载**使用第三方 Recovery 手动安装**Nothing OS 固件**。
- 📦 **原厂 OTA 镜像** – 利用 AOSP 的 OTA 提取工具提供**未修改的 OTA 镜像**，该工具允许提取增量 OTA 更新，从而在**完整固件包**不可用时实现**升级、降级和分区刷新**。
- 🔓 **支持 Root 和 取消 Root** – 为 Magisk、KernelSU 和 Apatch 提供**原厂启动镜像**，同时还允许通过刷新原厂 boot 进行**取消 Root**，以便在检测到修改的分区时保持**OTA 更新功能**。
- ⚡ **刷入固件 和 设备救砖** – 提供**fastboot 可刷入的 Nothing OS 固件**，只要可以访问 fastboot，就可以帮助**解决启动循环、设备救砖并恢复原厂 ROM**。

---

## 免责声明 🚨

使用此存档，即表示用户确认并接受以下条款：
- **✅ 真实性** – 此存档中的所有固件文件均**未经修改、未经更改，并直接来自原始设备制造商 (OEM)**。
- **⚠️ 刷机风险自负** – 在**已解锁 BootLoader**的设备上安装固件存在固有风险。请仔细遵循说明，**避免设备变砖**。
- **📌 兼容性** – 安装前，请确保固件与您的**Nothing 或 CMF 设备型号**匹配。
- **🚫 无保修或官方支持** – 这是一个**社区驱动的项目，与 [Nothing](https://nothing.tech)** 无关。任何**更新失败、软件错误或设备问题**均由原始设备制造商 (OEM) 负责。作者和贡献者**对因刷机错误、误用或固件修改而导致的设备变砖**概不负责。请务必**直接从此存档**下载固件，以确保其完整性。
- **🛡️ 开源完整性** – **仅在注明来源的情况下**才允许重新分发。鼓励用户支持并分享此项目，**以维护其可用性**。**严禁转售免费固件**！

---

## 注释 📝

- OTA 镜像的版本标记和命名格式为：`<POST_OTA_VERSION>` 和 `<POST_OTA_VERSION>`_`<NothingOS 版本>`，分别如[此处](https://github.com/spike0en/nothing_archive/releases) 所示。
- 特定地区的版本标记格式为：`<POST_OTA_VERSION>`-`<GLO/EEA>`，适用于某些未统一的旧版“Spacewar”版本。此处，G = GLO（全球），E = EEA（欧洲经济区）。
- Nothing OS 公开测试版在适用的情况下以 `-OB` 表示。
- Android 开发者预览版标记为 `0.0.0-dev`+`<设备代号>`.`<增量包日期>`。
- 除非发行说明中另有明确说明，否则此处发布的版本与设备的 所有区域 和 颜色 版本 兼容。
- 有关解释所需增量 OTA 固件的详细说明，请参阅[本节](#i-ota-sideloading-)。

---

## 分类 📂

**未经修改**的 OTA 镜像文件以 `.7z` 格式存档，并根据其分区性质分为三类：**Boot**、**Firmware** 和 **Logical**。各型号的分区如下：

请参阅[此](https://github.com/spike0en/nothing_archive/tree/main/docs#categorization-)部分。

---

## 下载 📥

从下方下拉列表中选择您的**设备型号**，即可访问其**发布目录**：

请参阅[此](https://github.com/spike0en/nothing_archive/tree/main/docs#downloads-)部分。

---

## 完整性检查✅

- 您可以使用以下任一命令检查下载的 OTA 映像文件的完整性：

``` bash
md5sum -c *-hash.md5
sha1sum -c *-hash.sha1
sha256sum -c *-hash.sha256
xxh128sum -c *-hash.xxh128
```
- xxh128 通常是速度最快的。

---

## 指南 📖

### I. OTA 侧载 🔄

> 如需查看图片，请按顺序参阅[这些图片](https://github.com/spike0en/nothing_archive/tree/main/assets/sideloading)。

<br>

A. **免责声明**
- 只要您**直接从 Spike 的 Nothing Archive** 下载，侧载或手动安装官方增量 OTA 更新**完全安全**。
- **请勿使用第三方来源**——Nothing Archive 中的所有固件均直接来自 OEM 厂商的官方服务器。
- **内置的 Nothing OS 离线更新工具**仅接受**由 OEM 厂商签名**的更新，以确保安全。
- **更新程序会在安装前验证固件的哈希值**。

<br>

B. **恢复出厂分区（仅限已 root 用户）**
> **如果您的 BootLoader 已锁定，请直接跳至步骤 C！**

1. **检查您当前的 Nothing OS 版本：**
- 前往“设置 > 关于手机 > 点按 设备 一栏”。
- 记下版本号。

2. **获取当前固件版本的原厂镜像：**
- 下载 `-boot-image.7z` 文件。
- 解压该文件以获取 `.img` 文件。

3. **确定所需分区：**
- **高通 设备**：`boot`、`init_boot`、`vendor_boot`、`recovery`、`vbmeta`
- **联发科 设备**：`init_boot`、`recovery`、`vbmeta`

4. 在BootLoader模式下**刷写原厂分区**：
> 只需刷写已修改的分区。同时，根据您的 SoC 平台，跳过任何缺失的分区。
```sh
fastboot flash boot boot.img
fastboot flash recovery recovery.img
fastboot flash vendor_boot vendor_boot.img
fastboot flash vbmeta vbmeta.img
fastboot flash init_boot init_boot.img
```

5. **重启系统并通过系统更新程序更新：**
- 如果更新**失败**，请继续执行下一部分中的**手动侧载**。

6. **恢复 Root 权限（可选）：**
- 更新后，您可以通过**刷写已修补的Boot镜像**来重新获取 Root 权限，使其适用于更新后的 NOS 版本。
- **重新获取 Root 权限后，模块将保持不变**。

<br>

C. **继续侧载**

- **下载正确的更新固件文件**：
- 从[此处](#downloads-)找到适合您设备的正确 OTA 固件文件。

- **如何选择正确的文件？**
- 进入仓库并选择您的设备型号。
- 查找“增量 OTA”列。
- **验证您当前的操作系统版本号**：
- 前往：“设置 > 系统 > 关于手机”。
- 点击**设备**一栏并记下**版本号**。

- **示例：**
- 假设您的**Phone  (2)** 版本号为：`Pong_U2.6-241016-1700`
- 假设最新可用的 OTA 更新为：`Pong_V3.0-241226-2001`
- 相应的更新路径为：`Pong_U2.6-241016-1700 -> Pong_V3.0-241226-2001`
- 请确保根据您的设备和操作系统版本选择正确的路径。
- 请参阅[此](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg)以获得更清晰的说明。

- **创建 `ota` 文件夹：**
- 在设备的**内部存储**中创建一个名为 `ota` 的文件夹，完整路径为：
```
/sdcard/ota/
```
- 将下载的 `<firmware>.zip` 文件移动到此文件夹。

- **访问 Nothing 离线 OTA 更新程序：**
- 打开**拨号**并拨打：
```
*#*#682#*#*
```
- 这将启动内置的离线更新工具。
- 界面可能会显示 `NothingOfflineOtaUpdate` 或 `NOTHING BETA OTA UPDATE` — 两种方式均可。

- **应用更新：**
- 更新程序将自动检测更新文件。
- 如果未检测到，请手动浏览并导入 OTA 文件。
- 点击“Directly Apply OTA”或“Update”（根据应用显示的界面选择）。
- 等待更新完成 - 您的设备将自动重启。

- **注意：**
- 如果更新程序显示**未知错误**，请尝试使用**浏览**选项，而不是手动将文件复制到**ota**文件夹。
- 如果增量 OTA 失败，则可以侧载**完整 OTA 固件**。
- **完整 OTA 无法用于降级** - 它只能更新到相同或更高的版本。
- **解锁了BootLoader的用户**可以通过第三方 Recovery（例如，OrangeFox for Phone (2)）刷写完整 OTA。
- **并非每个版本都包含完整 OTA 文件** - 在这种情况下，请使用增量 OTA 文件。
---

### II. 解锁 Bootloader 🔓

A. 前提条件
- **备份您的数据**（解锁将清除所有数据）。
- **安装 ADB 和 Fastboot 工具** – [点击此处下载](https://developer.android.com/studio/releases/platform-tools)。
- **安装 USB 驱动程序** – [Google USB 驱动程序](https://developer.android.com/studio/run/win-usb)。
- **启用开发者选项**：
- `设置 > 关于手机 > 连续点击“版本号”7次 `
- **启用 USB 调试和 OEM 解锁**：
- `设置 > 系统 > 开发者选项 > 启用 USB 调试和 OEM 解锁`
- **移除锁屏密码/PIN 码/密码以及已登录的账户（可选，但建议操作）**
- 在重新锁定 BootLoader 之前移除账户有助于防止 Google FRP（恢复出厂设置保护）锁定。如果触发 FRP，设备将在恢复出厂设置后要求输入之前关联的 Google 账户。如果您忘记了登录凭据或无法访问该账户，您可能会被锁定在设备之外。为避免这种情况，建议您在重新锁定之前移除所有 Google 账户。

B. 解锁流程
- 通过 USB 将您的手机**连接到电脑**。

- 在 platform-tools 文件夹中**打开命令提示符**：
- Windows：按住 `Shift 键 并 右键单击` > **在此处打开 命令提示符/Powershell 窗口**。
- Mac/Linux：打开**终端**并进入至 platform-tools。
- **验证设备连接**：
```sh
adb devices
```
如果出现提示，请在手机上允许 USB 调试。

- **重启至 BootLoader**：
```sh
adb restart bootloader
```

- **验证 fastboot 连接**：
```sh
fastboot devices
```
如果未检测到设备，请重新安装 USB 驱动程序。

- **解锁 BootLoader**：
```sh
fastboot flashing unlock
```

- **在手机上确认**：
- 使用**音量键**选择，并使用**电源键**确认。
- 您的设备将**清除所有数据**并重启。

C. 解锁后
- 重新设置您的手机。
- **验证 BootLoader 状态**：
```sh
设置 > 系统 > 开发者选项 > OEM 解锁应已启用。
```

-  BootLoader 现已解锁，您的设备将在启动时显示橙色状态警告——这是正常现象。

---

### III. 备份分区 💾

A. 为什么要备份？
- 解锁 BootLoader 后，在刷入自定义 ROM 或内核之前，务必备份重要分区，例如 `persist`、`modemst1`、`modemst2`、`fsg` 等。
- 这些分区包含重要数据，包括 IMEI、网络设置和指纹传感器校准。
- 如果丢失或损坏，您的设备可能会出现**数据网络连接问题、指纹问题，甚至变砖**。
- 创建备份可确保您在出现问题时能够**恢复设备**。

B. 要求
- **解锁引导程序**
- **Root 权限**（通过 Magisk/KSU/Apatch 安装）
- **Termux 应用**（通过 F-Droid 或 Play Store 安装）
- **检查分区路径：**
- **高通 设备：** `/dev/block/bootdevice/by-name/`
- **联发科 设备：** `/dev/block/by-name/`

C. 备份说明
- **对于 高通 设备：**
- 打开 **Termux** 并使用以下命令授予 root 权限：
```sh
su
```

- 一次性复制并粘贴以下命令：
```sh
mkdir -p /sdcard/partitions_backup
ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
```
这将在**内部存储**中名为**partitions_backup**的文件夹中备份**除 `super` 和 `userdata` 之外的所有分区。

- **[可选]** 如果上述命令失败，请尝试以下替代方法：
```sh
mkdir -p /sdcard/partitions_backup
for part in /dev/block/bootdevice/by-name/*; do \
[[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
cp -f "$partition" /sdcard/partitions_backup/;done
```

- **对于 联发科 设备：**
- 打开 **Termux** 并使用以下命令授予 root 权限：
```sh
su
```

- 一次性复制并粘贴以下所有命令：
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

D. 存储备份
- 将**partitions_backup**文件夹移动到您的**电脑或安全存储设备**。
- **请勿共享这些备份**！它们包含设备的唯一数据，例如 IMEI。

E. 恢复分区
- **联发科 设备：**
```sh
fastboot flash nvram nvram.img
fastboot flash nvdata nvdata.img
fastboot flash nvcfg nvcfg.img
fastboot flash persist persist.img
```
重启至**恢复模式** → 执行**恢复出厂设置** → 重启至**系统**。

- **高通 设备：**
```sh
fastboot flash persist persist.img
fastboot flash modemst1 modemst1.img
fastboot flash modemst2 modemst2.img
```
**在这种情况下无需恢复出厂设置。**

---

### IV. 使用 Fastboot 刷写 原厂 ROM ⚡

> QZX Tech 的图文教程：[此处](https://www.youtube.com/watch?v=66H2MVElyAY)

A. **刷写文件夹准备**：
- 根据您的设备型号和固件版本下载以下文件，并将它们放在一个专门的文件夹中：
- image-boot.7z
- image-firmware.7z
- image-logical.7z.001-00x

- 从[此处](https://www.7-zip.org/)安装 7-Zip。
- 解压文件：
- Windows：右键点击 → 解压到“*\”
- Bash 用户：
7za -y x "*7z*"

B. **继续刷写**：
- 从[此处](https://developer.android.com/studio/run/win-usb)安装兼容的 USB 驱动程序。
- 确保设备处于 **BootLoader模式** 时，**设备管理器** 中显示 `Android Bootloader Interface`。
- 如果之前使用过提取脚本，请直接执行。否则：
- 将所有提取的映像文件与 [Fastboot 刷写脚本](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download) 一起移动到一个文件夹中。
- 请务必下载最新的脚本，以确保包含修补程序。
- 在连接到互联网的情况下运行脚本（以获取最新的 `platform-tools`），并按照提示操作：
- 回答确认问题。
- 选择是否清除所有数据：(Y/N)
- 选择是否同时刷写到两个槽位：(Y/N)
- 禁用 Android Verified Boot (AVB)：(N)
- 验证所有分区是否已成功刷写。
- 如果成功，选择重启系统：(Y)
- 如果出现错误，请重启至BootLoader，并在解决故障后重新刷入。

---

### V. 重新锁定 Bootloader 🔒

A. **前提条件**
- 移除**锁屏密码/PIN 码/密码以及已登录账户**（可选，但建议操作）。
- 按照[刷机指南](#iv-flashing-the-stock-rom-using-fastboot-)彻底刷写**原厂 ROM**。**如果未刷写原厂固件，而使用修改过的分区重新锁定 BootLoader 可能会导致设备变砖！**
- 备份所有数据（重新锁定将**清除所有内容**）。
- 如果尚未安装**ADB 和 Fastboot 工具**以及 USB 驱动程序，请安装它们。

B. **开始锁定 BootLoader**
- 如果您已进入系统，请重启至 BootLoader ：
```sh
adb restart bootloader
```

- 验证 fastboot 连接情况：
```sh
fastboot devices
```

- 运行 BootLoader 锁定命令：
```sh
fastboot flashing lock
```

- 在手机上确认：
- 使用**音量键**选择，并使用**电源键**确认。
- 设备将被格式化、锁定 BootLoader 并 重启。

C. **锁定 BootLoader 后**
- 重新设置您的设备。
- BootLoader 现已锁定！

---

## 致谢 🤝

特别感谢以下贡献者的宝贵工作和支持：
- **[luk1337](https://github.com/luk1337/oplus_archive)** – 率先使用 AOSP 的 OTA 提取工具，实现了增量 OTA 更新的提取。
- **[arter97](https://github.com/arter97/nothing_archive)** – 将上述项目改编为 **Nothing Phone (2)**。
- **[LukeSkyD](https://github.com/LukeSkyD)** – 维护 [Nothing Phone (1) 代码库](https://xdaforums.com/t/nothing-phone-1-repo-nos-ota-img-guide-root.4464039/)，该代码库是早期版本的重要参考。
- **[XelXen](https://github.com/XelXen)** - 设计了项目的 logo 和 banner。
- 为本地化工作做出贡献的个人，帮助更广泛的受众可以使用该项目。

---

## 支持该项目 ⭐

如果此存档对您有帮助，请考虑[为该仓库加星标](https://github.com/spike0en/nothing_archive/stargazers)。您的支持有助于保持项目的活跃度和可见性！

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
</picture>

---

[English](README.md) | [Deutsch](README_de-DE.md) | [Español](README_es-ES.md) | [Français](README_fr-FR.md) | [हिन्दी](README_hi-IN.md) | [Italiano](README_it-IT.md) | **日本語** | [Русский](README_ru-RU.md) | [Türkçe](README_tr-TR.md)

# Nothing Archive

<img src="../assets/branding/logo.png" width="96" alt="Nothing Archive ロゴ">

[![Total Downloads](https://img.shields.io/github/downloads/spike0en/nothing_archive/total?logo=github&logoColor=white&label=Total%20Downloads&color=007377)](https://github.com/spike0en/nothing_archive/releases)
[![Latest Release](https://img.shields.io/github/release/spike0en/nothing_archive?label=Latest%20Release&logo=git&logoColor=white&color=1E6091)](https://github.com/spike0en/nothing_archive/releases/latest)

[![Open Pull Requests](https://img.shields.io/github/issues-pr/spike0en/nothing_archive?logo=github&color=F4A261)](https://github.com/spike0en/nothing_archive/pulls)
[![Workflow Status](https://img.shields.io/github/actions/workflow/status/spike0en/nothing_archive/dump.yml?branch=main&label=Build&color=2DC653&logo=github)](https://github.com/spike0en/nothing_archive/actions/workflows/dump.yml)
[![Closed Pull Requests](https://img.shields.io/github/issues-pr-closed/spike0en/nothing_archive?logo=github&color=E76F51)](https://github.com/spike0en/nothing_archive/pulls?q=is%3Apr+is%3Aclosed)


[![Contributors](https://img.shields.io/github/contributors/spike0en/nothing_archive?logo=github&color=9B5DE5)](https://github.com/spike0en/nothing_archive/graphs/contributors)
[![Stars](https://img.shields.io/github/stars/spike0en/nothing_archive?logo=github&color=D4AF37)](#プロジェクトのサポート-)
[![Forks](https://img.shields.io/github/forks/spike0en/nothing_archive?logo=github&color=468FAF)](https://github.com/spike0en/nothing_archive/network/members)

---

## 目次 📑

- [プロジェクトについて](#概要-)
- [免責事項](#免責事項-)
- [注意点](#注意点-)
- [分類](#分類-)
- [ダウンロード](#ダウンロード-)
- [整合性チェック](#整合性チェック-)
- **ガイド**
  - [OTAサイドローディング](#i-otaサイドローディング-)
  - [ブートローダーのアンロック](#ii-ブートローダーのアンロック-)
  - [パーティションのバックアップ](#iii-ブートローダーアンロック後の必須パーティションのバックアップ-)
  - [Fastbootを使用したストックROMのフラッシュ](#iv-fastbootを使用したストックromのフラッシュ-)
  - [ブートローダーのリロック](#v-ブートローダーのリロック-)
- [謝辞](#謝辞-)
- [プロジェクトのサポート](#プロジェクトのサポート-)

---

## 概要 🔍

**Nothing Archive** は、最新のNothing OSファームウェアリポジトリであり、**Nothing Phone 1, Phone 2, Phone 2a, Phone 2a Plus, Phone 3a, Phone 3a Pro**、および**CMF Phone 1**向けの公式OTAアップデート、完全なファームウェアパッケージ、ストックOTAイメージを提供しています。これらはすべて公式OEMサーバーから直接取得されています。すべてのファイルは[アーカイブ](https://archive.org/details/nothing-archive)されており、簡単なアクセスと長期保存が保証されています。

### 特徴と利点:

- 📡 **直接OTAインデックス作成** – 公式サーバーからの**Nothing OS OTAアップデートリンク**を追跡し、NothingおよびCMFデバイス向けの**差分および完全アップデート**へのアクセスを提供します。
- 🛠️ **手動インストール（サイドローディング）** – 段階的なロールアウト中やOTAアップデートが失敗した場合に、内蔵の**Nothing OSオフラインアップデーターまたはベータアップデーターアプリ**、または利用可能な場合はカスタムリカバリを使用した**ADBサイドロード**経由で、**Nothing OSファームウェアを手動でインストール**します。
- 📦 **ストックOTAイメージ** – AOSPのOTA抽出ツールを利用した**未変更のOTAイメージ**を提供します。これにより、**完全なファームウェアパッケージ**が利用できない場合に、差分OTAアップデートの抽出が可能になり、**アップグレード、ダウングレード、およびパーティションのフラッシュ**が可能になります。
- 🔓 **ルート化およびルート解除のサポート** – **Magisk、KernelSU、およびApatch向けのストックブートイメージ**を提供すると同時に、変更されたパーティションが検出された場合に元のブートイメージをフラッシュして**OTAアップデート機能を維持**することで**ルート解除**を可能にします。
- ⚡ **ファームウェアのフラッシュとデバイスの復旧** – **fastbootでフラッシュ可能なNothing OSファームウェア**を提供し、fastbootにアクセスできる限り、**ブートループの解決、ソフトブリックしたデバイスの回復、およびストックROMの復元**を支援します。

---

## 免責事項 🚨

このアーカイブを使用することにより、ユーザーは以下の条件を承認し、同意するものとします:
- **✅ 真正性** – このアーカイブ内のすべてのファームウェアファイルは、**変更されておらず、改変されておらず、OEMから直接**取得されています。
- **⚠️ 自己責任でのフラッシュ** – **アンロックされたブートローダー**を持つデバイスにファームウェアをインストールすることには、固有のリスクが伴います。**デバイスをブリックしないように**、指示に注意深く従ってください。
- **📌 互換性** – インストール前に、ファームウェアがご使用の**NothingまたはCMFデバイスのバリアント**と一致することを確認してください。
- **🚫 保証または公式サポートなし** – これは**コミュニティ主導のプロジェクトであり、[Nothing](https://nothing.tech)とは無関係**です。**アップデートの失敗、ソフトウェアのバグ、またはデバイスの問題**は、引き続きOEMの責任となります。作成者および貢献者は、誤ったフラッシュ、誤用、またはファームウェアの変更による**ブリックしたデバイスに対して責任を負いません**。整合性を確保するために、常に**このアーカイブから直接**ファームウェアをダウンロードしてください。
- **🛡️ オープンソースの整合性** – 再配布は、**適切な帰属表示がある場合にのみ**許可されます。ユーザーは、**その可用性を維持するために**、このプロジェクトをサポートし、共有することが奨励されます。**無料で入手可能なファームウェアの転売は固く禁じられています！**

---

## 注意点 📝

- OTAイメージのリリースは、`<NothingOSバージョン>`+`<デバイスコードネーム>`.`<差分日付>` および `<POST_OTA_VERSION>`_`<NothingOSバージョン>` の形式でタグ付けおよび命名され、それぞれ[こちら](https://github.com/spike0en/nothing_archive/releases)に示されています。
- 地域固有のリリースは、`<NothingOSバージョン>`-`<GまたはE>`+`<デバイスコードネーム>`.`<差分日付>` の形式でタグ付けされます。これは、統一されていない特定の古い `Spacewar` ビルドに適用されます。ここで、G = GLO（グローバル）、E = EEA（欧州経済領域）です。
- Nothing OSのバージョンがX.Y.ZaおよびX.Yの形式のリリースの場合、適切なソートのためにタグはそれぞれX.Y.0-AおよびX.Y.0に名前変更されます（例：`2.5.5A` → `2.5.5-A`、`2.6` → `2.6.0`、`3.0` → `3.0.0`）。
- Nothing OS Open Betaリリースは、該当する場合 `-OB` で示されます。
- Android Developer Previewリリースは、`0.0.0-dev`+`<デバイスコードネーム>`.`<差分日付>` としてタグ付けされます。
- リリースノートで特に明記されていない限り、ここで公開されているリリースは、デバイスのすべての地域およびカラーバリアントと互換性があります。
- 必要な差分OTAファームウェアの解釈に関する詳細な手順については、[このセクション](#i-otaサイドローディング-)を参照してください。

---

## 分類 📂

**未変更**のストックOTAイメージファイルは `.7z` 形式でアーカイブされ、パーティションの性質に基づいて3つの異なるグループに分類されます：**Boot**、**Firmware**、および**Logical**。それぞれのモデルは以下の通りです：

[この](https://github.com/spike0en/nothing_archive/tree/main/docs#categorization-)セクションを参照してください。

---

## ダウンロード 📥

以下のドロップダウンリストから**デバイスモデル**を選択して、その**リリースインデックス**にアクセスしてください：

[この](https://github.com/spike0en/nothing_archive/tree/main/docs#downloads-)セクションを参照してください。

---

## 整合性チェック ✅

- ダウンロードしたOTAイメージファイルの整合性は、以下のいずれかのコマンドで確認できます：

``` bash
  md5sum -c *-hash.md5
  sha1sum -c *-hash.sha1
  sha256sum -c *-hash.sha256
  xxh128sum -c *-hash.xxh128
```
- 通常、xxh128が最も高速です。

---

## ガイド 📖

### I. OTAサイドローディング 🔄

> 視覚的な参考資料については、[これらの画像](https://github.com/spike0en/test/tree/main/assets/sideloading)をそれぞれの順序で参照してください。

<br>

A. **免責事項**
  - Spike’s Nothing Archiveから**直接ダウンロード**する限り、公式の差分OTAアップデートのサイドローディングまたは手動インストールは**完全に安全**です。
  - **サードパーティのソースを使用しないでください**—Nothing Archiveのすべてのファームウェアは、OEMの公式サーバーから直接取得されています。
  - **内蔵のNothing OSオフラインアップデーターツール**は、セキュリティを確保するために**OEMによって署名された**アップデートのみを受け入れます。
  - **アップデーターは**、インストール前にファームウェアの**ハッシュを検証**します。

<br>

B. **ストックパーティションの復元（ルート化ユーザーのみ）**
  > **ブートローダーがロックされている場合は、ポイントCに直接進んでください！**

1. **現在のNothing OSバージョンを確認します：**
   - `設定 > 電話情報 > デバイスバナーをタップ` に移動します。
   - ビルド番号をメモします。

2. **現在のファームウェアビルド用のストックイメージを取得します：**
   - `-boot-image.7z` ファイルをダウンロードします。
   - アーカイブを解凍して `.img` ファイルを取得します。

3. **必要なパーティションを特定します：**
   - **Qualcommデバイス：** `boot`, `init_boot` `vendor_boot`, `recovery`, `vbmeta`
   - **MediaTekデバイス：** `init_boot`, `recovery`, `vbmeta`

4. ブートローダーモードで**ストックパーティションをフラッシュ**します：
   > 変更されたパーティションのみをフラッシュする必要があります。また、SoCプラットフォームに基づいて不足しているパーティションはスキップしてください。
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   ```

5. **システムに再起動し、システムアップデーター経由でアップデートします：**
   - アップデートが**失敗**した場合は、次のセクションの**手動サイドローディング**に進みます。

6. **ルートの復元（オプション）：**
   - アップデート後、更新されたNOSバージョン用の**パッチ適用済みブートイメージをフラッシュ**することで、再度ルート化できます。
   - 再ルート化後も**モジュールはそのまま残ります**。

<br>

C. **サイドローディングの続行**

 - **正しいアップデートファームウェアファイルをダウンロードします：**
   - [こちら](#ダウンロード-)から、お使いのデバイスに適した正しいOTAファームウェアファイルを見つけます。

 - **正しいファイルの選択方法は？**
   - リポジトリに移動し、デバイスモデルを選択します。
   - 差分OTA列を探します。
   - **現在のOSビルド番号を確認します**：
     - `設定 > システム > 電話情報` に移動します。
     - **デバイスバナー**をタップし、**ビルド番号**をメモします。

 - **例：**
   - あなたの**Phone (2)**のビルド番号が `Pong_U2.6-241016-1700` だとします。
   - 利用可能な最新のOTAアップデートが `Pong_V3.0-241226-2001` であると仮定します。
   - 対応するアップデートパスは `Pong_U2.6-241016-1700 -> Pong_V3.0-241226-2001` となります。
   - デバイスとOSバージョンに基づいて正しいパスを選択してください。
     - より明確にするために、[これ](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg)を参照してください。

 - **`ota` フォルダを作成します：**
   - デバイスの**内部ストレージ**に `ota` という名前のフォルダを作成します。フルパスは次のとおりです：
     ```
     /sdcard/ota/
     ```
   - ダウンロードした `<firmware>.zip` ファイルをこのフォルダに移動します。

 - **NothingオフラインOTAアップデーターにアクセスします：**
    - **電話アプリ**を開き、以下をダイヤルします：
      ```
      *#*#682#*#*
      ```
   - これにより、内蔵のオフラインアップデーターツールが起動します。
   - UIには `NothingOfflineOtaUpdate` または `NOTHING BETA OTA UPDATE` と表示される場合がありますが、どちらも機能します。

 - **アップデートを適用します：**
   - アップデーターはアップデートファイルを自動的に検出します。
   - 検出されない場合は、手動でOTAファイルを参照してインポートします。
   - `Directly Apply OTA` または `Update`（アプリのUIに基づく）をタップします。
   - アップデートが完了するのを待ちます—デバイスは自動的に再起動します。

- **注意：**
  - アップデーターが**不明なエラー**を表示する場合は、ファイルを**"ota"**フォルダに手動でコピーする代わりに、**"参照"**オプションを使用してみてください。
  - 差分OTAが失敗した場合、**完全なOTAファームウェア**をサイドロードできます。
    - **完全なOTAはダウングレードには使用できません**—同じビルドまたはそれ以上のビルドにのみアップデートできます。
    - **ブートローダーがアンロックされているユーザー**は、カスタムリカバリ（例：Phone (2)用のOrangeFox）経由で完全なOTAをフラッシュできます。
  - **すべてのリリースに完全なOTAファイルがあるわけではありません**—そのような場合は代わりに差分を使用してください。

---

### II. ブートローダーのアンロック 🔓

A. 前提条件
- **データをバックアップ**します（アンロックするとすべて消去されます）。
- **ADB & Fastbootツールをインストール**します – [こちらからダウンロード](https://developer.android.com/studio/releases/platform-tools)。
- **USBドライバーをインストール**します – [Google USBドライバー](https://developer.android.com/studio/run/win-usb)。
- **開発者向けオプションを有効にします**：
  - `設定 > 電話情報 > 「ビルド番号」を7回タップ`。
- **USBデバッグとOEMロック解除を有効にします**：
  - `設定 > システム > 開発者向けオプション > USBデバッグとOEMロック解除を有効にする`。
- **画面ロック/PIN/パスワードおよびログイン済みアカウントを削除します（オプションですが推奨）**
  - ブートローダーをリロックする前にアカウントを削除すると、Google FRP（出荷時設定へのリセット保護）ロックを防ぐのに役立ちます。FRPがトリガーされると、デバイスは工場出荷時設定へのリセット後に以前にリンクされたGoogleアカウントを要求します。資格情報を忘れたり、アカウントにアクセスできない場合、デバイスからロックアウトされる可能性があります。これを回避するには、リロックする前にすべてのGoogleアカウントを削除することをお勧めします。

B. アンロックプロセス
- **PCにUSB経由でスマートフォンを接続**します。
- platform-toolsフォルダで**コマンドプロンプトを開きます**：
  - Windows：`Shift + 右クリック` > **ここでコマンドプロンプト/Powershellを開く**。
  - Mac/Linux：**ターミナル**を開き、platform-toolsに移動します。
- **デバイス接続を確認します**：
  ```sh
  adb devices
  ```
  プロンプトが表示されたら、スマートフォンでUSBデバッグを許可します。

- **ブートローダーに再起動します：**
   ```sh
   adb reboot bootloader
   ```

- **fastboot接続を確認します：**
   ```sh
   fastboot devices
   ```
   デバイスが検出されない場合は、USBドライバーを再インストールします。

- **ブートローダーをアンロックします：**
   ```sh
   fastboot flashing unlock
   ```

- **スマートフォンで確認します：**
  - **音量キー**を使用して移動し、**電源ボタン**で確認します。
  - デバイスは**すべてのデータを消去**し、再起動します。

C. アンロック後
  - スマートフォンを再度セットアップします。
  - **ブートローダーの状態を確認します**：
    ```sh
    設定 > システム > 開発者向けオプション > OEMロック解除が有効になっているはずです。
    ```

  - ブートローダーは現在アンロックされており、デバイスは起動時にオレンジ色の状態警告を表示します—これは正常です。

---

### III. ブートローダーアンロック後の必須パーティションのバックアップ 💾

A. なぜバックアップするのか？
- ブートローダーをアンロックした後、カスタムROMやカーネルをフラッシュする**前に**、`persist`、`modemst1`、`modemst2`、`fsg`などの必須パーティションをバックアップすることが重要です。
- これらのパーティションには、IMEI、ネットワーク設定、指紋センサーのキャリブレーションなどの重要なデータが含まれています。
- 紛失または破損した場合、デバイスで**携帯電話接続の喪失、指紋の問題、さらにはブリック**が発生する可能性があります。
- バックアップを作成することで、何か問題が発生した場合に**デバイスを復元**できます。

B. 要件
- **アンロックされたブートローダー**
- **ルートアクセス**（Magisk/KSU/Apatch経由）
- **Termuxアプリ**（F-DroidまたはPlayストア経由でインストール）
- **パーティションパスを確認します：**
  - **Qcomデバイス：** `/dev/block/bootdevice/by-name/`
  - **MTKデバイス：** `/dev/block/by-name/`

C. バックアップ手順
- **Qualcomm（QCom）デバイスの場合：**
  - **Termux**を開き、以下を使用してルートアクセスを許可します：
    ```sh
    su
    ```

  - 以下のコマンドを一度にコピーして貼り付けます：
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    これにより、**"partitions_backup"**という名前のフォルダ内の**内部ストレージ**に、**`super`と`userdata`を除くすべてのパーティション**のイメージファイルが作成されます。

  - **[オプション]** 上記のコマンドが失敗した場合は、次の代替手段を試してください：
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **MediaTek（MTK）デバイスの場合：**
  - **Termux**を開き、以下を使用してルートアクセスを許可します：
    ```sh
    su
    ```

  - 以下のすべてのコマンドを一度にコピーして貼り付けます：
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

D. バックアップの保存
  - **"partitions_backup"**フォルダを**PCまたは安全なストレージ**に移動します。
  - **これらのバックアップを共有しないでください！** これらにはIMEIなどの一意のデバイスデータが含まれています。

E. パーティションの復元
 - **MTKデバイス：**
   ```sh
   fastboot flash nvram nvram.img
   fastboot flash nvdata nvdata.img
   fastboot flash nvcfg nvcfg.img
   fastboot flash persist persist.img
   ```
   **リカバリモード**に再起動 → **工場出荷時設定へのリセット**を実行 → **システム**に再起動します。

 - **QComデバイス：**
   ```sh
   fastboot flash persist persist.img
   fastboot flash modemst1 modemst1.img
   fastboot flash modemst2 modemst2.img
   ```
   **この場合、工場出荷時設定へのリセットは必須ではありません。**

---

### IV. Fastbootを使用したストックROMのフラッシュ ⚡

A. **フラッシュフォルダの準備：**
  - デバイスモデルとファームウェアビルドに対応する以下のファイルをダウンロードし、専用フォルダに配置します：
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x

  - [こちら](https://www.7-zip.org/)から7-Zipをインストールします。
  - ファイルを解凍します：
    - Windows：右クリック → 「*\\」に展開
    - Bashユーザー：
      7za -y x "*7z*"

B. **フラッシュの続行：**
  - [こちら](https://developer.android.com/studio/run/win-usb)から互換性のあるUSBドライバーをインストールします。
  - デバイスが**ブートローダーモード**のときに、**デバイスマネージャー**に `Android Bootloader Interface` が表示されていることを確認します。
  - 以前に抽出スクリプトを使用した場合は、直接実行します。それ以外の場合：
    - 抽出されたすべてのイメージファイルを、[Fastbootフラッシュスクリプト](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download)と一緒に単一のフォルダに移動します。
    - ホットフィックスが含まれていることを確認するために、常に最新のスクリプトをダウンロードしてください。
  - インターネットに接続した状態でスクリプトを実行し（最新の `platform-tools` を取得するため）、プロンプトに従います：
    - 確認の質問に答えます。
    - データをワイプするかどうかを選択します：（Y/N）
    - 両方のスロットにフラッシュするかどうかを選択します：（Y/N）
    - Android Verified Bootを無効にします：（N）
  - すべてのパーティションが正常にフラッシュされたことを確認します。
    - 成功した場合は、システムに再起動することを選択します：（Y）
    - エラーが発生した場合は、ブートローダーに再起動し、失敗に対処した後で再フラッシュします。

---

### V. ブートローダーのリロック 🔒

A. **前提条件**
  - **画面ロック/PIN/パスワードおよびログイン済みアカウントを削除**します（オプションですが推奨）。
  - [フラッシュガイド](#iv-fastbootを使用したストックromのフラッシュ-)に従って、**ストックROM**をクリーンフラッシュします。**ストックファームウェアをフラッシュせずに変更されたパーティションでブートローダーをリロックすると、デバイスがブリックする可能性があります！**
  - すべてのデータをバックアップします（リロックすると**すべて消去**されます）。
  - まだセットアップされていない場合は、**ADB & Fastbootツール**とUSBドライバーをインストールします。

B. **リロックプロセス**
  - システムにいる場合は、ブートローダーに再起動します：
    ```sh
    adb reboot bootloader
    ```

  - fastboot接続を確認します：
    ```sh
    fastboot devices
    ```

  - ブートローダーのリロックを開始します：
    ```sh
    fastboot flashing lock
    ```

  - スマートフォンで確認します：
    - **音量キー**を使用して移動し、**電源ボタン**で確認します。
    - デバイスはフォーマットされ、ロックされたブートローダーで再起動します。

C. **リロック後**
  - デバイスを再度セットアップします。
  - ブートローダーは現在ロックされています！

---

## 謝辞 🤝

貴重な貢献とサポートを提供してくださった以下の貢献者に感謝します：
- **[luk1337](https://github.com/luk1337/oplus_archive)** – AOSPのOTA抽出ツールの使用を開拓し、差分OTAアップデートの抽出を可能にしました。
- **[arter97](https://github.com/arter97/nothing_archive)** – 上記のプロジェクトを**Nothing Phone (2)**向けに適合させました。
- **[LukeSkyD](https://github.com/LukeSkyD)** – 初期のビルドの主要な参照元となった[Nothing Phone (1) Repo](https://xdaforums.com/t/nothing-phone-1-repo-nos-ota-img-guide-root.4464039/)を維持しています。
- **[XelXen](https://github.com/XelXen)** - プロジェクトのブランディングのためのロゴとバナーをデザインしました。
- このプロジェクトをより広いオーディエンスにアクセス可能にするためのローカライズ努力に貢献した個人。

---

## プロジェクトのサポート ⭐

このアーカイブが役立った場合は、**[リポジトリにスターを付ける](https://github.com/spike0en/nothing_archive/stargazers)**ことを検討してください。あなたのサポートは、プロジェクトを発見しやすくし、アクティブに保つのに役立ちます！

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
  <img alt="スター履歴チャート" src="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
</picture>

---
---
sidebar_position: 4
title: ガイド
description: ブートローダーのアンロック、ルート化、OTAアップデート、Nothingデバイスのカスタマイズに関するステップバイステップガイド。
keywords: [nothing ブートローダー アンロック, nothing ルート化, nothing fastboot, nothing ota アップデート, nothing ダイヤルコード, essentialキー 割り当て]
---

# ハウツーガイド

様々な側面に関するステップバイステップガイド。

## 一般的な使用方法とトラブルシューティング

日常的な使用のためのヒント、コツ、および一般的なガイド。

### OTAサイドロード

:::note

- 増分OTAアップデートをサイドロードするために、ブートローダーのアンロックは**必須ではありません**。ルート化されたユーザーでない限り、ステップAをスキップしてください。
- 公式の増分またはフルOTAアップデートのサイドロードは、このアーカイブから直接ダウンロードされている限り安全です。
- サードパーティのソースは使用しないでください。Nothingアーカイブのすべてのファームウェアは、Nothingの公式OEMサーバーから直接取得されています。  
  これは、増分OTAセクションのダウンロードURLを確認することで検証できます。これらはサードパーティのファイルホストではなく、公式サーバーを指しています。
- Nothing OSに組み込まれているオフラインアップデーターは、OEM署名済みのアップデートパッケージのみを受け入れます。
- アップデーターはインストール前にファームウェアのハッシュを検証し、正しくない、または一致しないOTA zipが使用された場合は失敗します。
- 同じ検証がフルOTAパッケージにも適用されます。整合性が保たれていない限りインストールされません。
- これらのチェックがあるため、ロックされたブートローダーで公式のOTA zipをサイドロードしてデバイスをブリックさせることは不可能です。
- オープンベータテストのアップデートについては、ダイヤラー経由の方法が機能しない場合、OEMによって提供される`Nothing Beta Updater Hub`（名前は将来変更される可能性があります）を介してサイドロードしてください。
  設定からインターフェースを起動できます。これは、純正の組み込みバージョンを上書きするOEMのベータアップデーターアプリをインストールした場合に発生します。
- 視覚的なリファレンスについては、[こちら](https://github.com/spike0en/nothing_archive/tree/main/assets/sideloading)の画像を記載された順序で参照してください。

:::

<br />

A. **純正パーティションの復元（ルート化されたユーザーのみ）**  
  :::tip
  ブートローダーがロックされている場合は、ポイントBに直接進んでください！
  :::

1. **現在のNothing OSバージョンを確認する：**  
   - `設定 > デバイス情報 > デバイスバナーをタップ`。  
   - ビルド番号を書き留めます。  

2. **現在のファームウェアビルドの純正イメージを取得する：**  
   - `-boot-image.7z`ファイルをダウンロードします。  
   - アーカイブを展開して`.img`ファイルを入手します。  

3. **必要なパーティションを特定する：**  
   - **Qualcommデバイス：** `boot`, `init_boot`, `vendor_boot`, `recovery`, `vbmeta`  
   - **MediaTekデバイス：** `init_boot`, `vbmeta`, `lk`

4. **ブートローダーモードで純正パーティションをフラッシュする：**  
   :::note
   変更されたパーティションのみをフラッシュする必要があります。また、SoCプラットフォームに基づいて不足しているパーティションはスキップしてください。 
   :::
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   fastboot flash --slot=all lk lk.img
   ```

5. **システムに再起動し、システムアップデーター経由でアップデートする：**
   - アップデートが**失敗**した場合は、次のセクションの**手動サイドロード**に進んでください。

6. **ルートの復元（オプション）：**
   - アップデート後、アップデートされたNOSバージョンの**パッチ済みブートイメージをフラッシュ**することで、ルート化をやり直すことができます。
   - ルート化をやり直した後も、**モジュールはそのまま維持されます**。

<br />

B. **サイドロードの続行** 

 - **正しいアップデートファームウェアファイルをダウンロードする：**  
   - [こちら](/docs/firmware)からお使いのデバイスに適したOTAファームウェアファイルを見つけてください。

 - **正しいファイルの選び方は？**  
   - リポジトリに移動し、デバイスモデルを選択します。  
   - 「増分OTA（Incremental OTA）」列を探します。  
   - **現在のOSビルド番号を確認する**:  
     - `設定 > システム > デバイス情報`に移動します。  
     - **デバイスバナー**をタップし、**ビルド番号**をメモします。

 - **例：**  
   - お使いの**Phone (2)**のビルド番号が`Pong_U2.6-241016-1700`だとします。 
     - 利用可能な最新のOTAアップデートが`Pong_V3.0-241226-2001`であると仮定します。
     - 対応するアップデートパスは、`Pong_U2.6-241016-1700` -> `Pong_V3.0-241226-2001`となります。
   - デバイスとOSバージョンに基づいて正しいパスを選択していることを確認してください。
     - 詳細については[こちら](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg)を参照してください。

 - **`ota`フォルダを作成する：** 
   - デバイスの**内部ストレージ**に`ota`という名前のフォルダを作成します。フルパスは以下の通りです：  
     ```text
     /sdcard/ota/
     ```
   - ダウンロードした`<firmware>.zip`ファイルをこのフォルダに移動します。

 - **NothingオフラインOTAアップデーターにアクセスする：**  
    - **電話アプリ**を開き、以下をダイヤルします：  
      ```text
      *#*#682#*#*
      ```
   - これにより、組み込みのオフラインアップデートツールが起動します。  
   - UIには`NothingOfflineOtaUpdate`または`NOTHING BETA OTA UPDATE`と表示される場合がありますが、どちらも機能します。

 - **アップデートを適用する：**  
   - アップデーターは自動的にアップデートファイルを検出します。  
   - 検出されない場合は、手動で参照してOTAファイルをインポートしてください。  
   - `Directly Apply OTA`または`Update`をタップします（アプリのUIに基づきます）。  
   - アップデートが完了するまで待ちます。デバイスは自動的に再起動します。

:::note

- アップデーターに**不明なエラー**が表示される場合は、ファイルを手動で**"ota"**フォルダにコピーする代わりに、**"参照（Browse）"**オプションを使用してみてください。
- 増分OTAが失敗した場合は、**フルOTAファームウェア**をサイドロードできます。
- **フルOTAはダウングレードには使用できません**。同じビルドまたはより新しいビルドへのアップデートのみ可能です。
- **アンロックされたブートローダーのユーザー**は、カスタムリカバリ（例：Phone (2)用のOrangeFox）を介してフルOTAをフラッシュできます。
- **すべてのリリースにフルOTAファイルがあるわけではありません**。そのような場合は増分OTAを使用してください。

:::


<hr />

### セーフモード

- [セーフモードへの再起動](https://www.hardreset.info/devices/nothing/nothing-phone-2/safe-mode/)


<hr />

### ダイヤルコード

隠しメニューや診断にアクセスするためにダイヤルできるダイヤルコード（USSD）。

| コード | 機能 |
|------|----|
| `*#06#` | IMEIとシリアル番号を表示 |
| `*#07#` | SARレベルと規制情報を表示 |
| `*#*#569#*#*` | Nothingフィードバック/ログツールを開く |
| `*#*#0#*#*` | ハードウェアテストメニュー（画面、センサー、タッチ） |
| `*#*#9#*#*` | Nothing診断メニューを開く |
| `*#*#225#*#*` | カレンダーのストレージ情報を表示 |
| `*#*#426#*#*` | Google Play / Firebaseの診断情報 |
| `*#*#4636#*#*` | テストメニュー（電話、バッテリー、使用統計、Wi-Fi） |
| `*#*#682#*#*` | オフラインOTAアップデーターを開く（Nothing Beta Hubがインストールされている場合は機能しません） |


---

## デバイスの機能とアクセサリ

特定のハードウェア微調整やペアリングに関するガイド。

### Bauhausテーマの解除

Bauhausにインスパイアされたテーマは、Nothing Phoneの様々なモデルで解除可能なスペシャルエディション機能です。

#### Phone (2a) Special Edition
- [隠し機能を解除する](https://nothing.community/d/11058-hidden-feature-of-phone-2a-special-edition)（RapidZapper氏による）

#### その他のNothingモデル

**要件：**
- ADBおよびFastbootを備えたPC
- [SetEditアプリ](https://github.com/MuntashirAkon/SetEdit)

**手順：**

1. **開発者向けオプションを有効にする：** `設定 > デバイス情報 > 「ビルド番号」を7回タップ`します。
2. **USBデバッグを有効にする：** `設定 > システム > 開発者向けオプション > USBデバッグを有効にする`をオンにします。
3. **ADB経由でSetEditをインストールする：**
   - ダウンロードしたAPKの名前を`SetEdit.apk`に変更します。
   - 次のコマンドを実行します：
     ```sh
     adb install --bypass-low-target-sdk-block SetEdit.apk
     ```
4. **テーマを解除する：**
   - SetEditを開き、要求された権限を許可します。
   - **System Table**で、`theme_bauhaus_enable`を探します。
   - 値を`1`に設定します（`0`に戻すと無効になります）。
5. **テーマを適用する：**
   - Nothingランチャーの設定に移動し、新しいテーマを適用します。

:::warning

- **SetEditで他の値を変更しないでください！！**
- 無闇にシステム設定を変更すると、不安定になったりシステム上の問題が発生したりする可能性があります。

:::


<hr />

### Essentialキーの割り当て変更

Phone (3)のEssentialキーの割り当てを変更するためのガイド：

| ガイド | 著者 |
|-------|------|
| [Redditガイド](https://www.reddit.com/r/NothingTech/comments/1jzljrf/guide_how_to_remap_the_essential_key_on_the_phone/) | acruzjumper, McKeviin, DKmarc & Pealoaf |
| [クイック割り当てガイド](https://www.reddit.com/r/NothingTech/comments/1jv6gea/quick_guide_to_remap_the_essential_space_button/) | David_Ign |
| [XDAガイド](https://xdaforums.com/t/how-to-disable-or-remap-the-essentials-button.4755184/) | rwilco12 |
| [GitHubガイド](https://github.com/z3phydev/How-to-remap-or-disable-the-Essential-Key) | z3phydev |


<hr />

### Gadgetbridge関連

- [サポートされているモデルと機能](https://gadgetbridge.org/gadgets/wearables/nothing/)
- [Nothing CMFサーバーのペアリング](https://gadgetbridge.org/basics/pairing/nothing-cmf-server/)


---

## 高度なガイド

:::warning
パワーユーザーのみに推奨されます。これらの手順は、不適切に行うとデバイスをブリックさせたり、保証を無効にしたりする可能性があります。
:::

これらのガイドは時系列順に並んでいます。この順序に正確に従うことを強くお勧めします。

### 前提条件とツール

以下の高度なガイドのための必須ツール。

#### USBドライバー

USBファイル転送およびデバイス認識のための必須ドライバー。

- [Google USBドライバー（Windows用）](https://dl.google.com/android/repository/usb_driver_r13-windows.zip)
- インストールガイド：[USB](https://droidwin.com/android-usb-drivers) | [Fastboot](https://droidwin.com/how-to-install-fastboot-drivers-in-windows-11/)

#### Platform Tools (ADB & Fastboot)

Android SDK Platform-Toolsをダウンロード：
- [Windows / Linux / macOS](https://developer.android.com/studio/releases/platform-tools)
- [インストールガイド](https://www.xda-developers.com/install-adb-windows-macos-linux/)

**Windows (winget):**
```cmd
winget install --id=Google.PlatformTools -e
```

**macOS/Linux (Homebrew):**
```bash
brew install --cask android-platform-tools
```


<hr />

### ブートローダーのアンロック

:::info

- ブートローダーをアンロックすると、OEM保証が無効になります。ただし、純正ROMを再フラッシュし、ブートローダーを再ロックすることで保証を復元できます。
- 他の要因に関わらず、Widevine L1/DRM認証が失われ、L3にダウングレードされます。  
- [デバイスの整合性（Device Integrity）](https://developer.android.com/google/play/integrity/overview)が失われ、これに依存するアプリが動作しなくなる可能性があります（ルート権限で後で修正しない限り）。  
  [このガイド](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection)はこの問題の解決に役立つかもしれません。 

:::

A. **前提条件**
- **データのバックアップ**（アンロックするとすべて消去されます）。
- **ADB & Fastbootツールのインストール** – [ここからダウンロード](https://developer.android.com/studio/releases/platform-tools)。
- **USBドライバーのインストール** – [Google USBドライバー](https://developer.android.com/studio/run/win-usb)。
- **開発者向けオプションを有効にする**：
  - `設定 > デバイス情報 > 「ビルド番号」を7回タップ。`
- **USBデバッグとOEMロック解除を有効にする**：
  - `設定 > システム > 開発者向けオプション > USBデバッグとOEMロック解除を有効にする。`
- **画面ロック/PIN/パスワードとログイン済みアカウントの削除（オプションですが推奨）**
  - ブートローダーを再ロックする前にアカウントを削除すると、Google FRP（Factory Reset Protection）ロックを防ぐのに役立ちます。FRPがトリガーされると、デバイスは工場出荷時設定へのリセット後に以前にリンクされていたGoogleアカウントを要求します。資格情報を忘れたり、アカウントにアクセスできなかったりすると、デバイスからロックアウトされる可能性があります。これを避けるために、再ロックする前にすべてのGoogleアカウントを削除することをお勧めします。

B. **アンロック手順**
- **USBで電話をPCに接続する**。
- **platform-toolsフォルダでコマンドプロンプトを開く**：
  - Windows：`Shift + 右クリック` > **ここでコマンドプロンプト/Powershellを開く**。
  - Mac/Linux：**ターミナル**を開き、platform-toolsに移動します。
- **デバイスの接続を確認する**：
  ```sh
  adb devices
  ```
  プロンプトが表示されたら、電話でUSBデバッグを許可します。

- **ブートローダーに再起動する：**
    ```sh
    adb reboot bootloader
    ```

- **fastboot接続を確認する：**
    ```sh
    fastboot devices
    ```
    デバイスが検出されない場合は、USBドライバーを再インストールしてください。

- **ブートローダーをアンロックする：**
    ```sh
    fastboot flashing unlock
    ```

- **電話で確認する：**
  - **音量キー**で移動し、**電源ボタン**で確定します。
  - デバイスは**すべてのデータを消去**し、再起動します。

C. **アンロック後**
  - 電話を再度セットアップします。
  - **ブートローダーのステータスを確認する**：
    ```sh
    設定 > システム > 開発者向けオプション > OEMロック解除が有効になっているはずです。
    ```

  - ブートローダーがアンロックされ、起動時に「Orange State」の警告が表示されますが、これは正常です。


<hr />

### ルート化

:::info

- ルート化すると**OEM保証が無効**になり、更新前に純正イメージが復元されない限りOTAアップデートが失敗する可能性があります。
- **boot / init_bootイメージが現在のファームウェアビルドと正確に一致していること**を常に確認してください。
  正しくないイメージをフラッシュすると、**ブートループが発生します**。
- **パーティションが存在する場合は、ルート化に`boot`イメージではなく常に`init_boot`を使用してください**。
- ルート化には、**アンロックされたブートローダー**が必要です。
- 並行してリンクされている視覚的なガイドも参照できます：[orailnoor](https://www.youtube.com/watch?v=v0i4rftKNWs) | [Droidwin](https://www.youtube.com/watch?v=4T1ZHDUCBsw) | [EpicDroid](https://www.youtube.com/watch?v=vXIBfyX7s-k)。

:::

<br />

A. **前提条件**
- **USBデバッグが有効**で**ブートローダーがアンロック**されていること
- **ADB & Fastbootを備えたPC**  
  *または* **USB-OTG + ADBアプリ（例：[Bugjaeger](https://play.google.com/store/apps/details?id=eu.sisik.hackendebug&hl=en_IN)）**を備えた別のAndroid携帯  
  *または* **カスタムリカバリ（例：TWRP / OrangeFox / AOSPベースのリカバリ）**
- **ADB / Fastboot**に関する基本的な知識
- 現在のビルドと一致する**純正ファームウェア**（イメージの抽出用）
- 推奨されるルート化ソリューション：
  - [Magisk](https://github.com/topjohnwu/Magisk/releases) | [インストール方法](https://topjohnwu.github.io/Magisk/install.html)
  - [KernelSU (KSU)](https://github.com/tiann/KernelSU) | [インストール方法](https://kernelsu.org/guide/installation.html)
  - [KernelSU Next (KSUN)](https://github.com/KernelSU-Next/KernelSU-Next) | [インストール方法](https://kernelsu-next.github.io/webpage/pages/installation.html)

<br />

B. **現在のソフトウェアバージョンの確認**
- 電話で `設定 > 端末情報 > Nothing OSのバナー` をタップ。
- **ビルド番号を書き留める**
- 例：`Pong_B4.0-251119-1654`
- `IND`/`EEA`/`TUR`などの地域接尾辞は無視してください。

<br />

C. **純正Boot / Init_bootイメージの取得**
- [リリースインデックス](/docs/firmware)に移動。
- **デバイスモデル**を選択。
- お使いのビルドの**OTAイメージ**を開く。
- リリースアセットから対応するアーカイブ`*-image-boot.img.7z`をダウンロード。

- アーカイブを展開し、以下のいずれかを見つける：
  - `init_boot.img` **（存在する場合はこちらを推奨）**
  - `boot.img`（`init_boot`が存在しない場合のみ）

- **イメージをデバイスに転送する**
  ```sh
  adb push init_boot.img /sdcard/Download/
  # または
  adb push boot.img /sdcard/Download/
  ```

<br />

D. **イメージへのパッチ適用**

**Magisk**
- デバイスに最新のMagisk APKをインストール。
- Magiskを開く → インストール → 「ファイルを選択してパッチを適用」を選択。
- 転送した`init_boot`（推奨）または`boot`イメージを選択。 
- Magiskが `magisk_patched-XXXXX.img` を生成します。

<br />

**KernelSU / KernelSU Next**  

:::note

- Nothing Phone (2)の場合：KSUベースのルート化方法は純正の`boot.img`でサポートされています。しかし、KSUNまたはSUSFSのサポートには、パッチが追加されたカスタムコンパイル済みのカーネルが必要です。
- 利用可能なパッチ済みのカスタムカーネルオプションには以下が含まれます： 
  [arter97 kernel](https://xdaforums.com/t/r44-arter97-kernel-for-nothing-phone-2.4631313/) - KSUパッチ済み。NOS 4.0以降はまだサポートされていません | 
  [Meteoric Kernel (EOL)](https://github.com/HELLBOY017/kernel_nothing_sm8475) - KSUN + SUSFSパッチ済み。NOS 4.0以降をサポートしていません。 |
  [Wild Kernel fork](https://github.com/MiguVT/Meteoric_KernelSU_SUSFS) - KSU + SUSFSパッチ済み。 | 
  [Wild Kernel](https://github.com/WildKernels/GKI_KernelSU_SUSFS) - KSUN + SUSFSパッチ済み。5.10-android12をサポート。 
- Android 13以降のベンダーを搭載したNothingモデル、つまりPhone (2)以降に発売されたモデルは、KSUNパッチ方法をサポートします。

:::

- パッチ適用方法はMagiskと同様です。KSU/KSUNマネージャーから「未インストール」をタップ > `init_boot.img`にパッチを適用し、パッチ済みのイメージをPCに転送します。

- ブートローダーに再起動：
  ```sh
  adb reboot bootloader
  ```

- パッチ済みのイメージをフラッシュ
  ```bash
  fastboot flash init_boot <パッチ済みのinit_boot.imgをドラッグ＆ドロップ>
  ```

- システムに再起動：
  ```bash
  fastboot reboot
  ``` 

- デバイスがKSU/KSUNでルート化されます。


<hr />

### Play Integrity

| ガイド | リンク |
|-------|------|
| Play Integrityとルート検出の修正 | [Wiki](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) |


<hr />

### 必須パーティションのバックアップ

:::info

- ブートローダーをアンロックした後、カスタムROMやカーネルをフラッシュする**前に**、`persist`, `modemst1`, `modemst2`, `fsg`などの必須パーティションをバックアップすることが重要です。
- これらのパーティションには、IMEI、ネットワーク設定、指紋センサーのキャリブレーションを含む重要なデータが含まれています。
- これらが失われたり破損したりすると、**モバイル通信の喪失、指紋認証の問題、あるいはデバイスのブリック**が発生する可能性があります。
- バックアップを作成しておくことで、問題が発生した場合に**デバイスを復元**できることが保証されます。

:::

A. **要件**
- **アンロックされたブートローダー**
- **ルートアクセス**（Magisk/KSU/Apatch経由）
- **Termuxアプリ**（F-DroidまたはPlayストア経由でインストール）
- **パーティションパスを確認する：**
  - **Qcomデバイス：** `/dev/block/bootdevice/by-name/`
  - **MTKデバイス：** `/dev/block/by-name/`

B. **バックアップ手順**
- **Qualcomm (QCom) デバイスの場合：**
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
    これにより、**`super`と`userdata`を除くすべてのパーティション**のイメージファイルが、**内部ストレージ**内の「partitions_backup」というフォルダに作成されます。

  - **[オプション]** 上記のコマンドが失敗した場合は、こちらの代替案を試してください：
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **MediaTek (MTK) デバイスの場合：**
  - **Termux**を開き、以下を使用してルートアクセスを許可します：
    ```sh
    su
    ```

  - 以下のコマンドをすべて一度にコピーして貼り付けます：
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

C. **バックアップの保管**
  - 「partitions_backup」フォルダを**PCまたは安全なストレージ**に移動します。
  - **これらのバックアップを共有しないでください！** ＩＭＥＩなどのユニークなデバイスデータが含まれています。

D. **パーティションの復元**
 - **MTKデバイス：**
    ```sh
    fastboot flash nvram nvram.img
    fastboot flash nvdata nvdata.img
    fastboot flash nvcfg nvcfg.img
    fastboot flash persist persist.img
    ```
    **リカバリモード**に再起動 → **工場出荷時設定にリセット（factory reset）**を実行 → **システム**に再起動。
    - リファレンスリンク：[Nothing Phone (2a) DVT Engineering Sample: Recovering Baseband and IMEI Records](https://bluehomewu.github.io/posts/Restoring-Baseband-and-IMEI-on-Nothing-Phone-2a-DVT/)
    - 記事は中国語（繁体字）で書かれていますが、ブラウザの翻訳機能を使用して日本語に翻訳できます。

 - **QComデバイス：**
    ```sh
    fastboot flash persist persist.img
    fastboot flash modemst1 modemst1.img
    fastboot flash modemst2 modemst2.img
    ```
    **この場合、工場出荷時設定へのリセットは必須ではありません。**


<hr />

### 純正ROMのフラッシュ（アンブリック / ダウングレード）

:::note

- これは、新しいバージョンの純正ファームウェアへの手動のクリーンフラッシュ、またはダウングレードに推奨される唯一の方法です。
- 詳細な理解については、並行してリンクされている視覚的なガイドを参照してください：[Droidwin](https://www.youtube.com/watch?v=YCYEjdC3oHM) | [The Nothing Lab](https://www.youtube.com/watch?v=l0P9gosl64s) | [QZX Tech](https://www.youtube.com/watch?v=66H2MVElyAY)

:::

A. **フラッシュ用フォルダの準備：**
  - お使いのデバイスモデルとファームウェアビルドに対応する以下のファイルをダウンロードし、専用のフォルダに配置します：
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x
    - `-hash.sha256` - ファイルの整合性を確認し、不足しているパーツを検出するために推奨されます（オプション）。

  - 7-Zipを https://www.7-zip.org/ からインストールします。

  - オプション（**推奨**）：手動の手順の代わりに抽出スクリプトを使用できます：
    - [Windows用](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.bat)
    - [Bash用](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.sh)
    - ダウンロードしたファイルがあるのと同じフォルダからスクリプトを実行します。

  - ファイルを展開する：
    - Windows：右クリック → 「* \」に展開
    - Bashユーザー：`7za -y x "*.7z*"`

  - 稀に、ダウンロードマネージャーが分割された論理ファイルの拡張子を変更することがあります。
  - 名前を変更する：
    - `-image-logical.7z.001.7z` → `-image-logical.7z.001`
    - `-image-logical.7z.002.7z` → `-image-logical.7z.002`
  - その後、抽出を再試行します。

B. **フラッシュの実行：**
  - 互換性のあるUSBドライバーを[こちら](https://developer.android.com/studio/run/win-usb)からインストールします。
  - デバイスが**ブートローダーモード**のとき、**デバイスマネージャー**で `Android Bootloader Interface` が表示されていることを確認してください。
  - 前の手順で抽出スクリプトを使用した場合は、それを直接実行します。それ以外の場合は：
    - 抽出されたすべてのイメージファイルを、[Nothing Fastboot Flasher Script](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download)とともに1つのフォルダに移動します。
    - 同じディレクトリに `-hash.sha256` ファイルを置きます。 
    - 常に最新のスクリプトをダウンロードして、修正が含まれていることを確認してください。
  - インターネットに接続された状態で（最新の `platform-tools` を取得するため）スクリプトを実行し、プロンプトに従います：
    - 確認のアンケートに回答します。
    - 必要に応じてハッシュチェックをスキップまたは実行します。 
    - データを消去するかどうかを選択します：(Y/N) [クリーンフラッシュ / ダウングレード = `Y` | ダーティフラッシュ / アップグレード = `N`]
    - 両方のスロットにフラッシュするかどうかを選択します：(Y/N)
    - Android Verified Bootを無効にするかどうか：(N) [ここで `Y` を選択すると、後でブートローダーをアンロックできなくなるので注意してください！]
  - すべてのパーティションが正常にフラッシュされたことを確認します。
    - 成功した場合は、システムへの再起動を選択します：(Y)
    - エラーが発生した場合は、ブートローダーに再起動し、失敗の原因に対処した後に再度フラッシュしてください。これを行わずにシステムに再起動すると、ソフト/ハードブリックの結果を招く可能性があります。


<hr />

### ブートローダーの再ロック

A. **前提条件**
  - **画面ロック/PIN/パスワードとログイン済みアカウント**を削除します（オプションですが推奨）。
  - [フラッシュガイド](#純正romのフラッシュアンブリック--ダウングレード)に従って**純正ROM**をクリーンフラッシュします。**純正ファームウェアをフラッシュせずに、変更されたパーティションがある状態でブートローダーを再ロックすると、デバイスがブリックする可能性があります！**
  - すべてのデータをバックアップします（再ロックすると**すべて消去**されます）。
  - まだ設定していない場合は、**ADB & Fastbootツール**とUSBドライバーをインストールします。

B. **再ロック手順**
  - システム内にいる場合は、ブートローダーに再起動します：
    ```sh
    adb reboot bootloader
    ```

  - fastboot接続を確認します：
    ```sh
    fastboot devices
    ```

  - ブートローダーの再ロックを開始します：
    ```sh
    fastboot flashing lock
    ```

  - 電話で確認します：
    - **音量キー**で移動し、**電源ボタン**で確定します。
    - デバイスはフォーマットされ、ロックされたブートローダーで再起動します。

C. **再ロック後**
  - デバイスを再度セットアップします。
  - ブートローダーがロックされました！
---

## ハードアンブリック (Hard Unbrick)

:::note

このセクションは、[純正ROMのフラッシュガイド](#純正romのフラッシュアンブリック--ダウングレード)を使用してもデバイスを復旧できない場合にのみ参照してください。

:::

### ドライバー

デバイスのSoCメーカーに適したドライバーをインストールしてください。

- **Qualcomm HS-USB 9008 ドライバー：** [OneDrive](https://itraps-my.sharepoint.com/personal/public_builds_itraps_onmicrosoft_com/_layouts/15/onedrive.aspx?viewid=fce5f287%2D4883%2D4f5a%2Daf37%2D29642c53cfdf&id=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers%2FQualcomm%2DHS%2DUSB%2DQDLoader%2D9008%2DDriver%2Ezip&parent=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers) // [Microsoft Updateカタログ](https://catalog.update.microsoft.com/Search.aspx?q=qualcomm%20hs-usb)
- **MediaTek ドライバー：** [MediaFire](https://www.mediafire.com/file/w0z94wwe4lkka7q/MTK-Driver-v5.2307.zip/file) // [OneDrive](https://itraps-my.sharepoint.com/personal/public_builds_itraps_onmicrosoft_com/_layouts/15/onedrive.aspx?viewid=fce5f287%2D4883%2D4f5a%2Daf37%2D29642c53cfdf&id=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers%2FQualcomm%2DHS%2DUSB%2DQDLoader%2D9008%2DDriver%2Ezip&parent=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers)

### EDLケーブル (Qualcomm)

- Snapdragonベースのデバイスでは、純正ケーブルを使用し、ドライバーをインストールしてもフラッシュツールがデバイスを認識しない場合、**Hydra v2ケーブル**が必要になることがあります。
- **確認手順：** デバイスの電源を切った状態で、**音量+**と**音量-**ボタンの両方を押し続けながら、ケーブルをPCに接続します。Hydra v2ケーブルを使用する場合は、接続時にケーブルのボタンを押してください。
- EDLケーブルを自作する**DIY方法**については、代わりに[こちらのガイド](https://xdaforums.com/t/edl-cable-for-nothing-phone-2.4654742/)を参照してください。

### 公式フラッシュツール

:::danger 免責事項

- 以下にリストされているツールは、ウェブ上に流出した**公式サービスツール**です。**自己責任で使用してください。**
- プロジェクトの作者および貢献者は、ツールの使用によって生じたいかなる意図しない結果や損害についても**一切の責任を負いません**。
- これらのツールは、将来のファームウェアアップデートにより、いつでも動作しなくなる可能性があります。
- これらは通常の純正ROMフラッシュを目的としたものではありません。以下の**最終手段としてのみ**使用してください：
  - デバイスが完全に無反応な場合（ハードブリック、画面が真っ暗）。
  - Fastbootモードにアクセスできない場合（適切なドライバーをインストールした後でも）。
  - お住まいの地域に公式サービスサポートがなく、デバイスが保証対象外で修理の目処が立たない場合。
- これらのツールの継続的なサポートは保証されず、将来のバージョンに関するリクエストも受け付けられません。

:::

#### Nothingデバイス：
- [Phone (1)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgDVNZLx9PuARKU5ZYHxTw1RAesDD6ZYA9ncgyk_6jpU3_M?e=RnzUwd)
- [Phone (2)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgA-PysiaC16Qow4EA9_CfP0AbYCgxOlahRyJjB7LQw8RZo?e=4jK0yh)
- [Phone (2a)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgCYxRHWxndKRLFNcO9zLhjcAQunpBStuG-OAetxx1hvsQs?e=mqYlE8)
- [Phone (2a) Plus](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgBuoaxqlNkYR63Fa_z0tGl-AVHKWsuj27LeyhMoXtghwJc?e=fOQp2m)
- [Phone (3a) シリーズ](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgBcJ6YHDfGhSL_TZ8P0WfJXAfKNm7BoxC_uMe071vRmhsM?e=El0x5j)
- [Phone (3)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgCDb2UqoryZSIBDYMu52jjjAQ5Uq5INNOnhOHbH2jr0EpY?e=h8lKHX)
- [Phone (3a) Lite](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgA33YYMKQxUTZplrWoGIji5AfviLdYkUHlh4H2LjQ0_FQQ?e=rBIZ3y)
- [Phone (4a)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgAhqokf-Be4SY2YdeeOr9mrAT-5OsO2Ay-x6UqaAynpKHU?e=X4mojq)

#### CMF by Nothingデバイス：
- [Phone (1)](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgA4tWOkyg4WRqsTmrbNiKECAX3M-2SCUeDFiJ1eraslW7c?e=4mDouI)
- [Phone (2a) Pro](https://itraps-my.sharepoint.com/:f:/g/personal/public_builds_itraps_onmicrosoft_com/IgDUePBy5E6TS5zgqO0MqkVEAQ9C7aMdohvQ6FpMr-RxWdQ?e=sebyob)

### その他のリソース

研究や高度なユースケースに役立つ追加のガイドやプロジェクト：

- [非公式 Qualcomm Firehose / Sahara / Streaming / Diag ツール](https://github.com/bkerler/edl)（bkerler氏による）
- [NTPI Dumper](https://github.com/AaronXenos/ntpi_dumper)（AaronXenos氏による）
- [Phone (2a) シリーズ ハードブリックヘルパー](https://github.com/mistrmochov/nothing-pacman-hardbrick)（mistrmochov氏による）
- [Phone (2a) シリーズ フラッシュツール](https://github.com/R0rt1z2/pacman-flash-tool)（R0rt1z2氏による）
- [Nothing Phone用 Firehose 認証ファイル](https://github.com/plusonsoy/nothing_edl)（plusonsoy氏による）


---


## アフターマーケット開発

:::note
このセクションはコミュニティによって管理されており、Nothingとは提携していません。ブートローダーをアンロックすると、OEM保証が無効になります。
:::

カスタムROM、カーネル、開発プロジェクトの最新情報を入手してください。

### デバイスアップデートチャンネル (Telegram)

**Nothing:**
| デバイス | チャンネル |
|--------|---------|
| Phone (1) | [アップデート](https://t.me/s/NothingPhone1Updates) |
| Phone (2) | [アップデート](https://t.me/s/NothingPhone2updates) |
| Phone (2a) シリーズ | [アップデート](https://t.me/s/NothingPhone2aUpdates) |
| Phone (3a) シリーズ | [アップデート](https://t.me/s/NothingPhone3aUpdates) |
| Phone (3) | [アップデート](https://t.me/s/Phone3Updates) |
| Phone (4a) シリーズ | [アップデート](https://t.me/s/Phone4aUpdates) |

**CMF by Nothing:**
| デバイス | チャンネル |
|--------|---------|
| Phone (1) | [アップデート](https://t.me/s/CMFPhone1Updates) |
| Phone (2) Pro / Phone (3a) Lite | [アップデート](https://t.me/s/CMFPhone2GlobalUpdates) |

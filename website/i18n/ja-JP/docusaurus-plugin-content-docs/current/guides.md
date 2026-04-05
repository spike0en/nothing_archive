---
sidebar_position: 4
title: ガイド
description: NothingおよびCMFデバイス向けの、ブートローダー解除、ルート化、ストックへの復元、基本的な修復に関するステップバイステップのテクニカルガイド。
keywords: [nothing ブートローダー解除, nothing ルート化ガイド, nothing ファームウェア書き込み, nothing phone 修復, fastbootガイド, payload.bin展開, magiskガイド]
---

# テクニカルガイド

NothingおよびCMFデバイス向けのステップバイステップのテクニカル手順。

:::danger
これらのガイドには、デバイスに永続的な損傷を与える可能性のある手順が含まれています。各ステップを注意深く読んでください。発生したいかなる問題についても、Nothing Archiveは責任を負いません。
:::

## ブートローダーの操作

デバイスを改造するための最初のステップは、ブートローダーを解除することです。

### ブートローダーの解除

1. スマートフォンで **設定 > デバイス情報 > ソフトウェア情報** に移動します。
2. **ビルド番号** を7回タップして、開発者向けオプションを有効にします。
3. **設定 > システム > 開発者向けオプション** に移動し、以下を有効にします：
    - **OEMロック解除**
    - **USBデバッグ**
4. スマートフォンをPCに接続し、ADBターミナルを開きます。
5. デバイスをfastbootモードで再起動します：`adb reboot bootloader`
6. ロックを解除します：`fastboot flashing unlock`
7. スマートフォンの画面に表示される警告を音量ボタンで確認します。
8. **重要:** この操作により、すべてのデータが消去されます！

### ブートローダーの再ロック

1. デバイスが完全に **ストックファームウェア** であり、改造（ルート化、カスタムカーネルなど）されていないことを確認してください。
2. デバイスをfastbootモードで再起動します：`adb reboot bootloader`
3. ロックをかけます：`fastboot flashing lock`
4. スマートフォンの画面に表示される警告を確認します。

---

## ルート化とMagisk

デバイスの完全な権限を取得するために必要な手順。

### デバイスのルート化

1. 現在のOSバージョンと完全に一致する `boot.img` ファイルを入手します（Nothing Archiveからダウンロード可能）。
2. [Magisk](https://github.com/topjohnwu/Magisk) アプリをスマートフォンにインストールします。
3. Magiskアプリを開き、**インストール > ファイルを選択してパッチ** を選択し、`boot.img` を指定します。
4. パッチ適用済みファイル (`magisk_patched.img`) をPCにコピーします。
5. デバイスをfastbootモードで起動します。
6. パッチ済みイメージを書き込みます：`fastboot flash boot magisk_patched.img`
7. デバイスを再起動します。

---

## 手動書き込み

Nothing Archiveからダウンロードしたファイルを使用して、デバイスをアップデートまたは修復します。

### 公式OTA (サイドロード)

1. 適切な `.zip` パッケージをダウンロードします。
2. デバイスをリカバリモードで起動します。
3. **Apply update from ADB** を選択します。
4. PCから次のコマンドを入力します：`adb sideload ファイル名.zip`

### Fastboot経由の書き込み

1. フルファームウェアパッケージまたはファクトリーイメージをダウンロードします。
2. [Nothing Flasher](https://github.com/spike0en/nothing_flasher) などのツールを使用することをお勧めします。
3. すべての `img` ファイルを順番に対応するパーティションに書き込みます。

---

## 修復とリカバリ

デバイスが起動しない（ブートループ）場合の解決策。

### アンブリック（ソフトウェア修復）

1. デバイスがfastbootモードに移行できる場合は、完全なファクトリーイメージ（Full ROM）を書き込むことで修復できます。
2. パーティションテーブルが破損している場合は、`critical` パーティション（Phone (1) の `abl`, `xbl` など）の書き込みが必要になる場合があります。

---

## その他の技術情報

### Payload.bin の展開

Nothing OSのパッケージには通常 `payload.bin` ファイルが含まれています。中のイメージを取り出すには：

1. [Payload Dumper](https://github.com/vm03/payload_dumper) または Goベースの [payload-dumper-go](https://github.com/ssut/payload-dumper-go) をダウンロードします。
2. コマンドを実行します：`payload-dumper-go payload.bin`
3. 抽出されたファイルは `output` フォルダに表示されます。

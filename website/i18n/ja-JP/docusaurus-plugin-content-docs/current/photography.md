---
sidebar_position: 8
title: 写真
description: Nothingデバイス向けのGCAMポート、カメラ設定、純正プリセット。
keywords: [nothing gcam, nothing phone カメラ設定, nothing カメラプリセット, nothing 写真]
---

# 写真リソース

Nothingデバイス向けのGCAMポート、設定、およびカメラプリセット。

## Googleカメラポート

| ポート | 開発者 |
|------|-----------|
| [BSG & MGC](https://www.celsoazevedo.com/files/android/google-camera/dev-bsg/) | BSG |
| [AGC](https://www.celsoazevedo.com/files/android/google-camera/dev-BigKaka/) | Bigkaka |
| [LMC](https://www.celsoazevedo.com/files/android/google-camera/dev-hasli/) | hasli |
| [SGCam](https://www.celsoazevedo.com/files/android/google-camera/dev-shamim/) | Shamim |

### GCAM設定

:::note
- 「**Best**」（最適）は主観的なものです。利用可能なすべての設定とバリアントを試して、自分に最適なものを見つけてください！
- SnapdragonおよびMTKベースのデバイスでは、それぞれ **Snap** および **Aweme** バリアントの使用が一般的に推奨されます。
- GCAMアプリのバリアントを適当にインストールするだけでは、最良の結果を得るには不十分です。デバイスのカメラセンサーやレンズに基づいて設定作成者が調整した設定ファイルこそが、アプリを使いやすく、最高のパフォーマンスを発揮させる鍵となります。
:::

#### 設定のインポート

1. 以下のリンクから設定ファイル（`.xml`）をダウンロードします。
2. ダウンロードしたGCAMアプリを少なくとも一度は開きます。ファイル、ストレージ、カメラ、およびその他の必要な権限へのアクセスを許可してください。
3. 各カメラバリアント用のフォルダが内部ストレージのルートに自動的に作成されます。パスは異なる場合がありますが、一般的には以下の通りです：
- **AGC** → `内部ストレージ/Download/AGC/AGC X.Y/configs/`  
- **LMC** → `内部ストレージ/LMCX.Y/`  
- **SGCAM** → `内部ストレージ/SGCAM/X.Y.Z/XML/`

> `X.Y` または `X.Y.Z` はアプリのバージョンを表します（例：`9.2` または `9.2.114`）。

4. ダウンロードした `.xml` または `.agc` 設定ファイルを、手順3で示したパスに移動します。
5. 再度GCAMアプリを開き、以下の手順で設定ファイルを読み込みます：
- AGCの場合：詳細設定アイコン > すべてのファイルへのアクセス権限を許可 > 戻る > **Settings → Load Config** に進み、AGC Configsフォルダに保存した `.agc` ファイルを選択して **Save** をタップします。
- LMCの場合：**シャッターボタン**と**カメラ切り替えアイコン**の間の空白部分をダブルタップし、設定を選択して **Import** をタップします。プロンプトが表示されたら権限を許可してください。
6. 設定が自動的に適用されます。上部バーからプロファイル（利用可能な場合）を切り替えることができます。

#### 設定のダウンロード

設定ファイル（`xml` または `.agc`）は、デバイス名ごとに作成者のクレジットと共にアーカイブされています：

#### Nothing
- [Phone (1)](https://archive.org/download/nothing-archive/spike0en/photography/phone-1/)
- [Phone (2)](https://archive.org/download/nothing-archive/spike0en/photography/phone-2/)
- [Phone (2a) Series](https://archive.org/download/nothing-archive/spike0en/photography/phone-2a-series/)
- [Phone (3a) & (3a) Pro](https://archive.org/download/nothing-archive/spike0en/photography/phone-3a-series/)
- [Phone (3)](https://archive.org/download/nothing-archive/spike0en/photography/phone-3/)

#### CMF by Nothing
- [Phone (1)](https://archive.org/download/nothing-archive/spike0en/photography/cmf-1/)
- [Phone (2) Pro](https://archive.org/download/nothing-archive/spike0en/photography/cmf-2pro/)

---

## 純正カメラプリセット

Nothingカメラプリセットのリソース:

| リソース | リンク |
|--------|------|
| Discordチャンネル | [表示](https://discord.com/channels/930878214237200394/1351115520245760021) |
| Googleフォトコレクション | [表示](https://photos.google.com/share/AF1QipMLXmA5txDQHqlHzF6OV4HhkLTMsqUx9m8_3jMNH0_MizjA7038n_j8gz4v54zTNw?pli=1&key=QUJKYVY4akFFWGVCWWtleG9DMkNCcDc1c2V5TzZB) |
| Nothing Playground | [閲覧](https://playground.nothing.tech/presets) |
| flo_rahil によるNotionファイル | [表示](http://aromatic-perfume-9a5.notion.site/1bd0ff2f0ced80c0b32cce32f552aa4e?v=1bd0ff2f0ced8152aa23000ce56a341a) |
| Reddit検索 | [r/NothingTech](https://www.reddit.com/r/NothingTech/search/?q=camera+presets&type=posts&sort=new) · [r/NOTHING](https://www.reddit.com/r/NOTHING/search/?q=camera+presets&type=posts&sort=new) · [r/CMFtech](https://www.reddit.com/r/CMFTech/search/?q=camera+presets&type=posts&sort=new) |
| Telegramコミュニティ | [参加](https://t.me/NothingTelegramCommunity) |

---

## その他

- Ali による [Shot With Nothing](https://shotwithnothing.crd.co/) — コミュニティによる写真を共有し、祝福するスペース。


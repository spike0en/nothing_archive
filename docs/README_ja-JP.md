[English](./README.md) | **日本語**

# Nothing Archive 

<img src="assets/logo.png" width="96" alt="Nothing Archive Logo">

[![Workflow Status](https://img.shields.io/github/actions/workflow/status/spike0en/nothing_archive/dump.yml?branch=main&label=Build&color=2DC653&logo=github)](https://github.com/spike0en/nothing_archive/actions/workflows/dump.yml)
[![Total Downloads](https://img.shields.io/github/downloads/spike0en/nothing_archive/total?logo=github&logoColor=white&label=Total%20Downloads&color=007377)](#downloads-)
[![Visitors](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive&count_bg=%2300A6A6&title_bg=%234A4A4A&icon=github.svg&icon_color=%23FFFFFF&title=Visitors&edge_flat=false)](https://github.com/spike0en/nothing_archive)

[![Stars](https://img.shields.io/github/stars/spike0en/nothing_archive?logo=github&color=D4AF37)](#support-the-project-)
[![Forks](https://img.shields.io/github/forks/spike0en/nothing_archive?logo=github&color=468FAF)](https://github.com/spike0en/nothing_archive/fork)
[![Latest Release](https://img.shields.io/github/release/spike0en/nothing_archive?label=Latest%20Release&logo=git&logoColor=white&color=1E6091)](https://github.com/spike0en/nothing_archive/releases/latest)

## このアーカイブについて 📢 
このアーカイブは、[Nothing](https://nothing.tech/) および [CMF by Nothing](https://cmf.tech/) デバイス用の変更がされていない Stock OTA イメージ、アップデートリンク、および完全なファームウェアパッケージの最新版のコレクションを提供します。**ファームウェアファイルは公式サーバーから** 直接インデックス化され、手動での Flash、サイドローディング、および長期の保存用に[アーカイブ](https://archive.org/details/nothing-archive)されます。Stock OTA イメージは AOSP の OTA 抽出ツールを使用して生成しています。

## 機能とベネフィット 🚀    

- **インデックスの作成:** Nothing および CMF デバイスの OEM サーバーから公式の OTA アップデートリンクを直接インデックスします。
- **サイドローディング:** リージョンベースのロールアウト時、またはデバイスが OTA アップデートを受信できない場合に手動でアップデートをサイドローディングすることができます。手順については [OTA サイドローディングのガイド](https://telegra.ph/OTA-Sideloading-Guide-for-Nothing-Devices-01-17)をご確認ください。
- **保存:** ロールバック、テスト、ダンプ、または復元用として使用可能なすべてのバージョンのファームウェアを保存できます。
- **Stock OTA イメージ:** OEM から完全なストックファームウェアを入手できない場合に、変更が一切されていない Stock OTA イメージを生成します。
- **root 化のサポート:** サポートされているデバイスで、使用可能な root 化、または root 化の解除をするために必要な Stock イメージファイルを提供します。
- **ファームウェアの Flash と アンブリック:** ブートループ、ソフトブリックの解決、カスタム ROM からのリストアをするために公式ファームウェアまたは、パーティションイメージを Flash できます。

## ダウンロード 📥 
**リリースのインデックス** にアクセスするには、以下のドロップダウンリストから **デバイスのモデル** を選択してください:

<details>
  <summary>Nothing Phone (1) - Spacewar</summary>

<br>

**手順**: より詳細な手順は[こちら](https://github.com/spike0en/nothing_archive/tree/spacewar)をご確認ください。

<br>

| **Nothing OS のバージョン** | **ビルド番号**     | **Incremental OTA**                                | **Full OTA**                           | **OTA イメージ**          |
|------------------|-------------------|-----------------------------------------------------|-------------------------------------------------------|-------------------------|
| 3.0 | Spacewar-V3.0-250108-1938 | Spacewar_V3.0-241211-0926 -> [Spacewar_V3.0-250108-1938](https://android.googleapis.com/packages/ota-api/package/5120cc00410342a673f19758eff45337443d934c.zip) // Spacewar_U2.6-241031-1818 -> [Spacewar_V3.0-250108-1938](https://android.googleapis.com/packages/ota-api/package/6090fa491107f5cd6c02527eec962da40ea2fe35.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/spacewar/Spacewar_V3.0-250108-1938_3.0.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-spacewar.250108) |
| 3.0 OB-1 | Spacewar-V3.0-241211-0926 | Spacewar_U2.6-241031-1818 -> [Spacewar_V3.0-241211-0926](https://android.googleapis.com/packages/ota-api/package/3c291e4fb02cd41d58cececb5ee4855d719eb6b7.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-spacewar.241211) |
| 2.6 | Spacewar-U2.6-241031-1818 | Spacewar_U2.6-240904-1634 -> [Spacewar_U2.6-241031-1818](https://android.googleapis.com/packages/ota-api/package/c479de02126d8b5d2044600cc2107a36000aa7a4.zip) | [こちら](https://android.googleapis.com/packages/ota-api/package/ea1bbddf05a019dfe73499cbbac43a0c12b585bc.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-spacewar.241031) |
| 2.6 | Spacewar-U2.6-240904-1634 | Spacewar_U2.6-240705-1617 -> [Spacewar_U2.6-240904-1634](https://android.googleapis.com/packages/ota-api/package/159a36df32499e2153475db11ef1f6b8775770f2.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-spacewar.240705) |
| 2.6 | Spacewar-U2.6-240705-1617 | Spacewar_U2.5-240612-2149 -> [Spacewar_U2.6-240705-1617](https://android.googleapis.com/packages/ota-api/package/879c1c1c8fc99eb43a6378d716ae8704a78924b3.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/spacewar/Spacewar_U2.6-240705-1617_2.6.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-spacewar.240705) |
| 2.5.6 | Spacewar-U2.5-240612-2149 | Spacewar_U2.5-240419-1617 -> [Spacewar_U2.5-240612-2149](https://android.googleapis.com/packages/ota-api/package/54c1298c0fbeae5b9f2454762183beb074d883b5.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/spacewar/Spacewar_U2.5-240612-2149_2.5.6.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.6-spacewar.240612) |
| 2.5.3A | Spacewar-U2.5-240317-2245 | Spacewar_U2.5-240301-1852 -> [Spacewar_U2.5-240317-2245](https://android.googleapis.com/packages/ota-api/package/176fffc72ad05488556821215d3e10ffc939ff35.zip) // Spacewar_U2.5-240207-1031 -> [Spacewar_U2.5-240317-2245](https://android.googleapis.com/packages/ota-api/package/158f65d4c44323ac9ea4c0c64e97b0a37d9aac74.zip) | [こちら](https://android.googleapis.com/packages/ota-api/package/af8523121e2e73f564bb78ceb3074deec7222c6b.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.3-A-spacewar.240317) |
| 2.5.3 | Spacewar-U2.5-240301-1852 | Spacewar_U2.5-240207-1031 -> [Spacewar_U2.5-240301-1852](https://android.googleapis.com/packages/ota-api/package/993ef2c61a5d996015d7ff07f955cc8dbb6344c4.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.3-spacewar.240301) |
| 2.5.2 HOTFIX | Spacewar-U2.5-240207-1031 | Spacewar_U2.5-240119-1910 -> [Spacewar-U2.5-240207-1031](https://android.googleapis.com/packages/ota-api/package/af7de84da8337982201cbd7da8cee51ddc9d0241.zip) // Spacewar_T2.0-231110-1731 -> [Spacewar_U2.5-240207-1031](https://android.googleapis.com/packages/ota-api/package/11d4669cdf0b425d4f8e237f71edc849062365da.zip) | [こちら](https://android.googleapis.com/packages/ota-api/package/80dec3051c16eb22f456e8682917f0849b749ba8.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.2-spacewar.240207) |
| 2.5.2 | Spacewar-U2.5-240119-1910 | Spacewar_T2.0-231110-1731 -> [Spacewar_U2.5-240119-1910](https://android.googleapis.com/packages/ota-api/package/af7de84da8337982201cbd7da8cee51ddc9d0241.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.2-spacewar.240119) |
| 2.0.5 | Spacewar-T2.0-231110-1731 | Spacewar_T2.0-231006-1014 -> [Spacewar_T2.0-231110-1731](https://android.googleapis.com/packages/ota-api/package/d7a07c6103f9aa3cfc93a83d8d15d547f6281b67.zip) | [こちら](https://android.googleapis.com/packages/ota-api/package/d8c21c8c162c9677ba78e51305abaf5b0ccd30e2.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.0.5-spacewar.231110) |
| 2.0.4 | Spacewar-T2.0-231006-1014 | Spacewar_T2.0-230901-1652 -> [Spacewar_T2.0-231006-1014](https://android.googleapis.com/packages/ota-api/package/d7a07c6103f9aa3cfc93a83d8d15d547f6281b67.zip) | [こちら](https://android.googleapis.com/packages/ota-api/package/d8c21c8c162c9677ba78e51305abaf5b0ccd30e2.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.0.4-spacewar.231006) |
| 2.0.2 HOTFIX | Spacewar-T2.0-230901-1652 | Spacewar_T2.0-230822-1751 -> [Spacewar_T2.0-230901-1652](https://android.googleapis.com/packages/ota-api/package/1adc1351b0bd9a7a75efe40b3aa8baa7c6eb054f.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/spacewar/Spacewar_U2.5-240207-1031_2.5.2-Hotfix.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.0.2-spacewar.230901) |
| 2.0.2 | Spacewar-T2.0-230822-1751 | Spacewar_T1.5-230706-1942 -> [Spacewar_T2.0-230822-1751](https://android.googleapis.com/packages/ota-api/package/117f22e84abcb24eea583125ef69ab938643f914.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.0.2-spacewar.230822) |
| 1.5.6​ | Spacewar-T1.5-230706-1942 | Spacewar_T1.5-230619-0042 -> [Spacewar_T1.5-230706-1942](https://android.googleapis.com/packages/ota-api/package/9b59f7c44dee9c7712b163af950a554d63950ff3.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/1.5.6-spacewar.230706) |
| 1.5.5 | Spacewar-T1.5-230619-0042 | Spacewar_T1.5-230428-2017 -> [Spacewar_T1.5-230619-0042](https://android.googleapis.com/packages/ota-api/package/b0d72e21232dfd4392c6eaaeb651dcfd163007f3.zip) | [こちら](https://android.googleapis.com/packages/ota-api/package/1d156af4eb59f85c62c7921e6c4a97c2761bcc3b.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/1.5.5-spacewar.230619) |
| 1.5.4 | Spacewar_T1.5-230428-2017 | Spacewar_T1.5-230317-2039 -> [Spacewar_T1.5-230428-2017](https://android.googleapis.com/packages/ota-api/package/da75a517b2ab113621a45c01fad5f8867caea71c.zip) // Spacewar_T1.5-230213-2131 -> [Spacewar_T1.5-230428-2017](https://android.googleapis.com/packages/ota-api/package/945010bc8ae5f6e2171c54bb2fee51a99ca16223.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/1.5.4-spacewar.230428) |
| 1.5.3 HOTFIX | Spacewar_T1.5-230317-2039 | Spacewar_T1.5-230310-1650 -> [Spacewar_T1.5-230317-2039](https://android.googleapis.com/packages/ota-api/package/364c55148c84d22efab1c58953d807e40da040a9.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/spacewar/Spacewar_T1.5-230317-2039_1.5.3-Hotfix.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/1.5.3-spacewar.230317) |
| 1.5.3 | Spacewar-T1.5-230310-1650 | Spacewar_T1.5-230213-2131 -> [Spacewar_T1.5-230310-1650](https://android.googleapis.com/packages/ota-api/package/68158669e0fc6d6eee95e2612c2e84ed840faeec.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/1.5.2-spacewar.230213) |

</details>

<details>
  <summary>Nothing Phone (2) - Pong</summary>
  
<br>

**手順**: より詳細な手順は[こちら](https://github.com/spike0en/nothing_archive/tree/pong)をご確認ください。

<br>

| **Nothing OS のバージョン** | **ビルド番号**     | **Incremental OTA**                                 | **Full OTA**                           | **OTA イメージ**          |
|------------------|-------------------|-----------------------------------------------------|-------------------------------------------------------|-------------------------|
| 3.0 | Pong-V3.0-250113-1723 | Pong_V3.0-241226-2001 -> [Pong_V3.0-250113-1723](https://android.googleapis.com/packages/ota-api/package/2d4ff3545f89bf68eca8f54f2dc6bb94da625ae3.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pong/Pong_V3.0-250113-1723_3.0.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-pong.250113) |
| 3.0 | Pong-V3.0-241226-2001 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241226-2001](https://android.googleapis.com/packages/ota-api/package/dccd75a44c18bf956e56c82e2cd7f6861c10cad5.zip) // Pong_V3.0-241207-0124 -> [Pong_V3.0-241226-2001](https://android.googleapis.com/packages/ota-api/package/c256635e9442c1fe8de48a9c93cf199c779a7b27.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pong/Pong_V3.0-241226-2001_3.0.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-pong.241226) |
| 3.0 | Pong-V3.0-241207-0124 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241207-0124](https://android.googleapis.com/packages/ota-api/package/75ded7f0b0553a9e590c9c85434a1dde5b23df9a.zip) // Pong_V3.0-241028-1925 -> [Pong_V3.0-241207-0124](https://android.googleapis.com/packages/ota-api/package/b5b75a650caf20c5b06d8a29a9d595783c6b3e72.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pong/Pong_V3.0-241207-0124_3.0.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-pong.241207) |
| 3.0 OB-1 | Pong-V3.0-241028-1925 | Pong_U2.6-241016-1700 -> [Pong_V3.0-241028-1925](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241016_170017_20241028_192505.zip?Expires=1990059626&Signature=MrORjWYMh5XXPMFhasr3rphaclJXtvXPnr9Gwj1BTFBL3K8k8J2fe~1eaw9E-ZMmu5FyaNFtchFj5NayGlJzBni0XxmWX6Y8NkXrVlWVmTqj6G1qgujUYJQiDSAgMIxh8k~Zoi5LI-tY9Lb5nDhCOuqX4zWVBETCjXiSnHPx5u8zEmOz7-jE7TUBwg5RWGDNUKRQBa2ax1vRBvkWEIrn0c9YXosm1ot1ArAAmT3KzLBHYOPQj1n6FjEvixU1Ul7mvaxsX5oZ0eMnyonH7aC9x4p01l3pNQyI4r8Ikx~LuSA5DxF0Fqtj9IXbkxNY0F7oBelkt4c8Z8SOpTJ5J3ufVA__&Key-Pair-Id=K1EOR8HYJKSWP1) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-pong.241028) |
| 2.6 | Pong-U2.6-241016-1700 | Pong_U2.6-240828-1751 -> [Pong_U2.6-241016-1700](https://android.googleapis.com/packages/ota-api/package/b281c8062dcf2a584a524b433907cfeb514df51a.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.6-241016-1700_2.6.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-pong.241016) |
| 2.6 | Pong-U2.6-240828-1751 | Pong_U2.6-240628-0430 -> [Pong_U2.6-240828-1751](https://android.googleapis.com/packages/ota-api/package/429c8fba7521ddf3ada2faebd57ba5cd0ca67408.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-pong.240828) |
| 2.6 | Pong-U2.6-240628-0430 | Pong_U2.5-240606-1801 -> [Pong_U2.6-240628-0430](https://android.googleapis.com/packages/ota-api/package/6fd26cf6ec1ab4520ab384caad5a6d79ded15ae8.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-pong.240628) |
| 2.5.6 | Pong-U2.5-240606-1801 | Pong_U2.5-240419-0138 -> [Pong_U2.5-240606-1801](https://android.googleapis.com/packages/ota-api/package/4d850df66992c4b79ce4d714a27216518ca541e4.zip) // Pong_U2.5-240418-1248 -> [Pong_U2.5-240606-1801](https://android.googleapis.com/packages/ota-api/package/5ea6aefb7bca17c9b477ec7ac17d6412c0f90f3b.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.6-pong.240606) |
| 2.5.5 | Pong-U2.5-240418-1248 | Pong_U2.5-240327-2140 -> [Pong_U2.5-240418-1248](https://android.googleapis.com/packages/ota-api/package/93383c8b9c42fc40f89df861159c6b52408bc6e6.zip) // Pong_U2.5-240410-1247 -> [Pong_U2.5-240418-1248](https://android.googleapis.com/packages/ota-api/package/04163fecbb7a8617636e9d1773c86ae9f1caf30b.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.5-pong.240418) |
| 2.5.5 | Pong-U2.5-240410-1247 | Pong_U2.5-240327-2140 -> [Pong_U2.5-240410-1247](https://android.googleapis.com/packages/ota-api/package/44a00fa0a6226aa51f54ee5e5418e0935275d542.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.5-240410-1247_2.5.5.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.5-pong.240410) |
| 2.5.3 | Pong-U2.5-240327-2140 | Pong_U2.5-240116-1446 -> [Pong_U2.5-240327-2140](https://android.googleapis.com/packages/ota-api/package/20eda7e4eafbfe2900393c177a32c352607c2570.zip) | [こちら](https://android.googleapis.com/packages/ota-api/package/dfe935ebb68be6b68d2570b10a96120d27ed05b5.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.3-pong.240327) |
| 2.5.2 | Pong-U2.5-240116-1446 | Pong_U2.5-231228-1342 -> [Pong_U2.5-240116-1446](https://android.googleapis.com/packages/ota-api/package/d77ffb26d8f29e851f6452dcdbc335749b2d60c8.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.5-240116-1446_2.5.2.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.2-pong.240116) |
| 2.5.1A | Pong-U2.5-231228-1342 | Pong_U2.5-231208-2206 -> [Pong_U2.5-231228-1342](https://android.googleapis.com/packages/ota-api/package/88f8c09ad5275c83182cc441c1b6806619947832.zip) | [こちら]((https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.5-231228-1342_2.5.1A.zip)) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.1-A-pong.231228) |
| 2.5.1 | Pong-U2.5-231208-2206 | Pong_T2.0-231024-2214 -> [Pong_U2.5-231208-2206](https://android.googleapis.com/packages/ota-api/package/f3f0db09cdde9dcd118da68821a445af7b0963cc.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.5-231208-2206_2.5.1.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.1-pong.231208) |
| 2.5 OB-2 | Pong-U2.5-231102-1201 | Pong_U2.5-231007-2102 -> [Pong_U2.5-231102-1201](https://archive.org/download/nothing-archive/incremental_ota/pong/Pong_U2.5-231007-2102_Pong_U2.5-231102-1201.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pong/Pong_U2.5-231102-1201_2.5_OB-2.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.0-pong.231102) |
| 2.5 OB-1 | Pong-U2.5-231007-2102 | なし | [こちら](https://archive.org/download/nothing-archive/full_ota/pong/Pong-U2.5-231007-2102_2.5_OB-1.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.0-pong.231007) |
| 2.0.4 | Pong-T2.0-231024-2214 | Pong_T2.0-230906-1933 -> [Pong_T2.0-231024-2214](https://android.googleapis.com/packages/ota-api/package/e6d937f462c864b3ca25ada7f83a7905f82df6ed.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pong/Pong_T2.0-231024-2214_2.0.4.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.0.4-pong.231024) |
| 2.0.3 | Pong-T2.0-230906-1933 | Pong_T2.0-230818-1943 -> [Pong_T2.0-230906-1933](https://android.googleapis.com/packages/ota-api/package/8ba0e8f6c57cd50a63104ca3ba8afdd10c292c78.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pong/Pong_T2.0-230906-1933_2.0.3.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.0.3-pong.230906) |
| 2.0.2A | Pong-T2.0-230818-1943 | Pong_T2.0-230801-1740 -> [Pong_T2.0-230818-1943](https://android.googleapis.com/packages/ota-api/package/6d60ccd4ca081be661beb675c29a41c10fc765c4.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.0.2-A-pong.230818) |
| 2.0.2 | Pong-T2.0-230801-1740 | Pong_T2.0-230719-1458 -> [Pong_T2.0-230801-1740](https://android.googleapis.com/packages/ota-api/package/35989af612c8ac3ed916257ab5f32ee2d90d16a0.zip) | [こちら](https://android.googleapis.com/packages/ota-api/package/fa8a143ace9337699f068e5b1629cafd60f8fbd9.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.0.2-pong.230801) |
| 2.0.1A | Pong-T2.0-230719-1458 | Pong_T2.0-230709-2003 -> [Pong_T2.0-230719-1458](https://android.googleapis.com/packages/ota-api/package/d0f3e3e897154d513c91634ad225da1b724c9455.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.0.1-A-pong.230719) |
| 2.0.1 | Pong-T2.0-230709-2003 | なし | [こちら](https://android.googleapis.com/packages/ota-api/package/7becde0f47753b99a7cc37ff27713ba8a48ef51a.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.0.1-pong.230709) |

</details>

<details>
  <summary>Nothing Phone (2a) - Pacman</summary>
  
<br>

**手順**: より詳細な手順は[こちら](https://github.com/spike0en/nothing_archive/tree/pacman)をご確認ください。

**注意**: バージョン 2.5.3 から 2.5.5A はミルク、ホワイト、ブラックのカラーバリエーションなデバイスのみ互換性があります。バージョン 2.5.6 以降はブルー、Special Edition を含むすべてのカラーバリエーションをサポートしています。

<br>

| **Nothing OS のバージョン** | **ビルド番号**     | **Incremental OTA**                                 | **Full OTA**                           | **OTA イメージ**          |
|------------------|-------------------|-----------------------------------------------------|-------------------------------------------------------|-------------------------|
| 3.0 | Pacman-V3.0-250114-1909 | Pacman_V3.0-250103-1741 -> [Pacman_V3.0-250114-1909](https://android.googleapis.com/packages/ota-api/package/b087f08204adfcd5ef226f2559fc8c1d3e613dc9.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-pacman.250114) |
| 3.0 | Pacman-V3.0-250103-1741 | Pacman_V3.0-241210-2057 -> [Pacman_V3.0-250103-1741](https://android.googleapis.com/packages/ota-api/package/34c43764d71f9df1c6c1575cc35134c68acebcb6.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pacman/Pacman_V3.0-241210-2057.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-pacman.250103) |
| 3.0 | Pacman-V3.0-241210-2057 | Pacman-U2.6-241021_2253 -> [Pacman_V3.0-241210-2057](https://android.googleapis.com/packages/ota-api/package/7e81406e8f6908b1504620ca979cb8fa80dc84cb.zip) | なし | [こちら](https://android.googleapis.com/packages/ota-api/package/7e81406e8f6908b1504620ca979cb8fa80dc84cb.zip) |
| 3.0 OB-2 | Pacman-V3.0-241031-2105 | Pacman_V3.0-240923-2135 -> [Pacman_V3.0-241031-2105](https://android.googleapis.com/packages/ota-api/package/d19689ac9fa0e4df5ab2a65c8ae9a52442e62a04.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-pacman.241031) |
| 2.6 | Pacman-U2.6-241021-2253 | Pacman_U2.6-240828-1906 -> [Pacman_U2.6-241021-2253](https://android.googleapis.com/packages/ota-api/package/5452dd9d6232cef1e3ba7562b5de822e291bea17.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-pacman.241021) |
| 3.0 OB-1 | Pacman-V3.0-240923-2135 | Pacman_U2.6-240828-1906 -> [Pacman_V3.0-240923-2135](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20240828_190644_20240923_213518.zip?Expires=1987558972&Signature=E0YjB7bUlCSxcNULPatdqUt26FtNPfZ2OieUhBPCP11MOqyRMbDOP~mRAz0hVy7loN-V97l68rEbrvFeBKOP5ONguXkD0MBaezQfnYLtQJXfIRdXjVXwXBE6jeOi-KragO0NdhPV~fHPBmI06Fn0P4wKPX-vr-R4Hw00QnqPx1lC~YrAHYN2G3pkGdvKvYowJjECI6gufVgDjgZyAAbgzMYtNuB3GfqtqxBowCo7peT4g3iQuBu81exTWW0bTc6Fw9wNuWbnU-UPvu3B7EWG19sETZdvWNRj-79loQWAlNwVNHou9ADheeTzDgBygkd7MZGCQmXhm-E8UBesgFwqbQ__&Key-Pair-Id=K1EOR8HYJKSWP1) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-pacman.241031) |
| 2.6 | Pacman-U2.6-240828-1906 | Pacman_U2.6-240701-2308 -> [Pacman_U2.6-240828-1906](https://android.googleapis.com/packages/ota-api/package/a36018db578fa81b74c8150812104e530fc75d0d.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-pacman.240828) |
| 2.6 | Pacman-U2.6-240701-2308 | Pacman_U2.5-240522-1818 -> [Pacman_U2.6-240701-2308](https://android.googleapis.com/packages/ota-api/package/8351e1949122ca88c8149ebef62e986a1cc7b4d3.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-pacman.240701) |
| 2.5.6 | Pacman-U2.5-240522-1818 | Pacman_U2.5-240419-2235 -> [Pacman_U2.5-240522-1818](https://android.googleapis.com/packages/ota-api/package/eb753e881f986f0807b7b8c0e34754145bb594e0.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.6-pacman.240522) |
| 2.5.5A | Pacman-U2.5-240419-2235 | Pacman_U2.5-240410-1238 -> [Pacman_U2.5-240419-2235](https://android.googleapis.com/packages/ota-api/package/0f96a78ccd851e6c91abbb7d64ad1fc2691617ea.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.5-A-pacman_240419) |
| 2.5.5 | Pacman-U2.5-240410-1238 | Pacman_U2.5-240322-1016 -> [Pacman_U2.5-240410-1238](https://android.googleapis.com/packages/ota-api/package/cba47167162f5940362699d12bc16d4ef3f5beef.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.5-pacman.240410) |
| 2.5.4A | Pacman-U2.5-240322-1016 | なし | [こちら](https://archive.org/download/nothing-archive/full_ota/pacman/Pacman_U2.5-240322-1016_2.5.4A.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.4-A-pacman.240322) |
| 2.5.4 | Pacman-U2.5-240315-0035 | なし | [こちら](https://archive.org/download/nothing-archive/full_ota/pacman/Pacman_U2.5-240315-0035_2.5.4.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.4-pacman.240315) |
| 2.5.3 | Pacman-U2.5-240301-2206 | なし | [こちら](https://archive.org/download/nothing-archive/full_ota/pacman/Pacman_U2.5-240301-2206_2.5.3.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.3-pacman.240301) |
| 2.5 | Pacman-U2.5-231207-0042 | なし | [こちら](https://archive.org/download/nothing-archive/full_ota/pacman/Pacman_U2.5-231207-0042_2.5.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.5.0-pacman.231207) |

</details>

<details>
  <summary>Nothing Phone (2a) Plus - PacmanPro</summary>
  
<br>

**手順**: より詳細な手順は[こちら](https://github.com/spike0en/nothing_archive/tree/pacman)をご確認ください。

<br>

| **Nothing OS のバージョン** | **ビルド番号**     | **Incremental OTA**                                 | **Full OTA**                           | **OTA イメージ**          |
|------------------|-------------------|-----------------------------------------------------|-------------------------------------------------------|-------------------------|
| 3.0 | PacmanPro-V3.0-241226-1537 | PacmanPro_V3.0-241126-1448 -> [PacmanPro_V3.0-241226-1537](https://android.googleapis.com/packages/ota-api/package/920e82afd0cb40da211a887baeb5297224c3a2c8.zip) // PacmanPro_U2.6-241217-1545 -> [PacmanPro_V3.0-241226-1537](https://android.googleapis.com/packages/ota-api/package/76b3f6ca552d54d5438aef2d8685586250e8b6ca.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pacmanpro/PacmanPro_V3.0-241226-1537_3.0.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-pacmanpro.241226) |
| 3.0 OB-1 | PacmanPro-V3.0-241126-1448 | PacmanPro_U2.6-241125-2243 -> [PacmanPro_V3.0-241126-1448](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241125_224310_20241126_144811.zip?Expires=1993198031&Signature=CUmhVNk~bhACxtqLFXzj4Wr6b1~Bvc6F7-TVE~3reJLIp1K534egj9liWfX45VscVKmyMXFjr~nRTXjLw7DE4CuYAtyd43DkvUhasyDNTyeVHOoiGa1dZznANiP1y4TTg-ATCAVovwv3kVHlZGhii7a~T8gYNGXsUPdknC-L-6dgI1AVutlQ2sYE4axXuGp2BOq9S6dvG28xkmdQWyZrxomo1bFXsPpiEcAfiL94UP2HNQ23RVmLfyElVWpZxscGQgHfTmMtcl3aJxAxCcUedMj3KThkkfV~k9sMhiB2Vn-5s43l5gW6wu3E6FbiWYaeRtQ65SDr9AZs4B0cDV-pGA__&Key-Pair-Id=K1EOR8HYJKSWP1) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-pacmanpro.241126) |
| 2.6 | PacmanPro-U2.6-241217-1545 | PacmanPro_U2.6-241125-2243 -> [PacmanPro_U2.6-241217-1545](https://android.googleapis.com/packages/ota-api/package/bbb9972e05e68086de1843050939e8ca1a75e39e.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-pacmanpro.241217) |
| 2.6 | PacmanPro-U2.6-241125-2243 | PacmanPro_U2.6-240924 -> [PacmanPro_U2.6-241125-2243](https://android.googleapis.com/packages/ota-api/package/b0e5614fca80d0cb2bdfa3d4bfca1e3c77560265.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-pacmanpro.241125) |
| 2.6 | PacmanPro-U2.6-240924-2223 | PacmanPro_U2.6-240723-1102 -> [PacmanPro_U2.6-240924-2223](https://android.googleapis.com/packages/ota-api/package/b8d1f9e6b3de2f85bc2ca29632bb11b23686078f.zip) | [こちら](https://archive.org/download/nothing-archive/full_ota/pacmanpro/PacmanPro_U2.6-240924-2223_2.6.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-pacmanpro.240924) |
| 2.6 | PacmanPro-U2.6-240723-1102 | なし | [こちら](https://archive.org/download/nothing-archive/full_ota/pacmanpro/PacmanPro_U2.6-240723-1102.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-pacmanpro.240827) |

</details>

<details>
  <summary>CMF Phone (1) - Tetris</summary>
  
<br>

**手順**: より詳細な手順は[こちら](https://github.com/spike0en/nothing_archive/tree/tetris)をご確認ください。

<br>

| **Nothing OS のバージョン** | **ビルド番号**     | **Incremental OTA**                                 | **Full OTA**                           | **OTA イメージ**          |
|------------------|-------------------|-----------------------------------------------------|-------------------------------------------------------|-------------------------|
| 3.0 | Tetris-V3.0-250111-2249 | Tetris_U2.6-241204-2338 -> [Tetris_V3.0-250111-2249](https://android.googleapis.com/packages/ota-api/package/5dccb5b8fedd073b498b7ca3ea364ab9dc3702d8.zip) // Tetris_V3.0-241205-0050 -> [Tetris_V3.0-250111-2249](https://android.googleapis.com/packages/ota-api/package/67feb668686ad7363ef39906168530af25c265b9.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-tetris.250111) |
| 3.0 OB-1 | Tetris-V3.0-241205-0050 | Tetris_U2.6-241125-2107 -> [Tetris_V3.0-241205-0050](https://d2j3l8bo7dc01w.cloudfront.net/ota_diff_20241125_210739_20241205_005022.zip?Expires=1993023098&Signature=c7Wzv7dfnpD1TbSb~imjm9sGWwpQrCgY9caLXO94DbUK~yQvCFs6yxqMXTUTdZtFhZOXp4BR7b2qwF1bXMHrJg-Kb7gEq5087yZEKOx6UJUFzOmth97BxvfxmIt6ROiwhLJ2~7U9XwZnD4oI8cgGfFaGS6EL21KrOIax1groWS09mh6Ogm-ssLjsc~-1qCQU2ogNHtu2Yt6AfWPAvZ7dpMb4WBN2qjrKJdRjzMTuCyH6zud8S42Bwyw0UefY-OA2pFoMti0KKUCyPwGlQxOvAZiKfZS6n6RBNkhekQzaPi-G0mG1m0kujK8e01fdT769RfTESbuwlBceCsemnktj3w__&Key-Pair-Id=K1EOR8HYJKSWP1) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/3.0.0-tetris.241205) |
| 2.6 | Tetris-U2.6-241204-2338 | Tetris_U2.6-241125-2107 -> [Tetris_U2.6-241204-2338](https://android.googleapis.com/packages/ota-api/package/4f5070152393f8d3e4a584cc83a55b510fcacc95.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-tetris.241204) |
| 2.6 | Tetris-U2.6-241125-2107 | Tetris_U2.6-241021-2030 -> [Tetris_U2.6-241125-2107](https://android.googleapis.com/packages/ota-api/package/e8139bd6d603532ce29cf276eca4e612fb2aad20.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-tetris.241125) |
| 2.6 | Tetris-U2.6-241021-2030 | Tetris_U2.6-240910-1735 -> [Tetris_U2.6-241021-2030](https://android.googleapis.com/packages/ota-api/package/c7ee5ac3622008faa41032a4fbf6b6b9767f6d20.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-tetris.241021) |
| 2.6 | Tetris-U2.6-240910-1735 | Tetris_U2.6-240719-2323 -> [Tetris_U2.6-240910-1735](https://android.googleapis.com/packages/ota-api/package/fb3dc5e18523b52114448abf236be119fe561787.zip) | [こちら](https://android.googleapis.com/packages/ota-api/package/adf8245c2d0cd50895ddece5f2366da80b2675c4.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-tetris.240910) |
| 2.6 | Tetris-U2.6-240828-2341 | Tetris_U2.6-240813-2046 -> [Tetris-U2.6-240828-2341](https://android.googleapis.com/packages/ota-api/package/6140b9ee7974e0c531694f18f972243a5c48be6b.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-tetris.240828) |
| 2.6 | Tetris-U2.6-240813-2046 | Tetris_U2.6-240729-1047 -> [Tetris_U2.6-240813-2046](https://android.googleapis.com/packages/ota-api/package/397fb089fe692ccbda135dcc8434d90add1388a5.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-tetris.240813) |
| 2.6 | Tetris-U2.6-240729-1047 | Tetris_U2.6-240702-2200 -> [Tetris_U2.6-240729-1047](https://android.googleapis.com/packages/ota-api/package/48fe84d5164a62417debe07bfff5d7c3ba19046e.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-tetris.240729) | 
| 2.6 | Tetris-U2.6-240713-1955 | Tetris_U2.6-240702-2200 -> [Tetris-U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/24c251bfc97dbe9a32777af2677e979e38bfcef2.zip) // Tetris_U2.6-240606-1805 -> [Tetris_U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/d84e482fad907cef29a0de4dc344d18e61adf42a.zip) // Tetris_U2.6-240524-1536 -> [Tetris_U2.6-240713-1955](https://android.googleapis.com/packages/ota-api/package/72b82b535759b4559d0eb60c20e9ceabd303872a.zip) | なし | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-tetris.240713) |
| 2.6 | Tetris-U2.6-240702-2200 | なし | [こちら](https://archive.org/download/nothing-archive/full_ota/tetris/Tetris_U2.6-240702-2200_2.6.zip) | [こちら](https://github.com/spike0en/nothing_archive/releases/tag/2.6.0-tetris.240702) |

</details>

## 免責事項 ⚠️

- **信頼性** – ファームウェアは **OEM サーバーから直接取得** され、変更は一切していません。
- **手動での Flash** – 別途記載がない限り、リリースはデバイスのすべてのリージョンと互換性があります。
- **アーカイブ済みのビルド** – ビルドがアーカイブ済みであれば、公式サーバーからの利用ができなくなったとしてもここで利用ができます。
- **自己責任で使用する** – プロジェクトは、OS の問題やバグについての **責任を一切負いません。** ファームウェアは **一切変更されておらず**、その信頼性については OEM のみが責任を負います。ユーザーは、**指示に注意深く従うこと** や自分の判断で進める必要があります。
- **オープンソースを尊重する** – このアーカイブのファイルをいかなる形式でも再配布することは **固く禁じます。** コンテンツをミラーするのではなく、プロジェクトのサポートをご検討ください。

## 謝辞 🤝

多大なるサポートと貢献をした以下の方々に心から感謝を申し上げます:
- **[luk1337](https://github.com/luk1337/oplus_archive)** - Incremental OTA の抽出を可能にした AOSP の OTA 抽出ツールのパイオニアです。
- **[arter97](https://github.com/arter97/nothing_archive)** - アップデートを Nothing Phone (2) に対応させることに貢献しました。
- **[LukeSkyD](https://github.com/LukeSkyD)** - 以前のビルドでの重要なリファレンスとして機能した [Nothing Phone (1) リポジトリ](https://xdaforums.com/t/nothing-phone-1-repo-nos-ota-img-guide-root.4464039/) の管理に貢献しました。
- **[Re*Index.(ot_inc)](https://github.com/reindex-ot)** - 日本語訳の提供、リポジトリを幅広いユーザーにアクセスできるようにサポートしました。
- **[XelXen](https://github.com/XelXen)** - プロジェクトのブランディングのためにロゴとバナーをデザインしました。

## プロジェクトをサポート ⭐  

このアーカイブがお役に立てたのであれば、[リポジトリに Star を付ける](https://github.com/spike0en/nothing_archive/stargazers)ことで、リポジトリの可視性の向上と他のユーザーがこのリポジトリを見つけやすくなります。あなたのサポートは大きな意味をもたらします。ご協力お願いします! 

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
</picture>  

---

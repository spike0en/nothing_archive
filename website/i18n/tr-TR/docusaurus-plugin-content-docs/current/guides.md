---
sidebar_position: 4
title: Rehberler
description: Önyükleyici kilidi açma, root atma, OTA güncellemeleri ve Nothing cihaz özelleştirme için adım adım rehberler.
keywords: [nothing önyükleyici kilidi açma, nothing root, nothing fastboot, nothing ota güncellemeleri, nothing çevirici kodları, essential tuşu yeniden atama]
---

# Rehberler

Çeşitli konularda adım adım yol göstericiler.

## Genel Kullanım ve Sorun Giderme

Günlük kullanım için ipuçları, püf noktaları ve genel rehberler.

### OTA Sideloading

:::note

- Artımlı (incremental) OTA güncellemelerini sideload ile yüklemek için önyükleyici (bootloader) kilidini açmak **zorunlu değildir**. Root'lu bir kullanıcı değilseniz Adım A'yı atlayın.
- Resmi artımlı veya tam (full) OTA güncellemelerini, doğrudan bu arşivden indirildiği sürece sideload ile yüklemek güvenlidir.
- Üçüncü taraf kaynakları kullanmayın. Nothing Arşivi'ndeki tüm bellenimler doğrudan Nothing'in resmi OEM sunucularından alınmıştır.  
  Bu, artımlı OTA bölümündeki indirme URL'lerini inceleyerek doğrulanabilir; bu URL'ler üçüncü taraf dosya barındırıcılarına değil, resmi sunucuya işaret eder.
- Nothing OS'in yerleşik çevrimdışı güncelleyicisi yalnızca OEM tarafından imzalanmış güncelleme paketlerini kabul eder.
- Güncelleyici, yüklemeden önce bellenim karmasını (hash) doğrular ve yanlış veya eşleşmeyen bir OTA zip dosyası kullanıldığında başarısız olur.
- Aynı doğrulama tam OTA paketleri için de geçerlidir; bütünlükleri bozulmadığı sürece yüklenmezler.
- Bu kontroller nedeniyle, kilitli bir önyükleyicide resmi bir OTA zip dosyasını sideload ile yükleyerek cihazınızı "brick" etmeniz mümkün değildir.
- Open Beta Test güncellemeleri için, çevirici yöntemi çalışmazsa, OEM tarafından sağlanan `Nothing Beta Updater Hub` (adı gelecekte değişebilir) aracılığıyla sideload ile yükleme yapın.
  Arayüzü Ayarlar'dan başlatabilirsiniz. Bu, stok sürümün üzerine yazan OEM beta güncelleyici uygulamasını yüklediğinizde gerçekleşir.
- Görsel referanslar için [buradaki](https://github.com/spike0en/nothing_archive/tree/main/assets/sideloading) resimlere belirtilen sırayla bakın.

:::

<br />

A. **Stok Bölümleri Geri Yükleme (Sadece Root'lu Kullanıcılar İçin)**  
  :::tip
  Önyükleyici kilidiniz kapalıysa doğrudan B Noktasına atlayın!
  :::

1. **Mevcut Nothing OS sürümünüzü kontrol edin:**  
   - `Ayarlar > Telefon hakkında > Cihaz başlığına dokunun`.  
   - Yapı numarasını not edin.  

2. **Mevcut bellenim yapınız için stok imajlarını alın:**  
   - `-boot-image.7z` dosyasını indirin.  
   - Arşivi çıkararak `.img` dosyalarını elde edin.  

3. **Gerekli bölümleri tanımlayın:**  
   - **Qualcomm Cihazlar:** `boot`, `init_boot`, `vendor_boot`, `recovery`, `vbmeta`  
   - **MediaTek Cihazlar:** `init_boot`, `vbmeta`, `lk`

4. **Stok bölümleri** önyükleyici modunda flaşlayın:  
   :::note
   Sadece değiştirilmiş bölümlerin flaşlanması gerekir. Ayrıca SoC platformunuza bağlı olarak eksik bölümleri atlayın. 
   :::
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   fastboot flash --slot=all lk lk.img
   ```

5. **Sistemi yeniden başlatın ve Sistem Güncelleyici üzerinden güncelleyin:**
   - Güncelleme **başarısız olursa**, bir sonraki bölümdeki **manuel sideloading** işlemiyle devam edin.

6. **Root'u Geri Yükleme (İsteğe Bağlı):**
   - Güncellemeden sonra, güncellenmiş NOS sürümü için **yamalı bir boot imajı flaşlayarak** yeniden root yetkisi alabilirsiniz.
   - Yeniden root işleminden sonra **modülleriniz bozulmadan kalacaktır**.

<br />

B. **Sideloading İşlemine Devam Etme** 

 - **Doğru Güncelleme Bellenim Dosyasını İndirin:**  
   - Cihazınız için doğru OTA bellenim dosyasını [buradan](/docs/firmware) bulun.

 - **Doğru Dosya Nasıl Seçilir?**  
   - Depoya gidin ve cihaz modelinizi seçin.  
   - Artımlı OTA (Incremental OTA) sütununa bakın.  
   - **Mevcut İşletim Sistemi Yapı Numaranızı Doğrulayın**:  
     - Ayarlar > Sistem > Telefon Hakkında bölümüne gidin.  
     - **Cihaz başlığına** dokunun ve **Yapı Numarasını** not edin.

 - **Örnek:**  
   - **Phone (2)** cihazınızın yapı numarasının `Pong_U2.6-241016-1700` olduğunu varsayalım. 
     - Mevcut en son OTA güncellemesinin `Pong_V3.0-241226-2001` olduğunu varsayalım.
     - Karşılık gelen güncelleme yolu: `Pong_U2.6-241016-1700` -> `Pong_V3.0-241226-2001` olacaktır.
   - Cihazınıza ve işletim sistemi sürümünüze göre doğru yolu seçtiğinizden emin olun.
     - Daha net bilgi için [şuna](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg) bakın.

 - **`ota` Klasörünü Oluşturun:** 
   - Cihazınızın **dahili depolama biriminde** `ota` adında bir klasör oluşturun, tam yol şöyledir:  
     ```text
     /sdcard/ota/
     ```
   - İndirilen `<bellenim>.zip` dosyasını bu klasöre taşıyın.

 - **Nothing Çevrimdışı OTA Güncelleyicisine Erişin:**  
    - **Telefon uygulamasını** açın ve şunu tuşlayın:  
      ```text
      *#*#682#*#*
      ```
   - Bu, yerleşik çevrimdışı güncelleme aracını başlatacaktır.  
   - Arayüzde `NothingOfflineOtaUpdate` veya `NOTHING BETA OTA UPDATE` yazabilir; her ikisi de çalışır.

 - **Güncellemeyi Uygulayın:**  
   - Güncelleyici, güncelleme dosyasını otomatik olarak algılayacaktır.  
   - Algılanmazsa, manuel olarak göz atın ve OTA dosyasını içe aktarın.  
   - `Directly Apply OTA` veya `Update` düğmesine dokunun (uygulama arayüzüne göre).  
   - Güncellemenin tamamlanmasını bekleyin; cihazınız otomatik olarak yeniden başlayacaktır.

:::note

- Güncelleyici **bilinmeyen bir hata** gösterirse, dosyayı manuel olarak **"ota"** klasörüne kopyalamak yerine **"Göz At" (Browse)** seçeneğini kullanmayı deneyin.
- Artımlı OTA başarısız olursa **Tam (Full) OTA bellenimi** sideload ile yüklenebilir.
- **Tam OTA, sürüm düşürmek (downgrade) için kullanılamaz**; yalnızca aynı yapıya veya daha yüksek bir yapıya güncelleyebilir.
- **Önyükleyici kilidi açık kullanıcılar**, özel kurtarma modları (recovery) (örneğin Phone (2) için OrangeFox) aracılığıyla tam OTA flaşlayabilirler.
- **Her sürümün Tam OTA dosyası yoktur**; bu tür durumlarda artımlı (incremental) dosyaları kullanın.

:::


<hr />

### Güvenli Mod

- [Güvenli Modda Başlatma](https://www.hardreset.info/devices/nothing/nothing-phone-2/safe-mode/)


<hr />

### Çevirici Kodları

Gizli menülere ve tanılamalara erişmek için tuşlayabileceğiniz çevirici kodları (USSD).

| Kod | İşlev |
|------|----------|
| `*#06#` | IMEI ve Seri Numarasını gösterir |
| `*#07#` | SAR seviyelerini ve yasal bilgileri görüntüler |
| `*#*#569#*#*` | Nothing Geri Bildirim / Günlük (Log) aracını açar |
| `*#*#0#*#*` | Donanım test menüsü (ekran, sensörler, dokunmatik) |
| `*#*#9#*#*` | Nothing Tanılama menüsünü açar |
| `*#*#225#*#*` | Takvim depolama bilgisini gösterir |
| `*#*#426#*#*` | Google Play / Firebase tanılama bilgisi |
| `*#*#4636#*#*` | Test menüsü (telefon, pil, kullanım istatistikleri, Wi-Fi) |
| `*#*#682#*#*` | Çevrimdışı OTA Güncelleyiciyi açar (Nothing Beta Hub yüklüyse çalışmaz) |


---

## Cihaz Özellikleri ve Aksesuarlar

Belirli donanım ince ayarları ve eşleştirmeler için rehberler.

### Bauhaus Temasının Kilidini Açma

Bauhaus'tan ilham alan tema, çeşitli Nothing telefon modellerinde kilidi açılabilen özel bir sürüm özelliğidir.

#### Phone (2a) Special Edition
- [Gizli Özelliğin Kilidini Aç](https://nothing.community/d/11058-hidden-feature-of-phone-2a-special-edition) - Yazan: RapidZapper

#### Diğer Nothing Modelleri

**Gereksinimler:**
- ADB ve Fastboot yüklü bir PC
- [SetEdit Uygulaması](https://github.com/MuntashirAkon/SetEdit)

**Adımlar:**

1. **Geliştirici Seçeneklerini Etkinleştirin:** `Ayarlar > Telefon hakkında > "Yapı numarası"na 7 kez dokunun`.
2. **USB Hata Ayıklamayı Etkinleştirin:** `Ayarlar > Sistem > Geliştirici seçenekleri > USB Hata Ayıklamayı etkinleştirin`.
3. **SetEdit'i ADB Üzerinden Yükleyin:**
   - İndirilen APK dosyasının adını `SetEdit.apk` olarak değiştirin.
   - Şu komutu çalıştırın:
     ```sh
     adb install --bypass-low-target-sdk-block SetEdit.apk
     ```
4. **Temanın Kilidini Açın:**
   - SetEdit'i açın ve istenen tüm izinleri verin.
   - **Sistem Tablosunda** (System Table), `theme_bauhaus_enable` parametresini bulun.
   - Değeri `1` olarak ayarlayın (Devre dışı bırakmak için tekrar `0` yapın).
5. **Temayı Uygulayın:**
   - Nothing Launcher Ayarlarına gidin ve yeni temayı uygulayın.

:::warning

- **SetEdit'teki diğer hiçbir değeri DEĞİŞTİRMEYİN!!**
- Rastgele sistem ayarlarını değiştirmek kararsızlığa veya sistem sorunlarına neden olabilir.

:::


<hr />

### Essential Tuşu Yeniden Atama

Phone (3) üzerindeki Essential Tuşunu yeniden atamak için rehberler:

| Rehber | Yazar |
|-------|--------|
| [Reddit Rehberi](https://www.reddit.com/r/NothingTech/comments/1jzljrf/guide_how_to_remap_the_essential_key_on_the_phone/) | acruzjumper, McKeviin, DKmarc & Pealoaf |
| [Hızlı Yeniden Atama Rehberi](https://www.reddit.com/r/NothingTech/comments/1jv6gea/quick_guide_to_remap_the_essential_space_button/) | David_Ign |
| [XDA Rehberi](https://xdaforums.com/t/how-to-disable-or-remap-the-essentials-button.4755184/) | rwilco12 |
| [GitHub Rehberi](https://github.com/z3phydev/How-to-remap-or-disable-the-Essential-Key) | z3phydev |


<hr />

### Gadgetbridge İle İlgili

- [Desteklenen modeller ve özellikler](https://gadgetbridge.org/gadgets/wearables/nothing/)
- [Nothing CMF sunucu eşleştirmesi](https://gadgetbridge.org/basics/pairing/nothing-cmf-server/)


---

## Gelişmiş Rehberler

:::warning
Sadece ileri düzey kullanıcılar için önerilir. Bu işlemler, yanlış yapıldığında cihazınızı brick edebilir veya garantiyi geçersiz kılabilir.
:::

Bu rehberler kronolojik olarak sıralanmıştır. Bu sırayı tam olarak takip etmeniz şiddetle tavsiye edilir.

### Ön Karşılamalar ve Araçlar

Aşağıdaki gelişmiş rehberler için temel araçlar.

#### USB Sürücüleri

USB dosya transferleri ve cihaz tanıma için temel sürücüler.

- [Windows için Google USB Sürücüleri](https://dl.google.com/android/repository/usb_driver_r13-windows.zip)
- Kurulum rehberleri: [USB](https://droidwin.com/android-usb-drivers) | [Fastboot](https://droidwin.com/how-to-install-fastboot-drivers-in-windows-11/)

#### Platform Araçları (ADB & Fastboot)

Android SDK Platform-Tools'u indirin:
- [Windows / Linux / macOS](https://developer.android.com/studio/releases/platform-tools)
- [Kurulum Rehberi](https://www.xda-developers.com/install-adb-windows-macos-linux/)

**Windows (winget):**
```cmd
winget install --id=Google.PlatformTools -e
```

**macOS/Linux (Homebrew):**
```bash
brew install --cask android-platform-tools
```


<hr />

### Önyükleyici Kilidini Açma

:::info

- Önyükleyici kilidini açmak OEM garantisini geçersiz kılar. Ancak, stok ROM'u yeniden flaşlayıp önyükleyiciyi yeniden kilitleyerek garantiyi geri yükleyebilirsiniz.
- Diğer faktörlerden bağımsız olarak, L3'e düşecek olan Widevine L1/DRM sertifikasını kaybedeceksiniz.  
- [Cihaz bütünlüğünü (integrity)](https://developer.android.com/google/play/integrity/overview) kaybedeceksiniz; bu, buna dayanan uygulamaların, daha sonra root erişimiyle düzeltilmediği sürece çalışmamasına neden olabilir.  
  [Bu rehber](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) bu sorunu çözmek için yararlı olabilir. 

:::

A. **Ön Koşullar**
- **Verilerinizi yedekleyin** (kilit açma her şeyi silecektir).
- **ADB & Fastboot araçlarını yükleyin** – [Buradan indirin](https://developer.android.com/studio/releases/platform-tools).
- **USB sürücülerini yükleyin** – [Google USB Sürücüleri](https://developer.android.com/studio/run/win-usb).
- **Geliştirici Seçeneklerini Etkinleştirin**:
  - `Ayarlar > Telefon hakkında > "Yapı numarası"na 7 kez dokunun.`
- **USB Hata Ayıklama ve OEM Kilit Açmayı Etkinleştirin**:
  - `Ayarlar > Sistem > Geliştirici seçenekleri > USB Hata Ayıklama ve OEM Kilit Açmayı etkinleştirin.`
- **Ekran Kilidini/PIN/Şifreyi ve Oturum Açılmış Hesapları Kaldırın (isteğe bağlı ancak önerilir)**
  - Önyükleyiciyi yeniden kilitlemeden önce hesapları kaldırmak, Google FRP (Fabrika Ayarlarına Sıfırlama Koruması) kilidini önlemeye yardımcı olur. FRP tetiklenirse, cihaz fabrika ayarlarından sonra önceden bağlı olan Google hesabını isteyecektir. Kimlik bilgilerini unutursanız veya hesaba erişemezseniz cihazınızın dışında kalabilirsiniz. Bunu önlemek için yeniden kilitlemeden önce tüm Google hesaplarını kaldırmanız önerilir.

B. **Kilit Açma İşlemi**
- **Telefonunuzu bir PC'ye bağlayın** (USB üzerinden).
- **Platform-tools klasöründe bir komut istemi açın**:
  - Windows: `Shift + Sağ Tık` > **Komut İstemi/Powershell penceresini burada aç**.
  - Mac/Linux: **Terminal**'i açın ve platform-tools klasörüne gidin.
- **Cihaz bağlantısını doğrulayın**:
  ```sh
  adb devices
  ```
  İstendiğinde, telefonda USB hata ayıklamasına izin verin.

- **Önyükleyici modunda (bootloader) yeniden başlatın:**
    ```sh
    adb reboot bootloader
    ```

- **Fastboot bağlantısını doğrulayın:**
    ```sh
    fastboot devices
    ```
    Cihaz algılanmazsa USB sürücülerini yeniden yükleyin.

- **Önyükleyici kilidini açın:**
    ```sh
    fastboot flashing unlock
    ```

- **Telefonunuzda onaylayın:**
  - Gezinmek için **Ses Tuşlarını**, onaylamak için **Güç Düğmesini** kullanın.
  - Cihazınız **tüm verileri silecek** ve yeniden başlayacaktır.

C. **Kilit Açma Sonrası**
  - Telefonunuzu yeniden kurun.
  - **Önyükleyici durumunu doğrulayın**:
    ```sh
    Ayarlar > Sistem > Geliştirici seçenekleri > OEM Kilit Açma etkin olmalıdır.
    ```

  - Önyükleyici artık açık ve cihazınız açılışta "Orange State" uyarısı gösterecektir; bu normaldir.


<hr />

### Root Atma

:::info

- Root atmak **OEM garantisini geçersiz kılar** ve güncellemeden önce stok imajları geri yüklenmediği sürece OTA güncellemelerini bozabilir.
- Her zaman **boot / init_boot imajının mevcut bellenim yapınızla tam olarak eşleştiğinden** emin olun.
  Yanlış veya eşleşmeyen bir imajı flaşlamak **açılış döngülerine (bootloop)** neden olur.
- **Bölüm mevcutsa, root atmak için her zaman `boot` yerine `init_boot` imajını kullanın**.
- Root atmak için **açık bir önyükleyici** gerekir.
- Kullanıcılar ayrıca yan yana bağlantısı verilen görsel rehberlere de başvurabilirler: [orailnoor](https://www.youtube.com/watch?v=v0i4rftKNWs) | [Droidwin](https://www.youtube.com/watch?v=4T1ZHDUCBsw) | [EpicDroid](https://www.youtube.com/watch?v=vXIBfyX7s-k).

:::

<br />

A. **Ön Koşullar**
- **USB Hata Ayıklama etkin** ve **açık önyükleyici**
- **ADB & Fastboot yüklü bir PC**  
  *veya* **USB-OTG + ADB uygulaması (örn. [Bugjaeger](https://play.google.com/store/apps/details?id=eu.sisik.hackendebug&hl=en_IN))** yüklü başka bir Android telefon  
  *veya* bir **özel kurtarma modu (recovery) (örn. TWRP / OrangeFox / AOSP tabanlı kurtarma modları)**
- **ADB / Fastboot** araçlarına temel aşinalık
- Mevcut yapınızla eşleşen **stok bellenim** (imajları çıkarmak için)
- Önerilen root çözümleri:
  - [Magisk](https://github.com/topjohnwu/Magisk/releases) | [Kurulum](https://topjohnwu.github.io/Magisk/install.html)
  - [KernelSU (KSU)](https://github.com/tiann/KernelSU) | [Kurulum](https://kernelsu.org/guide/installation.html)
  - [KernelSU Next (KSUN)](https://github.com/KernelSU-Next/KernelSU-Next) | [Kurulum](https://kernelsu-next.github.io/webpage/pages/installation.html)

<br />

B. **Mevcut Yazılım Sürümünü Kontrol Edin**
- Telefonunuzda şuraya gidin: Ayarlar > Telefon hakkında > Nothing OS başlığına dokunun.
- **Yapı Numarasını not alın**
- Örnek: `Pong_B4.0-251119-1654`
- `IND`/`EEA`/`TUR` gibi bölgesel ekleri dikkate almayın.

<br />

C. **Stok Boot / Init_boot İmajını Alın**
- [Sürüm dizinine](/docs/firmware) gidin.
- **Cihaz modelinizi** seçin.
- Tam yapınız için **OTA İmajlarını** açın.
- Sürüm varlıklarından (assets) karşılık gelen arşivi indirin: `*-image-boot.img.7z`.

- Arşivi çıkarın ve şunlardan birini bulun:
  - `init_boot.img` **(varsa tercih edilen)**
  - `boot.img` (sadece `init_boot` yoksa)

- **Imajı cihazınıza aktarın**
  ```sh
  adb push init_boot.img /sdcard/Download/
  # veya
  adb push boot.img /sdcard/Download/
  ```

<br />

D. **Imajı Yamalayın**

**Magisk**
- Cihazınıza en son Magisk APK'sını yükleyin.
- Magisk'i açın → Yükle → "Bir Dosya Seçin ve Yamalayın"ı seçin.
- Aktarılan `init_boot` (tercih edilen) / `boot` imajını seçin. 
- Magisk şunu oluşturacaktır: `magisk_patched-XXXXX.img`

<br />

**KernelSU / KernelSU Next**  

:::note

- Nothing Phone (2) için: KSU tabanlı root yöntemi stok `boot.img` ile desteklenir. Ancak KSUN veya SUSFS desteği, yamaların eklendiği özel olarak derlenmiş bir çekirdek (kernel) gerektirir.
- Mevcut önceden yamalanmış özel çekirdek seçenekleri şunlardır: 
  [arter97 kernel](https://xdaforums.com/t/r44-arter97-kernel-for-nothing-phone-2.4631313/) - KSU önceden yamalı. Henüz NOS 4.0+ sürümünü desteklemiyor | 
  [Meteoric Kernel (EOL)](https://github.com/HELLBOY017/kernel_nothing_sm8475) - KSUN + SUSFS önceden yamalı. NOS 4.0+ sürümünü desteklemiyor. |
  [Wild Kernel fork](https://github.com/MiguVT/Meteoric_KernelSU_SUSFS) - KSU + SUSFS önceden yamalı. | 
  [Wild Kernel](https://github.com/WildKernels/GKI_KernelSU_SUSFS) - KSUN + SUSFS önceden yamalı. 5.10-android12 sürümünü destekliyor. 
- Kutudan Android 13+ tabanlı çıkan Nothing modelleri, yani Phone (2)'den sonra piyasaya sürülenler, KSUN yamama yöntemini destekleyecektir.

:::

- Yamama yöntemi Magisk'e benzerdir. KSU/KSUN yöneticisinden "yüklü değil"e dokunun > `init_boot.img` dosyasını yamalayın ve yamalı imajı PC'ye aktarın.

- Önyükleyici modunda yeniden başlatın:
  ```sh
  adb reboot bootloader
  ```

- Yamalı imajı flaşlayın
  ```bash
  fastboot flash init_boot <yamalı_init_boot.img dosyasını buraya sürükleyip bırakın>
  ```

- Sistemi yeniden başlatın:
  ```bash
  fastboot reboot
  ``` 

- Cihaz KSU/KSUN ile root'lanmış olmalıdır.


<hr />

### Play Integrity

| Rehber | Bağlantı |
|-------|------|
| Play Integrity & Root Algılama Sorununu Çözme | [Wiki](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) |


<hr />

### Temel Bölümleri Yedekleme

:::info

- Önyükleyici kilidini açtıktan sonra, özel ROM'lar veya çekirdekler (kernels) flaşlamadan **önce** `persist`, `modemst1`, `modemst2`, `fsg` gibi temel bölümleri yedeklemek çok önemlidir.
- Bu bölümler IMEI, ağ ayarları ve parmak izi sensörü kalibrasyonu dahil olmak üzere önemli veriler içerir.
- Kaybolmaları veya bozulmaları durumunda cihazınızda **hücresel bağlantı kaybı, parmak izi sorunları oluşabilir veya cihazınız kullanılmaz hale (brick) gelebilir**.
- Yedek oluşturmak, bir şeyler ters giderse **cihazınızı geri yükleyebilmenizi** sağlar.

:::

A. **Gereksinimler**
- **Açık önyükleyici**
- **Root erişimi** (Magisk/KSU/Apatch üzerinden)
- **Termux uygulaması** (F-Droid veya Play Store üzerinden yükleyin)
- **Bölüm Yollarını Kontrol Edin:**
  - **Qcom cihazlar:** `/dev/block/bootdevice/by-name/`
  - **MTK cihazlar:** `/dev/block/by-name/`

B. **Yedekleme Talimatları**
- **Qualcomm (QCom) Cihazlar İçin:**
  - **Termux**'u açın ve şu komutla root erişimi verin:
    ```sh
    su
    ```

  - Aşağıdaki komutu tek seferde kopyalayıp yapıştırın:
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    Bu, **dahili depolama biriminde** "partitions_backup" adlı bir klasör içinde **`super` ve `userdata` dışındaki tüm bölümlerin** imaj dosyalarını oluşturacaktır.

  - **[İsteğe Bağlı]** Yukarıdaki komut başarısız olursa bu alternatifi deneyin:
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **MediaTek (MTK) Cihazlar İçin:**
  - **Termux**'u açın ve şu komutla root erişimi verin:
    ```sh
    su
    ```

  - Aşağıdaki komutların tamamını tek seferde kopyalayıp yapıştırın:
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

C. **Yedeği Saklama**
  - "partitions_backup" klasörünü **PC'nize veya güvenli bir depolama birimine** taşıyın.
  - **Bu yedekleri PAYLAŞMAYIN!** IMEI gibi benzersiz cihaz verileri içerirler.

D. **Bölümleri Geri Yükleme**
 - **MTK Cihazlar:**
    ```sh
    fastboot flash nvram nvram.img
    fastboot flash nvdata nvdata.img
    fastboot flash nvcfg nvcfg.img
    fastboot flash persist persist.img
    ```
    **Kurtarma moduna (recovery)** yeniden başlatın → **Fabrika ayarlarına sıfırlama (factory reset)** yapın → **Sistemi** yeniden başlatın.
    - Referans bağlantısı: [Nothing Phone (2a) DVT Engineering Sample: Recovering Baseband and IMEI Records](https://bluehomewu.github.io/posts/Restoring-Baseband-and-IMEI-on-Nothing-Phone-2a-DVT/)
    - Yazı Çince (Geleneksel) dilinde yazılmıştır ancak tarayıcı çeviri özellikleri kullanılarak Türkçeye çevrilebilir.

 - **QCom Cihazlar:**
    ```sh
    fastboot flash persist persist.img
    fastboot flash modemst1 modemst1.img
    fastboot flash modemst2 modemst2.img
    ```
    **Bu durumda fabrika ayarlarına sıfırlama zorunlu değildir.**


<hr />

### Stok ROM Flaşlama (Brick Kurtarma / Sürüm Düşürme)

:::note

- Bu, stok bellenimin daha yeni bir sürümüne manuel olarak temiz kurulum (clean flash) yapmak veya sürüm düşürmek (downgrade) için önerilen tek yöntemdir.
- Daha iyi anlamak için yan yana bağlantısı verilen görsel rehberlere başvurun: [Droidwin](https://www.youtube.com/watch?v=YCYEjdC3oHM) | [The Nothing Lab](https://www.youtube.com/watch?v=l0P9gosl64s) | [QZX Tech](https://www.youtube.com/watch?v=66H2MVElyAY)

:::

A. **Flaşlama Klasörünün Hazırlanması:**
  - Cihaz modeliniz ve bellenim yapınız için aşağıdaki dosyaları indirin ve bunları özel bir klasöre yerleştirin:
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x
    - `-hash.sha256` - Dosya bütünlüğünü doğrulamak ve eksik parçaları tespit etmek için isteğe bağlıdır ancak önerilir.

  - 7-Zip uygulamasını https://www.7-zip.org/ adresinden indirin ve kurun.

  - İsteğe Bağlı (**önerilir**): Manuel adımlar yerine çıkarma betiklerini (extraction scripts) kullanabilirsiniz:
    - [Windows](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.bat)
    - [Bash](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.sh)
    - Betiği indirdiğiniz dosyaların bulunduğu klasörden çalıştırın.

  - Dosyaları Çıkarın:
    - Windows: Sağ tık → "*\" klasörüne ayıkla
    - Bash kullanıcıları: `7za -y x "*.7z*"`

  - Nadir durumlarda indirme yöneticileri bölünmüş mantıksal dosyaların uzantılarını değiştirebilir.
  - Şöyle yeniden adlandırın:
    - `-image-logical.7z.001.7z` → `-image-logical.7z.001`
    - `-image-logical.7z.002.7z` → `-image-logical.7z.002`
  - Ardından çıkarmayı tekrar deneyin.

B. **Flaşlama İşlemine Geçmek:**
  - Uyumlu USB sürücülerini [buradan](https://developer.android.com/studio/run/win-usb) yükleyin.
  - Cihaz **önyükleyici modundayken** **Aygıt Yöneticisi**nde "Android Bootloader Interface"in göründüğünden emin olun.
  - Daha önce çıkarma betiği kullanıldıysa doğrudan onu çalıştırın. Aksi takdirde:
    - Ayıklanan tüm imaj dosyalarını [Nothing Fastboot Flasher Betiği](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download) ile birlikte tek bir klasöre taşıyın.
    - `-hash.sha256` dosyasını aynı dizine yerleştirin. 
    - Düzeltmelerin dahil edildiğinden emin olmak için her zaman betiğin en son sürümünü indirin.
  - Betiği internete bağlıyken çalıştırın (en son `platform-tools` sürümünü almak için) ve istemleri takip edin:
    - Onay anketini yanıtlayın.
    - Duruma göre karma (hash) kontrollerini atlayın veya devam edin. 
    - Verilerin silinip silinmeyeceğini seçin: (Y/N) [Temiz Kurulum / Sürüm Düşürme = `Y` | Üzerine Yazarak Kurulum / Güncelleme = `N`]
    - Her iki yuvaya (slot) flaşlanıp flaşlanmayacağını seçin: (Y/N)
    - Android Verified Boot'u Devre Dışı Bırakın: (N) [Lütfen burada `Y`yi seçerseniz, önyükleyici kilidinin daha sonra açılamayacağını unutmayın!]
  - Tüm bölümlerin başarıyla flaşlandığını doğrulayın.
    - Başarılıysa sistemi yeniden başlatmayı seçin: (Y)
    - Hata oluşursa, önyükleyiciyi yeniden başlatın ve hatayı giderdikten sonra tekrar flaşlayın. Bunu yapmadan sistemi yeniden başlatmak, cihazın "soft/hard brick" olmasına neden olabilir.


<hr />

### Önyükleyiciyi Yeniden Kilitleme

A. **Ön Koşullar**
  - **Ekran Kilidini/PIN/Şifreyi ve Oturum Açılmış Hesapları** kaldırın (isteğe bağlı ancak önerilir).
  - [Flaşlama Rehberi](#stok-rom-flaşlama-brick-kurtarma--sürüm-düşürme)ni takip ederek **stok ROM**'u temiz kurulumla flaşlayın. **Stok bellenimi flaşlamadan değiştirilmiş bölümlerle önyükleyiciyi yeniden kilitlemek cihazı brick edebilir!**
  - Tüm verileri yedekleyin (yeniden kilitleme **her şeyi silecektir**).
  - Henüz kurulmamışsa **ADB & Fastboot araçlarını** ve USB sürücülerini kurun.

B. **Yeniden Kilitleme İşlemi**
  - Sistemdeyseniz önyükleyici modunda yeniden başlatın:
    ```sh
    adb reboot bootloader
    ```

  - Fastboot bağlantısını doğrulayın:
    ```sh
    fastboot devices
    ```

  - Önyükleyiciyi yeniden kilitleme işlemini başlatın:
    ```sh
    fastboot flashing lock
    ```

  - Telefonunuzda onaylayın:
    - Gezinmek için **Ses Tuşlarını**, onaylamak için **Güç Düğmesini** kullanın.
    - Cihaz biçimlendirilecek ve kilitli bir önyükleyici ile yeniden başlayacaktır.

C. **Kilitleme Sonrası**
  - Cihazınızı yeniden kurun.
  - Önyükleyici artık kilitli!


---

## Satış Sonrası Geliştirme

:::note
Bu bölüm topluluk tarafından yönetilmektedir ve Nothing ile bağlantılı değildir. Önyükleyici kilidini açmak OEM garantinizi geçersiz kılacaktır.
:::

Özel ROM'lar, çekirdekler ve geliştirme projeleri ile güncel kalın.

### Cihaz Güncelleme Kanalları (Telegram)

**Nothing:**
| Cihaz | Kanal |
|--------|---------|
| Phone (1) | [Güncellemeler](https://t.me/s/NothingPhone1Updates) |
| Phone (2) | [Güncellemeler](https://t.me/s/NothingPhone2updates) |
| Phone (2a) Serisi | [Güncellemeler](https://t.me/s/NothingPhone2aUpdates) |
| Phone (3a) Serisi | [Güncellemeler](https://t.me/s/NothingPhone3aUpdates) |
| Phone (3) | [Güncellemeler](https://t.me/s/Phone3Updates) |
| Phone (4a) Serisi| [Güncellemeler](https://t.me/s/Phone4aUpdates) |

**CMF by Nothing:**
| Cihaz | Kanal |
|--------|---------|
| Phone (1) | [Güncellemeler](https://t.me/s/CMFPhone1Updates) |
| Phone (2) Pro / Phone (3a) Lite | [Güncellemeler](https://t.me/s/CMFPhone2GlobalUpdates) |

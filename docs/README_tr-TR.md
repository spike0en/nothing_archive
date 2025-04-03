[English](README.md) | [Deutsch](README_de-DE.md) | [Español](README_es-ES.md) | [Français](README_fr-FR.md) | [हिन्दी](README_hi-IN.md) | [Italiano](README_it-IT.md) | [日本語](README_ja-JP.md) | [Русский](README_ru-RU.md) | **Türkçe**

# Nothing Archive

<img src="../assets/branding/logo.png" width="96" alt="Nothing Archive Logosu">

[![Total Downloads](https://img.shields.io/github/downloads/spike0en/nothing_archive/total?logo=github&logoColor=white&label=Total%20Downloads&color=007377)](https://github.com/spike0en/nothing_archive/releases)
[![Latest Release](https://img.shields.io/github/release/spike0en/nothing_archive?label=Latest%20Release&logo=git&logoColor=white&color=1E6091)](https://github.com/spike0en/nothing_archive/releases/latest)

[![Open Pull Requests](https://img.shields.io/github/issues-pr/spike0en/nothing_archive?logo=github&color=F4A261)](https://github.com/spike0en/nothing_archive/pulls)
[![Workflow Status](https://img.shields.io/github/actions/workflow/status/spike0en/nothing_archive/dump.yml?branch=main&label=Build&color=2DC653&logo=github)](https://github.com/spike0en/nothing_archive/actions/workflows/dump.yml)
[![Closed Pull Requests](https://img.shields.io/github/issues-pr-closed/spike0en/nothing_archive?logo=github&color=E76F51)](https://github.com/spike0en/nothing_archive/pulls?q=is%3Apr+is%3Aclosed)


[![Contributors](https://img.shields.io/github/contributors/spike0en/nothing_archive?logo=github&color=9B5DE5)](https://github.com/spike0en/nothing_archive/graphs/contributors)
[![Stars](https://img.shields.io/github/stars/spike0en/nothing_archive?logo=github&color=D4AF37)](#projeyi-destekleyin-)
[![Forks](https://img.shields.io/github/forks/spike0en/nothing_archive?logo=github&color=468FAF)](https://github.com/spike0en/nothing_archive/network/members)

---

## İçindekiler 📑

- [Proje Hakkında](#genel-bakış-)
- [Sorumluluk Reddi](#sorumluluk-reddi-)
- [Notlar](#notlar-)
- [Kategorizasyon](#kategorizasyon-)
- [İndirmeler](#indirmeler-)
- [Bütünlük Kontrolü](#bütünlük-kontrolü-)
- **Kılavuzlar**
  - [OTA Kurulumu](#i-ota-kurulumu-)
  - [Bootloader Kilidini Açma](#ii-bootloader-kilidini-açma-)
  - [Bölümleri Yedekleme](#iii-bootloader-kilidini-açtıktan-sonra-temel-bölümleri-yedekleme-)
  - [Fastboot Kullanarak Stok ROM'u Yükleme](#iv-fastboot-kullanarak-stok-romu-yükleme-)
  - [Bootloader Yeniden Kilitleme](#v-Bootloader-yeniden-kilitleme-)
- [Teşekkürler](#teşekkürler-)
- [Projeyi Destekleyin](#projeyi-destekleyin-)

---

## Genel Bakış 🔍

**Nothing Archive**, **Nothing Phone 1, Phone 2, Phone 2a, Phone 2a Plus, Phone 3a, Phone 3a Pro** ve **CMF Phone 1** için resmi OTA güncellemeleri, tam aygıt yazılımı paketleri ve stok OTA imajları sunan en güncel Nothing OS aygıt yazılımı deposudur. Tüm dosyalar doğrudan resmi OEM sunucularından alınmıştır. Tüm dosyalar [arşivlenmiştir](https://archive.org/details/nothing-archive), kolay erişim ve uzun süreli koruma sağlar.

### Özellikler ve Faydalar:

- 📡 **Doğrudan OTA İndeksleme** – Resmi sunuculardan **Nothing OS OTA güncelleme bağlantılarını** takip eder, Nothing ve CMF cihazları için **kademeli ve tam güncellemelere** erişim sağlar.
- 🛠️ **Manuel Kurulum** – Kademeli dağıtımlar sırasında veya OTA güncellemeleri başarısız olduğunda, dahili **Nothing OS çevrimdışı güncelleyici veya beta güncelleyici uygulaması** veya mevcut olduğunda özel kurtarma menüsü kullanarak **ADB kurulum** aracılığıyla **Nothing OS aygıt yazılımını manuel olarak yükleyin**.
- 📦 **Stok OTA İmajları** – AOSP'nin OTA çıkarma aracını kullanan **değiştirilmemiş OTA imajları** sağlar. Bu, **tam aygıt yazılımı paketleri** mevcut olmadığında kademeli OTA güncellemelerinin çıkarılmasını sağlayarak **güncellemeleri, sürüm düşürmeleri ve disk bölümü yüklemelerini** mümkün kılar.
- 🔓 **Rootlama ve Root Kaldırma Desteği** – **Magisk, KernelSU ve Apatch için stok boot imajları** sağlarken, değiştirilmiş disk bölümleri algılandığında orijinal boot imajını yükleyerek **OTA güncellemelerini tekrardan işlevsel kılmak** için **root kaldırmaya** da olanak tanır.
- ⚡ **Aygıt Yazılımı Yükleme ve Cihazları Kurtarma** – Fastboot erişilebilir olduğu sürece **sürekli açılıp kapanma dögülerini çözmeye, brick durumundaki cihazları kurtarmaya ve stok ROM'u geri yüklemeye** yardımcı olmak için **fastboot ile yüklenebilir Nothing OS aygıt yazılımı** sağlar.

---

## Sorumluluk Reddi 🚨

Bu arşivi kullanarak, kullanıcılar şu şartları kabul eder ve onaylar:
- **✅ Orijinallik** – Bu arşivdeki tüm aygıt yazılımı dosyaları **değiştirilmemiş, modifiye edilmemiş ve doğrudan OEM'den** alınmıştır.
- **⚠️ Kendi Sorumluluğunuzda Yükleyin** – **Kilidi açılmış bir bootloader'a** sahip bir cihaza aygıt yazılımı yüklemek doğal riskler taşır. **Cihazınızı brick durumuna getirmemek** için talimatları dikkatlice izleyin.
- **📌 Uyumluluk** – Kurulumdan önce aygıt yazılımının **Nothing veya CMF cihaz varyantınızla** eşleştiğinden emin olun.
- **🚫 Garanti veya Resmi Destek Yok** – Bu, **[Nothing](https://nothing.tech) ile ilişkisi olmayan, topluluk odaklı bir projedir**. Herhangi bir **güncelleme hatası, yazılım hatası veya cihaz sorunu** OEM'in sorumluluğunda kalır. Yazar ve katkıda bulunanlar, yanlış yükleme, kötüye kullanım veya aygıt yazılımı değişiklikleri nedeniyle **brick durumundaki cihazlardan sorumlu değildir**. Bütünlüğü sağlamak için aygıt yazılımını her zaman **doğrudan bu arşivden** indirin.
- **🛡️ Açık Kaynak Bütünlüğü** – Yeniden dağıtıma **yalnızca uygun atıf ile** izin verilir. Kullanıcıların, **kullanılabilirliğini sürdürmek için** bu projeyi desteklemeleri ve paylaşmaları teşvik edilir. **Ücretsiz olarak sunulan aygıt yazılımının yeniden satılması kesinlikle yasaktır!**

---

## Notlar 📝

- OTA imajları için sürümler, sırasıyla [burada](https://github.com/spike0en/nothing_archive/releases) gösterildiği gibi `<NothingOS Sürümü>`+`<Cihaz Kod Adı>`.`<Kademe Tarihi>` ve `<POST_OTA_VERSION>`_`<NothingOS Sürümü>` biçimi kullanılarak etiketlenir ve adlandırılır.
- Bölgeye özgü sürümler, birleştirilmemiş belirli eski `Spacewar` yapıları için geçerli olan `<NothingOS Sürümü>`-`<G veya E>`+`<Cihaz Kod Adı>`.`<Kademe Tarihi>` biçimi kullanılarak etiketlenir. Burada G = GLO (Global) ve E = EEA (Avrupa Ekonomik Alanı) şeklindedir.
- Nothing OS sürümü X.Y.Za ve X.Y biçiminde olan sürümler için, doğru sıralama amacıyla etiketler sırasıyla X.Y.0-A ve X.Y.0 olarak yeniden adlandırılır (ör. `2.5.5A` → `2.5.5-A`, `2.6` → `2.6.0`, `3.0` → `3.0.0`).
- Nothing OS Açık Beta sürümleri, uygun olan yerlerde `-OB` ile belirtilir.
- Android Geliştirici Önizleme sürümleri `0.0.0-dev`+`<Cihaz Kod Adı>`.`<Kademe Tarihi>` olarak etiketlenir.
- Sürüm notlarında özellikle aksi belirtilmedikçe, burada yayınlanan sürümler cihazın tüm bölgesel ve renk varyantlarıyla uyumludur.
- Gerekli kademeli OTA aygıt yazılımının yorumlanmasına ilişkin ayrıntılı talimatlar için [bu bölüme](#i-ota-kurulumu-) bakın.

---

## Kategorizasyon 📂

**Değiştirilmemiş** stok OTA imaj dosyaları `.7z` biçiminde arşivlenir ve bölümlerinin niteliğine göre üç farklı gruba ayrılır: **Boot**, **Firmware** ve **Logical**. İlgili modeller aşağıdaki gibidir:

[Bu](https://github.com/spike0en/nothing_archive/tree/main/docs#categorization-) bölüme bakın.

---

## İndirmeler 📥

**Sürüm İndeksi**'ne erişmek için aşağıdaki açılır listeden **cihaz modelinizi** seçin:

[Bu](https://github.com/spike0en/nothing_archive/tree/main/docs#downloads-) bölüme bakın.

---

## Bütünlük Kontrolü ✅

- İndirilen OTA imaj dosyasının bütünlüğünü aşağıdaki komutlardan biriyle kontrol edebilirsiniz:

``` bash
  md5sum -c *-hash.md5
  sha1sum -c *-hash.sha1
  sha256sum -c *-hash.sha256
  xxh128sum -c *-hash.xxh128
```
- xxh128 genellikle en hızlısıdır.

---

## Kılavuzlar 📖

### I. OTA Kurulumu 🔄

> Görsel referanslar için lütfen ilgili sırayla [bu görsellere](https://github.com/spike0en/test/tree/main/assets/sideloading) bakın.

<br>

A. **Sorumluluk Reddi**
  - Resmi kademeli OTA güncellemelerini manuel olarak kurmak, **doğrudan Spike’s Nothing Archive'den indirdiğiniz** sürece **tamamen güvenlidir**.
  - **Üçüncü taraf kaynakları kullanmayın**—Nothing Archive'deki tüm aygıt yazılımları doğrudan OEM'in resmi sunucularından alınır.
  - **Dahili Nothing OS çevrimdışı güncelleyici aracı**, güvenliği sağlamak için yalnızca **OEM tarafından imzalanmış** güncellemeleri kabul eder.
  - **Güncelleyici**, kurulumdan önce aygıt yazılımının **verisini (hash) doğrular**.

<br>

B. **Stok Disk Bölümlerini Geri Yükleme (Yalnızca Rootlu Kullanıcılar İçin)**
  > **Bootloader'ınız kilitliyse, doğrudan C aşamasına geçin!**

1. **Mevcut Nothing OS sürümünüzü kontrol edin:**
   - `Ayarlar > Telefon hakkında > Cihaz görseline dokunun`.
   - Yapı numarasını not alın.

2. **Mevcut aygıt yazılımı yapınız için stok imajlarını indirin:**
   - `-boot-image.7z` dosyasını indirin.
   - `.img` dosyalarını elde etmek için arşivi çıkarın.

3. **Gerekli bölümleri belirleyin:**
   - **Qualcomm Cihazlar:** `boot`, `init_boot` `vendor_boot`, `recovery`, `vbmeta`
   - **MediaTek Cihazlar:** `init_boot`, `recovery`, `vbmeta`

4. Bootloader modunda **stok disk bölümlerini yükleyin**:
   > Yalnızca değiştirilmiş bölümlerin yüklenmesi gerekir. Ayrıca SoC platformunuza göre eksik bölümleri atlayın.
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   ```

5. **Sistemi yeniden başlatın ve Sistem Güncelleyici aracılığıyla güncelleyin:**
   - Güncelleme **başarısız olursa**, bir sonraki bölümdeki **manuel kurulum** ile devam edin.

6. **Root'u Geri Yükleme (İsteğe Bağlı):**
   - Güncellemeden sonra, güncellenmiş NOS sürümü için **düzenlenmiş bir boot imajı yükleyerek** yeniden root yapabilirsiniz.
   - Yeniden root yaptıktan sonra **modüller bozulmadan kalacaktır**.

<br>

C. **Kuruluma Devam Edin**

 - **Doğru Güncelleme Aygıt Yazılımı Dosyasını İndirin:**
   - [Buradan](#indirmeler-) cihazınız için doğru OTA aygıt yazılımı dosyasını bulun.

 - **Doğru Dosya Nasıl Seçilir?**
   - Depoya gidin ve cihaz modelinizi seçin.
   - Kademeli OTA sütununa bakın.
   - **Mevcut İşletim Sistemi Yapı Numaranızı Doğrulayın**:
     - Şuraya gidin: `Ayarlar > Sistem > Telefon Hakkında`.
     - **Cihaz görseline** dokunun ve **Yapı Numarasını** not alın.

 - **Örnek:**
   - **Phone (2)** cihazınızın yapı numarasının `Pong_U2.6-241016-1700` olduğunu varsayalım.
   - Mevcut en son OTA güncellemesinin `Pong_V3.0-241226-2001` olduğunu varsayalım.
   - Karşılık gelen güncelleme yolu şöyle olacaktır: `Pong_U2.6-241016-1700 -> Pong_V3.0-241226-2001`
   - Cihazınıza ve işletim sistemi sürümünüze göre doğru yolu seçtiğinizden emin olun.
     - Daha fazla netlik için [buna](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg) bakın.

 - **`ota` Klasörünü Oluşturun:**
   - Cihazınızın **dahili depolama alanında** `ota` adında bir klasör oluşturun, tam yol şöyledir:
     ```
     /sdcard/ota/
     ```
   - İndirilen `<firmware>.zip` dosyasını bu klasöre taşıyın.

 - **Nothing Çevrimdışı OTA Güncelleyicisine Erişin:**
    - **Telefon uygulamasını** açın ve bu numarayı çevirin:
      ```
      *#*#682#*#*
      ```
   - Bu, dahili çevrimdışı güncelleyici aracını başlatacaktır.
   - `NothingOfflineOtaUpdate` veya `NOTHING BETA OTA UPDATE` arayüzlerinden biri açılacaktır — her ikisi de çalışır.

 - **Güncellemeyi Uygulayın:**
   - Güncelleyici, güncelleme dosyasını otomatik olarak algılayacaktır.
   - Algılanmazsa, OTA dosyasına manuel olarak göz atın ve içe aktarın.
   - `Directly Apply OTA` veya `Update` (uygulama kullanıcı arayüzüne göre değişebilir) seçeneğine dokunun.
   - Güncellemenin tamamlanmasını bekleyin — cihazınız otomatik olarak yeniden başlayacaktır.

- **Not:**
  - Güncelleyici **bilinmeyen bir hata** gösterirse, dosyayı manuel olarak **"ota"** klasörüne kopyalamak yerine **"Gözat"** seçeneğini kullanmayı deneyin.
  - Kademeli OTA başarısız olursa **tam OTA aygıt yazılımı** yan yüklenebilir.
    - **Tam OTA, sürüm düşürmek için kullanılamaz** — yalnızca aynı veya daha yüksek bir yapıya güncelleyebilir.
    - **Kilidi açılmış bootloader kullanıcıları**, özel kurtarma menüsü (recovery) (ör. Phone (2) için OrangeFox) aracılığıyla tam OTA yükleyebilir.
  - **Her sürümde Tam OTA dosyası bulunmaz** — bu gibi durumlarda bunun yerine kademeli sürümleri kullanın.

---

### II. Bootloader Kilidini Açma 🔓

A. Ön Koşullar
- **Verilerinizi yedekleyin** (kilidi açmak her şeyi silecektir).
- **ADB ve Fastboot araçlarını yükleyin** – [Buradan indirin](https://developer.android.com/studio/releases/platform-tools).
- **USB sürücülerini yükleyin** – [Google USB Sürücüleri](https://developer.android.com/studio/run/win-usb).
- **Geliştirici Seçeneklerini Etkinleştirin**:
  - `Ayarlar > Telefon hakkında > "Yapı numarası"na 7 kez dokunun.`
- **USB Hata Ayıklama ve OEM Kilidi Açmayı Etkinleştirin**:
  - `Ayarlar > Sistem > Geliştirici seçenekleri > USB Hata Ayıklama ve OEM Kilit Açmayı Etkinleştirin.`
- **Ekran Kilidini/PIN'i/Şifreyi ve Oturum Açılmış Hesapları Kaldırın (isteğe bağlı ancak önerilir)**
  - Önyükleyiciyi yeniden kilitlemeden önce hesapları kaldırmak, Google FRP (Fabrika Ayarlarına Sıfırlama Koruması) kilidini önlemeye yardımcı olur. FRP tetiklenirse, cihaz fabrika ayarlarına sıfırlamadan sonra daha önce bağlanmış Google hesabını soracaktır. Kimlik bilgilerini unutursanız veya hesaba erişemezseniz, cihazınız kilitli kalabilir. Bunu önlemek için, yeniden kilitlemeden önce tüm Google hesaplarını kaldırmanız önerilir.

B. Kilidi Açma Süreci
- **Telefonunuzu USB aracılığıyla bir PC'ye bağlayın**.
- Platform araçları klasöründe **bir komut istemi açın**:
  - Windows: `Shift + Sağ Tık` > **Komut İstemi/Powershell'i burada aç**.
  - Mac/Linux: **Terminal**'i açın ve platform araçlarına gidin.
- **Cihaz bağlantısını doğrulayın**:
  ```sh
  adb devices
  ```
  İstenirse, telefonda USB hata ayıklamasına izin verin.

- **Bootloader ekranına yeniden başlatın:**
   ```sh
   adb reboot bootloader
   ```

- **Fastboot bağlantısını doğrulayın:**
   ```sh
   fastboot devices
   ```
   Cihaz algılanmazsa, USB sürücülerini yeniden yükleyin.

- **Bootloader kilidini açın:**
   ```sh
   fastboot flashing unlock
   ```

- **Telefonunuzda onaylayın:**
  - Gezinmek için **Ses Tuşlarını** ve onaylamak için **Güç Düğmesini** kullanın.
  - Cihazınız **tüm verileri silecek** ve yeniden başlayacaktır.

C. Kilit Açma Sonrası
  - Telefonunuzu tekrar kurun.
  - **Bootloader durumunu doğrulayın**:
    ```sh
    Ayarlar > Sistem > Geliştirici seçenekleri > OEM Kilit Açma etkin durumda olmalıdır.
    ```

  - Bootloader kilidi açılmıştır ve cihazınız açılış ekranında turuncu durum uyarısı gösterecektir — bu normaldir.

---

### III. Bootloader Kilidini Açtıktan Sonra Temel Bölümleri Yedekleme 💾

A. Neden Yedeklemeli?
- Bootloader kilidini açtıktan sonra, özel ROM'ları veya kernel'leri yüklemeden **önce** `persist`, `modemst1`, `modemst2`, `fsg` vb. gibi temel bölümleri yedeklemek çok önemlidir.
- Bu bölümler, IMEI, ağ ayarları ve parmak izi sensörü kalibrasyonu dahil olmak üzere önemli veriler içerir.
- Kaybolur veya bozulursa, cihazınız **hücresel bağlantı kaybı, parmak izi sorunları yaşayabilir veya hatta brick durumunda kalabilir**.
- Yedeklemeler oluşturmak, bir şeyler ters giderse **cihazınızı geri yükleyebilmenizi** sağlar.

B. Gereksinimler
- **Kilidi açılmış bootloader**
- **Root erişimi** (Magisk/KSU/Apatch aracılığıyla)
- **Termux uygulaması** (F-Droid veya Play Store aracılığıyla yükleyin)
- **Bölüm Yollarını Kontrol Edin:**
  - **Qualcomm cihazlar:** `/dev/block/bootdevice/by-name/`
  - **MTK cihazlar:** `/dev/block/by-name/`

C. Yedekleme Talimatları
- **Qualcomm (QComm) Cihazlar İçin:**
  - **Termux**'u açın ve bu komutu kullanarak root erişimi verin:
    ```sh
    su
    ```

  - Aşağıdaki komutu tek seferde kopyalayıp yapıştırın:
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    Bu, **Dahili Depolama** alanında **"partitions_backup"** adlı bir klasörün içinde **`super` ve `userdata` hariç tüm bölümlerin** imaj dosyalarını oluşturacaktır.

  - **[İsteğe Bağlı]** Yukarıdaki komut başarısız olursa, şu alternatifi deneyin:
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **MediaTek (MTK) Cihazlar İçin:**
  - **Termux**'u açın ve bu komutu kullanarak root erişimi verin:
    ```sh
    su
    ```

  - Aşağıdaki tüm komutları tek seferde kopyalayıp yapıştırın:
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

D. Yedeklemeyi Saklama
  - **"partitions_backup"** klasörünü **PC'nize veya güvenli depolama alanınıza** taşıyın.
  - **Bu yedeklemeleri paylaşmayın!** IMEI gibi benzersiz cihaz verileri içerirler.

E. Bölümleri Geri Yükleme
 - **MTK Cihazlar:**
   ```sh
   fastboot flash nvram nvram.img
   fastboot flash nvdata nvdata.img
   fastboot flash nvcfg nvcfg.img
   fastboot flash persist persist.img
   ```
   **Kurtarma (recovery) moduna** yeniden başlatın → **Fabrika ayarlarına sıfırlama** yapın → **Sistemi yeniden başlatın**.

 - **QComm Cihazlar:**
   ```sh
   fastboot flash persist persist.img
   fastboot flash modemst1 modemst1.img
   fastboot flash modemst2 modemst2.img
   ```
   **Bu durumda fabrika ayarlarına sıfırlama zorunlu değildir.**

---

### IV. Fastboot Kullanarak Stok ROM'u Yükleme ⚡

A. **Yükleme Klasörünün Hazırlanması:**
  - Cihaz modeliniz ve aygıt yazılımınız için aşağıdaki dosyaları indirin ve belirli bir klasöre yerleştirin:
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x

  - [Buradan](https://www.7-zip.org/) 7-Zip'i yükleyin.
  - Dosyaları çıkarın:
    - Windows: Sağ tık → "*\" konumuna çıkar
    - Bash kullanıcıları:
      7za -y x "*7z*"

B. **Yüklemeye Devam Etme:**
  - [Buradan](https://developer.android.com/studio/run/win-usb) uyumlu USB sürücülerini yükleyin.
  - Cihaz **bootloader modundayken** **Aygıt Yöneticisi**'nde `Android Bootloader Interface`'in görünür olduğundan emin olun.
  - Çıkarma script'i daha önce kullanıldıysa, doğrudan çalıştırın. Aksi takdirde:
    - Çıkarılan tüm imaj dosyalarını [Fastboot Yükleme Script'i](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download) ile birlikte tek bir klasöre taşıyın.
    - Düzeltmelerin dahil edildiğinden emin olmak için her zaman en son script'i indirin.
  - İnternete bağlıyken script'i çalıştırın (en son `platform-tools`'u almak için) ve aşamaları izleyin:
    - Onay sorusunu yanıtlayın.
    - Verileri silip silmeyeceğinizi seçin: (E/H)
    - Her iki yuvaya da yükleyip yüklemeyeceğinizi seçin: (E/H)
    - Android Doğrulanmış Önyüklemeyi devre dışı bırakın: (H)
  - Tüm bölümlerin başarıyla yüklendiğini doğrulayın.
    - Başarılı olursa, sistemi yeniden başlatmayı seçin: (E)
    - Hatalar oluşursa, bootloader moduna yeniden başlatın ve hatayı giderdikten sonra yeniden yükleyin.

---

### V. Bootloader'ı Yeniden Kilitleme 🔒

A. **Ön Koşullar**
  - **Ekran Kilidini/PIN'i/Şifreyi ve Oturum Açılmış Hesapları Kaldırın** (isteğe bağlı ancak önerilir).
  - [Yükleme Kılavuzu](#iv-fastboot-kullanarak-stok-romu-yükleme-)nu izleyerek **stok ROM**'u sıfırdan yükleyin. **Stok aygıt yazılımını yüklemeden değiştirilmiş bölümlerle bootloader'ı yeniden kilitlemek cihazı brick durmuna getirebilir!**
  - Tüm verilerinizi yedekleyin (yeniden kilitlemek **her şeyi silecektir**).
  - Henüz kurulmamışsa **ADB ve Fastboot araçlarını** ve USB sürücülerini yükleyin.

B. **Yeniden Kilitleme Süreci**
  - Sistemdeyseniz, bootloader menüsüne yeniden başlatın:
    ```sh
    adb reboot bootloader
    ```

  - Fastboot bağlantısını doğrulayın:
    ```sh
    fastboot devices
    ```

  - Bootloader'ı yeniden kilitlemeyi başlatın:
    ```sh
    fastboot flashing lock
    ```

  - Telefonunuzda onaylayın:
    - Gezinmek için **Ses Tuşlarını** ve onaylamak için **Güç Düğmesini** kullanın.
    - Cihaz biçimlendirilecek ve kilitli bir bootloader ile yeniden başlayacaktır.

C. **Yeniden Kilitleme Sonrası**
  - Cihazınızın kurulumunu tekrar tamamlayın.
  - Bootloader şimdi kilitli!

---

## Teşekkürler 🤝

Değerli çalışmaları ve destekleri için katkıda bulunanlara özel teşekkürler:
- **[luk1337](https://github.com/luk1337/oplus_archive)** – AOSP'nin OTA çıkarma aracının kullanımına öncülük ederek kademeli OTA güncellemelerinin çıkarılmasını sağladı.
- **[arter97](https://github.com/arter97/nothing_archive)** – Yukarıdaki projeyi **Nothing Phone (2)** için uyarladı.
- **[LukeSkyD](https://github.com/LukeSkyD)** – Daha önceki yapılar için önemli bir referans görevi gören [Nothing Phone (1) Deposu](https://xdaforums.com/t/nothing-phone-1-repo-nos-ota-img-guide-root.4464039/)'nu sürdürüyor.
- **[XelXen](https://github.com/XelXen)** - Projenin markalaşması için logo ve banner tasarladı.
- Bu projeyi daha geniş bir kitleye erişilebilir kılmak için yerelleştirme çabalarına katkıda bulunan bireyler.

---

## Projeyi Destekleyin ⭐

Bu arşiv yardımcı olduysa, lütfen **[depoyu yıldızlamayı](https://github.com/spike0en/nothing_archive/stargazers)** düşünün. Desteğiniz, projenin keşfedilebilir ve aktif kalmasına yardımcı olacaktır!

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
  <img alt="Yıldız Geçmişi Grafiği" src="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
</picture>

---

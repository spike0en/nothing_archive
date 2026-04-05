---
sidebar_position: 4
title: Kılavuzlar
description: Nothing ve CMF cihazları için Bootloader kilidi açma, Root, stok yazılıma geri dönme ve temel onarım işlemlerine ilişkin adım adım teknik kılavuzlar.
keywords: [nothing bootloader kilidi açma, nothing root kılavuzu, nothing firmware flaşlama, nothing phone unbrick, fastboot kılavuzu, payload.bin ayıklama, magisk kılavuzu]
---

# Teknik Kılavuzlar

Nothing ve CMF cihazları için adım adım teknik işlem kılavuzları.

:::danger
Bu kılavuzlar cihazınızda kalıcı hasara neden olabilecek işlemler içerir. Lütfen her adımı dikkatle okuyun. Doğabilecek sorunlardan Nothing Archive sorumlu değildir.
:::

## Bootloader İşlemleri

Cihazınızı modifiye etmenin ilk adımı Bootloader kilidini açmaktır.

### Bootloader Kilidini Açma

1. Telefonunuzda **Ayarlar > Telefon Hakkında > Yazılım Bilgileri** bölümüne gidin.
2. **Derleme Numarası** üzerine 7 kez dokunarak Geliştirici Seçeneklerini aktif edin.
3. **Ayarlar > Sistem > Geliştirici Seçenekleri**'ne gidin ve şunları açın:
    - **OEM Kilit Açma**
    - **USB Hata Ayıklama**
4. Telefonu PC'ye bağlayın ve ADB terminalini açın.
5. Cihazı fastboot moduna alın: `adb reboot bootloader`
6. Kilidi açın: `fastboot flashing unlock`
7. Telefon ekranındaki uyarıyı ses tuşlarıyla onaylayın.
8. **ÖNEMLİ:** Bu işlem tüm verilerinizi silecektir!

### Bootloader Kilidini Kapatma

1. Cihazın tamamen **stok donanım yazılımında** ve modifiye edilmemiş (root yok, özel kernel yok) olduğundan emin olun.
2. Cihazı fastboot moduna alın: `adb reboot bootloader`
3. Kilidi kapatın: `fastboot flashing lock`
4. Telefon ekranındaki uyarıyı onaylayın.

---

## Root ve Magisk

Cihazınızda tam yetki sahibi olmak için izlemeniz gereken adımlar.

### Cihazı Rootlama

1. Cihazınızın mevcut OS sürümüyle birebir eşleşen `boot.img` dosyasını edinin (Nothing Archive'den indirebilirsiniz).
2. [Magisk](https://github.com/topjohnwu/Magisk) uygulamasını telefonunuza yükleyin.
3. Magisk uygulamasını açın: **Yükle > Dosya Seç ve Yamala** yolunu izleyerek `boot.img` dosyasını seçin.
4. Yamalanmış dosyayı (`magisk_patched.img`) PC'nize kopyalayın.
5. Cihazı fastboot moduna alın.
6. Yamalı imajı flaşlayın: `fastboot flash boot magisk_patched.img`
7. Cihazı yeniden başlatın.

---

## Manuel Flaşlama

Nothing Archive'den indirilen dosyalarla cihazı güncelleme veya onarma.

### Orijinal OTA (Sideload)

1. Uygun `.zip` paketini indirin.
2. Cihazı Recovery moduna alın.
3. **Apply update from ADB** seçeneğini seçin.
4. PC'den şu komutu girin: `adb sideload dosya_adi.zip`

### Fastboot Üzerinden Flaşlama

1. Tam donanım yazılımı paketini veya fabrika imajlarını indirin.
2. [Nothing Flasher](https://github.com/spike0en/nothing_flasher) gibi bir araç kullanmanızı öneririz.
3. Tüm `img` dosyalarını sırasıyla ilgili partition'lara flaşlayın.

---

## Onarım ve Kurtarma

Cihazın açılmadığı (bootloop) durumlar için çözümler.

### Unbrick (Yazılımsal Onarım)

1. Cihazınız fastboot moduna girebiliyorsa, tam bir fabrika imajı flaşlayarak (Full ROM) onarabilirsiniz.
2. Partition tablolarının bozulduğu durumlar için `critical` partition'ları flaşlamanız gerekebilir (Phone (1) için `abl`, `xbl` vb.).

---

## Diğer Teknik Bilgiler

### Payload.bin Ayıklama

Nothing OS paketleri genellikle bir `payload.bin` dosyası içerir. İçindeki imajları çıkarmak için:

1. [Payload Dumper](https://github.com/vm03/payload_dumper) veya Go tabanlı [payload-dumper-go](https://github.com/ssut/payload-dumper-go) aracını indirin.
2. Komutu çalıştırın: `payload-dumper-go payload.bin`
3. Ayıklanan dosyalar `output` klasöründe görünecektir.

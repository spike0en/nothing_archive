[English](README.md) | **Deutsch** | [Español](README_es-ES.md) | [Français](README_fr-FR.md) | [हिन्दी](README_hi-IN.md) | [Italiano](README_it-IT.md) | [日本語](README_ja-JP.md) | [Русский](README_ru-RU.md) | [Türkçe](README_tr-TR.md)

# Nothing Archive

<img src="../assets/branding/logo.png" width="96" alt="Nothing Archive Logo">

[![Hits](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive&label=Hits&icon=github&color=%23b02a37)](https://github.com/spike0en/nothing_archive)

[![Stars](https://img.shields.io/github/stars/spike0en/nothing_archive?label=Stars&logo=github&logoColor=white&color=fb481f&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/stargazers)
[![Contributors](https://img.shields.io/github/contributors/spike0en/nothing_archive?label=Contributors&logo=github&logoColor=white&color=2b2a7b&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/spike0en/nothing_archive?label=Forks&logo=github&logoColor=white&color=eeb705&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/network/members)

[![Total Downloads](https://img.shields.io/github/downloads/spike0en/nothing_archive/total?label=Downloads&logo=github&logoColor=white&color=9E9D10&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/releases)
[![Latest Release](https://img.shields.io/github/release/spike0en/nothing_archive?label=Latest&logo=git&logoColor=white&color=18673F&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/releases/latest)

[![Flashing Scripts](https://img.shields.io/badge/Fastboot%20Flashing%20Scripts-1E1E2F?logo=github&logoColor=white&labelColor=1E1E2F&color=67119E&style=flat)](https://github.com/spike0en/nothing_flasher)
[![Support](https://img.shields.io/badge/Nothing%20Community-1E1E2F?style=flat&logo=telegram&logoColor=white&color=1986F2&labelColor=1E1E2F)](https://t.me/s/Nothing_Archive)

---

## Index 📑

- [Über das Projekt](#überblick-)
- [Haftungsausschluss](#haftungsausschluss-)
- [Hinweise](#hinweise-)
- [Kategorisierung](#kategorisierung-)
- [Downloads](#downloads-)
- [Integritätsprüfung](#integritätsprüfung-)
- **Anleitungen**
  - [OTA-Sideloading](#i-ota-sideloading-)
  - [Bootloader entsperren](#ii-bootloader-entsperren-)
  - [Partitionen sichern](#iii-sichern-wichtiger-partitionen-nach-dem-entsperren-des-bootloaders-)
  - [Stock-ROM mit Fastboot flashen](#iv-flashen-des-stock-roms-mit-fastboot-)
  - [Bootloader wieder sperren](#v-bootloader-wieder-sperren-)
- [Danksagungen](#danksagungen-)
- [Projekt unterstützen](#projekt-unterstützen-)

---

## Überblick 🔍

**Nothing Archive** ist das aktuellste Nothing OS Firmware-Repository und bietet offizielle OTA-Updates, vollständige Firmware-Pakete und Stock-OTA-Images für **Nothing Phone (1), Phone (2), Phone (2a), Phone (2a) Plus, Phone (3a), Phone (3a) Pro** und **CMF Phone (1)**, die alle direkt von offiziellen OEM-Servern stammen. Alle Dateien sind [archiviert](https://archive.org/details/nothing-archive), was einen einfachen Zugriff und eine langfristige Aufbewahrung gewährleistet.

### Merkmale & Vorteile:

- 📡 **Direkte OTA-Indexierung** – Verfolgt **Nothing OS OTA-Update-Links** von offiziellen Servern und bietet Zugriff auf **inkrementelle und vollständige Updates** für Nothing- und CMF-Geräte.
- 🛠️ **Manuelle Installation (Sideloading)** – Installieren Sie **Nothing OS-Firmware manuell** während gestaffelter Rollouts oder wenn OTA-Updates fehlschlagen, mithilfe des integrierten **Nothing OS Offline-Updaters oder der Beta-Updater-App** oder über **ADB-Sideload** mit einer benutzerdefinierten Wiederherstellung (sofern verfügbar).
- 📦 **Stock-OTA-Images** – Bietet **unveränderte OTA-Images** unter Verwendung des OTA-Extraktionstools von AOSP, das das Extrahieren inkrementeller OTA-Updates ermöglicht und somit **Upgrades, Downgrades und das Flashen von Partitionen** ermöglicht, wenn **vollständige Firmware-Pakete** nicht verfügbar sind.
- 🔓 **Rooting- & Unrooting-Unterstützung** – Bietet **Stock-Boot-Images für Magisk, KernelSU und Apatch** und ermöglicht gleichzeitig das **Unrooting** durch Flashen des ursprünglichen Boot-Images, um die **OTA-Update-Funktionalität** aufrechtzuerhalten, wenn modifizierte Partitionen erkannt werden.
- ⚡ **Firmware flashen & Geräte wiederherstellen** – Bietet **fastboot-flashbare Nothing OS-Firmware**, um **Bootloops zu beheben, soft-gebrickte Geräte wiederherzustellen und das Stock-ROM wiederherzustellen**, solange Fastboot zugänglich ist.

---

## Haftungsausschluss 🚨

Durch die Nutzung dieses Archivs erkennen Benutzer diese Bedingungen an und akzeptieren sie:
- **✅ Authentizität** – Alle Firmware-Dateien in diesem Archiv sind **unverändert, unmodifiziert und stammen direkt vom OEM**.
- **⚠️ Flashen auf eigene Gefahr** – Die Installation von Firmware auf einem Gerät mit **entsperrtem Bootloader** birgt inhärente Risiken. Befolgen Sie die Anweisungen sorgfältig, um **Ihr Gerät nicht zu bricken**.
- **📌 Kompatibilität** – Stellen Sie vor der Installation sicher, dass die Firmware mit Ihrer **Nothing- oder CMF-Gerätevariante** übereinstimmt.
- **🚫 Keine Garantie oder offizieller Support** – Dies ist ein **Community-Projekt, das nicht mit [Nothing](https://nothing.tech) verbunden ist**. Jegliche **Update-Fehler, Softwarefehler oder Geräteprobleme** bleiben in der Verantwortung des OEMs. Der Autor und die Mitwirkenden **haften nicht für gebrickte Geräte** aufgrund von falschem Flashen, Missbrauch oder Firmware-Modifikationen. Laden Sie Firmware immer **direkt aus diesem Archiv** herunter, um die Integrität zu gewährleisten.
- **🛡️ Open-Source-Integrität** – Die Weitergabe ist **nur mit korrekter Quellenangabe** gestattet. Benutzer werden ermutigt, dieses Projekt zu unterstützen und zu teilen, **um seine Verfügbarkeit aufrechtzuerhalten**. **Der Weiterverkauf frei verfügbarer Firmware ist strengstens untersagt!**

---

## Hinweise 📝

- Releases für OTA-Images werden mit dem Format `<POST_OTA_VERSION>` und `<POST_OTA_VERSION>`_`<NothingOS-Version>` getaggt und benannt, wie jeweils [hier](https://github.com/spike0en/nothing_archive/releases) gezeigt.
- Regionsspezifische Releases werden mit dem Format `<POST_OTA_VERSION>`-`GLO/EEA` getaggt, was für bestimmte ältere `Spacewar`-Builds gilt, die nicht vereinheitlicht sind. Hier steht GLO = Global und EEA = Europäischer Wirtschaftsraum.
- Nothing OS Open Beta-Releases werden gegebenenfalls mit `-OB` gekennzeichnet.
- Android Developer Preview-Releases werden als `0.0.0-dev`+`<Geräte-Codename>`.`<Inkrementelles Datum>` getaggt.
- Sofern in den Versionshinweisen nicht ausdrücklich anders angegeben, sind die hier veröffentlichten Releases mit allen regionalen und Farbvarianten des Geräts kompatibel.
- Detaillierte Anweisungen zur Interpretation der erforderlichen inkrementellen OTA-Firmware finden Sie in [diesem Abschnitt](#i-ota-sideloading-).

---

## Kategorisierung 📂

Die **unveränderten** Stock-OTA-Image-Dateien werden im `.7z`-Format archiviert und basierend auf der Art ihrer Partitionen in drei verschiedene Gruppen eingeteilt: **Boot**, **Firmware** und **Logical**, für die jeweiligen Modelle wie folgt:

Siehe [diesen](https://github.com/spike0en/nothing_archive/tree/main/docs#categorization-) Abschnitt.

---

## Downloads 📥

Wählen Sie Ihr **Gerätemodell** aus der Dropdown-Liste unten aus, um auf dessen **Release-Index** zuzugreifen:

Siehe [diesen](https://github.com/spike0en/nothing_archive/tree/main/docs#downloads-) Abschnitt.

---

## Integritätsprüfung ✅

- Sie können die Integrität der heruntergeladenen OTA-Image-Datei mit einem der folgenden Befehle überprüfen:

``` bash
  md5sum -c *-hash.md5
  sha1sum -c *-hash.sha1
  sha256sum -c *-hash.sha256
  xxh128sum -c *-hash.xxh128
```
- xxh128 ist normalerweise am schnellsten.

---

## Anleitungen 📖

### I. OTA-Sideloading 🔄

> Visuelle Referenzen finden Sie in [diesen Bildern](https://github.com/spike0en/test/tree/main/assets/sideloading) in der jeweiligen Reihenfolge.

<br>

A. **Haftungsausschluss**
  - Das Sideloading oder die manuelle Installation offizieller inkrementeller OTA-Updates ist **vollkommen sicher**, solange Sie sie **direkt aus Spike’s Nothing Archive herunterladen**.
  - **Verwenden Sie keine Drittanbieterquellen** – alle Firmware aus dem Nothing Archive stammt direkt von den offiziellen Servern des OEMs.
  - Das **integrierte Nothing OS Offline-Updater-Tool** akzeptiert nur Updates, die **vom OEM signiert** sind, um die Sicherheit zu gewährleisten.
  - Der **Updater überprüft den Hash** der Firmware vor der Installation.

<br>

B. **Wiederherstellen von Stock-Partitionen (Nur für gerootete Benutzer)**
  > **Wenn Ihr Bootloader gesperrt ist, springen Sie direkt zu Punkt C!**

1. **Überprüfen Sie Ihre aktuelle Nothing OS-Version:**
   - Gehen Sie zu `Einstellungen > Über das Telefon > Tippen Sie auf das Gerätebanner`.
   - Notieren Sie die Build-Nummer.

2. **Holen Sie sich Stock-Images für Ihren aktuellen Firmware-Build:**
   - Laden Sie die Datei `-boot-image.7z` herunter.
   - Extrahieren Sie das Archiv, um `.img`-Dateien zu erhalten.

3. **Identifizieren Sie die erforderlichen Partitionen:**
   - **Qualcomm-Geräte:** `boot`, `init_boot` `vendor_boot`, `recovery`, `vbmeta`
   - **MediaTek-Geräte:** `init_boot`, `recovery`, `vbmeta`

4. **Flashen Sie Stock-Partitionen** im Bootloader-Modus:
   > Nur modifizierte Partitionen müssen geflasht werden. Überspringen Sie außerdem fehlende Partitionen basierend auf Ihrer SoC-Plattform.
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   ```

5. **Starten Sie das System neu und aktualisieren Sie über den System-Updater:**
   - Wenn das Update **fehlschlägt**, fahren Sie mit dem **manuellen Sideloading** im nächsten Abschnitt fort.

6. **Root wiederherstellen (Optional):**
   - Nach dem Update können Sie durch **Flashen eines gepatchten Boot-Images** für die aktualisierte NOS-Version erneut rooten.
   - **Module bleiben nach dem erneuten Rooten intakt**.

<br>

C. **Mit dem Sideloading fortfahren**

 - **Laden Sie die korrekte Update-Firmware-Datei herunter:**
   - Finden Sie die korrekte OTA-Firmware-Datei für Ihr Gerät [hier](#downloads-).

 - **Wie wählt man die richtige Datei aus?**
   - Navigieren Sie zum Repository und wählen Sie Ihr Gerätemodell aus.
   - Suchen Sie nach der Spalte „Incremental OTA“.
   - **Überprüfen Sie Ihre aktuelle OS-Build-Nummer**:
     - Gehen Sie zu: `Einstellungen > System > Über das Telefon`.
     - Tippen Sie auf das **Gerätebanner** und notieren Sie die **Build-Nummer**.

 - **Beispiel:**
   - Angenommen, Ihr **Phone (2)** hat die Build-Nummer: `Pong_U2.6-241016-1700`
   - Angenommen, das neueste verfügbare OTA-Update ist: `Pong_V3.0-241226-2001`
   - Der entsprechende Update-Pfad wäre: `Pong_U2.6-241016-1700 -> Pong_V3.0-241226-2001`
   - Stellen Sie sicher, dass Sie den korrekten Pfad basierend auf Ihrem Gerät und Ihrer OS-Version auswählen.
     - Zur besseren Übersicht siehe [dies](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg).

 - **Erstellen Sie den Ordner `ota`:**
   - Erstellen Sie einen Ordner namens `ota` im **internen Speicher** Ihres Geräts, der vollständige Pfad lautet:
     ```
     /sdcard/ota/
     ```
   - Verschieben Sie die heruntergeladene `<firmware>.zip`-Datei in diesen Ordner.

 - **Greifen Sie auf den Nothing Offline OTA Updater zu:**
    - Öffnen Sie die **Telefon-App** und wählen Sie:
      ```
      *#*#682#*#*
      ```
   - Dies startet das integrierte Offline-Updater-Tool.
   - Die Benutzeroberfläche zeigt möglicherweise `NothingOfflineOtaUpdate` oder `NOTHING BETA OTA UPDATE` an – beide funktionieren.

 - **Wenden Sie das Update an:**
   - Der Updater erkennt die Update-Datei automatisch.
   - Wenn sie nicht erkannt wird, durchsuchen und importieren Sie die OTA-Datei manuell.
   - Tippen Sie auf `Directly Apply OTA` oder `Update` (je nach App-Benutzeroberfläche).
   - Warten Sie, bis das Update abgeschlossen ist – Ihr Gerät wird automatisch neu gestartet.

- **Hinweis:**
  - Wenn der Updater einen **unbekannten Fehler** anzeigt, versuchen Sie, die Option **"Durchsuchen"** zu verwenden, anstatt die Datei manuell in den Ordner **"ota"** zu kopieren.
  - **Vollständige OTA-Firmware** kann per Sideloading installiert werden, wenn das inkrementelle OTA fehlschlägt.
    - **Vollständiges OTA kann nicht zum Downgrade verwendet werden** – es kann nur auf denselben oder einen höheren Build aktualisiert werden.
    - **Benutzer mit entsperrtem Bootloader** können vollständiges OTA über benutzerdefinierte Wiederherstellungen flashen (z. B. OrangeFox für Phone (2)).
  - **Nicht jeder Release hat eine vollständige OTA-Datei** – verwenden Sie in solchen Fällen stattdessen inkrementelle Updates.

---

### II. Bootloader entsperren 🔓

A. Voraussetzungen
- **Sichern Sie Ihre Daten** (das Entsperren löscht alles).
- **Installieren Sie ADB & Fastboot-Tools** – [Hier herunterladen](https://developer.android.com/studio/releases/platform-tools).
- **Installieren Sie USB-Treiber** – [Google USB-Treiber](https://developer.android.com/studio/run/win-usb).
- **Entwickleroptionen aktivieren**:
  - `Einstellungen > Über das Telefon > Tippen Sie 7 Mal auf "Build-Nummer".`
- **USB-Debugging & OEM-Entsperrung aktivieren**:
  - `Einstellungen > System > Entwickleroptionen > USB-Debugging & OEM-Entsperrung aktivieren.`
- **Bildschirmsperre/PIN/Passwort und angemeldete Konten entfernen (optional, aber empfohlen)**
  - Das Entfernen von Konten vor dem erneuten Sperren des Bootloaders hilft, die Google FRP (Factory Reset Protection)-Sperre zu verhindern. Wenn FRP ausgelöst wird, fragt das Gerät nach einem Werksreset nach dem zuvor verknüpften Google-Konto. Wenn Sie die Anmeldeinformationen vergessen oder keinen Zugriff auf das Konto haben, können Sie von Ihrem Gerät ausgesperrt werden. Um dies zu vermeiden, wird empfohlen, alle Google-Konten vor dem erneuten Sperren zu entfernen.

B. Entsperrvorgang
- **Verbinden Sie Ihr Telefon über USB mit einem PC**.
- **Öffnen Sie eine Eingabeaufforderung** im Ordner platform-tools:
  - Windows: `Shift + Rechtsklick` > **Eingabeaufforderung/Powershell hier öffnen**.
  - Mac/Linux: Öffnen Sie das **Terminal** und navigieren Sie zu platform-tools.
- **Geräteverbindung überprüfen**:
  ```sh
  adb devices
  ```
  Wenn Sie dazu aufgefordert werden, erlauben Sie das USB-Debugging auf dem Telefon.

- **Neustart in den Bootloader:**
   ```sh
   adb reboot bootloader
   ```

- **Fastboot-Verbindung überprüfen:**
   ```sh
   fastboot devices
   ```
   Wenn kein Gerät erkannt wird, installieren Sie die USB-Treiber neu.

- **Bootloader entsperren:**
   ```sh
   fastboot flashing unlock
   ```

- **Auf Ihrem Telefon bestätigen:**
  - Verwenden Sie die **Lautstärketasten** zum Navigieren und die **Ein-/Aus-Taste** zum Bestätigen.
  - Ihr Gerät **löscht alle Daten** und startet neu.

C. Nach dem Entsperren
  - Richten Sie Ihr Telefon erneut ein.
  - **Bootloader-Status überprüfen**:
    ```sh
    Einstellungen > System > Entwickleroptionen > OEM-Entsperrung sollte aktiviert sein.
    ```

  - Der Bootloader ist jetzt entsperrt und Ihr Gerät zeigt beim Start eine Orange State-Warnung an – das ist normal.

---

### III. Sichern wichtiger Partitionen nach dem Entsperren des Bootloaders 💾

A. Warum sichern?
- Nach dem Entsperren des Bootloaders ist es entscheidend, wichtige Partitionen wie `persist`, `modemst1`, `modemst2`, `fsg` usw. zu sichern, **bevor** Sie benutzerdefinierte ROMs oder Kernel flashen.
- Diese Partitionen enthalten wichtige Daten, einschließlich IMEI, Netzwerkeinstellungen und Kalibrierung des Fingerabdrucksensors.
- Bei Verlust oder Beschädigung kann Ihr Gerät **Verlust der Mobilfunkverbindung, Probleme mit dem Fingerabdrucksensor oder sogar einen Brick** erleiden.
- Das Erstellen von Backups stellt sicher, dass Sie **Ihr Gerät wiederherstellen** können, wenn etwas schief geht.

B. Anforderungen
- **Entsperrter Bootloader**
- **Root-Zugriff** (über Magisk/KSU/Apatch)
- **Termux-App** (über F-Droid oder Play Store installieren)
- **Partitions-Pfade überprüfen:**
  - **Qcom-Geräte:** `/dev/block/bootdevice/by-name/`
  - **MTK-Geräte:** `/dev/block/by-name/`

C. Sicherungsanweisungen
- **Für Qualcomm (Qcom)-Geräte:**
  - Öffnen Sie **Termux** und gewähren Sie Root-Zugriff mit:
    ```sh
    su
    ```

  - Kopieren Sie den folgenden Befehl und fügen Sie ihn auf einmal ein:
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    Dies erstellt Image-Dateien **aller Partitionen außer `super` & `userdata`** im **internen Speicher** in einem Ordner namens **"partitions_backup"**.

  - **[Optional]** Wenn der obige Befehl fehlschlägt, versuchen Sie diese Alternative:
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **Für MediaTek (MTK)-Geräte:**
  - Öffnen Sie **Termux** und gewähren Sie Root-Zugriff mit:
    ```sh
    su
    ```

  - Kopieren Sie alle folgenden Befehle und fügen Sie sie auf einmal ein:
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

D. Backup speichern
  - Verschieben Sie den Ordner **"partitions_backup"** auf Ihren **PC oder einen sicheren Speicher**.
  - **Teilen Sie diese Backups NICHT!** Sie enthalten eindeutige Gerätedaten wie die IMEI.

E. Partitionen wiederherstellen
 - **MTK-Geräte:**
   ```sh
   fastboot flash nvram nvram.img
   fastboot flash nvdata nvdata.img
   fastboot flash nvcfg nvcfg.img
   fastboot flash persist persist.img
   ```
   Neustart in den **Wiederherstellungsmodus** → **Werksreset** durchführen → Neustart ins **System**.

 - **Qcom-Geräte:**
   ```sh
   fastboot flash persist persist.img
   fastboot flash modemst1 modemst1.img
   fastboot flash modemst2 modemst2.img
   ```
   **Ein Werksreset ist in diesem Fall nicht zwingend erforderlich.**

---

### IV. Flashen des Stock-ROMs mit Fastboot ⚡

A. **Vorbereitung des Flashing-Ordners:**
  - Laden Sie die folgenden Dateien für Ihr Gerätemodell und Ihren Firmware-Build herunter und legen Sie sie in einem dedizierten Ordner ab:
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x

  - Installieren Sie 7-Zip von [hier](https://www.7-zip.org/).
  - Extrahieren Sie die Dateien:
    - Windows: Rechtsklick → Extrahieren nach "*\"
    - Bash-Benutzer:
      7za -y x "*7z*"

B. **Mit dem Flashen fortfahren:**
  - Installieren Sie kompatible USB-Treiber von [hier](https://developer.android.com/studio/run/win-usb).
  - Stellen Sie sicher, dass `Android Bootloader Interface` im **Geräte-Manager** sichtbar ist, wenn sich das Gerät im **Bootloader-Modus** befindet.
  - Wenn das Extraktionsskript zuvor verwendet wurde, führen Sie es direkt aus. Andernfalls:
    - Verschieben Sie alle extrahierten Image-Dateien zusammen mit dem [Fastboot Flashing Script](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download) in einen einzigen Ordner.
    - Laden Sie immer das neueste Skript herunter, um sicherzustellen, dass Hotfixes enthalten sind.
  - Führen Sie das Skript aus, während Sie mit dem Internet verbunden sind (um die neuesten `platform-tools` abzurufen) und folgen Sie den Anweisungen:
    - Beantworten Sie den Bestätigungsfragebogen.
    - Wählen Sie, ob Daten gelöscht werden sollen: (J/N)
    - Wählen Sie, ob auf beide Slots geflasht werden soll: (J/N)
    - Android Verified Boot deaktivieren: (N)
  - Überprüfen Sie, ob alle Partitionen erfolgreich geflasht wurden.
    - Wenn erfolgreich, wählen Sie den Neustart ins System: (J)
    - Wenn Fehler auftreten, starten Sie den Bootloader neu und flashen Sie erneut, nachdem Sie den Fehler behoben haben.

---

### V. Bootloader wieder sperren 🔒

A. **Voraussetzungen**
  - Entfernen Sie **Bildschirmsperre/PIN/Passwort und angemeldete Konten** (optional, aber empfohlen).
  - Flashen Sie das **Stock-ROM** sauber gemäß der [Flash-Anleitung](#iv-flashen-des-stock-roms-mit-fastboot-). **Das erneute Sperren des Bootloaders mit modifizierten Partitionen ohne Flashen der Stock-Firmware kann das Gerät bricken!**
  - Sichern Sie alle Daten (das erneute Sperren **löscht alles**).
  - Installieren Sie **ADB & Fastboot-Tools** und USB-Treiber, falls noch nicht eingerichtet.

B. **Wieder-Sperr-Vorgang**
  - Wenn Sie sich im System befinden, starten Sie den Bootloader neu:
    ```sh
    adb reboot bootloader
    ```

  - Fastboot-Verbindung überprüfen:
    ```sh
    fastboot devices
    ```

  - Bootloader-Wieder-Sperrung initiieren:
    ```sh
    fastboot flashing lock
    ```

  - Auf Ihrem Telefon bestätigen:
    - Verwenden Sie die **Lautstärketasten** zum Navigieren und die **Ein-/Aus-Taste** zum Bestätigen.
    - Das Gerät wird formatiert und mit einem gesperrten Bootloader neu gestartet.

C. **Nach dem Wieder-Sperren**
  - Richten Sie Ihr Gerät erneut ein.
  - Der Bootloader ist jetzt gesperrt!

---

## Danksagungen 🤝

Besonderer Dank geht an diese Mitwirkenden für ihre unschätzbare Arbeit und Unterstützung:
- **[luk1337](https://github.com/luk1337/oplus_archive)** – Pionierarbeit bei der Verwendung des OTA-Extraktionstools von AOSP, das die Extraktion inkrementeller OTA-Updates ermöglichte.
- **[arter97](https://github.com/arter97/nothing_archive)** – Passte das obige Projekt für das **Nothing Phone (2)** an.
- **[LukeSkyD](https://github.com/LukeSkyD)** – Pflegt das [Nothing Phone (1) Repo](https://xdaforums.com/t/nothing-phone-1-repo-nos-ota-img-guide-root.4464039/), das als wichtige Referenz für frühere Builds diente.
- **[XelXen](https://github.com/XelXen)** - Entwarf das Logo und den Banner für das Branding des Projekts.
- Personen, die zu den Lokalisierungsbemühungen beigetragen haben, um dieses Projekt einem breiteren Publikum zugänglich zu machen.

---

## Projekt unterstützen ⭐

Wenn dieses Archiv hilfreich war, ziehen Sie bitte in Erwägung, **[das Repository mit einem Stern zu versehen](https://github.com/spike0en/nothing_archive/stargazers)**. Ihre Unterstützung hilft, das Projekt auffindbar und aktiv zu halten!

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
  <img alt="Stern-Verlaufsdiagramm" src="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
</picture>

---
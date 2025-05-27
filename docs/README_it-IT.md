[Inglese](README.md) | [Tedesco](README_de-DE.md) | [Spagnolo](README_es-ES.md) | [Francese](README_fr-FR.md) | [Hindi](README_hi-IN.md) | **Italiano** | [Giapponese](README_ja-JP.md) | [Russo](README_ru-RU.md) | [Turco](README_tr-TR.md) |

# Nothing Archive

<img src="../assets/branding/logo.png" width="96" alt="Logo Nothing Archive">

[![Hits](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive&label=Hits&icon=github&color=%23b02a37)](https://github.com/spike0en/nothing_archive)

[![Stars](https://img.shields.io/github/stars/spike0en/nothing_archive?label=Stars&logo=github&logoColor=white&color=fb481f&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/stargazers)
[![Contributors](https://img.shields.io/github/contributors/spike0en/nothing_archive?label=Contributors&logo=github&logoColor=white&color=2b2a7b&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/spike0en/nothing_archive?label=Forks&logo=github&logoColor=white&color=eeb705&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/network/members)

[![Total Downloads](https://img.shields.io/github/downloads/spike0en/nothing_archive/total?label=Downloads&logo=github&logoColor=white&color=9E9D10&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/releases)
[![Latest Release](https://img.shields.io/github/release/spike0en/nothing_archive?label=Latest&logo=git&logoColor=white&color=18673F&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/releases/latest)

[![Flashing Scripts](https://img.shields.io/badge/Fastboot%20Flashing%20Scripts-1E1E2F?logo=github&logoColor=white&labelColor=1E1E2F&color=67119E&style=flat)](https://github.com/spike0en/nothing_flasher)
[![Support](https://img.shields.io/badge/Nothing%20Community-1E1E2F?style=flat&logo=telegram&logoColor=white&color=1986F2&labelColor=1E1E2F)](https://t.me/s/Nothing_Archive)

---

## Indice 📑

- [Informazioni sul Progetto](#panoramica-)
- [Caratteristiche e Vantaggi](#caratteristiche-e-vantaggi-)
- [Avvertenze](#avvertenze-)
- [Note](#note-)
- [Catalogazione](#catalogazione-)
- [Download](#download-)
- [Verifica dell'Integrità](#verifica-dellintegrità-)
- **Guide**
  - [Sideloading OTA](#i-sideloading-ota-)
  - [Sblocco del Bootloader](#ii-sblocco-del-bootloader-)
  - [Backup delle Partizioni Essenziali](#iii-backup-delle-partizioni-essenziali-dopo-lo-sblocco-del-bootloader-)
  - [Flash della ROM Stock Tramite Fastboot](#iv-flash-della-rom-stock-tramite-fastboot-)
  - [Blocco del Bootloader](#v-Blocco-del-bootloader-)
- [Ringraziamenti](#ringraziamenti-)
- [Sostieni il Progetto](#sostieni-il-progetto-)

---

## Panoramica 🔍

**Nothing Archive** è il repository di firmware Nothing OS più aggiornato, che offre aggiornamenti OTA ufficiali, pacchetti firmware completi e immagini OTA stock per **Nothing Phone 1, Phone 2, Phone 2a, Phone 2a Plus, Phone 3a, Phone 3a Pro** e **CMF Phone 1**, tutti provenienti direttamente dai server OEM ufficiali. Tutti i file sono [archiviati](https://archive.org/details/nothing-archive), garantendo un facile accesso e una conservazione a lungo termine.

### Caratteristiche e Vantaggi

- 📡 **Indicizzazione Diretta OTA** – Traccia i **link degli aggiornamenti OTA di Nothing OS** dai server ufficiali, fornendo accesso ad **aggiornamenti incrementali e completi** per i dispositivi Nothing e CMF.
- 🛠️ **Installazione Manuale (Sideloading)** – Installa manualmente il **firmware Nothing OS** durante i rollout graduali o quando gli aggiornamenti OTA falliscono utilizzando l'**updater offline integrato di Nothing OS o l'app beta updater** o tramite **sideload ADB** utilizzando una recovery personalizzata quando disponibile.
- 📦 **Immagini OTA Stock** – Fornisce **immagini OTA non modificate** utilizzando lo strumento di estrazione OTA di AOSP che consente di estrarre aggiornamenti OTA incrementali, abilitando così **aggiornamenti, downgrade e flashing delle partizioni** quando i **pacchetti firmware completi** non sono disponibili.
- 🔓 **Supporto Rooting e Unrooting** – Fornisce **immagini di boot stock per Magisk, KernelSU e Apatch**, consentendo anche l'**unrooting** flashando l'immagine di boot originale per mantenere **funzionali gli aggiornamenti OTA** quando vengono rilevate partizioni modificate.
- ⚡ **Flash del Firmware e Recupero Dispositivi (Unbrick)** – Fornisce **firmware Nothing OS flashabile tramite fastboot** per aiutare a **risolvere boot loop, recuperare dispositivi in soft-brick e ripristinare la ROM stock**, purché fastboot sia accessibile.

---

## Avvertenze 🚨

Utilizzando questo archivio, gli utenti riconoscono e accettano questi termini:
- **✅ Autenticità** – Tutti i file firmware in questo archivio sono **inalterati, non modificati e provengono direttamente dall'OEM**.
- **⚠️ Flash a Proprio Rischio** – L'installazione del firmware su un dispositivo con **bootloader sbloccato** comporta rischi intrinseci. Seguire attentamente le istruzioni per **evitare di bloccare (brick) il dispositivo**.
- **📌 Compatibilità** – Assicurarsi che il firmware corrisponda alla **variante del proprio dispositivo Nothing o CMF** prima dell'installazione.
- **🚫 Nessuna Garanzia o Supporto Ufficiale** – Questo è un **progetto supportato dalla comunità, non affiliato a [Nothing](https://nothing.tech)**. Eventuali **fallimenti durante l'aggiornamento, bug software o problemi del dispositivo** rimangono responsabilità dell'OEM. L'autore e i contributori **non sono responsabili per dispositivi bloccati (brick)** a causa di flashing errato, uso improprio o modifiche del firmware. Scaricare sempre il firmware **direttamente da questo archivio** per garantirne l'integrità.
- **🛡️ Integrità Open Source** – La ridistribuzione è consentita **solo con adeguata attribuzione**. Gli utenti sono incoraggiati a sostenere e condividere questo progetto **per mantenerne la disponibilità**. **La rivendita di firmware disponibile gratuitamente è severamente vietata!**

---

## Note 📝

- Le release per le immagini OTA sono taggate e nominate utilizzando il formato: `<VersioneNothingOS>`+`<NomeInCodiceDispositivo>`.`<DataIncrementale>` e `<VERSIONE_POST_OTA>`_`<VersioneNothingOS>`, come mostrato [qui](https://github.com/spike0en/nothing_archive/releases), rispettivamente.
- Le release specifiche per regione sono taggate utilizzando il formato: `<VersioneNothingOS>`-`<G o E>`+`<NomeInCodiceDispositivo>`.`<DataIncrementale>`, applicabile ad alcune vecchie build `Spacewar` che non sono unificate. Qui, G = GLO (Globale), e E = EEA (Spazio Economico Europeo).
- Per le release con una versione di Nothing OS nel formato X.Y.Za e X.Y, i tag vengono rinominati rispettivamente in X.Y.0-A e X.Y.0 per un corretto ordinamento (es., `2.5.5A` → `2.5.5-A`, `2.6` → `2.6.0`, `3.0` → `3.0.0`).
- Le release Nothing OS Open Beta sono indicate con `-OB` dove applicabile.
- Le release Android Developer Preview sono taggate come `0.0.0-dev`+`<NomeInCodiceDispositivo>`.`<DataIncrementale>`.
- Salvo diversa indicazione specificata nelle note di rilascio, le release pubblicate qui sono compatibili con tutte le varianti regionali e di colore del dispositivo.
- Per istruzioni dettagliate su come installare il firmware OTA incrementale richiesto, fare riferimento a [questa sezione](#i-sideloading-ota-).

---

## Catalogazione 📂

I file immagine OTA stock **non modificati** sono archiviati in formato `.7z` e catalogati in tre gruppi distinti in base alla natura delle loro partizioni: **Boot**, **Firmware** e **Logical**, per i rispettivi modelli come segue:

Fare riferimento a [questa](https://github.com/spike0en/nothing_archive/tree/main/docs#categorization-) sezione.

---

## Download 📥

Seleziona il **modello del tuo dispositivo** dall'elenco a discesa sottostante per accedere al suo **Indice delle Release**:

Fare riferimento a [questa](https://github.com/spike0en/nothing_archive/tree/main/docs#downloads-) sezione.

---

## Verifica dell'Integrità ✅

- Puoi verificare l'integrità del file immagine OTA scaricato con uno dei seguenti comandi:

``` bash
  md5sum -c *-hash.md5
  sha1sum -c *-hash.sha1
  sha256sum -c *-hash.sha256
  xxh128sum -c *-hash.xxh128
```
- xxh128 è solitamente il più veloce.

---

## Guide 📖

### I. Sideloading OTA 🔄

> Per riferimenti visivi, si prega di fare riferimento a [queste immagini](https://github.com/spike0en/test/tree/main/assets/sideloading) nel rispettivo ordine.

<br>

A. **Avvertenza**
  - Il sideloading o l'installazione manuale degli aggiornamenti OTA incrementali ufficiali è **completamente sicuro**, purché vengano scaricati **direttamente da Nothing Archive di Spike**.
  - **Non utilizzare fonti di terze parti**—tutto il firmware da Nothing Archive proviene direttamente dai server ufficiali dell'OEM.
  - Lo **strumento updater offline integrato di Nothing OS** accetta solo aggiornamenti **firmati dall'OEM**, garantendo la sicurezza.
  - L'**updater verifica l'hash** del firmware prima dell'installazione.

<br>

B. **Ripristino delle Partizioni Stock (Solo per Utenti con Root)**
  > **Se il tuo bootloader è bloccato, salta direttamente al Punto C!**

1. **Controlla la tua versione attuale di Nothing OS:**
   - Vai su `Impostazioni > Info sul telefono > Tocca il banner del dispositivo`.
   - Annota il numero di build.

2. **Recupera le immagini stock per la tua build firmware attuale:**
   - Scarica il file `-boot-image.7z`.
   - Estrai l'archivio per ottenere i file `.img`.

3. **Identifica le partizioni richieste:**
   - **Dispositivi Qualcomm:** `boot`, `init_boot` `vendor_boot`, `recovery`, `vbmeta`
   - **Dispositivi MediaTek:** `init_boot`, `recovery`, `vbmeta`

4. **Flasha le partizioni stock** in modalità bootloader:
   > È richiesto flashare solo le partizioni modificate. Salta anche eventuali partizioni non presenti nell'archivio scaricato in base al tuo dispositivo.
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   ```

5. **Riavvia al sistema e aggiorna tramite Aggiornamento di Sistema:**
   - Se l'aggiornamento **fallisce**, procedi con il **sideloading manuale** nella sezione successiva.

6. **Ripristino del Root (Opzionale):**
   - Dopo l'aggiornamento, puoi ri-ottenere il root **flashando un'immagine di boot patchata** per la versione NOS aggiornata.
   - I **moduli rimarranno intatti** dopo il ri-rooting.

<br>

C. **Procedi con il Sideloading**

 - **Scarica il File Firmware di Aggiornamento Corretto:**
   - Trova il file firmware OTA corretto per il tuo dispositivo da [qui](#download-).

 - **Come Selezionare il File Giusto?**
   - Naviga nella repository e seleziona il modello del tuo dispositivo.
   - Cerca la colonna Incremental OTA.
   - **Verifica il tuo Numero di Build OS attuale**:
     - Vai su: `Impostazioni > Sistema > Info sul telefono`.
     - Tocca il **banner del dispositivo** e annota il **Numero di Build**.

 - **Esempio:**
   - Supponiamo che il tuo **Phone (2)** abbia il numero di build: `Pong_U2.6-241016-1700`
   - Supponendo che l'ultimo aggiornamento OTA disponibile sia: `Pong_V3.0-241226-2001`
   - Il percorso di aggiornamento corrispondente sarebbe: `Pong_U2.6-241016-1700 -> Pong_V3.0-241226-2001`
   - Assicurati di selezionare il percorso corretto in base al tuo dispositivo e alla versione OS.
     - Fai riferimento a [questo](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg) per maggiore chiarezza.

 - **Crea la Cartella `ota`:**
   - Crea una cartella chiamata `ota` nella **memoria interna** del tuo dispositivo, il percorso completo è:
     ```
     /sdcard/ota/
     ```
   - Sposta il file `<firmware>.zip` scaricato in questa cartella.

 - **Accedi all'Updater OTA Offline di Nothing:**
    - Apri l'**app Telefono** e componi:
      ```
      *#*#682#*#*
      ```
   - Questo avvierà lo strumento updater offline integrato.
   - L'interfaccia utente potrebbe mostrare `NothingOfflineOtaUpdate` o `NOTHING BETA OTA UPDATE` — entrambi funzionano.

 - **Applica l'Aggiornamento:**
   - L'updater rileverà automaticamente il file di aggiornamento.
   - Se non rilevato, sfoglia manualmente e importa il file OTA.
   - Tocca `Applica Direttamente OTA` o `Aggiorna` (in base all'interfaccia utente dell'app).
   - Attendi il completamento dell'aggiornamento — il tuo dispositivo si riavvierà automaticamente.

- **Nota:**
  - Se l'updater mostra un **errore sconosciuto**, prova a utilizzare l'opzione **"Sfoglia"** invece di copiare manualmente il file nella cartella **"ota"**.
  - Il **firmware Full OTA** può essere sideloadato se l'OTA incrementale fallisce.
    - **Full OTA non può essere utilizzato per il downgrade** — può solo aggiornare alla stessa build o a una superiore.
    - Gli **utenti con bootloader sbloccato** possono flashare Full OTA tramite recovery personalizzate (es., OrangeFox per Phone (2)).
  - **Non tutte le release hanno un file Full OTA** — usa gli incrementali in questi casi.

---

### II. Sblocco del Bootloader 🔓

A. Prerequisiti
- **Esegui il backup dei tuoi dati** (lo sblocco cancellerà tutto).
- **Installa gli strumenti ADB e Fastboot** – [Scarica qui](https://developer.android.com/studio/releases/platform-tools).
- **Installa i driver USB** – [Driver USB Google](https://developer.android.com/studio/run/win-usb).
- **Abilita Opzioni Sviluppatore**:
  - `Impostazioni > Info sul telefono > Tocca "Numero build" 7 volte.`
- **Abilita Debug USB e Sblocco OEM**:
  - `Impostazioni > Sistema > Opzioni sviluppatore > Abilita Debug USB e Sblocco OEM.`
- **Rimuovi Blocco Schermo/PIN/Password e Account Collegati (opzionale ma raccomandato)**
  - Rimuovere gli account prima di ribloccare il bootloader aiuta a prevenire il blocco Google FRP (Factory Reset Protection). Se l'FRP viene attivato, il dispositivo chiederà l'account Google precedentemente collegato dopo un ripristino di fabbrica. Se dimentichi le credenziali o non puoi accedere all'account, potresti rimanere bloccato fuori dal tuo dispositivo. Per evitarlo, si consiglia di rimuovere tutti gli account Google prima di ribloccare.

B. Processo di Sblocco
- **Collega il telefono a un PC** tramite USB.
- **Apri un prompt dei comandi** nella cartella platform-tools:
  - Windows: `Shift + Click Destro` > **Apri Prompt dei comandi/Powershell qui**.
  - Mac/Linux: Apri **Terminale** e naviga fino a platform-tools.
- **Verifica connessione dispositivo**:
  ```sh
  adb devices
  ```
  Se richiesto, consenti il debug USB sul telefono.

- **Riavvia in bootloader:**
   ```sh
   adb reboot bootloader
   ```

- **Verifica connessione fastboot:**
   ```sh
   fastboot devices
   ```
   Se nessun dispositivo viene rilevato, reinstalla i driver USB.

- **Sblocca il bootloader:**
   ```sh
   fastboot flashing unlock
   ```

- **Conferma sul tuo telefono:**
  - Usa i **Tasti Volume** per navigare e il **Tasto Accensione** per confermare.
  - Il tuo dispositivo **cancellerà tutti i dati** e si riavvierà.

C. Post-Sblocco
  - Configura nuovamente il telefono.
  - **Verifica stato bootloader**:
    ```sh
    Impostazioni > Sistema > Opzioni sviluppatore > Sblocco OEM dovrebbe essere abilitato.
    ```

  - Il bootloader è ora sbloccato e il tuo dispositivo mostrerà un avviso "Orange State" all'avvio—questo è normale.

---

### III. Backup delle Partizioni Essenziali Dopo lo Sblocco del Bootloader 💾

A. Perché Eseguire il Backup?
- Dopo aver sbloccato il bootloader, è cruciale eseguire il backup delle partizioni essenziali come `persist`, `modemst1`, `modemst2`, `fsg`, ecc., **prima** di flashare ROM o kernel personalizzati.
- Queste partizioni contengono dati importanti, tra cui IMEI, impostazioni di rete e calibrazione del sensore di impronte digitali.
- Se persi o corrotti, il dispositivo potrebbe **manifestare** perdita di connettività cellulare, problemi con le impronte digitali o persino **bloccarsi** (brick).
- Creare backup assicura che tu possa **ripristinare il tuo dispositivo** se qualcosa va storto.

B. Requisiti
- **Bootloader sbloccato**
- **Accesso root** (tramite Magisk/KSU/Apatch)
- **App Termux** (installa tramite F-Droid)
- **Controlla Percorsi delle Partizioni:**
  - **Dispositivi Qcom:** `/dev/block/bootdevice/by-name/`
  - **Dispositivi MTK:** `/dev/block/by-name/`

C. Istruzioni per il Backup
- **Per Dispositivi Qualcomm (QCom):**
  - Apri **Termux** e concedi l'accesso root usando:
    ```sh
    su
    ```

  - Copia e incolla il seguente comando in una sola volta:
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    Questo creerà file immagine di tutte le partizioni eccetto `super` e `userdata` **nella Memoria Interna, all'interno di** una cartella chiamata **"partitions_backup"**.

  - **[Opzionale]** Se il comando sopra fallisce, prova questa alternativa:
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **Per Dispositivi MediaTek (MTK):**
  - Apri **Termux** e concedi l'accesso root usando:
    ```sh
    su
    ```

  - Copia e incolla tutti i seguenti comandi in una sola volta:
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

D. Archiviazione del Backup
  - Sposta la cartella **"partitions_backup"** sul tuo **PC o su un'archiviazione sicura**.
  - **NON condividere questi backup!** Contengono dati univoci del dispositivo come l'IMEI.

E. Ripristino delle Partizioni
 - **Dispositivi MTK:**
   ```sh
   fastboot flash nvram nvram.img
   fastboot flash nvdata nvdata.img
   fastboot flash nvcfg nvcfg.img
   fastboot flash persist persist.img
   ```
   Riavvia in **modalità recovery** → Esegui **ripristino di fabbrica** → Riavvia al **sistema**.

 - **Dispositivi QCom:**
   ```sh
   fastboot flash persist persist.img
   fastboot flash modemst1 modemst1.img
   fastboot flash modemst2 modemst2.img
   ```
   Il **ripristino di fabbrica non è obbligatorio in questo caso.**

---

### IV. Flash della ROM Stock Tramite Fastboot ⚡

A. **Preparazione della Cartella per il Flashing:**
  - Scarica i seguenti file per il modello del tuo dispositivo e la build del firmware e posizionali in una cartella dedicata:
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x

  - Installa 7-Zip da [qui](https://www.7-zip.org/).
  - Estrai i file:
    - Windows: Click destro → Estrai in "*\"
    - Utenti Bash:
      `7za -y x "*7z*"`

B. **Procedere con il Flashing:**
  - Installa driver USB compatibili da [qui](https://developer.android.com/studio/run/win-usb).
  - Assicurati che `Android Bootloader Interface` sia visibile in **Gestione Dispositivi** quando il dispositivo è in **modalità bootloader**.
  - Se lo script di estrazione è stato usato in precedenza, eseguilo direttamente. Altrimenti:
    - Sposta tutti i file immagine estratti in una singola cartella insieme allo [Script di Flashing Fastboot](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download).
    - Scarica sempre l'ultimo script per assicurarti che gli hotfix siano inclusi.
  - Esegui lo script **essendo connesso** a internet (per recuperare gli ultimi `platform-tools`) e segui le **istruzioni**:
    - Rispondi al questionario di conferma.
    - Scegli se cancellare i dati: (S/N)
    - Scegli se flashare su entrambi gli slot: (S/N)
    - Disabilita Android Verified Boot: (N)
  - Verifica che tutte le partizioni siano state flashate con successo.
    - Se riuscito, scegli di riavviare al sistema: (S)
    - Se si verificano errori, riavvia in bootloader e riflasha dopo aver risolto l'errore.

---

### V. Blocco del Bootloader 🔒

A. **Prerequisiti**
  - Rimuovi **Blocco Schermo/PIN/Password e Account Collegati** (opzionale ma raccomandato).
  - Esegui un flash pulito della **ROM stock** seguendo la [Guida al Flashing](#iv-flash-della-rom-stock-tramite-fastboot-). **Ribloccare il bootloader con partizioni modificate senza prima flashare il firmware stock rischia di bloccare (brick) il dispositivo!**
  - Esegui il backup di tutti i dati (il blocco **cancellerà tutto**).
  - Installa gli **strumenti ADB e Fastboot** e i driver USB se non già configurati.

B. **Processo di Riblocco**
  - Se sei nel sistema, riavvia in bootloader:
    ```sh
    adb reboot bootloader
    ```

  - Verifica connessione fastboot:
    ```sh
    fastboot devices
    ```

  - Avvia il blocco del bootloader:
    ```sh
    fastboot flashing lock
    ```

  - Conferma sul tuo telefono:
    - Usa i **Tasti Volume** per navigare e il **Tasto Accensione** per confermare.
    - Il dispositivo verrà formattato e si riavvierà con un bootloader bloccato.

C. **Post-blocco**
  - Configura nuovamente il tuo dispositivo.
  - Il bootloader è ora bloccato!

---

## Ringraziamenti 🤝

Ringraziamenti speciali a questi contributori per il loro supporto e lavoro inestimabile:
- **[luk1337](https://github.com/luk1337/oplus_archive)** – **È stato un pioniere** nell'uso dello strumento di estrazione OTA di AOSP, abilitando l'estrazione degli aggiornamenti OTA incrementali.
- **[arter97](https://github.com/arter97/nothing_archive)** – Ha adattato il progetto sopra per **Nothing Phone (2)**.
- **[LukeSkyD](https://github.com/LukeSkyD)** – Mantiene la [Repo Nothing Phone (1)](https://xdaforums.com/t/nothing-phone-1-repo-nos-ota-img-guide-root.4464039/), che è servita come riferimento chiave per le build precedenti.
- **[XelXen](https://github.com/XelXen)** - Ha progettato il logo e il banner per il branding del progetto.
- Individui che hanno contribuito agli sforzi di localizzazione, aiutando a rendere questo progetto accessibile a un pubblico più ampio.

---

## Sostieni il Progetto ⭐

Se questo archivio ti è stato utile, per favore considera di **[aggiungere una stella alla repository](https://github.com/spike0en/nothing_archive/stargazers)**. Il tuo supporto aiuta a mantenere il progetto rintracciabile e attivo!

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
  <img alt="Grafico Storico delle Stelle" src="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
</picture>

---
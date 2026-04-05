---
sidebar_position: 4
title: Guides
description: Guides étape par étape pour le déverrouillage du bootloader, le root, les mises à jour OTA et la personnalisation des appareils Nothing.
keywords: [déverrouillage bootloader nothing, root nothing phone, nothing fastboot, mises à jour ota nothing, codes numéroteur nothing, remapper touche essentiel]
---

# Guides pratiques

Guides étape par étape sur plusieurs aspects de l'utilisation et de la personnalisation.

## Guides généraux

Conseils, astuces et guides généraux pour tous.

### Chargement latéral de mise à jour (OTA Sideloading)

:::note

- Le déverrouillage du bootloader n'est **pas obligatoire** pour charger manuellement les mises à jour OTA incrémentielles. Ignorez l'étape A sauf si vous avez rooté votre appareil.
- Le chargement latéral de mises à jour OTA officielles (incrémentielles ou complètes) est sûr tant qu'elles sont téléchargées directement depuis cette archive.
- N'utilisez pas de sources tierces. Tous les firmwares de Nothing Archive proviennent directement des serveurs officiels de Nothing.
  Cela peut être vérifié en inspectant les URL de téléchargement dans la section OTA incrémentiels, qui pointent vers les serveurs officiels et non vers des hébergeurs tiers.
- Le programme de mise à jour hors ligne intégré à Nothing OS n'accepte que les packages de mise à jour signés par l'OEM.
- Le programme de mise à jour vérifie le hachage du firmware avant l'installation et échouera si un zip OTA incorrect ou incompatible est utilisé.
- La même vérification s'applique aux packages OTA complets ; ils ne s'installeront pas si leur intégrité n'est pas intacte.
- En raison de ces vérifications, il n'est pas possible de "bricker" votre appareil en chargeant un zip OTA officiel sur un bootloader verrouillé.
- Pour les mises à jour Open Beta Test, chargez-les via le `Nothing Beta Updater Hub` (le nom peut changer à l'avenir) fourni par le fabricant si la méthode via le numéroteur ne fonctionne pas.
  Vous pouvez lancer l'interface depuis les Paramètres. Cela arrive lorsque vous avez installé l'application de mise à jour bêta de l'OEM qui remplace la version stock intégrée.
- Pour des références visuelles, consultez les images [ici](https://github.com/spike0en/nothing_archive/tree/main/assets/sideloading) dans l'ordre indiqué.

:::

<br />

A. **Restauration des partitions d'origine (Pour les utilisateurs rootés uniquement)**  
  :::tip
  Si votre bootloader est verrouillé, passez directement au point B !
  :::

1. **Vérifiez votre version actuelle de Nothing OS :**  
   - Allez dans `Paramètres > À propos du téléphone > Appuyez sur la bannière de l'appareil`.  
   - Notez le numéro de build.  

2. **Récupérez les images d'origine pour votre build actuel :**  
   - Téléchargez le fichier `-boot-image.7z`.  
   - Extrayez l'archive pour obtenir les fichiers `.img`.  

3. **Identifiez les partitions requises :**  
   - **Appareils Qualcomm :** `boot`, `init_boot`, `vendor_boot`, `recovery`, `vbmeta`  
   - **Appareils MediaTek :** `init_boot`, `vbmeta`, `lk`

4. **Flashez les partitions d'origine** en mode bootloader :  
   :::note
   Seules les partitions modifiées doivent être flashées. Ignorez également les partitions manquantes selon votre plateforme SoC. 
   :::
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   fastboot flash --slot=all lk lk.img
   ```

5. **Redémarrez le système et mettez à jour via le programme de mise à jour système :**
   - Si la mise à jour **échoue**, procédez au **chargement latéral manuel** dans la section suivante.

6. **Restauration du Root (Optionnel) :**
   - Après la mise à jour, vous pouvez re-rooter en **flashant une image boot patchée** pour la nouvelle version de NOS.
   - **Les modules resteront intacts** après le re-rooting.

<br />

B. **Procéder au chargement latéral** 

 - **Téléchargez le bon fichier de firmware de mise à jour :**  
   - Trouvez le fichier de firmware OTA correspondant à votre appareil [ici](/docs/firmware).

 - **Comment sélectionner le bon fichier ?**  
   - Naviguez dans le dépôt et sélectionnez votre modèle d'appareil.  
   - Regardez la colonne Incremental OTA.  
   - **Vérifiez votre numéro de build actuel** :  
     - Allez dans : `Paramètres > Système > À propos du téléphone`.  
     - Appuyez sur la **bannière de l'appareil** et notez le **Numéro de build**.

 - **Exemple :**  
   - Supposons que votre **Phone (2)** ait le numéro de build : `Pong_U2.6-241016-1700` 
   - Supposons que la dernière mise à jour OTA disponible soit : `Pong_V3.0-241226-2001`
   - Le chemin de mise à jour correspondant serait : `Pong_U2.6-241016-1700` -> `Pong_V3.0-241226-2001`
   - Assurez-vous de sélectionner le bon chemin en fonction de votre appareil et de votre version d'OS.
   - Consultez [ceci](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg) pour plus de clarté.

 - **Créez le dossier `ota` :** 
   - Créez un dossier nommé `ota` à la racine de la **mémoire interne** de votre appareil, le chemin complet étant :  
     ```text
     /sdcard/ota/
     ```
   - Déplacez le fichier `<firmware>.zip` téléchargé dans ce dossier.

 - **Accédez au programme de mise à jour hors ligne de Nothing :**  
    - Ouvrez l'application **Téléphone** et composez :  
      ```text
      *#*#682#*#*
      ```
   - Cela lancera l'outil de mise à jour hors ligne intégré.  
   - L'interface peut afficher `NothingOfflineOtaUpdate` ou `NOTHING BETA OTA UPDATE` — les deux fonctionnent.

 - **Appliquez la mise à jour :**  
   - Le programme détectera automatiquement le fichier de mise à jour.  
   - S'il n'est pas détecté, parcourez manuellement vos fichiers et importez le fichier OTA.  
   - Appuyez sur `Directly Apply OTA` ou `Update` (selon l'interface de l'application).  
   - Attendez la fin de la mise à jour — votre appareil redémarrera automatiquement.

:::note

- Si le programme affiche une **erreur inconnue**, essayez d'utiliser l'option **"Parcourir" (Browse)** au lieu de copier manuellement le fichier dans le dossier **"ota"**.
- Un **firmware OTA complet** peut être chargé si l'OTA incrémentiel échoue.
- **Un OTA complet ne peut pas être utilisé pour revenir à une version antérieure (downgrade)** — il ne peut que mettre à jour vers une version identique ou supérieure.
- **Les utilisateurs ayant un bootloader déverrouillé** peuvent flasher l'OTA complet via un recovery personnalisé (ex: OrangeFox pour le Phone (2)).
- **Toutes les versions n'ont pas de fichier OTA complet** — utilisez les incrémentiels dans ces cas-là.

:::

<hr />

### Mode sans échec

- [Redémarrer en mode sans échec](https://www.hardreset.info/devices/nothing/nothing-phone-2/safe-mode/)

<hr />

### Fonctionnalité cachée du Phone (2a) SE

- [Débloquer la fonctionnalité cachée](https://nothing.community/d/11058-hidden-feature-of-phone-2a-special-edition) par RapidZapper

<hr />

### Codes de numérotation

Codes de numérotation (USSD) que vous pouvez composer pour accéder aux menus cachés et aux diagnostics.

| Code | Fonction |
|------|----------|
| `*#06#` | Affiche l'IMEI et le numéro de série |
| `*#07#` | Affiche les niveaux de DAS et les infos réglementaires |
| `*#*#569#*#*` | Ouvre l'outil de feedback / logs de Nothing |
| `*#*#0#*#*` | Menu de test matériel (écran, capteurs, tactile) |
| `*#*#9#*#*` | Ouvre le menu de diagnostic Nothing |
| `*#*#225#*#*` | Affiche les infos de stockage du calendrier |
| `*#*#426#*#*` | Infos de diagnostic Google Play / Firebase |
| `*#*#4636#*#*` | Menu de test (téléphone, batterie, stats d'utilisation, Wi-Fi) |
| `*#*#682#*#*` | Ouvre le programme de mise à jour OTA hors ligne (ne fonctionnera pas si le Nothing Beta Hub est installé) |

<hr />

### Concernant Gadgetbridge

- [Modèles supportés et fonctionnalités](https://gadgetbridge.org/gadgets/wearables/nothing/)
- [Appairage serveur Nothing CMF](https://gadgetbridge.org/basics/pairing/nothing-cmf-server/)

---

## Guides avancés

:::warning
Recommandé pour les utilisateurs avertis uniquement. Ces procédures peuvent bloquer (bricker) votre appareil ou annuler la garantie si elles sont mal effectuées.
:::

### Prérequis et outils

Outils essentiels pour les guides avancés ci-dessous.

#### Pilotes USB

Pilotes essentiels pour les transferts de fichiers USB et la reconnaissance de l'appareil.

- [Pilotes USB Google pour Windows](https://dl.google.com/android/repository/usb_driver_r13-windows.zip)
- Guides d'installation : [USB](https://droidwin.com/android-usb-drivers) | [Fastboot](https://droidwin.com/how-to-install-fastboot-drivers-in-windows-11/)

#### Outils de plateforme (ADB & Fastboot)

Téléchargez les Android SDK Platform-Tools :
- [Windows / Linux / macOS](https://developer.android.com/studio/releases/platform-tools)
- [Guide d'installation](https://www.xda-developers.com/install-adb-windows-macos-linux/)

**Windows (winget) :**
```cmd
winget install --id=Google.PlatformTools -e
```

**macOS/Linux (Homebrew) :**
```bash
brew install --cask android-platform-tools
```

---

### Remappage de la touche Essentiel

Guides pour remapper la touche Essentiel (Essential Key) sur le Phone (3) :

| Guide | Auteur |
|-------|--------|
| [Guide Reddit](https://www.reddit.com/r/NothingTech/comments/1jzljrf/guide_how_to_remap_the_essential_key_on_the_phone/) | acruzjumper, McKeviin, DKmarc & Pealoaf |
| [Guide de remappage rapide](https://www.reddit.com/r/NothingTech/comments/1jv6gea/quick_guide_to_remap_the_essential_space_button/) | David_Ign |
| [Guide XDA](https://xdaforums.com/t/how-to-disable-or-remap-the-essentials-button.4755184/) | rwilco12 |
| [Guide GitHub](https://github.com/z3phydev/How-to-remap-or-disable-the-Essential-Key) | z3phydev |

---

### Déverrouillage du Bootloader

:::info

- Le déverrouillage du bootloader annule la garantie constructeur. Cependant, vous pouvez reflasher la ROM d'origine et reverrouiller le bootloader pour la restaurer.
- Peu importe les autres facteurs, vous perdrez la certification Widevine L1/DRM, qui passera en L3.  
- Vous perdrez l'[intégrité de l'appareil](https://developer.android.com/google/play/integrity/overview), ce qui peut empêcher certaines applications de fonctionner, à moins de corriger cela plus tard avec un accès root.  
  [Ce guide](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) peut être utile pour résoudre ce problème. 

:::

A. **Prérequis**
- **Sauvegardez vos données** (le déverrouillage effacera tout).
- **Installez les outils ADB & Fastboot** – [Télécharger ici](https://developer.android.com/studio/releases/platform-tools).
- **Installez les pilotes USB** – [Pilotes USB Google](https://developer.android.com/studio/run/win-usb).
- **Activez les Options pour les développeurs** :
  - `Paramètres > À propos du téléphone > Appuyez 7 fois sur "Numéro de build".`
- **Activez le débogage USB et le déverrouillage OEM** :
  - `Paramètres > Système > Options pour les développeurs > Activez le débogage USB et le déverrouillage OEM.`
- **Supprimez le verrouillage d'écran / PIN / mot de passe et les comptes connectés (optionnel mais recommandé)**
  - Supprimer les comptes avant de reverrouiller le bootloader aide à prévenir le verrouillage Google FRP (Factory Reset Protection). Si le FRP est déclenché, l'appareil demandera le compte Google précédemment lié après une réinitialisation d'usine. Si vous oubliez les identifiants, vous pourriez être bloqué hors de votre appareil.

B. **Processus de déverrouillage**
- **Connectez votre téléphone à un PC** via USB.
- **Ouvrez une invite de commande** dans le dossier platform-tools :
  - Windows : `Maj + Clic droit` > **Ouvrir une fenêtre de commande/PowerShell ici**.
  - Mac/Linux : Ouvrez le **Terminal** et naviguez vers platform-tools.
- **Vérifiez la connexion de l'appareil** :
  ```sh
  adb devices
  ```
  Si demandé, autorisez le débogage USB sur le téléphone.

- **Redémarrez en mode bootloader :**
   ```sh
   adb reboot bootloader
   ```

- **Vérifiez la connexion fastboot :**
   ```sh
   fastboot devices
   ```
   Si aucun appareil n'est détecté, réinstallez les pilotes USB.

- **Déverrouillez le bootloader :**
   ```sh
   fastboot flashing unlock
   ```

- **Confirmez sur votre téléphone :**
  - Utilisez les **touches de volume** pour naviguer et le **bouton d'alimentation** pour confirmer.
  - Votre appareil **effacera toutes les données** et redémarrera.

C. **Après le déverrouillage**
  - Configurez à nouveau votre téléphone.
  - **Vérifiez le statut du bootloader** :
    ```sh
    Paramètres > Système > Options pour les développeurs > Le déverrouillage OEM doit être activé.
    ```

  - Le bootloader est maintenant déverrouillé et votre appareil affichera un avertissement "Orange State" au démarrage — c'est normal.

<hr />

### Root

:::info

- Le root **annule la garantie constructeur** et peut empêcher les mises à jour OTA, sauf si les images d'origine sont restaurées avant la mise à jour.
- Assurez-vous toujours que l'**image boot / init_boot correspond exactement à votre build de firmware actuel**.
  Flasher une image incorrecte ou incompatible **provoquera des boucles de démarrage (bootloops)**.
- **Utilisez toujours l'image `init_boot` au lieu de `boot` pour le root si la partition existe**.
- Le root nécessite un **bootloader déverrouillé**.
- Vous pouvez également consulter les guides visuels suivants (en anglais) : [orailnoor](https://www.youtube.com/watch?v=v0i4rftKNWs) | [Droidwin](https://www.youtube.com/watch?v=4T1ZHDUCBsw) | [EpicDroid](https://www.youtube.com/watch?v=vXIBfyX7s-k).

:::

<br />

A. **Prérequis**
- **Bootloader déverrouillé** avec le **débogage USB activé**
- Un **PC avec ADB & Fastboot**  
  *ou* un autre téléphone Android avec **USB-OTG + une application ADB (ex: [Bugjaeger](https://play.google.com/store/apps/details?id=eu.sisik.hackendebug&hl=en_IN))**  
  *ou* un **recovery personnalisé (ex: TWRP / OrangeFox / recoveries basés sur AOSP)**
- Connaissances de base de **ADB / Fastboot**
- Le **firmware d'origine** correspondant à votre build actuel (pour extraire les images)
- Solutions de root recommandées :
  - [Magisk](https://github.com/topjohnwu/Magisk/releases) | [Installation](https://topjohnwu.github.io/Magisk/install.html)
  - [KernelSU (KSU)](https://github.com/tiann/KernelSU) | [Installation](https://kernelsu.org/guide/installation.html)
  - [KernelSU Next (KSUN)](https://github.com/KernelSU-Next/KernelSU-Next) | [Installation](https://kernelsu-next.github.io/webpage/pages/installation.html)

<br />

B. **Vérification de la version logicielle actuelle**
- Sur votre téléphone, allez dans : Paramètres > À propos du téléphone > Appuyez sur la bannière Nothing OS.
- **Notez le numéro de build**
- Exemple : `Pong_B4.0-251119-1654`
- Ignorez tout suffixe régional comme `IND`/`EEA`/`TUR`, etc.

<br />

C. **Récupération de l'image stock Boot / Init_boot**
- Allez dans l'[index des versions](/docs/firmware).
- Sélectionnez votre **modèle d'appareil**.
- Ouvrez **OTA Images** pour votre build exact.
- Téléchargez l'archive correspondante : `*-image-boot.img.7z` dans les "assets" de la version.

- Extrayez l'archive et localisez :
  - `init_boot.img` **(préféré, si présent)**
  - `boot.img` (uniquement si `init_boot` n'existe pas)

- **Transférez l'image sur votre appareil**
  ```sh
  adb push init_boot.img /sdcard/Download/
  # ou
  adb push boot.img /sdcard/Download/
  ```

<br />

D. **Patcher l'image**

**Magisk**
- Installez le dernier APK de Magisk sur votre appareil.
- Ouvrez Magisk → Installer → Sélectionner et patcher un fichier.
- Choisissez l'image `init_boot` (préféré) / `boot` transférée. 
- Magisk générera : `magisk_patched-XXXXX.img`

<br />

**KernelSU / KernelSU Next**  

:::note

- Pour le Nothing Phone (2) : La méthode de root basée sur KSU est supportée avec le `boot.img` d'origine. Mais le support de KSUN ou SUSFS nécessite un kernel compilé sur mesure avec les patchs ajoutés.
- Les options de kernels personnalisés pré-patchés connues incluent : 
  [arter97 kernel](https://xdaforums.com/t/r44-arter97-kernel-for-nothing-phone-2.4631313/) - KSU pré-patché. Ne supporte pas encore NOS 4.0+. | 
  [Meteoric Kernel (EOL)](https://github.com/HELLBOY017/kernel_nothing_sm8475) - KSUN + SUSFS pré-patché. Ne supporte pas NOS 4.0+. |
  [Wild Kernel fork](https://github.com/MiguVT/Meteoric_KernelSU_SUSFS) - KSU + SUSFS pré-patché. | 
  [Wild Kernel](https://github.com/WildKernels/GKI_KernelSU_SUSFS) - KSUN + SUSFS pré-patché. Supporte 5.10-android12. 
- Les modèles Nothing avec des vendeurs Android 13+ d'origine (sortis après le Phone (2)) supporteront la méthode de patch KSUN.

:::

- La méthode de patch est similaire à celle de Magisk. Dans le gestionnaire KSU/KSUN, appuyez sur "Non installé" > patcher le `init_boot.img` et transférez l'image patchée sur PC.

- Redémarrez en mode bootloader :
  ```sh
  adb reboot bootloader
  ```

- Flashez l'image patchée :
  ```bash
  fastboot flash init_boot <glissez-déposez le fichier_init_boot_patché.img>
  ```

- Redémarrez le système :
  ```bash
  fastboot reboot
  ``` 

- L'appareil devrait être rooté avec KSU/KSUN.

<hr />

### Sauvegarde des partitions essentielles

:::info

- Après avoir déverrouillé le bootloader, il est crucial de sauvegarder les partitions essentielles telles que `persist`, `modemst1`, `modemst2`, `fsg`, etc., **avant** de flasher des ROMs ou kernels personnalisés.
- Ces partitions contiennent des données importantes, incluant l'IMEI, les paramètres réseau et le calibrage du capteur d'empreintes digitales.
- En cas de perte ou de corruption, votre appareil peut subir une **perte de connectivité cellulaire, des problèmes d'empreinte digitale, ou même être bloqué**.
- Créer des sauvegardes vous assure de pouvoir **restaurer votre appareil** en cas de problème.

:::

A. **Prérequis**
- **Bootloader déverrouillé**
- **Accès Root** (via Magisk/KSU/Apatch)
- **Application Termux** (installer via F-Droid ou Play Store)
- **Vérifiez les chemins de partition :**
  - **Appareils Qcom :** `/dev/block/bootdevice/by-name/`
  - **Appareils MTK :** `/dev/block/by-name/`

B. **Instructions de sauvegarde**
- **Pour les appareils Qualcomm (QCom) :**
  - Ouvrez **Termux** et accordez l'accès root avec :
    ```sh
    su
    ```

  - Copiez et collez la commande suivante d'un seul coup :
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    Cela créera des fichiers images de **toutes les partitions sauf `super` et `userdata`** dans la **mémoire interne** dans un dossier nommé **"partitions_backup"**.

  - **[Optionnel]** Si la commande ci-dessus échoue, essayez cette alternative :
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **Pour les appareils MediaTek (MTK) :**
  - Ouvrez **Termux** et accordez l'accès root avec :
    ```sh
    su
    ```

  - Copiez et collez toutes les commandes suivantes d'un seul coup :
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

C. **Stockage de la sauvegarde**
  - Déplacez le dossier **"partitions_backup"** sur votre **PC ou un stockage sécurisé**.
  - **Ne partagez PAS ces sauvegardes !** Elles contiennent des données uniques à votre appareil comme l'IMEI.

D. **Restauration des partitions**
 - **Appareils MTK :**
   ```sh
   fastboot flash nvram nvram.img
   fastboot flash nvdata nvdata.img
   fastboot flash nvcfg nvcfg.img
   fastboot flash persist persist.img
   ```
   Redémarrez en **mode recovery** → Effectuez une **réinitialisation d'usine** → Redémarrez le **système**.
   - Lien de réf : [Nothing Phone (2a) DVT Engineering Sample: Recovering Baseband and IMEI Records](https://bluehomewu.github.io/posts/Restoring-Baseband-and-IMEI-on-Nothing-Phone-2a-DVT/) (en anglais/chinois traditionnel).

 - **Appareils QCom :**
   ```sh
   fastboot flash persist persist.img
   fastboot flash modemst1 modemst1.img
   fastboot flash modemst2 modemst2.img
   ```
   **La réinitialisation d'usine n'est pas obligatoire dans ce cas.**

<hr />

### Flashage de la ROM d'origine (Déblocage / Downgrade)

:::note

- C'est la seule méthode recommandée pour effectuer manuellement un flashage propre (clean flash) vers une version plus récente du firmware stock ou pour revenir à une version antérieure (downgrade).
- Pour une meilleure compréhension, référez-vous aux guides visuels (en anglais) : [Droidwin](https://www.youtube.com/watch?v=YCYEjdC3oHM) | [The Nothing Lab](https://www.youtube.com/watch?v=l0P9gosl64s) | [QZX Tech](https://www.youtube.com/watch?v=66H2MVElyAY)

:::

A. **Préparation du dossier de flashage :**
  - Téléchargez les fichiers suivants pour votre modèle d'appareil et build de firmware, et placez-les dans un dossier dédié :
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x
    - `-hash.sha256` - Optionnel mais recommandé pour vérifier l'intégrité des fichiers.

  - Installez 7-Zip depuis https://www.7-zip.org/

  - Optionnel (**recommandé**) : Vous pouvez utiliser des scripts d'extraction au lieu des étapes manuelles :
    - [Windows](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.bat)
    - [Bash](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.sh)
    - Lancez le script depuis le dossier où se trouvent les fichiers téléchargés.

  - Extrayez les fichiers :
    - Windows : Clic droit → Extraire vers "*\"
    - Utilisateurs Bash : `7za -y x "*.7z*"`

  - Dans de rares cas, les gestionnaires de téléchargement peuvent modifier les extensions des fichiers logiques fractionnés.
  - Renommez-les si besoin :
    - `-image-logical.7z.001.7z` → `-image-logical.7z.001`
    - `-image-logical.7z.002.7z` → `-image-logical.7z.002`
  - Puis réessayez l'extraction.

B. **Procédure de flashage :**
  - Installez les pilotes USB compatibles depuis [ici](https://developer.android.com/studio/run/win-usb).
  - Assurez-vous que `Android Bootloader Interface` est visible dans le **Gestionnaire de périphériques** lorsque l'appareil est en **mode bootloader**.
  - Si le script d'extraction a été utilisé précédemment, exécutez-le directement. Sinon :
    - Déplacez tous les fichiers images extraits dans un seul dossier avec le [Script Nothing Fastboot Flasher](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download).
    - Placez le fichier `-hash.sha256` dans le même répertoire. 
    - Téléchargez toujours la dernière version du script.
  - Lancez le script en étant connecté à Internet (pour récupérer les derniers `platform-tools`) et suivez les instructions :
    - Répondez au questionnaire de confirmation.
    - Ignorez ou procédez aux vérifications de hachage selon le cas. 
    - Choisissez si vous voulez effacer les données : (Y/N) [Clean Flash / Downgrade = `Y` | Dirty Flash / Upgrade = `N`]
    - Choisissez si vous voulez flasher sur les deux slots : (Y/N)
    - Désactiver l'Android Verified Boot : (N) [Attention : si vous choisissez `Y` ici, le bootloader ne pourra plus être déverrouillé plus tard !]
  - Vérifiez que toutes les partitions ont été flashées avec succès.
    - En cas de succès, choisissez de redémarrer le système : (Y)
    - En cas d'erreur, redémarrez en mode bootloader et reflashez après avoir corrigé le problème. Redémarrer sur le système sans correction pourrait bloquer l'appareil.

<hr />

### Reverrouillage du Bootloader

A. **Prérequis**
  - Supprimez le **verrouillage d'écran / PIN / mot de passe et les comptes connectés** (optionnel mais recommandé).
  - Effectuez un flashage propre de la **ROM d'origine** en suivant le [Guide de Flashage](#flashage-de-la-rom-dorigine-déblocage--downgrade). **Reverrouiller le bootloader avec des partitions modifiées sans avoir flashé la ROM stock peut bloquer (bricker) l'appareil !**
  - Sauvegardez toutes les données (le reverrouillage **effacera tout**).
  - Installez les **outils ADB & Fastboot** et les pilotes USB si ce n'est pas déjà fait.

B. **Processus de reverrouillage**
  - Si vous êtes sur le système, redémarrez en mode bootloader :
    ```sh
    adb reboot bootloader
    ```

  - Vérifiez la connexion fastboot :
    ```sh
    fastboot devices
    ```

  - Initiez le reverrouillage du bootloader :
    ```sh
    fastboot flashing lock
    ```

  - Confirmez sur votre téléphone :
    - Utilisez les **touches de volume** pour naviguer et le **bouton d'alimentation** pour confirmer.
    - L'appareil sera formaté et redémarrera avec un bootloader verrouillé.

C. **Après le reverrouillage**
  - Configurez à nouveau votre appareil.
  - Le bootloader est maintenant verrouillé !

<hr />

### Play Integrity

| Guide | Lien |
|-------|------|
| Corriger Play Integrity et la détection du Root | [Wiki](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) |

---

## Développement tiers

:::note
Cette section est gérée par la communauté et n'est pas affiliée à Nothing. Le déverrouillage du bootloader annulera votre garantie constructeur.
:::

Restez à jour avec les ROMs personnalisées, les kernels et les projets de développement.

### Canaux de mise à jour des appareils (Telegram)

**Nothing :**
| Appareil | Canal |
|--------|---------|
| Phone (1) | [Mises à jour](https://t.me/s/NothingPhone1Updates) |
| Phone (2) | [Mises à jour](https://t.me/s/NothingPhone2updates) |
| Phone (2a) Series | [Mises à jour](https://t.me/s/NothingPhone2aUpdates) |
| Phone (3a) Series | [Mises à jour](https://t.me/s/NothingPhone3aUpdates) |
| Phone (3) | [Mises à jour](https://t.me/s/Phone3Updates) |
| Phone (4a) Series | [Mises à jour](https://t.me/s/Phone4aUpdates) |

**CMF by Nothing :**
| Appareil | Canal |
|--------|---------|
| Phone (1) | [Mises à jour](https://t.me/s/CMFPhone1Updates) |
| Phone (2) Pro / Phone (3a) Lite | [Mises à jour](https://t.me/s/CMFPhone2GlobalUpdates) |

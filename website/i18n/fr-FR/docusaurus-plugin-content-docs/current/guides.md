---
sidebar_position: 4
title: Guides
description: Guides étape par étape pour le déverrouillage du chargeur de démarrage (bootloader), le root, les mises à jour OTA et la personnalisation des appareils Nothing.
keywords: [déverrouillage bootloader nothing, root nothing phone, nothing fastboot, mises à jour ota nothing, codes composeur nothing, réassigner touche essential]
---

# Guides Pratiques

Guides étape par étape sur plusieurs aspects.

## Utilisation Générale et Dépannage

Conseils, astuces et guides généraux pour une utilisation quotidienne.

### Sideloading OTA

:::note

- Le déverrouillage du chargeur de démarrage n'est **pas obligatoire** pour installer manuellement (sideload) les mises à jour OTA incrémentielles. Ignorez l'étape A sauf si vous êtes un utilisateur root.
- Le sideloading des mises à jour OTA officielles, qu'elles soient incrémentielles ou complètes, est sûr tant qu'elles sont téléchargées directement depuis cette archive.
- N'utilisez pas de sources tierces. Tous les micrologiciels (firmwares) de l'archive Nothing proviennent directement des serveurs officiels OEM de Nothing.  
  Cela peut être vérifié en inspectant l'URL ou les URL de téléchargement dans la section OTA incrémentielle, qui pointent vers le serveur officiel et non vers des hébergeurs de fichiers tiers.
- L'outil de mise à jour hors ligne intégré de Nothing OS n'accepte que les packages de mise à jour signés par l'OEM.
- L'outil de mise à jour vérifie le hachage (hash) du micrologiciel avant l'installation et échouera si un fichier zip OTA incorrect ou incompatible est utilisé.
- La même vérification s'applique aux packages OTA complets ; ils ne s'installeront pas si leur intégrité n'est pas intacte.
- En raison de ces vérifications, il n'est pas possible de "bricker" votre appareil en installant manuellement un fichier zip OTA officiel sur un chargeur de démarrage verrouillé.
- Pour les mises à jour de test Open Beta, installez-les via `Nothing Beta Updater Hub` (le nom peut changer à l'avenir) fourni par l'OEM si la méthode via le composeur ne fonctionne pas.
  Vous pouvez lancer l'interface depuis les Paramètres. Cela se produit lorsque vous avez installé l'application de mise à jour bêta de l'OEM qui remplace la version stock intégrée.
- Pour des références visuelles, consultez les images [ici](https://github.com/spike0en/nothing_archive/tree/main/assets/sideloading) dans l'ordre indiqué.

:::

<br />

A. **Restauration des Partitions d'Origine (Pour les Utilisateurs Root Uniquement)**  
  :::tip
  Si votre chargeur de démarrage est verrouillé, passez directement au point B !
  :::

1. **Vérifiez votre version actuelle de Nothing OS :**  
   - Allez dans `Paramètres > À propos du téléphone > Appuyez sur la bannière de l'appareil`.  
   - Notez le numéro de build.  

2. **Récupérez les images d'origine pour votre build de micrologiciel actuel :**  
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

5. **Redémarrez le système et mettez à jour via l'Outil de Mise à jour Système :**
   - Si la mise à jour **échoue**, procédez au **sideloading manuel** dans la section suivante.

6. **Restauration du Root (Optionnel) :**
   - Après la mise à jour, vous pouvez ré-rooter en **flashant une image de démarrage patchée** pour la version NOS mise à jour.
   - **Les modules resteront intacts** après le ré-rooting.

<br />

B. **Procéder au Sideloading** 

 - **Téléchargez le bon fichier de micrologiciel de mise à jour :**  
   - Trouvez le bon fichier de micrologiciel OTA pour votre appareil [ici](/docs/firmware).

 - **Comment sélectionner le bon fichier ?**  
   - Naviguez dans le dépôt et sélectionnez votre modèle d'appareil.  
   - Cherchez la colonne OTA incrémentielle.  
   - **Vérifiez votre numéro de Build OS actuel** :  
     - Allez dans : `Paramètres > Système > À propos du téléphone`.  
     - Appuyez sur la **bannière de l'appareil** et notez le **numéro de build**.

 - **Exemple :**  
   - Supposons que votre **Phone (2)** a le numéro de build : `Pong_U2.6-241016-1700` 
     - En supposant que la dernière mise à jour OTA disponible soit : `Pong_V3.0-241226-2001`
     - Le chemin de mise à jour correspondant serait : `Pong_U2.6-241016-1700` -> `Pong_V3.0-241226-2001`
   - Assurez-vous de sélectionner le bon chemin en fonction de votre appareil et de votre version d'OS.
     - Référez-vous à [ceci](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg) pour plus de clarté.

 - **Créez le dossier `ota` :** 
   - Créez un dossier nommé `ota` dans le **stockage interne** de votre appareil, le chemin complet étant :  
     ```text
     /sdcard/ota/
     ```
   - Déplacez le fichier `<firmware>.zip` téléchargé dans ce dossier.

 - **Accédez à l'outil de mise à jour OTA hors ligne de Nothing :**  
    - Ouvrez l'**application Téléphone** et composez :  
      ```text
      *#*#682#*#*
      ```
   - Cela lancera l'outil de mise à jour hors ligne intégré.  
   - L'interface peut afficher `NothingOfflineOtaUpdate` ou `NOTHING BETA OTA UPDATE` — les deux fonctionnent.

 - **Appliquez la mise à jour :**  
   - L'outil de mise à jour détectera automatiquement le fichier de mise à jour.  
   - S'il n'est pas détecté, parcourez manuellement et importez le fichier OTA.  
   - Appuyez sur `Directly Apply OTA` ou `Update` (selon l'interface de l'application).  
   - Attendez que la mise à jour se termine — votre appareil redémarrera automatiquement.

:::note

- Si l'outil de mise à jour affiche une **erreur inconnue**, essayez d'utiliser l'option **"Parcourir"** (Browse) au lieu de copier manuellement le fichier dans le dossier **"ota"**.
- Le **micrologiciel OTA complet** peut être installé manuellement si l'OTA incrémentiel échoue.
- L'**OTA complet ne peut pas être utilisé pour revenir à une version antérieure** (downgrade) — il peut seulement mettre à jour vers la même version ou une version supérieure.
- Les **utilisateurs avec un chargeur de démarrage déverrouillé** peuvent flasher l'OTA complet via des récupérations personnalisées (ex: OrangeFox pour Phone (2)).
- **Toutes les versions n'ont pas de fichier OTA complet** — utilisez les incrémentielles dans ce cas.

:::


<hr />

### Mode Sans Échec

- [Redémarrage en mode sans échec](https://www.hardreset.info/devices/nothing/nothing-phone-2/safe-mode/)


<hr />

### Codes Composeur

Codes composeur (USSD) que vous pouvez composer pour accéder aux menus cachés et aux diagnostics.

| Code | Fonction |
|------|----------|
| `*#06#` | Affiche l'IMEI et le numéro de série |
| `*#07#` | Affiche les niveaux de DAS (SAR) et les infos réglementaires |
| `*#*#569#*#*` | Ouvre l'outil de feedback / log de Nothing |
| `*#*#0#*#*` | Menu de test matériel (écran, capteurs, tactile) |
| `*#*#9#*#*` | Ouvre le menu de diagnostic de Nothing |
| `*#*#225#*#*` | Affiche les infos de stockage de l'Agenda |
| `*#*#426#*#*` | Infos de diagnostic Google Play / Firebase |
| `*#*#4636#*#*` | Menu de test (téléphone, batterie, statistiques d'utilisation, Wi-Fi) |
| `*#*#682#*#*` | Ouvre l'outil de mise à jour OTA hors ligne (ne fonctionnera pas si Nothing Beta Hub est installé) |


---

## Fonctionnalités et Accessoires de l'Appareil

Guides pour des modifications matérielles spécifiques et appairages.

### Vérification des Informations de Batterie

:::info
- Testé sur les séries Nothing Phone (3a), Phone (3) et Phone (4a).
- Peut ne pas fonctionner sur d'autres appareils ou les futures versions de Nothing OS (4.0 / 4.1+).
- Cela permet uniquement de consulter les données système existantes et fonctionne avec le micrologiciel d’origine Nothing OS.
- Cela ne modifie rien et n’affectera pas votre garantie.
:::

Ce guide explique comment ouvrir la page masquée **Informations sur la batterie** dans Nothing OS, qui est généralement limitée aux variantes de l'UE mais qui peut être consultée sur d'autres variantes régionales à l'aide de cette méthode.

#### Prérequis
- [Shizuku (Fork)](https://github.com/thedjchi/Shizuku)
- [Root Activity Launcher](https://sourceforge.net/projects/androidsage/files/Root%20Activity%20Launcher/)

#### Étapes
1. Installez les deux applications.
2. Configurez Shizuku en suivant le [guide](https://shizuku.rikka.app/guide/setup/) suivant.
3. Accordez à Shizuku l'autorisation pour Root Activity Launcher.
4. Ouvrez Root Activity Launcher et recherchez **Settings** (Paramètres).
5. Développez l'entrée Settings et lancez la sous-activité **Battery Information** répertoriée comme suit :
   ```
   com.android.settings/com.nothing.settings.NtSettings$BatteryInformationActivity
   ```
6. Vous devriez maintenant voir la page **Battery Information** affichant la **Capacité maximale**, le **Nombre de cycles**, la **Date de fabrication** et la **Date de première utilisation** de la batterie installée en usine.

<hr />

### Débloquer le Thème Bauhaus

Le thème inspiré de Bauhaus est une fonctionnalité d'édition spéciale qui peut être débloquée sur plusieurs modèles de téléphones Nothing.

#### Phone (2a) Special Edition
- [Débloquer la fonctionnalité cachée](https://nothing.community/d/11058-hidden-feature-of-phone-2a-special-edition) par RapidZapper

#### Autres Modèles Nothing

**Prérequis :**
- Un PC avec ADB & Fastboot
- [Application SetEdit](https://github.com/MuntashirAkon/SetEdit)

**Étapes :**

1. **Activer les Options pour les développeurs :** Allez dans `Paramètres > À propos du téléphone > Appuyez sur le "Numéro de build" 7 fois`.
2. **Activer le débogage USB :** Allez dans `Paramètres > Système > Options pour les développeurs > Activez le débogage USB`.
3. **Installer SetEdit via ADB :**
   - Renommez l'APK téléchargé en `SetEdit.apk`.
   - Exécutez la commande suivante :
     ```sh
     adb install --bypass-low-target-sdk-block SetEdit.apk
     ```
4. **Débloquer le Thème :**
   - Ouvrez SetEdit et accordez toutes les autorisations demandées.
   - Dans la **Table Système** (System Table), cherchez `theme_bauhaus_enable`.
   - Réglez la valeur sur `1` (Remettez à `0` pour désactiver).
5. **Appliquer le Thème :**
   - Allez dans les paramètres du Lanceur Nothing (Nothing Launcher) et appliquez le nouveau thème.

:::warning

- **Ne modifiez AUCUNE autre valeur dans SetEdit !!**
- Modifier des paramètres système au hasard peut provoquer une instabilité ou des problèmes système.

:::


<hr />

### Réassignation de la Touche Essential

Guides pour réassigner la touche Essential sur le Phone (3) :

| Guide | Auteur |
|-------|--------|
| [Guide Reddit](https://www.reddit.com/r/NothingTech/comments/1jzljrf/guide_how_to_remap_the_essential_key_on_the_phone/) | acruzjumper, McKeviin, DKmarc & Pealoaf |
| [Guide de réassignation rapide](https://www.reddit.com/r/NothingTech/comments/1jv6gea/quick_guide_to_remap_the_essential_space_button/) | David_Ign |
| [Guide XDA](https://xdaforums.com/t/how-to-disable-or-remap-the-essentials-button.4755184/) | rwilco12 |
| [Guide GitHub](https://github.com/z3phydev/How-to-remap-or-disable-the-Essential-Key) | z3phydev |


<hr />

### Lié à Gadgetbridge

- [Modèles supportés et fonctionnalités](https://gadgetbridge.org/gadgets/wearables/nothing/)
- [Appairage serveur Nothing CMF](https://gadgetbridge.org/basics/pairing/nothing-cmf-server/)


---

## Guides Avancés

:::warning
Recommandé pour les utilisateurs avertis uniquement. Ces procédures peuvent bricker votre appareil ou annuler la garantie si elles sont effectuées incorrectement.
:::

Ces guides sont classés par ordre chronologique. Il est fortement recommandé de suivre cette séquence exacte.

### Prérequis et Outils

Outils essentiels pour les guides avancés ci-dessous.

#### Pilotes USB

Pilotes essentiels pour les transferts de fichiers USB et la reconnaissance de l'appareil.

- [Pilotes USB Google pour Windows](https://dl.google.com/android/repository/usb_driver_r13-windows.zip)
- Guides d'installation : [USB](https://droidwin.com/android-usb-drivers) | [Fastboot](https://droidwin.com/how-to-install-fastboot-drivers-in-windows-11/)

#### Platform Tools (ADB & Fastboot)

Téléchargez Android SDK Platform-Tools :
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


<hr />

### Déverrouillage du Chargeur de Démarrage (Bootloader)

:::info

- Le déverrouillage du chargeur de démarrage annule la garantie OEM. Cependant, vous pouvez reflasher la ROM d'origine et reverrouiller le chargeur de démarrage pour la restaurer.
- Indépendamment d'autres facteurs, vous perdrez la certification Widevine L1/DRM, qui passera en L3.  
- Vous perdrez l'[intégrité de l'appareil](https://developer.android.com/google/play/integrity/overview), ce qui peut empêcher certaines applications de fonctionner à moins d'être corrigé plus tard avec un accès root.  
  [Ce guide](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) peut être utile pour résoudre ce problème. 

:::

A. **Prérequis**
- **Sauvegardez vos données** (le déverrouillage effacera tout).
- **Installez les outils ADB & Fastboot** – [Téléchargez ici](https://developer.android.com/studio/releases/platform-tools).
- **Installez les pilotes USB** – [Pilotes USB Google](https://developer.android.com/studio/run/win-usb).
- **Activez les Options pour les développeurs** :
  - `Paramètres > À propos du téléphone > Appuyez sur "Numéro de build" 7 fois.`
- **Activez le débogage USB et le déverrouillage OEM** :
  - `Paramètres > Système > Options pour les développeurs > Activez le débogage USB et le déverrouillage OEM.`
- **Supprimez le verrouillage de l'écran/PIN/Mot de passe et les comptes connectés (optionnel mais recommandé)**
  - Supprimer les comptes avant de reverrouiller le chargeur de démarrage aide à prévenir le verrouillage Google FRP (Factory Reset Protection). Si le FRP est déclenché, l'appareil demandera le compte Google précédemment lié après une réinitialisation d'usine. Si vous oubliez les identifiants ou si vous ne pouvez pas accéder au compte, vous pourriez être bloqué hors de votre appareil. Pour éviter cela, il est recommandé de supprimer tous les comptes Google avant de reverrouiller.

B. **Processus de Déverrouillage**
- **Connectez votre téléphone à un PC** via USB.
- **Ouvrez une invite de commande** dans le dossier platform-tools :
  - Windows : `Shift + Clic Droit` > **Ouvrir une fenêtre de commande/Powershell ici**.
  - Mac/Linux : Ouvrez le **Terminal** et naviguez vers platform-tools.
- **Vérifiez la connexion de l'appareil** :
  ```sh
  adb devices
  ```
  Si vous y êtes invité, autorisez le débogage USB sur le téléphone.

- **Redémarrez en mode bootloader :**
    ```sh
    adb reboot bootloader
    ```

- **Vérifiez la connexion fastboot :**
    ```sh
    fastboot devices
    ```
    Si aucun appareil n'est détecté, réinstallez les pilotes USB.

- **Déverrouillez le chargeur de démarrage :**
    ```sh
    fastboot flashing unlock
    ```

- **Confirmez sur votre téléphone :**
  - Utilisez les **touches de volume** pour naviguer et le **bouton d'alimentation** pour confirmer.
  - Votre appareil **effacera toutes les données** et redémarrera.

C. **Post-Déverrouillage**
  - Configurez à nouveau votre téléphone.
  - **Vérifiez l'état du chargeur de démarrage** :
    ```sh
    Paramètres > Système > Options pour les développeurs > Le déverrouillage OEM devrait être activé.
    ```

  - Le chargeur de démarrage est maintenant déverrouillé et votre appareil affichera un avertissement "Orange State" au démarrage — c'est normal.


<hr />

### Root

:::info

- Le rooting **annule la garantie OEM** et peut empêcher les mises à jour OTA à moins que les images d'origine ne soient restaurées avant la mise à jour.
- Assurez-vous toujours que l'image **boot / init_boot correspond exactement à votre version actuelle de micrologiciel**.
  Flasher une image incorrecte ou incompatible **provoquera des boucles de démarrage (bootloops)**.
- **Utilisez toujours l'image `init_boot` au lieu de `boot` pour rooter si la partition existe**.
- Le rooting nécessite un **chargeur de démarrage déverrouillé**.
- Les utilisateurs peuvent également consulter les guides visuels liés : [orailnoor](https://www.youtube.com/watch?v=v0i4rftKNWs) | [Droidwin](https://www.youtube.com/watch?v=4T1ZHDUCBsw) | [EpicDroid](https://www.youtube.com/watch?v=vXIBfyX7s-k).

:::

<br />

A. **Prérequis**
- **Chargeur de démarrage déverrouillé** avec le **débogage USB activé**
- Un **PC avec ADB & Fastboot**  
  *ou* un autre téléphone Android avec **USB-OTG + application ADB (ex: [Bugjaeger](https://play.google.com/store/apps/details?id=eu.sisik.hackendebug&hl=en_IN))**  
  *ou* une **récupération personnalisée (ex: TWRP / OrangeFox / récupérations basées sur AOSP)**
- Familiarité de base avec **ADB / Fastboot**
- **Micrologiciel d'origine** correspondant à votre build actuel (pour extraire les images)
- Solutions root recommandées :
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

C. **Récupération de l'image Stock Boot / Init_boot**
- Naviguez vers l'[index des versions](/docs/firmware).
- Sélectionnez votre **modèle d'appareil**
- Ouvrez les **Images OTA** pour votre build exact
- Téléchargez l'archive correspondante : `*-image-boot.img.7z` parmi les ressources de la version.

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

D. **Patchez l'image**

**Magisk**
- Installez le dernier APK Magisk sur votre appareil.
- Ouvrez Magisk → Installer → Sélectionner et patcher un fichier.
- Choisissez l'image `init_boot` (préféré) / `boot` transférée. 
- Magisk générera : `magisk_patched-XXXXX.img`

<br />

**KernelSU / KernelSU Next**  

:::note

- Pour le Nothing Phone (2) : La méthode root basée sur KSU est supportée avec le `boot.img` d'origine. Mais le support de KSUN ou SUSFS nécessite un noyau (kernel) compilé sur mesure avec les patchs ajoutés.
- Les options de noyau personnalisé pré-patché disponibles incluent : 
  [arter97 kernel](https://xdaforums.com/t/r44-arter97-kernel-for-nothing-phone-2.4631313/) - pré-patché KSU. Ne supporte pas encore NOS 4.0+ | 
  [Meteoric Kernel (EOL)](https://github.com/HELLBOY017/kernel_nothing_sm8475) - pré-patché KSUN + SUSFS. Ne supporte pas NOS 4.0+. |
  [Wild Kernel fork](https://github.com/MiguVT/Meteoric_KernelSU_SUSFS) - pré-patché KSU + SUSFS. | 
  [Wild Kernel](https://github.com/WildKernels/GKI_KernelSU_SUSFS) - pré-patché KSUN + SUSFS. Supporte 5.10-android12. 
- Les modèles Nothing avec des fournisseurs Android 13+ d'origine, c'est-à-dire ceux lancés après le Phone (2), supporteront la méthode de patch KSUN.

:::

- La méthode de patch est similaire à celle de Magisk. Depuis le gestionnaire KSU/KSUN, appuyez sur "non installé" > patchez l'image `init_boot.img` et transférez l'image patchée sur le PC.

- Redémarrez en mode bootloader :
  ```sh
  adb reboot bootloader
  ```

- Flashez l'image patchée
  ```bash
  fastboot flash init_boot <faites glisser et déposez patched_init_boot.img>
  ```

- Redémarrez le système :
  ```bash
  fastboot reboot
  ``` 

- L'appareil devrait être rooté avec KSU/KSUN.


<hr />

### Play Integrity

| Guide | Lien |
|-------|------|
| Corriger Play Integrity et la détection du Root | [Wiki](https://github.com/yashaswee-exe/AndroidGuides/wiki/Fix-integrity-and-root-detection) |


<hr />

### Sauvegarde des Partitions Essentielles

:::info

- Après avoir déverrouillé le chargeur de démarrage, il est crucial de sauvegarder les partitions essentielles telles que `persist`, `modemst1`, `modemst2`, `fsg`, etc., **avant** de flasher des ROMs ou des noyaux personnalisés.
- Ces partitions contiennent des données importantes, notamment l'IMEI, les paramètres réseau et l'étalonnage du capteur d'empreintes digitales.
- Si elles sont perdues ou corrompues, votre appareil peut subir une **perte de connectivité cellulaire, des problèmes d'empreinte digitale, ou même devenir inutilisable**.
- Créer des sauvegardes garantit que vous pouvez **restaurer votre appareil** en cas de problème.

:::

A. **Prérequis**
- **Chargeur de démarrage déverrouillé**
- **Accès Root** (via Magisk/KSU/Apatch)
- **Application Termux** (installez via F-Droid ou Play Store)
- **Vérifiez les chemins des partitions :**
  - **Appareils Qcom :** `/dev/block/bootdevice/by-name/`
  - **Appareils MTK :** `/dev/block/by-name/`

B. **Instructions de Sauvegarde**
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
    Cela créera des fichiers images de **toutes les partitions sauf `super` et `userdata`** dans le **stockage interne** à l'intérieur d'un dossier nommé **"partitions_backup"**.

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

C. **Stockage de la Sauvegarde**
  - Déplacez le dossier **"partitions_backup"** sur votre **PC ou un stockage sécurisé**.
  - **Ne partagez PAS ces sauvegardes !** Elles contiennent des données uniques à l'appareil comme l'IMEI.

D. **Restauration des Partitions**
 - **Appareils MTK :**
    ```sh
    fastboot flash nvram nvram.img
    fastboot flash nvdata nvdata.img
    fastboot flash nvcfg nvcfg.img
    fastboot flash persist persist.img
    ```
    Redémarrez en **mode récupération (recovery)** → Effectuez une **réinitialisation d'usine (factory reset)** → Redémarrez le **système**.
    - Lien de réf : [Nothing Phone (2a) DVT Engineering Sample: Recovering Baseband and IMEI Records](https://bluehomewu.github.io/posts/Restoring-Baseband-and-IMEI-on-Nothing-Phone-2a-DVT/)
    - L'article a été écrit en chinois (traditionnel) mais peut être traduit en français à l'aide des fonctions de traduction du navigateur.


 - **Appareils QCom :**
    ```sh
    fastboot flash persist persist.img
    fastboot flash modemst1 modemst1.img
    fastboot flash modemst2 modemst2.img
    ```
    **La réinitialisation d'usine n'est pas obligatoire dans ce cas.**


<hr />

### Flasher la ROM d'origine (Unbrick / Downgrade)

:::note

- C'est la seule méthode recommandée pour flasher manuellement une version plus récente du micrologiciel stock ou pour revenir à une version antérieure (downgrade).
- Pour une meilleure compréhension, consultez les guides visuels liés : [Droidwin](https://www.youtube.com/watch?v=YCYEjdC3oHM) | [The Nothing Lab](https://www.youtube.com/watch?v=l0P9gosl64s) | [QZX Tech](https://www.youtube.com/watch?v=66H2MVElyAY)

:::

A. **Préparation du dossier de flashage :**
  - Téléchargez les fichiers suivants pour votre modèle d'appareil et votre build de micrologiciel, et placez-les dans un dossier dédié :
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x
    - `-hash.sha256` - C'est optionnel mais recommandé pour vérifier l'intégrité des fichiers et détecter les parties manquantes.

  - Installez 7-Zip depuis https://www.7-zip.org/

  - Optionnel (**recommandé**) : Vous pouvez utiliser des scripts d'extraction au lieu des étapes manuelles :
    - [Windows](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.bat)
    - [Bash](https://github.com/spike0en/nothing_archive/blob/main/scripts/extract.sh)
    - Exécutez le script depuis le dossier où se trouvent les fichiers téléchargés.

  - Extrayez les fichiers :
    - Windows : Clic droit → Extraire vers "*\"
    - Utilisateurs Bash : `7za -y x "*.7z*"`

  - Dans de rares cas, les gestionnaires de téléchargement peuvent modifier les extensions des fichiers logiques fractionnés.
  - Renommez :
    - `-image-logical.7z.001.7z` → `-image-logical.7z.001`
    - `-image-logical.7z.002.7z` → `-image-logical.7z.002`
  - Puis réessayez l'extraction.

B. **Procéder au Flashage :**
  - Installez des pilotes USB compatibles depuis [ici](https://developer.android.com/studio/run/win-usb).
  - Assurez-vous que `Android Bootloader Interface` est visible dans le **Gestionnaire de périphériques** lorsque l'appareil est en **mode bootloader**.
  - Si le script d'extraction a été utilisé précédemment, exécutez-le directement. Sinon :
    - Déplacez tous les fichiers images extraits dans un seul dossier avec le [Script Fastboot Flasher de Nothing](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download).
    - Placez le fichier `-hash.sha256` dans le même répertoire. 
    - Téléchargez toujours la dernière version du script pour vous assurer que les correctifs sont inclus.
  - Exécutez le script tout en étant connecté à Internet (pour récupérer les derniers `platform-tools`) et suivez les instructions :
    - Répondez au questionnaire de confirmation.
    - Ignorez ou procédez aux vérifications de hachage selon le cas. 
    - Choisissez s'il faut effacer les données : (Y/N) [Installation propre / Downgrade = `Y` | Mise à jour simple = `N`]
    - Choisissez s'il faut flasher sur les deux emplacements (slots) : (Y/N)
    - Désactiver Android Verified Boot : (N) [Veuillez noter que si vous choisissez `Y` ici, le chargeur de démarrage ne pourra plus être déverrouillé plus tard !]
  - Vérifiez que toutes les partitions ont été flashées avec succès.
    - Si c'est le cas, choisissez de redémarrer le système : (Y)
    - En cas d'erreurs, redémarrez en mode bootloader et reflashez après avoir corrigé l'échec. Redémarrer le système sans le faire pourrait entraîner des briques logicielles ou matérielles.


<hr />

### Reverrouillage du Chargeur de Démarrage (Bootloader)

A. **Prérequis**
  - Supprimez le **verrouillage de l'écran/PIN/Mot de passe et les comptes connectés** (optionnel mais recommandé).
  - Flashez proprement la **ROM d'origine** en suivant le [Guide de flashage](#flasher-la-rom-dorigine-unbrick--downgrade). **Reverrouiller le chargeur de démarrage avec des partitions modifiées sans flasher le micrologiciel d'origine peut bricker l'appareil !**
  - Sauvegardez toutes les données (le reverrouillage **effacera tout**).
  - Installez les **outils ADB & Fastboot** et les pilotes USB si ce n'est pas déjà fait.

B. **Processus de Reverrouillage**
  - Si vous êtes dans le système, redémarrez en mode bootloader :
    ```sh
    adb reboot bootloader
    ```

  - Vérifiez la connexion fastboot :
    ```sh
    fastboot devices
    ```

  - Initiez le reverrouillage du chargeur de démarrage :
    ```sh
    fastboot flashing lock
    ```

  - Confirmez sur votre téléphone :
    - Utilisez les **touches de volume** pour naviguer et le **bouton d'alimentation** pour confirmer.
    - L'appareil sera formaté et redémarrera avec un chargeur de démarrage verrouillé.

C. **Post-Reverrouillage**
  - Configurez à nouveau votre appareil.
  - Le chargeur de démarrage est maintenant verrouillé !
---

## Débricage complet (Hard Unbrick)

:::note

Cette section ne doit être consultée que lorsqu'aucune autre option n'est possible pour récupérer l'appareil à l'aide du [guide de flashage de la ROM d'origine](#flasher-la-rom-dorigine-unbrick--downgrade).

:::

### Pilotes

Installez les pilotes appropriés pour le fabricant du processeur (SoC) de votre appareil.

- **Pilote Qualcomm HS-USB 9008 :** [OneDrive](https://itraps-my.sharepoint.com/personal/public_builds_itraps_onmicrosoft_com/_layouts/15/onedrive.aspx?viewid=fce5f287%2D4883%2D4f5a%2Daf37%2D29642c53cfdf&id=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers%2FQualcomm%2DHS%2DUSB%2DQDLoader%2D9008%2DDriver%2Ezip&parent=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers) // [Catalogue Microsoft Update](https://catalog.update.microsoft.com/Search.aspx?q=qualcomm%20hs-usb)
- **Pilote MediaTek :** [MediaFire](https://www.mediafire.com/file/w0z94wwe4lkka7q/MTK-Driver-v5.2307.zip/file) // [OneDrive](https://itraps-my.sharepoint.com/personal/public_builds_itraps_onmicrosoft_com/_layouts/15/onedrive.aspx?viewid=fce5f287%2D4883%2D4f5a%2Daf37%2D29642c53cfdf&id=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers%2FQualcomm%2DHS%2DUSB%2DQDLoader%2D9008%2DDriver%2Ezip&parent=%2Fpersonal%2Fpublic%5Fbuilds%5Fitraps%5Fonmicrosoft%5Fcom%2FDocuments%2FNothing%20Resources%2F%40Drivers)

### Câble EDL (Qualcomm)

- Notez que les appareils basés sur Snapdragon peuvent nécessiter un **câble Hydra v2** si le câble d'origine ne permet pas à l'outil de flashage de reconnaître l'appareil, même avec les pilotes installés. 
- **Vérification :** L'appareil étant éteint, maintenez les deux boutons **Volume +** et **Volume -** enfoncés tout en connectant le câble au PC. Si vous utilisez un câble Hydra v2, appuyez sur le bouton du câble lors de la connexion.
- Pour une **méthode DIY** afin de fabriquer un câble EDL, reportez-vous plutôt à [ce guide](https://xdaforums.com/t/edl-cable-for-nothing-phone-2.4654742/).

### Outils et ressources

:::danger Avis de non-responsabilité et notification

- Cette section sert uniquement d'index de référence pour les ressources déjà disponibles publiquement sur le web ouvert. Ce projet n'héberge, ne stocke ni ne distribue aucun des outils propriétaires ou fichiers binaires répertoriés ci-dessous.
- Tous les liens fournis pointent vers des dépôts et des hébergeurs de fichiers tiers externes sur lesquels nous n'avons aucun contrôle. Nous ne garantissons pas la sécurité, l'intégrité ou la légalité de ces ressources externes.
- Il s'agit d'outils de service officiels ayant fuité. Les auteurs et contributeurs du projet déclinent toute responsabilité en cas de dommages matériels, de perte de données ou de conséquences imprévues résultant de leur utilisation.
- Ce projet est indépendant et n'est pas affilié à, autorisé par, ou approuvé par Nothing Technology Limited.
- Les outils de cette section sont destinés uniquement à la récupération d'urgence (hard brick) et ne doivent pas être utilisés pour un flashage de routine.
- Si vous êtes détenteur de droits d'auteur et souhaitez demander la suppression d'un lien de référence, veuillez [ouvrir un ticket sur GitHub](https://github.com/spike0en/nothing_archive/issues).

:::

- [Official Unbrick Tools](https://t.me/Edward_ROMs/360) par EdwardWu
- [Unofficial Qualcomm Firehose / Sahara / Streaming / Diag Tools](https://github.com/bkerler/edl) par bkerler
- [NTPI Dumper](https://github.com/AaronXenos/ntpi_dumper) par AaronXenos
- [Phone (2a) Series Hard Brick Helper](https://github.com/mistrmochov/nothing-pacman-hardbrick) par mistrmochov
- [Phone (2a) Series Flash Tool](https://github.com/R0rt1z2/pacman-flash-tool) par R0rt1z2
- [Firehose Auth Files for Nothing Phones](https://github.com/plusonsoy/nothing_edl) par plusonsoy


---


## Développement Après-vente

Restez à jour avec les ROMs personnalisées, les noyaux et les projets de développement.

:::note

- Cette section est gérée par la communauté sur [Telegram](https://t.me/Nothing_Archive) et n'est pas affiliée à Nothing.
- Les liens ci-dessous fournissent des résultats de recherche filtrés à partir des canaux Telegram sans qu'il soit nécessaire de s'inscrire. Cependant, il est recommandé de le faire pour interagir et rejoindre les chats de discussion des appareils respectifs, demander de l'aide ou s'engager avec la communauté des passionnés si vous êtes intéressé par le bidouillage, l'optimisation du potentiel de votre appareil ou pour rester à jour avec toutes les publications.
- Parfois, les liens ci-dessous peuvent ne donner aucun résultat, ce qui signifie que certaines catégories de contenu ne sont pas encore disponibles, développées ou maintenues par un mainteneur fiable pour ce modèle particulier.
- Le déverrouillage du chargeur de démarrage et le flashage de micrologiciels personnalisés annuleront votre garantie OEM. Veuillez lire tous les guides de flashage s'ils sont indiqués dans les messages correspondants et vous référer au chat d'assistance s'il est lié ou au groupe de discussion du modèle.

:::

### Canaux de mise à jour des appareils (Telegram)

**Nothing :**

| Appareil | ROM | Recovery | Kernel | Updates |
|----------|-----|----------|--------|---------|
| Phone (1) | [Ici](https://t.me/s/NothingPhone1Updates?q=%23ROM) | [Ici](https://t.me/s/NothingPhone1Updates?q=%23Recovery) | [Ici](https://t.me/s/NothingPhone1Updates?q=%23Kernel) | [Ici](https://t.me/s/NothingPhone1Updates?q=%23OTA) |
| Phone (2) | [Ici](https://t.me/s/NothingPhone2updates?q=%23ROM) | [Ici](https://t.me/s/NothingPhone2updates?q=%23Recovery) | [Ici](https://t.me/s/NothingPhone2updates?q=%23Kernel) | [Ici](https://t.me/s/NothingPhone2updates?q=%23OTA) |
| Phone (2a) Series | [Ici](https://t.me/s/NothingPhone2aUpdates?q=%23ROM) | [Ici](https://t.me/s/NothingPhone2aUpdates?q=%23Recovery) | [Ici](https://t.me/s/NothingPhone2aUpdates?q=%23Kernel) | [Ici](https://t.me/s/NothingPhone2aUpdates?q=%23OTA) |
| Phone (3a) Series | [Ici](https://t.me/s/NothingPhone3aUpdates?q=%23ROM) | [Ici](https://t.me/s/NothingPhone3aUpdates?q=%23Recovery) | [Ici](https://t.me/s/NothingPhone3aUpdates?q=%23Kernel) | [Ici](https://t.me/s/NothingPhone3aUpdates?q=%23OTA) |
| Phone (3) | [Ici](https://t.me/s/Phone3Updates?q=%23ROM) | [Ici](https://t.me/s/Phone3Updates?q=%23Recovery) | [Ici](https://t.me/s/Phone3Updates?q=%23Kernel) | [Ici](https://t.me/s/Phone3Updates?q=%23OTA) |
| Phone (4a) Series | [Ici](https://t.me/s/Phone4aUpdates?q=%23ROM) | [Ici](https://t.me/s/Phone4aUpdates?q=%23Recovery) | [Ici](https://t.me/s/Phone4aUpdates?q=%23Kernel) | [Ici](https://t.me/s/Phone4aUpdates?q=%23OTA) |

**CMF by Nothing :**

| Appareil | ROM | Recovery | Kernel | Updates |
|----------|-----|----------|--------|---------|
| Phone (1) | [Ici](https://t.me/s/CMFPhone1Updates?q=%23ROM) | [Ici](https://t.me/s/CMFPhone1Updates?q=%23Recovery) | [Ici](https://t.me/s/CMFPhone1Updates?q=%23Kernel) | [Ici](https://t.me/s/CMFPhone1Updates?q=%23OTA) |
| Phone (2) Pro / Phone (3a) Lite | [Ici](https://t.me/s/CMFPhone2GlobalUpdates?q=%23ROM) | [Ici](https://t.me/s/CMFPhone2GlobalUpdates?q=%23Recovery) | [Ici](https://t.me/s/CMFPhone2GlobalUpdates?q=%23Kernel) | [Ici](https://t.me/s/CMFPhone2GlobalUpdates?q=%23OTA) |

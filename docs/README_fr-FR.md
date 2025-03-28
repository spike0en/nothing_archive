[English](README.md) | [Deutsch](README_de-DE.md) | [Español](README_es-ES.md) | **Français** | [हिन्दी](README_hi-IN.md) | [Italiano](README_it-IT.md) | [日本語](README_ja-JP.md) | [Русский](README_ru-RU.md) | [Türkçe](README_tr-TR.md)

# Nothing Archive

<img src="../assets/branding/logo.png" width="96" alt="Logo Nothing Archive">

[![Total Downloads](https://img.shields.io/github/downloads/spike0en/nothing_archive/total?logo=github&logoColor=white&label=Total%20Downloads&color=007377)](https://github.com/spike0en/nothing_archive/releases)
[![Latest Release](https://img.shields.io/github/release/spike0en/nothing_archive?label=Latest%20Release&logo=git&logoColor=white&color=1E6091)](https://github.com/spike0en/nothing_archive/releases/latest)

[![Open Pull Requests](https://img.shields.io/github/issues-pr/spike0en/nothing_archive?logo=github&color=F4A261)](https://github.com/spike0en/nothing_archive/pulls)
[![Workflow Status](https://img.shields.io/github/actions/workflow/status/spike0en/nothing_archive/dump.yml?branch=main&label=Build&color=2DC653&logo=github)](https://github.com/spike0en/nothing_archive/actions/workflows/dump.yml)
[![Closed Pull Requests](https://img.shields.io/github/issues-pr-closed/spike0en/nothing_archive?logo=github&color=E76F51)](https://github.com/spike0en/nothing_archive/pulls?q=is%3Apr+is%3Aclosed)


[![Contributors](https://img.shields.io/github/contributors/spike0en/nothing_archive?logo=github&color=9B5DE5)](https://github.com/spike0en/nothing_archive/graphs/contributors)
[![Stars](https://img.shields.io/github/stars/spike0en/nothing_archive?logo=github&color=D4AF37)](#soutenir-le-projet-)
[![Forks](https://img.shields.io/github/forks/spike0en/nothing_archive?logo=github&color=468FAF)](https://github.com/spike0en/nothing_archive/network/members)

---

## Index 📑

- [À propos du projet](#aperçu-)
- [Avertissement](#avertissement-)
- [Notes](#notes-)
- [Catégorisation](#catégorisation-)
- [Téléchargements](#téléchargements-)
- [Vérification de l'intégrité](#vérification-de-lintégrité-)
- **Guides**
  - [Sideloading OTA](#i-sideloading-ota-)
  - [Déverrouillage du Bootloader](#ii-déverrouillage-du-bootloader-)
  - [Sauvegarde des partitions](#iii-sauvegarde-des-partitions-essentielles-après-le-déverrouillage-du-bootloader-)
  - [Flasher la ROM Stock avec Fastboot](#iv-flasher-la-rom-stock-avec-fastboot-)
  - [Reverrouillage du Bootloader](#v-reverrouillage-du-bootloader-)
- [Remerciements](#remerciements-)
- [Soutenir le projet](#soutenir-le-projet-)

---

## Aperçu 🔍

**Nothing Archive** est le dépôt de firmware Nothing OS le plus à jour, offrant des mises à jour OTA officielles, des paquets de firmware complets et des images OTA stock pour **Nothing Phone 1, Phone 2, Phone 2a, Phone 2a Plus, Phone 3a, Phone 3a Pro**, et **CMF Phone 1**, tous provenant directement des serveurs OEM officiels. Tous les fichiers sont [archivés](https://archive.org/details/nothing-archive), garantissant un accès facile et une préservation à long terme.

### Caractéristiques et avantages :

- 📡 **Indexation OTA directe** – Suit les **liens de mise à jour OTA de Nothing OS** depuis les serveurs officiels, offrant un accès aux **mises à jour incrémentielles et complètes** pour les appareils Nothing et CMF.
- 🛠️ **Installation manuelle (Sideloading)** – Installez **manuellement le firmware Nothing OS** pendant les déploiements progressifs ou lorsque les mises à jour OTA échouent en utilisant l'outil intégré **Nothing OS offline updater ou l'application beta updater** ou via **ADB sideload** en utilisant une récupération personnalisée lorsqu'elle est disponible.
- 📦 **Images OTA Stock** – Fournit des **images OTA non modifiées** en utilisant l'outil d'extraction OTA d'AOSP qui permet d'extraire les mises à jour OTA incrémentielles, permettant ainsi les **mises à niveau, les rétrogradations et le flashage de partitions** lorsque les **paquets de firmware complets** ne sont pas disponibles.
- 🔓 **Support du Rooting et Unrooting** – Fournit des **images de démarrage stock pour Magisk, KernelSU et Apatch**, tout en permettant également l'**unrooting** en flashant l'image de démarrage d'origine pour maintenir les **mises à jour OTA fonctionnelles** lorsque des partitions modifiées sont détectées.
- ⚡ **Flasher le firmware et débricker les appareils** – Fournit un **firmware Nothing OS flashable par fastboot** pour aider à **résoudre les boucles de démarrage, récupérer les appareils soft-brickés et restaurer la ROM stock**, tant que fastboot est accessible.

---

## Avertissement 🚨

En utilisant cette archive, les utilisateurs reconnaissent et acceptent ces termes :
- **✅ Authenticité** – Tous les fichiers de firmware de cette archive sont **inchangés, non modifiés et proviennent directement de l'OEM**.
- **⚠️ Flashez à vos risques et périls** – L'installation de firmware sur un appareil avec un **bootloader déverrouillé** comporte des risques inhérents. Suivez attentivement les instructions pour **éviter de bricker votre appareil**.
- **📌 Compatibilité** – Assurez-vous que le firmware correspond à votre **variante d'appareil Nothing ou CMF** avant l'installation.
- **🚫 Aucune garantie ni support officiel** – Il s'agit d'un **projet communautaire, non affilié à [Nothing](https://nothing.tech)**. Toute **défaillance de mise à jour, bug logiciel ou problème d'appareil** reste la responsabilité de l'OEM. L'auteur et les contributeurs **ne sont pas responsables des appareils brickés** en raison d'un flashage incorrect, d'une mauvaise utilisation ou de modifications du firmware. Téléchargez toujours le firmware **directement depuis cette archive** pour garantir l'intégrité.
- **🛡️ Intégrité Open Source** – La redistribution n'est autorisée **qu'avec une attribution appropriée**. Les utilisateurs sont encouragés à soutenir et partager ce projet **pour maintenir sa disponibilité**. **La revente de firmware disponible gratuitement est strictement interdite !**

---

## Notes 📝

- Les versions pour les images OTA sont étiquetées et nommées en utilisant le format : `<VersionNothingOS>`+`<NomCodeAppareil>`.`<DateIncrémentielle>` et `<POST_OTA_VERSION>`_`<VersionNothingOS>`, comme indiqué [ici](https://github.com/spike0en/nothing_archive/releases), respectivement.
- Les versions spécifiques à une région sont étiquetées en utilisant le format : `<VersionNothingOS>`-`<G ou E>`+`<NomCodeAppareil>`.`<DateIncrémentielle>`, applicable à certaines anciennes builds `Spacewar` qui ne sont pas unifiées. Ici, G = GLO (Global), et E = EEA (Espace Économique Européen).
- Pour les versions avec une version Nothing OS au format X.Y.Za et X.Y, les étiquettes sont renommées en X.Y.0-A et X.Y.0 respectivement pour un tri correct (par ex., `2.5.5A` → `2.5.5-A`, `2.6` → `2.6.0`, `3.0` → `3.0.0`).
- Les versions Nothing OS Open Beta sont indiquées par `-OB` le cas échéant.
- Les versions Android Developer Preview sont étiquetées comme `0.0.0-dev`+`<NomCodeAppareil>`.`<DateIncrémentielle>`.
- Sauf indication contraire spécifique dans les notes de version, les versions publiées ici sont compatibles avec toutes les variantes régionales et de couleur de l'appareil.
- Pour des instructions détaillées sur l'interprétation du firmware OTA incrémentiel requis, reportez-vous à [cette section](#i-sideloading-ota-).

---

## Catégorisation 📂

Les fichiers d'image OTA stock **non modifiés** sont archivés au format `.7z` et classés en trois groupes distincts en fonction de la nature de leurs partitions : **Boot**, **Firmware** et **Logical**, pour les modèles respectifs comme suit :

Reportez-vous à [cette](https://github.com/spike0en/nothing_archive/tree/main/docs#categorization-) section.

---

## Téléchargements 📥

Sélectionnez votre **modèle d'appareil** dans la liste déroulante ci-dessous pour accéder à son **Index des versions**:

Reportez-vous à [cette](https://github.com/spike0en/nothing_archive/tree/main/docs#downloads-) section.

---

## Vérification de l'intégrité ✅

- Vous pouvez vérifier l'intégrité du fichier image OTA téléchargé avec l'une des commandes suivantes :

``` bash
  md5sum -c *-hash.md5
  sha1sum -c *-hash.sha1
  sha256sum -c *-hash.sha256
  xxh128sum -c *-hash.xxh128
```
- xxh128 est généralement le plus rapide.

---

## Guides 📖

### I. Sideloading OTA 🔄

> Pour des références visuelles, veuillez vous référer à [ces images](https://github.com/spike0en/test/tree/main/assets/sideloading) dans leur ordre respectif.

<br>

A. **Avertissement**
  - Le sideloading ou l'installation manuelle des mises à jour OTA incrémentielles officielles est **complètement sûr**, tant que vous les téléchargez **directement depuis Nothing Archive de Spike**.
  - **N'utilisez pas de sources tierces**—tous les firmwares de Nothing Archive proviennent directement des serveurs officiels de l'OEM.
  - L'**outil intégré de mise à jour hors ligne de Nothing OS** n'accepte que les mises à jour **signées par l'OEM**, garantissant la sécurité.
  - Le **programme de mise à jour vérifie le hash** du firmware avant l'installation.

<br>

B. **Restauration des partitions Stock (Utilisateurs Root uniquement)**
  > **Si votre bootloader est verrouillé, passez directement au Point C !**

1. **Vérifiez votre version actuelle de Nothing OS :**
   - Allez dans `Paramètres > À propos du téléphone > Appuyez sur la bannière de l'appareil`.
   - Notez le numéro de build.

2. **Récupérez les images stock pour votre build de firmware actuel :**
   - Téléchargez le fichier `-boot-image.7z`.
   - Extrayez l'archive pour obtenir les fichiers `.img`.

3. **Identifiez les partitions requises :**
   - **Appareils Qualcomm :** `boot`, `init_boot` `vendor_boot`, `recovery`, `vbmeta`
   - **Appareils MediaTek :** `init_boot`, `recovery`, `vbmeta`

4. **Flashez les partitions stock** en mode bootloader :
   > Seules les partitions modifiées doivent être flashées. Ignorez également les partitions manquantes en fonction de votre plateforme SoC.
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   ```

5. **Redémarrez vers le système et mettez à jour via le Metteur à jour système :**
   - Si la mise à jour **échoue**, procédez au **sideloading manuel** dans la section suivante.

6. **Restauration du Root (Optionnel) :**
   - Après la mise à jour, vous pouvez re-rooter en **flashant une image de démarrage patchée** pour la version NOS mise à jour.
   - Les **modules resteront intacts** après le re-rootage.

<br>

C. **Procéder au Sideloading**

 - **Téléchargez le bon fichier de firmware de mise à jour :**
   - Trouvez le bon fichier de firmware OTA pour votre appareil [ici](#téléchargements-).

 - **Comment sélectionner le bon fichier ?**
   - Naviguez vers le dépôt et sélectionnez votre modèle d'appareil.
   - Recherchez la colonne Incremental OTA.
   - **Vérifiez votre numéro de build OS actuel** :
     - Allez à : `Paramètres > Système > À propos du téléphone`.
     - Appuyez sur la **bannière de l'appareil** et notez le **Numéro de build**.

 - **Exemple :**
   - Supposons que votre **Phone (2)** ait le numéro de build : `Pong_U2.6-241016-1700`
   - En supposant que la dernière mise à jour OTA disponible soit : `Pong_V3.0-241226-2001`
   - Le chemin de mise à jour correspondant serait : `Pong_U2.6-241016-1700 -> Pong_V3.0-241226-2001`
   - Assurez-vous de sélectionner le bon chemin en fonction de votre appareil et de la version de l'OS.
     - Référez-vous à [ceci](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg) pour plus de clarté.

 - **Créez le dossier `ota` :**
   - Créez un dossier nommé `ota` dans le **stockage interne** de votre appareil, le chemin complet étant :
     ```
     /sdcard/ota/
     ```
   - Déplacez le fichier `<firmware>.zip` téléchargé dans ce dossier.

 - **Accédez au Metteur à jour OTA hors ligne de Nothing :**
    - Ouvrez l'**application Téléphone** et composez :
      ```
      *#*#682#*#*
      ```
   - Cela lancera l'outil de mise à jour hors ligne intégré.
   - L'interface utilisateur peut afficher `NothingOfflineOtaUpdate` ou `NOTHING BETA OTA UPDATE` — les deux fonctionnent.

 - **Appliquez la mise à jour :**
   - Le programme de mise à jour détectera automatiquement le fichier de mise à jour.
   - S'il n'est pas détecté, parcourez et importez manuellement le fichier OTA.
   - Appuyez sur `Directly Apply OTA` ou `Update` (selon l'interface utilisateur de l'application).
   - Attendez la fin de la mise à jour — votre appareil redémarrera automatiquement.

- **Note :**
  - Si le programme de mise à jour affiche une **erreur inconnue**, essayez d'utiliser l'option **"Parcourir"** au lieu de copier manuellement le fichier dans le dossier **"ota"**.
  - Le **firmware OTA complet** peut être sideloadé si l'OTA incrémentiel échoue.
    - **L'OTA complet ne peut pas être utilisé pour rétrograder** — il ne peut mettre à jour que vers la même build ou une build supérieure.
    - Les **utilisateurs avec un bootloader déverrouillé** peuvent flasher l'OTA complet via des récupérations personnalisées (par ex., OrangeFox pour Phone (2)).
  - **Toutes les versions n'ont pas de fichier OTA complet** — utilisez plutôt les incrémentiels dans de tels cas.

---

### II. Déverrouillage du Bootloader 🔓

A. Prérequis
- **Sauvegardez vos données** (le déverrouillage effacera tout).
- **Installez les outils ADB & Fastboot** – [Téléchargez ici](https://developer.android.com/studio/releases/platform-tools).
- **Installez les pilotes USB** – [Pilotes USB Google](https://developer.android.com/studio/run/win-usb).
- **Activez les Options pour les développeurs** :
  - `Paramètres > À propos du téléphone > Appuyez 7 fois sur "Numéro de build".`
- **Activez le Débogage USB & le Déverrouillage OEM** :
  - `Paramètres > Système > Options pour les développeurs > Activez Débogage USB & Déverrouillage OEM.`
- **Supprimez le Verrouillage d'écran/PIN/Mot de passe et les Comptes connectés (optionnel mais recommandé)**
  - La suppression des comptes avant de reverrouiller le bootloader aide à prévenir le verrouillage Google FRP (Factory Reset Protection). Si FRP est déclenché, l'appareil demandera le compte Google précédemment lié après une réinitialisation d'usine. Si vous oubliez les informations d'identification ou ne pouvez pas accéder au compte, vous pourriez être bloqué hors de votre appareil. Pour éviter cela, il est recommandé de supprimer tous les comptes Google avant de reverrouiller.

B. Processus de déverrouillage
- **Connectez votre téléphone à un PC** via USB.
- **Ouvrez une invite de commandes** dans le dossier platform-tools :
  - Windows : `Maj + Clic droit` > **Ouvrir l'invite de commandes/Powershell ici**.
  - Mac/Linux : Ouvrez **Terminal** et naviguez vers platform-tools.
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

- **Déverrouillez le bootloader :**
   ```sh
   fastboot flashing unlock
   ```

- **Confirmez sur votre téléphone :**
  - Utilisez les **Touches de Volume** pour naviguer et le **Bouton d'alimentation** pour confirmer.
  - Votre appareil **effacera toutes les données** et redémarrera.

C. Post-déverrouillage
  - Configurez à nouveau votre téléphone.
  - **Vérifiez l'état du bootloader** :
    ```sh
    Paramètres > Système > Options pour les développeurs > Déverrouillage OEM devrait être activé.
    ```

  - Le bootloader est maintenant déverrouillé et votre appareil affichera un avertissement Orange State au démarrage—c'est normal.

---

### III. Sauvegarde des partitions essentielles après le déverrouillage du Bootloader 💾

A. Pourquoi sauvegarder ?
- Après avoir déverrouillé le bootloader, il est crucial de sauvegarder les partitions essentielles telles que `persist`, `modemst1`, `modemst2`, `fsg`, etc., **avant** de flasher des ROMs personnalisées ou des kernels.
- Ces partitions contiennent des données importantes, notamment l'IMEI, les paramètres réseau et l'étalonnage du capteur d'empreintes digitales.
- En cas de perte ou de corruption, votre appareil peut subir une **perte de connectivité cellulaire, des problèmes d'empreintes digitales, voire devenir brické**.
- La création de sauvegardes garantit que vous pouvez **restaurer votre appareil** si quelque chose tourne mal.

B. Exigences
- **Bootloader déverrouillé**
- **Accès root** (via Magisk/KSU/Apatch)
- **Application Termux** (installer via F-Droid ou Play Store)
- **Vérifier les chemins des partitions :**
  - **Appareils Qcom :** `/dev/block/bootdevice/by-name/`
  - **Appareils MTK :** `/dev/block/by-name/`

C. Instructions de sauvegarde
- **Pour les appareils Qualcomm (Qcom) :**
  - Ouvrez **Termux** et accordez l'accès root en utilisant :
    ```sh
    su
    ```

  - Copiez et collez la commande suivante en une seule fois :
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    Cela créera des fichiers image de **toutes les partitions sauf `super` & `userdata`** dans le **Stockage Interne** à l'intérieur d'un dossier nommé **"partitions_backup"**.

  - **[Optionnel]** Si la commande ci-dessus échoue, essayez cette alternative :
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **Pour les appareils MediaTek (MTK) :**
  - Ouvrez **Termux** et accordez l'accès root en utilisant :
    ```sh
    su
    ```

  - Copiez et collez toutes les commandes suivantes en une seule fois :
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

D. Stockage de la sauvegarde
  - Déplacez le dossier **"partitions_backup"** vers votre **PC ou un stockage sécurisé**.
  - **NE partagez PAS ces sauvegardes !** Elles contiennent des données uniques à l'appareil comme l'IMEI.

E. Restauration des partitions
 - **Appareils MTK :**
   ```sh
   fastboot flash nvram nvram.img
   fastboot flash nvdata nvdata.img
   fastboot flash nvcfg nvcfg.img
   fastboot flash persist persist.img
   ```
   Redémarrez en **mode récupération** → Effectuez une **réinitialisation d'usine** → Redémarrez vers le **système**.

 - **Appareils Qcom :**
   ```sh
   fastboot flash persist persist.img
   fastboot flash modemst1 modemst1.img
   fastboot flash modemst2 modemst2.img
   ```
   **La réinitialisation d'usine n'est pas obligatoire dans ce cas.**

---

### IV. Flasher la ROM Stock avec Fastboot ⚡

A. **Préparation du dossier de flashage :**
  - Téléchargez les fichiers suivants pour votre modèle d'appareil et votre build de firmware et placez-les dans un dossier dédié :
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x

  - Installez 7-Zip depuis [ici](https://www.7-zip.org/).
  - Extrayez les fichiers :
    - Windows : Clic droit → Extraire vers "*\"
    - Utilisateurs Bash :
      7za -y x "*7z*"

B. **Procéder au flashage :**
  - Installez les pilotes USB compatibles depuis [ici](https://developer.android.com/studio/run/win-usb).
  - Assurez-vous que `Android Bootloader Interface` est visible dans le **Gestionnaire de périphériques** lorsque l'appareil est en **mode bootloader**.
  - Si le script d'extraction a été utilisé précédemment, exécutez-le directement. Sinon :
    - Déplacez tous les fichiers image extraits dans un seul dossier avec le [Script de Flashage Fastboot](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download).
    - Téléchargez toujours le dernier script pour vous assurer que les correctifs sont inclus.
  - Exécutez le script en étant connecté à Internet (pour récupérer les derniers `platform-tools`) et suivez les invites :
    - Répondez au questionnaire de confirmation.
    - Choisissez si vous souhaitez effacer les données : (O/N)
    - Choisissez si vous souhaitez flasher sur les deux slots : (O/N)
    - Désactivez Android Verified Boot : (N)
  - Vérifiez que toutes les partitions ont été flashées avec succès.
    - Si réussi, choisissez de redémarrer vers le système : (O)
    - Si des erreurs se produisent, redémarrez en mode bootloader et reflashez après avoir corrigé l'échec.

---

### V. Reverrouillage du Bootloader 🔒

A. **Prérequis**
  - Supprimez le **Verrouillage d'écran/PIN/Mot de passe et les Comptes connectés** (optionnel mais recommandé).
  - Flashez proprement la **ROM stock** en suivant le [Guide de Flashage](#iv-flasher-la-rom-stock-avec-fastboot-). **Reverrouiller le bootloader avec des partitions modifiées sans flasher le firmware stock peut bricker l'appareil !**
  - Sauvegardez toutes les données (le reverrouillage **effacera tout**).
  - Installez les **outils ADB & Fastboot** et les pilotes USB s'ils ne sont pas déjà configurés.

B. **Processus de reverrouillage**
  - Si vous êtes dans le système, redémarrez en mode bootloader :
    ```sh
    adb reboot bootloader
    ```

  - Vérifiez la connexion fastboot :
    ```sh
    fastboot devices
    ```

  - Lancez le reverrouillage du bootloader :
    ```sh
    fastboot flashing lock
    ```

  - Confirmez sur votre téléphone :
    - Utilisez les **Touches de Volume** pour naviguer et le **Bouton d'alimentation** pour confirmer.
    - L'appareil sera formaté et redémarrera avec un bootloader verrouillé.

C. **Post-reverrouillage**
  - Configurez à nouveau votre appareil.
  - Le bootloader est maintenant verrouillé !

---

## Remerciements 🤝

Un merci spécial à ces contributeurs pour leur travail et leur soutien inestimables :
- **[luk1337](https://github.com/luk1337/oplus_archive)** – Pionnier de l'utilisation de l'outil d'extraction OTA d'AOSP, permettant l'extraction des mises à jour OTA incrémentielles.
- **[arter97](https://github.com/arter97/nothing_archive)** – A adapté le projet ci-dessus pour le **Nothing Phone (2)**.
- **[LukeSkyD](https://github.com/LukeSkyD)** – Maintient le [Dépôt Nothing Phone (1)](https://xdaforums.com/t/nothing-phone-1-repo-nos-ota-img-guide-root.4464039/), qui a servi de référence clé pour les builds antérieures.
- **[XelXen](https://github.com/XelXen)** - A conçu le logo et la bannière pour l'image de marque du projet.
- Les personnes ayant contribué aux efforts de localisation, permettant de rendre ce projet accessible à un public plus large.

---

## Soutenir le Projet ⭐

Si cette archive vous a été utile, veuillez envisager de **[mettre une étoile au dépôt](https://github.com/spike0en/nothing_archive/stargazers)**. Votre soutien aide à maintenir le projet découvrable et actif !

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
  <img alt="Graphique de l'historique des étoiles" src="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
</picture>

---
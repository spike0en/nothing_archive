---
sidebar_position: 8
title: Photographie
description: Ports GCAM, configurations de caméra et préréglages d'origine pour les appareils Nothing.
keywords: [nothing gcam, configurations caméra nothing phone, préréglages caméra nothing, photographie nothing]
---

# Ressources de photographie

Ports GCAM, configurations et préréglages de caméra pour les appareils Nothing.

## Ports Google Camera

| Port | Développeur |
|------|-----------|
| [BSG & MGC](https://www.celsoazevedo.com/files/android/google-camera/dev-bsg/) | BSG |
| [AGC](https://www.celsoazevedo.com/files/android/google-camera/dev-BigKaka/) | Bigkaka |
| [LMC](https://www.celsoazevedo.com/files/android/google-camera/dev-hasli/) | hasli |
| [SGCam](https://www.celsoazevedo.com/files/android/google-camera/dev-shamim/) | Shamim |

### Configs GCAM

:::note
- "**Best**" est subjectif. Essayez toutes les configurations et variantes disponibles pour déterminer celle qui vous convient le mieux !
- Pour les appareils basés sur Snapdragon et MTK, il est généralement recommandé d'utiliser respectivement les variantes **Snap** et **Aweme**.
- L'installation d'une variante aléatoire de l'application GCAM seule ne suffit pas pour obtenir les meilleurs résultats ; ce sont les fichiers de configuration réglés par un créateur de configuration en fonction du capteur/des lentilles de l'appareil qui la rendent utilisable et performante.
:::

#### Importation de la configuration

1. Téléchargez le fichier de configuration (`.xml`) via les liens ci-dessous.
2. Ouvrez l'application GCAM téléchargée au moins une fois. Assurez-vous d'accorder l'accès aux fichiers, au stockage, à la caméra et aux autres permissions nécessaires.
3. Le dossier pour la variante de caméra respective sera créé automatiquement à la racine du stockage interne. Le chemin peut varier mais suit généralement les suivants :
- **AGC** → `Stockage interne/Download/AGC/AGC X.Y/configs/`  
- **LMC** → `Stockage interne/LMCX.Y/`  
- **SGCAM** → `Stockage interne/SGCAM/X.Y.Z/XML/`

> `X.Y` ou `X.Y.Z` représente la version de l'application (ex: `9.2` ou `9.2.114`).

4. Déplacez le fichier de configuration `.xml` ou `.agc` téléchargé vers le chemin mentionné à l'étape 3.
5. Ouvrez à nouveau l'application GCAM et chargez le fichier de configuration comme suit :
- Pour AGC : Icône Plus de paramètres > Accorder les permissions d'accès à tous les fichiers > revenir > Allez dans **Settings → Load Config**, puis sélectionnez le fichier `.agc` que vous avez enregistré sous le dossier AGC Configs, puis **Save**.
- LMC : Appuyez deux fois sur la zone vide entre le **bouton de l'obturateur** et l'**icône de changement de caméra**, sélectionnez la configuration, et appuyez sur **Import**. Accordez les permissions si demandé.
6. La configuration sera appliquée automatiquement. Basculez entre les profils (si disponibles) depuis la barre supérieure.

#### Télécharger les configurations

Les fichiers de configuration (`xml` ou `.agc`) ont été archivés ci-dessous par nom d'appareil avec l'attribution du créateur :

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

## Préréglages de la caméra d'origine

Ressources pour les préréglages de la caméra Nothing :

| Source | Lien |
|--------|------|
| Fil Discord | [Voir](https://discord.com/channels/930878214237200394/1351115520245760021) |
| Collection Google Photos | [Voir](https://photos.google.com/share/AF1QipMLXmA5txDQHqlHzF6OV4HhkLTMsqUx9m8_3jMNH0_MizjA7038n_j8gz4v54zTNw?pli=1&key=QUJKYVY4akFFWGVCWWtleG9DMkNCcDc1c2V5TzZB) |
| Nothing Playground | [Parcourir](https://playground.nothing.tech/presets) |
| Document Notion par flo_rahil | [Voir](http://aromatic-perfume-9a5.notion.site/1bd0ff2f0ced80c0b32cce32f552aa4e?v=1bd0ff2f0ced8152aa23000ce56a341a) |
| Recherche Reddit | [r/NothingTech](https://www.reddit.com/r/NothingTech/search/?q=camera+presets&type=posts&sort=new) · [r/NOTHING](https://www.reddit.com/r/NOTHING/search/?q=camera+presets&type=posts&sort=new) · [r/CMFtech](https://www.reddit.com/r/CMFTech/search/?q=camera+presets&type=posts&sort=new) |
| Communauté Telegram | [Rejoindre](https://t.me/NothingTelegramCommunity) |

---

## Divers

- [Shot With Nothing](https://shotwithnothing.crd.co/) par Ali — Un espace pour la communauté afin de partager leurs clichés et célébrer la photographie.


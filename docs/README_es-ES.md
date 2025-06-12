[English](README.md) | [Deutsch](README_de-DE.md) | **Español** | [Français](README_fr-FR.md) | [हिन्दी](README_hi-IN.md) | [Italiano](README_it-IT.md) | [日本語](README_ja-JP.md) | [Русский](README_ru-RU.md) | [Türkçe](README_tr-TR.md)

# Nothing Archive

<img src="../assets/branding/logo.png" width="96" alt="Logo de Nothing Archive">

[![Hits](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive&label=Hits&icon=github&color=%23b02a37)](https://github.com/spike0en/nothing_archive)

[![Stars](https://img.shields.io/github/stars/spike0en/nothing_archive?label=Stars&logo=github&logoColor=white&color=fb481f&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/stargazers)
[![Contributors](https://img.shields.io/github/contributors/spike0en/nothing_archive?label=Contributors&logo=github&logoColor=white&color=2b2a7b&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/spike0en/nothing_archive?label=Forks&logo=github&logoColor=white&color=eeb705&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/network/members)

[![Total Downloads](https://img.shields.io/github/downloads/spike0en/nothing_archive/total?label=Downloads&logo=github&logoColor=white&color=9E9D10&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/releases)
[![Latest Release](https://img.shields.io/github/release/spike0en/nothing_archive?label=Latest&logo=git&logoColor=white&color=18673F&labelColor=1E1E2F&style=flat)](https://github.com/spike0en/nothing_archive/releases/latest)

[![Flashing Scripts](https://img.shields.io/badge/Fastboot%20Flashing%20Scripts-1E1E2F?logo=github&logoColor=white&labelColor=1E1E2F&color=67119E&style=flat)](https://github.com/spike0en/nothing_flasher)
[![Support](https://img.shields.io/badge/Nothing%20Community-1E1E2F?style=flat&logo=telegram&logoColor=white&color=1986F2&labelColor=1E1E2F)](https://t.me/s/Nothing_Archive)

---

## Índice 📑

- [Acerca del Proyecto](#descripción-general-)
- [Descargo de Responsabilidad](#descargo-de-responsabilidad-)
- [Notas](#notas-)
- [Categorización](#categorización-)
- [Descargas](#descargas-)
- [Comprobación de Integridad](#comprobación-de-integridad-)
- **Guías**
  - [Sideloading OTA](#i-sideloading-ota-)
  - [Desbloqueo del Bootloader](#ii-desbloqueo-del-bootloader-)
  - [Copia de Seguridad de Particiones](#iii-copia-de-seguridad-de-particiones-esenciales-después-de-desbloquear-el-bootloader-)
  - [Flashear ROM Stock usando Fastboot](#iv-flashear-la-rom-stock-usando-fastboot-)
  - [Volver a Bloquear el Bootloader](#v-volver-a-bloquear-el-bootloader-)
- [Agradecimientos](#agradecimientos-)
- [Apoya el Proyecto](#apoya-el-proyecto-)

---

## Descripción General 🔍

**Nothing Archive** es el repositorio de firmware de Nothing OS más actualizado, que ofrece actualizaciones OTA oficiales, paquetes completos de firmware e imágenes OTA de stock para **Nothing Phone 1, Phone 2, Phone 2a, Phone 2a Plus, Phone 3a, Phone 3a Pro** y **CMF Phone 1**, todos obtenidos directamente de los servidores oficiales del OEM. Todos los archivos están [archivados](https://archive.org/details/nothing-archive), asegurando un fácil acceso y preservación a largo plazo.

### Características y Beneficios:

- 📡 **Indexación Directa de OTA** – Rastrea los **enlaces de actualización OTA de Nothing OS** desde servidores oficiales, proporcionando acceso a **actualizaciones incrementales y completas** para dispositivos Nothing y CMF.
- 🛠️ **Instalación Manual (Sideloading)** – Instala **firmware de Nothing OS manualmente** durante lanzamientos escalonados o cuando las actualizaciones OTA fallan usando la herramienta integrada **actualizador offline de Nothing OS o la aplicación de actualización beta** o mediante **ADB sideload** usando una recuperación personalizada cuando esté disponible.
- 📦 **Imágenes OTA de Stock** – Proporciona **imágenes OTA sin modificar** utilizando la herramienta de extracción OTA de AOSP que permite extraer actualizaciones OTA incrementales, permitiendo así **actualizaciones, downgrades y flasheo de particiones** cuando los **paquetes completos de firmware** no están disponibles.
- 🔓 **Soporte para Rooting y Unrooting** – Proporciona **imágenes de arranque de stock para Magisk, KernelSU y Apatch**, al mismo tiempo que permite **desrootear** flasheando la imagen de arranque original para mantener **funcionales las actualizaciones OTA** cuando se detectan particiones modificadas.
- ⚡ **Flashear Firmware y Desbrickear Dispositivos** – Proporciona **firmware de Nothing OS flasheable por fastboot** para ayudar a **resolver bucles de arranque, recuperar dispositivos con soft-brick y restaurar la ROM de stock**, siempre que fastboot sea accesible.

---

## Descargo de Responsabilidad 🚨

Al usar este archivo, los usuarios reconocen y aceptan estos términos:
- **✅ Autenticidad** – Todos los archivos de firmware en este archivo están **inalterados, sin modificar y provienen directamente del OEM**.
- **⚠️ Flashea bajo tu propio riesgo** – Instalar firmware en un dispositivo con **bootloader desbloqueado** conlleva riesgos inherentes. Sigue las instrucciones cuidadosamente para **evitar brickear tu dispositivo**.
- **📌 Compatibilidad** – Asegúrate de que el firmware coincida con tu **variante de dispositivo Nothing o CMF** antes de la instalación.
- **🚫 Sin Garantía ni Soporte Oficial** – Este es un **proyecto impulsado por la comunidad, no afiliado a [Nothing](https://nothing.tech)**. Cualquier **fallo de actualización, error de software o problema del dispositivo** sigue siendo responsabilidad del OEM. El autor y los colaboradores **no son responsables de dispositivos brickeados** debido a un flasheo incorrecto, mal uso o modificaciones del firmware. Descarga siempre el firmware **directamente desde este archivo** para garantizar la integridad.
- **🛡️ Integridad del Código Abierto** – La redistribución está permitida **solo con la atribución adecuada**. Se anima a los usuarios a apoyar y compartir este proyecto **para mantener su disponibilidad**. **¡La reventa de firmware disponible gratuitamente está estrictamente prohibida!**

---

## Notas 📝

- Las versiones para imágenes OTA se etiquetan y nombran usando el formato: `<POST_OTA_VERSION>` y `<POST_OTA_VERSION>`_`<VersiónNothingOS>`, como se muestra [aquí](https://github.com/spike0en/nothing_archive/releases), respectivamente.
- Las versiones específicas de región se etiquetan usando el formato: `<POST_OTA_VERSION>`-`GLO/EEA`, aplicable a ciertas compilaciones antiguas de `Spacewar` que no están unificadas. Aquí, GLO = Global y EEA = Espacio Económico Europeo.
- Las versiones de Nothing OS Open Beta se indican con `-OB` donde corresponda.
- Las versiones de Android Developer Preview se etiquetan como `0.0.0-dev`+`<NombreClaveDispositivo>`.`<FechaIncremental>`.
- A menos que se indique específicamente lo contrario en las notas de la versión, las versiones publicadas aquí son compatibles con todas las variantes regionales y de color del dispositivo.
- Para obtener instrucciones detalladas sobre cómo interpretar el firmware OTA incremental requerido, consulta [esta sección](#i-sideloading-ota-).

---

## Categorización 📂

Los archivos de imagen OTA de stock **sin modificar** se archivan en formato `.7z` y se clasifican en tres grupos distintos según la naturaleza de sus particiones: **Boot**, **Firmware** y **Logical**, para los modelos respectivos de la siguiente manera:

Consulta [esta](https://github.com/spike0en/nothing_archive/tree/main/docs#categorization-) sección.

---

## Descargas 📥

Selecciona tu **modelo de dispositivo** de la lista desplegable a continuación para acceder a su **Índice de Versiones**:

Consulta [esta](https://github.com/spike0en/nothing_archive/tree/main/docs#downloads-) sección.

---

## Comprobación de Integridad ✅

- Puedes verificar la integridad del archivo de imagen OTA descargado con uno de los siguientes comandos:

``` bash
  md5sum -c *-hash.md5
  sha1sum -c *-hash.sha1
  sha256sum -c *-hash.sha256
  xxh128sum -c *-hash.xxh128
```
- xxh128 suele ser el más rápido.

---

## Guías 📖

### I. Sideloading OTA 🔄

> Para referencias visuales, consulta [estas imágenes](https://github.com/spike0en/test/tree/main/assets/sideloading) en su orden respectivo.

<br>

A. **Descargo de Responsabilidad**
  - Hacer sideloading o instalar manualmente actualizaciones OTA incrementales oficiales es **completamente seguro**, siempre y cuando las descargues **directamente desde Nothing Archive de Spike**.
  - **No uses fuentes de terceros**—todo el firmware de Nothing Archive proviene directamente de los servidores oficiales del OEM.
  - La **herramienta integrada de actualización offline de Nothing OS** solo acepta actualizaciones **firmadas por el OEM**, garantizando la seguridad.
  - El **actualizador verifica el hash** del firmware antes de la instalación.

<br>

B. **Restaurar Particiones de Stock (Solo para Usuarios Root)**
  > **¡Si tu bootloader está bloqueado, salta directamente al Punto C!**

1. **Verifica tu versión actual de Nothing OS:**
   - Ve a `Ajustes > Información del teléfono > Toca el banner del dispositivo`.
   - Anota el número de compilación.

2. **Obtén imágenes de stock para tu compilación de firmware actual:**
   - Descarga el archivo `-boot-image.7z`.
   - Extrae el archivo para obtener los archivos `.img`.

3. **Identifica las particiones requeridas:**
   - **Dispositivos Qualcomm:** `boot`, `init_boot` `vendor_boot`, `recovery`, `vbmeta`
   - **Dispositivos MediaTek:** `init_boot`, `recovery`, `vbmeta`

4. **Flashea las particiones de stock** en modo bootloader:
   > Solo se requiere flashear las particiones modificadas. Omite también cualquier partición faltante según tu plataforma SoC.
   ```sh
   fastboot flash boot boot.img
   fastboot flash recovery recovery.img
   fastboot flash vendor_boot vendor_boot.img
   fastboot flash vbmeta vbmeta.img
   fastboot flash init_boot init_boot.img
   ```

5. **Reinicia al sistema y actualiza a través del Actualizador del Sistema:**
   - Si la actualización **falla**, procede con el **sideloading manual** en la siguiente sección.

6. **Restaurar Root (Opcional):**
   - Después de actualizar, puedes volver a rootear **flasheando una imagen de arranque parcheada** para la versión de NOS actualizada.
   - Los **módulos permanecerán intactos** después de volver a rootear.

<br>

C. **Proceder con el Sideloading**

 - **Descarga el Archivo de Firmware de Actualización Correcto:**
   - Encuentra el archivo de firmware OTA correcto para tu dispositivo desde [aquí](#descargas-).

 - **¿Cómo Seleccionar el Archivo Correcto?**
   - Navega al repositorio y selecciona tu modelo de dispositivo.
   - Busca la columna Incremental OTA.
   - **Verifica tu Número de Compilación de SO Actual**:
     - Ve a: `Ajustes > Sistema > Información del Teléfono`.
     - Toca el **banner del dispositivo** y anota el **Número de Compilación**.

 - **Ejemplo:**
   - Supón que tu **Phone (2)** tiene el número de compilación: `Pong_U2.6-241016-1700`
   - Asumiendo que la última actualización OTA disponible es: `Pong_V3.0-241226-2001`
   - La ruta de actualización correspondiente sería: `Pong_U2.6-241016-1700 -> Pong_V3.0-241226-2001`
   - Asegúrate de seleccionar la ruta correcta según tu dispositivo y versión de SO.
     - Consulta [esto](https://github.com/spike0en/nothing_archive/blob/main/assets/sideloading/3.1_ota_sideload.jpg) para mayor claridad.

 - **Crea la Carpeta `ota`:**
   - Crea una carpeta llamada `ota` en el **almacenamiento interno** de tu dispositivo, la ruta completa es:
     ```
     /sdcard/ota/
     ```
   - Mueve el archivo `<firmware>.zip` descargado a esta carpeta.

 - **Accede al Actualizador OTA Offline de Nothing:**
    - Abre la **aplicación Teléfono** y marca:
      ```
      *#*#682#*#*
      ```
   - Esto lanzará la herramienta de actualización offline integrada.
   - La interfaz de usuario puede mostrar `NothingOfflineOtaUpdate` o `NOTHING BETA OTA UPDATE` — ambos funcionan.

 - **Aplica la Actualización:**
   - El actualizador detectará automáticamente el archivo de actualización.
   - Si no se detecta, busca e importa manualmente el archivo OTA.
   - Toca `Directly Apply OTA` o `Update` (según la interfaz de usuario de la aplicación).
   - Espera a que se complete la actualización — tu dispositivo se reiniciará automáticamente.

- **Nota:**
  - Si el actualizador muestra un **error desconocido**, intenta usar la opción **"Buscar"** en lugar de copiar manualmente el archivo a la carpeta **"ota"**.
  - El **firmware OTA completo** se puede instalar mediante sideloading si la OTA incremental falla.
    - **La OTA completa no se puede usar para hacer downgrade** — solo puede actualizar a la misma compilación o una superior.
    - Los **usuarios con bootloader desbloqueado** pueden flashear OTA completa a través de recuperaciones personalizadas (p. ej., OrangeFox para Phone (2)).
  - **No todas las versiones tienen un archivo OTA completo** — usa incrementales en su lugar en tales casos.

---

### II. Desbloqueo del Bootloader 🔓

A. Prerrequisitos
- **Haz una copia de seguridad de tus datos** (el desbloqueo borrará todo).
- **Instala las herramientas ADB y Fastboot** – [Descarga aquí](https://developer.android.com/studio/releases/platform-tools).
- **Instala los controladores USB** – [Controladores USB de Google](https://developer.android.com/studio/run/win-usb).
- **Habilita las Opciones de Desarrollador**:
  - `Ajustes > Información del teléfono > Toca "Número de compilación" 7 veces.`
- **Habilita la Depuración USB y el Desbloqueo OEM**:
  - `Ajustes > Sistema > Opciones de desarrollador > Habilita Depuración USB y Desbloqueo OEM.`
- **Elimina el Bloqueo de Pantalla/PIN/Contraseña y las Cuentas Conectadas (opcional pero recomendado)**
  - Eliminar las cuentas antes de volver a bloquear el bootloader ayuda a prevenir el bloqueo de Google FRP (Protección de Restablecimiento de Fábrica). Si se activa FRP, el dispositivo solicitará la cuenta de Google previamente vinculada después de un restablecimiento de fábrica. Si olvidas las credenciales o no puedes acceder a la cuenta, es posible que te quedes bloqueado fuera de tu dispositivo. Para evitar esto, se recomienda eliminar todas las cuentas de Google antes de volver a bloquear.

B. Proceso de Desbloqueo
- **Conecta tu teléfono a un PC** mediante USB.
- **Abre un símbolo del sistema** en la carpeta platform-tools:
  - Windows: `Shift + Clic derecho` > **Abrir símbolo del sistema/Powershell aquí**.
  - Mac/Linux: Abre **Terminal** y navega a platform-tools.
- **Verifica la conexión del dispositivo**:
  ```sh
  adb devices
  ```
  Si se te solicita, permite la depuración USB en el teléfono.

- **Reinicia en modo bootloader:**
   ```sh
   adb reboot bootloader
   ```

- **Verifica la conexión fastboot:**
   ```sh
   fastboot devices
   ```
   Si no se detecta ningún dispositivo, reinstala los controladores USB.

- **Desbloquea el bootloader:**
   ```sh
   fastboot flashing unlock
   ```

- **Confirma en tu teléfono:**
  - Usa las **Teclas de Volumen** para navegar y el **Botón de Encendido** para confirmar.
  - Tu dispositivo **borrará todos los datos** y se reiniciará.

C. Post-Desbloqueo
  - Configura tu teléfono de nuevo.
  - **Verifica el estado del bootloader**:
    ```sh
    Ajustes > Sistema > Opciones de desarrollador > Desbloqueo OEM debería estar habilitado.
    ```

  - El bootloader ahora está desbloqueado y tu dispositivo mostrará una advertencia de Estado Naranja al arrancar—esto es normal.

---

### III. Copia de Seguridad de Particiones Esenciales Después de Desbloquear el Bootloader 💾

A. ¿Por Qué Hacer Copia de Seguridad?
- Después de desbloquear el bootloader, es crucial hacer una copia de seguridad de particiones esenciales como `persist`, `modemst1`, `modemst2`, `fsg`, etc., **antes** de flashear ROMs personalizadas o kernels.
- Estas particiones contienen datos importantes, incluyendo IMEI, configuraciones de red y calibración del sensor de huellas dactilares.
- Si se pierden o corrompen, tu dispositivo puede experimentar **pérdida de conectividad celular, problemas con las huellas dactilares o incluso quedar brickeado**.
- Crear copias de seguridad asegura que puedas **restaurar tu dispositivo** si algo sale mal.

B. Requisitos
- **Bootloader desbloqueado**
- **Acceso root** (vía Magisk/KSU/Apatch)
- **Aplicación Termux** (instalar vía F-Droid o Play Store)
- **Verificar Rutas de Partición:**
  - **Dispositivos Qcom:** `/dev/block/bootdevice/by-name/`
  - **Dispositivos MTK:** `/dev/block/by-name/`

C. Instrucciones de Copia de Seguridad
- **Para Dispositivos Qualcomm (Qcom):**
  - Abre **Termux** y concede acceso root usando:
    ```sh
    su
    ```

  - Copia y pega el siguiente comando de una vez:
    ```sh
    mkdir -p /sdcard/partitions_backup
    ls -1 /dev/block/bootdevice/by-name | grep -v userdata | grep -v super | \
    while read f; do dd if=/dev/block/bootdevice/by-name/$f of=/sdcard/partitions_backup/${f}.img; done
    ```
    Esto creará archivos de imagen de **todas las particiones excepto `super` y `userdata`** en el **Almacenamiento Interno** dentro de una carpeta llamada **"partitions_backup"**.

  - **[Opcional]** Si el comando anterior falla, prueba esta alternativa:
    ```sh
    mkdir -p /sdcard/partitions_backup
    for partition in /dev/block/bootdevice/by-name/*; do \
    [[ "$(basename "$partition")" != "userdata" && "$(basename "$partition")" != "super" ]] && \
    cp -f "$partition" /sdcard/partitions_backup/; done
    ```

- **Para Dispositivos MediaTek (MTK):**
  - Abre **Termux** y concede acceso root usando:
    ```sh
    su
    ```

  - Copia y pega todos los siguientes comandos de una vez:
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

D. Almacenamiento de la Copia de Seguridad
  - Mueve la carpeta **"partitions_backup"** a tu **PC o almacenamiento seguro**.
  - **¡NO compartas estas copias de seguridad!** Contienen datos únicos del dispositivo como el IMEI.

E. Restauración de Particiones
 - **Dispositivos MTK:**
   ```sh
   fastboot flash nvram nvram.img
   fastboot flash nvdata nvdata.img
   fastboot flash nvcfg nvcfg.img
   fastboot flash persist persist.img
   ```
   Reinicia en **modo recuperación** → Realiza un **restablecimiento de fábrica** → Reinicia en **sistema**.

 - **Dispositivos Qcom:**
   ```sh
   fastboot flash persist persist.img
   fastboot flash modemst1 modemst1.img
   fastboot flash modemst2 modemst2.img
   ```
   **El restablecimiento de fábrica no es obligatorio en este caso.**

---

### IV. Flashear la ROM Stock Usando Fastboot ⚡

A. **Preparación de la Carpeta de Flasheo:**
  - Descarga los siguientes archivos para tu modelo de dispositivo y compilación de firmware y colócalos en una carpeta dedicada:
    - image-boot.7z
    - image-firmware.7z
    - image-logical.7z.001-00x

  - Instala 7-Zip desde [aquí](https://www.7-zip.org/).
  - Extrae los archivos:
    - Windows: Clic derecho → Extraer en "*\"
    - Usuarios de Bash:
      7za -y x "*7z*"

B. **Procediendo con el Flasheo:**
  - Instala controladores USB compatibles desde [aquí](https://developer.android.com/studio/run/win-usb).
  - Asegúrate de que `Android Bootloader Interface` esté visible en el **Administrador de Dispositivos** cuando el dispositivo esté en **modo bootloader**.
  - Si se usó el script de extracción anteriormente, ejecútalo directamente. De lo contrario:
    - Mueve todos los archivos de imagen extraídos a una sola carpeta junto con el [Script de Flasheo Fastboot](https://github.com/spike0en/nothing_fastboot_flasher/blob/main/README.md#-download).
    - Descarga siempre el script más reciente para asegurarte de que se incluyan las correcciones rápidas.
  - Ejecuta el script mientras estás conectado a internet (para obtener las últimas `platform-tools`) y sigue las indicaciones:
    - Responde el cuestionario de confirmación.
    - Elige si deseas borrar los datos: (S/N)
    - Elige si deseas flashear en ambas ranuras: (S/N)
    - Deshabilita Android Verified Boot: (N)
  - Verifica que todas las particiones se hayan flasheado correctamente.
    - Si tiene éxito, elige reiniciar al sistema: (S)
    - Si ocurren errores, reinicia en modo bootloader y vuelve a flashear después de abordar el fallo.

---

### V. Volver a Bloquear el Bootloader 🔒

A. **Prerrequisitos**
  - Elimina el **Bloqueo de Pantalla/PIN/Contraseña y las Cuentas Conectadas** (opcional pero recomendado).
  - Flashea limpiamente la **ROM stock** siguiendo la [Guía de Flasheo](#iv-flashear-la-rom-stock-usando-fastboot-). **¡Volver a bloquear el bootloader con particiones modificadas sin flashear el firmware stock puede brickear el dispositivo!**
  - Haz una copia de seguridad de todos los datos (volver a bloquear **borrará todo**).
  - Instala las **herramientas ADB y Fastboot** y los controladores USB si aún no están configurados.

B. **Proceso de Volver a Bloquear**
  - Si estás en el sistema, reinicia en modo bootloader:
    ```sh
    adb reboot bootloader
    ```

  - Verifica la conexión fastboot:
    ```sh
    fastboot devices
    ```

  - Inicia el proceso de volver a bloquear el bootloader:
    ```sh
    fastboot flashing lock
    ```

  - Confirma en tu teléfono:
    - Usa las **Teclas de Volumen** para navegar y el **Botón de Encendido** para confirmar.
    - El dispositivo se formateará y reiniciará con un bootloader bloqueado.

C. **Post-Bloqueo**
  - Configura tu dispositivo de nuevo.
  - ¡El bootloader ahora está bloqueado!

---

## Agradecimientos 🤝

Un agradecimiento especial a estos colaboradores por su invaluable trabajo y apoyo:
- **[luk1337](https://github.com/luk1337/oplus_archive)** – Pionero en el uso de la herramienta de extracción OTA de AOSP, permitiendo la extracción de actualizaciones OTA incrementales.
- **[arter97](https://github.com/arter97/nothing_archive)** – Adaptó el proyecto anterior para el **Nothing Phone (2)**.
- **[LukeSkyD](https://github.com/LukeSkyD)** – Mantiene el [Repositorio de Nothing Phone (1)](https://xdaforums.com/t/nothing-phone-1-repo-nos-ota-img-guide-root.4464039/), que sirvió como referencia clave para compilaciones anteriores.
- **[XelXen](https://github.com/XelXen)** - Diseñó el logo y el banner para la marca del proyecto.
- Individuos que contribuyeron a los esfuerzos de localización, ayudando a hacer que este proyecto sea accesible a un público más amplio.

---

## Apoya el Proyecto ⭐

Si este archivo te ha sido útil, por favor considera **[marcar el repositorio con una estrella](https://github.com/spike0en/nothing_archive/stargazers)**. ¡Tu apoyo ayuda a mantener el proyecto visible y activo!

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
  <img alt="Gráfico del Historial de Estrellas" src="https://api.star-history.com/svg?repos=spike0en/nothing_archive&type=Date" />
</picture>

---
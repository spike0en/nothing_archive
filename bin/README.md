# Third-Party & Standalone Tools (Binaries)

The files in this directory are binaries used by the Nothing Archive project for extracting OTA packages.

## Directory Structure

- `bin/x86_64/`: x86_64 prebuilt `ota_extractor` and supporting dynamic libraries (`.so`).
- `bin/arm64/`: AArch64 / ARM64 standalone `ota_extractor` binary.

## Attribution & Build Credits

### 1. ARM64 OTA Extractor (`bin/arm64/ota_extractor`)
- **Upstream Source**: Sourced from the [Android Open Source Project (AOSP)](https://android.googlesource.com/platform/system/update_engine/) (`system/update_engine`, `libchrome`, `libsnapshot`) and Chromium under Apache License 2.0 / BSD-3-Clause.
- **Port & Build Configuration**: Extracted, ported to a standalone CMake build system, and compiled natively for AArch64 Linux by **spike0en / Nothing Archive**.

### 2. x86_64 OTA Extractor (`bin/x86_64/ota_extractor`)
- **Upstream Source**: Sourced from [luk1337/oplus_archive](https://github.com/luk1337/oplus_archive) / AOSP under Apache License 2.0.

### 3. Supporting Libraries (`bin/x86_64/*.so`)
- Sourced from AOSP / Chromium under Apache License 2.0 / BSD-3-Clause. Standard shared libraries required by the x86_64 binary.

---

## License Notice

All upstream components remain the intellectual property of their respective copyright holders (Google LLC, The Chromium Authors, Android Open Source Project contributors) and are redistributed under the terms of the Apache License 2.0 and BSD-3-Clause.

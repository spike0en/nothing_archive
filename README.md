<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/spike0en/nothing_archive/main/website/static/img/brand/logo-dark.gif">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/spike0en/nothing_archive/main/website/static/img/brand/logo-light.gif">
  <img alt="Nothing Archive" src="https://raw.githubusercontent.com/spike0en/nothing_archive/main/website/static/img/brand/logo-dark.gif" width="100">
</picture>

# Nothing Archive

The largest open-source, community-driven index and archive for the Nothing and CMF ecosystem, featuring Nothing OS firmware, OTA updates, community-built apps and projects, hardware customization tools, official developer resources, and detailed guides.

<p align="center">
  <a href="https://nothingarchive.tech/"><b>Explore Hub 🌐</b></a> &nbsp;&middot;&nbsp;
  <a href="https://nothingarchive.tech/docs/firmware"><b>Firmware Archive 📥</b></a> &nbsp;&middot;&nbsp;
  <a href="https://nothingarchive.tech/docs/guides"><b>Guides 📖</b></a> &nbsp;&middot;&nbsp;
  <a href="https://t.me/s/NothingTechCommunity"><b>Community 💬</b></a>
</p>

[![Hits](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive&label=Hits&icon=github&color=%23b02a37&labelColor=2E2E3F&message=&style=for-the-badge)](https://github.com/spike0en/nothing_archive) &nbsp; [![Total Downloads](https://img.shields.io/github/downloads/spike0en/nothing_archive/total?style=for-the-badge&logo=github&logoColor=white)](https://github.com/spike0en/nothing_archive/releases) &nbsp; [![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0%20%2F%20MIT-007ec6?style=for-the-badge&logo=github&logoColor=white)](https://github.com/spike0en/nothing_archive/blob/main/LICENSE)

<br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/spike0en/nothing_archive/main/website/static/img/brand/social-banner.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/spike0en/nothing_archive/main/website/static/img/brand/social-banner.png">
  <img alt="Nothing Archive Banner" src="https://raw.githubusercontent.com/spike0en/nothing_archive/main/website/static/img/brand/social-banner.png" width="100%">
</picture>

<br>

</div>

## Core Pillars & Navigation

Nothing Archive is a centralized, community-led index. Use the interactive directory below to browse our documentation sections on the live site or access their source markdown files in the workspace.

### [Devices Catalog](https://nothingarchive.tech/docs/devices)
*Workspace Source: [`devices.md`](website/docs/devices.md)*

A detailed catalog of Nothing and CMF products, detailing hardware specifications, codename mappings, and release dates.

### [Firmware & Delta OTAs](https://nothingarchive.tech/docs/firmware)
*Workspace Source: [`firmware.md`](website/docs/firmware.md)*

Direct download links for sideloading incremental and full OTA updates sourced from official OEM servers, bypassing staggered regional rollouts.

### [Stock Factory Images](https://nothingarchive.tech/docs/firmware)
*Workspace Source: [`firmware.md`](website/docs/firmware.md)*

Unmodified stock OTA partition images archived for supported phone models, obtained by extracting and reconstructing base and incremental OTA updates through an automated pipeline.

### [Nothing OS Changelogs](https://nothingarchive.tech/docs/changelogs)
*Workspace Source: [`changelogs/`](website/docs/changelogs)*

A complete chronological database of official release notes, system changes, bug fixes, and security patches for every Nothing and CMF phone model.

### [Technical Guides](https://nothingarchive.tech/docs/guides)
*Workspace Source: [`guides.md`](website/docs/guides.md)*

Detailed step-by-step guides covering critical technical operations, including bootloader unlocking, custom ROM installation, partition backups, rooting, and device recovery.

### [Official OEM Resources](https://nothingarchive.tech/docs/official)
*Workspace Source: [`official.md`](website/docs/official.md)*

A curated collection of official Nothing apps, wallpapers, system fonts, kernel sources, 3D product models, and user manuals.

### [Community Apps & Projects](https://nothingarchive.tech/docs/apps)
*Workspace Sources: [`apps.md`](website/docs/apps.md) &nbsp;&middot;&nbsp; [`projects.md`](website/docs/projects.md)*

A directory of community-developed applications, Glyph LED integrations, custom widgets, utilities, flashing toolkits, and wearable scripts.

### [Camera Configs & Mods](https://nothingarchive.tech/docs/photography)
*Workspace Source: [`photography.md`](website/docs/photography.md)*

Stable Google Camera (GCam) ports, custom community-made XML configurations, stock presets, and custom LUTs optimized for Nothing's camera hardware.

## Contribution Guidelines

We welcome community pull requests to expand the archive. To ensure data integrity, several files are restricted to automated updates:

| Category | Contribution Scope | Files & Path |
| :--- | :--- | :--- |
| **Device Catalog** | **Open** | [`devices.md`](website/docs/devices.md) |
| **Community Initiatives Indexing** | **Open** | [`apps.md`](website/docs/apps.md), [`projects.md`](website/docs/projects.md) |
| **Official Resources** | **Open** | [`official.md`](website/docs/official.md) |
| **Guides** | **Open** | [`guides.md`](website/docs/guides.md), [`photography.md`](website/docs/photography.md) |
| **Firmware & Changelogs** | **Restricted** *(Automated)* | [`firmware.md`](website/docs/firmware.md), [`changelogs/`](website/docs/changelogs/) |

Before creating a Pull Request, please read our [Contributing Guidelines](CONTRIBUTING.md) to ensure compliance with sorting rules, casing conventions, and spacing standards.

## Licensing & Attribution

Nothing Archive employs a multi-license structure to protect the original work of contributors, respect third-party intellectual property, and prevent legal liabilities.

### Intellectual Property Boundaries

*   **The project effort and database compilation** are licensed under [CC BY-NC 4.0](LICENSE) (Creative Commons Attribution-NonCommercial 4.0 International). While the underlying links are publicly available, the curated compilation database, structured tables, device codename mappings, extraction indices, and custom flashing and recovery guides represent original research, maintenance, and self-hosted pipeline development.
*   **OEM firmware and official resources** remain the exclusive proprietary intellectual property of Nothing Technology Limited (or their partners). All indexed firmware payloads, OTA update links (distributed by GMS/Google servers), official system APKs, system fonts, device wallpapers, 3D models, and user manuals are mirrored and indexed solely for non-commercial community recovery and archival purposes under Fair Use.
*   **Community projects and third-party apps** belong to their respective developers under their own licensing terms. We index these links solely to bring the developer community together in one accessible hub.
*   **The pipeline logic and website source code** (under `/scripts` and `/website`, excluding documentation content) are licensed under the [MIT License](LICENSE-MIT).
*   **Project branding and visual identity** assets under `website/static/img/` (including original logos, banners, and graphics) are strictly proprietary and not licensed for reuse or redistribution.
*   **Project typography and font assets** under `website/static/fonts/` are subject to their respective open-source licenses and brand foundry attributions. See [website/static/fonts/README.md](website/static/fonts/README.md) for full licensing details.

> [!IMPORTANT]
> **Attribution Mandate**: Anyone replicating, scraping, hosting mirrors of, or adapting any custom guides or compiled database tables from this repository **MUST** provide prominent, visible credit to **Nothing Archive** and link back to this source repository:
> `https://github.com/spike0en/nothing_archive`

## Credits & Acknowledgements

Special thanks to:
*   **[luk1337](https://github.com/luk1337/oplus_archive)** for the AOSP OTA extraction tool.
*   **[arter97](https://github.com/arter97/nothing_archive)** for adapting the archive for Phone (2).
*   **[Shiki](https://github.com/guptavishalxm1)** for crafting the initial website for the repo and providing a self-hosted runner instance.
*   **[Earendel Labs](https://github.com/Earendel-lab)** and **[Burak Dede](https://github.com/burakdede0)** for their suggestions, feedback, and QA testing that helped identify bugs and drive several improvements to the webpage over time.
*   **[XelXen](https://github.com/XelXen)** for helping with initial [project branding and design](https://github.com/spike0en/nothing_archive/tree/main/website/static/img).
*   **[LukeSkyD](https://xdaforums.com/t/nothing-phone-1-repo-nos-ota-img-guide-root.4464039/)** for early build references.
*   All project contributors listed in the [Contributors Chart](https://github.com/spike0en/nothing_archive/graphs/contributors).

## Support the Project

If you would like to support the project financially to help cover server hosting and pipeline maintenance costs, please consider donating. 

You can view our supported payment methods (including **UPI**, **Ko-fi**, **PayPal**, **Boosty**, and **Cryptocurrencies**) through our:
*   **[Nothing Archive Support Panel (Web UI) 🌐](https://nothingarchive.tech/#support)**
*   **GitHub Sponsor button** at the top right of this repository.

If this project helps you, please consider **starring the repository** at the top right of this page (requires a GitHub account). It helps with discoverability and encourages maintenance.

Thank you for your support!

<div align="center">
  <a href="https://www.star-history.com/?repos=spike0en%2Fnothing_archive&type=date&legend=top-left">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=spike0en/nothing_archive&type=date&theme=dark&legend=top-left&sealed_token=bf9fX18UNYOCcb9nUIV6JpuBewyDqIOSoMGafpatPjjhDGvaBvxq71ZG5L89NAZw4sktBe4IIy6UEMfjJ1qT3KIc0spgiJXvjZAhYRrmagsePEMVzj3IF2v8wLNib5R0W-OeVPKtZuJSNYCbN6E2OOx3hCbBGzviQ3PW8A3iv2dRU-US6GTzSkhMTQbY" />
      <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=spike0en/nothing_archive&type=date&legend=top-left&sealed_token=bf9fX18UNYOCcb9nUIV6JpuBewyDqIOSoMGafpatPjjhDGvaBvxq71ZG5L89NAZw4sktBe4IIy6UEMfjJ1qT3KIc0spgiJXvjZAhYRrmagsePEMVzj3IF2v8wLNib5R0W-OeVPKtZuJSNYCbN6E2OOx3hCbBGzviQ3PW8A3iv2dRU-US6GTzSkhMTQbY" />
      <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=spike0en/nothing_archive&type=date&legend=top-left&sealed_token=bf9fX18UNYOCcb9nUIV6JpuBewyDqIOSoMGafpatPjjhDGvaBvxq71ZG5L89NAZw4sktBe4IIy6UEMfjJ1qT3KIc0spgiJXvjZAhYRrmagsePEMVzj3IF2v8wLNib5R0W-OeVPKtZuJSNYCbN6E2OOx3hCbBGzviQ3PW8A3iv2dRU-US6GTzSkhMTQbY" />
    </picture>
  </a>
</div>

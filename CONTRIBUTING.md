# Contributing to Nothing Archive

First off, thank you for considering contributing to the Nothing Archive project!

## Ways to Contribute

We welcome community participation in three primary areas:

### 1. Documentation Maintenance & Growth
This involves the continuous upkeep and expansion of the main English documentation. Contributions include:
- Adding new entries to `apps.md`, `projects.md`, and `official.md`.
- Updating information in `devices.md`, `photography.md`, and `guides.md`.
- Fixing typos, updating broken links, and improving readability.

### 2. Localization & Global Outreach
Help us reach more users by adding and maintaining translations across the site. This is a long-term commitment that involves:
- Implementing new languages within the `website/i18n/` directory.
- Ensuring translated documentation remains synchronized with the base English version over time.

### 3. Technical Development & Enhancements
Contribute to the website's infrastructure by resolving bugs or adding features. Technical contributions should:
- Respect existing coding conventions to ensure future scalability and ease of maintenance.
- Prioritize stable, premium user experiences while minimizing unnecessary divergence from the core source.

---

## Restricted Files & Directories

To ensure accuracy and preserve integrity, **do not** submit pull requests that modify the following files or directories:
- `website/docs/firmware.md`
- `website/docs/changelogs/`

These are maintained only by the project authors and collaborators.

---

## Documentation Guidelines

In order to ensure perfect alphabetical sorting across all languages, please follow these strict naming and sorting rules when adding new entries to `apps.md` or `projects.md`:

### 1. Naming Convention (Spaces & Title Case)
*   **Spaces for Readability:** Even if the Play Store or GitHub uses CamelCase, always add a space between words.
    *   ❌ `GlyphGlow` $\rightarrow$ ✅ **Glyph Glow**
    *   ❌ `NothingOS` $\rightarrow$ ✅ **Nothing OS**
    *   ❌ `BetterBattery` $\rightarrow$ ✅ **Better Battery**
*   **Title Case:** All entries must be properly capitalized. Avoid all-lowercase or repo-style names.
    *   ❌ `nothing-rice` $\rightarrow$ ✅ **Nothing Rice**
    *   ❌ `n-recipe` $\rightarrow$ ✅ **N Recipe**
*   **Consistency Across Locales:** The project name itself must stay in English in all localized versions (e.g., `apps.md` and `projects.md` in `i18n/zh-TW/docusaurus-plugin-content-docs/current/` should still list app/project names as **"Glyph Glow"** and so on).

### 2. Alphabetical Sorting
*   All entries within a table must be sorted **alphabetically by display name** (Column 1).
*   Sorting is case-insensitive.
*   Note: `No` comes before `Nothing`. (e.g., `No Volume` $\rightarrow$ `Nothing Audio`).

---

## Adding a New Language (Localization)
We love translations! However, adding a new language to Nothing Archive requires a **long-term commitment**. 

> [!IMPORTANT]
> **Ongoing Maintenance Required**
> Providing a new language is a high-impact contribution that requires consistent upkeep. You must be willing to track changes in the main English (`en`) branch and update your localized files to maintain parity over time. If you cannot commit to long-term monitoring and synchronization, please skip the localization and consider other forms of contribution instead.

### 1. Where do the files go?
Translations live in the `website/i18n/` folder. If you wanted to add French (`fr`), you would create this folder path:
`website/i18n/fr/docusaurus-plugin-content-docs/current/`

### 2. The "Golden Rule"
1.  **Copy & Paste:** Copy the English files from `website/docs/` into your new folder.
2.  **What to Translate:**
    *   ✅ **Translate** section headers (e.g., `## Customization`).
    *   ✅ **Translate** descriptions (the text in the last column of tables).
    *   ✅ **Translate** the description in the top section (Frontmatter).
3.  **The PARITY Rule (Critical):**
    *   ❌ **DO NOT** translate app or project names in the first column.
    *   They MUST stay in **English** and follow the **Title Case + Space** rule (e.g., `Glyph Glow`).
    *   This keeps the search and project branding consistent across the entire site.

### 3. Advanced Localization
For a complete, site-wide implementation of a new language, the following technical files and configurations must be addressed:

*   **`website/docusaurus.config.ts`**:
    *   Add the new locale code (e.g., `'fr'`) to `i18n.locales`.
    *   Add a corresponding label in `i18n.localeConfigs`.
    *   Update the `docusaurus-search-local` plugin's `language` array to include your language code for proper indexing.
*   **`website/i18n/[lang]/code.json`**: This is the primary file for localizing homepage features (prefixed with `feature.`) and hero/navigational components.
*   **`website/i18n/[lang]/docusaurus-theme-classic/`**:
    *   `navbar.json`: Localizes top navigation labels and logo alt text.
    *   `footer.json`: Localizes footer copyright and informational links.
*   **`website/i18n/[lang]/docusaurus-plugin-content-pages/`**:
    *   Place a localized copy of `src/pages/index.tsx` here to translate the landing page.
*   **`website/i18n/[lang]/docusaurus-plugin-content-docs/current/`**:
    *   Include `_category_.json` files from the English `docs/` folder to translate sidebar category titles (e.g., "Customization").

---

## How to Contribute

1. Fork the repository.
2. Go to Settings → Pages and ensure the Build and deployment source is set to GitHub Actions.
3. Make your changes in:
   - `website/docs/` (English content) or
   - `website/i18n/` (translations)
4. Commit your changes with a descriptive message.
5. Wait for GitHub Actions to build and deploy the site automatically.
6. After deployment, check the site for breakages and confirm your changes appear as expected.
7. If everything is correct, open a pull request and wait for review and merge.

Thank you for helping grow the Nothing Archive grow!

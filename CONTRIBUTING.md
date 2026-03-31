# Contributing to Nothing Archive

First off, thank you for considering contributing to the Nothing Archive project!

## Where to Contribute
We welcome community contributions specifically to the documentation located under `website/docs/`. This includes adding new community apps, guides, projects, or fixing typos.

### Important Exception
Please **DO NOT** submit pull requests modifying `website/docs/firmware.md`. 
The firmware documentation is strictly maintained by the original project author and co-maintainers to ensure the security, integrity, and accuracy of the device update links.

## Documentation Guidelines

To maintain a premium look and ensure perfect alphabetical sorting across all languages, please follow these strict naming and sorting rules when adding new entries to `apps.md` or `projects.md`:

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

## How to Contribute
1. Fork the repository.
3. Make your changes inside the `website/docs/` markdown files.
4. Commit your changes with a descriptive message.
5. Push your branch and open a Pull Request.

Thank you for helping grow the Nothing & CMF archive!

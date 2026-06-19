# Contributing to Nothing Archive

First off, thank you for considering contributing to the Nothing Archive project!

## Ways to Contribute

We welcome community participation in two primary areas:

### 1. Documentation Maintenance & Growth
This involves the continuous upkeep and expansion of the main English documentation. Contributions include:
- Adding new entries to `apps.md`, `projects.md`, and `official.md`.
- Updating information in `devices.md`, `photography.md`, and `guides.md`.
- Fixing typos, updating broken links, and improving readability.

### 2. Technical Development & Enhancements
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

In order to ensure perfect alphabetical sorting, please follow these strict naming and sorting rules when adding new entries to `apps.md` or `projects.md`:

### 1. Naming Convention (Spaces & Title Case)
*   **Spaces for Readability:** Even if the Play Store or GitHub uses CamelCase, always add a space between words.
    *   ❌ `GlyphGlow` $\rightarrow$ ✅ **Glyph Glow**
    *   ❌ `NothingOS` $\rightarrow$ ✅ **Nothing OS**
    *   ❌ `BetterBattery` $\rightarrow$ ✅ **Better Battery**
*   **Title Case:** All entries must be properly capitalized. Avoid all-lowercase or repo-style names.
    *   ❌ `nothing-rice` $\rightarrow$ ✅ **Nothing Rice**
    *   ❌ `n-recipe` $\rightarrow$ ✅ **N Recipe**

### 2. Alphabetical Sorting
*   All entries within a table must be sorted **alphabetically by display name** (Column 1).
*   Sorting is case-insensitive.
*   Note: `No` comes before `Nothing`. (e.g., `No Volume` $\rightarrow$ `Nothing Audio`).

---

## How to Contribute

1. Fork the repository.
2. Go to Settings → Pages and ensure the Build and deployment source is set to GitHub Actions.
3. Make your changes in `website/docs/` (English content).
4. Commit your changes with a descriptive message.
5. Wait for GitHub Actions to build and deploy the site automatically.
6. After deployment, check the site for breakages and confirm your changes appear as expected.
7. If everything is correct, open a pull request and wait for review and merge.

Thank you for helping grow the Nothing Archive!

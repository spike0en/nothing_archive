---
sidebar_position: 2
title: Contributing
description: Guidelines and instructions to contribute to the Nothing Archive project.
---

# Contributing

First off, thank you for considering contributing to the Nothing Archive! Community contributions help keep this resource complete, accurate, and up-to-date for everyone.

## Ways to Contribute

We welcome community participation in two primary areas:

### 1. Documentation Maintenance & Growth
This involves the continuous upkeep and expansion of the main English documentation. Contributions include:
*   Adding new entries to [apps.md](apps.md), [projects.md](projects.md), and [official.md](official.md).
*   Updating information in [devices.md](devices.md), [photography.md](photography.md), and [guides.md](guides.md).
*   Fixing typos, updating broken links, and improving readability.

### 2. Technical Development & Enhancements
Contribute to the website's infrastructure by resolving bugs or adding features. Technical contributions should:
*   Respect existing coding conventions to ensure future scalability and ease of maintenance.
*   Prioritize stability and clean user interfaces while minimizing unnecessary divergence from the core source.

## Restricted Files & Directories

:::danger[Restricted Content]
To ensure accuracy and preserve archive integrity, **do not** submit pull requests that modify the following files or directories:
*   `website/docs/firmware.md`
*   `website/docs/changelogs/`

These files and folders are managed exclusively by the project authors and collaborators.
:::

## Documentation Guidelines

In order to ensure perfect alphabetical sorting, please follow these strict naming and sorting rules when adding new entries to [apps.md](apps.md) or [projects.md](projects.md):

### 1. Naming Conventions

*   Add spaces between words for readability: even if the source repository or app store listing uses CamelCase, split them with spaces. For example, use **Glyph Glow** instead of `GlyphGlow`, **Nothing OS** instead of `NothingOS`, and **Better Battery** instead of `BetterBattery`.
*   Use title case: capitalize all entries properly. Avoid all-lowercase or repo-style names. For example, use **Nothing Rice** instead of `nothing-rice`, and **N Recipe** instead of `n-recipe`.
*   Preserve acronyms & abbreviations: keep 2–4 letter technical acronyms, protocol abbreviations, and product codes in ALL CAPS. For example, use **FMC** instead of `Fmc`, **SDDM** instead of `Sddm`, and **KWGT** instead of `Kwgt`.

### 2. Alphabetical Sorting
*   All entries within a table must be sorted **alphabetically by display name** (Column 1).
*   Sorting is case-insensitive.
*   *Note:* `No` comes before `Nothing` (e.g., `No Volume` → `Nothing Audio`).

## How to Submit Changes

1.  **Fork the repository** on [GitHub](https://github.com/spike0en/nothing_archive).
2.  Go to **Settings → Pages** in your fork and ensure the **Build and deployment source** is set to **GitHub Actions**.
3.  Make your changes in `website/docs/` (English content).
4.  **Commit your changes** with a descriptive message.
5.  Wait for GitHub Actions to build and deploy your fork's preview site automatically.
6.  Check the deployed site on your fork for breakages and confirm your changes appear as expected.
7.  If everything is correct, **open a Pull Request (PR)** to the main repository and wait for review and merge.

Thank you for helping grow the Nothing Archive!

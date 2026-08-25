/**
 * @file showcase-data.ts
 * @description Static data loader and types for the Community Showcase catalog.
 * Exposes parsed entries, dynamic markdown-extracted subcategories, and filtering utilities.
 * 
 * Layer: Static data repository.
 * Boundary: Consumes generated showcase-items.json payload and provides typed data access.
 */

import rawPayload from './showcase-items.json';

export type SourceFilter = 'all' | 'apps' | 'projects';

export type PricingFilter = 'all' | 'free' | 'paid';

export type PlatformFilter = 'all' | 'android' | 'ios' | 'windows' | 'linux' | 'macos' | 'web';

export type SortMode = 'featured' | 'random' | 'az' | 'za' | 'category';

export interface ShowcaseItem {
  id: string;
  slug: string;
  title: string;
  developer: string;
  developerUrl?: string;
  developerProjectsCount?: number;
  description: string;
  source: 'apps' | 'projects';
  category: string;
  categoryKey: string;
  categoryKeys?: string[];
  subCategory: string;
  subCategoryKey: string;
  subCategoryKeys?: string[];
  hasDistinctSubCategory?: boolean;
  subSubCategory?: string;
  subSubCategoryKey?: string;
  categoryHierarchy?: string[];
  iconUrl?: string;
  platformOS?: string[];
  platform: 'playStore' | 'github' | 'web' | 'other';
  links: {
    playStore?: string;
    appStore?: string;
    github?: string;
    website?: string;
    docs?: string;
  };
  featured?: boolean;
  isPaid?: boolean;
  price?: string;
}

export interface SubCategoryOption {
  id: string;
  label: string;
  count: number;
  categoryKey: string;
}

export interface CategoryOption {
  id: string;
  label: string;
  count: number;
  subCategories: SubCategoryOption[];
}


export const SOURCE_TABS: { id: SourceFilter; label: string; shortLabel: string }[] = [
  { id: 'all', label: 'All Catalog', shortLabel: 'All' },
  { id: 'apps', label: 'Apps', shortLabel: 'Apps' },
  { id: 'projects', label: 'Projects', shortLabel: 'Projects' },
];

export const PLATFORM_FILTERS: { id: PlatformFilter; label: string }[] = [
  { id: 'android', label: 'Android' },
  { id: 'ios', label: 'iOS' },
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux' },
  { id: 'macos', label: 'macOS' },
  { id: 'web', label: 'Web' },
];

// SAFETY: rawPayload schema is generated and validated at prebuild by scripts/parse-showcase.js.
const rawItems = ('items' in rawPayload && Array.isArray(rawPayload.items) ? rawPayload.items : []) as ShowcaseItem[];
export const ALL_SHOWCASE_ITEMS: ShowcaseItem[] = rawItems;

/** Precomputed count of items marked with featured: true in the static payload. */
export const FEATURED_COUNT = ALL_SHOWCASE_ITEMS.filter((i) => i.featured).length;

// SAFETY: categories mapping is generated and validated at prebuild by scripts/parse-showcase.js.
const rawCategories = (
  'categories' in rawPayload && rawPayload.categories
    ? rawPayload.categories
    : { all: [], apps: [], projects: [] }
) as Record<SourceFilter, CategoryOption[]>;
export const CATEGORIES_BY_SOURCE: Record<SourceFilter, CategoryOption[]> = rawCategories;

/**
 * Performs an in-place-style Fisher-Yates array shuffle returning a newly copied array.
 * When a seed integer is provided, produces deterministic pseudorandom permutations.
 *
 * @template T - The element type of the target array.
 * @param {T[]} array - The source array to shuffle.
 * @param {number} [seed] - Optional seed value for repeatable pseudo-random permutations.
 * @returns {T[]} A new array instance containing shuffled elements.
 */
export function shuffleItems<T>(array: T[], seed?: number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = seed !== undefined
      ? Math.floor((Math.sin(seed + i) * 10000) % 1 * (i + 1) + (i + 1)) % (i + 1)
      : Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Splits a composite developer string (e.g. "Dev1, Dev2", "A and B")
 * into a distinct list of individual developer names.
 *
 * @param {string} [devString] - Raw developer string from entry metadata.
 * @returns {string[]} Array of individual cleaned developer names.
 */
export function parseDevelopers(devString?: string): string[] {
  if (!devString) return [];
  return devString
    .split(/\s*&\s*|\s*,\s*|\s+and\s+|\s*\/\s*/i)
    .map((d) => d.trim())
    .filter(Boolean);
}

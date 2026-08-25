/**
 * @file showcase.tsx
 * @description Catalog route for the Nothing Archive Community Showcase.
 * Orchestrates full-text search, multi-source taxonomy filtering, active facet chips,
 * and responsive showcase cards grid. Synchronizes state with URL search params
 * to support browser history and back/forward navigation.
 * 
 * Layer: Top-level page route (/showcase).
 * Boundary: Orchestrates search, multi-source taxonomy filtering, sort modes, and renders showcase cards.
 */

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import {
  FaMagnifyingGlass,
  FaArrowRight,
  FaShuffle,
  FaXmark,
  FaChevronDown,
  FaRotateLeft,
  FaSliders,
  FaArrowDownAZ,
  FaArrowDownZA,
  FaFolder,
  FaCrown,
} from 'react-icons/fa6';
import clsx from 'clsx';
import ShowcaseCard from '../components/ShowcaseCard';
import ShowcaseSidebar from '../components/ShowcaseSidebar';
import ShowcaseFilterDrawer from '../components/ShowcaseFilterDrawer';
import {
  ALL_SHOWCASE_ITEMS,
  FEATURED_COUNT,
  CATEGORIES_BY_SOURCE,
  PLATFORM_FILTERS,
  shuffleItems,
  parseDevelopers,
  type SourceFilter,
  type PlatformFilter,
  type PricingFilter,
  type SortMode,
  type ShowcaseItem,
  type SubCategoryOption,
} from '../data/showcase-data';
import styles from './showcase.module.css';

// Batch pagination size cleanly divisible by 1, 2, 3, and 4 column grid layouts
const PAGE_SIZE = 24;

interface SortOption {
  id: SortMode;
  label: string;
  icon: React.ReactElement;
}

const SORT_OPTIONS: SortOption[] = [
  { id: 'random', label: 'Random', icon: <FaShuffle size={12} /> },
  { id: 'az', label: 'Title (A → Z)', icon: <FaArrowDownAZ size={12} /> },
  { id: 'za', label: 'Title (Z → A)', icon: <FaArrowDownZA size={12} /> },
  { id: 'category', label: 'Category', icon: <FaFolder size={12} /> },
];

interface ShowcaseUrlState {
  onlyFeatured: boolean;
  source: SourceFilter;
  pricing: PricingFilter;
  category: string;
  subCategory: string;
  platform: PlatformFilter;
  developer: string | null;
  search: string;
  sort: SortMode;
}

/**
 * Validates whether a raw string represents a supported platform filter identifier.
 *
 * @param {string | null} value - Raw query string parameter.
 * @returns {value is PlatformFilter} True if valid platform filter.
 */
function isPlatformFilter(value: string | null): value is PlatformFilter {
  return (
    value === 'all' ||
    value === 'android' ||
    value === 'ios' ||
    value === 'windows' ||
    value === 'linux' ||
    value === 'macos' ||
    value === 'web'
  );
}

/**
 * Validates whether a raw string represents a supported catalog sort mode.
 *
 * @param {string | null} value - Raw query string parameter.
 * @returns {value is SortMode} True if valid sort mode.
 */
function isSortMode(value: string | null): value is SortMode {
  return (
    value === 'random' ||
    value === 'featured' ||
    value === 'az' ||
    value === 'za' ||
    value === 'category'
  );
}

/**
 * Extracts validated filter state from URL query parameters.
 *
 * @param {string} searchStr - Query string from location.search.
 * @returns {ShowcaseUrlState} Parsed filter state.
 */
function parseUrlState(searchStr: string): ShowcaseUrlState {
  const params = new URLSearchParams(searchStr);
  const onlyFeatured = params.get('featured') === 'true';

  const rawSource = params.get('source') || params.get('type');
  const source: SourceFilter = rawSource === 'apps' || rawSource === 'projects' ? rawSource : 'all';

  const rawPricing = params.get('pricing');
  const pricing: PricingFilter = rawPricing === 'paid' ? 'paid' : (rawPricing === 'free' ? 'free' : 'all');

  const category = params.get('category') || 'all';
  const subCategory = params.get('subcategory') || params.get('sub') || 'all';

  const rawPlatform = params.get('platform');
  const platform: PlatformFilter = isPlatformFilter(rawPlatform) ? rawPlatform : 'all';

  const developer = params.get('dev') || params.get('developer') || null;
  const search = params.get('q') || params.get('search') || '';

  const rawSort = params.get('sort');
  const sort: SortMode = isSortMode(rawSort) ? rawSort : 'random';

  return {
    onlyFeatured,
    source,
    pricing,
    category,
    subCategory,
    platform,
    developer,
    search,
    sort,
  };
}

/**
 * Constructs URL search parameter string from filter state.
 *
 * @param {ShowcaseUrlState} state - Active filter state.
 * @returns {string} URL query string with leading question mark or empty string.
 */
function buildUrlSearch(state: ShowcaseUrlState): string {
  const params = new URLSearchParams();
  if (state.onlyFeatured) params.set('featured', 'true');
  if (state.source !== 'all') params.set('source', state.source);
  if (state.source === 'apps' && state.pricing !== 'all') params.set('pricing', state.pricing);
  if (state.category !== 'all') params.set('category', state.category);
  if (state.subCategory !== 'all') params.set('subcategory', state.subCategory);
  if (state.platform !== 'all') params.set('platform', state.platform);
  if (state.developer) params.set('dev', state.developer);
  if (state.search.trim()) params.set('q', state.search.trim());
  if (state.sort !== 'random') params.set('sort', state.sort);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

/**
 * Dropdown selector for catalog sorting order with outside-click dismissal.
 *
 * @param {object} props - Component properties.
 * @param {SortMode} props.value - Currently active sort mode.
 * @param {SortOption[]} props.options - Available sorting options.
 * @param {(mode: SortMode) => void} props.onChange - Selection change callback.
 * @returns {React.JSX.Element} Rendered dropdown trigger and popup menu.
 */
function CustomSortDropdown({
  value,
  options,
  onChange,
}: {
  value: SortMode;
  options: SortOption[];
  onChange: (mode: SortMode) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && e.target instanceof Node && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((o) => o.id === value) || options[0];

  return (
    <div className={styles.customSortDropdown} ref={dropdownRef}>
      <button
        type="button"
        className={clsx(styles.sortTriggerBtn, isOpen && styles.sortTriggerBtnActive)}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select sort order"
      >
        <span className={styles.sortTriggerIcon}>{selectedOption?.icon}</span>
        <span className={styles.sortTriggerLabel}>{selectedOption?.label}</span>
        <FaChevronDown
          size={10}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s ease',
          }}
        />
      </button>

      {isOpen && (
        <div className={styles.sortMenuPanel} role="listbox">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="option"
              aria-selected={opt.id === value}
              className={clsx(
                styles.sortMenuItem,
                opt.id === value && styles.sortMenuItemActive
              )}
              onClick={() => {
                onChange(opt.id);
                setIsOpen(false);
              }}
            >
              <span className={styles.sortMenuIcon}>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const SESSION_SEED_KEY = 'nothing_showcase_seed';

/**
 * Retrieves an existing deterministic shuffle seed from URL parameters or session storage,
 * generating and persisting a new pseudo-random seed if none exists for the active session.
 *
 * @param {string} [searchStr] - Optional raw URL query string (e.g. location.search).
 * @returns {number} Deterministic integer seed for Fisher-Yates array shuffling.
 */
function getOrInitSeed(searchStr?: string): number {
  if (!ExecutionEnvironment.canUseDOM) return 42;
  try {
    if (searchStr) {
      const params = new URLSearchParams(searchStr);
      const urlSeed = params.get('seed');
      if (urlSeed && !isNaN(Number(urlSeed))) {
        const parsed = parseInt(urlSeed, 10);
        if (parsed > 0) {
          window.sessionStorage.setItem(SESSION_SEED_KEY, String(parsed));
          return parsed;
        }
      }
    }
    const saved = window.sessionStorage.getItem(SESSION_SEED_KEY);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
    const newSeed = Math.floor(Math.random() * 100000) + 1;
    window.sessionStorage.setItem(SESSION_SEED_KEY, String(newSeed));
    return newSeed;
  } catch {
    return 42;
  }
}

/**
 * Generates a fresh pseudorandom integer seed, persists it to session storage,
 * and returns it to trigger an on-demand catalog reshuffle.
 *
 * @returns {number} Newly generated random seed.
 */
function generateAndSaveNewSeed(): number {
  const newSeed = Math.floor(Math.random() * 100000) + 1;
  if (ExecutionEnvironment.canUseDOM) {
    try {
      window.sessionStorage.setItem(SESSION_SEED_KEY, String(newSeed));
    } catch {}
  }
  return newSeed;
}

/**
 * Main Community Showcase page rendering searchable, filterable catalog of community creations.
 *
 * @returns {React.JSX.Element} Showcase page layout.
 */
export default function ShowcasePage(): React.JSX.Element {
  const history = useHistory();
  const location = useLocation();

  const initialUrlState = useMemo(() => parseUrlState(location.search), []);

  const [onlyFeatured, setOnlyFeaturedState] = useState<boolean>(initialUrlState.onlyFeatured);
  const [source, setSourceState] = useState<SourceFilter>(initialUrlState.source);
  const [pricing, setPricingState] = useState<PricingFilter>(initialUrlState.pricing);
  const [selectedCategory, setSelectedCategoryState] = useState<string>(initialUrlState.category);
  const [selectedSubCategory, setSelectedSubCategoryState] = useState<string>(initialUrlState.subCategory);
  const [selectedPlatform, setSelectedPlatformState] = useState<PlatformFilter>(initialUrlState.platform);
  const [selectedDeveloper, setSelectedDeveloperState] = useState<string | null>(initialUrlState.developer);
  const [searchQuery, setSearchQueryState] = useState<string>(initialUrlState.search);
  const [sortMode, setSortModeState] = useState<SortMode>(initialUrlState.sort);

  const [shuffleSeed, setShuffleSeed] = useState<number>(() => {
    if (ExecutionEnvironment.canUseDOM) {
      return getOrInitSeed(location.search);
    }
    return 42;
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Synchronize state when browser navigation events (Back/Forward) update location.search
  useEffect(() => {
    const parsed = parseUrlState(location.search);
    setOnlyFeaturedState(parsed.onlyFeatured);
    setSourceState(parsed.source);
    setPricingState(parsed.pricing);
    setSelectedCategoryState(parsed.category);
    setSelectedSubCategoryState(parsed.subCategory);
    setSelectedPlatformState(parsed.platform);
    setSelectedDeveloperState(parsed.developer);
    setSortModeState(parsed.sort);

    const params = new URLSearchParams(location.search);
    const urlSeed = params.get('seed');
    if (urlSeed && !isNaN(Number(urlSeed))) {
      const parsedSeed = parseInt(urlSeed, 10);
      if (parsedSeed > 0) {
        setShuffleSeed(parsedSeed);
        try {
          window.sessionStorage.setItem(SESSION_SEED_KEY, String(parsedSeed));
        } catch {}
      }
    }

    // Prevent overwriting local search input state during active typing or trailing whitespace
    setSearchQueryState((prev) => {
      if (prev.trim() === parsed.search.trim()) {
        return prev;
      }
      return parsed.search;
    });
  }, [location.search]);

  // Commits filter changes to state and updates browser history stack
  const applyState = useCallback(
    (
      updater: (prev: ShowcaseUrlState) => ShowcaseUrlState,
      options?: { replace?: boolean }
    ) => {
      const current: ShowcaseUrlState = {
        onlyFeatured,
        source,
        pricing,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        platform: selectedPlatform,
        developer: selectedDeveloper,
        search: searchQuery,
        sort: sortMode,
      };
      const next = updater(current);

      setOnlyFeaturedState(next.onlyFeatured);
      setSourceState(next.source);
      setPricingState(next.pricing);
      setSelectedCategoryState(next.category);
      setSelectedSubCategoryState(next.subCategory);
      setSelectedPlatformState(next.platform);
      setSelectedDeveloperState(next.developer);
      setSearchQueryState(next.search);
      setSortModeState(next.sort);

      const targetSearch = buildUrlSearch(next);
      if (targetSearch !== location.search) {
        if (options?.replace) {
          history.replace({ pathname: location.pathname, search: targetSearch });
        } else {
          history.push({ pathname: location.pathname, search: targetSearch });
        }
      }
    },
    [
      history,
      location.pathname,
      location.search,
      onlyFeatured,
      source,
      pricing,
      selectedCategory,
      selectedSubCategory,
      selectedPlatform,
      selectedDeveloper,
      searchQuery,
      sortMode,
    ]
  );

  // Compute item counts for each catalog source partition
  const sourceCounts = useMemo(() => {
    const appsCount = ALL_SHOWCASE_ITEMS.filter((i) => i.source === 'apps').length;
    const projectsCount = ALL_SHOWCASE_ITEMS.filter((i) => i.source === 'projects').length;
    return {
      all: ALL_SHOWCASE_ITEMS.length,
      apps: appsCount,
      projects: projectsCount,
    };
  }, []);

  // Global keyboard shortcut: pressing '/' focuses the search field
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        const tagName = document.activeElement?.tagName?.toLowerCase();
        if (tagName !== 'input' && tagName !== 'textarea') {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Restore or initialize deterministic session seed on client mount
  useEffect(() => {
    const seed = getOrInitSeed(location.search);
    setShuffleSeed(seed);
  }, []);

  // Available broad categories extracted from markdown docs for active source
  const availableCategories = useMemo(() => {
    return CATEGORIES_BY_SOURCE[source] || CATEGORIES_BY_SOURCE.all || [];
  }, [source]);

  // Active broad category data record
  const activeCategoryData = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return availableCategories.find((c) => c.id === selectedCategory) || null;
  }, [availableCategories, selectedCategory]);

  // Dynamic subcategories based on selectedCategory (Progressive Disclosure)
  const availableSubCategories = useMemo<SubCategoryOption[]>(() => {
    if (activeCategoryData) {
      return activeCategoryData.subCategories;
    }
    return [];
  }, [activeCategoryData]);

  // Debounced search query synchronization with URL query parameter
  useEffect(() => {
    const current = parseUrlState(location.search);
    if (current.search === searchQuery) return;

    const timer = setTimeout(() => {
      const nextState: ShowcaseUrlState = {
        onlyFeatured,
        source,
        pricing: pricing,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        platform: selectedPlatform,
        developer: selectedDeveloper,
        search: searchQuery,
        sort: sortMode,
      };
      const targetSearch = buildUrlSearch(nextState);
      if (targetSearch !== location.search) {
        history.replace({ pathname: location.pathname, search: targetSearch });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [
    searchQuery,
    onlyFeatured,
    source,
    pricing,
    selectedCategory,
    selectedSubCategory,
    selectedPlatform,
    selectedDeveloper,
    sortMode,
    history,
    location.pathname,
    location.search,
  ]);

  // Base list processed with sorting / randomization
  const sortedBaseItems = useMemo<ShowcaseItem[]>(() => {
    const list = [...ALL_SHOWCASE_ITEMS];

    if (sortMode === 'az') {
      return list.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
    }
    if (sortMode === 'za') {
      return list.sort((a, b) => b.title.localeCompare(a.title, undefined, { sensitivity: 'base' }));
    }
    if (sortMode === 'category') {
      return list.sort((a, b) =>
        a.category.localeCompare(b.category) ||
        (a.subCategory || '').localeCompare(b.subCategory || '') ||
        (a.featured === b.featured ? 0 : a.featured ? -1 : 1) ||
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      );
    }
    return shuffleItems(list, shuffleSeed);
  }, [sortMode, shuffleSeed]);

  // Dynamically compute platform filters that exist for the selected source catalog
  const availablePlatforms = useMemo(() => {
    let filters = PLATFORM_FILTERS;

    if (source === 'apps') {
      filters = filters.filter((p) => p.id === 'android' || p.id === 'ios');
    } else if (source === 'projects') {
      filters = filters.filter((p) => p.id !== 'android' && p.id !== 'ios');
    }

    return filters;
  }, [source]);

  const handleSelectDeveloper = (devName: string) => {
    applyState(() => ({
      onlyFeatured: false,
      source: 'all',
      pricing: 'all',
      category: 'all',
      subCategory: 'all',
      platform: 'all',
      developer: devName,
      search: '',
      sort: 'az',
    }));
  };

  const handleClearDeveloper = () => {
    applyState((prev) => ({
      ...prev,
      developer: null,
    }));
  };

  const handleResetFilters = useCallback(() => {
    applyState(() => ({
      onlyFeatured: false,
      source: 'all',
      pricing: 'all',
      category: 'all',
      subCategory: 'all',
      platform: 'all',
      developer: null,
      search: '',
      sort: 'random',
    }));
    setShuffleSeed(generateAndSaveNewSeed());
  }, [applyState]);

  /**
   * Toggles the Editor's Choice filter mode on or off.
   */
  const handleToggleFeatured = () => {
    applyState((prev) => ({
      ...prev,
      onlyFeatured: !prev.onlyFeatured,
    }));
  };

  const handleSelectSource = (newSource: SourceFilter) => {
    applyState((prev) => ({
      ...prev,
      source: newSource,
      pricing: 'all',
      category: 'all',
      subCategory: 'all',
      platform: 'all',
    }));
  };

  const handleSelectCategory = (categoryId: string) => {
    applyState((prev) => ({
      ...prev,
      category: categoryId,
      subCategory: 'all',
    }));
  };

  const handleSelectSubCategory = (subCatId: string) => {
    applyState((prev) => ({
      ...prev,
      subCategory: subCatId,
    }));
  };

  // Compute live Free vs Paid counts strictly for the Apps catalog
  const pricingCounts = useMemo(() => {
    const apps = ALL_SHOWCASE_ITEMS.filter((item) => item.source === 'apps');
    let paid = 0;
    let free = 0;
    for (const app of apps) {
      if (app.isPaid) paid++;
      else free++;
    }
    return { all: apps.length, free, paid };
  }, []);

  const handleSelectPricing = (newPricing: PricingFilter) => {
    applyState((prev) => ({
      ...prev,
      pricing: newPricing,
    }));
  };

  const handleSelectPlatform = (platformId: PlatformFilter) => {
    applyState((prev) => ({
      ...prev,
      platform: platformId,
    }));
  };

  const handleSelectSortMode = (mode: SortMode) => {
    if (mode === 'random') {
      setShuffleSeed(generateAndSaveNewSeed());
    }
    applyState((prev) => ({
      ...prev,
      sort: mode,
    }));
  };

  // Multi-dimensional filtering logic with Editor's Choice naturally boosted to top
  const filteredItems = useMemo(() => {
    const matched = sortedBaseItems.filter((item) => {
      // Filter: Editor's Choice curated items isolation
      if (onlyFeatured && !item.featured) return false;

      // Filter: Source catalog (apps vs projects)
      if (source !== 'all' && item.source !== source) return false;

      // Filter: App Pricing (Free vs Paid, active strictly for apps source)
      if (source === 'apps' && pricing !== 'all') {
        if (pricing === 'paid' && !item.isPaid) return false;
        if (pricing === 'free' && item.isPaid) return false;
      }

      // Filter: Broad Category (H2)
      if (selectedCategory !== 'all' && !(item.categoryKeys || [item.categoryKey]).includes(selectedCategory)) return false;

      // Filter: Subcategory (H3)
      if (selectedSubCategory !== 'all' && !(item.subCategoryKeys || [item.subCategoryKey]).includes(selectedSubCategory)) return false;

      // Filter: Target OS Platform
      if (selectedPlatform !== 'all' && !(item.platformOS || []).includes(selectedPlatform)) return false;

      // Filter: Developer
      if (selectedDeveloper) {
        const target = selectedDeveloper.toLowerCase().trim();
        const rawMatch = item.developer.toLowerCase().trim() === target;
        const devMatch = parseDevelopers(item.developer).some((d) => d.toLowerCase().trim() === target);
        if (!rawMatch && !devMatch) return false;
      }

      // Filter: Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDev = item.developer.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.category?.toLowerCase().includes(query);
        const matchSubCat = item.subCategory?.toLowerCase().includes(query);

        if (!matchTitle && !matchDev && !matchDesc && !matchCat && !matchSubCat) {
          return false;
        }
      }

      return true;
    });

    const isFilterOrSearchActive =
      onlyFeatured ||
      source !== 'all' ||
      selectedCategory !== 'all' ||
      selectedSubCategory !== 'all' ||
      selectedPlatform !== 'all' ||
      Boolean(selectedDeveloper) ||
      searchQuery.trim().length > 0;

    // Boost Editor's Choice items to the top when filters or search are active
    if (isFilterOrSearchActive && sortMode !== 'category') {
      return [...matched].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }

    // Root view and category sort retain natural base order
    return matched;
  }, [
    sortedBaseItems,
    onlyFeatured,
    source,
    pricing,
    selectedCategory,
    selectedSubCategory,
    selectedPlatform,
    selectedDeveloper,
    searchQuery,
    sortMode,
  ]);

  // Reset visible page count when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [
    onlyFeatured,
    source,
    pricing,
    selectedCategory,
    selectedSubCategory,
    selectedPlatform,
    selectedDeveloper,
    searchQuery,
    sortMode,
  ]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  // Count active non-default filters to display badge on Filter button
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (onlyFeatured) count++;
    if (source !== 'all') count++;
    if (source === 'apps' && pricing !== 'all') count++;
    if (selectedCategory !== 'all') count++;
    if (selectedSubCategory !== 'all') count++;
    if (selectedPlatform !== 'all') count++;
    if (selectedDeveloper !== null) count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [
    onlyFeatured,
    source,
    pricing,
    selectedCategory,
    selectedSubCategory,
    selectedPlatform,
    selectedDeveloper,
    searchQuery,
  ]);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <Layout
      title="Community Showcase"
      description="Explore apps and projects built by the Nothing community."
    >
      <div className={styles.showcasePage}>
        <div className={styles.glyphGrid} aria-hidden="true" />

        <div className="container">
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <h1 className={styles.title}>Community Showcase</h1>
              <p className={styles.subtitle}>
                Explore apps and projects built by the Nothing community.
              </p>
            </div>
          </header>

          {/* Main Showcase Layout: Desktop Left Sidebar + Right Catalog Grid */}
          <div className={styles.showcaseLayout}>
            {/* Persistent Desktop Sidebar (>= 1024px) */}
            <ShowcaseSidebar
              source={source}
              onSelectSource={handleSelectSource}
              sourceCounts={sourceCounts}
              pricing={pricing}
              onSelectPricing={handleSelectPricing}
              pricingCounts={pricingCounts}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              availableCategories={availableCategories}
              selectedSubCategory={selectedSubCategory}
              onSelectSubCategory={handleSelectSubCategory}
              availableSubCategories={availableSubCategories}
              selectedPlatform={selectedPlatform}
              onSelectPlatform={handleSelectPlatform}
              availablePlatforms={availablePlatforms}
              onResetAll={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Main Content Area */}
            <main className={styles.mainContent}>
              {/* Command toolbar */}
              <div className={styles.toolbar}>
                {/* Integrated Search Input */}
                <div className={styles.searchSection}>
                  <FaMagnifyingGlass className={styles.searchIcon} size={14} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by name, dev, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQueryState(e.target.value)}
                    className={styles.searchInput}
                    aria-label="Search showcase creations"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQueryState('');
                        applyState((prev) => ({ ...prev, search: '' }), { replace: true });
                      }}
                      className={styles.clearSearchBtn}
                      title="Clear search"
                      aria-label="Clear search"
                    >
                      <FaXmark size={12} />
                    </button>
                  ) : (
                    <span className={styles.searchKeyHint}>/</span>
                  )}
                </div>

                {/* Actions: Filter Drawer Trigger (Mobile), Curated Quick Pill & Sort Dropdown */}
                <div className={styles.toolbarActions}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={onlyFeatured}
                    onClick={handleToggleFeatured}
                    className={clsx(
                      styles.featuredToggle,
                      onlyFeatured && styles.featuredToggleActive
                    )}
                    title="Filter by Editor's Choice"
                    aria-label="Filter by Editor's Choice"
                  >
                    <FaCrown size={11} />
                    <span className={styles.featuredToggleLabel}>Editor&apos;s Choice</span>
                    <span className={styles.featuredToggleCount}>{FEATURED_COUNT}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFilterDrawerOpen(true)}
                    className={clsx(
                      styles.filterBtnMobile,
                      (hasActiveFilters || selectedCategory !== 'all') && styles.filterBtnActive
                    )}
                    title="Open detailed filter drawer"
                    aria-label="Open filter panel"
                    aria-expanded={isFilterDrawerOpen}
                    aria-controls="filter-sheet-drawer"
                  >
                    <FaSliders size={13} />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className={styles.filterBadge}>{activeFilterCount}</span>
                    )}
                  </button>

                  <CustomSortDropdown
                    value={sortMode}
                    options={
                      selectedCategory === 'all' && selectedSubCategory === 'all'
                        ? SORT_OPTIONS
                        : SORT_OPTIONS.filter((o) => o.id !== 'category')
                    }
                    onChange={handleSelectSortMode}
                  />
                </div>
              </div>

              {/* Active Filter Chips & Results Count Bar (Only shown when filters are active) */}
              {hasActiveFilters && (
                <div className={styles.resultsBar}>
                  <div className={styles.resultsInfo}>
                    <span className={styles.matchCount}>
                      <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'result' : 'results'} found
                    </span>

                    {/* Active facet tags list */}
                    <div className={styles.activeTagsList}>
                      {onlyFeatured && (
                        <span className={styles.activeTag}>
                          <span>Editor&apos;s Choice</span>
                          <button
                            type="button"
                            onClick={handleToggleFeatured}
                            aria-label="Remove Editor's Choice filter"
                          >
                            <FaXmark size={9} />
                          </button>
                        </span>
                      )}

                      {source !== 'all' && (
                        <span className={styles.activeTag}>
                          <span>Type: {source === 'apps' ? 'Apps' : 'Projects'}</span>
                          <button
                            type="button"
                            onClick={() => handleSelectSource('all')}
                            aria-label="Remove source filter"
                          >
                            <FaXmark size={9} />
                          </button>
                        </span>
                      )}

                      {source === 'apps' && pricing !== 'all' && (
                        <span className={styles.activeTag}>
                          <span>Pricing: {pricing === 'paid' ? 'Paid' : 'Free'}</span>
                          <button
                            type="button"
                            onClick={() => handleSelectPricing('all')}
                            aria-label="Remove pricing filter"
                          >
                            <FaXmark size={9} />
                          </button>
                        </span>
                      )}

                      {selectedPlatform !== 'all' && (
                        <span className={styles.activeTag}>
                          <span>Platform: {selectedPlatform}</span>
                          <button
                            type="button"
                            onClick={() => handleSelectPlatform('all')}
                            aria-label="Remove platform filter"
                          >
                            <FaXmark size={9} />
                          </button>
                        </span>
                      )}

                      {selectedCategory !== 'all' && activeCategoryData && (
                        <span className={styles.activeTag}>
                          <span>Category: {activeCategoryData.label}</span>
                          <button
                            type="button"
                            onClick={() => {
                              handleSelectCategory('all');
                            }}
                            aria-label="Remove category filter"
                          >
                            <FaXmark size={9} />
                          </button>
                        </span>
                      )}

                      {selectedSubCategory !== 'all' && (
                        <span className={styles.activeTag}>
                          <span>Sub: {availableSubCategories.find((s) => s.id === selectedSubCategory)?.label || selectedSubCategory}</span>
                          <button
                            type="button"
                            onClick={() => handleSelectSubCategory('all')}
                            aria-label="Remove subcategory filter"
                          >
                            <FaXmark size={9} />
                          </button>
                        </span>
                      )}

                      {selectedDeveloper && (
                        <span className={styles.activeTag}>
                          <span>Creator: {selectedDeveloper}</span>
                          <button
                            type="button"
                            onClick={handleClearDeveloper}
                            aria-label="Remove creator filter"
                          >
                            <FaXmark size={9} />
                          </button>
                        </span>
                      )}

                      {searchQuery && (
                        <span className={styles.activeTag}>
                          <span>&quot;{searchQuery}&quot;</span>
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQueryState('');
                              applyState((prev) => ({ ...prev, search: '' }), { replace: true });
                            }}
                            aria-label="Clear search"
                          >
                            <FaXmark size={9} />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className={styles.resetAllBtn}
                    title="Reset all filters"
                  >
                    <FaRotateLeft size={10} />
                    <span>Reset Filters</span>
                  </button>
                </div>
              )}

              {/* Cards Grid or Clean Empty State */}
              {visibleItems.length > 0 ? (
                <>
                  <div className={styles.grid}>
                    {visibleItems.map((item) => (
                      <ShowcaseCard
                        key={item.id}
                        item={item}
                        onSelectDeveloper={handleSelectDeveloper}
                      />
                    ))}
                  </div>

                  {visibleCount < filteredItems.length && (
                    <div className={styles.loadMoreContainer}>
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        className={styles.loadMoreBtn}
                      >
                        <span>Load More</span>
                        <span className={styles.loadMoreRemaining}>
                          ({filteredItems.length - visibleCount} remaining)
                        </span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIconContainer}>
                    <FaMagnifyingGlass size={22} />
                  </div>
                  <h3 className={styles.emptyStateTitle}>No results match your query</h3>
                  <p className={styles.emptyStateSubtitle}>
                    Try adjusting your search terms or clearing active filters to browse the full catalog.
                  </p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className={styles.emptyStateResetBtn}
                    >
                      <FaRotateLeft size={11} />
                      <span>Reset All Filters</span>
                    </button>
                  )}
                </div>
              )}

              {/* Documentation reference footer */}
              <div className={styles.bottomBanner}>
                <div className={styles.bannerContent}>
                  <h2 className={styles.bannerTitle}>Documentation</h2>
                  <p className={styles.bannerDesc}>
                    Explore the legacy version of this section in the docs.
                  </p>
                </div>
                <div className={styles.bannerActions}>
                  <Link
                    to="/docs/apps"
                    className={clsx(
                      styles.bannerButton,
                      source === 'apps' && styles.bannerButtonActive
                    )}
                  >
                    <span>Apps</span>
                    <FaArrowRight size={11} />
                  </Link>
                  <Link
                    to="/docs/projects"
                    className={clsx(
                      styles.bannerButton,
                      source === 'projects' && styles.bannerButtonActive
                    )}
                  >
                    <span>Projects</span>
                    <FaArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Filter Drawer Component */}
      <ShowcaseFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        source={source}
        onSelectSource={handleSelectSource}
        sourceCounts={sourceCounts}
        pricing={pricing}
        onSelectPricing={handleSelectPricing}
        pricingCounts={pricingCounts}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        availableCategories={availableCategories}
        selectedSubCategory={selectedSubCategory}
        onSelectSubCategory={handleSelectSubCategory}
        availableSubCategories={availableSubCategories}
        selectedPlatform={selectedPlatform}
        onSelectPlatform={handleSelectPlatform}
        availablePlatforms={availablePlatforms}
        sortMode={sortMode}
        onSelectSortMode={handleSelectSortMode}
        onResetAll={handleResetFilters}
        totalMatches={filteredItems.length}
        hasActiveFilters={hasActiveFilters}
      />
    </Layout>
  );
}


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
} from 'react-icons/fa6';
import clsx from 'clsx';
import ShowcaseCard from '../components/ShowcaseCard';
import ShowcaseSidebar from '../components/ShowcaseSidebar';
import ShowcaseFilterDrawer from '../components/ShowcaseFilterDrawer';
import {
  ALL_SHOWCASE_ITEMS,
  CATEGORIES_BY_SOURCE,
  PLATFORM_FILTERS,
  shuffleItems,
  parseDevelopers,
  type SourceFilter,
  type PlatformFilter,
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
  source: SourceFilter;
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
  const rawSource = params.get('source') || params.get('type');
  const source: SourceFilter = rawSource === 'apps' || rawSource === 'projects' ? rawSource : 'all';

  const category = params.get('category') || 'all';
  const subCategory = params.get('subcategory') || params.get('sub') || 'all';

  const rawPlatform = params.get('platform');
  const platform: PlatformFilter = isPlatformFilter(rawPlatform) ? rawPlatform : 'all';

  const developer = params.get('dev') || params.get('developer') || null;
  const search = params.get('q') || params.get('search') || '';

  const rawSort = params.get('sort');
  const sort: SortMode = isSortMode(rawSort) ? rawSort : 'random';

  return {
    source,
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
  if (state.source !== 'all') params.set('source', state.source);
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

/**
 * Main Community Showcase page rendering searchable, filterable catalog of community creations.
 *
 * @returns {React.JSX.Element} Showcase page layout.
 */
export default function ShowcasePage(): React.JSX.Element {
  const history = useHistory();
  const location = useLocation();

  const initialUrlState = useMemo(() => parseUrlState(location.search), []);

  const [source, setSourceState] = useState<SourceFilter>(initialUrlState.source);
  const [selectedCategory, setSelectedCategoryState] = useState<string>(initialUrlState.category);
  const [selectedSubCategory, setSelectedSubCategoryState] = useState<string>(initialUrlState.subCategory);
  const [selectedPlatform, setSelectedPlatformState] = useState<PlatformFilter>(initialUrlState.platform);
  const [selectedDeveloper, setSelectedDeveloperState] = useState<string | null>(initialUrlState.developer);
  const [searchQuery, setSearchQueryState] = useState<string>(initialUrlState.search);
  const [sortMode, setSortModeState] = useState<SortMode>(initialUrlState.sort);

  const [shuffleSeed, setShuffleSeed] = useState(42);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Synchronize state when browser navigation events (Back/Forward) update location.search
  useEffect(() => {
    const parsed = parseUrlState(location.search);
    setSourceState(parsed.source);
    setSelectedCategoryState(parsed.category);
    setSelectedSubCategoryState(parsed.subCategory);
    setSelectedPlatformState(parsed.platform);
    setSelectedDeveloperState(parsed.developer);
    setSortModeState(parsed.sort);

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
        source,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        platform: selectedPlatform,
        developer: selectedDeveloper,
        search: searchQuery,
        sort: sortMode,
      };
      const next = updater(current);

      setSourceState(next.source);
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
      source,
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

  // Randomize initial seed on client mount so each visit/reload is fresh
  useEffect(() => {
    setShuffleSeed(Math.floor(Math.random() * 100000) + 1);
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
        source,
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
    source,
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
      source: 'all',
      category: 'all',
      subCategory: 'all',
      platform: 'all',
      developer: devName,
      search: '',
      sort: 'az',
    }));
    setVisibleCount(PAGE_SIZE);
  };

  const handleClearDeveloper = () => {
    applyState((prev) => ({
      ...prev,
      developer: null,
    }));
  };

  const handleResetFilters = useCallback(() => {
    applyState(() => ({
      source: 'all',
      category: 'all',
      subCategory: 'all',
      platform: 'all',
      developer: null,
      search: '',
      sort: 'random',
    }));
    setShuffleSeed(Math.floor(Math.random() * 10000) + 1);
  }, [applyState]);

  const handleSelectSource = (newSource: SourceFilter) => {
    applyState((prev) => ({
      ...prev,
      source: newSource,
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

  const handleSelectPlatform = (platformId: PlatformFilter) => {
    applyState((prev) => ({
      ...prev,
      platform: platformId,
    }));
  };

  const handleSelectSortMode = (mode: SortMode) => {
    if (mode === 'random') {
      setShuffleSeed(Math.floor(Math.random() * 100000) + 1);
    }
    applyState((prev) => ({
      ...prev,
      sort: mode,
    }));
    setVisibleCount(PAGE_SIZE);
  };

  // Multi-dimensional filtering logic with Editor's Choice naturally boosted to top
  const filteredItems = useMemo(() => {
    const matched = sortedBaseItems.filter((item) => {
      // Filter: Source catalog (apps vs projects)
      if (source !== 'all' && item.source !== source) return false;

      // Filter: Broad Category (H2)
      if (selectedCategory !== 'all') {
        if (item.categoryKey !== selectedCategory) return false;
      }

      // Filter: Subcategory (H3)
      if (selectedSubCategory !== 'all') {
        if (item.subCategoryKey !== selectedSubCategory) return false;
      }

      // Filter: Target OS Platform
      if (selectedPlatform !== 'all') {
        const osList = item.platformOS || [];
        if (!osList.includes(selectedPlatform)) return false;
      }

      // Filter: Developer
      if (selectedDeveloper) {
        const itemDevs = parseDevelopers(item.developer).map((d) => d.toLowerCase().trim());
        const target = selectedDeveloper.toLowerCase().trim();
        const matchesIndividual = itemDevs.includes(target);
        const matchesRaw = item.developer.toLowerCase().trim() === target;
        if (!matchesIndividual && !matchesRaw) return false;
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

    if (sortMode === 'category') {
      return [...matched].sort((a, b) =>
        a.category.localeCompare(b.category) ||
        (a.subCategory || '').localeCompare(b.subCategory || '') ||
        (a.featured === b.featured ? 0 : a.featured ? -1 : 1) ||
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      );
    }

    const isFilterOrSearchActive =
      source !== 'all' ||
      selectedCategory !== 'all' ||
      selectedSubCategory !== 'all' ||
      selectedPlatform !== 'all' ||
      Boolean(selectedDeveloper) ||
      searchQuery.trim().length > 0;

    // Boost Editor's Choice items to the top when filters or search are active
    if (isFilterOrSearchActive) {
      return [...matched].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }

    // Root view: retain pure discovery across all catalog entries
    return matched;
  }, [
    sortedBaseItems,
    source,
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
    source,
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
    if (source !== 'all') count++;
    if (selectedCategory !== 'all') count++;
    if (selectedSubCategory !== 'all') count++;
    if (selectedPlatform !== 'all') count++;
    if (selectedDeveloper !== null) count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [
    source,
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
      description="Discover community-built apps, Glyph Matrix tools, widgets, and open-source projects for Nothing and CMF devices."
    >
      <div className={styles.showcasePage}>
        <div className={styles.glyphGrid} aria-hidden="true" />

        <div className="container">
          {/* Header section with left-aligned typographic discipline */}
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <h1 className={styles.title}>Community Showcase</h1>
              <p className={styles.subtitle}>
                Explore and collaborate on the applications and projects made by the Nothing &amp; CMF community.
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
              {/* Unified Command Toolbar (Hardware Console Bar) */}
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

                {/* Actions: Filter Drawer Trigger (Mobile) & Sort Dropdown */}
                <div className={styles.toolbarActions}>
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

              {/* Documentation Reference Footer Strip */}
              <div className={styles.bottomBanner}>
                <div className={styles.bannerContent}>
                  <h2 className={styles.bannerTitle}>Documentation</h2>
                  <p className={styles.bannerDesc}>
                    Explore the legacy version of this section in the docs.
                  </p>
                </div>
                <div className={styles.bannerActions}>
                  <Link to="/docs/apps" className={styles.bannerButton}>
                    <span>Apps</span>
                    <FaArrowRight size={11} />
                  </Link>
                  <Link to="/docs/projects" className={styles.bannerButtonSecondary}>
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


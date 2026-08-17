/**
 * @file showcase.tsx
 * @description Catalog route for the Nothing Archive Community Showcase.
 * Orchestrates full-text search, multi-source taxonomy filtering, active facet chips,
 * and responsive showcase cards grid.
 * 
 * Layer: Top-level page route (/showcase).
 * Boundary: Orchestrates search, multi-source taxonomy filtering, sort modes, and renders showcase cards.
 */

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  FaMagnifyingGlass,
  FaArrowRight,
  FaShuffle,
  FaXmark,
  FaChevronDown,
  FaRotateLeft,
  FaSliders,
  FaCrown,
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
  { id: 'featured', label: "Editor's Choice", icon: <FaCrown size={12} /> },
  { id: 'az', label: 'Title (A → Z)', icon: <FaArrowDownAZ size={12} /> },
  { id: 'za', label: 'Title (Z → A)', icon: <FaArrowDownZA size={12} /> },
  { id: 'category', label: 'Group by Category', icon: <FaFolder size={12} /> },
];

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
  const [source, setSource] = useState<SourceFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformFilter>('all');
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('random');
  const [shuffleSeed, setShuffleSeed] = useState(42);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Reset selected category if not present in new source catalog
  useEffect(() => {
    if (selectedCategory !== 'all') {
      const exists = availableCategories.some((c) => c.id === selectedCategory);
      if (!exists) {
        setSelectedCategory('all');
        setSelectedSubCategory('all');
      }
    }
  }, [source, availableCategories, selectedCategory]);

  // Reset selected subcategory when category changes
  useEffect(() => {
    if (selectedSubCategory !== 'all') {
      const exists = availableSubCategories.some((s) => s.id === selectedSubCategory);
      if (!exists) {
        setSelectedSubCategory('all');
      }
    }
  }, [selectedCategory, availableSubCategories, selectedSubCategory]);

  // Base list processed with sorting / randomization
  const sortedBaseItems = useMemo<ShowcaseItem[]>(() => {
    const list = [...ALL_SHOWCASE_ITEMS];

    if (sortMode === 'featured') {
      return list.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
      });
    }
    if (sortMode === 'random') {
      return shuffleItems(list, shuffleSeed);
    }
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
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      );
    }
    return list;
  }, [sortMode, shuffleSeed]);

  // Dynamically compute platform filters that exist for the selected source catalog
  const availablePlatforms = useMemo(() => {
    let filters = PLATFORM_FILTERS;

    if (source === 'apps') {
      filters = filters.filter((p) => p.id === 'android' || p.id === 'ios');
    } else if (source === 'projects') {
      filters = filters.filter((p) => p.id !== 'android' && p.id !== 'ios');
    }

    if (sortMode === 'featured') {
      const featuredItems = sortedBaseItems.filter((i) => i.featured && (source === 'all' || i.source === source));
      const existingOS = new Set<string>();
      for (const item of featuredItems) {
        for (const os of item.platformOS || []) {
          existingOS.add(os);
        }
      }
      return filters.filter(
        (p) => existingOS.has(p.id) || (p.id === 'ios' && existingOS.has('macos'))
      );
    }

    return filters;
  }, [source, sortMode, sortedBaseItems]);

  // Reset selected platform if not available in current source catalog
  useEffect(() => {
    if (selectedPlatform !== 'all') {
      const isAvailable = availablePlatforms.some((p) => p.id === selectedPlatform);
      if (!isAvailable) {
        setSelectedPlatform('all');
      }
    }
  }, [source, availablePlatforms, selectedPlatform]);

  const handleSelectDeveloper = (devName: string) => {
    setSelectedDeveloper(devName);
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSelectedPlatform('all');
    setSource('all');
    setSearchQuery('');
    setSortMode('az');
    setVisibleCount(PAGE_SIZE);
  };

  const handleClearDeveloper = () => {
    setSelectedDeveloper(null);
  };

  const handleResetFilters = useCallback(() => {
    setSource('all');
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSelectedPlatform('all');
    setSelectedDeveloper(null);
    setSearchQuery('');
    setSortMode('random');
    setShuffleSeed(Math.floor(Math.random() * 10000) + 1);
  }, []);

  // Multi-dimensional filtering logic
  const filteredItems = useMemo(() => {
    return sortedBaseItems.filter((item) => {
      // Filter: Editor's Choice mode
      if (sortMode === 'featured' && !item.featured) return false;

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
    if (sortMode === 'featured') count++;
    return count;
  }, [
    source,
    selectedCategory,
    selectedSubCategory,
    selectedPlatform,
    selectedDeveloper,
    searchQuery,
    sortMode,
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
              onSelectSource={setSource}
              sourceCounts={sourceCounts}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              availableCategories={availableCategories}
              selectedSubCategory={selectedSubCategory}
              onSelectSubCategory={setSelectedSubCategory}
              availableSubCategories={availableSubCategories}
              selectedPlatform={selectedPlatform}
              onSelectPlatform={setSelectedPlatform}
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                    aria-label="Search showcase creations"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
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
                    onChange={(mode) => {
                      if (mode === 'random') {
                        setShuffleSeed(Math.floor(Math.random() * 100000) + 1);
                      }
                      setSortMode(mode);
                      setVisibleCount(PAGE_SIZE);
                    }}
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
                            onClick={() => setSource('all')}
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
                            onClick={() => setSelectedPlatform('all')}
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
                              setSelectedCategory('all');
                              setSelectedSubCategory('all');
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
                            onClick={() => setSelectedSubCategory('all')}
                            aria-label="Remove subcategory filter"
                          >
                            <FaXmark size={9} />
                          </button>
                        </span>
                      )}

                      {sortMode === 'featured' && (
                        <span className={styles.activeTag}>
                          <span>Editor&apos;s Choice</span>
                          <button
                            type="button"
                            onClick={() => setSortMode('random')}
                            aria-label="Remove Editor's Choice filter"
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
                            onClick={() => setSearchQuery('')}
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
        onSelectSource={setSource}
        sourceCounts={sourceCounts}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        availableCategories={availableCategories}
        selectedSubCategory={selectedSubCategory}
        onSelectSubCategory={setSelectedSubCategory}
        availableSubCategories={availableSubCategories}
        selectedPlatform={selectedPlatform}
        onSelectPlatform={setSelectedPlatform}
        availablePlatforms={availablePlatforms}
        sortMode={sortMode}
        onSelectSortMode={(mode) => {
          setSortMode(mode);
          if (mode === 'featured') {
            setSelectedCategory('all');
            setSelectedSubCategory('all');
            setSelectedPlatform('all');
            setSource('all');
            setSelectedDeveloper(null);
          }
        }}
        onResetAll={handleResetFilters}
        totalMatches={filteredItems.length}
        hasActiveFilters={hasActiveFilters}
      />
    </Layout>
  );
}

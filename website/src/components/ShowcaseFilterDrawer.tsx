/**
 * @file ShowcaseFilterDrawer.tsx
 * @description Mobile filter drawer modal (< 1024px) for the Community Showcase catalog.
 * Provides faceted navigation across catalog sources, target platforms, categories, and sort modes.
 * 
 * Layer: Presentation / Modal Filter Sheet.
 * Boundary: Consumes taxonomy filter state and dispatches selection events.
 */

import React, { useEffect } from 'react';
import {
  FaXmark,
  FaRotateLeft,
  FaSliders,
  FaAndroid,
  FaApple,
  FaWindows,
  FaLinux,
  FaGlobe,
  FaLayerGroup,
  FaMobileScreenButton,
  FaCode,
  FaShuffle,
  FaArrowDownAZ,
  FaArrowDownZA,
  FaFolder,
  FaCheck,
} from 'react-icons/fa6';
import clsx from 'clsx';
import {
  type SourceFilter,
  type PlatformFilter,
  type SortMode,
  type CategoryOption,
  type SubCategoryOption,
  SOURCE_TABS,
  PricingFilter,
} from '../data/showcase-data';
import styles from './ShowcaseFilterDrawer.module.css';

interface DrawerSortOption {
  id: SortMode;
  label: string;
  icon: React.ReactElement;
}

interface ShowcaseFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;

  source: SourceFilter;
  onSelectSource: (source: SourceFilter) => void;
  sourceCounts: { all: number; apps: number; projects: number };

  pricing: PricingFilter;
  onSelectPricing: (pricing: PricingFilter) => void;
  pricingCounts: { all: number; free: number; paid: number };

  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  availableCategories: CategoryOption[];

  selectedSubCategory: string;
  onSelectSubCategory: (subCatId: string) => void;
  availableSubCategories: SubCategoryOption[];

  selectedPlatform: PlatformFilter;
  onSelectPlatform: (platform: PlatformFilter) => void;
  availablePlatforms: { id: PlatformFilter; label: string }[];

  sortMode: SortMode;
  onSelectSortMode: (mode: SortMode) => void;

  onResetAll: () => void;
  hasActiveFilters: boolean;
  totalMatches: number;
}

/**
 * Returns platform vector SVG icon for mobile sheet.
 *
 * @param {PlatformFilter} p - Target platform identifier.
 * @returns {React.ReactElement} Platform vector icon.
 */
function getPlatformIcon(p: PlatformFilter): React.ReactElement {
  switch (p) {
    case 'android':
      return <FaAndroid size={12} />;
    case 'ios':
    case 'macos':
      return <FaApple size={12} />;
    case 'windows':
      return <FaWindows size={11} />;
    case 'linux':
      return <FaLinux size={12} />;
    case 'web':
      return <FaGlobe size={11} />;
    default:
      return <FaLayerGroup size={11} />;
  }
}

/**
 * Returns source vector SVG icon for mobile sheet.
 *
 * @param {SourceFilter} s - Catalog source type.
 * @returns {React.ReactElement} Source type vector icon.
 */
function getSourceIcon(s: SourceFilter): React.ReactElement {
  switch (s) {
    case 'apps':
      return <FaMobileScreenButton size={12} />;
    case 'projects':
      return <FaCode size={12} />;
    default:
      return <FaLayerGroup size={12} />;
  }
}

/**
 * Mobile filter drawer and bottom-sheet component.
 *
 * @param {ShowcaseFilterDrawerProps} props - Component properties.
 * @returns {React.JSX.Element | null} Rendered bottom sheet or null if closed.
 */
export default function ShowcaseFilterDrawer({
  isOpen,
  onClose,
  source,
  onSelectSource,
  sourceCounts,
  pricing,
  onSelectPricing,
  pricingCounts,
  selectedCategory,
  onSelectCategory,
  availableCategories,
  selectedSubCategory,
  onSelectSubCategory,
  availableSubCategories,
  selectedPlatform,
  onSelectPlatform,
  availablePlatforms,
  sortMode,
  onSelectSortMode,
  onResetAll,
  hasActiveFilters,
  totalMatches,
}: ShowcaseFilterDrawerProps): React.JSX.Element | null {
  // Prevent body scrolling when sheet is open on mobile
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-sheet-title"
    >
      <div id="filter-sheet-drawer" className={styles.drawer}>
        {/* Mobile Drag Indicator Pill */}
        <div className={styles.dragHandleWrapper}>
          <div className={styles.dragHandle} />
        </div>

        {/* Header Bar */}
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <FaSliders className={styles.headerIcon} size={15} />
            <h2 id="filter-sheet-title" className={styles.headerTitle}>
              Filters
            </h2>
          </div>

          <div className={styles.headerActions}>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetAll}
                className={styles.resetBtn}
                title="Reset all filters"
              >
                <FaRotateLeft size={11} />
                <span>Reset</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className={styles.closeBtn}
              title="Close filter panel"
              aria-label="Close filter panel"
            >
              <FaXmark size={15} />
            </button>
          </div>
        </div>

        {/* Drawer scrollable content */}
        <div className={styles.drawerBody}>
          {/* Section: Catalog Source (Clean Fluid Segmented Bar) */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Catalog Source</span>
            <div className={styles.segmentedControl} role="tablist">
              {SOURCE_TABS.map((tab) => {
                const isActive = source === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onSelectSource(tab.id)}
                    className={clsx(
                      styles.segmentTab,
                      isActive && styles.segmentTabActive
                    )}
                  >
                    <span className={styles.segmentIcon}>{getSourceIcon(tab.id)}</span>
                    <span className={styles.segmentLabel}>{tab.label}</span>
                    <span className={styles.segmentBadge}>{sourceCounts[tab.id]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: App Pricing Filter (Free / Paid toggles) */}
          {source === 'apps' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>App Pricing</span>
                {pricing !== 'all' && (
                  <button
                    type="button"
                    onClick={() => onSelectPricing('all')}
                    className={styles.sectionClearBtn}
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className={styles.segmentedControl} role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={pricing === 'free'}
                  onClick={() => onSelectPricing(pricing === 'free' ? 'all' : 'free')}
                  className={clsx(
                    styles.segmentTab,
                    pricing === 'free' && styles.segmentTabActive
                  )}
                >
                  <span className={styles.segmentLabel}>Free</span>
                  <span className={styles.segmentBadge}>{pricingCounts.free}</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={pricing === 'paid'}
                  onClick={() => onSelectPricing(pricing === 'paid' ? 'all' : 'paid')}
                  className={clsx(
                    styles.segmentTab,
                    pricing === 'paid' && styles.segmentTabActive
                  )}
                >
                  <span className={styles.segmentLabel}>Paid</span>
                  <span className={styles.segmentBadge}>{pricingCounts.paid}</span>
                </button>
              </div>
            </div>
          )}

          {/* Section: Target OS Platform */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Target Platform</span>
              {selectedPlatform !== 'all' && (
                <button
                  type="button"
                  onClick={() => onSelectPlatform('all')}
                  className={styles.sectionClearBtn}
                >
                  Reset Platform
                </button>
              )}
            </div>
            <div className={styles.platformGrid}>
              {availablePlatforms.map((p) => {
                const isSelected = selectedPlatform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectPlatform(isSelected ? 'all' : p.id)}
                    className={clsx(
                      styles.platformChip,
                      isSelected && styles.platformChipActive
                    )}
                  >
                    <span className={styles.platformIcon}>{getPlatformIcon(p.id)}</span>
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Categories (Single-Column List) */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Categories</span>
              {selectedCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('all');
                    onSelectSubCategory('all');
                  }}
                  className={styles.sectionClearBtn}
                >
                  Reset Categories
                </button>
              )}
            </div>

            <div className={styles.categoryList}>
              {availableCategories.map((cat) => {
                const isCatSelected = selectedCategory === cat.id;

                return (
                  <div key={cat.id} className={styles.categoryGroup}>
                    <button
                      type="button"
                      onClick={() => {
                        if (isCatSelected) {
                          onSelectCategory('all');
                          onSelectSubCategory('all');
                        } else {
                          onSelectCategory(cat.id);
                          onSelectSubCategory('all');
                        }
                      }}
                      className={clsx(
                        styles.categoryRow,
                        isCatSelected && styles.categoryRowActive
                      )}
                    >
                      <div className={styles.categoryRowLeft}>
                        <span className={styles.categoryRadio}>
                          {isCatSelected && <FaCheck size={9} />}
                        </span>
                        <span className={styles.categoryLabel}>{cat.label}</span>
                      </div>
                      <span className={styles.categoryCount}>{cat.count}</span>
                    </button>

                    {/* Progressive Subcategories Disclosure */}
                    {isCatSelected && availableSubCategories.length > 0 && (
                      <div className={styles.subCategoryContainer}>
                        <div className={styles.subCategoryPills}>
                          {availableSubCategories.map((sub) => {
                            const isSubSelected = selectedSubCategory === sub.id;
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => onSelectSubCategory(isSubSelected ? 'all' : sub.id)}
                                className={clsx(
                                  styles.subCategoryChip,
                                  isSubSelected && styles.subCategoryChipActive
                                )}
                              >
                                <span>{sub.label}</span>
                                <span className={styles.subCategoryBadge}>
                                  {sub.count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Sort Order */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Sort Order</span>
            </div>
            <div className={styles.sortGrid}>
              {(() => {
                const sortOptions: DrawerSortOption[] = [
                  { id: 'random', label: 'Random', icon: <FaShuffle size={12} /> },
                  { id: 'az', label: 'Title (A → Z)', icon: <FaArrowDownAZ size={12} /> },
                  { id: 'za', label: 'Title (Z → A)', icon: <FaArrowDownZA size={12} /> },
                  ...(selectedCategory === 'all' && selectedSubCategory === 'all'
                    ? [{ id: 'category' as const, label: 'Category', icon: <FaFolder size={12} /> }]
                    : []),
                ];
                return sortOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelectSortMode(opt.id)}
                    className={clsx(
                      styles.sortCard,
                      sortMode === opt.id && styles.sortCardActive
                    )}
                  >
                    <span className={styles.sortCardIcon}>{opt.icon}</span>
                    <span className={styles.sortCardLabel}>{opt.label}</span>
                  </button>
                ));
              })()}
            </div>
          </div>
        </div>

        {/* Sticky Footer Action CTA */}
        <div className={styles.footer}>
          <button
            type="button"
            onClick={onClose}
            className={styles.applyBtn}
          >
            Show {totalMatches} {totalMatches === 1 ? 'Result' : 'Results'}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * @file ShowcaseSidebar.tsx
 * @description Persistent left-rail filter panel for desktop viewport (>= 1024px).
 * Provides immediate, zero-modal faceted navigation for catalog source, target platforms,
 * and hierarchical categories/subcategories.
 * 
 * Layer: Presentation / Navigation component.
 * Boundary: Consumes taxonomy filter states and dispatches selection callbacks without blocking main grid view.
 */

import React from 'react';
import {
  FaLayerGroup,
  FaMobileScreenButton,
  FaCode,
  FaRotateLeft,
  FaAndroid,
  FaApple,
  FaWindows,
  FaLinux,
  FaGlobe,
  FaChevronRight,
} from 'react-icons/fa6';
import clsx from 'clsx';
import type {
  SourceFilter,
  PlatformFilter,
  CategoryOption,
  SubCategoryOption,
  PricingFilter,
} from '../data/showcase-data';
import styles from './ShowcaseSidebar.module.css';

interface ShowcaseSidebarProps {
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

  onResetAll: () => void;
  hasActiveFilters: boolean;
}

/**
 * Returns platform vector SVG icon for desktop sidebar list.
 *
 * @param {PlatformFilter} p - Platform identifier.
 * @returns {React.ReactElement} Platform vector SVG icon.
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
 * Persistent sidebar filter component for desktop screens.
 *
 * @param {ShowcaseSidebarProps} props - Component properties.
 * @returns {React.JSX.Element} Rendered desktop sidebar.
 */
export default function ShowcaseSidebar({
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
  onResetAll,
  hasActiveFilters,
}: ShowcaseSidebarProps): React.JSX.Element {
  return (
    <aside className={styles.sidebar} aria-label="Showcase catalog filters">
      <div className={styles.sidebarSticky}>
        {/* Header & Reset Button */}
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle}>Filters</span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetAll}
              className={styles.resetBtn}
              title="Reset all filters"
            >
              <FaRotateLeft size={10} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Section 1: Catalog Source (All / Apps / Projects) */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Catalog Source</span>
          <div className={styles.sourceList} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={source === 'all'}
              className={clsx(styles.sourceItem, source === 'all' && styles.sourceItemActive)}
              onClick={() => onSelectSource('all')}
            >
              <span className={styles.sourceItemLeft}>
                <FaLayerGroup size={12} className={styles.sourceIcon} />
                <span>All Catalog</span>
              </span>
              <span className={styles.sourceCount}>{sourceCounts.all}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={source === 'apps'}
              className={clsx(styles.sourceItem, source === 'apps' && styles.sourceItemActive)}
              onClick={() => onSelectSource('apps')}
            >
              <span className={styles.sourceItemLeft}>
                <FaMobileScreenButton size={12} className={styles.sourceIcon} />
                <span>Apps</span>
              </span>
              <span className={styles.sourceCount}>{sourceCounts.apps}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={source === 'projects'}
              className={clsx(styles.sourceItem, source === 'projects' && styles.sourceItemActive)}
              onClick={() => onSelectSource('projects')}
            >
              <span className={styles.sourceItemLeft}>
                <FaCode size={12} className={styles.sourceIcon} />
                <span>Projects</span>
              </span>
              <span className={styles.sourceCount}>{sourceCounts.projects}</span>
            </button>
          </div>
        </div>

        {/* Section: App Pricing Filter (Free / Paid toggles) */}
        {source === 'apps' && (
          <div className={styles.section}>
            <span className={styles.sectionLabel}>App Pricing</span>
            <div className={styles.sourceList}>
              <button
                type="button"
                className={clsx(styles.sourceItem, pricing === 'free' && styles.sourceItemActive)}
                onClick={() => onSelectPricing(pricing === 'free' ? 'all' : 'free')}
              >
                <span className={styles.sourceItemLeft}>
                  <span>Free</span>
                </span>
                <span className={styles.sourceCount}>{pricingCounts.free}</span>
              </button>

              <button
                type="button"
                className={clsx(styles.sourceItem, pricing === 'paid' && styles.sourceItemActive)}
                onClick={() => onSelectPricing(pricing === 'paid' ? 'all' : 'paid')}
              >
                <span className={styles.sourceItemLeft}>
                  <span>Paid</span>
                </span>
                <span className={styles.sourceCount}>{pricingCounts.paid}</span>
              </button>
            </div>
          </div>
        )}

        {/* Section 2: Platform Filter */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Target Platform</span>
          <div className={styles.platformList}>
            {availablePlatforms.map((p) => {
              const isSelected = selectedPlatform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={clsx(styles.platformItem, isSelected && styles.platformItemActive)}
                  onClick={() => onSelectPlatform(isSelected ? 'all' : p.id)}
                >
                  <span className={styles.platformIconContainer}>{getPlatformIcon(p.id)}</span>
                  <span className={styles.platformLabel}>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Categories & Subcategories Tree */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Categories</span>
          <div className={styles.categoryList}>
            {availableCategories.map((cat) => {
              const isCatSelected = selectedCategory === cat.id;

              return (
                <div key={cat.id} className={styles.categoryGroup}>
                  <button
                    type="button"
                    className={clsx(
                      styles.categoryItem,
                      isCatSelected && styles.categoryItemActive
                    )}
                    onClick={() => {
                      if (isCatSelected) {
                        onSelectCategory('all');
                        onSelectSubCategory('all');
                      } else {
                        onSelectCategory(cat.id);
                        onSelectSubCategory('all');
                      }
                    }}
                  >
                    <span className={styles.categoryName}>
                      {isCatSelected && (
                        <FaChevronRight size={9} className={styles.categoryChevron} />
                      )}
                      {cat.label}
                    </span>
                    <span className={styles.categoryCount}>{cat.count}</span>
                  </button>

                  {/* Nested Subcategories List when Category is Active */}
                  {isCatSelected && availableSubCategories.length > 0 && (
                    <div className={styles.subCategoryTree}>
                      {availableSubCategories.map((sub) => {
                        const isSubSelected = selectedSubCategory === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            className={clsx(
                              styles.subCategoryItem,
                              isSubSelected && styles.subCategoryItemActive
                            )}
                            onClick={() => onSelectSubCategory(isSubSelected ? 'all' : sub.id)}
                          >
                            <span className={styles.subCategoryDot} />
                            <span className={styles.subCategoryName}>{sub.label}</span>
                            <span className={styles.subCategoryCount}>{sub.count}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

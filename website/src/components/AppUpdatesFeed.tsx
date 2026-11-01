import React, { useState, useMemo } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { FaGooglePlay } from 'react-icons/fa';
import clsx from 'clsx';
import styles from './AppUpdatesFeed.module.css';
import rawData from '../data/app_updates.json';
import { getTimeLag } from '../utils/time';
import { useScrollLight } from '../utils/useScrollLight';
import type { AppUpdateItem } from '../types/trackers';



export default function AppUpdatesFeed(): React.JSX.Element {
  const [consoleBodyRef, isScrolling] = useScrollLight<HTMLDivElement>();
  const { withBaseUrl } = useBaseUrlUtils();
  const [expandedPkg, setExpandedPkg] = useState<string | null>(null);

  const getEffectiveDate = (item: AppUpdateItem): string => item.discoveredAt || item.publishedAt || item.updatedAt || '';

  const apps = useMemo(() => {
    // SAFETY: Static JSON file maps package IDs to AppUpdateItem records.
    const recordMap = rawData as Record<string, AppUpdateItem>;
    return Object.entries(recordMap)
      .map(([packageName, item]) => ({
        ...item,
        packageName,
      }))
      .sort((a, b) => new Date(getEffectiveDate(b)).getTime() - new Date(getEffectiveDate(a)).getTime());
  }, []);

  const toggleAccordion = (pkg: string) => {
    setExpandedPkg((prev) => (prev === pkg ? null : pkg));
  };

  return (
    <div className={styles.container}>
      <div className={styles.widgetHeader}>
        <div className={styles.headerTitleGroup}>
          <span className={styles.widgetTitle}>Nothing App Updates</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.metricPill} title="Total tracked Nothing and Google packages">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span suppressHydrationWarning>{apps.length} apps</span>
          </span>
        </div>
      </div>

      <div className={styles.consolePanel}>
        <div ref={consoleBodyRef} className={clsx(styles.consoleBody, isScrolling && styles.isScrolling)}>
          {apps.length === 0 ? (
            <div className={styles.emptyFeed}>
              <span>No tracked app updates</span>
            </div>
          ) : (
            apps.map((app, idx) => {
              const isExpanded = expandedPkg === app.packageName;

              return (
                <div
                  key={app.packageName}
                  className={clsx(styles.rowItem, isExpanded && styles.rowItemExpanded)}
                >
                  <div
                    className={styles.consoleLine}
                    onClick={() => toggleAccordion(app.packageName)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleAccordion(app.packageName);
                      }
                    }}
                  >
                    <span className={clsx(styles.timeLag, idx === 0 && styles.timeLagActive)} suppressHydrationWarning>
                      {getTimeLag(getEffectiveDate(app))}
                    </span>
                    <img
                      src={withBaseUrl(`/img/apps/${app.packageName}.webp`)}
                      alt={app.name}
                      className={styles.appIcon}
                      width={22}
                      height={22}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (app.iconUrl && e.currentTarget.src !== app.iconUrl) {
                          e.currentTarget.src = app.iconUrl;
                        }
                      }}
                    />
                    <div className={styles.appDetails}>
                      <span className={styles.appName}>{app.name}</span>
                      <span className={styles.versionBadge}>{app.versionName}</span>
                    </div>
                    <div className={styles.actionArea}>
                      <a
                        href={app.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.playStoreBtn}
                        title={`Open ${app.name} on Google Play`}
                        aria-label={`Open ${app.name} on Google Play`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGooglePlay size={10} className={styles.playStoreIcon} />
                      </a>
                      <svg
                        className={clsx(styles.chevron, isExpanded && styles.chevronExpanded)}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="12"
                        height="12"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className={styles.accordionContent}>
                      <div className={styles.changelogBox}>
                        <div className={styles.changelogHeader}>
                          <span>Changelogs</span>
                        </div>
                        <div className={styles.changelogText}>
                          {app.changelog || 'Performance improvements and bug fixes.'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

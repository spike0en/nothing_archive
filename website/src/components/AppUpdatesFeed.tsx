import React, { useState, useMemo } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import styles from './AppUpdatesFeed.module.css';
import rawData from '../data/app_updates.json';
import { getTimeLag } from '../utils/time';
import type { AppUpdateItem } from '../types/trackers';

export default function AppUpdatesFeed(): React.JSX.Element {
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

  const latestApp = apps[0];
  const latestDate = latestApp ? getEffectiveDate(latestApp) : '';
  const latestLag = latestDate ? getTimeLag(latestDate) + ' ago' : '—';

  const stats = [
    { label: 'LATEST UPDATE', value: latestLag },
    { label: 'TRACKED APPS', value: `${apps.length}` },
  ];

  const toggleAccordion = (pkg: string) => {
    setExpandedPkg((prev) => (prev === pkg ? null : pkg));
  };

  return (
    <div className={styles.container}>
      <div className={styles.telemetryHeader}>
        <div className={styles.systemLabel}>
          <span className={styles.feedTextPrefix}>APP UPDATES</span>
        </div>
      </div>

      <div className={styles.statsStrip}>
        {stats.map((s, idx) => (
          <div key={idx} className={styles.statItem}>
            <span className={styles.statValue} suppressHydrationWarning>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.consolePanel}>
        <div className={styles.consoleHeader}>
          <span>RECENT UPDATES</span>
        </div>
        <div className={styles.consoleBody}>
          {apps.length === 0 ? (
            <div className={styles.emptyFeed}>
              <span>NO TRACKED APP UPDATES</span>
            </div>
          ) : (
            apps.map((app, idx) => {
            const isExpanded = expandedPkg === app.packageName;
            return (
              <div
                key={app.packageName}
                className={`${styles.rowItem} ${isExpanded ? styles.rowItemExpanded : ''}`}
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
                  <span className={`${styles.timeLag} ${idx === 0 ? styles.timeLagActive : ''}`} suppressHydrationWarning>{getTimeLag(getEffectiveDate(app))}</span>
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
                    <div className={styles.appSubline}>
                      <span className={styles.versionBadge}>{app.versionName}</span>
                    </div>
                  </div>
                  <div className={styles.actionArea}>
                    <a
                      href={app.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.playStoreBtn} ${idx === 0 ? styles.playStoreBtnHighlighted : ''}`}
                      title={`Open ${app.name} on Google Play`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </a>
                    <svg
                      className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                {isExpanded && (
                  <div className={styles.changelogDrawer}>
                    {app.changelog}
                  </div>
                )}
              </div>
            );
          }))}
        </div>
      </div>
    </div>
  );
}

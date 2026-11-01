import React, { useState, useMemo } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './AudioFirmwareFeed.module.css';
import rawData from '../data/accessories_updates.json';
import { getTimeLag } from '../utils/time';
import { useScrollLight } from '../utils/useScrollLight';
import type { AudioUpdateItem } from '../types/trackers';

export default function AudioFirmwareFeed(): React.JSX.Element {
  const [consoleBodyRef, isScrolling] = useScrollLight<HTMLDivElement>();
  const { withBaseUrl } = useBaseUrlUtils();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const devices: AudioUpdateItem[] = useMemo(() => {
    // SAFETY: Static JSON file maps model IDs to AudioUpdateItem records.
    const recordMap = rawData as Record<string, AudioUpdateItem>;
    return Object.values(recordMap).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }, []);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.widgetHeader}>
        <div className={styles.headerTitleGroup}>
          <span className={styles.widgetTitle}>Audio and Watch Firmware</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.metricPill} title="Total audio and wearable accessories indexed">
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
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            <span suppressHydrationWarning>{devices.length} accessories</span>
          </span>
        </div>
      </div>

      <div className={styles.consolePanel}>
        <div ref={consoleBodyRef} className={clsx(styles.consoleBody, isScrolling && styles.isScrolling)}>
          {devices.length === 0 ? (
            <div className={styles.emptyFeed}>
              <span>No tracked accessory releases</span>
            </div>
          ) : (
            devices.map((dev) => {
              const isExpanded = expandedId === dev.modelId;
              const isCmf = dev.brand === 'CMF';

              return (
                <div
                  key={dev.modelId}
                  className={clsx(styles.rowItem, isExpanded && styles.rowItemExpanded)}
                >
                  <div
                    className={styles.consoleLine}
                    onClick={() => toggleAccordion(dev.modelId)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleAccordion(dev.modelId);
                      }
                    }}
                  >
                    <span className={styles.timeLag} suppressHydrationWarning>
                      {getTimeLag(dev.updatedAt)}
                    </span>
                    {!imgErrors[dev.modelId] ? (
                      <img
                        src={withBaseUrl(`/img/accessories/${dev.modelId}.webp`)}
                        alt={`${dev.brand} ${dev.name}`}
                        className={styles.deviceIcon}
                        width={24}
                        height={24}
                        loading="lazy"
                        decoding="async"
                        onError={() => {
                          setImgErrors((prev) => ({ ...prev, [dev.modelId]: true }));
                        }}
                      />
                    ) : (
                      <div className={styles.deviceIconPlaceholder} aria-label={`${dev.brand} ${dev.name}`}>
                        <span>{dev.brand === 'CMF' ? 'C' : 'N'}</span>
                      </div>
                    )}
                    <div className={styles.deviceDetails}>
                      <div className={styles.deviceNameRow}>
                        <span className={clsx(styles.brandBadge, isCmf ? styles.brandBadgeCmf : styles.brandBadgeNothing)}>
                          {dev.brand}
                        </span>
                        <span className={styles.deviceName}>{dev.name}</span>
                        <span className={styles.versionBadge}>v{dev.version}</span>
                        {dev.size && <span className={styles.sizePill}>{dev.size}</span>}
                      </div>
                    </div>
                    {dev.downloadUrl && (
                      <a
                        href={dev.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.downloadIconBtn}
                        title={`Download ${dev.brand} ${dev.name} v${dev.version} firmware (.bin)`}
                        aria-label={`Download ${dev.brand} ${dev.name} v${dev.version} firmware (.bin)`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.downloadIcon}
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </a>
                    )}
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

                  {isExpanded && (
                    <div className={styles.accordionContent}>
                      <div className={styles.changelogBox}>
                        <div className={styles.changelogHeader}>
                          <span>Changelogs</span>
                        </div>
                        <div className={styles.changelogText}>
                          {dev.changelog || 'Stability and performance enhancements.'}
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

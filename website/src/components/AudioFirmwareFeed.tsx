import React, { useState, useMemo } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import styles from './AudioFirmwareFeed.module.css';
import rawData from '../data/accessories_updates.json';
import { getTimeLag } from '../utils/time';
import type { AudioUpdateItem } from '../types/trackers';

export default function AudioFirmwareFeed(): React.JSX.Element {
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

  const latestDevice = devices[0];
  const latestLag = latestDevice?.updatedAt ? getTimeLag(latestDevice.updatedAt) + ' ago' : '—';

  const stats = [
    { label: 'LATEST UPDATE', value: latestLag },
    { label: 'AUDIO & WATCHES', value: `${devices.length}` },
  ];

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.telemetryHeader}>
        <div className={styles.systemLabel}>
          <span className={styles.feedTextPrefix}>AUDIO &amp; WATCH FIRMWARE</span>
        </div>
      </div>

      <div className={styles.statsStrip}>
        {stats.map((s, idx) => (
          <div key={idx} className={styles.statItem}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.consolePanel}>
        <div className={styles.consoleHeader}>
          <span>RECENT RELEASES</span>
        </div>
        <div className={styles.consoleBody}>
          {devices.length === 0 ? (
            <div className={styles.emptyFeed}>
              <span>NO TRACKED ACCESSORY RELEASES</span>
            </div>
          ) : (
            devices.map((dev, idx) => {
              const isExpanded = expandedId === dev.modelId;
              return (
                <div
                  key={dev.modelId}
                  className={`${styles.rowItem} ${isExpanded ? styles.rowItemExpanded : ''}`}
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
                    <span className={`${styles.timeLag} ${idx === 0 ? styles.timeLagActive : ''}`} suppressHydrationWarning>{getTimeLag(dev.updatedAt)}</span>
                    {!imgErrors[dev.modelId] ? (
                      <img
                        src={withBaseUrl(`/img/accessories/${dev.modelId}.webp`)}
                        alt={`${dev.brand} ${dev.name}`}
                        className={styles.deviceIcon}
                        width={22}
                        height={22}
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
                      <span className={styles.deviceName}>{dev.brand} {dev.name}</span>
                      <div className={styles.deviceSubline}>
                        <span className={styles.versionBadge}>v{dev.version}</span>
                        {dev.size && <span className={styles.sizePill}>{dev.size}</span>}
                      </div>
                    </div>
                    {dev.downloadUrl && (
                      <a
                        href={dev.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.downloadBtn} ${idx === 0 ? styles.downloadBtnHighlighted : ''}`}
                        title={`Download ${dev.brand} ${dev.name} v${dev.version} firmware (.bin)`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </a>
                    )}
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
                  {isExpanded && (
                    <div className={styles.changelogDrawer}>
                      {dev.changelog}
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

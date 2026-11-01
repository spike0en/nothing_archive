/**
 * Firmware release updates feed on the homepage.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import clsx from 'clsx';
import styles from './ReleaseFeed.module.css';
import { getTimeLag } from '../utils/time';
import { useScrollLight } from '../utils/useScrollLight';
import { useGitHubReleases } from '../utils/github-cache';
import type { Release } from '../utils/github-cache';

interface ChangelogsPluginData {
  changelogLinks: Record<string, string>;
}

const DEVICE_NAMES = {
  metroid: { name: 'Phone (3)', brand: 'Nothing' },
  pong: { name: 'Phone (2)', brand: 'Nothing' },
  spacewar: { name: 'Phone (1)', brand: 'Nothing' },
  froggerpro: { name: 'Phone (4a) Pro', brand: 'Nothing' },
  frogger: { name: 'Phone (4a)', brand: 'Nothing' },
  asteroids: { name: 'Phone (3a)', brand: 'Nothing' },
  asteroidspro: { name: 'Phone (3a) Pro', brand: 'Nothing' },
  pacmanpro: { name: 'Phone (2a) Plus', brand: 'Nothing' },
  pacman: { name: 'Phone (2a)', brand: 'Nothing' },
  supercontra: { name: 'Phone (4b)', brand: 'Nothing' },
  galaxian: { name: 'Phone (3a) Lite', brand: 'Nothing' },
  tetris: { name: 'CMF Phone 1', brand: 'CMF' },
  galaga: { name: 'CMF Phone 2 Pro', brand: 'CMF' },
} as const satisfies Record<string, { name: string; brand: 'Nothing' | 'CMF' }>;

function getDeviceNameInfo(codename: string): { name: string; brand: 'Nothing' | 'CMF' } | undefined {
  const key = codename.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(DEVICE_NAMES, key)) {
    // SAFETY: Key presence confirmed by hasOwnProperty guard.
    return DEVICE_NAMES[key as keyof typeof DEVICE_NAMES];
  }
  return undefined;
}

function getBuildStamp(tagName: string): string {
  const match = tagName.match(/(\d{6})-(\d{4})/);
  return match ? match[1] + match[2] : '';
}

export default function ReleaseFeed(): React.JSX.Element {
  const [consoleBodyRef, isScrolling] = useScrollLight<HTMLDivElement>();
  const { releases, totalCount: totalReleasesCount, status: statusSource, error: errorState, loading } = useGitHubReleases();
  // SAFETY: Validated by Docusaurus plugin contract
  const { changelogLinks } = usePluginData('changelogs-plugin') as ChangelogsPluginData;

  const latestReleasesPerModel = React.useMemo(() => {
    const modelMap = new Map<string, Release>();

    for (const release of releases) {
      const code = release.codename.toLowerCase();
      const existing = modelMap.get(code);

      if (!existing) {
        modelMap.set(code, release);
        continue;
      }

      const existingTime = existing.publishedAt ? new Date(existing.publishedAt).getTime() : 0;
      const candidateTime = release.publishedAt ? new Date(release.publishedAt).getTime() : 0;

      if (candidateTime > existingTime) {
        modelMap.set(code, release);
      } else if (candidateTime === existingTime) {
        const existingStamp = getBuildStamp(existing.tagName);
        const candidateStamp = getBuildStamp(release.tagName);
        if (candidateStamp > existingStamp) {
          modelMap.set(code, release);
        }
      }
    }

    return Array.from(modelMap.values()).sort((a, b) => {
      const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      if (timeA !== timeB) {
        return timeB - timeA;
      }
      const stampA = getBuildStamp(a.tagName);
      const stampB = getBuildStamp(b.tagName);
      return stampB.localeCompare(stampA);
    });
  }, [releases]);

  const totalDownloads = React.useMemo(() => {
    return releases.reduce((sum: number, r: Release) => sum + (r.downloads || 0), 0);
  }, [releases]);

  return (
    <div className={styles.container}>
      {loading && <div className={styles.loadingBar} />}

      <div className={styles.widgetHeader}>
        <div className={styles.headerTitleGroup}>
          <span className={styles.widgetTitle}>Phone Firmware</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.metricPill} title="Total builds indexed">
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
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span suppressHydrationWarning>{loading ? '—' : `${totalReleasesCount} builds`}</span>
          </span>
          <span className={styles.metricPill} title="Total downloads across all releases">
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span suppressHydrationWarning>{loading ? '—' : totalDownloads.toLocaleString()}</span>
          </span>
          {(errorState || statusSource !== 'LIVE') && (
            <span className={styles.feedStatusOffline}>
              {errorState === 'RATE_LIMITED' ? 'RATE LIMITED' : errorState ? 'ERROR' : 'OFFLINE'}
            </span>
          )}
        </div>
      </div>

      <div className={styles.consolePanel}>
        <div ref={consoleBodyRef} className={clsx(styles.consoleBody, isScrolling && styles.isScrolling)}>
          {loading ? (
            <div className={styles.consoleLine}>
              <span className={styles.statusDot} />
              <span className={styles.messageText}>Connecting telemetry feed...</span>
            </div>
          ) : errorState === 'RATE_LIMITED' ? (
            <div className={styles.errorContainer}>
              <div className={styles.errorHeader}>&gt; RATE LIMIT REACHED</div>
              <div className={styles.errorMessage}>
                GitHub API limit exceeded. Please refresh again later.
              </div>
            </div>
          ) : errorState === 'FAILED' ? (
            <div className={styles.errorContainer}>
              <div className={styles.errorHeader}>&gt; CONNECTION ERROR</div>
              <div className={styles.errorMessage}>
                Could not sync with repository. Check network connection.
              </div>
            </div>
          ) : releases.length === 0 ? (
            <div className={styles.consoleLine}>
              <span className={styles.statusDot} />
              <span className={styles.messageText}>No releases found</span>
            </div>
          ) : (
            latestReleasesPerModel.map((release, idx) => {
              const changelogKey = `${release.codename}-${release.version}`.toLowerCase();
              const changelogUrl = changelogLinks[changelogKey];
              const hasChangelog = Boolean(changelogUrl);
              const targetUrl = hasChangelog ? changelogUrl : release.htmlUrl;
              const devInfo = getDeviceNameInfo(release.codename);
              const isCmf = devInfo?.brand === 'CMF';

              return (
                <div key={release.id} className={styles.consoleLine}>
                  <Link
                    to={targetUrl}
                    target={hasChangelog ? undefined : '_blank'}
                    rel={hasChangelog ? undefined : 'noopener noreferrer'}
                    className={styles.releaseLink}
                  >
                    <span className={clsx(styles.timeLag, idx === 0 && styles.timeLagActive)} suppressHydrationWarning>
                      {getTimeLag(release.publishedAt)}
                    </span>
                    {devInfo && (
                      <span className={clsx(styles.deviceBadge, isCmf ? styles.deviceBadgeCmf : styles.deviceBadgeNothing)}>
                        {devInfo.name}
                      </span>
                    )}
                    <span className={clsx(styles.messageText, idx === 0 && styles.messageTextLatest)}>
                      <span className={idx === 0 ? styles.buildTextLatest : styles.buildText}>
                        {release.name}
                      </span>
                    </span>
                  </Link>
                  <a
                    href={release.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadIconBtn}
                    title={`Download ${release.name}`}
                    aria-label={`Download ${release.name}`}
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
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

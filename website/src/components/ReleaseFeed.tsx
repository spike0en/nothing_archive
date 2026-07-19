/**
 * @file ReleaseFeed.tsx
 * @description Component that displays the live OTA and firmware release updates feed on the homepage.
 *
 * Layer: Home page feed components.
 * Boundary: Consumes GitHub releases cache hook and Docusaurus global changelogs plugin data.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './ReleaseFeed.module.css';
import { getTimeLag } from '../utils/time';
import { useGitHubReleases } from '../utils/github-cache';
import type { Release } from '../utils/github-cache';

interface ChangelogsPluginData {
  changelogLinks: Record<string, string>;
}

/**
 * ReleaseFeed component.
 * Filters and lists latest firmware releases per device model and computes total download metrics.
 */
export default function ReleaseFeed(): React.JSX.Element {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  // Centralized GitHub data hook: deduplicated, stale-while-revalidate
  const { releases, totalCount: totalReleasesCount, status: statusSource, error: errorState, loading } = useGitHubReleases();
  const { changelogLinks } = usePluginData('changelogs-plugin') as ChangelogsPluginData;
  // Track the latest release per model.
  const latestReleasesPerModel = React.useMemo(() => {
    const seen = new Set<string>();
    const result: Release[] = [];
    
    for (const release of releases) {
      const code = release.codename.toLowerCase();
      if (!seen.has(code)) {
        seen.add(code);
        result.push(release);
      }
    }
    return result;
  }, [releases]);



  const latestRelease = releases[0] || {
    tagName: '------',
    codename: 'N/A',
    version: 'N/A',
    publishedAt: '',
    name: 'Waiting for connection...',
    htmlUrl: '',
  };

  const totalDownloads = React.useMemo(() => {
    return releases.reduce((sum, r) => sum + (r.downloads || 0), 0);
  }, [releases]);

  const numberFormatter = React.useMemo(() => new Intl.NumberFormat(currentLocale), [currentLocale]);
  const stats = [
    {
      label: translate({id: 'telemetry.release.totalReleases', message: 'TOTAL RELEASES', description: 'Release telemetry statistic label'}),
      value: loading ? '—' : numberFormatter.format(totalReleasesCount),
    },
    {
      label: translate({id: 'telemetry.release.latestAge', message: 'LATEST RELEASE AGE', description: 'Release telemetry statistic label'}),
      value: loading ? '—' : latestRelease.publishedAt ? getTimeLag(latestRelease.publishedAt, currentLocale) : '—',
    },
    {
      label: translate({id: 'telemetry.release.totalDownloads', message: 'TOTAL DOWNLOADS', description: 'Release telemetry statistic label'}),
      value: loading ? '—' : numberFormatter.format(totalDownloads),
    },
  ];

  return (
    <div className={styles.container}>

      {loading && <div className={styles.loadingBar} />}
      {/* Telemetry Header */}
      <div className={styles.telemetryHeader}>
        <div className={styles.systemLabel}>
          <span className={styles.feedTextPrefix}>{translate({id: 'telemetry.release.releases', message: 'RELEASES', description: 'Release telemetry source label'})}</span>
          {(errorState || statusSource !== 'LIVE') && (
            <span className={styles.feedStatusOffline}>
              {errorState === 'RATE_LIMITED'
                ? translate({id: 'telemetry.status.rateLimited', message: 'RATE LIMITED', description: 'Telemetry status label'})
                : errorState
                  ? translate({id: 'telemetry.status.error', message: 'ERROR', description: 'Telemetry status label'})
                  : translate({id: 'telemetry.status.offline', message: 'OFFLINE', description: 'Telemetry status label'})}
            </span>
          )}
        </div>
      </div>

      {/* Stats Strip */}
      <div className={styles.statsStrip}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.consolePanel}>
        <div className={styles.consoleHeader}>
          <span>{translate({id: 'telemetry.release.recentFactoryImages', message: 'RECENT FACTORY IMAGE RELEASES', description: 'Release telemetry panel title'})}</span>
        </div>
        <div className={styles.consoleBody}>
          {loading ? (
            <div className={styles.consoleLine}>
              <span className={styles.statusDot} />
              <span className={styles.messageText}>{translate({id: 'telemetry.connecting', message: 'CONNECTING TELEMETRY FEED...', description: 'Loading message for telemetry panels'})}</span>
            </div>
          ) : errorState === 'RATE_LIMITED' ? (
            <div className={styles.errorContainer}>
              <div className={styles.errorHeader}>&gt; {translate({id: 'telemetry.rateLimitReached', message: 'RATE LIMIT REACHED', description: 'Telemetry rate-limit error heading'})}</div>
              <div className={styles.errorMessage}>
                {translate({id: 'telemetry.rateLimitMessage', message: 'GITHUB API LIMIT EXCEEDED. PLEASE REFRESH AGAIN LATER.', description: 'Telemetry rate-limit error message'})}
              </div>
            </div>
          ) : errorState === 'FAILED' ? (
            <div className={styles.errorContainer}>
              <div className={styles.errorHeader}>&gt; {translate({id: 'telemetry.connectionError', message: 'CONNECTION ERROR', description: 'Telemetry connection error heading'})}</div>
              <div className={styles.errorMessage}>
                {translate({id: 'telemetry.connectionErrorMessage', message: 'COULD NOT SYNC WITH REPOSITORY. CHECK NETWORK CONNECTION.', description: 'Telemetry connection error message'})}
              </div>
            </div>
          ) : releases.length === 0 ? (
            <div className={styles.consoleLine}>
              <span className={styles.statusDot} />
              <span className={styles.messageText}>{translate({id: 'telemetry.release.empty', message: 'NO RELEASES FOUND', description: 'Empty state for release telemetry'})}</span>
            </div>
          ) : (
            latestReleasesPerModel.map((release, idx) => {
              const changelogKey = `${release.codename}-${release.version}`.toLowerCase();
              const changelogUrl = changelogLinks[changelogKey];
              const hasChangelog = Boolean(changelogUrl);
              const targetUrl = hasChangelog ? changelogUrl : release.htmlUrl;

              return (
                <div key={release.id} className={styles.consoleLine}>
                  <Link
                    to={targetUrl}
                    target={hasChangelog ? undefined : '_blank'}
                    rel={hasChangelog ? undefined : 'noopener noreferrer'}
                    className={styles.releaseLink}
                  >
                    <span className={`${styles.timeLag} ${idx === 0 ? styles.timeLagActive : ''}`}>{getTimeLag(release.publishedAt, currentLocale)}</span>
                    <span className={`${styles.messageText} ${idx === 0 ? styles.messageTextLatest : ''}`}>
                      <span className={idx === 0 ? styles.buildTextLatest : styles.buildText}>
                        {release.name}
                      </span>
                    </span>
                  </Link>
                  <a
                    href={release.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.githubLink} ${idx === 0 ? styles.githubLinkHighlighted : ''}`}
                    title={translate({id: 'telemetry.release.openGitHub', message: 'Open GitHub Release', description: 'Tooltip for the external release link'})}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
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

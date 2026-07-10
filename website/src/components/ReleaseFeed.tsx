import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './ReleaseFeed.module.css';
import { getTimeLag } from '../utils/time';
import { useGitHubReleases } from '../utils/github-cache';
import type { Release } from '../utils/github-cache';



// Read all changelog markdown filenames at compilation time
declare var require: any;
let availableChangelogs = new Set<string>();
try {
  const context = require.context('../../docs/changelogs', true, /\.md$/);
  context.keys().forEach((key: string) => {
    const parts = key.split('/');
    const filename = parts[parts.length - 1]; // "Metroid-B4.1-260603-1221.md"
    const nameWithoutExt = filename.replace(/\.md$/, '');
    availableChangelogs.add(nameWithoutExt.toLowerCase());
  });
} catch (e) {
  console.warn('ReleaseFeed: Failed to load changelogs context', e);
}

export default function ReleaseFeed(): React.JSX.Element {
  // Centralized GitHub data hook — deduplicated, stale-while-revalidate
  const { releases, totalCount: totalReleasesCount, status: statusSource, error: errorState, loading } = useGitHubReleases();
  const [currentTime, setCurrentTime] = useState('');
  const [blinkActive, setBlinkActive] = useState(true);
  const [timezoneMode, setTimezoneMode] = useState<'local' | 'london'>('local');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nothing_archive_releases_timezone') as 'local' | 'london';
      if (saved === 'local' || saved === 'london') {
        setTimezoneMode(saved);
      }
    }
  }, []);

  const handleToggleTimezone = () => {
    const nextMode = timezoneMode === 'local' ? 'london' : 'local';
    setTimezoneMode(nextMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nothing_archive_releases_timezone', nextMode);
    }
  };

  // Track latest release per model
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

  // Fetch time based on timezoneMode
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      if (timezoneMode === 'london') {
        timeOptions.timeZone = 'Europe/London';
      }
      const timeString = new Intl.DateTimeFormat(timezoneMode === 'london' ? 'en-GB' : undefined, timeOptions).format(now);
      
      const tzOptions: Intl.DateTimeFormatOptions = {
        timeZoneName: 'short',
      };
      if (timezoneMode === 'london') {
        tzOptions.timeZone = 'Europe/London';
      }
      const parts = new Intl.DateTimeFormat(timezoneMode === 'london' ? 'en-GB' : undefined, tzOptions).formatToParts(now);
      const tzLabel = parts.find(p => p.type === 'timeZoneName')?.value || (timezoneMode === 'london' ? 'BST' : '');
      
      setCurrentTime(`${timeString} ${tzLabel}`.trim());
      setBlinkActive(now.getSeconds() % 2 === 0);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [timezoneMode]);



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

  const stats = [
    {
      label: 'TOTAL RELEASES',
      value: loading ? '—' : `${totalReleasesCount}`,
    },
    {
      label: 'LATEST RELEASE AGE',
      value: loading ? '—' : latestRelease.publishedAt ? getTimeLag(latestRelease.publishedAt) + ' ago' : '—',
    },
    {
      label: 'TOTAL DOWNLOADS',
      value: loading ? '—' : totalDownloads.toLocaleString(),
    },
  ];

  return (
    <div className={styles.container}>
      <svg className={styles.borderSvg} aria-hidden="true">
        <rect className={clsx(styles.borderRect, mounted && styles.animated)} x="0" y="0" width="100%" height="100%" rx="14" ry="14" pathLength="100" />
      </svg>

      {loading && <div className={styles.loadingBar} />}
      {/* Telemetry Header */}
      <div className={styles.telemetryHeader}>
        <div className={styles.systemLabel}>
          <span
            className={`${styles.pulseDot} ${
              statusSource === 'LIVE' ? (blinkActive ? styles.pulseDotLive : styles.pulseDotDim) : styles.pulseDotOffline
            }`}
          />
          <span className={styles.feedTextPrefix}>RELEASES:</span>
          <span className={statusSource === 'LIVE' ? styles.feedStatusLive : styles.feedStatusOffline}>
            {errorState ? (
              errorState === 'RATE_LIMITED' ? (
                'RATE LIMITED'
              ) : (
                'ERROR'
              )
            ) : statusSource === 'LIVE' ? (
              'LIVE'
            ) : (
              'OFFLINE'
            )}
          </span>
        </div>
        <div className={styles.systemStats}>
          <div className={styles.clockContainer}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.clockIcon}
              aria-hidden="true"
              style={{ opacity: 0.6, flexShrink: 0 }}
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className={styles.timeVal}>{currentTime || '--:--:--'}</span>
            <button
              type="button"
              className={styles.tzToggleBtn}
              onClick={handleToggleTimezone}
              title={`Switch to ${timezoneMode === 'local' ? 'London' : 'Local'} Time`}
            >
              [{timezoneMode === 'local' ? 'LOCAL' : 'LONDON'}]
            </button>
          </div>
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
          <span>RECENT FACTORY IMAGE RELEASES</span>
        </div>
        <div className={styles.consoleBody}>
          {loading ? (
            <div className={styles.consoleLine}>
              <span className={styles.statusDot} />
              <span className={styles.messageText}>CONNECTING TELEMETRY FEED...</span>
            </div>
          ) : errorState === 'RATE_LIMITED' ? (
            <div className={styles.errorContainer}>
              <div className={styles.errorHeader}>&gt; RATE LIMIT REACHED</div>
              <div className={styles.errorMessage}>
                GITHUB API LIMIT EXCEEDED. PLEASE REFRESH AGAIN LATER.
              </div>
            </div>
          ) : errorState === 'FAILED' ? (
            <div className={styles.errorContainer}>
              <div className={styles.errorHeader}>&gt; CONNECTION ERROR</div>
              <div className={styles.errorMessage}>
                COULD NOT SYNC WITH REPOSITORY. CHECK NETWORK CONNECTION.
              </div>
            </div>
          ) : releases.length === 0 ? (
            <div className={styles.consoleLine}>
              <span className={styles.statusDot} />
              <span className={styles.messageText}>NO RELEASES FOUND</span>
            </div>
          ) : (
            latestReleasesPerModel.map((release, idx) => {
              const changelogKey = `${release.codename}-${release.version}`.toLowerCase();
              const hasChangelog = availableChangelogs.has(changelogKey);
              const changelogUrl = `/docs/changelogs/${release.codename.toLowerCase()}/${release.codename}-${release.version}`;
              const targetUrl = hasChangelog ? changelogUrl : release.htmlUrl;

              return (
                <Link
                  key={release.id}
                  to={targetUrl}
                  target={hasChangelog ? undefined : '_blank'}
                  rel={hasChangelog ? undefined : 'noopener noreferrer'}
                  className={styles.consoleLine}
                >
                  <span className={`${styles.timeLag} ${idx === 0 ? styles.timeLagActive : ''}`}>{getTimeLag(release.publishedAt)}</span>
                  <span className={`${styles.messageText} ${idx === 0 ? styles.messageTextLatest : ''}`}>
                    <span className={idx === 0 ? styles.buildTextLatest : styles.buildText}>
                      {release.name}
                    </span>
                  </span>
                  
                  <a
                    href={release.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.githubLink} ${idx === 0 ? styles.githubLinkHighlighted : ''}`}
                    title="Open GitHub Release"
                    onClick={(e) => e.stopPropagation()}
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
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

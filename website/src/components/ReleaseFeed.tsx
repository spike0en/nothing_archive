import React, { useState, useEffect } from 'react';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import styles from './ReleaseFeed.module.css';

declare var require: any;

export interface Release {
  id: number;
  tagName: string;
  codename: string;
  version: string;
  name: string;
  publishedAt: string;
  htmlUrl: string;
}

const CACHE_KEY = 'nothing_archive_releases_cache_v2';
const CACHE_COUNT_KEY = 'nothing_archive_releases_count_v2';
const CACHE_TIME_KEY = 'nothing_archive_releases_cache_time_v2';
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

function getTimeLag(dateStr: string): string {
  if (!dateStr) return 'N/A';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  return `${Math.max(1, mins)}m`;
}

// Read all changelog markdown filenames at compilation time
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
  const [releases, setReleases] = useState<Release[]>([]);
  const [totalReleasesCount, setTotalReleasesCount] = useState<number>(0);
  const [statusSource, setStatusSource] = useState<'LIVE' | 'OFFLINE'>('OFFLINE');
  const [errorState, setErrorState] = useState<'RATE_LIMITED' | 'FAILED' | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  // 1. Ticking London Clock (Europe/London)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat('en-GB', timeOptions).format(now);
      
      const tzOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/London',
        timeZoneName: 'short',
      };
      const parts = new Intl.DateTimeFormat('en-GB', tzOptions).formatToParts(now);
      const tzLabel = parts.find(p => p.type === 'timeZoneName')?.value || 'BST';
      
      setCurrentTime(`${timeString} ${tzLabel}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Fetch Releases (with LocalStorage Caching & Graceful API Limit Handling)
  useEffect(() => {
    async function loadReleases() {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedCount = localStorage.getItem(CACHE_COUNT_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
        const now = Date.now();

        if (cachedData && cachedTime && now - parseInt(cachedTime, 10) < CACHE_TIMEOUT) {
          const parsed = JSON.parse(cachedData);
          setReleases(parsed);
          setTotalReleasesCount(cachedCount ? parseInt(cachedCount, 10) : parsed.length);
          setStatusSource('LIVE');
          setErrorState(null);
          setLoading(false);
          return;
        }

        const response = await fetch(
          'https://api.github.com/repos/spike0en/nothing_archive/releases?per_page=100'
        );

        if (!response.ok) {
          if (response.status === 403 || response.status === 429) {
            throw new Error('RATE_LIMITED');
          }
          throw new Error('FAILED');
        }

        const rawReleases = await response.json();
        let totalCount = rawReleases.length;

        // Parse Link header to get total count if paginated
        const linkHeader = response.headers.get('Link');
        if (linkHeader) {
          const lastPageMatch = linkHeader.match(/<[^>]*[\?&]page=(\d+)[^>]*>;\s*rel="last"/);
          if (lastPageMatch) {
            const lastPage = parseInt(lastPageMatch[1], 10);
            if (lastPage > 1) {
              try {
                const lastPageResponse = await fetch(
                  `https://api.github.com/repos/spike0en/nothing_archive/releases?per_page=100&page=${lastPage}`
                );
                if (lastPageResponse.ok) {
                  const lastPageReleases = await lastPageResponse.json();
                  totalCount = (lastPage - 1) * 100 + lastPageReleases.length;
                }
              } catch (e) {
                console.warn('Failed to fetch last page of releases', e);
              }
            }
          }
        }

        const formattedReleases: Release[] = rawReleases.map((item: any) => {
          const tagName = item.tag_name || '';
          const parts = tagName.split('_');
          let codename = 'Archive';
          let version = tagName;
          if (parts.length > 1) {
            codename = parts[0];
            version = parts.slice(1).join('_');
          }

          return {
            id: item.id,
            tagName,
            codename,
            version,
            name: item.name || tagName,
            publishedAt: item.published_at || new Date().toISOString(),
            htmlUrl: item.html_url || '',
          };
        });

        if (formattedReleases.length > 0) {
          localStorage.setItem(CACHE_KEY, JSON.stringify(formattedReleases));
          localStorage.setItem(CACHE_COUNT_KEY, totalCount.toString());
          localStorage.setItem(CACHE_TIME_KEY, now.toString());
          setReleases(formattedReleases);
          setTotalReleasesCount(totalCount);
          setStatusSource('LIVE');
          setErrorState(null);
          setLoading(false);
          return;
        }

        throw new Error('FAILED');
      } catch (err: any) {
        console.warn('ReleaseFeed: Fetch failed.', err);
        setLoading(false);
        if (err.message === 'RATE_LIMITED') {
          setErrorState('RATE_LIMITED');
          setStatusSource('OFFLINE');
        } else {
          setErrorState('FAILED');
          setStatusSource('OFFLINE');
        }
      }
    }

    loadReleases();
  }, []);

  const latestRelease = releases[0] || {
    tagName: '------',
    codename: 'N/A',
    version: 'N/A',
    publishedAt: '',
    name: 'Waiting for connection...',
    htmlUrl: '',
  };

  const stats = [
    {
      label: <Translate id="homepage.releases.stat.totalReleases">TOTAL RELEASES</Translate>,
      value: loading ? '—' : `${totalReleasesCount}`,
    },
    {
      label: <Translate id="homepage.releases.stat.latestAge">LATEST RELEASE AGE</Translate>,
      value: loading ? '—' : latestRelease.publishedAt ? getTimeLag(latestRelease.publishedAt) + ' ago' : '—',
    },
  ];

  return (
    <div className={styles.container}>
      {/* Telemetry Header */}
      <div className={styles.telemetryHeader}>
        <div className={styles.systemLabel}>
          <span
            className={`${styles.pulseDot} ${
              statusSource === 'LIVE' ? styles.pulseDotLive : styles.pulseDotOffline
            }`}
          />
          <span className={styles.feedTextPrefix}>
            <Translate id="homepage.releases.feedLabel">RELEASES FEED:</Translate>{' '}
          </span>
          <span className={statusSource === 'LIVE' ? styles.feedStatusLive : styles.feedStatusOffline}>
            {errorState ? (
              errorState === 'RATE_LIMITED' ? (
                <Translate id="homepage.releases.feedRateLimited">Rate Limited</Translate>
              ) : (
                <Translate id="homepage.releases.feedError">Error</Translate>
              )
            ) : statusSource === 'LIVE' ? (
              <Translate id="homepage.releases.feedLive">Live</Translate>
            ) : (
              <Translate id="homepage.releases.feedOffline">Offline</Translate>
            )}
          </span>
        </div>
        <div className={styles.systemStats}>
          <div>
            <Translate id="homepage.releases.timeLabel">TIME:</Translate>{' '}
            <span>{currentTime || '--:--:--'}</span>
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

      {/* Recent Releases Console Panel */}
      <div className={styles.consolePanel}>
        <div className={styles.consoleHeader}>
          <span>
            <Translate id="homepage.releases.consoleTitle">RECENT FACTORY IMAGE RELEASES</Translate>
          </span>
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
            releases.slice(0, 10).map((release, idx) => {
              const changelogKey = `${release.codename}-${release.version}`.toLowerCase();
              const hasChangelog = availableChangelogs.has(changelogKey);
              const changelogUrl = `/docs/changelogs/${release.codename.toLowerCase()}/${release.codename}-${release.version}`;
              const targetUrl = hasChangelog ? changelogUrl : release.htmlUrl;
              const isExternal = !hasChangelog;

              return (
                <Link
                  key={release.id}
                  to={targetUrl}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={styles.consoleLine}
                >
                  <span className={`${styles.statusDot} ${idx === 0 ? styles.statusDotActive : ''}`} />
                  <span className={styles.timeLag}>{getTimeLag(release.publishedAt)}</span>
                  <span className={styles.messageText}>{release.name}</span>
                  
                  {hasChangelog ? (
                    <span className={styles.changelogLink}>
                      <Translate id="homepage.releases.changelog">Changelog</Translate>
                    </span>
                  ) : (
                    <span className={styles.changelogUnavailable}>
                      <Translate id="homepage.releases.changelogUnavailable">Unavailable</Translate>
                    </span>
                  )}
                  
                  <span className={styles.arrowIcon}>→</span>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

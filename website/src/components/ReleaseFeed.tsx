import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './ReleaseFeed.module.css';
import { getTimeLag } from '../utils/time';

declare var require: any;

export interface Release {
  id: number;
  tagName: string;
  codename: string;
  version: string;
  name: string;
  publishedAt: string;
  htmlUrl: string;
  downloads?: number;
}

const CACHE_KEY = 'nothing_archive_releases_cache_v2';
const CACHE_COUNT_KEY = 'nothing_archive_releases_count_v2';
const CACHE_TIME_KEY = 'nothing_archive_releases_cache_time_v2';
const CACHE_TIMEOUT = 5 * 60 * 1000;

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
  const [blinkActive, setBlinkActive] = useState(true);

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

  // Fetch time in Europe/London timezone
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
      setBlinkActive(now.getSeconds() % 2 === 0);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch releases from GitHub API with cache fallback
  useEffect(() => {
    async function loadReleases() {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedCount = localStorage.getItem(CACHE_COUNT_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
        const now = Date.now();

        if (cachedData && cachedTime && now - parseInt(cachedTime, 10) < CACHE_TIMEOUT) {
          const parsed = JSON.parse(cachedData);
          const hasDownloads = parsed.length === 0 || parsed[0].downloads !== undefined;
          if (hasDownloads) {
            setReleases(parsed);
            setTotalReleasesCount(cachedCount ? parseInt(cachedCount, 10) : parsed.length);
            setStatusSource('LIVE');
            setErrorState(null);
            setLoading(false);
            return;
          }
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

          const downloads = item.assets
            ? item.assets.reduce((sum: number, asset: any) => sum + (asset.download_count || 0), 0)
            : 0;

          return {
            id: item.id,
            tagName,
            codename,
            version,
            name: item.name || tagName,
            publishedAt: item.published_at || new Date().toISOString(),
            htmlUrl: item.html_url || '',
            downloads,
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

      {loading && <div className={styles.loadingBar} />}
      {/* Telemetry Header */}
      <div className={styles.telemetryHeader}>
        <div className={styles.systemLabel}>
          <span
            className={`${styles.pulseDot} ${
              statusSource === 'LIVE' ? (blinkActive ? styles.pulseDotLive : styles.pulseDotDim) : styles.pulseDotOffline
            }`}
          />
          <span className={styles.feedTextPrefix}>RELEASES FEED:</span>
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
          <div>
            TIME: <span>{currentTime || '--:--:--'}</span>
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

              return (
                <div key={release.id} className={styles.consoleLine}>
                  <span className={`${styles.timeLag} ${idx === 0 ? styles.timeLagActive : ''}`}>{getTimeLag(release.publishedAt)}</span>
                  <span className={styles.messageText}>
                    {hasChangelog ? (
                      <Link
                        to={changelogUrl}
                        className={`${styles.buildLink} ${idx === 0 ? styles.buildTextLatest : ''}`}
                      >
                        {release.name}
                      </Link>
                    ) : (
                      <span className={`${styles.buildText} ${idx === 0 ? styles.buildTextLatest : ''}`}>
                        {release.name}
                      </span>
                    )}
                  </span>
                  
                  <a
                    href={release.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.githubLink} ${idx === 0 ? styles.githubLinkHighlighted : ''}`}
                    title="Open GitHub Release"
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

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './CommitMatrix.module.css';
import { getTimeLag } from '../utils/time';
import { useGitHubCommits, useGitHubRepoStats } from '../utils/github-cache';
import type { Commit } from '../utils/github-cache';


interface HitsState {
  hits: number;
}

const HITS_CACHE_KEY = 'nothing_archive_hits_v1';
const HITS_CACHE_TIME_KEY = 'nothing_archive_hits_time_v1';
const HITS_CACHE_TIMEOUT = 15 * 60 * 1000;

export default function CommitMatrix(): React.JSX.Element {
  // Centralized GitHub data hooks — deduplicated, stale-while-revalidate
  const { commits, status: commitStatus, error: commitError, loading: commitLoading } = useGitHubCommits();
  const { stats: repoStats, loading: statsGhLoading } = useGitHubRepoStats();

  const statusSource = commitStatus;
  const errorState = commitError;
  const loading = commitLoading;

  // hitscounter.dev is not a GitHub API — kept as a separate inline fetch
  const [hitsData, setHitsData] = useState<HitsState>({ hits: 0 });
  const [hitsLoading, setHitsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [blinkActive, setBlinkActive] = useState(true);
  const [timezoneMode, setTimezoneMode] = useState<'local' | 'london'>('local');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nothing_archive_repo_timezone') as 'local' | 'london';
      if (saved === 'local' || saved === 'london') {
        setTimezoneMode(saved);
      }
    }
  }, []);

  const handleToggleTimezone = () => {
    const nextMode = timezoneMode === 'local' ? 'london' : 'local';
    setTimezoneMode(nextMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nothing_archive_repo_timezone', nextMode);
    }
  };

  const filteredCommits = React.useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return commits.filter(commit => new Date(commit.date).getTime() >= sevenDaysAgo);
  }, [commits]);

  // Update local time and handle pulse blink
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
      const timeString = new Intl.DateTimeFormat(undefined, timeOptions).format(now);
      
      const tzOptions: Intl.DateTimeFormatOptions = {
        timeZoneName: 'short',
      };
      if (timezoneMode === 'london') {
        tzOptions.timeZone = 'Europe/London';
      }
      const parts = new Intl.DateTimeFormat(undefined, tzOptions).formatToParts(now);
      const tzLabel = parts.find(p => p.type === 'timeZoneName')?.value || (timezoneMode === 'london' ? 'BST' : '');
      
      setCurrentTime(`${timeString} ${tzLabel}`.trim());
      setBlinkActive(now.getSeconds() % 2 === 0);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [timezoneMode]);

  // Fetch hitscounter.dev visitor count (not a GitHub API — kept separate)
  useEffect(() => {
    async function loadHits() {
      try {
        const cachedData = localStorage.getItem(HITS_CACHE_KEY);
        const cachedTime = localStorage.getItem(HITS_CACHE_TIME_KEY);
        const now = Date.now();

        if (cachedData && cachedTime && now - parseInt(cachedTime, 10) < HITS_CACHE_TIMEOUT) {
          setHitsData(JSON.parse(cachedData));
          setHitsLoading(false);
          return;
        }

        const hitsRes = await fetch(
          'https://hitscounter.dev/api/hit?output=json&url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive'
        );

        let hits = 0;
        if (hitsRes.ok) {
          const data = await hitsRes.json();
          hits = data.total_hits || 0;
        } else {
          const old = cachedData ? JSON.parse(cachedData) : null;
          hits = old ? old.hits : 0;
        }

        const newHits = { hits };
        localStorage.setItem(HITS_CACHE_KEY, JSON.stringify(newHits));
        localStorage.setItem(HITS_CACHE_TIME_KEY, now.toString());
        setHitsData(newHits);
        setHitsLoading(false);
      } catch (err) {
        console.warn('loadHits failed', err);
        setHitsLoading(false);
      }
    }

    loadHits();
  }, []);

  const latestCommit = commits[0] || { sha: '------', author: 'N/A', coAuthors: [], date: '', message: 'Waiting for connection...' };

  const stats = [
    {
      label: 'LAST COMMIT',
      value: loading ? '—' : latestCommit.date ? getTimeLag(latestCommit.date) + ' ago' : '—',
    },
    {
      label: 'STARS',
      value: statsGhLoading ? '—' : repoStats.stars.toLocaleString(),
    },
    {
      label: 'VISITORS',
      value: hitsLoading ? '—' : hitsData.hits.toLocaleString(),
    },
  ];

  /**
   * Formats the author display for a commit row.
   * Shows "Author" alone, or "Author +N" when co-authors are present.
   */
  const formatAuthors = (commit: Commit, isLatest: boolean): React.JSX.Element => {
    const authorClass = `${styles.authorTag} ${isLatest ? styles.authorLatest : ''}`;
    if (commit.coAuthors.length === 0) {
      return <span className={authorClass}>{commit.author}</span>;
    }

    const tooltip = [commit.author, ...commit.coAuthors].join(', ');
    return (
      <span className={authorClass} title={tooltip}>
        {commit.author}
        <span className={styles.coAuthorBadge}>+{commit.coAuthors.length}</span>
      </span>
    );
  };

  const isProgressLoading = loading || statsGhLoading || hitsLoading;

  return (
    <div className={styles.container}>

      {isProgressLoading && <div className={styles.loadingBar} />}
      {/* Telemetry Header */}
      <div className={styles.telemetryHeader}>
        <div className={styles.systemLabel}>
          <span className={`${styles.pulseDot} ${statusSource === 'LIVE' ? (blinkActive ? styles.pulseDotLive : styles.pulseDotDim) : styles.pulseDotOffline}`} />
          <span className={styles.feedTextPrefix}>REPO:</span>
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

      {/* Recent Changes — full width */}
      <div className={styles.consolePanel}>
        <div className={styles.consoleHeader}>
          <span>RECENT CHANGES</span>
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
          ) : commits.length === 0 ? (
            <div className={styles.consoleLine}>
              <span className={styles.statusDot} />
              <span className={styles.messageText}>NO COMMITS FOUND</span>
            </div>
          ) : filteredCommits.length === 0 ? (
            <div className={styles.consoleLine}>
              <span className={styles.statusDot} />
              <span className={styles.messageText}>NO CHANGES IN THE LAST 7 DAYS</span>
            </div>
          ) : (
            filteredCommits.map((commit, idx) => {
              const isLatest = idx === 0;
              return (
                <a
                  key={commit.sha}
                  href={`https://github.com/spike0en/nothing_archive/commit/${commit.sha}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.consoleLine}
                >
                  <span className={`${styles.timeLag} ${isLatest ? styles.timeLagActive : ''}`}>{getTimeLag(commit.date)}</span>
                  {formatAuthors(commit, isLatest)}
                  <span className={`${styles.messageText} ${isLatest ? styles.messageTextLatest : ''}`}>{commit.message}</span>
                  <span className={`${styles.shaTag} ${isLatest ? styles.shaLatest : ''}`}>{commit.sha}</span>
                </a>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

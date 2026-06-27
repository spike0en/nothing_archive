import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './CommitMatrix.module.css';
import { getTimeLag } from '../utils/time';
import TorxScrew from './TorxScrew';

interface Commit {
  sha: string;
  author: string;
  coAuthors: string[];
  date: string;
  message: string;
}

interface RepoStats {
  stars: number;
  hits: number;
}

const CACHE_KEY = 'nothing_archive_commits_cache_v2';
const CACHE_TIME_KEY = 'nothing_archive_commits_cache_time_v2';
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

const STATS_CACHE_KEY = 'nothing_archive_repo_stats_v1';
const STATS_CACHE_TIME_KEY = 'nothing_archive_repo_stats_time_v1';

/**
 * Extracts co-author names from a full commit message body.
 * Parses `Co-authored-by: Name <email>` trailers that GitHub auto-adds on squash merges.
 */
function parseCoAuthors(fullMessage: string): string[] {
  if (!fullMessage) return [];
  const coAuthorRegex = /Co-authored-by:\s*(.+?)\s*<[^>]*>/gi;
  const names: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = coAuthorRegex.exec(fullMessage)) !== null) {
    const name = match[1].trim();
    if (name) names.push(name);
  }
  return names;
}

export default function CommitMatrix(): React.JSX.Element {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [statusSource, setStatusSource] = useState<'LIVE' | 'OFFLINE'>('OFFLINE');
  const [errorState, setErrorState] = useState<'RATE_LIMITED' | 'FAILED' | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [blinkActive, setBlinkActive] = useState(true);

  const [repoStats, setRepoStats] = useState<RepoStats>({ stars: 0, hits: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  // 1. Ticking Local Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(undefined, timeOptions).format(now);
      
      const tzOptions: Intl.DateTimeFormatOptions = {
        timeZoneName: 'short',
      };
      const parts = new Intl.DateTimeFormat(undefined, tzOptions).formatToParts(now);
      const tzLabel = parts.find(p => p.type === 'timeZoneName')?.value || '';
      
      setCurrentTime(`${timeString} ${tzLabel}`.trim());
      setBlinkActive(now.getSeconds() % 2 === 0);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Fetch Repository Commits (with LocalStorage Caching & Graceful API Limit Handling)
  useEffect(() => {
    async function loadCommits() {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
        const now = Date.now();

        if (cachedData && cachedTime && now - parseInt(cachedTime, 10) < CACHE_TIMEOUT) {
          const parsed = JSON.parse(cachedData);
          setCommits(parsed);
          setStatusSource('LIVE');
          setErrorState(null);
          setLoading(false);
          return;
        }

        const response = await fetch(
          'https://api.github.com/repos/spike0en/nothing_archive/commits?per_page=100'
        );

        if (!response.ok) {
          if (response.status === 403 || response.status === 429) {
            throw new Error('RATE_LIMITED');
          }
          throw new Error('FAILED');
        }

        const rawCommits = await response.json();

        const formattedCommits: Commit[] = rawCommits.map((item: any) => {
          const fullMessage = item.commit.message || '';
          const author = item.commit.author?.name || item.author?.login || 'Contributor';
          const coAuthors = parseCoAuthors(fullMessage).filter(name => name !== author);

          return {
            sha: item.sha.substring(0, 7),
            author,
            coAuthors,
            date: item.commit.author?.date || new Date().toISOString(),
            message: fullMessage.split('\n')[0] || 'Code updates',
          };
        });

        if (formattedCommits.length > 0) {
          localStorage.setItem(CACHE_KEY, JSON.stringify(formattedCommits));
          localStorage.setItem(CACHE_TIME_KEY, now.toString());
          setCommits(formattedCommits);
          setStatusSource('LIVE');
          setErrorState(null);
          setLoading(false);
          return;
        }

        throw new Error('FAILED');

      } catch (err: any) {
        console.warn('CommitMatrix: Fetch failed.', err);
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

    loadCommits();
  }, []);

  // 3. Fetch Stars and Hits Count (with caching and Promise.allSettled safety)
  useEffect(() => {
    async function loadStats() {
      try {
        const cachedData = localStorage.getItem(STATS_CACHE_KEY);
        const cachedTime = localStorage.getItem(STATS_CACHE_TIME_KEY);
        const now = Date.now();

        if (cachedData && cachedTime && now - parseInt(cachedTime, 10) < CACHE_TIMEOUT) {
          setRepoStats(JSON.parse(cachedData));
          setStatsLoading(false);
          return;
        }

        const [repoRes, hitsRes] = await Promise.allSettled([
          fetch('https://api.github.com/repos/spike0en/nothing_archive'),
          fetch('https://hitscounter.dev/api/hit?output=json&url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive')
        ]);

        let stars = 0;
        let hits = 0;

        if (repoRes.status === 'fulfilled' && repoRes.value.ok) {
          const data = await repoRes.value.json();
          stars = data.stargazers_count || 0;
        } else {
          const old = cachedData ? JSON.parse(cachedData) : null;
          stars = old ? old.stars : 0;
        }

        if (hitsRes.status === 'fulfilled' && hitsRes.value.ok) {
          const data = await hitsRes.value.json();
          hits = data.total_hits || 0;
        } else {
          const old = cachedData ? JSON.parse(cachedData) : null;
          hits = old ? old.hits : 0;
        }

        const newStats = { stars, hits };
        localStorage.setItem(STATS_CACHE_KEY, JSON.stringify(newStats));
        localStorage.setItem(STATS_CACHE_TIME_KEY, now.toString());
        setRepoStats(newStats);
        setStatsLoading(false);
      } catch (err) {
        console.warn('loadStats failed', err);
        setStatsLoading(false);
      }
    }

    loadStats();
  }, []);

  const latestCommit = commits[0] || { sha: '------', author: 'N/A', coAuthors: [], date: '', message: 'Waiting for connection...' };

  const stats = [
    {
      label: 'LAST COMMIT',
      value: loading ? '—' : latestCommit.date ? getTimeLag(latestCommit.date) + ' ago' : '—',
    },
    {
      label: 'STARS',
      value: statsLoading ? '—' : repoStats.stars.toLocaleString(),
    },
    {
      label: 'VISITORS',
      value: statsLoading ? '—' : repoStats.hits.toLocaleString(),
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

  const isProgressLoading = loading || statsLoading;

  return (
    <div className={styles.container}>
      {/* Corner Torx Screws */}
      <TorxScrew className={clsx(styles.screw, styles.screwTopLeft)} rotation={45} />
      <TorxScrew className={clsx(styles.screw, styles.screwTopRight)} rotation={120} />
      <TorxScrew className={clsx(styles.screw, styles.screwBottomLeft)} rotation={80} />
      <TorxScrew className={clsx(styles.screw, styles.screwBottomRight)} rotation={20} />
      {isProgressLoading && <div className={styles.loadingBar} />}
      {/* Telemetry Header */}
      <div className={styles.telemetryHeader}>
        <div className={styles.systemLabel}>
          <span className={`${styles.pulseDot} ${statusSource === 'LIVE' ? (blinkActive ? styles.pulseDotLive : styles.pulseDotDim) : styles.pulseDotOffline}`} />
          <span className={styles.feedTextPrefix}>REPO FEED:</span>
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
          ) : (
            commits.slice(0, 20).map((commit, idx) => {
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

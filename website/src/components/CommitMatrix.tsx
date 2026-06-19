import React, { useState, useEffect } from 'react';
import styles from './CommitMatrix.module.css';

interface Commit {
  sha: string;
  author: string;
  coAuthors: string[];
  date: string;
  message: string;
}

const CACHE_KEY = 'nothing_archive_commits_cache_v2';
const CACHE_TIME_KEY = 'nothing_archive_commits_cache_time_v2';
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Calculates a clean relative time difference string (e.g. 3m, 2h, 4d).
 */
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

  // 1. Ticking IST Clock (Asia/Kolkata)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat('en-IN', timeOptions).format(now);
      
      const tzOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        timeZoneName: 'short',
      };
      const parts = new Intl.DateTimeFormat('en-IN', tzOptions).formatToParts(now);
      const tzLabel = parts.find(p => p.type === 'timeZoneName')?.value || 'IST';
      
      setCurrentTime(`${timeString} ${tzLabel}`);
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

  // --- Derived stats from commits ---

  const now = new Date();
  const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  // Commits in the last 30 days
  const commits30d = commits.filter(c => {
    const d = new Date(c.date);
    const dUTC = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    const diffDays = Math.round((todayStart.getTime() - dUTC.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays < 30;
  });

  // Unique contributors in the last 30 days (authors + co-authors)
  const contributors30d = (() => {
    const nameSet = new Set<string>();
    commits30d.forEach(c => {
      nameSet.add(c.author);
      c.coAuthors.forEach(ca => nameSet.add(ca));
    });
    return nameSet.size;
  })();

  const latestCommit = commits[0] || { sha: '------', author: 'N/A', coAuthors: [], date: '', message: 'Waiting for connection...' };

  /**
   * Formats the author display for a commit row.
   * Shows "Author" alone, or "Author +N" when co-authors are present.
   */
  const formatAuthors = (commit: Commit): React.JSX.Element => {
    if (commit.coAuthors.length === 0) {
      return <span className={styles.authorTag}>{commit.author}</span>;
    }

    const tooltip = [commit.author, ...commit.coAuthors].join(', ');
    return (
      <span className={styles.authorTag} title={tooltip}>
        {commit.author}
        <span className={styles.coAuthorBadge}>+{commit.coAuthors.length}</span>
      </span>
    );
  };

  const stats = [
    {
      label: 'LAST COMMIT',
      value: loading ? '—' : latestCommit.date ? getTimeLag(latestCommit.date) + ' ago' : '—',
    },
  ];

  return (
    <div className={styles.container}>
      {/* Telemetry Header */}
      <div className={styles.telemetryHeader}>
        <div className={styles.systemLabel}>
          <span className={`${styles.pulseDot} ${statusSource === 'LIVE' ? styles.pulseDotLive : styles.pulseDotOffline}`} />
          <span className={styles.feedTextPrefix}>COMMITS FEED: </span>
          <span className={statusSource === 'LIVE' ? styles.feedStatusLive : styles.feedStatusOffline}>
            {errorState ? (
              errorState === 'RATE_LIMITED' ? (
                'Rate Limited'
              ) : (
                'Error'
              )
            ) : statusSource === 'LIVE' ? (
              'Live'
            ) : (
              'Offline'
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
          <span>ID: {latestCommit.sha || '------'}</span>
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
            commits.slice(0, 20).map((commit, idx) => (
              <a
                key={commit.sha}
                href={`https://github.com/spike0en/nothing_archive/commit/${commit.sha}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.consoleLine}
              >
                <span className={`${styles.statusDot} ${idx === 0 ? styles.statusDotActive : ''}`} />
                <span className={styles.timeLag}>{getTimeLag(commit.date)}</span>
                {formatAuthors(commit)}
                <span className={styles.messageText}>{commit.message}</span>
                <span className={styles.shaTag}>{commit.sha}</span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

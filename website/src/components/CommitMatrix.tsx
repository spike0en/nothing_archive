import React, { useState, useEffect } from 'react';
import Translate from '@docusaurus/Translate';
import styles from './CommitMatrix.module.css';

interface Commit {
  sha: string;
  author: string;
  date: string;
  message: string;
}

const CACHE_KEY = 'nothing_archive_commits_cache';
const CACHE_TIME_KEY = 'nothing_archive_commits_cache_time';
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

export default function CommitMatrix(): React.JSX.Element {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [statusSource, setStatusSource] = useState<'LIVE' | 'OFFLINE'>('OFFLINE');
  const [errorState, setErrorState] = useState<'RATE_LIMITED' | 'FAILED' | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [glyphFrame, setGlyphFrame] = useState(0);

  // 1. Ticking Local System Clock with Timezone abbreviation (e.g. IST)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0];
      const tzMatch = now.toTimeString().match(/\(([^)]+)\)/);
      let tzLabel = '';
      if (tzMatch) {
        const tzFull = tzMatch[1];
        if (tzFull.length <= 5) {
          tzLabel = tzFull;
        } else {
          // Extract acronym (e.g. India Standard Time -> IST)
          const acronym = tzFull.split(' ').map(w => w[0]).join('').replace(/[^A-Za-z]/g, '').toUpperCase();
          tzLabel = acronym.length >= 2 ? acronym : tzFull;
        }
      } else {
        tzLabel = now.toTimeString().split(' ')[1] || '';
      }
      setCurrentTime(tzLabel ? `${timeString} ${tzLabel}` : timeString);
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

        // Check cache validity
        if (cachedData && cachedTime && now - parseInt(cachedTime, 10) < CACHE_TIMEOUT) {
          const parsed = JSON.parse(cachedData);
          setCommits(parsed);
          setStatusSource('LIVE');
          setErrorState(null);
          setLoading(false);
          return;
        }

        // Fetch fresh logs from GitHub
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
        
        // Clean and map raw commits
        const formattedCommits: Commit[] = rawCommits.map((item: any) => ({
          sha: item.sha.substring(0, 7),
          author: item.commit.author?.name || item.author?.login || 'Contributor',
          date: item.commit.author?.date || new Date().toISOString(),
          message: item.commit.message?.split('\n')[0] || 'Code updates'
        }));

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

  // 3. Glyph Panel LED animation loop (100ms ticks)
  useEffect(() => {
    const glyphInterval = setInterval(() => {
      setGlyphFrame(prev => prev + 1);
    }, 100);
    return () => clearInterval(glyphInterval);
  }, []);

  // 4. Calculate Activity Graph Columns (Last 30 days)
  const columnsCount = 30;
  const rowsCount = 12;
  const activityData = new Array(columnsCount).fill(0);
  const now = new Date();

  // Sort commits into daily bins based on calendar days in UTC timezone
  const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  
  commits.forEach(commit => {
    const commitDate = new Date(commit.date);
    const commitUTC = new Date(Date.UTC(commitDate.getUTCFullYear(), commitDate.getUTCMonth(), commitDate.getUTCDate()));
    const diffTime = todayStart.getTime() - commitUTC.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 0 && diffDays < columnsCount) {
      activityData[columnsCount - 1 - diffDays]++;
    }
  });

  // Scale commit frequency counts into dot-rows count
  // 0 commits -> 1 dot (inactive baseline)
  // 1 commit  -> 3 dots
  // 2 commits -> 5 dots
  // 3+ commits -> 8 dots
  const getDotCount = (commitCount: number) => {
    return Math.min(commitCount, rowsCount);
  };

  const getTimelineDates = () => {
    const dates = [];
    for (let i = 0; i < columnsCount; i++) {
      const date = new Date(now);
      date.setUTCDate(now.getUTCDate() - (columnsCount - 1 - i));
      dates.push(date);
    }
    return dates;
  };

  const timelineDates = getTimelineDates();

  // Helper to format date string for tooltip in UTC
  const formatTooltipDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  };

  // Click handler to filter commits by UTC calendar day
  const handleColumnClick = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const url = `https://github.com/spike0en/nothing_archive/commits?since=${dateStr}&until=${dateStr}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // 5. Render animated glyph pattern calculations (RSS feed / radar broadcast waves)
  const isGlyphDotActive = (x: number, y: number): boolean => {
    // Bottom-left origin dot at (1, 8)
    const ox = 1;
    const oy = 8;
    
    if (x === ox && y === oy) {
      return true;
    }
    
    const dx = x - ox;
    const dy = oy - y; // dy is positive upwards
    
    // We only propagate in the quadrant from bottom-left to top-right (dx >= 0 and dy >= 0)
    if (dx >= 0 && dy >= 0) {
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1.2) {
        // Sine wave propagating outwards.
        // Adjust speed (0.35) and wavelength (frequency 1.2) to feel organic.
        const val = Math.sin(dist * 1.2 - glyphFrame * 0.35);
        return val > 0.55;
      }
    }
    
    return false;
  };

  const latestCommit = commits[0] || { sha: '------', author: 'N/A', date: '', message: 'Waiting for connection...' };

  return (
    <div className={styles.container}>
      {/* Telemetry Header */}
      <div className={styles.telemetryHeader}>
        <div className={styles.systemLabel}>
          <span className={`${styles.pulseDot} ${statusSource === 'LIVE' ? styles.pulseDotLive : styles.pulseDotOffline}`} />
          <span className={styles.feedTextPrefix}>
            <Translate id="homepage.matrix.feedLabel">FEED:</Translate>{' '}
          </span>
          <span className={statusSource === 'LIVE' ? styles.feedStatusLive : styles.feedStatusOffline}>
            {errorState ? (
              errorState === 'RATE_LIMITED' ? (
                <Translate id="homepage.matrix.feedRateLimited">Rate Limited</Translate>
              ) : (
                <Translate id="homepage.matrix.feedError">Error</Translate>
              )
            ) : statusSource === 'LIVE' ? (
              <Translate id="homepage.matrix.feedLive">Live</Translate>
            ) : (
              <Translate id="homepage.matrix.feedOffline">Offline</Translate>
            )}
          </span>
        </div>
        <div className={styles.systemStats}>
          <div>
            <Translate id="homepage.matrix.timeLabel">TIME:</Translate>{' '}
            <span>{currentTime || '--:--:--'}</span>
          </div>
        </div>
      </div>

      <div className={styles.dashboard}>
        {/* Glyph LED Panel (Left) */}
        <div className={styles.glyphPanel}>
          <div className={styles.glyphGrid} aria-hidden="true">
            {Array.from({ length: 10 }).map((_, y) => (
              <React.Fragment key={y}>
                {Array.from({ length: 10 }).map((_, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`${styles.glyphDot} ${
                      isGlyphDotActive(x, y) ? styles.glyphDotActive : ''
                    }`}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className={styles.glyphLabel}>
            <Translate id="homepage.matrix.glyphLabel">ACTIVITY FEED</Translate>
          </div>
        </div>

        {/* Frequency Graph Grid (Center) */}
        <div className={styles.graphPanel}>
          <h2 className={styles.graphTitle}>
            <Translate id="homepage.matrix.graphTitle">ACTIVITY GRID (30D)</Translate>
          </h2>
          <div className={styles.matrixGrid}>
            {activityData.map((count, colIdx) => {
              const activeDots = getDotCount(count);
              const columnDate = timelineDates[colIdx];
              return (
                <div 
                  key={colIdx} 
                  className={styles.matrixColumn}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleColumnClick(columnDate)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleColumnClick(columnDate);
                    }
                  }}
                  aria-label={`View commits for ${formatTooltipDate(columnDate)}`}
                >
                  {Array.from({ length: rowsCount }).map((_, dotIdx) => {
                    const isActive = dotIdx < activeDots;
                    
                    let dotClass = styles.matrixDot;
                    if (isActive) {
                      dotClass += ` ${styles.matrixDotActive}`;
                    }
                    
                    return <div key={dotIdx} className={dotClass} />;
                  })}
                  
                  {/* Custom Monospace Tooltip */}
                  <div className={styles.tooltip}>
                    {formatTooltipDate(columnDate)}: {count} {count === 1 ? 'commit' : 'commits'}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.timelineLabels}>
            <span>30 <Translate id="homepage.matrix.daysAgo">DAYS AGO</Translate></span>
            <span><Translate id="homepage.matrix.today">TODAY</Translate></span>
          </div>
        </div>

        {/* Console/Terminal Information Output (Right) */}
        <div className={styles.consolePanel}>
          <div className={styles.consoleHeader}>
            <span><Translate id="homepage.matrix.consoleTitle">RECENT CHANGES</Translate></span>
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
              commits.slice(0, 10).map((commit, idx) => (
                <div key={commit.sha} className={styles.consoleLine}>
                  <span className={`${styles.statusDot} ${idx === 0 ? styles.statusDotActive : ''}`} />
                  <span className={styles.timeLag}>{getTimeLag(commit.date)}</span>
                  <span className={styles.authorTag}>{commit.author}</span>
                  <span className={styles.messageText}>{commit.message}</span>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

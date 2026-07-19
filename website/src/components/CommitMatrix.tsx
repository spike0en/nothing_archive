/**
 * @file CommitMatrix.tsx
 * @description Component that displays commit statistics, stargazers, page visitor hits, 
 * and a list of recent commits to the repository.
 * 
 * Layer: Home page metadata components.
 * Boundary: Reads GitHub stats/commits hooks and local visitor API, renders local HTML structure.
 */

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

/**
 * CommitMatrix component.
 * Fetches hitscounter data, filters recent commits, and formats authors for display.
 */
export default function CommitMatrix(): React.JSX.Element {
  // Centralized GitHub data hooks: deduplicated, stale-while-revalidate
  const { commits, status: commitStatus, error: commitError, loading: commitLoading } = useGitHubCommits();
  const { stats: repoStats, loading: statsGhLoading } = useGitHubRepoStats();

  const statusSource = commitStatus;
  const errorState = commitError;
  const loading = commitLoading;

  // hitscounter.dev is not a GitHub API; kept as a separate inline fetch
  const [hitsData, setHitsData] = useState<HitsState>({ hits: 0 });
  const [hitsLoading, setHitsLoading] = useState(true);

  const filteredCommits = React.useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return commits.filter(commit => new Date(commit.date).getTime() >= sevenDaysAgo);
  }, [commits]);

  // Fetch hitscounter.dev visitor count (not a GitHub API; kept separate)
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
      label: 'VIEWS',
      value: hitsLoading ? '—' : hitsData.hits.toLocaleString(),
    },
  ];

  /**
   * Formats the author list inline for a commit entry. Primary and co-authors are rendered
   * inline to ensure direct visibility and attribution for all contributors in the commit log.
   */
  const formatAuthors = (commit: Commit, isLatest: boolean): React.JSX.Element => {
    const authorClass = clsx(styles.authorTag, isLatest && styles.authorLatest);
    if (commit.coAuthors.length === 0) {
      return (
        <span className={styles.authorsWrapper}>
          <span className={authorClass} title={commit.author}>{commit.author}</span>
        </span>
      );
    }

    const allAuthors = [commit.author, ...commit.coAuthors];
    const tooltip = allAuthors.join(', ');
    return (
      <span className={styles.authorsWrapper} title={tooltip}>
        {allAuthors.map((author, index) => {
          const isLast = index === allAuthors.length - 1;
          let separator: React.JSX.Element | null = null;
          if (index > 0) {
            if (isLast) {
              separator = <span className={styles.coAuthorSeparator}> &amp; </span>;
            } else {
              separator = <span className={styles.coAuthorSeparator}>, </span>;
            }
          }
          return (
            <React.Fragment key={author}>
              {separator}
              <span className={authorClass}>{author}</span>
            </React.Fragment>
          );
        })}
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
          <span className={styles.feedTextPrefix}>REPO</span>
          {(errorState || statusSource !== 'LIVE') && (
            <span className={styles.feedStatusOffline}>
              {errorState === 'RATE_LIMITED' ? 'RATE LIMITED' : errorState ? 'ERROR' : 'OFFLINE'}
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

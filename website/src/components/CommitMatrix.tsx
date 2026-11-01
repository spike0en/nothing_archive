import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import styles from './CommitMatrix.module.css';
import { getTimeLag } from '../utils/time';
import { useScrollLight } from '../utils/useScrollLight';
import { useGitHubCommits, useGitHubRepoStats } from '../utils/github-cache';
import type { Commit } from '../utils/github-cache';
import contributorsData from '../data/contributors.json';
import contributorMetadata from '../data/contributor-metadata.json';

interface HitsState {
  hits: number;
}

const HITS_CACHE_KEY = 'nothing_archive_hits_v1';
const HITS_CACHE_TIME_KEY = 'nothing_archive_hits_time_v1';
const HITS_CACHE_TIMEOUT = 15 * 60 * 1000;

function AuthorAvatar({
  name,
  avatarUrl,
  isLatest,
  style,
}: {
  name: string;
  avatarUrl?: string;
  isLatest?: boolean;
  style?: React.CSSProperties;
}): React.JSX.Element {
  const [hasError, setHasError] = useState(false);

  if (!avatarUrl || hasError) {
    const initial = name.replace(/^[^a-zA-Z0-9]+/, '').charAt(0).toUpperCase() || '?';
    return (
      <span
        className={clsx(styles.authorAvatarPlaceholder, isLatest && styles.authorAvatarLatest)}
        title={name}
        aria-label={name}
        style={style}
      >
        {initial}
      </span>
    );
  }

  return (
    <img
      src={avatarUrl}
      alt={name}
      title={name}
      className={clsx(styles.authorAvatar, isLatest && styles.authorAvatarLatest)}
      width={20}
      height={20}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      style={style}
    />
  );
}

export default function CommitMatrix(): React.JSX.Element {
  const [consoleBodyRef, isScrolling] = useScrollLight<HTMLDivElement>();
  const { commits, status: statusSource, error: errorState, loading } = useGitHubCommits();
  const { stats: repoStats, loading: statsGhLoading } = useGitHubRepoStats();

  const [hitsData, setHitsData] = useState<HitsState>({ hits: 0 });
  const [hitsLoading, setHitsLoading] = useState(true);

  const filteredCommits = useMemo(() => {
    const TARGET_COMMITS = 7;
    const sorted = [...commits].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recent = sorted.filter(commit => new Date(commit.date).getTime() >= sevenDaysAgo);

    if (recent.length >= TARGET_COMMITS) {
      return recent;
    }
    return sorted.slice(0, TARGET_COMMITS);
  }, [commits]);

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

  const contributorAvatarMap = useMemo(() => {
    const map = new Map<string, string>();

    if (Array.isArray(contributorsData)) {
      contributorsData.forEach((c: { login?: string; name?: string; avatar_url?: string }) => {
        if (!c.avatar_url) return;
        if (c.login) {
          map.set(c.login.toLowerCase(), c.avatar_url);
        }
        if (c.name) {
          map.set(c.name.toLowerCase(), c.avatar_url);
          const baseName = c.name.replace(/\s*\([^)]*\)/, '').trim().toLowerCase();
          if (baseName) {
            map.set(baseName, c.avatar_url);
            map.set(baseName.replace(/[^\w-]/g, ''), c.avatar_url);
          }
          const parenMatch = c.name.match(/\(([^)]+)\)/);
          if (parenMatch) {
            map.set(parenMatch[1].toLowerCase(), c.avatar_url);
          }
        }
      });
    }

    const customAvatars = contributorMetadata.customAvatars;
    if (customAvatars) {
      Object.entries(customAvatars).forEach(([key, url]) => {
        if (url) {
          map.set(key.toLowerCase(), url);
        }
      });
    }


    return map;
  }, []);

  const getAuthorAvatarUrl = (name: string, authorAvatar?: string, authorLogin?: string): string => {
    if (authorLogin && contributorAvatarMap.has(authorLogin.toLowerCase())) {
      return contributorAvatarMap.get(authorLogin.toLowerCase())!;
    }
    const clean = name.replace(/[^\w-]/g, '').toLowerCase().trim();
    if (contributorAvatarMap.has(clean)) {
      return contributorAvatarMap.get(clean)!;
    }
    const base = name.replace(/\s*\([^)]*\)/, '').trim().toLowerCase();
    if (contributorAvatarMap.has(base)) {
      return contributorAvatarMap.get(base)!;
    }
    const cleanBase = base.replace(/[^\w-]/g, '');
    if (contributorAvatarMap.has(cleanBase)) {
      return contributorAvatarMap.get(cleanBase)!;
    }
    if (authorAvatar) return authorAvatar;
    if (/^[a-zA-Z0-9-]+$/.test(clean)) {
      return `https://github.com/${clean}.png?size=40`;
    }
    return '';
  };

  const formatAuthors = (commit: Commit, isLatest: boolean): React.JSX.Element => {
    const allAuthors = [commit.author, ...commit.coAuthors];
    const tooltip = allAuthors.join(' & ');

    return (
      <span className={styles.authorsWrapper} title={tooltip}>
        {allAuthors.map((author, index) => {
          const avatarUrl = index === 0
            ? getAuthorAvatarUrl(author, commit.authorAvatar, commit.authorLogin)
            : getAuthorAvatarUrl(author);

          return (
            <AuthorAvatar
              key={`${commit.sha}-${author}-${index}`}
              name={author}
              avatarUrl={avatarUrl}
              isLatest={isLatest}
              style={index > 0 ? { marginLeft: '-6px' } : undefined}
            />
          );
        })}
      </span>
    );
  };

  const isProgressLoading = loading || statsGhLoading || hitsLoading;

  return (
    <div className={styles.container}>
      {isProgressLoading && <div className={styles.loadingBar} />}

      <div className={styles.widgetHeader}>
        <div className={styles.headerTitleGroup}>
          <span className={styles.cliPrompt}>$ git</span>
          <span className={styles.widgetTitle}>log --since=7d</span>
        </div>
        <div className={styles.headerRight}>
          <a
            href="https://github.com/spike0en/nothing_archive/stargazers"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.starLink}
            title="View Stargazers on GitHub"
          >
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
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span suppressHydrationWarning>{statsGhLoading ? '—' : repoStats.stars.toLocaleString()}</span>
          </a>
          <span className={styles.viewsPill} title="Total page views across all sessions" suppressHydrationWarning>
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
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{hitsLoading ? '—' : hitsData.hits.toLocaleString()}</span>
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
          {loading && filteredCommits.length === 0 ? (
            <div className={styles.consoleLine}>
              <span className={styles.statusDot} />
              <span className={styles.messageText}>Loading commits...</span>
            </div>
          ) : errorState && filteredCommits.length === 0 ? (
            <div className={styles.errorContainer}>
              <div className={styles.errorHeader}>&gt; CONNECTION ERROR</div>
              <div className={styles.errorMessage}>
                Could not sync with repository. Check network connection.
              </div>
            </div>
          ) : commits.length === 0 ? (
            <div className={styles.consoleLine}>
              <span className={styles.statusDot} />
              <span className={styles.messageText}>No commits found</span>
            </div>
          ) : filteredCommits.length === 0 ? (
            <div className={styles.consoleLine}>
              <span className={styles.statusDot} />
              <span className={styles.messageText}>No recent commits</span>
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
                  <span className={clsx(styles.timeLag, isLatest && styles.timeLagActive)} suppressHydrationWarning>
                    {getTimeLag(commit.date)}
                  </span>
                  {formatAuthors(commit, isLatest)}
                  <span className={clsx(styles.messageText, isLatest && styles.messageTextLatest)}>
                    {commit.message}
                  </span>
                  <span className={styles.shaTag}>
                    {commit.sha}
                  </span>
                </a>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

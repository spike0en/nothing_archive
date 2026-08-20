/**
 * @file AnnouncementBanner.tsx
 * @description Header announcement banner notifying users of recent Nothing OS release updates.
 *
 * Layer: Home and global theme components.
 * Boundary: Consumes changelogs plugin global data and persistent client-side dismissal state.
 */

import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import clsx from 'clsx';
import styles from './AnnouncementBanner.module.css';

interface ChangelogEntry {
  tagName: string;
  path: string;
  publishedAt: string;
}

interface ChangelogsPluginData {
  changelogs?: ChangelogEntry[];
  changelogLinks?: Record<string, string>;
}

const DISMISS_KEY = 'na_dismissed_announcement_tag';

function parseDismissedTags(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    if (raw.startsWith('[')) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    }
    return [raw];
  } catch {
    return [];
  }
}

/**
 * Header announcement banner component.
 * Evaluates changelog commit recency against a 7-day threshold and presents an animated rotating ticker for multiple releases.
 */
export default function AnnouncementBanner(): React.JSX.Element | null {
  // SAFETY: Provided by local changelogs-plugin in docusaurus.config.ts
  const pluginData = usePluginData('changelogs-plugin') as ChangelogsPluginData | undefined;
  const allChangelogs = pluginData?.changelogs || [];

  const [releases, setReleases] = useState<ChangelogEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(true);
  const [isDismissing, setIsDismissing] = useState<boolean>(false);

  useEffect(() => {
    if (!allChangelogs || allChangelogs.length === 0) return;

    // Filter changelog records created/committed within the last 7 calendar days
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentReleases = allChangelogs.filter((entry) => {
      const pubTime = new Date(entry.publishedAt).getTime();
      return pubTime >= sevenDaysAgo;
    });

    const dismissedTags = parseDismissedTags(DISMISS_KEY);
    const nonDismissed = recentReleases.filter(
      (entry) => !dismissedTags.includes(entry.tagName)
    );

    if (nonDismissed.length > 0) {
      setReleases(nonDismissed);
      // Introduce a 3-second delay before showing the banner to let the page load
      const timer = setTimeout(() => {
        setIsDismissed(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsDismissed(true);
    }
  }, [allChangelogs]);

  // Rotates through multiple releases on a 6.5-second interval when not hovered
  useEffect(() => {
    if (releases.length <= 1 || isPaused || isDismissed) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % releases.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [releases.length, isPaused, isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (releases && releases.length > 0) {
      const previouslyDismissed = parseDismissedTags(DISMISS_KEY);
      const newlyDismissed = releases.map((r) => r.tagName);
      const merged = Array.from(new Set([...previouslyDismissed, ...newlyDismissed]));
      localStorage.setItem(DISMISS_KEY, JSON.stringify(merged));
      
      setIsDismissing(true);
      setTimeout(() => {
        setIsDismissed(true);
      }, 400); // match animation duration (400ms)
    }
  };

  if (isDismissed || releases.length === 0) {
    return null;
  }

  const currentRelease = releases[currentIndex] || releases[0];

  return (
    <div
      className={clsx(styles.banner, isDismissing && styles.bannerDismissing)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={(e) => {
        setIsPaused(false);
        if (e.target instanceof HTMLElement) {
          e.target.blur();
        }
      }}
      onTouchCancel={(e) => {
        setIsPaused(false);
        if (e.target instanceof HTMLElement) {
          e.target.blur();
        }
      }}
    >
      <div className={styles.container}>
        <Link
          to={currentRelease.path}
          className={styles.content}
          title={currentRelease.tagName}
        >
          <span className={styles.announcementTag}>📢</span>
          <span key={currentRelease.tagName} className={styles.message}>
            <span className={styles.buildName}>{currentRelease.tagName}</span>
            <span className={styles.actionText}>
              <span className={styles.actionFull}> is now available!</span>
              <span className={styles.actionShort}> is live!</span>
            </span>
          </span>
          {releases.length > 1 && (
            <span className={styles.tickerBadge} aria-label={`Update ${currentIndex + 1} of ${releases.length}`}>
              {`${currentIndex + 1}/${releases.length}`}
            </span>
          )}
        </Link>
        <button
          onClick={handleDismiss}
          className={styles.dismissBtn}
          aria-label="Dismiss announcement"
          title="Dismiss"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

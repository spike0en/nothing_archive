import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './AnnouncementBanner.module.css';

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
  console.warn('AnnouncementBanner: Failed to load changelogs context', e);
}

interface ReleaseData {
  tagName: string;
  codename: string;
  version: string;
  htmlUrl: string;
  publishedAt: string;
}

const RELEASES_CACHE_KEY = 'nothing_archive_releases_cache_v2';
const DISMISS_KEY = 'na_dismissed_announcement_tag';

export default function AnnouncementBanner(): React.JSX.Element | null {
  const [releases, setReleases] = useState<ReleaseData[]>([]);
  const [isDismissed, setIsDismissed] = useState<boolean>(true); // default to true to avoid flash before load

  useEffect(() => {
    async function checkReleases() {
      try {
        let allReleases: ReleaseData[] = [];
        
        // 1. Try to read from cache first
        const cached = localStorage.getItem(RELEASES_CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.length > 0) {
            allReleases = parsed.map((item: any) => ({
              tagName: item.tagName || '',
              codename: item.codename || 'Archive',
              version: item.version || '',
              htmlUrl: item.htmlUrl || '',
              publishedAt: item.publishedAt || item.published_at || new Date().toISOString(),
            }));
          }
        }

        // 2. Fetch if no cache exists
        if (allReleases.length === 0) {
          const response = await fetch(
            'https://api.github.com/repos/spike0en/nothing_archive/releases?per_page=10'
          );
          if (response.ok) {
            const raw = await response.json();
            if (raw && raw.length > 0) {
              allReleases = raw.map((item: any) => {
                const tagName = item.tag_name || '';
                const parts = tagName.split('_');
                let codename = 'Archive';
                let version = tagName;
                if (parts.length > 1) {
                  codename = parts[0];
                  version = parts.slice(1).join('_');
                }
                return {
                  tagName,
                  codename,
                  version,
                  htmlUrl: item.html_url || '',
                  publishedAt: item.published_at || new Date().toISOString(),
                };
              });
            }
          }
        }

        if (allReleases.length > 0) {
          const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
          
          // Filter releases published in the last 7 days
          const recentReleases = allReleases.filter(r => {
            const pubTime = new Date(r.publishedAt).getTime();
            return pubTime >= sevenDaysAgo;
          });

          // Filter out dismissed releases
          const dismissedTagStr = localStorage.getItem(DISMISS_KEY);
          let dismissedTags: string[] = [];
          if (dismissedTagStr) {
            try {
              if (dismissedTagStr.startsWith('[')) {
                dismissedTags = JSON.parse(dismissedTagStr);
              } else {
                dismissedTags = [dismissedTagStr];
              }
            } catch {
              dismissedTags = [dismissedTagStr];
            }
          }

          const nonDismissed = recentReleases.filter(
            r => !dismissedTags.includes(r.tagName)
          );

          if (nonDismissed.length > 0) {
            setReleases(nonDismissed);
            setIsDismissed(false);
          } else {
            setIsDismissed(true);
          }
        } else {
          setIsDismissed(true);
        }
      } catch (e) {
        console.warn('AnnouncementBanner: failed to resolve releases.', e);
      }
    }

    checkReleases();
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (releases && releases.length > 0) {
      const dismissedTagStr = localStorage.getItem(DISMISS_KEY);
      let previouslyDismissed: string[] = [];
      if (dismissedTagStr) {
        try {
          if (dismissedTagStr.startsWith('[')) {
            previouslyDismissed = JSON.parse(dismissedTagStr);
          } else {
            previouslyDismissed = [dismissedTagStr];
          }
        } catch {
          previouslyDismissed = [dismissedTagStr];
        }
      }
      const newlyDismissed = releases.map(r => r.tagName);
      const merged = Array.from(new Set([...previouslyDismissed, ...newlyDismissed]));
      localStorage.setItem(DISMISS_KEY, JSON.stringify(merged));
      setIsDismissed(true);
    }
  };

  if (isDismissed || releases.length === 0) {
    return null;
  }

  // If there is only one release, keep the clean block layout
  if (releases.length === 1) {
    const singleRelease = releases[0];
    const changelogKey = `${singleRelease.codename}-${singleRelease.version}`.toLowerCase();
    const hasChangelog = availableChangelogs.has(changelogKey);
    const changelogUrl = `/docs/changelogs/${singleRelease.codename.toLowerCase()}/${singleRelease.codename}-${singleRelease.version}`;
    const targetUrl = hasChangelog ? changelogUrl : singleRelease.htmlUrl;
    const isExternal = !hasChangelog;

    return (
      <div className={styles.banner}>
        <div className={styles.container}>
          <Link
            to={targetUrl}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={styles.content}
          >
            <span className={styles.announcementTag}>📢</span>
            <span className={styles.message}>
              {`${singleRelease.codename}-${singleRelease.version} is now available!`}
            </span>
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

  // Multiple releases - render as inline clickable links
  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.contentNonClickable}>
          <span className={styles.announcementTag}>📢</span>
          <span className={styles.message}>New updates available: </span>
          {releases.map((release, index) => {
            const changelogKey = `${release.codename}-${release.version}`.toLowerCase();
            const hasChangelog = availableChangelogs.has(changelogKey);
            const changelogUrl = `/docs/changelogs/${release.codename.toLowerCase()}/${release.codename}-${release.version}`;
            const targetUrl = hasChangelog ? changelogUrl : release.htmlUrl;
            const isExternal = !hasChangelog;

            // If there are many updates, show links for the first 2 and a "+ X more" link to the changelogs index
            if (releases.length > 2 && index >= 2) {
              if (index === 2) {
                return (
                  <React.Fragment key="more">
                    <span className={styles.separator}> &amp; </span>
                    <Link to="/docs/changelogs" className={styles.inlineLink}>
                      {`${releases.length - 2} more`}
                    </Link>
                  </React.Fragment>
                );
              }
              return null;
            }

            const isLastOfTwo = releases.length === 2 && index === 1;
            const isLastOfThree = releases.length > 2 && index === 1;

            return (
              <React.Fragment key={release.tagName}>
                {index > 0 && !isLastOfTwo && !isLastOfThree && <span className={styles.separator}>, </span>}
                {(isLastOfTwo || isLastOfThree) && <span className={styles.separator}> &amp; </span>}
                <Link
                  to={targetUrl}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={styles.inlineLink}
                >
                  {`${release.codename}-${release.version}`}
                </Link>
              </React.Fragment>
            );
          })}
        </div>
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

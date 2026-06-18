import React, { useState, useEffect } from 'react';
import Translate from '@docusaurus/Translate';
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
}

const RELEASES_CACHE_KEY = 'nothing_archive_releases_cache_v2';
const DISMISS_KEY = 'na_dismissed_announcement_tag';

export default function AnnouncementBanner(): React.JSX.Element | null {
  const [release, setRelease] = useState<ReleaseData | null>(null);
  const [isDismissed, setIsDismissed] = useState<boolean>(true); // default to true to avoid flash before load

  useEffect(() => {
    async function checkRelease() {
      try {
        let latest: ReleaseData | null = null;
        
        // 1. Try to read from cache first
        const cached = localStorage.getItem(RELEASES_CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.length > 0) {
            latest = {
              tagName: parsed[0].tagName,
              codename: parsed[0].codename,
              version: parsed[0].version,
              htmlUrl: parsed[0].htmlUrl,
            };
          }
        }

        // 2. Fetch if no cache exists
        if (!latest) {
          const response = await fetch(
            'https://api.github.com/repos/spike0en/nothing_archive/releases?per_page=1'
          );
          if (response.ok) {
            const raw = await response.json();
            if (raw && raw.length > 0) {
              const item = raw[0];
              const tagName = item.tag_name || '';
              const parts = tagName.split('_');
              let codename = 'Archive';
              let version = tagName;
              if (parts.length > 1) {
                codename = parts[0];
                version = parts.slice(1).join('_');
              }
              latest = {
                tagName,
                codename,
                version,
                htmlUrl: item.html_url || '',
              };
            }
          }
        }

        if (latest) {
          const dismissedTag = localStorage.getItem(DISMISS_KEY);
          if (dismissedTag === latest.tagName) {
            setIsDismissed(true);
          } else {
            setRelease(latest);
            setIsDismissed(false);
          }
        }
      } catch (e) {
        console.warn('AnnouncementBanner: failed to resolve latest release.', e);
      }
    }

    checkRelease();
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (release) {
      localStorage.setItem(DISMISS_KEY, release.tagName);
      setIsDismissed(true);
    }
  };

  if (isDismissed || !release) {
    return null;
  }

  const changelogKey = `${release.codename}-${release.version}`.toLowerCase();
  const hasChangelog = availableChangelogs.has(changelogKey);
  const changelogUrl = `/docs/changelogs/${release.codename.toLowerCase()}/${release.codename}-${release.version}`;
  const targetUrl = hasChangelog ? changelogUrl : release.htmlUrl;
  const isExternal = !hasChangelog;

  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <Link
          to={targetUrl}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={styles.content}
        >
          <span className={styles.pulseDot} />
          <span className={styles.prefix}>
            <Translate id="homepage.announcement.prefix">LATEST RELEASE:</Translate>
          </span>
          <span className={styles.message}>
            <Translate
              id="homepage.announcement.message"
              values={{
                codename: release.codename,
                version: release.version,
              }}
            >
              {'{codename}-{version} is now available!'}
            </Translate>
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

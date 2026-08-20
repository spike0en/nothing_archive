/**
 * @file ShowcaseCard.tsx
 * @description Renders an individual community showcase catalog card with icon preview,
 * creator attribution, target platform badge, taxonomic tags, and direct repository/store action links.
 * 
 * Layer: Presentation component.
 * Boundary: Consumes a typed ShowcaseItem record and renders an interactive grid card.
 */

import React, { useState } from 'react';
import {
  FaGooglePlay,
  FaGithub,
  FaArrowUpRightFromSquare,
  FaCrown,
  FaAndroid,
  FaWindows,
  FaLinux,
  FaApple,
  FaGlobe,
  FaRocket,
  FaCode,
} from 'react-icons/fa6';
import clsx from 'clsx';
import { parseDevelopers, type ShowcaseItem } from '../data/showcase-data';
import styles from './ShowcaseCard.module.css';

interface ShowcaseCardProps {
  item: ShowcaseItem;
  className?: string;
  onSelectDeveloper?: (devName: string) => void;
}

interface PlatformDisplayInfo {
  key: string;
  icon: React.ReactElement;
  title: string;
}

/**
 * Resolves the primary operating system platform badge and vector icon for a showcase entry.
 *
 * @param {ShowcaseItem} item - Showcase item containing target OS platform array.
 * @returns {PlatformDisplayInfo} Visual metadata object containing CSS module key, icon element, and tooltip title.
 */
function getPlatformInfo(item: ShowcaseItem): PlatformDisplayInfo {
  const osList = item.platformOS || [];
  if (osList.includes('ios')) {
    return { key: 'platformApple', icon: <FaApple size={13} />, title: 'iOS Platform' };
  }
  if (osList.includes('android')) {
    return { key: 'platformAndroid', icon: <FaAndroid size={13} />, title: 'Android Platform' };
  }
  if (osList.includes('windows')) {
    return { key: 'platformWindows', icon: <FaWindows size={12} />, title: 'Windows OS' };
  }
  if (osList.includes('linux')) {
    return { key: 'platformLinux', icon: <FaLinux size={13} />, title: 'Linux System' };
  }
  if (osList.includes('macos')) {
    return { key: 'platformApple', icon: <FaApple size={13} />, title: 'macOS' };
  }
  return { key: 'platformWeb', icon: <FaGlobe size={13} />, title: 'Web App & Portal' };
}

/**
 * Renders an interactive showcase card for a community application or open-source project.
 *
 * @param {ShowcaseCardProps} props - Component properties.
 * @returns {React.JSX.Element} Rendered showcase card element.
 */
export default function ShowcaseCard({
  item,
  className,
  onSelectDeveloper,
}: ShowcaseCardProps): React.JSX.Element {
  const [imgError, setImgError] = useState(false);
  const platformInfo = getPlatformInfo(item);

  const developers = parseDevelopers(item.developer);
  const hasMultipleCreations = (item.developerProjectsCount || 1) > 1;

  return (
    <article className={clsx(styles.card, item.featured && styles.featuredCard, className)}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          {item.iconUrl && !imgError ? (
            <img
              src={item.iconUrl}
              alt={`${item.title} icon`}
              className={styles.appIcon}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.fallbackIconContainer}>
              {item.source === 'apps' ? <FaRocket size={16} /> : <FaCode size={16} />}
            </div>
          )}

          <div className={styles.titleGroup}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.developerRow}>
              <span>by</span>
              {developers.length > 0 ? (
                developers.map((dev, idx) => {
                  const isClickable = hasMultipleCreations && Boolean(onSelectDeveloper);
                  return (
                    <span key={dev} className={styles.developerUnit}>
                      {idx > 0 && <span className={styles.devSeparator}>&amp;</span>}
                      {isClickable ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectDeveloper?.(dev);
                          }}
                          className={styles.developerBtn}
                          title={`Filter all creations by ${dev}`}
                        >
                          {dev}
                        </button>
                      ) : (
                        <span>{dev}</span>
                      )}
                    </span>
                  );
                })
              ) : (
                <span>{item.developer}</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.badgeGroup}>
          {item.isPaid && (
            <span
              className={styles.paidBadge}
              title={item.price ? `Paid Application (${item.price})` : 'Paid Application'}
            >
              PAID
            </span>
          )}
          {item.featured && (
            <span className={styles.crownBadge} title="Editor's Choice">
              <FaCrown size={11} className={styles.crownIcon} />
            </span>
          )}
          <span
            className={clsx(styles.platformBadge, styles[platformInfo.key])}
            title={platformInfo.title}
          >
            {platformInfo.icon}
          </span>
        </div>
      </div>

      <p className={styles.description}>{item.description}</p>

      <div className={styles.tagContainer}>
        {item.category && (
          <span className={styles.tag}>
            {item.category}
          </span>
        )}
        {item.hasDistinctSubCategory && item.subCategory !== item.category && (
          <span className={clsx(styles.tag, styles.subTag)}>
            {item.subCategory}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        {item.links.playStore && (
          <a
            href={item.links.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.actionButton, styles.actionPlayStore)}
            aria-label={`Get ${item.title} on Google Play`}
          >
            <FaGooglePlay size={11} />
            <span>Play Store</span>
          </a>
        )}

        {item.links.appStore && (
          <a
            href={item.links.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.actionButton, styles.actionAppStore)}
            aria-label={`Get ${item.title} on Apple App Store`}
          >
            <FaApple size={12} />
            <span>App Store</span>
          </a>
        )}

        {item.links.github && (
          <a
            href={item.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.actionButton, styles.actionGithub)}
            aria-label={`View ${item.title} repository on GitHub`}
          >
            <FaGithub size={12} />
            <span>GitHub</span>
          </a>
        )}

        {item.links.website && (
          <a
            href={item.links.website}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.actionButton, styles.actionWeb)}
            aria-label={`Visit ${item.title} website`}
          >
            <FaArrowUpRightFromSquare size={10} />
            <span>Web</span>
          </a>
        )}
      </div>
    </article>
  );
}

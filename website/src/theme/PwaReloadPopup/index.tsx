/**
 * @file PwaReloadPopup/index.tsx
 * @description Swizzled PWA reload notification component for site version updates.
 * 
 * Layer: Navigation / PWA theme components.
 * Boundary: Swizzles @theme/PwaReloadPopup invoked by @docusaurus/plugin-pwa.
 */

import React, { type ReactNode, useState } from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type { Props } from '@theme/PwaReloadPopup';
import styles from './styles.module.css';

/**
 * Renders vector SVG rotating update arrows icon.
 * 
 * @param {Object} props - Component properties containing optional className.
 * @returns {React.JSX.Element} Update arrows vector SVG element.
 */
function UpdateArrowsIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l5.64 5.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

/**
 * Renders vector SVG refresh icon for CTA button.
 * 
 * @param {Object} props - Component properties containing optional className.
 * @returns {React.JSX.Element} Refresh vector SVG element.
 */
function RefreshIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="14"
      width="14"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={className}
    >
      <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v260H540v-80h134q-36-44-87.5-67T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q80 0 144-46.5T708-400h84q-20 115-103 187.5T480-160Z" />
    </svg>
  );
}

/**
 * Renders vector SVG close icon for dismissal button.
 * 
 * @param {Object} props - Component properties containing optional className.
 * @returns {React.JSX.Element} Close vector SVG element.
 */
function CloseIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="12"
      width="12"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={className}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}

/**
 * PwaReloadPopup component.
 * Toast notification prompting users to reload when a new PWA service worker version is registered.
 * 
 * @param {Props} props - Component properties containing onReload callback.
 * @returns {ReactNode} Floating notification toast element or null if hidden.
 */
export default function PwaReloadPopup({ onReload }: Props): ReactNode {
  const [isVisible, setIsVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [isNudgeActive, setIsNudgeActive] = useState(false);

  // Check session dismissal on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip checking storage if in dev preview mode (#stack-test or #pwa-test)
    if (window.location.hash === '#stack-test' || window.location.hash === '#pwa-test') {
      return;
    }

    if (sessionStorage.getItem('pwa_reload_dismissed_session') === 'true') {
      setIsVisible(false);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if ((window as any).__SUPPORT_NUDGE_ACTIVE__) {
      setIsNudgeActive(true);
    }

    const handleNudgeShow = () => setIsNudgeActive(true);
    const handleNudgeHide = () => setIsNudgeActive(false);

    window.addEventListener('support-nudge-show', handleNudgeShow);
    window.addEventListener('support-nudge-hide', handleNudgeHide);

    return () => {
      window.removeEventListener('support-nudge-show', handleNudgeShow);
      window.removeEventListener('support-nudge-hide', handleNudgeHide);
    };
  }, []);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [dragX, setDragX] = useState<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;
    if (diff > 0) {
      setDragX(diff);
    }
  };

  const handleTouchEnd = () => {
    if (dragX > 75) {
      handleDismiss();
    } else {
      setDragX(0);
    }
    setTouchStartX(null);
  };

  /** Dismisses the popup for the current browsing session (Close 'X' / Swipe) */
  const handleDismiss = () => {
    try {
      sessionStorage.setItem('pwa_reload_dismissed_session', 'true');
    } catch (e) {
      // Storage access blocked or restricted
    }
    setExiting(true);
    setTimeout(() => setIsVisible(false), 350);
  };

  /** Triggers Service Worker update and page reload ('Refresh Page' button) */
  const handleReload = () => {
    try {
      sessionStorage.removeItem('pwa_reload_dismissed_session');
    } catch (e) {
      // Storage access blocked or restricted
    }
    setExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onReload();
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={clsx(styles.popupContainer, isNudgeActive && styles.popupShifted)} role="alert" aria-live="polite">
      <div
        className={clsx(styles.popupCard, exiting && styles.popupExiting)}
        style={{
          transform: dragX > 0 ? `translateX(${dragX}px)` : undefined,
          opacity: dragX > 0 ? Math.max(0, 1 - dragX / 200) : undefined,
          transition: dragX > 0 ? 'none' : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.popupHeader}>
          <div className={styles.titleGroup}>
            <UpdateArrowsIcon className={styles.updateIcon} />
            <p className={styles.popupTitle}>
              <Translate
                id="theme.PwaReloadPopup.info"
                description="The text for PWA reload popup">
                New version available
              </Translate>
            </p>
          </div>
          <button
            className={styles.closeBtn}
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss update notification"
          >
            <CloseIcon />
          </button>
        </div>

        <p className={styles.popupBody}>
          A new update for Nothing Archive is ready. Refresh to load the latest content and features.
        </p>

        <div className={styles.popupActions}>
          <button
            className={styles.refreshCta}
            type="button"
            onClick={handleReload}
          >
            <RefreshIcon className={styles.refreshIcon} />
            <span>
              <Translate
                id="theme.PwaReloadPopup.refreshButtonText"
                description="The text for PWA reload button">
                Refresh Page
              </Translate>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

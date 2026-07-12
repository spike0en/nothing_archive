import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaHeart, FaTimes, FaCheckCircle } from 'react-icons/fa';
import styles from './SupportNudge.module.css';

/**
 * Non-intrusive, dismissable support nudge toast.
 *
 * Renders a small floating card in the bottom-right corner prompting
 * visitors to consider supporting the project. Integrates with the
 * existing {@link SupportModal} via the `open-support-modal` custom event.
 *
 * Dismiss tiers:
 *  - Auto-hide (ignored)       → reappears on the next visit.
 *  - Close button (✕)          → suppressed for {@link DISMISS_DAYS} days.
 *  - CTA ("Support Project")   → dismissed for the current page view.
 *  - "Already Supported"       → permanently hidden via `localStorage`.
 *
 * Timing: appears at {@link SHOW_DELAY_MS} ms, auto-hides after
 * {@link AUTO_HIDE_MS} ms of inactivity.
 */

/** localStorage key for the permanent opt-out flag. */
const PERMANENT_KEY = 'support_nudge_permanent';
/** localStorage key storing the epoch timestamp of the last ✕ dismissal. */
const DISMISS_KEY = 'support_nudge_dismissed';
/** Number of days to suppress the nudge after an explicit ✕ dismissal. */
const DISMISS_DAYS = 7;
/** Delay in milliseconds before the nudge first appears after page load. */
const SHOW_DELAY_MS = 15_000;
/** Duration in milliseconds the nudge remains visible before auto-hiding. */
const AUTO_HIDE_MS = 15_000;

/** Checks whether the user has opted out permanently ("Already Supported"). */
function isPermanentlyHidden(): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(PERMANENT_KEY) === '1';
  } catch {
    return false;
  }
}

/** Returns `true` if the ✕ button was clicked within the last {@link DISMISS_DAYS} days. */
function isDismissedRecently(): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (Number.isNaN(ts)) return false;
    return (Date.now() - ts) / (1000 * 60 * 60 * 24) < DISMISS_DAYS;
  } catch {
    return false;
  }
}

/** Persists the current timestamp as the last ✕ dismissal time. */
function setDismissed(): void {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    // Storage may be full or blocked in private browsing — degrade gracefully.
  }
}

/** Sets the permanent opt-out flag so the nudge never appears again. */
function setPermanentlyHidden(): void {
  try {
    localStorage.setItem(PERMANENT_KEY, '1');
  } catch {
    // Storage may be full or blocked in private browsing — degrade gracefully.
  }
}

export default function SupportNudge(): React.JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const autoHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Cancels the pending auto-hide timeout, if any. */
  const clearAutoHide = useCallback(() => {
    if (autoHideTimer.current) {
      clearTimeout(autoHideTimer.current);
      autoHideTimer.current = null;
    }
  }, []);

  /** Dismisses the nudge without setting any cooldown (auto-hide / CTA click). */
  const dismiss = useCallback(() => {
    setExiting(true);
    clearAutoHide();
    setTimeout(() => setVisible(false), 350);
  }, [clearAutoHide]);

  /** Dismisses the nudge and suppresses it for {@link DISMISS_DAYS} days (✕ button). */
  const dismissWithCooldown = useCallback(() => {
    setExiting(true);
    setDismissed();
    clearAutoHide();
    setTimeout(() => setVisible(false), 350);
  }, [clearAutoHide]);

  /** Permanently hides the nudge ("Already Supported" opt-out). */
  const dismissPermanently = useCallback(() => {
    setExiting(true);
    setPermanentlyHidden();
    clearAutoHide();
    setTimeout(() => setVisible(false), 350);
  }, [clearAutoHide]);

  // Schedule the nudge to appear after SHOW_DELAY_MS, then auto-hide after AUTO_HIDE_MS.
  // Gate checks run both at mount and at fire-time to handle late storage writes.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isPermanentlyHidden() || isDismissedRecently()) return;

    const timer = setTimeout(() => {
      if (isPermanentlyHidden() || isDismissedRecently()) return;

      setVisible(true);

      autoHideTimer.current = setTimeout(() => {
        dismiss();
      }, AUTO_HIDE_MS);
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, [dismiss]);

  // Cleanup: cancel any pending auto-hide timer on component unmount.
  useEffect(() => {
    return () => clearAutoHide();
  }, [clearAutoHide]);

  /** Handles the "Support Project" CTA — dismisses the nudge and opens the SupportModal. */
  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    dismiss();
    window.dispatchEvent(new CustomEvent('open-support-modal'));
  };

  if (!visible) return null;

  return (
    <div className={styles.nudgeContainer} role="complementary" aria-label="Support prompt">
      <div className={`${styles.nudge} ${exiting ? styles.nudgeExiting : ''}`}>
        <div className={styles.nudgeHeader}>
          <div className={styles.nudgeTitleGroup}>
            <FaHeart size={13} className={styles.heartIcon} />
            <p className={styles.nudgeTitle}>Enjoying Nothing Archive?</p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={dismissWithCooldown}
            aria-label="Dismiss support prompt"
          >
            <FaTimes size={12} />
          </button>
        </div>

        <p className={styles.nudgeBody}>
          If you found this useful, please consider supporting the project. Thank you!
        </p>

        <div className={styles.nudgeActions}>
          <button className={styles.nudgeCta} onClick={handleCta}>
            <FaHeart size={10} className={styles.ctaIcon} />
            <span>Support Project</span>
          </button>

          <button
            className={styles.alreadySupported}
            onClick={dismissPermanently}
            title="Hide this prompt forever"
          >
            <FaCheckCircle size={10} />
            <span>Already Supported</span>
          </button>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
}

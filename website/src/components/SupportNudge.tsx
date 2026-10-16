/**
 * Support nudge toast with swipe-to-dismiss, cooldown tracking, and permanent opt-out.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaHeart, FaTimes, FaCheckCircle } from 'react-icons/fa';
import styles from './SupportNudge.module.css';

/**
 * Dismiss tiers:
 * - Auto-hide (ignored): reappears on next visit.
 * - Close button (X): suppressed for 7 days.
 * - CTA (Support Project): dismissed for current page view.
 * - Already Supported: permanently hidden via localStorage.
 */

const PERMANENT_KEY = 'support_nudge_permanent';
const DISMISS_KEY = 'support_nudge_dismissed';
const DISMISS_DAYS = 7;
const SHOW_DELAY_MS = 15_000;
const AUTO_HIDE_MS = 15_000;

function isNudgeHidden(): boolean {
  if (globalThis.localStorage === undefined) return false;
  try {
    if (localStorage.getItem(PERMANENT_KEY) === '1') return true;
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    return !Number.isNaN(ts) && (Date.now() - ts) / (1000 * 60 * 60 * 24) < DISMISS_DAYS;
  } catch {
    return false;
  }
}

function setDismissed(): void {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    // Storage may be full or blocked in private browsing: degrade gracefully
  }
}

function setPermanentlyHidden(): void {
  try {
    localStorage.setItem(PERMANENT_KEY, '1');
  } catch {
    // Storage may be full or blocked in private browsing: degrade gracefully
  }
}

export default function SupportNudge(): React.JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const autoHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAutoHide = useCallback(() => {
    if (autoHideTimer.current) {
      clearTimeout(autoHideTimer.current);
      autoHideTimer.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    setExiting(true);
    clearAutoHide();
    setTimeout(() => setVisible(false), 350);
  }, [clearAutoHide]);

  const dismissWithCooldown = useCallback(() => {
    setExiting(true);
    setDismissed();
    clearAutoHide();
    setTimeout(() => setVisible(false), 350);
  }, [clearAutoHide]);

  const dismissPermanently = useCallback(() => {
    setExiting(true);
    setPermanentlyHidden();
    clearAutoHide();
    setTimeout(() => setVisible(false), 350);
  }, [clearAutoHide]);

  // Broadcast visibility events so PWA reload popup can adaptively stack above SupportNudge
  useEffect(() => {
    if (globalThis.window === undefined) return;

    if (visible) {
      // SAFETY: Global window state property binding
      (window as any).__SUPPORT_NUDGE_ACTIVE__ = true;
      window.dispatchEvent(new CustomEvent('support-nudge-show'));
    } else {
      // SAFETY: Global window state property binding
      (window as any).__SUPPORT_NUDGE_ACTIVE__ = false;
      window.dispatchEvent(new CustomEvent('support-nudge-hide'));
    }

    return () => {
      // SAFETY: Global window state property binding
      (window as any).__SUPPORT_NUDGE_ACTIVE__ = false;
      window.dispatchEvent(new CustomEvent('support-nudge-hide'));
    };
  }, [visible]);

  // Hash trigger for instant visual testing (#stack-test / #nudge-test)
  useEffect(() => {
    if (globalThis.window === undefined) return;

    const checkHash = () => {
      if (window.location.hash === '#stack-test' || window.location.hash === '#nudge-test') {
        setVisible(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Schedule the nudge to appear after SHOW_DELAY_MS, then auto-hide after AUTO_HIDE_MS.
  // Gate checks run both at mount and at fire-time to handle late storage writes.
  useEffect(() => {
    if (globalThis.window === undefined) return;
    if (isNudgeHidden()) return;

    const timer = setTimeout(() => {
      if (isNudgeHidden()) return;

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

  const dragStartXRef = useRef<number | null>(null);
  const dragXRef = useRef<number>(0);
  const [dragX, setDragX] = useState<number>(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== undefined && e.button !== 0) return;
    // SAFETY: Pointer event target HTMLElement casting
    if ((e.target as HTMLElement).closest('button, a')) return;

    dragStartXRef.current = e.clientX;
    dragXRef.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Degrade gracefully if setPointerCapture is unsupported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const diff = e.clientX - dragStartXRef.current;
    dragXRef.current = diff;
    setDragX(diff);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Degrade gracefully
    }

    const finalDrag = dragXRef.current;
    if (Math.abs(finalDrag) > 75) {
      dismissWithCooldown();
    } else {
      setDragX(0);
    }
    dragStartXRef.current = null;
    dragXRef.current = 0;
  };

  const handlePointerCancel = () => {
    setDragX(0);
    dragStartXRef.current = null;
    dragXRef.current = 0;
  };

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    dismiss();
    window.dispatchEvent(new CustomEvent('open-support-modal'));
  };

  if (!visible) return null;

  return (
    <div className={styles.nudgeContainer} role="complementary" aria-label="Support prompt">
      <div
        className={`${styles.nudge} ${exiting ? styles.nudgeExiting : ''}`}
        style={{
          transform: dragX !== 0 ? `translateX(${dragX}px)` : undefined,
          opacity: dragX !== 0 ? Math.max(0, 1 - Math.abs(dragX) / 200) : undefined,
          transition: dragX !== 0 ? 'none' : undefined,
          animation: dragX !== 0 ? 'none' : undefined,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
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

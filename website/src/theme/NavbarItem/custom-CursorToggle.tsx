/**
 * @file custom-CursorToggle.tsx
 * @description Custom Navbar button that toggles the site-wide Magnetic Target Cursor Ring.
 * 
 * Layer: Navigation theme components.
 * Boundary: Controls localStorage preference and dispatches global custom events.
 */

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './custom-CursorToggle.module.css';

interface CursorToggleProps {
  mobile?: boolean;
}

/**
 * CursorToggle component.
 * Renders a navigation button to toggle the global magnetic cursor ring preference.
 * Disabled by default; persists setting in localStorage and broadcasts custom events.
 * 
 * @returns {React.JSX.Element | null} Target cursor toggle button element.
 */
export default function CursorToggle({ mobile }: CursorToggleProps): React.JSX.Element | null {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Disable toggle interface on touchscreens or reduced motion environments
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReducedMotion) return;

    try {
      const stored = localStorage.getItem('nothing_archive_cursor');
      if (stored === 'enabled') {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    } catch (e) {
      console.warn('Failed to read cursor setting:', e);
    }
  }, []);

  if (mobile) {
    return null;
  }

  /**
   * Toggles cursor active state, updates localStorage, and dispatches global event.
   */
  const handleToggle = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    try {
      localStorage.setItem('nothing_archive_cursor', nextState ? 'enabled' : 'disabled');
      window.dispatchEvent(new CustomEvent('nothing_archive_cursor_toggle', { detail: nextState }));
    } catch (e) {
      console.warn('Failed to save cursor setting:', e);
    }
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      className={clsx(styles.cursorToggleBtn, enabled && styles.cursorToggleBtnActive)}
      onClick={handleToggle}
      title={enabled ? 'Disable Magnetic Target Cursor' : 'Enable Magnetic Target Cursor'}
      aria-label={enabled ? 'Disable Magnetic Target Cursor' : 'Enable Magnetic Target Cursor'}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        {!enabled && <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />}
      </svg>
    </button>
  );
}

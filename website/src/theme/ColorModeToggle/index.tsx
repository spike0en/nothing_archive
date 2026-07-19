/**
 * @file ColorModeToggle/index.tsx
 * @description Custom theme override component for toggling between Light, System, and Dark color modes.
 * 
 * Layer: Navigation theme overrides.
 * Boundary: Controls root Docusaurus theme state via onChange callback.
 */

import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

export interface Props {
  readonly className?: string;
  readonly buttonClassName?: string;
  readonly respectPrefersColorScheme: boolean;
  readonly value: 'light' | 'dark' | null;
  readonly onChange: (colorMode: 'light' | 'dark' | null) => void;
}

function SunIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.iconSvg}
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.iconSvg}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.iconSvg}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ColorModeToggle({
  className,
  value,
  onChange,
}: Props): React.JSX.Element {
  const isBrowser = useIsBrowser();
  const currentChoice = value === null ? 'system' : value;
  const lightModeLabel = translate({message: 'Light Mode', id: 'theme.colorToggle.ariaLabel.mode.light'});
  const systemModeLabel = translate({message: 'System Mode', id: 'theme.colorToggle.ariaLabel.mode.system'});
  const darkModeLabel = translate({message: 'Dark Mode', id: 'theme.colorToggle.ariaLabel.mode.dark'});

  return (
    <div className={clsx(styles.toggleContainer, className)}>
      <div className={styles.slider} />
      
      <button
        type="button"
        className={clsx(
          styles.toggleButton,
          styles.buttonLight,
          !isBrowser && styles.toggleButtonDisabled
        )}
        onClick={() => onChange('light')}
        disabled={!isBrowser}
        title={lightModeLabel}
        aria-label={lightModeLabel}
        aria-pressed={currentChoice === 'light'}
      >
        <SunIcon />
      </button>

      <button
        type="button"
        className={clsx(
          styles.toggleButton,
          styles.buttonSystem,
          !isBrowser && styles.toggleButtonDisabled
        )}
        onClick={() => onChange(null)}
        disabled={!isBrowser}
        title={systemModeLabel}
        aria-label={systemModeLabel}
        aria-pressed={currentChoice === 'system'}
      >
        <SystemIcon />
      </button>

      <button
        type="button"
        className={clsx(
          styles.toggleButton,
          styles.buttonDark,
          !isBrowser && styles.toggleButtonDisabled
        )}
        onClick={() => onChange('dark')}
        disabled={!isBrowser}
        title={darkModeLabel}
        aria-label={darkModeLabel}
        aria-pressed={currentChoice === 'dark'}
      >
        <MoonIcon />
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);

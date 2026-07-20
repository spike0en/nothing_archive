/**
 * @file ColorModeToggle/index.tsx
 * @description Custom theme override component for toggling between Light, System, and Dark color modes.
 * Uses official raw Google Material Symbols Outlined SVGs fetched directly from Google repository.
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

/**
 * Renders the official Google Material Symbols Outlined light_mode (Sun) SVG icon.
 * 
 * @returns {React.JSX.Element} Sun vector SVG element.
 */
function SunIcon(): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="16"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={styles.iconSvg}
    >
      <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
    </svg>
  );
}

/**
 * Renders the official Google Material Symbols Outlined desktop_windows (System) SVG icon.
 * 
 * @returns {React.JSX.Element} Monitor vector SVG element.
 */
function SystemIcon(): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="16"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={styles.iconSvg}
    >
      <path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z" />
    </svg>
  );
}

/**
 * Renders the official Google Material Symbols Outlined dark_mode (Moon) SVG icon.
 * 
 * @returns {React.JSX.Element} Moon vector SVG element.
 */
function MoonIcon(): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="16"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={styles.iconSvg}
    >
      <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
    </svg>
  );
}

/**
 * ColorModeToggle component.
 * Renders a segmented toggle control for switching between Light, System, and Dark themes.
 * 
 * @param {Props} props - Component properties containing value, onChange callback, and className.
 * @returns {React.JSX.Element} Three-state theme toggle pill control.
 */
function ColorModeToggle({
  className,
  value,
  onChange,
}: Props): React.JSX.Element {
  const isBrowser = useIsBrowser();
  // Map null color mode value to 'system' active state
  const currentChoice = value === null ? 'system' : value;

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
        title={translate({
          message: 'Light Mode',
          id: 'theme.colorToggle.ariaLabel.mode.light',
        })}
        aria-label="Light Mode"
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
        title={translate({
          message: 'System Mode',
          id: 'theme.colorToggle.ariaLabel.mode.system',
        })}
        aria-label="System Mode"
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
        title={translate({
          message: 'Dark Mode',
          id: 'theme.colorToggle.ariaLabel.mode.dark',
        })}
        aria-label="Dark Mode"
        aria-pressed={currentChoice === 'dark'}
      >
        <MoonIcon />
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);

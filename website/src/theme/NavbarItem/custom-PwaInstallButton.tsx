/**
 * @file custom-PwaInstallButton.tsx
 * @description Button component displayed in the navigation bar to trigger PWA installation 
 * when the application is installable on the user's platform/browser.
 * Uses official Google Material Symbols Outlined mobile_arrow_down icon path.
 * 
 * Layer: Navigation theme components.
 * Boundary: Interacts with custom PwaContext to verify availability and trigger prompt.
 */

import React from 'react';
import { usePwa } from '../../components/PwaContext';
import clsx from 'clsx';
import styles from './custom-PwaInstallButton.module.css';

interface PwaInstallButtonProps {
  mobile?: boolean;
}

function MobileArrowDownIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="16"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={className}
    >
      <path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v124q18 7 29 22t11 34v80q0 19-11 34t-29 22v404q0 33-23.5 56.5T680-40H280Zm0-80h400v-720H280v720Zm0 0v-720 720Zm200-200 160-160-56-56-64 62v-166h-80v166l-64-62-56 56 160 160Z" />
    </svg>
  );
}

/**
 * Navbar button that prompts the browser's native PWA installation flow when available.
 */
export default function PwaInstallButton({ mobile }: PwaInstallButtonProps): React.JSX.Element | null {
  const { isInstallable, install } = usePwa();

  if (mobile) {
    return null;
  }

  if (!isInstallable) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    install();
  };

  const icon = <MobileArrowDownIcon className={styles.installIcon} />;

  return (
    <a
      href="#"
      onClick={handleClick}
      className={clsx('navbar__item navbar__link', styles.installBtn)}
      title="Install App"
      aria-label="Install App"
    >
      {icon} <span>Install App</span>
    </a>
  );
}

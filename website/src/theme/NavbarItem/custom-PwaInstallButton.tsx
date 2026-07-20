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

/**
 * Renders the official Google Material Symbols Outlined mobile_arrow_down SVG icon.
 * 
 * @param {Object} props - Component properties containing optional className.
 * @param {string} [props.className] - CSS class for icon styling and hover transitions.
 * @returns {React.JSX.Element} Mobile arrow down vector SVG element.
 */
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
 * PwaInstallButton component.
 * Renders the install navigation item in both desktop and mobile viewports when available.
 * 
 * @param {PwaInstallButtonProps} props - Component properties specifying view mode.
 * @returns {React.JSX.Element | null} Install button element or null if not installable.
 */
export default function PwaInstallButton({ mobile }: PwaInstallButtonProps): React.JSX.Element | null {
  const { isInstallable, install } = usePwa();

  if (!isInstallable) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    install();
  };

  const icon = <MobileArrowDownIcon className={styles.installIcon} />;

  if (mobile) {
    return (
      <li className="menu__list-item">
        <a className={clsx("menu__link", styles.mobileInstallLink)} href="#" onClick={handleClick}>
          {icon} <span>Install App</span>
        </a>
      </li>
    );
  }

  return (
    <a
      href="#"
      onClick={handleClick}
      className={clsx('navbar__item navbar__link', styles.installBtn)}
    >
      {icon} <span>Install App</span>
    </a>
  );
}

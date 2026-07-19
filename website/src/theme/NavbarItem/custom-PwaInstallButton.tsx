/**
 * @file custom-PwaInstallButton.tsx
 * @description Button component displayed in the navigation bar to trigger PWA installation 
 * when the application is installable on the user's platform/browser.
 * 
 * Layer: Navigation theme components.
 * Boundary: Interacts with custom PwaContext to verify availability and trigger prompt.
 */

import React from 'react';
import { translate } from '@docusaurus/Translate';
import { usePwa } from '../../components/PwaContext';
import clsx from 'clsx';
import styles from './custom-PwaInstallButton.module.css';

interface PwaInstallButtonProps {
  mobile?: boolean;
}

/**
 * PwaInstallButton component.
 * Renders the install navigation item in both desktop and mobile views.
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

  const icon = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.installIcon}
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
      <polyline points="9 10 12 13 15 10" />
      <line x1="12" y1="6" x2="12" y2="13" />
    </svg>
  );

  if (mobile) {
    return (
      <li className="menu__list-item">
        <a className={clsx("menu__link", styles.mobileInstallLink)} href="#" onClick={handleClick}>
          {icon} <span>{translate({id: 'navbar.installApp', message: 'Install App', description: 'Navigation action that installs the progressive web app'})}</span>
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
      {icon} <span>{translate({id: 'navbar.installApp', message: 'Install App', description: 'Navigation action that installs the progressive web app'})}</span>
    </a>
  );
}

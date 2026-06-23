import React from 'react';
import { usePwa } from '../../components/PwaContext';
import clsx from 'clsx';
import styles from './custom-PwaInstallButton.module.css';

interface PwaInstallButtonProps {
  mobile?: boolean;
}

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

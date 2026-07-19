/**
 * @file custom-SupportButton.tsx
 * @description Button component displayed in the navigation bar to trigger the global support/donation modal.
 * 
 * Layer: Navigation theme components.
 * Boundary: Dispatches CustomEvent 'open-support-modal' on click, handled globally.
 */

import React from 'react';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import { FaHeart } from 'react-icons/fa';
import styles from './custom-SupportButton.module.css';

interface SupportButtonProps {
  mobile?: boolean;
}

/**
 * SupportButton component.
 * Renders support navigation item in both desktop and mobile layouts.
 */
export default function SupportButton({ mobile }: SupportButtonProps): React.JSX.Element | null {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-support-modal'));
    }
  };

  const icon = (
    <FaHeart
      size={13}
      className={styles.supportIcon}
    />
  );

  if (mobile) {
    return (
      <li className="menu__list-item">
        <a className={clsx("menu__link", styles.mobileSupportLink)} href="#" onClick={handleClick}>
          {icon} <span>{translate({id: 'navbar.supportProject', message: 'Support Project', description: 'Mobile navigation action that opens the support modal'})}</span>
        </a>
      </li>
    );
  }

  return (
    <a
      href="#"
      onClick={handleClick}
      className={clsx('navbar__item navbar__link', styles.supportBtn)}
      title={translate({id: 'navbar.supportDonations', message: 'Support & Donations', description: 'Tooltip for the support navigation action'})}
    >
      {icon} <span>{translate({id: 'navbar.support', message: 'Support', description: 'Navigation action that opens the support modal'})}</span>
    </a>
  );
}

import React from 'react';
import clsx from 'clsx';
import { FaHeart } from 'react-icons/fa';
import styles from './custom-SupportButton.module.css';

interface SupportButtonProps {
  mobile?: boolean;
}

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
          {icon} <span>Support Project</span>
        </a>
      </li>
    );
  }

  return (
    <a
      href="#"
      onClick={handleClick}
      className={clsx('navbar__item navbar__link', styles.supportBtn)}
      title="Support & Donations"
    >
      {icon} <span>Support</span>
    </a>
  );
}

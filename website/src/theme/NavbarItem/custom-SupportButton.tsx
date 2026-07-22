/**
 * @file custom-SupportButton.tsx
 * @description Button component displayed in the navigation bar to trigger the global support/donation modal.
 * Uses official Google Material Symbols Outlined volunteer_activism icon path.
 * 
 * Layer: Navigation theme components.
 * Boundary: Dispatches CustomEvent 'open-support-modal' on click, handled globally.
 */

import React from 'react';
import clsx from 'clsx';
import styles from './custom-SupportButton.module.css';

interface SupportButtonProps {
  mobile?: boolean;
}

/**
 * Renders the official Google Material Symbols Outlined volunteer_activism SVG icon.
 * 
 * @param {Object} props - Component properties containing optional className.
 * @param {string} [props.className] - CSS class for icon styling and transitions.
 * @returns {React.JSX.Element} Volunteer activism vector SVG element.
 */
function VolunteerActivismIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="16"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={className}
    >
      <path d="M640-440 474-602q-31-30-52.5-66.5T400-748q0-55 38.5-93.5T532-880q32 0 60 13.5t48 36.5q20-23 48-36.5t60-13.5q55 0 93.5 38.5T880-748q0 43-21 79.5T807-602L640-440Zm0-112 109-107q19-19 35-40.5t16-48.5q0-22-15-37t-37-15q-14 0-26.5 5.5T700-778l-60 72-60-72q-9-11-21.5-16.5T532-800q-22 0-37 15t-15 37q0 27 16 48.5t35 40.5l109 107ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Zm520-546Z" />
    </svg>
  );
}

/**
 * SupportButton component.
 * Renders support navigation item in both desktop navbar and mobile sidebar layouts.
 * 
 * @param {SupportButtonProps} props - Component properties indicating desktop vs mobile view.
 * @returns {React.JSX.Element | null} Support button element or mobile menu item.
 */
export default function SupportButton({ mobile }: SupportButtonProps): React.JSX.Element | null {
  if (mobile) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-support-modal'));
    }
  };

  const icon = <VolunteerActivismIcon className={styles.supportIcon} />;

  return (
    <a
      href="#"
      onClick={handleClick}
      className={clsx('navbar__item navbar__link', styles.supportBtn)}
      title="Support & Donations"
      aria-label="Support & Donations"
    >
      {icon} <span>Support</span>
    </a>
  );
}

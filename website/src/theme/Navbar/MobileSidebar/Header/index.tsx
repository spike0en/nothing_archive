import React, { type ReactNode } from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarLogo from '@theme/Navbar/Logo';
import { FaTimes } from 'react-icons/fa';

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  const label = translate({
    id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
    message: 'Close navigation bar',
    description: 'The ARIA label for close button of mobile sidebar',
  });

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}>
      <FaTimes size={14} aria-hidden="true" />
    </button>
  );
}

export default function NavbarMobileSidebarHeader(): ReactNode {
  return (
    <div className="navbar-sidebar__brand">
      <NavbarLogo />
      <NavbarColorModeToggle className="margin-right--md" />
      <CloseButton />
    </div>
  );
}

import React, { useMemo, type ReactNode } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { useHomePageRoute } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';

import styles from './styles.module.css';

const CATEGORY_LINK_MAP = {
  Resources: '/docs/devices',
  'About the Project': '/docs/intro',
  'Community Archives': '/docs/apps',
} as const;

function getPreferredCategoryHref(label: string): string | undefined {
  if (label === 'Resources') {
    return CATEGORY_LINK_MAP.Resources;
  }
  if (label === 'About the Project') {
    return CATEGORY_LINK_MAP['About the Project'];
  }
  if (label === 'Community Archives') {
    return CATEGORY_LINK_MAP['Community Archives'];
  }
  return undefined;
}

function BreadcrumbsItemLink({
  children,
  href,
  isLast,
}: {
  children: ReactNode;
  href: string | undefined;
  isLast: boolean;
}): ReactNode {
  const className = 'breadcrumbs__link';
  if (isLast) {
    return <span className={className}>{children}</span>;
  }
  return href ? (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

function BreadcrumbsItem({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}): ReactNode {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}>
      {children}
    </li>
  );
}

export default function DocBreadcrumbs(): ReactNode {
  const rawBreadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();

  const breadcrumbs = useMemo(() => {
    if (!rawBreadcrumbs) {
      return null;
    }
    const currentDoc = rawBreadcrumbs[rawBreadcrumbs.length - 1];
    const currentDocHref = currentDoc?.href;

    return rawBreadcrumbs.map((item) => {
      if (item.type === 'category' && !item.linkUnlisted) {
        const preferredHref = getPreferredCategoryHref(item.label);
        if (preferredHref && preferredHref !== item.href) {
          return {
            ...item,
            href: preferredHref,
          };
        }

        // For device model categories containing direct changelog docs:
        // Make the core model name clickable ONLY when viewing a different (older) sub-changelog.
        // Clicking it redirects to the latest version of the changelog for that model.
        // SAFETY: PropSidebarItemCategory includes items array when item.type is 'category'.
        const categoryItems = (item as { items?: Array<{ type: string; href?: string }> }).items;
        if (Array.isArray(categoryItems)) {
          const directDoc = categoryItems.find(sub => sub.type === 'link' && sub.href);
          const latestDocHref = directDoc?.href;
          if (
            latestDocHref &&
            currentDocHref &&
            latestDocHref.replace(/\/$/, '') !== currentDocHref.replace(/\/$/, '')
          ) {
            return {
              ...item,
              href: latestDocHref,
            };
          }
        }
      }
      return item;
    });
  }, [rawBreadcrumbs]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbsContainer,
        )}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}>
        <ul className="breadcrumbs">
          {homePageRoute && <HomeBreadcrumbItem />}
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const href =
              item.type === 'category' && item.linkUnlisted
                ? undefined
                : item.href;
            return (
              <BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

/**
 * Root.tsx — Locale preference persistence via cookie.
 *
 * Behaviour:
 *  - On every page, saves the current locale to a cookie so the preference
 *    survives browser restarts.
 *  - On the very first render of a session, if the visitor lands on the
 *    default (English) locale but has a non-English cookie, they are
 *    transparently redirected to the equivalent page in their saved locale.
 *  - When a user explicitly switches back to English, the cookie is updated
 *    and no redirect occurs on subsequent visits.
 */

import React, { useEffect, useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const COOKIE_NAME = 'preferred-locale';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

function getLocaleCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setLocaleCookie(locale: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = [
    `${COOKIE_NAME}=${encodeURIComponent(locale)}`,
    `max-age=${COOKIE_MAX_AGE}`,
    'path=/',
    'SameSite=Lax',
  ].join('; ');
}

interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps): React.JSX.Element {
  const { i18n, siteConfig } = useDocusaurusContext();
  const { currentLocale, defaultLocale, locales } = i18n;
  const { baseUrl } = siteConfig;

  // Guard against double-redirect within the same page lifecycle.
  const hasRedirected = useRef(false);

  // Persist locale to cookie on every locale change (including explicit
  // switches back to English).
  useEffect(() => {
    setLocaleCookie(currentLocale);
  }, [currentLocale]);

  // On first mount only: redirect to saved locale if the visitor arrived on
  // the default locale but has a different preference stored in the cookie.
  useEffect(() => {
    if (typeof window === 'undefined' || hasRedirected.current) return;

    const saved = getLocaleCookie();

    // Nothing to do if: no cookie, already on the right locale,
    // saved locale is unknown, or saved preference is the default.
    if (
      !saved ||
      saved === currentLocale ||
      !locales.includes(saved) ||
      saved === defaultLocale
    ) {
      return;
    }

    // Only redirect visitors who landed on the default locale.
    if (currentLocale !== defaultLocale) return;

    hasRedirected.current = true;

    // Build the equivalent URL in the saved locale.
    // e.g. /nothing_archive/docs/intro  →  /nothing_archive/zh-TW/docs/intro
    const { origin, pathname } = window.location;
    const pathAfterBase = pathname.startsWith(baseUrl)
      ? pathname.slice(baseUrl.length) // e.g. "docs/intro" or ""
      : pathname.slice(1);

    const target = `${origin}${baseUrl}${saved}/${pathAfterBase}`;
    window.location.replace(target);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
}

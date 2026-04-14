/**
 * Root.tsx — Locale preference persistence via cookie.
 *
 * Behaviour:
 *  - On a non-default locale: the cookie is updated to the current locale
 *    immediately, preserving the user's preference across sessions.
 *  - On the default (English) locale:
 *      a) If the referrer is a non-default locale page on this site, the user
 *         explicitly switched to English via the locale dropdown — update the
 *         cookie to English so future visits stay in English.
 *      b) Otherwise (fresh visit, external link, bookmark, typed URL, etc.):
 *         read the cookie; if a non-default preference is stored, redirect to
 *         the equivalent page in that locale WITHOUT touching the cookie.
 *
 * This design avoids the "overwrite then redirect" race that previously caused
 * the cookie to be reset to English whenever the user navigated to the default
 * locale root URL.
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

  const hasRedirected = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ── Non-default locale ────────────────────────────────────────────────
    // Always persist the current locale; nothing else to do.
    if (currentLocale !== defaultLocale) {
      setLocaleCookie(currentLocale);
      return;
    }

    // ── Default (English) locale ──────────────────────────────────────────

    // Determine whether the user arrived here from a non-default locale page
    // on this same site (i.e. they clicked the locale dropdown to pick English).
    const referrer = document.referrer;
    const nonDefaultLocales = locales.filter(l => l !== defaultLocale);
    const cameFromNonDefault = nonDefaultLocales.some(l => {
      // Match paths like /nothing_archive/zh-TW/ or /nothing_archive/zh-TW
      const prefix = `${baseUrl}${l}`;
      return referrer.includes(prefix + '/') || referrer.endsWith(prefix);
    });

    if (cameFromNonDefault) {
      // User explicitly chose English — record the new preference.
      setLocaleCookie(defaultLocale);
      return;
    }

    // Fresh arrival on the English page: check for a saved non-default preference.
    const saved = getLocaleCookie();

    if (
      saved &&
      saved !== defaultLocale &&
      locales.includes(saved) &&
      !hasRedirected.current
    ) {
      hasRedirected.current = true;

      // Redirect to the equivalent page in the saved locale.
      // e.g. /nothing_archive/docs/intro → /nothing_archive/zh-TW/docs/intro
      const { origin, pathname } = window.location;
      const pathAfterBase = pathname.startsWith(baseUrl)
        ? pathname.slice(baseUrl.length)
        : pathname.slice(1);

      window.location.replace(`${origin}${baseUrl}${saved}/${pathAfterBase}`);
      return; // Do NOT overwrite the cookie.
    }

    // No saved preference (or already English): persist English.
    setLocaleCookie(defaultLocale);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
}

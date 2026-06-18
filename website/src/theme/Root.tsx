import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CopyButtonSetup from '../components/CopyButton';
import Translate from '@docusaurus/Translate';

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
  const [showShortcuts, setShowShortcuts] = useState(false);

  // 1. Locale handling
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
    const isDev =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1');

    if (
      !isDev &&
      saved &&
      saved !== defaultLocale &&
      locales.includes(saved) &&
      !hasRedirected.current
    ) {
      hasRedirected.current = true;

      // Redirect to the equivalent page in the saved locale.
      // e.g. /nothing_archive/docs/intro → /nothing_archive/zh-TW/docs/intro
      const { origin, pathname } = window.location;
      const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      let pathAfterBase = pathname.startsWith(cleanBaseUrl)
        ? pathname.slice(cleanBaseUrl.length)
        : pathname;

      if (!pathAfterBase.startsWith('/')) {
        pathAfterBase = '/' + pathAfterBase;
      }

      window.location.replace(`${origin}${cleanBaseUrl}/${saved}${pathAfterBase}`);
      return; // Do NOT overwrite the cookie.
    }

    // No saved preference (or already English): persist English.
    setLocaleCookie(defaultLocale);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Keyboard shortcut map event listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          activeEl.hasAttribute('contenteditable'));

      if (isInput) return;

      if (e.key === '?') {
        setShowShortcuts(prev => !prev);
      } else if (e.key === 'Escape') {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 3. Scroll progress ring — SVG injected into the back-to-top button
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const RADIUS = 24;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const SVG_NS = 'http://www.w3.org/2000/svg';

    // Create SVG ring
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'scroll-ring-svg');
    svg.setAttribute('viewBox', '0 0 52 52');
    svg.setAttribute('aria-hidden', 'true');

    const trackCircle = document.createElementNS(SVG_NS, 'circle');
    trackCircle.setAttribute('cx', '26');
    trackCircle.setAttribute('cy', '26');
    trackCircle.setAttribute('r', String(RADIUS));
    trackCircle.setAttribute('fill', 'none');
    trackCircle.setAttribute('stroke', 'currentColor');
    trackCircle.setAttribute('stroke-width', '2.5');
    trackCircle.setAttribute('opacity', '0.12');
    trackCircle.setAttribute('stroke-dasharray', String(CIRCUMFERENCE));
    trackCircle.setAttribute('stroke-dashoffset', '0');

    const progressCircle = document.createElementNS(SVG_NS, 'circle');
    progressCircle.setAttribute('cx', '26');
    progressCircle.setAttribute('cy', '26');
    progressCircle.setAttribute('r', String(RADIUS));
    progressCircle.setAttribute('fill', 'none');
    progressCircle.setAttribute('stroke', 'var(--ifm-color-primary)');
    progressCircle.setAttribute('stroke-width', '2.5');
    progressCircle.setAttribute('stroke-linecap', 'round');
    progressCircle.setAttribute('stroke-dasharray', String(CIRCUMFERENCE));
    progressCircle.setAttribute('stroke-dashoffset', String(CIRCUMFERENCE));
    progressCircle.style.transition = 'stroke-dashoffset 0.1s linear';

    svg.appendChild(trackCircle);
    svg.appendChild(progressCircle);

    let animFrame: number | null = null;
    let btnEl: Element | null = null;

    const injectSVG = () => {
      const btn = document.querySelector('.theme-back-to-top-button');
      if (btn && !btn.querySelector('.scroll-ring-svg')) {
        btn.appendChild(svg);
        btnEl = btn;
      }
    };

    const updateRing = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalScroll =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = totalScroll > 0 ? scrollTop / totalScroll : 0;
      const offset = CIRCUMFERENCE * (1 - pct);
      progressCircle.setAttribute('stroke-dashoffset', String(offset));
      // Inject on first scroll if button appeared late
      if (!btnEl) injectSVG();
    };

    const handleScroll = () => {
      if (animFrame) return;
      animFrame = window.requestAnimationFrame(() => {
        updateRing();
        animFrame = null;
      });
    };

    // Retry injection: button appears only after Docusaurus mounts
    const tryInject = () => {
      injectSVG();
      if (!document.querySelector('.scroll-ring-svg')) {
        setTimeout(tryInject, 200);
      }
    };
    tryInject();

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateRing();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrame) window.cancelAnimationFrame(animFrame);
      svg.remove();
    };
  }, []);

  return (
    <>
      {children}
      <CopyButtonSetup />

      {showShortcuts && (
        <div
          className="shortcut-modal-overlay"
          onClick={() => setShowShortcuts(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcut-title"
        >
          <div className="shortcut-modal" onClick={e => e.stopPropagation()}>
            <div className="shortcut-modal-header">
              <span className="shortcut-modal-dot" />
              <span id="shortcut-title">
                <Translate id="shortcut.modal.title">KEYBOARD SHORTCUTS</Translate>
              </span>
              <button
                className="shortcut-modal-close"
                onClick={() => setShowShortcuts(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="shortcut-modal-body">
              <table className="shortcut-table">
                <thead>
                  <tr>
                    <th>
                      <Translate id="shortcut.modal.header.action">ACTION</Translate>
                    </th>
                    <th>
                      <Translate id="shortcut.modal.header.key">SHORTCUT</Translate>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Translate id="shortcut.modal.search">Search Documentation</Translate>
                    </td>
                    <td>
                      <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Translate id="shortcut.modal.help">Open Shortcut Map</Translate>
                    </td>
                    <td>
                      <kbd>?</kbd>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Translate id="shortcut.modal.close">Close Shortcut Map / Clear Search</Translate>
                    </td>
                    <td>
                      <kbd>Esc</kbd>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Translate id="shortcut.modal.nav">Navigate Search Results</Translate>
                    </td>
                    <td>
                      <kbd>↑</kbd> <kbd>↓</kbd> / <kbd>Enter</kbd>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


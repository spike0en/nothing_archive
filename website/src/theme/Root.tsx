/**
 * @file Root.tsx
 * @description Top-level theme wrapper component that injects global modals, PWA providers, 
 * scroll progress rings, and keyboard shortcut event listeners across all routes.
 * 
 * Layer: Theme root wrappers.
 * Boundary: Mounts SupportModal, PwaProvider, and global event listeners.
 */

import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import CopyButtonSetup from '../components/CopyButton';
import { PwaProvider } from '../components/PwaContext';
import SupportModal from '../components/SupportModal';
import SupportNudge from '../components/SupportNudge';
import MagneticCursorRing from '../components/MagneticCursorRing';

import PwaReloadPopup from './PwaReloadPopup';

interface RootProps {
  children: React.ReactNode;
}

/**
 * Root component wrapping the entire Docusaurus application.
 */
export default function Root({ children }: RootProps): React.JSX.Element {
  const location = useLocation();

  // Synchronously migrate existing users to "System" theme by default on client-side
  if (globalThis.window !== undefined) {
    try {
      const MIGRATE_KEY = 'nothing_archive_theme_migrated_v1';
      if (!localStorage.getItem(MIGRATE_KEY)) {
        localStorage.removeItem('theme');
        document.documentElement.setAttribute('data-theme-choice', 'system');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme);
        localStorage.setItem(MIGRATE_KEY, 'true');
      }
    } catch (e) {
      console.warn('Theme migration failed:', e);
    }
  }

  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showPwaTest, setShowPwaTest] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (showShortcuts) {
      // SAFETY: Active DOM element focus casting
      previousActiveElement.current = document.activeElement as HTMLElement;
      // SAFETY: Modal close button query selector casting
      const closeBtn = modalRef.current?.querySelector('.shortcut-modal-close') as HTMLElement;
      if (closeBtn) {
        // 50ms delay accommodates the CSS transition before claiming focus.
        setTimeout(() => closeBtn.focus(), 50);
      }
    } else {
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
    }
  }, [showShortcuts]);

  const handleModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab') {
      const focusableEls = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex="0"]'
      );
      if (focusableEls && focusableEls.length > 0) {
        // SAFETY: Focusable element array casting
        const firstEl = focusableEls[0] as HTMLElement;
        // SAFETY: Focusable element array casting
        const lastEl = focusableEls[focusableEls.length - 1] as HTMLElement;
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      }
    } else if (e.key === 'Escape') {
      setShowShortcuts(false);
    }
  };

  // Support modal, PWA reload triggers, and hash-based details accordion expansion
  useEffect(() => {
    if (globalThis.window === undefined) return;

    const checkHash = () => {
      const currentHash = location.hash || window.location.hash;
      if (currentHash === '#support' || currentHash === '#donate') {
        setShowSupport(true);
        // Clear hash to allow re-triggering later without polluting navigation history
        try {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch (e) {
          console.warn('Failed to clear hash:', e);
        }
      } else if (
        currentHash === '#pwa-reload' ||
        currentHash === '#pwa-test' ||
        currentHash === '#stack-test' ||
        window.location.search.includes('pwa-test=true')
      ) {
        setShowPwaTest(true);
      } else if (currentHash && currentHash.length > 1) {
        try {
          const id = decodeURIComponent(currentHash.slice(1));
          const target = document.getElementById(id);
          if (target) {
            // SAFETY: target.tagName check confirms HTMLDetailsElement instance
            const details = target.tagName === 'DETAILS' ? (target as HTMLDetailsElement) : target.closest('details');
            if (details) {
              const summary = details.querySelector('summary');
              const isClosed = !details.open || details.getAttribute('data-collapsed') === 'true';

              // If closed, trigger summary click to activate Docusaurus's React state and expand collapsible content
              if (isClosed && summary) {
                summary.click();
              } else if (!details.open) {
                details.open = true;
              }

              // Ensure inline styles on collapsible wrapper allow visibility
              const collapsible = details.querySelector('[class*="collapsibleContent"]')?.parentElement;
              if (collapsible) {
                collapsible.style.display = 'block';
                collapsible.style.height = 'auto';
                collapsible.style.overflow = 'visible';
              }
              details.setAttribute('data-collapsed', 'false');
              details.open = true;

              // Smoothly scroll to the target with navbar offset
              const scrollToElement = () => {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 60;
                const rect = details.getBoundingClientRect();
                const targetTop = rect.top + window.scrollY;
                // Offset by navbar height + 20px padding so the summary header is completely visible with breathing room
                const offsetPosition = Math.max(0, targetTop - navbarHeight - 20);

                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth',
                });
              };

              // Schedule scroll after accordion layout shifts
              setTimeout(scrollToElement, 100);
            }
          }
        } catch {
          // Ignore invalid URI component in hash
        }
      }
    };

    // Run checks at intervals to handle initial hydration and DOM mount transitions
    checkHash();
    const timer1 = setTimeout(checkHash, 100);
    const timer2 = setTimeout(checkHash, 300);

    window.addEventListener('hashchange', checkHash);

    const handleOpenSupport = () => {
      setShowSupport(true);
    };
    window.addEventListener('open-support-modal', handleOpenSupport);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('open-support-modal', handleOpenSupport);
    };
  }, [location.pathname, location.hash]);

  // Keyboard shortcut map event listener
  useEffect(() => {
    if (globalThis.window === undefined) return;

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

  // Appends canonical source attribution metadata to copied text snippets (>60 chars) to maintain project credit
  useEffect(() => {
    if (globalThis.window === undefined) return;

    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.toString().trim().length < 60) return;

      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.hasAttribute('contenteditable'))) return;

      const copiedText = selection.toString();
      const attribution = `\n\n— Source: Nothing Archive (${window.location.href})`;
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', copiedText + attribution);
        e.preventDefault();
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => document.removeEventListener('copy', handleCopy);
  }, []);

  // Scroll progress ring: SVG injected into the back-to-top button
  useEffect(() => {
    if (globalThis.window === undefined) return;

    const RADIUS = 21;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const SVG_NS = 'http://www.w3.org/2000/svg';

    // Create SVG ring
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'scroll-ring-svg');
    svg.setAttribute('viewBox', '0 0 46 46');
    svg.setAttribute('aria-hidden', 'true');

    const trackCircle = document.createElementNS(SVG_NS, 'circle');
    trackCircle.setAttribute('cx', '23');
    trackCircle.setAttribute('cy', '23');
    trackCircle.setAttribute('r', String(RADIUS));
    trackCircle.setAttribute('fill', 'none');
    trackCircle.setAttribute('class', 'scroll-ring-track');
    trackCircle.setAttribute('stroke-width', '1.75');
    trackCircle.setAttribute('stroke-dasharray', String(CIRCUMFERENCE));
    trackCircle.setAttribute('stroke-dashoffset', '0');

    const progressCircle = document.createElementNS(SVG_NS, 'circle');
    progressCircle.setAttribute('cx', '23');
    progressCircle.setAttribute('cy', '23');
    progressCircle.setAttribute('r', String(RADIUS));
    progressCircle.setAttribute('fill', 'none');
    progressCircle.setAttribute('class', 'scroll-ring-progress');
    progressCircle.setAttribute('stroke', 'var(--ifm-color-primary)');
    progressCircle.setAttribute('stroke-width', '1.75');
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
    <PwaProvider>
      <span id="support" style={{ display: 'none' }} />
      <span id="donate" style={{ display: 'none' }} />
      {children}
      <CopyButtonSetup />
      <SupportModal isOpen={showSupport} onClose={() => setShowSupport(false)} />
      <SupportNudge />
      {showPwaTest && (
        <PwaReloadPopup onReload={() => window.location.reload()} />
      )}

      {showShortcuts && (
        <div
          ref={modalRef}
          className="shortcut-modal-overlay"
          onClick={() => setShowShortcuts(false)}
          onKeyDown={handleModalKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcut-title"
        >
          <div className="shortcut-modal" onClick={e => e.stopPropagation()}>
            <div className="shortcut-modal-header">
              <span className="shortcut-modal-dot" />
              <span id="shortcut-title">KEYBOARD SHORTCUTS</span>
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
                    <th>ACTION</th>
                    <th>SHORTCUT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Search Documentation</td>
                    <td>
                      <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd>
                    </td>
                  </tr>
                  <tr>
                    <td>Open Shortcut Map</td>
                    <td>
                      <kbd>?</kbd>
                    </td>
                  </tr>
                  <tr>
                    <td>Close Shortcut Map / Clear Search</td>
                    <td>
                      <kbd>Esc</kbd>
                    </td>
                  </tr>
                  <tr>
                    <td>Navigate Search Results</td>
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
      <MagneticCursorRing />
    </PwaProvider>
  );
}


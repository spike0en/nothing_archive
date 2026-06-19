import React, { useEffect, useState } from 'react';
import CopyButtonSetup from '../components/CopyButton';

interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps): React.JSX.Element {
  const [showShortcuts, setShowShortcuts] = useState(false);

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
    </>
  );
}


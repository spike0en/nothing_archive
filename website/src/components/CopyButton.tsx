/**
 * @file CopyButton.tsx
 * @description Dynamic DOM enhancement script injecting copy buttons into markdown tables
 * and handling global theme transition classes.
 * 
 * Layer: Shared DOM utility components.
 * Boundary: Direct DOM mutation and event handling on rendered tables.
 */

import { useEffect } from 'react';
import { translate } from '@docusaurus/Translate';

const COPY_SVG = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const CHECK_SVG = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

const LONG_PRESS_MS = 500;

export default function CopyButtonSetup(): null {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    let isInitialMount = true;
    setTimeout(() => {
      isInitialMount = false;
    }, 1000); // 1000ms delay to bypass initial hydration/mounting theme changes

    // 1. Setup Theme Transition Handling (always active for all devices)
    const triggerThemeTransition = () => {
      document.documentElement.classList.add('theme-transition');
      
      if ((window as any).themeTransitionTimeout) {
        clearTimeout((window as any).themeTransitionTimeout);
      }
      
      (window as any).themeTransitionTimeout = setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 850); // 850ms covers React render blocking during complex table re-renders
    };

    // A. Eagerly set transition class on click to run before Docusaurus state update
    const handleToggleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest('button[class*="toggleButton"]') ||
        target?.closest('[aria-label*="Switch between dark and light mode"]') ||
        target?.closest('[class*="toggleContainer"]')
      ) {
        triggerThemeTransition();
      }
    };
    document.addEventListener('click', handleToggleClick, { capture: true, passive: true });

    // B. Observer fallback for keyboard shortcuts, system preference changes, or tab synchronization
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          if (!isInitialMount) {
            triggerThemeTransition();
          }
        }
      });
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // 2. Wrap tables (needed for responsive tables on all devices)
    const wrapTables = () => {
      const tables = document.querySelectorAll('.markdown table, .theme-doc-markdown table, article table');
      tables.forEach((table) => {
        const parent = table.parentElement;
        if (!parent) return;

        if (
          parent.classList.contains('table-responsive-fallback') ||
          parent.classList.contains('tableWrapper') ||
          parent.className.includes('tableWrapper')
        ) {
          return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive-fallback';

        if (table.parentNode) {
          table.parentNode.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }
      });
    };

    // 3. Desktop-only features (copy buttons)
    const hasHoverSupport = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    const setupCopyButtons = () => {
      if (!hasHoverSupport) return;
      const links = document.querySelectorAll('table td a');
      links.forEach((link) => {
        const anchor = link as HTMLAnchorElement;
        if (anchor.dataset.copySetup) {
          return;
        }

        anchor.dataset.copySetup = 'true';

        const href = anchor.getAttribute('href');
        if (!href || href.startsWith('#')) {
          return;
        }

        if (anchor.querySelector('img') || anchor.querySelector('svg')) {
          return;
        }

        const wrapper = document.createElement('span');
        wrapper.className = 'table-copy-wrapper';

        const button = document.createElement('button');
        button.className = 'table-copy-btn';
        button.type = 'button';
        button.title = translate({id: 'copyButton.copyLink', message: 'Copy link', description: 'Tooltip for copying a table link'});
        button.innerHTML = COPY_SVG;

        button.addEventListener('click', (clickEvent) => {
          clickEvent.preventDefault();
          clickEvent.stopPropagation();

          const fullUrl = anchor.href;

          navigator.clipboard.writeText(fullUrl).then(() => {
            button.classList.add('copied');
            button.innerHTML = CHECK_SVG;

            setTimeout(() => {
              button.classList.remove('copied');
              button.innerHTML = COPY_SVG;
            }, 2000);
          }).catch((err) => {
            console.error('Failed to copy text: ', err);
          });
        });

        if (anchor.parentNode) {
          anchor.parentNode.insertBefore(wrapper, anchor);
          wrapper.appendChild(anchor);
          wrapper.appendChild(button);
        }
      });
    };

    const dismissCopyButtons = (event: MouseEvent) => {
      if (!hasHoverSupport) return;
      const target = event.target as Element | null;
      if (target?.closest('.table-copy-wrapper')) {
        return;
      }

      document.querySelectorAll('.table-copy-wrapper.copy-btn-visible').forEach((el) => {
        el.classList.remove('copy-btn-visible');
      });
    };

    const runSetup = () => {
      wrapTables();
      setupCopyButtons();
    };

    runSetup();

    if (hasHoverSupport) {
      document.addEventListener('click', dismissCopyButtons);
    }

    // Client-side route changes inject new markdown tables after initial mount.
    const routeObserver = new MutationObserver(() => {
      runSetup();
    });
    routeObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      themeObserver.disconnect();
      routeObserver.disconnect();
      document.removeEventListener('click', handleToggleClick, { capture: true });
      if (hasHoverSupport) {
        document.removeEventListener('click', dismissCopyButtons);
      }
    };
  }, []);

  return null;
}

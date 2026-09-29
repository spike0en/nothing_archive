/**
 * Injects copy buttons into markdown tables and handles theme transition styling.
 */

import { useEffect } from 'react';

const COPY_SVG = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const CHECK_SVG = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;


export default function CopyButtonSetup(): null {
  useEffect(() => {
    if (globalThis.window === undefined || globalThis.document === undefined) {
      return;
    }

    let isInitialMount = true;
    setTimeout(() => {
      isInitialMount = false;
    }, 1000); // 1000ms delay bypasses theme flips during initial hydration

    let themeTransitionTimeout: ReturnType<typeof setTimeout> | null = null;

    const triggerThemeTransition = () => {
      document.documentElement.classList.add('theme-transition');
      
      if (themeTransitionTimeout) {
        clearTimeout(themeTransitionTimeout);
      }
      
      themeTransitionTimeout = setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 850); // 850ms covers React render blocking during complex table re-renders
    };

    // Eagerly set transition class on click before Docusaurus state update
    const handleToggleClick = (event: MouseEvent) => {
      // SAFETY: DOM mouse event target element type
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

    // Mutation fallback for keyboard shortcuts, system preference changes, or cross-tab sync
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

    const hasHoverSupport = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    const setupCopyButtons = () => {
      if (!hasHoverSupport) return;
      const links = document.querySelectorAll('table td a');
      links.forEach((link) => {
        // SAFETY: DOM element query selector result casting
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
        button.title = 'Copy link';
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

    setupCopyButtons();

    // Client-side route changes inject new markdown tables after initial mount.
    const routeObserver = new MutationObserver(() => {
      setupCopyButtons();
    });
    routeObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (themeTransitionTimeout) {
        clearTimeout(themeTransitionTimeout);
      }
      themeObserver.disconnect();
      routeObserver.disconnect();
      document.removeEventListener('click', handleToggleClick, { capture: true });
    };
  }, []);

  return null;
}

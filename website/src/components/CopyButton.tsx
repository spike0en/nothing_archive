import { useEffect } from 'react';

const COPY_SVG = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const CHECK_SVG = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

const LONG_PRESS_MS = 500;

export default function CopyButtonSetup(): null {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Only initialize copy buttons on desktop/pointer devices supporting hover
    const hasHoverSupport = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHoverSupport) {
      return;
    }

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

    const setupCopyButtons = () => {
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

    const dismissCopyButtons = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest('.table-copy-wrapper')) {
        return;
      }

      document.querySelectorAll('.table-copy-wrapper.copy-btn-visible').forEach((el) => {
        el.classList.remove('copy-btn-visible');
      });
    };

    const setupThemeToggleListener = () => {
      const handleToggleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        if (
          target?.closest('button[class*="toggleButton"]') ||
          target?.closest('[aria-label*="Switch between dark and light mode"]')
        ) {
          document.documentElement.classList.add('theme-transition');
          setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
          }, 500);
        }
      };
      document.addEventListener('click', handleToggleClick, { passive: true });
    };

    const runSetup = () => {
      wrapTables();
      setupCopyButtons();
      setupThemeToggleListener();
    };

    runSetup();

    document.addEventListener('click', dismissCopyButtons);

    // Client-side route changes inject new markdown tables after initial mount.
    const observer = new MutationObserver(() => {
      runSetup();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      document.removeEventListener('click', dismissCopyButtons);
    };
  }, []);

  return null;
}

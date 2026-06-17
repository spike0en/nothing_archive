import { useEffect } from 'react';

const COPY_SVG = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const CHECK_SVG = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

export default function CopyButtonSetup(): null {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('table td a') as HTMLAnchorElement | null;
      if (!link || link.dataset.copySetup) {
        return;
      }

      // Mark link as set up
      link.dataset.copySetup = 'true';

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) {
        return;
      }

      if (link.querySelector('img') || link.querySelector('svg')) {
        return;
      }

      const wrapper = document.createElement('span');
      wrapper.className = 'table-copy-wrapper';

      const button = document.createElement('button');
      button.className = 'table-copy-btn';
      button.type = 'button';
      button.title = 'Copy Link';
      button.innerHTML = COPY_SVG;

      button.addEventListener('click', (clickEvent) => {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();

        const fullUrl = link.href;

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

      if (link.parentNode) {
        link.parentNode.insertBefore(wrapper, link);
        wrapper.appendChild(link);
        wrapper.appendChild(button);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return null;
}

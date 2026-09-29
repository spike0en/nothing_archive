import { useEffect, type RefObject } from 'react';

/**
 * Invokes a callback when a mousedown event occurs outside the referenced DOM element.
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  active: boolean
): void {
  useEffect(() => {
    if (!active) return;

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler, active]);
}

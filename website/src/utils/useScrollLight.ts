import { useEffect, useRef, useState } from 'react';

/**
 * Illuminates the scrollbar and arrow steppers during touch/scroll interaction.
 * Activates on scroll or touchstart, and turns off with an 800ms debounce after interaction ends.
 */
export function useScrollLight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startLit = () => {
      setIsScrolling(true);
      el.setAttribute('data-scrolling', 'true');
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };

    const stopLitDebounced = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setIsScrolling(false);
        el.removeAttribute('data-scrolling');
      }, 800);
    };

    const onScroll = () => {
      startLit();
      stopLitDebounced();
    };

    const onTouchStart = () => {
      startLit();
    };

    const onTouchEnd = () => {
      stopLitDebounced();
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  return [ref, isScrolling] as const;
}


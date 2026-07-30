/**
 * @file MagneticCursorRing.tsx
 * @description Magnetic cursor ring component with target interpolation and viewport bounds handling.
 * 
 * Layer: Theme components.
 * Boundary: Consumes global pointer events and renders a custom cursor overlay.
 */

import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './MagneticCursorRing.module.css';

export default function MagneticCursorRing(): React.JSX.Element | null {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 575px)').matches;
  });

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  /**
   * Syncs viewport state across resize events to toggle cursor overlay on breakpoint boundaries.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(max-width: 575px)');
    const handleMediaChange = () => {
      setIsMobile(mql.matches);
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', handleMediaChange);
    } else {
      mql.addListener(handleMediaChange);
    }
    window.addEventListener('resize', handleMediaChange, { passive: true });

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleMediaChange);
      } else {
        mql.removeListener(handleMediaChange);
      }
      window.removeEventListener('resize', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disabled by default; active only when explicitly enabled in storage
    try {
      const stored = localStorage.getItem('nothing_archive_cursor');
      if (stored === 'enabled') {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    } catch (e) {
      console.warn('Failed to read cursor preference:', e);
      setEnabled(false);
    }

    const handleToggle = (e: Event) => {
      const evt = e as CustomEvent<boolean>;
      if (typeof evt.detail === 'boolean') {
        setEnabled(evt.detail);
      } else {
        const stored = localStorage.getItem('nothing_archive_cursor');
        setEnabled(stored === 'enabled');
      }
    };

    window.addEventListener('nothing_archive_cursor_toggle', handleToggle);
    return () => {
      window.removeEventListener('nothing_archive_cursor_toggle', handleToggle);
    };
  }, []);

  /**
   * Toggles global pointer hiding rules when the custom cursor is active on hover-capable pointer devices.
   */
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const isTouchOnly = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isActive = enabled && !isMobile && !isTouchOnly && !isReducedMotion;

    let styleEl = document.getElementById('nothing-hide-cursor-style') as HTMLStyleElement | null;

    if (isActive) {
      document.documentElement.classList.add('nothing-custom-cursor-active');
      document.body?.classList.add('nothing-custom-cursor-active');

      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'nothing-hide-cursor-style';
        styleEl.innerHTML = `
          @media (min-width: 576px) and (hover: hover) {
            html, body, *, *::before, *::after, *:hover, *:focus, *:active {
              cursor: none !important;
            }
          }
        `;
        document.head.appendChild(styleEl);
      }
    } else {
      document.documentElement.classList.remove('nothing-custom-cursor-active');
      document.body?.classList.remove('nothing-custom-cursor-active');
      styleEl?.remove();
    }

    return () => {
      document.documentElement.classList.remove('nothing-custom-cursor-active');
      document.body?.classList.remove('nothing-custom-cursor-active');
      const el = document.getElementById('nothing-hide-cursor-style');
      el?.remove();
    };
  }, [enabled, isMobile]);

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled || isMobile) return;

    // Exclude touch-only devices (finger input) and respect reduced motion preference
    const isTouchOnly = window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchOnly || isReducedMotion) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;

    let targetWidth = 28;
    let targetHeight = 28;
    let currentWidth = 28;
    let currentHeight = 28;

    let animFrameId: number | null = null;
    let activeElement: HTMLElement | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest<HTMLElement>(
        'a, button, input, select, textarea, [role="button"], [data-magnetic], .button, [class*="featureCard"], [class*="coreCard"], [class*="socialLink"]'
      );

      if (interactive) {
        setIsHovered(true);
        activeElement = interactive;
      } else {
        setIsHovered(false);
        setIsSnapped(false);
        activeElement = null;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    /**
     * Updates spring physics and target dimension interpolation each frame.
     */
    const render = () => {
      let targetX = mouseX;
      let targetY = mouseY;

      if (activeElement) {
        targetWidth = 38;
        targetHeight = 38;
        setIsSnapped(false);
      } else {
        targetWidth = 28;
        targetHeight = 28;
        setIsSnapped(false);
      }

      // Lerp spring coefficients: 0.18 for ring inertia, 0.45 for dot response
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;

      currentWidth += (targetWidth - currentWidth) * 0.2;
      currentHeight += (targetHeight - currentHeight) * 0.2;

      // GPU-accelerated transform updates
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        ringRef.current.style.width = `${currentWidth}px`;
        ringRef.current.style.height = `${currentHeight}px`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animFrameId = requestAnimationFrame(render);

    return () => {
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, enabled, isMobile]);

  if (!enabled || isMobile) return null;

  return (
    <div className={clsx(styles.cursorContainer, isVisible && styles.cursorVisible)}>
      <div
        ref={ringRef}
        className={clsx(
          styles.cursorRing,
          isHovered && styles.cursorRingHovered,
          isSnapped && styles.cursorRingSnapped
        )}
      />
      <div
        ref={dotRef}
        className={clsx(
          styles.cursorDot,
          isHovered && styles.cursorDotHovered,
          isSnapped && styles.cursorDotSnapped
        )}
      />
    </div>
  );
}

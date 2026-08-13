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

/**
 * Custom cursor overlay component providing smoothed pointer tracking and interactive target scaling.
 * Maintains pointer position state across viewport mouseenter/mouseleave transitions to prevent position jumps.
 */
export default function MagneticCursorRing(): React.JSX.Element | null {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (globalThis.window === undefined) return false;
    return window.matchMedia('(max-width: 575px)').matches;
  });

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Position tracking ref persistent across effect tear-downs and visibility toggles
  const posRef = useRef({
    mouseX: -100,
    mouseY: -100,
    ringX: -100,
    ringY: -100,
    dotX: -100,
    dotY: -100,
    targetWidth: 28,
    targetHeight: 28,
    currentWidth: 28,
    currentHeight: 28,
    isInitialized: false,
  });

  const isVisibleRef = useRef(false);
  const activeElementRef = useRef<HTMLElement | null>(null);

  /**
   * Syncs viewport state across resize events to toggle cursor overlay on breakpoint boundaries.
   */
  useEffect(() => {
    if (globalThis.window === undefined) return;

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

  /**
   * Reads initial cursor preference from local storage and subscribes to toggle custom events.
   */
  useEffect(() => {
    if (globalThis.window === undefined) return;

    try {
      const stored = localStorage.getItem('nothing_archive_cursor');
      setEnabled(stored === 'enabled');
    } catch (e) {
      console.warn('Failed to read cursor preference:', e);
      setEnabled(false);
    }

    const handleToggle = (e: Event) => {
      // SAFETY: Event dispatched by custom toggle event carrying boolean detail payload.
      const evt = e as CustomEvent<boolean>;
      if (Object.prototype.toString.call(evt.detail) === '[object Boolean]') {
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
    if (globalThis.document === undefined) return;

    const isTouchOnly = globalThis.window !== undefined && window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    const isReducedMotion = globalThis.window !== undefined && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isActive = enabled && !isMobile && !isTouchOnly && !isReducedMotion;

    // SAFETY: Element retrieved by known ID string matches DOM style element interface.
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

  /**
   * Manages pointer listeners and requestAnimationFrame spring physics loop.
   */
  useEffect(() => {
    if (globalThis.window === undefined || !enabled || isMobile) return;

    const isTouchOnly = window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchOnly || isReducedMotion) return;

    let animFrameId: number | null = null;

    // Handles incoming pointer movements and updates position state
    const handlePointerMove = (e: PointerEvent) => {
      const pos = posRef.current;
      const { clientX, clientY } = e;

      // On initial move or re-entry after hide, snap positions immediately to prevent translation sweep
      if (!pos.isInitialized || !isVisibleRef.current) {
        pos.mouseX = clientX;
        pos.mouseY = clientY;
        pos.ringX = clientX;
        pos.ringY = clientY;
        pos.dotX = clientX;
        pos.dotY = clientY;
        pos.isInitialized = true;
      } else {
        pos.mouseX = clientX;
        pos.mouseY = clientY;
      }

      if (!isVisibleRef.current) {
        setIsVisible(true);
        isVisibleRef.current = true;
      }

      // SAFETY: Pointer event target in DOM tree is an HTML element or null.
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest<HTMLElement>(
        'a, button, input, select, textarea, [role="button"], [data-magnetic], .button, [class*="featureCard"], [class*="coreCard"], [class*="socialLink"]'
      );

      if (interactive) {
        setIsHovered(true);
        activeElementRef.current = interactive;
      } else {
        setIsHovered(false);
        activeElementRef.current = null;
      }
    };

    // Retains last valid coordinates on leave so fade-out occurs in place rather than translating to off-screen origin
    const handleMouseLeave = () => {
      setIsVisible(false);
      isVisibleRef.current = false;
    };

    // Re-initializes pointer coordinates on viewport re-entry and updates visibility state
    const handleMouseEnter = (e: MouseEvent) => {
      const pos = posRef.current;
      if (Number.isFinite(e.clientX) && Number.isFinite(e.clientY) && e.clientX >= 0 && e.clientY >= 0) {
        pos.mouseX = e.clientX;
        pos.mouseY = e.clientY;
        pos.ringX = e.clientX;
        pos.ringY = e.clientY;
        pos.dotX = e.clientX;
        pos.dotY = e.clientY;
        pos.isInitialized = true;
      }
      setIsVisible(true);
      isVisibleRef.current = true;
    };

    /**
     * Physics frame renderer updating lerp positions and direct DOM transforms.
     */
    const render = () => {
      const pos = posRef.current;

      if (pos.isInitialized) {
        const targetX = pos.mouseX;
        const targetY = pos.mouseY;

        if (activeElementRef.current) {
          pos.targetWidth = 38; // Hover enlarged target diameter (px)
          pos.targetHeight = 38;
        } else {
          pos.targetWidth = 28; // Default cursor ring diameter (px)
          pos.targetHeight = 28;
        }

        // Inertial lerp spring factors: 0.18 for smooth ring trailing, 0.45 for rapid dot response
        pos.ringX += (targetX - pos.ringX) * 0.18;
        pos.ringY += (targetY - pos.ringY) * 0.18;

        pos.dotX += (pos.mouseX - pos.dotX) * 0.45;
        pos.dotY += (pos.mouseY - pos.dotY) * 0.45;

        // Smooth size expansion/contraction factor (0.2)
        pos.currentWidth += (pos.targetWidth - pos.currentWidth) * 0.2;
        pos.currentHeight += (pos.targetHeight - pos.currentHeight) * 0.2;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${pos.ringX}px, ${pos.ringY}px, 0) translate(-50%, -50%)`;
          ringRef.current.style.width = `${pos.currentWidth}px`;
          ringRef.current.style.height = `${pos.currentHeight}px`;
        }

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${pos.dotX}px, ${pos.dotY}px, 0) translate(-50%, -50%)`;
        }
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
  }, [enabled, isMobile]);

  if (!enabled || isMobile) return null;

  return (
    <div className={clsx(styles.cursorContainer, isVisible && styles.cursorVisible)}>
      <div
        ref={ringRef}
        className={clsx(
          styles.cursorRing,
          isHovered && styles.cursorRingHovered
        )}
      />
      <div
        ref={dotRef}
        className={clsx(
          styles.cursorDot,
          isHovered && styles.cursorDotHovered
        )}
      />
    </div>
  );
}


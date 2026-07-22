/**
 * @file MagneticCursorRing.tsx
 * @description Precision target cursor ring with magnetic snapping and lerp physics
 * matching Nothing OS design system.
 * 
 * Layer: Theme components.
 * Boundary: Consumes global pointer events and renders a high-performance cursor overlay.
 */

import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './MagneticCursorRing.module.css';

export default function MagneticCursorRing(): React.JSX.Element | null {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check stored cursor preference
    try {
      const stored = localStorage.getItem('nothing_archive_cursor');
      if (stored === 'enabled') {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    } catch (e) {
      console.warn('Failed to read cursor preference:', e);
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

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled) return;

    // Disable on coarse pointer devices (touchscreens) or reduced motion preference
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReducedMotion) return;

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

      // Inspect target element for interactive hover or magnetic snapping
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
     * Animation frame render loop updating lerp position and element transforms.
     */
    const render = () => {
      let targetX = mouseX;
      let targetY = mouseY;

      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        // Snap target ring to center of small-to-medium interactive elements (<240px wide, <90px tall)
        if (rect.width < 240 && rect.height < 90) {
          targetX = rect.left + rect.width / 2;
          targetY = rect.top + rect.height / 2;
          targetWidth = Math.max(rect.width + 12, 36);
          targetHeight = Math.max(rect.height + 12, 36);
          setIsSnapped(true);
        } else {
          targetWidth = 44;
          targetHeight = 44;
          setIsSnapped(false);
        }
      } else {
        targetWidth = 28;
        targetHeight = 28;
        setIsSnapped(false);
      }

      // Linear interpolation (lerp) coefficients for smooth trailing inertia:
      // Outer ring lerp factor (0.18 = smooth trailing spring), dot lerp factor (0.45 = fast precision response)
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;

      // Smooth dimension expansion lerp (0.2 factor for crisp shape morphing)
      currentWidth += (targetWidth - currentWidth) * 0.2;
      currentHeight += (targetHeight - currentHeight) * 0.2;

      // Apply GPU-accelerated translate3d with -50% offset for concentric centering
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
  }, [isVisible, enabled]);

  if (!enabled) return null;

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
      <div ref={dotRef} className={styles.cursorDot} />
    </div>
  );
}

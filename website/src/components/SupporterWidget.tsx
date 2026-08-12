/**
 * @file SupporterWidget.tsx
 * @description Renders a scrolling marquee (ticker) displaying names of top donors 
 * inside the support modal context.
 * 
 * Layer: Donation modal widgets.
 * Boundary: Renders marquee layout powered by custom CSS transitions and durations.
 */

import React from 'react';
import styles from './SupporterWidget.module.css';

interface SupporterWidgetProps {
  donors: string[];
}

/**
 * SupporterWidget component.
 * Calculates duration dynamically based on list length and renders scrolling track.
 */
export default function SupporterWidget({ donors }: SupporterWidgetProps): React.JSX.Element {
  const displayNames = donors.length > 0 ? donors : ['SUPPORT', 'ARCHIVE', 'COMMUNITY'];

  // Smooth marquee speed: 4.0s per name, capped between 25s and 40s.
  // Calibrated for 60Hz/120Hz/144Hz refresh rates to prevent stroboscopic judder and eye-strain.
  const duration = Math.min(40, Math.max(25, displayNames.length * 4.0));

  // Render the name sequence once; duplicated via aria-hidden copy for continuous loop
  const nameSequence = displayNames.map((name, i) => (
    <React.Fragment key={i}>
      <span className={styles.supporterName}>{name}</span>
      <span className={styles.separator}>·</span>
    </React.Fragment>
  ));

  return (
    <div className={styles.tickerContainer}>
      <span className={styles.tickerLabel}>Top Supporters</span>
      <div className={styles.tickerWindow}>
        <div
          className={styles.marqueeTrack}
          style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
        >
          <span className={styles.nameGroup}>{nameSequence}</span>
          <span className={styles.nameGroup} aria-hidden="true">{nameSequence}</span>
        </div>
      </div>
    </div>
  );
}

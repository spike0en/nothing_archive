import React from 'react';
import styles from './SupporterWidget.module.css';

interface SupporterWidgetProps {
  donors: string[];
}

export default function SupporterWidget({ donors }: SupporterWidgetProps): React.JSX.Element {
  const displayNames = donors.length > 0 ? donors : ['SUPPORT', 'ARCHIVE', 'COMMUNITY'];

  // Scales at 1.2s per name, capped between 6s and 20s.
  // This ensures the loop never takes more than 20 seconds to complete, even with long lists.
  const duration = Math.min(20, Math.max(6, displayNames.length * 1.2));

  // Render the name sequence once; duplicated via aria-hidden copy for seamless loop
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

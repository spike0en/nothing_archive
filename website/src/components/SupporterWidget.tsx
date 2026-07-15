import React from 'react';
import styles from './SupporterWidget.module.css';

interface SupporterWidgetProps {
  donors: string[];
}

export default function SupporterWidget({ donors }: SupporterWidgetProps): React.JSX.Element {
  const displayNames = donors.length > 0 ? donors : ['SUPPORT', 'ARCHIVE', 'COMMUNITY'];
  
  // Use non-breaking spaces (\u00a0) to prevent browser whitespace collapsing/trimming
  const marqueeText = displayNames.join('\u00a0\u00a0•\u00a0\u00a0') + '\u00a0\u00a0•\u00a0\u00a0';

  return (
    <div className={styles.tickerContainer}>
      <span className={styles.tickerLabel}>Top Supporters</span>
      <div className={styles.tickerWindow}>
        <div className={styles.marqueeTrack}>
          <span className={styles.supporterName}>{marqueeText}</span>
          <span className={styles.supporterName} aria-hidden="true">{marqueeText}</span>
        </div>
      </div>
    </div>
  );
}

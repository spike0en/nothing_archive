import React from 'react';
import styles from './PartitionExplorer.module.css';
import { AOSP_DOC_LINKS } from './partitionData';

export function AospReferencesSection(): React.JSX.Element {
  return (
    <div className={styles.aospReferencesSection}>
      <div className={styles.aospHeader}>
        <span className={styles.aospTitle}>Official Android Documentation References</span>
      </div>
      <div className={styles.aospLinksGrid}>
        {AOSP_DOC_LINKS.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.aospLinkCard}
          >
            <div className={styles.aospLinkTitle}>
              <span>{link.title}</span>
              <span className={styles.externalArrow}>↗</span>
            </div>
            <p className={styles.aospLinkDesc}>{link.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

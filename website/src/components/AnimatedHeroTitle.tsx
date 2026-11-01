import React, { useState, useEffect } from 'react';
import styles from '../pages/index.module.css';

const ARCHIVE_TEXT = 'ARCHIVE';

export default function AnimatedHeroTitle(): React.JSX.Element {
  // Start from 0 on load so page begins with NOTHING, then unfolds ARCHIVE
  const [archiveLength, setArchiveLength] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setArchiveLength(ARCHIVE_TEXT.length);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    let currentLength = 0;
    let mode: 'holding' | 'contracting' | 'paused' | 'expanding' = 'expanding';

    const step = () => {
      if (mode === 'expanding') {
        if (currentLength < ARCHIVE_TEXT.length) {
          currentLength += 1;
          setArchiveLength(currentLength);
          timeoutId = setTimeout(step, 75);
        } else {
          mode = 'holding';
          timeoutId = setTimeout(step, 3600);
        }
      } else if (mode === 'holding') {
        mode = 'contracting';
        step();
      } else if (mode === 'contracting') {
        if (currentLength > 0) {
          currentLength -= 1;
          setArchiveLength(currentLength);
          timeoutId = setTimeout(step, 50);
        } else {
          mode = 'paused';
          timeoutId = setTimeout(step, 900);
        }
      } else if (mode === 'paused') {
        mode = 'expanding';
        step();
      }
    };

    // Brief initial pause so NOTHING is visually registered before ARCHIVE unfolds
    timeoutId = setTimeout(step, 450);

    return () => clearTimeout(timeoutId);
  }, []);

  const archivePart = ARCHIVE_TEXT.slice(0, archiveLength);

  return (
    <span className={styles.heroTitleBrand} aria-label="NOTHING ARCHIVE">
      <span className={styles.heroWordNothing}>NOTHING</span>
      {archivePart && <span className={styles.heroWordArchive}>{archivePart}</span>}
    </span>
  );
}

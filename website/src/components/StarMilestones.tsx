import React, { useState, useEffect, useMemo } from 'react';
import { FaStar } from 'react-icons/fa';
import clsx from 'clsx';
import styles from './StarMilestones.module.css';

/**
 * Milestone thresholds.
 * Progression starts tight to feel rewarding early on, then fans out
 * with aspirational logarithmic-ish spacing to keep long-term goals visible.
 */
const MILESTONES = [50, 100, 250, 500, 1_000, 1_500, 2_000, 3_000, 5_000, 10_000];

/** Compact display format: 1000 → 1K, 10000 → 10K */
function fmtCount(n: number): string {
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
  return n.toString();
}

const STATS_CACHE_KEY = 'nothing_archive_repo_stats_v1';
const STATS_CACHE_TIME_KEY = 'nothing_archive_repo_stats_time_v1';
const CACHE_TIMEOUT = 5 * 60 * 1000;

/**
 * StarMilestones — visual progress bar that shows how close the repo
 * is to each successive star milestone. Designed to look like Nothing's
 * iconic Glyph Interface progress bar.
 */
export default function StarMilestones(): React.JSX.Element {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    async function loadStars() {
      try {
        // Prefer cached data from CommitMatrix to avoid duplicate API calls
        const cachedData = localStorage.getItem(STATS_CACHE_KEY);
        const cachedTime = localStorage.getItem(STATS_CACHE_TIME_KEY);
        const now = Date.now();

        if (cachedData && cachedTime && now - parseInt(cachedTime, 10) < CACHE_TIMEOUT) {
          const parsed = JSON.parse(cachedData);
          setStars(parsed.stars || 0);
          return;
        }

        // Fallback: fetch directly
        const res = await fetch('https://api.github.com/repos/spike0en/nothing_archive');
        if (res.ok) {
          const data = await res.json();
          setStars(data.stargazers_count || 0);
        } else if (cachedData) {
          // Use stale cache on API failure
          setStars(JSON.parse(cachedData).stars || 0);
        }
      } catch {
        // Last resort: try stale cache
        try {
          const cachedData = localStorage.getItem(STATS_CACHE_KEY);
          if (cachedData) setStars(JSON.parse(cachedData).stars || 0);
        } catch { /* noop */ }
      }
    }
    loadStars();
  }, []);

  /** Index of the next unmet milestone (-1 if all reached) */
  const nextIdx = useMemo(() => {
    if (stars === null) return -1;
    const idx = MILESTONES.findIndex(m => stars < m);
    return idx;
  }, [stars]);

  /**
   * Calculates the fill percentage (0 to 100) for each discrete segment.
   * Rather than a single continuous bar, each segment fills independently.
   */
  const segmentFills = useMemo(() => {
    if (stars === null) return MILESTONES.map(() => 0);
    return MILESTONES.map((milestone, idx) => {
      if (stars >= milestone) return 100;
      
      // Before the first milestone
      if (idx === 0) {
        return Math.max(0, Math.min(100, (stars / milestone) * 100));
      }

      const prevMilestone = MILESTONES[idx - 1];
      if (stars <= prevMilestone) return 0;
      
      // Partial progress inside this segment
      return Math.max(0, Math.min(100, ((stars - prevMilestone) / (milestone - prevMilestone)) * 100));
    });
  }, [stars]);

  if (stars === null) {
    return (
      <div className={styles.milestoneContainer}>
        <div className={styles.loadingState}>LOADING GLYPH INTERFACE...</div>
      </div>
    );
  }

  const allReached = nextIdx === -1;

  return (
    <div className={styles.milestoneContainer}>
      {/* Skeuomorphic visual overlays */}
      <div className={styles.chassisMarkTopLeft} />
      <div className={styles.chassisMarkTopRight} />
      <div className={styles.chassisMarkBottomLeft} />
      <div className={styles.chassisMarkBottomRight} />
      
      {/* Corner screws */}
      <div className={clsx(styles.screw, styles.screwTopLeft)}><div className={styles.screwThread} /></div>
      <div className={clsx(styles.screw, styles.screwTopRight)}><div className={styles.screwThread} /></div>
      <div className={clsx(styles.screw, styles.screwBottomLeft)}><div className={styles.screwThread} /></div>
      <div className={clsx(styles.screw, styles.screwBottomRight)}><div className={styles.screwThread} /></div>

      {/* Grid overlay */}
      <div className={styles.gridOverlay} />

      {/* Header — title left, Star CTA button right */}
      <div className={styles.milestoneHeader}>
        <span className={styles.milestoneTitle}>
          <span className={styles.starIconWrapper}><FaStar size={12} className={styles.starIcon} /></span>
          STAR MILESTONES
        </span>
        <a
          href="https://github.com/spike0en/nothing_archive/stargazers"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.starCta}
          aria-label="Star Nothing Archive on GitHub"
        >
          <FaStar size={11} className={styles.starIcon} />
          Star on GitHub
        </a>
      </div>

      {/* Recessed Glyph housing and segments */}
      <div className={styles.glyphHousing}>
        <div className={styles.glyphTrack}>
          {MILESTONES.map((milestone, idx) => {
            const fillWidth = segmentFills[idx];
            const isRed = idx === MILESTONES.length - 1;
            const isCurrent = fillWidth > 0 && fillWidth < 100;
            const isLit = fillWidth > 0;
            const isFullyLit = fillWidth === 100;

            return (
              <div
                key={milestone}
                className={clsx(
                  styles.glyphSegment,
                  isRed ? styles.glyphSegmentRed : styles.glyphSegmentWhite,
                  isLit && styles.glyphSegmentLit,
                  isFullyLit && styles.glyphSegmentFullyLit,
                  isCurrent && styles.glyphSegmentCurrent
                )}
              >
                <div
                  className={styles.segmentBar}
                  style={{ width: `${fillWidth}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Labels aligned under segments */}
      <div className={styles.labelsRow}>
        {MILESTONES.map((milestone, idx) => {
          const reached = stars >= milestone;
          const isNext = idx === nextIdx;
          const fillWidth = segmentFills[idx];
          const isLit = fillWidth > 0;

          return (
            <div key={milestone} className={styles.labelCol}>
              <div
                className={clsx(
                  styles.tickMark,
                  isLit && styles.tickMarkLit,
                  reached && styles.tickMarkReached
                )}
              />
              <span
                className={clsx(
                  styles.nodeLabel,
                  reached && styles.nodeLabelReached,
                  isNext && styles.nodeLabelNext
                )}
              >
                {fmtCount(milestone)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer message */}
      {allReached ? (
        <div className={styles.milestoneComplete}>
          ALL MILESTONES REACHED — LEGENDARY STATUS ★
        </div>
      ) : (
        <div className={styles.nextGoal}>
          {(MILESTONES[nextIdx] - stars).toLocaleString()} stars to go · help us hit <span className={styles.nextGoalValue}>{fmtCount(MILESTONES[nextIdx])} ★</span>
        </div>
      )}
    </div>
  );
}



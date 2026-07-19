/**
 * @file StarMilestones.tsx
 * @description Component that renders stargazing milestones for the repository as an 
 * interactive progress indicator styled to match Nothing's hardware-based LED strip design.
 * 
 * Layer: Home page visualization components.
 * Boundary: Consumes GitHub stats cache hook, renders local HTML segments and SVG icons.
 */

import React, { useMemo } from 'react';
import { FaStar } from 'react-icons/fa';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import styles from './StarMilestones.module.css';
import TorxScrew from './TorxScrew';
import { useGitHubRepoStats } from '../utils/github-cache';

/**
 * Milestone thresholds.
 * Progression starts tight to feel rewarding early on, then fans out
 * with aspirational logarithmic-ish spacing to keep long-term goals visible.
 */
const MILESTONES = [50, 100, 250, 500, 1_000, 1_500, 2_000, 3_000, 5_000, 10_000];

/** Compact display format: 1000 -> 1K, 10000 -> 10K */
function fmtCount(n: number): string {
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
  return n.toString();
}

/**
 * StarMilestones component.
 * Evaluates repository stargazers count, computes progress for discrete segments, 
 * and handles UI state rendering.
 */
export default function StarMilestones(): React.JSX.Element {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  // Shares the deduplicated repo stats fetch with CommitMatrix
  const { stats, loading: statsLoading } = useGitHubRepoStats();
  const stars = statsLoading ? null : stats.stars;

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
        <div className={styles.loadingState}>{translate({id: 'milestones.loading', message: 'LOADING GLYPH INTERFACE...', description: 'Loading state for the GitHub star milestones widget'})}</div>
      </div>
    );
  }

  const allReached = nextIdx === -1;

  return (
    <div className={styles.milestoneContainer}>
      <TorxScrew className={clsx(styles.screw, styles.screwTopLeft)} rotation={45} />
      <TorxScrew className={clsx(styles.screw, styles.screwTopRight)} rotation={120} />
      <TorxScrew className={clsx(styles.screw, styles.screwBottomLeft)} rotation={80} />
      <TorxScrew className={clsx(styles.screw, styles.screwBottomRight)} rotation={20} />

      <div className={styles.gridOverlay} />

      <div className={styles.milestoneHeader}>
        <div className={styles.liveStats}>
          <span className={styles.liveText}>{translate({id: 'milestones.stargazers', message: '{count} stargazers', description: 'Current GitHub star count'}, {count: new Intl.NumberFormat(currentLocale).format(stars)})}</span>
        </div>

        {/*
          Group container isolates horizontal animation to preserve relative spacing
          between Pacman and Ghost regardless of dynamic milestone container widths.
        */}
        <div className={styles.pacmanContainer}>
          <div className={styles.pacmanTrack}>
            <div className={clsx(styles.pacmanStar, styles.star1)}><FaStar size={8} /></div>
            <div className={clsx(styles.pacmanStar, styles.star2)}><FaStar size={8} /></div>
            <div className={clsx(styles.pacmanStar, styles.star3)}><FaStar size={8} /></div>
            <div className={clsx(styles.pacmanStar, styles.star4)}><FaStar size={8} /></div>

            <div className={styles.pacmanGroup}>
              <div className={styles.ghost}>
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <path
                    d="M 0,10 A 10,10 0 0,1 20,10 L 20,20 L 16.5,16.5 L 13.5,20 L 10,16.5 L 6.5,20 L 3.5,16.5 L 0,20 Z"
                    fill="#00E5FF"
                  />
                  <circle cx="7" cy="10" r="2" fill="white" />
                  <circle cx="6" cy="10" r="1" fill="black" />
                  <circle cx="13" cy="10" r="2" fill="white" />
                  <circle cx="12" cy="10" r="1" fill="black" />
                </svg>
              </div>
              <div className={styles.pacman}>
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <g
                    className={styles.pacmanUpper}
                    style={{ transformOrigin: '10px 10px', transformBox: 'view-box' }}
                  >
                    <path d="M 0,10 A 10,10 0 0,1 20,10 Z" fill="var(--nothing-red, #D71921)" />
                  </g>
                  <g
                    className={styles.pacmanLower}
                    style={{ transformOrigin: '10px 10px', transformBox: 'view-box' }}
                  >
                    <path d="M 20,10 A 10,10 0 0,1 0,10 Z" fill="var(--nothing-red, #D71921)" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <a
          href="https://github.com/spike0en/nothing_archive"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.starCta}
          aria-label={translate({id: 'milestones.starOnGitHub.aria', message: 'Star Nothing Archive on GitHub', description: 'Accessible label for the GitHub star button'})}
        >
          <FaStar size={11} className={styles.starIcon} />
          {translate({id: 'milestones.starOnGitHub', message: 'Star on GitHub', description: 'GitHub star button label'})}
        </a>
      </div>

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
                  style={{ transform: `scaleX(${fillWidth / 100})` }}
                />
              </div>
            );
          })}
        </div>
      </div>

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

      {allReached ? (
        <div className={styles.milestoneComplete}>
          {translate({id: 'milestones.allReached', message: 'ALL MILESTONES REACHED', description: 'Message shown after the final GitHub star milestone is reached'})}
        </div>
      ) : (
        <div className={styles.nextGoal}>
          {translate({id: 'milestones.nextGoal', message: '{count} stars to go · help us reach the goal', description: 'Progress message before the next GitHub star milestone'}, {count: new Intl.NumberFormat(currentLocale).format(MILESTONES[nextIdx] - stars)})}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './PartitionExplorer.module.css';
import { AB_STEPS } from './partitionData';
import { CommandCodeBlock } from './CommandCodeBlock';

const STEP_ACTIVE_STATUS = [
  'Active (Running Nothing OS)',
  'Active (In use)',
  'Active (Switching Target)',
  'Rollback Standby (Prior Build)',
];

const STEP_INACTIVE_STATUS = [
  'Standby / Prior Build Backup',
  'Streaming payload chunks...',
  'Verified & Target Ready',
  'Running Updated System',
];

export function AbUpdateSimulator({
  startingSlot,
}: {
  startingSlot: 'A' | 'B';
}): React.JSX.Element {
  const [abStepIndex, setAbStepIndex] = useState<number>(0);

  const sourceSlot = startingSlot;
  const targetSlot = startingSlot === 'A' ? 'B' : 'A';
  const isCompleted = abStepIndex === 3;
  const activeBootSlot = isCompleted ? targetSlot : sourceSlot;
  const currentAbStep = AB_STEPS[abStepIndex];

  const slotAStatus = sourceSlot === 'A'
    ? STEP_ACTIVE_STATUS[abStepIndex]
    : STEP_INACTIVE_STATUS[abStepIndex];

  const slotBStatus = sourceSlot === 'B'
    ? STEP_ACTIVE_STATUS[abStepIndex]
    : STEP_INACTIVE_STATUS[abStepIndex];

  const dynamicCommand = [
    `fastboot getvar current-slot => _${sourceSlot.toLowerCase()}`,
    `update_engine: Applying payload chunks to Slot ${targetSlot} snapshots`,
    `bootctl set-active-boot-slot ${targetSlot === 'B' ? 1 : 0}`,
    `update_verifier: dm-verity verified -> Slot ${targetSlot} marked successful`,
  ][abStepIndex];

  const dynamicOperation = [
    `Normal execution from Slot ${sourceSlot} with filesystems mounted read-only.`,
    `update_engine downloads and writes OTA blocks directly into Slot ${targetSlot}.`,
    `vbmeta_${targetSlot.toLowerCase()} signature validation and /misc slot flag handoff to Slot ${targetSlot}.`,
    `Quick restart into Slot ${targetSlot} with update_verifier dm-verity confirmation.`,
  ][abStepIndex];

  const dynamicTechDetails = [
    `The bootloader evaluates the /misc partition on startup. Slot ${sourceSlot} is designated as active, bootable, and successful. Storage partitions boot_${sourceSlot.toLowerCase()}, init_boot_${sourceSlot.toLowerCase()}, and super logical partitions are mounted read-only.`,
    `Virtual A/B utilizes copy-on-write (COW) snapshots allocated on userdata. The update_engine daemon processes delta payload blocks in userspace into Slot ${targetSlot} without interrupting running applications or requiring recovery mode.`,
    `Android validates cryptographic hash trees across all Slot ${targetSlot} images using vbmeta_${targetSlot.toLowerCase()}. Upon verification, the boot_control HAL writes to /misc, setting Slot ${targetSlot} as the active boot target with an initial retry counter of 7.`,
    `The device reboots into Slot ${targetSlot} in seconds. Early init invokes update_verifier to confirm dm-verity filesystem integrity. Once verified, Slot ${targetSlot} is marked successful. If boot fails after 7 retries, the bootloader automatically reverts to Slot ${sourceSlot}.`,
  ][abStepIndex];

  return (
    <div className={styles.abContainer}>
      <div className={styles.tabIntro}>
        <h4>Dual-Slot A/B Background Update Flow</h4>
        <p>
          Android uses two matching partition sets (<strong>Slot A</strong> and <strong>Slot B</strong>) to install updates in the background while you continue using your phone. The update engine writes new files into the inactive slot without interrupting your current session.
        </p>
        <p>
          After cryptographic verification with Android Verified Boot, a restart switches boot priority to the updated slot. If the new build fails to start, the bootloader returns to your working slot automatically. Step through the 4 stages below to follow the process:
        </p>
      </div>

      <div className={styles.stepperNav}>
        {AB_STEPS.map((s, idx) => (
          <button
            key={s.step}
            type="button"
            className={clsx(styles.stepBtn, idx === abStepIndex && styles.stepBtnActive)}
            onClick={() => setAbStepIndex(idx)}
          >
            <span className={styles.stepNum}>{s.step}</span>
            <span className={styles.stepTitleText}>{s.title.split('. ')[1]}</span>
          </button>
        ))}
      </div>

      <div className={styles.slotsComparison}>
        <div
          className={clsx(
            styles.slotCard,
            activeBootSlot === 'A' ? styles.slotActive : styles.slotInactive
          )}
        >
          <div className={styles.slotHeader}>
            <div className={styles.slotTitle}>
              <span className={styles.slotIndicator} />
              <strong>SLOT A</strong>
            </div>
            <span className={styles.slotBadge}>
              {activeBootSlot === 'A' ? 'ACTIVE (BOOTED)' : isCompleted ? 'STANDBY' : 'TARGET'}
            </span>
          </div>
          <div className={styles.slotStatus}>{slotAStatus}</div>
          <div className={styles.slotCategorySection}>
            <span className={styles.slotCategoryLabel}>Boot &amp; Verified Boot:</span>
            <div className={styles.slotPartitions}>
              <code>boot_a</code>
              <code>init_boot_a</code>
              <code>vendor_boot_a</code>
              <code>dtbo_a</code>
              <code>vbmeta_a</code>
              <code>vbmeta_system_a</code>
              <code>vbmeta_vendor_a</code>
            </div>
          </div>
          <div className={styles.slotCategorySection}>
            <span className={styles.slotCategoryLabel}>Dynamic Snapshots (super):</span>
            <div className={styles.slotPartitions}>
              <code>system_a</code>
              <code>system_ext_a</code>
              <code>product_a</code>
              <code>vendor_a</code>
              <code>odm_a</code>
              <code>dlkm_a</code>
            </div>
          </div>
          <div className={styles.slotCategorySection}>
            <span className={styles.slotCategoryLabel}>Chipset Firmware:</span>
            <div className={styles.slotPartitions}>
              <code>abl_a</code>
              <code>xbl_a</code>
              <code>tz_a</code>
              <code>modem_a</code>
              <code>preloader_a</code>
              <code>lk_a</code>
            </div>
          </div>
        </div>

        <div className={styles.transitionHub}>
          <div className={styles.miscBlock}>
            <strong>/misc buffer</strong>
            <span>Target: Slot {activeBootSlot}</span>
          </div>
          <div className={styles.flowArrow}>{sourceSlot === 'A' ? '➔' : '⬅'}</div>
        </div>

        <div
          className={clsx(
            styles.slotCard,
            activeBootSlot === 'B' ? styles.slotActive : styles.slotInactive
          )}
        >
          <div className={styles.slotHeader}>
            <div className={styles.slotTitle}>
              <span className={styles.slotIndicator} />
              <strong>SLOT B</strong>
            </div>
            <span className={styles.slotBadge}>
              {activeBootSlot === 'B' ? 'ACTIVE (BOOTED)' : isCompleted ? 'STANDBY' : 'TARGET'}
            </span>
          </div>
          <div className={styles.slotStatus}>{slotBStatus}</div>
          <div className={styles.slotCategorySection}>
            <span className={styles.slotCategoryLabel}>Boot &amp; Verified Boot:</span>
            <div className={styles.slotPartitions}>
              <code>boot_b</code>
              <code>init_boot_b</code>
              <code>vendor_boot_b</code>
              <code>dtbo_b</code>
              <code>vbmeta_b</code>
              <code>vbmeta_system_b</code>
              <code>vbmeta_vendor_b</code>
            </div>
          </div>
          <div className={styles.slotCategorySection}>
            <span className={styles.slotCategoryLabel}>Dynamic Snapshots (super):</span>
            <div className={styles.slotPartitions}>
              <code>system_b</code>
              <code>system_ext_b</code>
              <code>product_b</code>
              <code>vendor_b</code>
              <code>odm_b</code>
              <code>dlkm_b</code>
            </div>
          </div>
          <div className={styles.slotCategorySection}>
            <span className={styles.slotCategoryLabel}>Chipset Firmware:</span>
            <div className={styles.slotPartitions}>
              <code>abl_b</code>
              <code>xbl_b</code>
              <code>tz_b</code>
              <code>modem_b</code>
              <code>preloader_b</code>
              <code>lk_b</code>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sharedDataBar}>
        <strong>SHARED USER DATA (/data)</strong>
        <span>Encrypted with File-Based Encryption and preserved across all dual-slot updates</span>
      </div>

      <div className={styles.stepDetailsCard}>
        <div className={styles.stepHeaderRow}>
          <h4>{currentAbStep.title}</h4>
          <span className={styles.stepBadge}>
            {abStepIndex === 0
              ? `Slot ${sourceSlot} Active`
              : abStepIndex === 1
              ? `Writing Slot ${targetSlot}`
              : abStepIndex === 2
              ? 'Verification Pass'
              : `Slot ${targetSlot} Active`}
          </span>
        </div>
        <div className={styles.summaryBox}>
          <p>{dynamicOperation}</p>
        </div>
        <p className={styles.stepDesc}>{dynamicTechDetails}</p>
        <div className={styles.commandSnippet}>
          <span>Operation:</span>
          <CommandCodeBlock command={dynamicCommand} />
        </div>

        <div className={styles.controlsRow}>
          <button
            type="button"
            className={styles.ctaGhostBtn}
            disabled={abStepIndex === 0}
            onClick={() => setAbStepIndex((prev) => Math.max(0, prev - 1))}
          >
            Previous Step
          </button>
          <button
            type="button"
            className={clsx(styles.ctaPrimaryBtn)}
            onClick={() => setAbStepIndex((prev) => (prev + 1) % AB_STEPS.length)}
          >
            {abStepIndex === AB_STEPS.length - 1 ? 'Restart Simulation' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
}

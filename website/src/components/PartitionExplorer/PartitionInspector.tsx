import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './PartitionExplorer.module.css';
import { type PartitionInfo } from './partitionData';
import { CommandCodeBlock } from './CommandCodeBlock';

export function PartitionInspector({
  partition,
}: {
  partition: PartitionInfo;
}): React.JSX.Element {
  const [commandSlot, setCommandSlot] = useState<'active' | 'a' | 'b'>('active');
  const isSlotted = partition.category !== 'data';
  const targetPartName = isSlotted && commandSlot !== 'active'
    ? `${partition.name}_${commandSlot}`
    : partition.name;

  return (
    <div className={styles.unifiedInspectorBox}>
      <div className={styles.unifiedTopHeader}>
        <div className={styles.inspectorHeader}>
          <span className={clsx(styles.typeBadge, styles[`type_${partition.category}`])}>
            {partition.groupLabel}
          </span>
          {partition.chipset === 'Qualcomm' && (
            <span className={clsx(styles.chipsetTag, styles.chipsetQualcomm)}>Qualcomm Snapdragon</span>
          )}
          {partition.chipset === 'MediaTek' && (
            <span className={clsx(styles.chipsetTag, styles.chipsetMediaTek)}>MediaTek Dimensity</span>
          )}
          {partition.chipset === 'Universal' && (
            <span className={clsx(styles.chipsetTag, styles.chipsetUniversal)}>Universal (All Devices)</span>
          )}
        </div>

        <div className={styles.inspectorTitleRow}>
          <h3 className={styles.partitionTitle}>
            <span>{partition.name}</span>
            {isSlotted && <span className={styles.slotSuffix}>_a / _b</span>}
          </h3>
        </div>

        <p className={styles.inspectorRole}>{partition.technicalRole || partition.summary}</p>
      </div>

      <div className={styles.unifiedInspectorGrid}>
        <div className={styles.unifiedInspectorLeft}>
          <span className={styles.sectionSubHeading}>Technical Specifications</span>
          <div className={styles.metaList}>
            <div className={styles.metaItem}>
              <span className={styles.metaKey}>Execution Stage:</span>
              <span className={styles.metaVal}>{partition.bootStage}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaKey}>Tamper Verification:</span>
              <span className={styles.metaVal}>{partition.avbStatus}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaKey}>Flashing Environment:</span>
              <span className={styles.metaVal}>{partition.flashingMode}</span>
            </div>
            {partition.archiveFile && (
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>OTA Archive Group:</span>
                <span className={styles.metaVal}>
                  <code>{partition.archiveFile}</code>
                </span>
              </div>
            )}
            {partition.rootRelevance && (
              <div className={clsx(styles.metaItem, styles.rootAlert)}>
                <span className={styles.metaKey}>Root &amp; Modifications:</span>
                <span className={styles.metaVal}>{partition.rootRelevance}</span>
              </div>
            )}
            <div className={clsx(styles.metaItem, styles.slotMappingItem)}>
              <span className={styles.metaKey}>Slot Mapping:</span>
              <span className={styles.metaVal}>
                {partition.category === 'data'
                  ? 'Non-slotted (Shared across updates)'
                  : 'Slotted (Dual _a / _b slots for background updates)'}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.unifiedCommandCol}>
          <div className={styles.commandHeader}>
            <span className={styles.commandLabel}>Fastboot Flashing Command</span>
            {isSlotted && (
              <div className={styles.commandSlotToggle}>
                <button
                  type="button"
                  className={clsx(styles.commandSlotBtn, commandSlot === 'active' && styles.commandSlotBtnActive)}
                  onClick={() => setCommandSlot('active')}
                  title="Flashes to the currently active boot slot"
                >
                  Active Slot
                </button>
                <button
                  type="button"
                  className={clsx(styles.commandSlotBtn, commandSlot === 'a' && styles.commandSlotBtnActive)}
                  onClick={() => setCommandSlot('a')}
                  title="Flashes explicitly to Slot A"
                >
                  Slot _a
                </button>
                <button
                  type="button"
                  className={clsx(styles.commandSlotBtn, commandSlot === 'b' && styles.commandSlotBtnActive)}
                  onClick={() => setCommandSlot('b')}
                  title="Flashes explicitly to Slot B"
                >
                  Slot _b
                </button>
              </div>
            )}
          </div>
          <p className={styles.commandHint}>
            {partition.flashingMode === 'userspace (fastbootd)'
              ? isSlotted && commandSlot !== 'active'
                ? `Run in fastboot userspace mode (flashes Slot ${commandSlot.toUpperCase()}):`
                : 'Run in fastboot userspace mode (flashes active slot):'
              : partition.flashingMode === 'bootloader (fastboot)'
              ? isSlotted && commandSlot !== 'active'
                ? `Flash partition in bootloader mode (flashes Slot ${commandSlot.toUpperCase()}):`
                : 'Flash partition in bootloader mode (flashes active slot):'
              : 'Managed directly by system framework:'}
          </p>
          <div className={styles.commandSequence}>
            {partition.flashingMode === 'userspace (fastbootd)' ? (
              <>
                <CommandCodeBlock command="fastboot reboot fastboot" />
                <CommandCodeBlock command={`fastboot flash ${targetPartName} ${partition.name}.img`} />
              </>
            ) : partition.flashingMode === 'bootloader (fastboot)' ? (
              <CommandCodeBlock command={`fastboot flash ${targetPartName} ${partition.name}.img`} />
            ) : (
              <CommandCodeBlock command={`fastboot erase ${partition.name}`} />
            )}
          </div>
          {isSlotted && (
            <div className={styles.commandSlotNote}>
              {commandSlot === 'active' ? (
                <span>
                  If no slot is specified, fastboot flashes to the <strong>active slot</strong>. To target a specific slot, append <code>_a</code> or <code>_b</code>.
                </span>
              ) : (
                <span>
                  Targeting <code>_{commandSlot}</code> flashes explicitly to <strong>Slot {commandSlot.toUpperCase()}</strong> regardless of which slot is currently active.
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

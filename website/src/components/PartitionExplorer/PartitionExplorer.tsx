import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './PartitionExplorer.module.css';
import {
  PARTITIONS_DATA,
  PARTITION_GROUPS,
  AB_STEPS,
  AOSP_DOC_LINKS,
  PARTITION_GLOSSARY,
  type PartitionKey,
} from './partitionData';

function CopyButton({ text }: { text: string }): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('clipboard' in navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <button
      type="button"
      className={clsx(styles.copyBtn, copied && styles.copyBtnSuccess)}
      onClick={handleCopy}
      title={copied ? 'Copied to clipboard' : 'Copy command'}
      aria-label={copied ? 'Copied' : 'Copy command'}
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Copied</span>
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

function CommandCodeBlock({ command }: { command: string }): React.JSX.Element {
  return (
    <div className={styles.commandCodeWrapper}>
      <code>{command}</code>
      <CopyButton text={command} />
    </div>
  );
}

export default function PartitionExplorer(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<'stack' | 'dynamic' | 'ab_flow'>('stack');
  const [selectedPartitionKey, setSelectedPartitionKey] = useState<PartitionKey>('init_boot');
  const [socFilter, setSocFilter] = useState<'all' | 'Qualcomm' | 'MediaTek'>('all');
  const [abStepIndex, setAbStepIndex] = useState<number>(0);
  const [startingSlot, setStartingSlot] = useState<'A' | 'B'>('A');
  const [showGlossary, setShowGlossary] = useState<boolean>(false);

  const selectedPartition = PARTITIONS_DATA[selectedPartitionKey] || PARTITIONS_DATA['init_boot'];
  const currentAbStep = AB_STEPS[abStepIndex];

  return (
    <div className={styles.container}>
      {/* Navigation Tabs Bar */}
      <div className={styles.header}>
        <div className={styles.tabButtons}>
          <button
            type="button"
            className={clsx(styles.tabCtaBtn, activeTab === 'stack' && styles.tabCtaBtnActive)}
            onClick={() => setActiveTab('stack')}
          >
            Partition Hierarchy
          </button>
          <button
            type="button"
            className={clsx(styles.tabCtaBtn, activeTab === 'dynamic' && styles.tabCtaBtnActive)}
            onClick={() => setActiveTab('dynamic')}
          >
            Dynamic Partitions
          </button>
          <button
            type="button"
            className={clsx(styles.tabCtaBtn, activeTab === 'ab_flow' && styles.tabCtaBtnActive)}
            onClick={() => setActiveTab('ab_flow')}
          >
            A/B Update Engine
          </button>
        </div>

        {activeTab === 'ab_flow' && (
          <div className={styles.headerCycleControl}>
            <span className={styles.cycleLabel}>Cycle:</span>
            <div className={styles.cycleToggle}>
              <button
                type="button"
                className={clsx(styles.cycleBtn, startingSlot === 'A' && styles.cycleBtnActive)}
                onClick={() => setStartingSlot('A')}
              >
                Slot A ➔ Slot B
              </button>
              <button
                type="button"
                className={clsx(styles.cycleBtn, startingSlot === 'B' && styles.cycleBtnActive)}
                onClick={() => setStartingSlot('B')}
              >
                Slot B ➔ Slot A
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TAB 1: Storage Architecture Stack */}
      {activeTab === 'stack' && (
        <div>
          <div className={styles.tabIntro}>
            <h4>Device Storage Architecture &amp; Partition Roles</h4>
            <p>
              Flash storage on your phone is divided into hardware and software zones. <strong>Firmware</strong> initializes the processor and hardware controllers at startup. The <strong>Kernel &amp; Security Stack</strong> loads the operating system core and verifies file integrity with Android Verified Boot (AVB 2.0). <strong>Dynamic Partitions</strong> hold Nothing OS interface components and system apps inside a shared container, while <strong>Persistent Data</strong> keeps your personal files (<code>userdata</code>) intact across updates.
            </p>
            <p>
              Select any partition below to view its boot stage, verification status, and Fastboot commands.
            </p>
          </div>

          {/* Platform Architecture Selector */}
          <div className={styles.socMainFilterBar}>
            <span className={styles.socFilterHeading}>Platform Architecture:</span>
            <div className={styles.socFilterGroup}>
              <button
                type="button"
                className={clsx(styles.socFilterBtn, socFilter === 'all' && styles.socFilterBtnActive)}
                onClick={() => setSocFilter('all')}
              >
                All Partitions
              </button>
              <button
                type="button"
                className={clsx(styles.socFilterBtn, socFilter === 'Qualcomm' && styles.socFilterBtnActive)}
                onClick={() => {
                  setSocFilter('Qualcomm');
                  if (PARTITIONS_DATA[selectedPartitionKey]?.chipset === 'MediaTek') {
                    setSelectedPartitionKey('abl');
                  }
                }}
              >
                Qualcomm Snapdragon
              </button>
              <button
                type="button"
                className={clsx(styles.socFilterBtn, socFilter === 'MediaTek' && styles.socFilterBtnActive)}
                onClick={() => {
                  setSocFilter('MediaTek');
                  if (PARTITIONS_DATA[selectedPartitionKey]?.chipset === 'Qualcomm') {
                    setSelectedPartitionKey('preloader_raw');
                  }
                }}
              >
                MediaTek Dimensity
              </button>
            </div>
          </div>

          <div className={styles.explorerGrid}>
          {/* Storage Stack (Left Column) */}
          <div className={styles.stackColumn}>
            {/* Modular Partition Groups */}
            {PARTITION_GROUPS.map((group) => {
              const filteredKeys = group.keys.filter((k) => {
                if (socFilter === 'all') return true;
                const item = PARTITIONS_DATA[k];
                return item?.chipset === socFilter || item?.chipset === 'Universal';
              });

              if (filteredKeys.length === 0) return null;

              return (
                <div key={group.id} className={styles.groupContainer}>
                  <div className={styles.groupLabel}>
                    <span>{group.superTitle || group.title}</span>
                    {group.badge && <span className={styles.categoryBadge}>{group.badge}</span>}
                  </div>
                  {group.description && <p className={styles.superDesc}>{group.description}</p>}
                  <div className={styles.chipRow}>
                    {filteredKeys.map((key) => {
                      const info = PARTITIONS_DATA[key];
                      if (!info) return null;
                      return (
                        <button
                          key={key}
                          type="button"
                          className={clsx(
                            styles.partChip,
                            selectedPartitionKey === key && styles.partChipSelected
                          )}
                          onClick={() => setSelectedPartitionKey(key)}
                        >
                          {info.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Inspector Panel (Right Column) */}
          <div className={styles.inspectorCard}>
            <div className={styles.inspectorHeader}>
              <span className={clsx(styles.typeBadge, styles[`type_${selectedPartition.category}`])}>
                {selectedPartition.groupLabel}
              </span>
              {selectedPartition.chipset === 'Qualcomm' && (
                <span className={clsx(styles.chipsetTag, styles.chipsetQualcomm)}>Qualcomm Snapdragon</span>
              )}
              {selectedPartition.chipset === 'MediaTek' && (
                <span className={clsx(styles.chipsetTag, styles.chipsetMediaTek)}>MediaTek Dimensity</span>
              )}
              {selectedPartition.chipset === 'Universal' && (
                <span className={clsx(styles.chipsetTag, styles.chipsetUniversal)}>Universal (All Devices)</span>
              )}
            </div>

            <div className={styles.inspectorTitleRow}>
              <h3 className={styles.partitionTitle}>
                {selectedPartition.name}
                {selectedPartition.category !== 'data' && <span className={styles.slotSuffix}>_a / _b</span>}
              </h3>
            </div>

            <p className={styles.inspectorSummary}>{selectedPartition.summary}</p>
            <p className={styles.inspectorRole}>{selectedPartition.technicalRole}</p>

            <div className={styles.metaList}>
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>Execution Stage:</span>
                <span className={styles.metaVal}>{selectedPartition.bootStage}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>Tamper Verification:</span>
                <span className={styles.metaVal}>{selectedPartition.avbStatus}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaKey}>Flashing Environment:</span>
                <span className={styles.metaVal}>{selectedPartition.flashingMode}</span>
              </div>
              {selectedPartition.archiveFile && (
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>OTA Archive Group:</span>
                  <span className={styles.metaVal}>
                    <code>{selectedPartition.archiveFile}</code>
                  </span>
                </div>
              )}
              {'rootRelevance' in selectedPartition && selectedPartition.rootRelevance && (
                <div className={clsx(styles.metaItem, styles.rootAlert)}>
                  <span className={styles.metaKey}>Root &amp; Modifications:</span>
                  <span className={styles.metaVal}>{selectedPartition.rootRelevance}</span>
                </div>
              )}
              <div className={clsx(styles.metaItem, styles.slotMappingItem)}>
                <span className={styles.metaKey}>Slot Mapping:</span>
                <span className={styles.metaVal}>
                  {selectedPartition.category === 'data'
                    ? 'Non-slotted (Shared across updates)'
                    : 'Slotted (Dual _a / _b slots for background updates)'}
                </span>
              </div>
            </div>

            <div className={styles.inspectorCommand}>
              <span className={styles.commandLabel}>Flashing Command</span>
              <p className={styles.commandHint}>
                {selectedPartition.flashingMode === 'userspace (fastbootd)'
                  ? 'Run in fastboot userspace mode:'
                  : selectedPartition.flashingMode === 'bootloader (fastboot)'
                  ? 'Flash partition in bootloader mode:'
                  : 'Managed directly by system framework:'}
              </p>
              <div className={styles.commandSequence}>
                {selectedPartition.flashingMode === 'userspace (fastbootd)' ? (
                  <>
                    <CommandCodeBlock command="fastboot reboot fastboot" />
                    <CommandCodeBlock command={`fastboot flash ${selectedPartition.name} ${selectedPartition.name}.img`} />
                  </>
                ) : selectedPartition.flashingMode === 'bootloader (fastboot)' ? (
                  <CommandCodeBlock command={`fastboot flash ${selectedPartition.name} ${selectedPartition.name}.img`} />
                ) : (
                  <CommandCodeBlock command={`fastboot erase ${selectedPartition.name}`} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* TAB 2: Dynamic Partitions & super.img Architecture */}
      {activeTab === 'dynamic' && (
        <div className={styles.dynamicContainer}>
          <div className={styles.dynamicIntro}>
            <h4>Userspace Dynamic Partitioning Architecture</h4>
            <p>
              Android 11+ pools system, vendor, and product sub-partitions inside a single physical <code>super</code> container. Linux device-mapper targets (<code>dm-linear</code>) map and size these block ranges dynamically.
            </p>
            <p>
              Unallocated flash space stays in a shared storage pool across all dynamic partitions. Sub-partitions expand or shrink on demand during system updates without needing manual repartitioning.
            </p>
          </div>

          <div className={styles.dynamicDiagram}>
            <div className={styles.superOuterBox}>
              <div className={styles.superHeader}>
                <div className={styles.superTitleRow}>
                  <strong>Physical super.img Container</strong>
                  <span className={styles.superBadge}>Dynamic Virtual Resizing (dm-linear)</span>
                </div>
                <p className={styles.superSubtext}>
                  Single continuous physical flash partition containing dynamically sized logical extents:
                </p>
              </div>

              <div className={styles.dynamicBlocksGrid}>
                <div className={styles.dynamicBlock}>
                  <strong>system</strong>
                  <span>AOSP Framework &amp; Core Binaries</span>
                </div>
                <div className={styles.dynamicBlock}>
                  <strong>system_ext</strong>
                  <span>OEM System Extensions &amp; APIs</span>
                </div>
                <div className={styles.dynamicBlock}>
                  <strong>product</strong>
                  <span>OEM Customizations, UI &amp; Overlays</span>
                </div>
                <div className={styles.dynamicBlock}>
                  <strong>vendor</strong>
                  <span>SoC Hardware Abstraction (HALs)</span>
                </div>
                <div className={styles.dynamicBlock}>
                  <strong>odm</strong>
                  <span>Device SKU &amp; Board Configurations</span>
                </div>
                <div className={styles.dynamicBlock}>
                  <strong>dlkm modules</strong>
                  <span>Loadable Kernel Drivers (.ko)</span>
                </div>
                <div className={clsx(styles.dynamicBlock, styles.freeSpaceBlock)}>
                  <strong>Shared Unallocated Pool</strong>
                  <span>Flexible Shared Storage (allocated on demand)</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.dynamicNotesGrid}>
            <div className={styles.noteCard}>
              <h5>Fastboot vs FastbootD</h5>
              <p>
                Standard Fastboot runs in the basic bootloader and only communicates with physical hardware chips. FastbootD runs inside Android userspace, allowing it to open <code>super.img</code> and flash flexible sub-partitions (such as <code>system.img</code> or <code>product.img</code>). Boot into FastbootD using:
              </p>
              <CommandCodeBlock command="fastboot reboot fastboot" />
            </div>
            <div className={styles.noteCard}>
              <h5>Logical Partition Archive Structure</h5>
              <p>
                Nothing OS does not ship a monolithic <code>super.img</code>; OTA packages deliver individual dynamic sub-partition images (such as <code>system.img</code>, <code>product.img</code>, and <code>vendor.img</code>). The Nothing Archive packages these extracted images into multi-part split 7z archives (<code>-image-logical.7z.001-00x</code>) to adhere to GitHub Release's 2GB file limit while allowing direct flashing via FastbootD.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: A/B Update Simulator */}
      {activeTab === 'ab_flow' && (() => {
        const sourceSlot = startingSlot;
        const targetSlot = startingSlot === 'A' ? 'B' : 'A';
        const isCompleted = abStepIndex === 3;
        const activeBootSlot = isCompleted ? targetSlot : sourceSlot;

        const slotAStatus =
          sourceSlot === 'A'
            ? isCompleted
              ? 'Rollback Standby (Prior Build)'
              : abStepIndex === 0
              ? 'Active (Running Nothing OS)'
              : abStepIndex === 1
              ? 'Active (In use)'
              : 'Active (Switching Target)'
            : isCompleted
            ? 'Running Updated System'
            : abStepIndex === 1
            ? 'Streaming payload chunks...'
            : abStepIndex === 2
            ? 'Verified & Target Ready'
            : 'Standby / Prior Build Backup';

        const slotBStatus =
          sourceSlot === 'B'
            ? isCompleted
              ? 'Rollback Standby (Prior Build)'
              : abStepIndex === 0
              ? 'Active (Running Nothing OS)'
              : abStepIndex === 1
              ? 'Active (In use)'
              : 'Active (Switching Target)'
            : isCompleted
            ? 'Running Updated System'
            : abStepIndex === 1
            ? 'Streaming payload chunks...'
            : abStepIndex === 2
            ? 'Verified & Target Ready'
            : 'Standby / Prior Build Backup';

        const dynamicCommand =
          abStepIndex === 0
            ? `fastboot getvar current-slot => _${sourceSlot.toLowerCase()}`
            : abStepIndex === 1
            ? `update_engine: Applying payload chunks to Slot ${targetSlot} snapshots`
            : abStepIndex === 2
            ? `bootctl set-active-boot-slot ${targetSlot === 'B' ? 1 : 0}`
            : `update_verifier: dm-verity verified -> Slot ${targetSlot} marked successful`;

        const dynamicOperation =
          abStepIndex === 0
            ? `Normal execution from Slot ${sourceSlot} with filesystems mounted read-only.`
            : abStepIndex === 1
            ? `update_engine downloads and writes OTA blocks directly into Slot ${targetSlot}.`
            : abStepIndex === 2
            ? `vbmeta_${targetSlot.toLowerCase()} signature validation and /misc slot flag handoff to Slot ${targetSlot}.`
            : `Quick restart into Slot ${targetSlot} with update_verifier dm-verity confirmation.`;

        const dynamicTechDetails =
          abStepIndex === 0
            ? `The bootloader evaluates the /misc partition on startup. Slot ${sourceSlot} is designated as active, bootable, and successful. Storage partitions boot_${sourceSlot.toLowerCase()}, init_boot_${sourceSlot.toLowerCase()}, and super logical partitions are mounted read-only.`
            : abStepIndex === 1
            ? `Virtual A/B utilizes copy-on-write (COW) snapshots allocated on userdata. The update_engine daemon processes delta payload blocks in userspace into Slot ${targetSlot} without interrupting running applications or requiring recovery mode.`
            : abStepIndex === 2
            ? `Android validates cryptographic hash trees across all Slot ${targetSlot} images using vbmeta_${targetSlot.toLowerCase()}. Upon verification, the boot_control HAL writes to /misc, setting Slot ${targetSlot} as the active boot target with an initial retry counter of 7.`
            : `The device reboots into Slot ${targetSlot} in seconds. Early init invokes update_verifier to confirm dm-verity filesystem integrity. Once verified, Slot ${targetSlot} is marked successful. If boot fails after 7 retries, the bootloader automatically reverts to Slot ${sourceSlot}.`;

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

            {/* Stepper Progress Bar */}
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

            {/* Dual Slot Visual Simulation */}
            <div className={styles.slotsComparison}>
              {/* Slot A Box */}
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

              {/* Central Transition Indicator */}
              <div className={styles.transitionHub}>
                <div className={styles.miscBlock}>
                  <strong>/misc buffer</strong>
                  <span>Target: Slot {activeBootSlot}</span>
                </div>
                <div className={styles.flowArrow}>{sourceSlot === 'A' ? '➔' : '⬅'}</div>
              </div>

              {/* Slot B Box */}
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

            {/* Shared Userdata Bar */}
            <div className={styles.sharedDataBar}>
              <strong>SHARED USER DATA (/data)</strong>
              <span>Encrypted with File-Based Encryption and preserved across all dual-slot updates</span>
            </div>

            {/* Step Explanation Card */}
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

              {/* Stepper Controls */}
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
      })()}

      {/* Storage & Update Architecture Glossary Section */}
      <div className={styles.glossarySection}>
        <button
          type="button"
          className={styles.glossaryToggleBtn}
          onClick={() => setShowGlossary((prev) => !prev)}
          aria-expanded={showGlossary}
        >
          <div className={styles.glossaryToggleTitle}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.glossaryIconSvg}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>Key Terminologies Explained</span>
          </div>
          <span className={clsx(styles.glossaryArrow, showGlossary && styles.glossaryArrowOpen)}>
            ▼
          </span>
        </button>

        {showGlossary && (
          <div className={styles.glossaryGrid}>
            {PARTITION_GLOSSARY.map((item) => (
              <div key={item.term} className={styles.glossaryCard}>
                <div className={styles.glossaryCardHeader}>
                  <code>{item.term}</code>
                  <span className={styles.glossarySubtitle}>{item.subtitle}</span>
                </div>
                <p className={styles.glossarySimpleText}>{item.simpleMeaning}</p>
                <div className={styles.glossaryTechBox}>
                  <span className={styles.glossaryTechLabel}>Architecture:</span>
                  <span className={styles.glossaryTechText}>{item.technicalRole}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official AOSP Reference Links Section */}
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
    </div>
  );
}

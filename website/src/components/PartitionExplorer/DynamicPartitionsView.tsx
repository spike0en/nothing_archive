import React from 'react';
import clsx from 'clsx';
import styles from './PartitionExplorer.module.css';
import { CommandCodeBlock } from './CommandCodeBlock';
import { SuperEmptyRecoveryHub } from './SuperEmptyRecoveryHub';

export function DynamicPartitionsView({
  selectedEmptyDeviceCodename,
  onSelectEmptyDeviceCodename,
}: {
  selectedEmptyDeviceCodename: string;
  onSelectEmptyDeviceCodename: (codename: string) => void;
}): React.JSX.Element {
  return (
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
            Nothing OS doesn't ship a monolithic <code>super.img</code>; OTA packages deliver individual dynamic sub-partition images (such as <code>system.img</code>, <code>product.img</code>, and <code>vendor.img</code>). The Nothing Archive packages these extracted images into multi-part split 7z archives (<code>-image-logical.7z.001-00x</code>) to adhere to GitHub Release's 2GB file limit while allowing direct flashing via FastbootD.
          </p>
        </div>
      </div>

      <SuperEmptyRecoveryHub
        selectedCodename={selectedEmptyDeviceCodename}
        onSelectCodename={onSelectEmptyDeviceCodename}
      />
    </div>
  );
}

import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './PartitionExplorer.module.css';
import { SUPER_EMPTY_DEVICES } from './partitionData';
import { CommandCodeBlock } from './CommandCodeBlock';
import { useClickOutside } from './useClickOutside';

function DeviceSelectDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const selected = SUPER_EMPTY_DEVICES.find((d) => d.codename === value) || SUPER_EMPTY_DEVICES[0];

  return (
    <div className={styles.customDeviceDropdown} ref={dropdownRef}>
      <button
        type="button"
        className={clsx(styles.deviceDropdownTrigger, isOpen && styles.deviceDropdownTriggerActive)}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.deviceDropdownLabel}>
          <span className={styles.deviceDropdownName}>{selected.name}</span>
          <code className={styles.deviceDropdownCodename}>({selected.codename})</code>
        </span>
        <svg
          className={clsx(styles.dropdownChevron, isOpen && styles.dropdownChevronOpen)}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.deviceDropdownMenu} role="listbox">
          {SUPER_EMPTY_DEVICES.map((d) => {
            const isSelected = d.codename === value;
            return (
              <button
                key={d.codename}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={clsx(styles.deviceDropdownItem, isSelected && styles.deviceDropdownItemActive)}
                onClick={() => {
                  onChange(d.codename);
                  setIsOpen(false);
                }}
              >
                <span className={styles.itemDeviceName}>{d.name}</span>
                <code className={styles.itemDeviceCodename}>({d.codename})</code>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SuperEmptyRecoveryHub({
  selectedCodename,
  onSelectCodename,
}: {
  selectedCodename: string;
  onSelectCodename: (codename: string) => void;
}): React.JSX.Element {
  const selectedDevice =
    SUPER_EMPTY_DEVICES.find((d) => d.codename === selectedCodename) || SUPER_EMPTY_DEVICES[0];

  return (
    <div className={styles.superEmptyRecoveryHub}>
      <div className={styles.superEmptyHeader}>
        <div className={styles.superEmptyTitleRow}>
          <div className={styles.superEmptyTitleGroup}>
            <span className={styles.superEmptyTitle}>super_empty.img Dynamic Partition Recovery</span>
            <span className={styles.superEmptySubtitle}>AOSP Dynamic Partition Layout Rebuilder</span>
          </div>
          <span className={styles.superEmptyBadge}>AOSP LpMetadata</span>
        </div>
        <p className={styles.superEmptyDesc}>
          A lightweight metadata template containing clean <code>LpMetadata</code> partition tables, slot groups, and default size allocations without filesystem payloads. Think of <code>super_empty.img</code> as an empty blueprint: it resets <code>super.img</code> boundaries during unbricking or when switching between custom ROMs and stock Nothing OS if logical sub-partitions fail to flash.
        </p>
      </div>

      <div className={styles.superEmptyContentGrid}>
        <div className={styles.superEmptyWorkflowCol}>
          <span className={styles.workflowHeading}>Fastboot Unbricking &amp; Layout Workflow</span>
          <div className={styles.superEmptyWorkflowSteps}>
            <div className={styles.superEmptyStep}>
              <span className={styles.stepTag}>1. Wipe &amp; initialize metadata in Bootloader mode:</span>
              <CommandCodeBlock command={`fastboot wipe-super super_empty_${selectedDevice.codename}.img`} />
            </div>
            <div className={styles.superEmptyStep}>
              <span className={styles.stepTag}>2. Boot into Userspace Fastboot (FastbootD):</span>
              <CommandCodeBlock command="fastboot reboot fastboot" />
            </div>
            <div className={styles.superEmptyStep}>
              <span className={styles.stepTag}>3. Flash logical sub-partitions in FastbootD:</span>
              <CommandCodeBlock command="fastboot flash system system.img" />
            </div>
          </div>
        </div>

        <div className={styles.superEmptyDownloadCol}>
          <span className={styles.downloadHubHeading}>Device-Specific Metadata Downloads</span>
          <div className={styles.deviceInfoCard}>
            <div className={styles.deviceSelectRow}>
              <span className={styles.deviceSelectLabel}>Select Model:</span>
              <DeviceSelectDropdown
                value={selectedCodename}
                onChange={onSelectCodename}
              />
            </div>

            <div className={styles.deviceInfoTop}>
              <span className={styles.deviceNameText}>{selectedDevice.name}</span>
            </div>

            <a
              href={selectedDevice.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadBtn}
              title={`Download ${selectedDevice.name} super_empty.img`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download super_empty_{selectedDevice.codename}.img</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

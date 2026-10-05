import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './PartitionExplorer.module.css';
import {
  PARTITIONS_DATA,
  PARTITION_GROUPS,
  type PartitionKey,
} from './partitionData';
import { useClickOutside } from './useClickOutside';
import { PartitionInspector } from './PartitionInspector';
import { SuperEmptyRecoveryHub } from './SuperEmptyRecoveryHub';

function TierPartitionDropdown({
  keys,
  selectedKey,
  onSelect,
  placeholder,
}: {
  keys: PartitionKey[];
  selectedKey: PartitionKey;
  onSelect: (key: PartitionKey) => void;
  placeholder: string;
}): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const isCurrentGroupSelected = keys.includes(selectedKey);
  const activeInfo = isCurrentGroupSelected ? PARTITIONS_DATA[selectedKey] : null;

  return (
    <div className={styles.tierDropdownContainer} ref={dropdownRef}>
      <button
        type="button"
        className={clsx(
          styles.tierDropdownTrigger,
          isOpen && styles.tierDropdownTriggerOpen,
          isCurrentGroupSelected && styles.tierDropdownTriggerSelected
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className={styles.tierDropdownTriggerContent}>
          {activeInfo ? (
            <>
              <span className={styles.tierActivePartName}>{activeInfo.name}</span>
              {activeInfo.category !== 'data' && <span className={styles.tierSlotSuffix}>_a / _b</span>}
              <span className={styles.tierActiveBadge}>{activeInfo.chipset}</span>
            </>
          ) : (
            <span className={styles.tierPlaceholder}>{placeholder} ({keys.length} items)</span>
          )}
        </div>
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
        <div className={styles.tierDropdownMenu} role="listbox">
          {keys.map((key) => {
            const info = PARTITIONS_DATA[key];
            if (!info) return null;
            const isSelected = selectedKey === key;
            return (
              <button
                key={key}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={clsx(styles.tierDropdownItem, isSelected && styles.tierDropdownItemActive)}
                onClick={() => {
                  onSelect(key);
                  setIsOpen(false);
                }}
              >
                <div className={styles.tierItemLeft}>
                  <strong className={styles.tierItemName}>{info.name}</strong>
                  <span className={styles.tierItemSummary}>{info.summary}</span>
                </div>
                <span
                  className={clsx(
                    styles.tierChipsetBadge,
                    info.chipset === 'Qualcomm' && styles.chipsetQualcomm,
                    info.chipset === 'MediaTek' && styles.chipsetMediaTek,
                    info.chipset === 'Universal' && styles.chipsetUniversal
                  )}
                >
                  {info.chipset}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function HierarchyView({
  selectedKey,
  onSelectKey,
  selectedEmptyDeviceCodename,
  onSelectEmptyDeviceCodename,
}: {
  selectedKey: PartitionKey;
  onSelectKey: (key: PartitionKey) => void;
  selectedEmptyDeviceCodename: string;
  onSelectEmptyDeviceCodename: (codename: string) => void;
}): React.JSX.Element {
  const [socFilter, setSocFilter] = useState<'all' | 'Qualcomm' | 'MediaTek'>('all');
  const selectedPartition = PARTITIONS_DATA[selectedKey] || PARTITIONS_DATA['init_boot'];

  return (
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
              if (PARTITIONS_DATA[selectedKey]?.chipset === 'MediaTek') {
                onSelectKey('abl');
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
              if (PARTITIONS_DATA[selectedKey]?.chipset === 'Qualcomm') {
                onSelectKey('preloader_raw');
              }
            }}
          >
            MediaTek Dimensity
          </button>
        </div>
      </div>

      <div className={styles.tierCardsGrid}>
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
                <span>{group.title}</span>
                {group.badge && <span className={styles.categoryBadge}>{group.badge}</span>}
              </div>
              {group.description && <p className={styles.superDesc}>{group.description}</p>}
              <TierPartitionDropdown
                keys={filteredKeys}
                selectedKey={selectedKey}
                onSelect={onSelectKey}
                placeholder={`Select from ${group.title.replace(/^\d+\.\s*/, '')}`}
              />
            </div>
          );
        })}
      </div>

      <PartitionInspector partition={selectedPartition} />

      <SuperEmptyRecoveryHub
        selectedCodename={selectedEmptyDeviceCodename}
        onSelectCodename={onSelectEmptyDeviceCodename}
      />
    </div>
  );
}

import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './PartitionExplorer.module.css';
import { type PartitionKey } from './partitionData';
import { HierarchyView } from './HierarchyView';
import { DynamicPartitionsView } from './DynamicPartitionsView';
import { AbUpdateSimulator } from './AbUpdateSimulator';
import { AospReferencesSection } from './AospReferencesSection';

export default function PartitionExplorer(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<'stack' | 'dynamic' | 'ab_flow'>('stack');
  const [selectedPartitionKey, setSelectedPartitionKey] = useState<PartitionKey>('init_boot');
  const [selectedEmptyDeviceCodename, setSelectedEmptyDeviceCodename] = useState<string>('spacewar');
  const [startingSlot, setStartingSlot] = useState<'A' | 'B'>('A');

  return (
    <div className={styles.container}>
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

      {activeTab === 'stack' && (
        <HierarchyView
          selectedKey={selectedPartitionKey}
          onSelectKey={setSelectedPartitionKey}
          selectedEmptyDeviceCodename={selectedEmptyDeviceCodename}
          onSelectEmptyDeviceCodename={setSelectedEmptyDeviceCodename}
        />
      )}

      {activeTab === 'dynamic' && (
        <DynamicPartitionsView
          selectedEmptyDeviceCodename={selectedEmptyDeviceCodename}
          onSelectEmptyDeviceCodename={setSelectedEmptyDeviceCodename}
        />
      )}

      {activeTab === 'ab_flow' && (
        <AbUpdateSimulator startingSlot={startingSlot} />
      )}

      <AospReferencesSection />
    </div>
  );
}

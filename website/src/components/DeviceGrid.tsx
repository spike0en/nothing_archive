import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import clsx from 'clsx';
import styles from './DeviceGrid.module.css';

interface ColorVariant {
  name: string;
  imageUrl: string;
}

interface DeviceItem {
  name: string;
  codename: string;
  variants: ColorVariant[];
  brand: 'Nothing' | 'CMF';
  series: 'number' | 'a' | 'b' | 'cmf';
}

import devicesData from '../data/devices-metadata.json';

const devices: DeviceItem[] = devicesData as DeviceItem[];

function ModelCard({ device, latestLink }: { device: DeviceItem; latestLink: string }): React.JSX.Element {
  const resolvedLink = useBaseUrl(latestLink);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(
    device.variants.length > 0 ? device.variants[0] : null
  );

  const resolvedImageUrl = selectedColor ? useBaseUrl(selectedColor.imageUrl) : '';

  return (
    <div className={styles.card}>
      <Link to={resolvedLink} className={styles.cardLink}>
        <div className={styles.modelContainer}>
          {selectedColor ? (
            <img
              key={resolvedImageUrl}
              src={resolvedImageUrl}
              alt={`${device.name} - ${selectedColor.name}`}
              className={styles.deviceImage}
              loading="lazy"
            />
          ) : (
            <div className={styles.fallbackContainer}>
              <svg
                className={styles.fallbackIcon}
                viewBox="0 0 120 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="10" y="10" width="100" height="180" rx="16" stroke="currentColor" strokeWidth="1.5" />
                <rect x="7" y="50" width="3" height="20" rx="1" fill="currentColor" />
                <rect x="7" y="75" width="3" height="20" rx="1" fill="currentColor" />
                <rect x="110" y="65" width="3" height="30" rx="1" fill="currentColor" />
                <circle cx="45" cy="80" r="2" fill="currentColor" />
                <circle cx="45" cy="95" r="2" fill="currentColor" />
                <circle cx="45" cy="110" r="2" fill="currentColor" />
                <circle cx="45" cy="125" r="2" fill="currentColor" />
                <circle cx="55" cy="95" r="2" fill="currentColor" />
                <circle cx="65" cy="110" r="2" fill="currentColor" />
                <circle cx="75" cy="80" r="2" fill="currentColor" />
                <circle cx="75" cy="95" r="2" fill="currentColor" />
                <circle cx="75" cy="110" r="2" fill="currentColor" />
                <circle cx="75" cy="125" r="2" fill="currentColor" />
                <text x="60" y="160" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="var(--ifm-font-family-monospace)" letterSpacing="1">ARCHIVE</text>
              </svg>
              <span className={styles.fallbackText}>{device.codename.toUpperCase()}</span>
            </div>
          )}
        </div>
      </Link>
      <div className={styles.infoContainer}>
        <Link to={resolvedLink} className={styles.infoTextLink}>
          <h3 className={styles.deviceName}>{device.name}</h3>
        </Link>
        {device.variants.length > 1 && (
          <div className={styles.colorSelector}>
            {device.variants.map((v) => (
              <button
                key={v.name}
                type="button"
                className={clsx(styles.colorPill, selectedColor?.name === v.name && styles.colorPillActive)}
                onClick={() => setSelectedColor(v)}
                title={v.name}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DeviceGrid(): React.JSX.Element {
  const { latestLinks } = usePluginData('changelogs-plugin') as { latestLinks: Record<string, string> };
  const numberDevices = devices.filter(d => d.brand === 'Nothing' && d.series === 'number');
  const aDevices = devices.filter(d => d.brand === 'Nothing' && d.series === 'a');
  const bDevices = devices.filter(d => d.brand === 'Nothing' && d.series === 'b');
  const cmfDevices = devices.filter(d => d.brand === 'CMF');

  return (
    <div>
      {numberDevices.length > 0 && (
        <>
          <h2 className={styles.sectionHeader}>Nothing Phone Series</h2>
          <div className={styles.grid}>
            {numberDevices.map(device => (
              <ModelCard
                key={device.codename}
                device={device}
                latestLink={latestLinks?.[device.codename] || `/docs/changelogs/${device.codename}`}
              />
            ))}
          </div>
        </>
      )}

      {aDevices.length > 0 && (
        <>
          <h2 className={styles.sectionHeader}>Nothing Phone (a) Series</h2>
          <div className={styles.grid}>
            {aDevices.map(device => (
              <ModelCard
                key={device.codename}
                device={device}
                latestLink={latestLinks?.[device.codename] || `/docs/changelogs/${device.codename}`}
              />
            ))}
          </div>
        </>
      )}

      {bDevices.length > 0 && (
        <>
          <h2 className={styles.sectionHeader}>Nothing Phone (b / Lite) Series</h2>
          <div className={styles.grid}>
            {bDevices.map(device => (
              <ModelCard
                key={device.codename}
                device={device}
                latestLink={latestLinks?.[device.codename] || `/docs/changelogs/${device.codename}`}
              />
            ))}
          </div>
        </>
      )}

      {cmfDevices.length > 0 && (
        <>
          <h2 className={styles.sectionHeader}>CMF by Nothing Phone Series</h2>
          <div className={styles.grid}>
            {cmfDevices.map(device => (
              <ModelCard
                key={device.codename}
                device={device}
                latestLink={latestLinks?.[device.codename] || `/docs/changelogs/${device.codename}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

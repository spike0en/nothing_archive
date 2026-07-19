/**
 * @file DeviceGrid.tsx
 * @description Component that renders the visual catalog of Nothing and CMF devices
 * as a grid on the homepage, allowing users to toggle between color variants of each model.
 * 
 * Layer: Home page components.
 * Boundary: Consumes devices-metadata.json and dynamically routes users to their latest changelog.
 */

import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import clsx from 'clsx';
import styles from './DeviceGrid.module.css';

interface ColorVariant {
  name: string;
  imageUrl: string;
}

/** Represents metadata details for a specific device model. */
interface DeviceItem {
  name: string;
  codename: string;
  variants: ColorVariant[];
  brand: 'Nothing' | 'CMF';
  series: 'number' | 'a' | 'b' | 'cmf';
}

import devicesData from '../data/devices-metadata.json';

const devices: DeviceItem[] = devicesData as DeviceItem[];

/**
 * ModelCard component representing a single device in the grid.
 * Displays the name, active color variant image, and custom selector controls.
 */
function ModelCard({ device, latestLink }: { device: DeviceItem; latestLink: string }): React.JSX.Element {
  const resolvedLink = useBaseUrl(latestLink);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(
    device.variants.length > 0 ? device.variants[0] : null
  );

  const resolvedImageUrl = selectedColor ? useBaseUrl(selectedColor.imageUrl) : '';

  const match = device.name.match(/^(.*?)\s*\(([^)]+)\)$/);
  const displayName = match ? match[1] : device.name;
  const displayCodename = match ? match[2] : device.codename;

  return (
    <div className={styles.card}>
      <Link to={resolvedLink} className={styles.cardLink}>
        <div className={styles.modelContainer}>
          {selectedColor ? (
            <img
              key={resolvedImageUrl}
              src={resolvedImageUrl}
              alt={translate({id: 'deviceGrid.imageAlt', message: '{device} - {color}', description: 'Accessible label for a device image'}, {device: device.name, color: selectedColor.name})}
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
        <div className={styles.deviceBrand}>{displayCodename.toUpperCase()}</div>
        <Link to={resolvedLink} className={styles.infoTextLink}>
          <h3 className={styles.deviceName}>{displayName}</h3>
        </Link>
        {device.variants.length > 1 && (
          <div className={styles.colorSelector} role="group" aria-label={translate({id: 'deviceGrid.colorVariants', message: 'Color variants for {device}', description: 'Accessible label for a device color selector'}, {device: device.name})}>
            {device.variants.map((v) => (
              <button
                key={v.name}
                type="button"
                className={clsx(styles.colorPill, selectedColor?.name === v.name && styles.colorPillActive)}
                onClick={() => setSelectedColor(v)}
                title={v.name}
                aria-label={translate({id: 'deviceGrid.selectColor', message: 'Select {color} color', description: 'Accessible label for a device color option'}, {color: v.name})}
                aria-pressed={selectedColor?.name === v.name}
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

/**
 * DeviceGrid component.
 * Filters and categorizes the parsed device metadata list, rendering grouped section grids.
 */
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
          <h2 className={styles.sectionHeader}>{translate({id: 'deviceGrid.series.number', message: 'Nothing Phone Series', description: 'Device catalog category heading'})}</h2>
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
          <h2 className={styles.sectionHeader}>{translate({id: 'deviceGrid.series.a', message: 'Nothing Phone (a) Series', description: 'Device catalog category heading'})}</h2>
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
          <h2 className={styles.sectionHeader}>{translate({id: 'deviceGrid.series.b', message: 'Nothing Phone (b / Lite) Series', description: 'Device catalog category heading'})}</h2>
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
          <h2 className={styles.sectionHeader}>{translate({id: 'deviceGrid.series.cmf', message: 'CMF by Nothing Phone Series', description: 'Device catalog category heading'})}</h2>
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

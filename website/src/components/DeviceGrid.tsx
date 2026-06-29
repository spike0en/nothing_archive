import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import clsx from 'clsx';
import styles from './DeviceGrid.module.css';

interface ColorVariant {
  name: string;
  imageUrl: string;
  hex: string;
}

interface DeviceItem {
  name: string;
  codename: string;
  variants: ColorVariant[];
  brand: 'Nothing' | 'CMF';
}

const devices: DeviceItem[] = [
  // --- Nothing Phones (Newest to Oldest) ---
  {
    name: 'Phone (4a) Pro (FroggerPro)',
    codename: 'froggerpro',
    variants: [
      { name: 'Silver', imageUrl: '/img/devices/froggerpro_silver.webp', hex: '#D1D1D6' },
      { name: 'Black', imageUrl: '/img/devices/froggerpro_black.webp', hex: '#1C1C1C' },
      { name: 'Pink', imageUrl: '/img/devices/froggerpro_pink.webp', hex: '#FFB6C1' }
    ],
    brand: 'Nothing'
  },
  {
    name: 'Phone (4a) (Frogger)',
    codename: 'frogger',
    variants: [
      { name: 'White', imageUrl: '/img/devices/frogger_white.webp', hex: '#FFFFFF' },
      { name: 'Black', imageUrl: '/img/devices/frogger_black.webp', hex: '#1C1C1C' },
      { name: 'Pink', imageUrl: '/img/devices/frogger_pink.webp', hex: '#FFB6C1' },
      { name: 'Blue', imageUrl: '/img/devices/frogger_blue.webp', hex: '#1F4E79' }
    ],
    brand: 'Nothing'
  },
  {
    name: 'Phone (3a) Lite (Galaxian)',
    codename: 'galaxian',
    variants: [
      { name: 'White', imageUrl: '/img/devices/galaxian_white.webp', hex: '#FFFFFF' },
      { name: 'Black', imageUrl: '/img/devices/galaxian_black.webp', hex: '#1C1C1C' },
      { name: 'Blue', imageUrl: '/img/devices/galaxian_blue.webp', hex: '#1F4E79' }
    ],
    brand: 'Nothing'
  },
  {
    name: 'Phone (3) (Metroid)',
    codename: 'metroid',
    variants: [
      { name: 'White', imageUrl: '/img/devices/metroid_white.webp', hex: '#FFFFFF' },
      { name: 'Black', imageUrl: '/img/devices/metroid_black.webp', hex: '#1C1C1C' }
    ],
    brand: 'Nothing'
  },
  {
    name: 'Phone (3a) / (3a) Pro (Asteroids / AsteroidsPro)',
    codename: 'asteroids',
    variants: [
      { name: 'White', imageUrl: '/img/devices/asteroids_white.webp', hex: '#FFFFFF' },
      { name: 'Black', imageUrl: '/img/devices/asteroids_black.webp', hex: '#1C1C1C' },
      { name: 'Blue', imageUrl: '/img/devices/asteroids_blue.webp', hex: '#1F4E79' },
      { name: 'Grey', imageUrl: '/img/devices/asteroids_grey.webp', hex: '#8E8E93' },
      { name: 'CE', imageUrl: '/img/devices/asteroids_CE.webp', hex: '#248B8D' }
    ],
    brand: 'Nothing'
  },
  {
    name: 'Phone (2a) Plus (PacmanPro)',
    codename: 'pacmanpro',
    variants: [
      { name: 'Silver', imageUrl: '/img/devices/pacmanpro_silver.webp', hex: '#8E8E93' },
      { name: 'Black', imageUrl: '/img/devices/pacmanpro_black.webp', hex: '#1C1C1C' },
      { name: 'CE', imageUrl: '/img/devices/pacmanpro_CE.webp', hex: '#D9DFCA' }
    ],
    brand: 'Nothing'
  },
  {
    name: 'Phone (2a) (Pacman)',
    codename: 'pacman',
    variants: [
      { name: 'Milk', imageUrl: '/img/devices/pacman_milk.webp', hex: '#F0EDE6' },
      { name: 'Black', imageUrl: '/img/devices/pacman_black.webp', hex: '#1C1C1C' }
    ],
    brand: 'Nothing'
  },
  {
    name: 'Phone (2) (Pong)',
    codename: 'pong',
    variants: [
      { name: 'Grey', imageUrl: '/img/devices/pong_grey.webp', hex: '#8E8E93' },
      { name: 'White', imageUrl: '/img/devices/pong_white.webp', hex: '#FFFFFF' }
    ],
    brand: 'Nothing'
  },
  {
    name: 'Phone (1) (Spacewar)',
    codename: 'spacewar',
    variants: [
      { name: 'Black', imageUrl: '/img/devices/spacewar_black.webp', hex: '#1C1C1C' },
      { name: 'White', imageUrl: '/img/devices/spacewar_white.webp', hex: '#FFFFFF' }
    ],
    brand: 'Nothing'
  },
  // --- CMF Phones (Newest to Oldest) ---
  {
    name: 'CMF Phone (2) Pro (Galaga)',
    codename: 'galaga',
    variants: [
      { name: 'Orange', imageUrl: '/img/devices/galaga_orange.webp', hex: '#FF6F00' },
      { name: 'Black', imageUrl: '/img/devices/galaga_black.webp', hex: '#1C1C1C' },
      { name: 'Grey', imageUrl: '/img/devices/galaga_grey.webp', hex: '#8E8E93' },
      { name: 'Light Green', imageUrl: '/img/devices/galaga_lightgreen.webp', hex: '#A9DFBF' }
    ],
    brand: 'CMF'
  },
  {
    name: 'CMF Phone (1) (Tetris)',
    codename: 'tetris',
    variants: [
      { name: 'Light Green', imageUrl: '/img/devices/tetris_lightgreen.webp', hex: '#A9DFBF' },
      { name: 'Orange', imageUrl: '/img/devices/tetris_orange.webp', hex: '#FF6F00' },
      { name: 'Black', imageUrl: '/img/devices/tetris_black.webp', hex: '#1C1C1C' }
    ],
    brand: 'CMF'
  }
];

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
                className={clsx(styles.colorDot, selectedColor?.name === v.name && styles.colorDotActive)}
                style={{ backgroundColor: v.hex }}
                onClick={() => setSelectedColor(v)}
                title={v.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DeviceGrid(): React.JSX.Element {
  const { latestLinks } = usePluginData('changelogs-plugin') as { latestLinks: Record<string, string> };
  const nothingDevices = devices.filter(d => d.brand === 'Nothing');
  const cmfDevices = devices.filter(d => d.brand === 'CMF');

  return (
    <div>
      <h2 className={styles.sectionHeader}>Nothing Phones</h2>
      <div className={styles.grid}>
        {nothingDevices.map(device => (
          <ModelCard 
            key={device.codename} 
            device={device} 
            latestLink={latestLinks?.[device.codename] || `/docs/changelogs/${device.codename}`}
          />
        ))}
      </div>

      <h2 className={styles.sectionHeader}>CMF by Nothing Phones</h2>
      <div className={styles.grid}>
        {cmfDevices.map(device => (
          <ModelCard 
            key={device.codename} 
            device={device} 
            latestLink={latestLinks?.[device.codename] || `/docs/changelogs/${device.codename}`}
          />
        ))}
      </div>
    </div>
  );
}

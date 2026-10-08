import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

import devicesData from '../../../data/devices-metadata.json';
import styles from './styles.module.css';

interface DeviceItem {
  name: string;
  codename: string;
  folder?: string;
}

// SAFETY: Validated structure matching DeviceItem schema
const devices: DeviceItem[] = devicesData as DeviceItem[];

/** Returns the document title when frontmatter does not explicitly suppress it or declare contentTitle. */
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && contentTitle === undefined;
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

/**
 * Renders documentation page markdown content with synthetic title handling
 * and firmware download cross-links on individual changelog documents.
 */
export default function DocItemContent({ children }: { children: React.ReactNode }): React.JSX.Element {
  const syntheticTitle = useSyntheticTitle();
  const { metadata } = useDoc();

  let isChangelog = false;
  let changelogFolder = '';
  let deviceName = '';

  if (metadata.id && metadata.id.startsWith('changelogs/')) {
    const parts = metadata.id.split('/');
    if (parts.length >= 3) {
      isChangelog = true;
      changelogFolder = parts[1].toLowerCase();
      const matchedDevice = devices.find(
        (d) => (d.folder || d.codename).toLowerCase() === changelogFolder
      );
      // Strips trailing codename in parentheses: "Phone (3) (Metroid)" -> "Phone (3)".
      deviceName = matchedDevice
        ? matchedDevice.name.replace(/\s*\([^)]+\)$/, '')
        : changelogFolder;
    }
  }

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}

      <MDXContent>{children}</MDXContent>

      {isChangelog && (
        <div className={styles.otaBottomLink}>
          <span>Need full or incremental OTA packages for this build?</span>
          <Link to={`/docs/firmware#${changelogFolder}`}>
            View {deviceName} Firmware Downloads →
          </Link>
        </div>
      )}
    </div>
  );
}

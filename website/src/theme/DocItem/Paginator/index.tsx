import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocPaginator from '@theme/DocPaginator';

export default function DocItemPaginator(): React.JSX.Element {
  const { metadata } = useDoc();

  let previous = metadata.previous;
  let next = metadata.next;

  if (metadata.id && metadata.id.startsWith('changelogs/')) {
    const parts = metadata.id.split('/');
    if (parts.length >= 3) {
      const currentFolder = parts[1].toLowerCase();
      const folderSegment = `/changelogs/${currentFolder}/`;

      if (!previous?.permalink.toLowerCase().includes(folderSegment)) {
        previous = {
          title: 'OTA Changelogs',
          permalink: '/docs/changelogs',
        };
      }

      if (next && !next.permalink.toLowerCase().includes(folderSegment)) {
        next = undefined;
      }
    }
  }

  return (
    <DocPaginator
      className="docusaurus-mt-lg"
      previous={previous}
      next={next}
    />
  );
}

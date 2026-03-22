import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Resources',
      collapsed: false,
      items: ['devices', 'firmware', 'guides', 'official', 'apps', 'projects', 'photography'],
    },
  ],
};

export default sidebars;

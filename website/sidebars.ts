import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Resources',
      collapsed: false,
      items: ['devices', 'apps', 'projects', 'official', 'photography', 'guides'],
    },
  ],
};

export default sidebars;

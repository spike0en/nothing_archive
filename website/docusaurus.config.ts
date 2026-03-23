/**
 * Docusaurus Configuration
 * 
 * Defines site metadata, navigation, plugins, and theme configuration
 * for the Nothing Archive documentation website.
 */

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';


const config: Config = {
  title: 'Nothing Archive',
  tagline: 'Your ultimate source for Nothing OS firmware, community resources, and guides',
  favicon: 'img/logo.png',

  future: {
    v4: true,
  },

  url: 'https://spike0en.github.io',
  baseUrl: '/nothing_archive/',

  organizationName: 'spike0en',
  projectName: 'nothing_archive',

  onBrokenLinks: 'throw',

  markdown: {
    format: 'mdx',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      // Offline local search plugin
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/spike0en/nothing_archive/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: 'Nothing Phone, Nothing OS, CMF by Nothing, Glyph, Nothing community, Nothing apps, awesome list',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'google-site-verification',
        content: '3GiSAQalJgWEODkGniX-NUdpsU7tYu5iJnzjb1hIkUs',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],

  themeConfig: {
    image: 'img/banner.png',
    metadata: [
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Nothing OS Firmware Archive Banner' },
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Nothing Archive',
      logo: {
        alt: 'Nothing Archive Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: '/',
          position: 'left',
          label: 'Home',
          exact: true,
        },
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/spike0en/nothing_archive',
          position: 'right',
          className: 'header-badge header-github-hits',
          'aria-label': 'GitHub Hits',
          html: `<img src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive&label=Hits&icon=github&color=%2324292e&labelColor=333333" width="107" height="20" alt="GitHub Hits" />`,
        },
        {
          href: 'https://github.com/spike0en/nothing_archive/stargazers',
          position: 'right',
          className: 'header-badge header-github-stars',
          'aria-label': 'GitHub Stars',
          html: `<img src="https://img.shields.io/github/stars/spike0en/nothing_archive?logo=github&color=24292e" width="80" height="20" alt="GitHub Stars" />`,
        },
        {
          href: 'https://github.com/spike0en/nothing_archive',
          label: 'GitHub',
          position: 'right',
          className: 'header-github-link',
        },

      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Crafted with ❤️ by Spike & Shiki for the Nothing Community.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

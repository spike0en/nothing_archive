import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Awesome Nothing',
  tagline: 'A curated list of everything related to Nothing & CMF by Nothing ecosystem',
  favicon: 'img/logo.png',

  future: {
    v4: true,
  },

  url: 'https://spike0en.github.io',
  baseUrl: '/awesome_nothing/',

  organizationName: 'spike0en',
  projectName: 'awesome_nothing',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/spike0en/awesome_nothing/tree/main/website/',
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
        content: 'uOAgNLHc6NGiyCOctf3TIBH8WxWK5heN8RpUNFCEK1Y',
      },
    },
  ],

  themeConfig: {
    image: 'img/banner.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Awesome Nothing',
      logo: {
        alt: 'Awesome Nothing Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: '/',
          position: 'left',
          label: 'Home',
        },
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/spike0en/awesome_nothing',
          position: 'right',
          className: 'header-badge header-github-hits',
          'aria-label': 'GitHub Hits',
          html: `<img src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fawesome_nothing&label=Hits&icon=github&color=%2324292e&labelColor=333333" width="107" height="20" alt="GitHub Hits" />`,
        },
        {
          href: 'https://github.com/spike0en/awesome_nothing/stargazers',
          position: 'right',
          className: 'header-badge header-github-stars',
          'aria-label': 'GitHub Stars',
          html: `<img src="https://img.shields.io/github/stars/spike0en/awesome_nothing?logo=github&color=24292e" width="80" height="20" alt="GitHub Stars" />`,
        },
        {
          href: 'https://github.com/spike0en/awesome_nothing',
          label: 'GitHub',
          position: 'right',
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

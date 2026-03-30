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
  tagline: 'A curated list of everything related to the Nothing ecosystem.',
  favicon: 'favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://spike0en.github.io',
  baseUrl: '/nothing_archive/',

  organizationName: 'spike0en',
  projectName: 'nothing_archive',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  markdown: {
    format: 'mdx',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-TW'],
    localeConfigs: {
      en: { label: 'English' },
      'zh-TW': { label: '繁體中文' },
    },
  },

  themes: [
    [
      // Offline local search plugin
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh'],
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
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/search'],
          filename: 'sitemap.xml',
          async createSitemapItems({ defaultCreateSitemapItems, ...params }) {
            const items = await defaultCreateSitemapItems(params);
            return items.map((item) => {
              if (item.url.includes('/docs/firmware')) {
                return { ...item, changefreq: 'daily' as const, priority: 0.8 };
              }
              if (item.url.includes('/docs/intro') || item.url.endsWith('/nothing_archive/')) {
                return { ...item, priority: 0.9 };
              }
              return item;
            });
          },
        }
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    // SEO: Primary keyword meta tag for search engine indexing
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: 'Nothing Phone, Nothing OS, Nothing OS firmware, Nothing OTA update, CMF by Nothing, Nothing Phone firmware download, Nothing archive, Glyph interface, Nothing community apps',
      },
    },
    // Search engine verification tokens
    {
      tagName: 'meta',
      attributes: {
        name: 'google-site-verification',
        content: '3GiSAQalJgWEODkGniX-NUdpsU7tYu5iJnzjb1hIkUs',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'msvalidate.01',
        content: '9A91D8D4ED9FB1AF08C3344E84B33661',
      },
    },
    // Explicit favicon declaration for Google Search favicon display
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/nothing_archive/favicon.ico',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/nothing_archive/img/logo.png',
      },
    },
    // Font preconnect hints for performance
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
    // Non-render-blocking font stylesheet (replaces CSS @import)
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    },
    // SEO: JSON-LD structured data for rich snippets
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Nothing Archive',
        url: 'https://spike0en.github.io/nothing_archive/',
        description: 'A curated list of everything related to the Nothing ecosystem — firmware, guides, apps, and community resources.',
        publisher: {
          '@type': 'Organization',
          name: 'Nothing Archive',
          url: 'https://github.com/spike0en/nothing_archive',
        },
      }),
    },
  ],

  themeConfig: {
    image: 'img/banner.png',
    metadata: [
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Nothing Archive' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Nothing Archive — Nothing OS Firmware & Community Resources' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Nothing Archive',
      logo: {
        alt: 'Nothing Archive Logo',
        src: 'img/logo.png',
        width: 32,
        height: 32,
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
          html: `<img src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive&label=Hits&icon=github&color=%2324292e&labelColor=333333" alt="GitHub Hits" width="100" height="20" loading="lazy" />`,
        },
        {
          href: 'https://github.com/spike0en/nothing_archive/stargazers',
          position: 'right',
          className: 'header-badge header-github-stars',
          'aria-label': 'GitHub Stars',
          html: `<img src="https://img.shields.io/github/stars/spike0en/nothing_archive?logo=github&color=24292e" alt="GitHub Stars" width="80" height="20" loading="lazy" />`,
        },
        {
          href: 'https://github.com/spike0en/nothing_archive',
          label: 'GitHub',
          position: 'right',
          className: 'header-github-link',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `A community-driven initiative led by <a href="https://github.com/spike0en" target="_blank" rel="noopener noreferrer">Spike</a><br>Not affiliated with <a href="https://nothing.tech" target="_blank" rel="noopener noreferrer">Nothing</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

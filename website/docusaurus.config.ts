/**
 * Primary Docusaurus configuration.
 * Defines site metadata, internationalization, static routing, and theme parameters.
 */

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';


const config: Config = {
  title: 'Nothing Archive',
  tagline: 'A curated hub for everything related to the Nothing ecosystem.',
  favicon: 'favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://spike0en.github.io',
  baseUrl: '/nothing_archive/',
  trailingSlash: false,

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
    locales: ['en', 'fr-FR', 'ja-JP', 'tr-TR', 'zh-TW', 'ru-RU'],
    localeConfigs: {
      en: { label: 'English' },
      'fr-FR': { label: 'Français' },
      'ja-JP': { label: '日本語' },
      'tr-TR': { label: 'Türkçe' },
      'zh-TW': { label: '繁體中文' },
      'ru-RU': { label: 'Русский' },
    },
  },

  themes: [
    [
      // Local offline search provider
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh', 'fr', 'tr', 'ja', 'ru'],
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
    // Core SEO keywords for global indexation
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
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/nothing_archive/img/logo.png',
      },
    },
    // Preload Largest Contentful Paint (LCP) hero graphic
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'image',
        href: '/nothing_archive/img/logo.png',
        fetchpriority: 'high',
      },
    },
    // Preconnect directives for external font domains to reduce latency
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
    // Typography stylesheet loaded asynchronously to prevent render-blocking
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    },
  ],

  themeConfig: {
    image: 'img/banner.png',
    metadata: [
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Nothing Archive' },
      // Note: Docusaurus auto-generates page-specific Open Graph and Twitter metadata.
      // Avoid hardcoding global fallbacks here to prevent canonical SEO conflicts across localizations.
      { property: 'og:image', content: 'https://spike0en.github.io/nothing_archive/img/banner.png' },
      { property: 'og:image:width', content: '2160' },
      { property: 'og:image:height', content: '1080' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:alt', content: 'Nothing Archive — Nothing OS Firmware & Community Resources' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'https://spike0en.github.io/nothing_archive/img/banner.png' },
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
          className: 'header-home-link',
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
          html: `<img src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fspike0en%2Fnothing_archive&label=Hits&icon=github&color=%2324292e&labelColor=333333" alt="GitHub Hits" width="133" height="20" style="width: auto; height: 20px;" loading="lazy" />`,
        },
        {
          href: 'https://github.com/spike0en/nothing_archive/stargazers',
          position: 'right',
          className: 'header-badge header-github-stars',
          'aria-label': 'GitHub Stars',
          html: `<img src="https://img.shields.io/github/stars/spike0en/nothing_archive?logo=github&color=24292e" alt="GitHub Stars" width="94" height="20" style="width: auto; height: 20px;" loading="lazy" />`,
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

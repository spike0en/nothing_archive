/**
 * Primary Docusaurus configuration.
 * Defines site metadata, internationalization, static routing, and theme parameters.
 */

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/**
 * Maps Android version codename letters to their chronological ranks.
 * Add new letters here (e.g., D: 6 for Android 18) to explicitly define them if needed.
 */
const androidOrder: Record<string, number> = {
  T: 1, // Android 13 (Tiramisu)
  U: 2, // Android 14 (Upside Down Cake)
  V: 3, // Android 15 (Vanilla)
  B: 4, // Android 16 (Baklava)
  C: 5, // Android 17 (Cinnamon Bun)
};

/**
 * Resolves the chronological rank of an Android codename letter.
 * Checks the explicit lookup map first, then dynamically falls back to alphabetical rank for B-Z.
 * 
 * @param letter The Android version letter (e.g. 'B', 'V', 'T')
 * @returns Numerical rank representing chronological order (higher is newer)
 */
function getAndroidLetterRank(letter: string): number {
  const upper = letter.toUpperCase();
  const knownRank = androidOrder[upper];
  if (knownRank !== undefined) {
    return knownRank;
  }
  // Dynamic fallback for B-Z (B starts at rank 4, C is 5, etc.) using ASCII char code
  const code = upper.charCodeAt(0);
  if (code >= 66 && code <= 90) { // 'B' (66) through 'Z' (90)
    return code - 66 + 4;
  }
  return 0;
}

function compareVersions(vAStr: string, vBStr: string): number {
  const partsA = vAStr.split('.');
  const partsB = vBStr.split('.');
  const maxLen = Math.max(partsA.length, partsB.length);

  for (let i = 0; i < maxLen; i++) {
    const partA = partsA[i] || '';
    const partB = partsB[i] || '';

    if (partA !== partB) {
      const numA = Number(partA);
      const numB = Number(partB);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numB - numA;
      }
      return partB.localeCompare(partA, undefined, { numeric: true, sensitivity: 'base' });
    }
  }
  return 0;
}

function compareChangelogs(idA: string, idB: string): number {
  const nameA = (idA.split('/').pop() || '').replace(/\.mdx?$/i, '');
  const nameB = (idB.split('/').pop() || '').replace(/\.mdx?$/i, '');

  const matchA = nameA.match(/-([a-z])([\d.a-z]+)-(\d{6})-(\d{4})$/i);
  const matchB = nameB.match(/-([a-z])([\d.a-z]+)-(\d{6})-(\d{4})$/i);

  if (matchA && matchB) {
    const rankA = getAndroidLetterRank(matchA[1]);
    const rankB = getAndroidLetterRank(matchB[1]);
    if (rankA !== rankB) {
      return rankB - rankA;
    }

    const versionCompare = compareVersions(matchA[2], matchB[2]);
    if (versionCompare !== 0) {
      return versionCompare;
    }

    const dateA = matchA[3];
    const dateB = matchB[3];
    if (dateA !== dateB) {
      return dateB.localeCompare(dateA);
    }

    const timeA = matchA[4];
    const timeB = matchB[4];
    if (timeA !== timeB) {
      return timeB.localeCompare(timeA);
    }
  }

  return nameB.localeCompare(nameA);
}

const devicesMetadata: any[] = require('./src/data/devices-metadata.json');

const codenameMap = new Map<string, any>();
devicesMetadata.forEach((device: any) => {
  device.codenames.forEach((codename: string) => {
    codenameMap.set(codename.toLowerCase(), device);
  });
});

function getCodenameFromCategory(category: any): string | null {
  if (!category.items || !Array.isArray(category.items)) return null;
  const docItem = category.items.find(
    (item: any) => item.type === 'doc' && item.id.startsWith('changelogs/')
  );
  if (!docItem) return null;
  const parts = docItem.id.split('/');
  if (parts.length >= 2) {
    return parts[1].toLowerCase();
  }
  return null;
}

function getDeviceSeriesRank(series: string): number {
  switch (series) {
    case 'number': return 1;
    case 'a': return 2;
    case 'b': return 3;
    default: return 4;
  }
}

function compareDeviceCategories(a: any, b: any): number {
  const codenameA = getCodenameFromCategory(a);
  const codenameB = getCodenameFromCategory(b);

  const devA = codenameA ? codenameMap.get(codenameA) : null;
  const devB = codenameB ? codenameMap.get(codenameB) : null;

  if (!devA || !devB) {
    if (!devA && !devB) {
      return a.label.localeCompare(b.label);
    }
    return devA ? -1 : 1;
  }

  // 1. Brand: Nothing before CMF
  if (devA.brand !== devB.brand) {
    return devA.brand === 'Nothing' ? -1 : 1;
  }

  if (devA.brand === 'Nothing') {
    // 2. Series: number < a < b
    const rankA = getDeviceSeriesRank(devA.series);
    const rankB = getDeviceSeriesRank(devB.series);
    if (rankA !== rankB) {
      return rankA - rankB;
    }
  }

  // 3. Timestamp (latest first)
  if (devA.timestamp !== devB.timestamp) {
    return devB.timestamp - devA.timestamp;
  }

  // 4. Pro/Plus first
  const isProA = devA.name.toLowerCase().includes('pro') || devA.name.toLowerCase().includes('plus') || (codenameA && codenameA.includes('pro'));
  const isProB = devB.name.toLowerCase().includes('pro') || devB.name.toLowerCase().includes('plus') || (codenameB && codenameB.includes('pro'));
  if (isProA !== isProB) {
    return isProA ? -1 : 1;
  }

  return devA.name.localeCompare(devB.name);
}

function sortChangelogItems(items: any[]): any[] {
  return items
    .filter((item) => !(item.type === 'doc' && item.id === 'changelogs/index'))
    .map((item) => {
      if (item.type === 'category') {
        let sortedSubItems = sortChangelogItems(item.items);
        const isChangelogCategory = sortedSubItems.some(
          (subItem) => subItem.type === 'doc' && subItem.id.startsWith('changelogs/')
        );

        if (isChangelogCategory) {
          sortedSubItems.sort((a, b) => {
            if (a.type !== 'doc' || b.type !== 'doc') {
              if (a.type === 'doc' && b.type !== 'doc') return -1;
              if (a.type !== 'doc' && b.type === 'doc') return 1;
              return 0;
            }
            return compareChangelogs(a.id, b.id);
          });
        }

        if (item.label === 'OTA Changelogs') {
          const numberItems: any[] = [];
          const aItems: any[] = [];
          const bItems: any[] = [];
          const cmfItems: any[] = [];
          const unknownItems: any[] = [];

          sortedSubItems.forEach((subItem) => {
            const codename = getCodenameFromCategory(subItem);
            const dev = codename ? codenameMap.get(codename) : null;
            if (!dev) {
              unknownItems.push(subItem);
              return;
            }

            if (dev.brand === 'CMF') {
              cmfItems.push(subItem);
            } else if (dev.series === 'number') {
              numberItems.push(subItem);
            } else if (dev.series === 'a') {
              aItems.push(subItem);
            } else if (dev.series === 'b') {
              bItems.push(subItem);
            } else {
              unknownItems.push(subItem);
            }
          });

          // Sort each group internally
          numberItems.sort(compareDeviceCategories);
          aItems.sort(compareDeviceCategories);
          bItems.sort(compareDeviceCategories);
          cmfItems.sort(compareDeviceCategories);
          unknownItems.sort(compareDeviceCategories);

          const newSubItems: any[] = [];

          if (numberItems.length > 0) {
            newSubItems.push({
              type: 'category',
              label: 'Nothing (Number Series)',
              collapsible: true,
              collapsed: false,
              items: numberItems,
            });
          }
          if (aItems.length > 0) {
            newSubItems.push({
              type: 'category',
              label: 'Nothing (A Series)',
              collapsible: true,
              collapsed: false,
              items: aItems,
            });
          }
          if (bItems.length > 0) {
            newSubItems.push({
              type: 'category',
              label: 'Nothing (B / Lite Series)',
              collapsible: true,
              collapsed: false,
              items: bItems,
            });
          }
          if (cmfItems.length > 0) {
            newSubItems.push({
              type: 'category',
              label: 'CMF Series',
              collapsible: true,
              collapsed: false,
              items: cmfItems,
            });
          }
          newSubItems.push(...unknownItems);

          sortedSubItems = newSubItems;
        }

        let link = item.link;
        if (isChangelogCategory && sortedSubItems.length > 0 && sortedSubItems[0].type === 'doc') {
          link = {
            type: 'doc',
            id: sortedSubItems[0].id,
          };
        }

        // Dynamically override label for device subcategories using devices-metadata
        let label = item.label;
        if (isChangelogCategory) {
          const codename = getCodenameFromCategory({ items: sortedSubItems });
          const dev = codename ? codenameMap.get(codename) : null;
          if (dev) {
            label = dev.name;
          }
        }

        // Clean label if it didn't get overridden
        if (label === item.label) {
          label = label.replace(/^Nothing Phone /i, 'Phone ');
        }

        return {
          ...item,
          label,
          link,
          items: sortedSubItems,
        };
      }
      return item;
    });
}


const config: Config = {
  title: 'Nothing Archive',
  tagline: 'A curated hub for everything related to the Nothing ecosystem.',
  favicon: 'favicon.ico',

  future: {
    v4: true,
    experimental_faster: true,
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
    locales: ['en'],
  },

  plugins: [
    () => ({
      name: 'changelogs-plugin',
      async contentLoaded({ actions }) {
        const { setGlobalData } = actions;
        const fs = require('fs');
        const path = require('path');
        const re = /-([a-zA-Z])([\d.]+)-(\d{6})-(\d{4})$/;

        const changelogsDir = path.join(__dirname, 'docs', 'changelogs');
        const latestLinks = {};
        
        if (fs.existsSync(changelogsDir)) {
          const folders = fs.readdirSync(changelogsDir);
          for (const folder of folders) {
            const folderPath = path.join(changelogsDir, folder);
            if (fs.statSync(folderPath).isDirectory()) {
              const files = fs.readdirSync(folderPath).filter(
                (f) => f.endsWith('.md') && f !== '_category_.json'
              );
              
              if (files.length > 0) {
                files.sort((a, b) => {
                  const nameA = a.replace(/\.md$/, '');
                  const nameB = b.replace(/\.md$/, '');
                  const matchA = nameA.match(re);
                  const matchB = nameB.match(re);
                  if (matchA && matchB) {
                    // Build date (YYMMDD+HHMM) is the definitive recency indicator
                    const stampA = matchA[3] + matchA[4];
                    const stampB = matchB[3] + matchB[4];
                    if (stampA !== stampB) {
                      return stampB.localeCompare(stampA);
                    }
                  }
                  return nameB.localeCompare(nameA);
                });
                
                const latestFile = files[0].replace(/\.md$/, '');
                const latestPath = `/docs/changelogs/${folder}/${latestFile}`;
                latestLinks[folder] = latestPath;

                // Create a dynamic route for the category folder that redirects to the latest changelog
                // Must include baseUrl /nothing_archive for both the route path and redirect target
                const redirectData = await actions.createData(
                  `redirect-${folder}.json`,
                  JSON.stringify({ to: `/nothing_archive/docs/changelogs/${folder}/${latestFile}` })
                );

                actions.addRoute({
                  path: `/nothing_archive/docs/changelogs/${folder}`,
                  component: '@site/src/components/RedirectToLatest.tsx',
                  exact: true,
                  modules: {
                    data: redirectData,
                  },
                });
              }
            }
          }
        }
        
        setGlobalData({ latestLinks });
      }
    })
  ],

  themes: [
    [
      // Local offline search provider
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        fuzzyMatchingDistance: 0,
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
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return sortChangelogItems(sidebarItems);
          },
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
        rel: 'manifest',
        href: '/nothing_archive/manifest.json',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#080808',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/nothing_archive/img/logo_dark.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/nothing_archive/img/logo_dark.png',
      },
    },
    // Preload Largest Contentful Paint (LCP) hero graphics for both themes
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'image',
        href: '/nothing_archive/img/logo_dark.gif',
        fetchpriority: 'high',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'image',
        href: '/nothing_archive/img/logo_light.gif',
        fetchpriority: 'high',
      },
    },
    // Preconnect directives for external font domains to reduce latency
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://rsms.me/',
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
    // Typography stylesheet loaded asynchronously to prevent render-blocking
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter.css',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
      },
    },
  ],

  themeConfig: {
    image: 'img/banner-v2.png',
    metadata: [
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Nothing Archive' },
      { property: 'og:image', content: 'https://spike0en.github.io/nothing_archive/img/banner-v2.png' },
      { property: 'og:image:width', content: '2160' },
      { property: 'og:image:height', content: '1080' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:alt', content: 'Nothing Archive — Nothing OS Firmware & Community Resources' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'https://spike0en.github.io/nothing_archive/img/banner-v2.png' },
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
        src: 'img/logo_light.gif',
        srcDark: 'img/logo_dark.gif',
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
          type: 'custom-PwaInstallButton',
          position: 'right',
        },
        {
          to: '/docs/intro',
          position: 'left',
          label: 'About',
          activeBaseRegex: 'docs/(intro|mentions|contributing|acknowledgements|licensing)',
        },
        {
          to: '/docs/devices',
          position: 'left',
          label: 'Resources',
          activeBaseRegex: 'docs/(devices|firmware|changelogs|guides|official|apps|projects|photography)',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `<div class="footer-custom"><div class="footer-links"><a href="/nothing_archive/docs/contributing">Contributing</a><span class="separator">•</span><a href="/nothing_archive/docs/licensing">License</a><span class="separator">•</span><a href="/nothing_archive/docs/acknowledgements">Credits</a></div><div class="footer-info"><span>© 2026 NOTHING ARCHIVE</span><span class="info-dot">•</span><span>A community initiative led by <a href="https://github.com/spike0en" target="_blank" rel="noopener noreferrer" class="credit-link">Spike</a></span></div><div class="footer-disclaimer">Not affiliated with Nothing Technology Limited</div></div>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

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

function getVariantRank(name: string): number {
  const lower = name.toLowerCase();
  if (lower.includes('pro plus') || lower.includes('pro+')) return 1;
  if (lower.includes('pro')) return 2;
  if (lower.includes('plus')) return 3;
  return 4;
}

const devicesMetadata: any[] = require('./src/data/devices-metadata.json');

const codenameMap = new Map<string, any>();
devicesMetadata.forEach((device: any) => {
  codenameMap.set(device.codename.toLowerCase(), device);
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
  const rankVarA = getVariantRank(devA.name);
  const rankVarB = getVariantRank(devB.name);
  if (rankVarA !== rankVarB) {
    return rankVarA - rankVarB;
  }

  return devA.name.localeCompare(devB.name);
}

function groupAndSortChangelogSidebar(items: any[]): any[] {
  const cleanItems = items.filter((item) => !(item.type === 'doc' && item.id === 'changelogs/index'));

  const numberItems: any[] = [];
  const aItems: any[] = [];
  const bItems: any[] = [];
  const cmfItems: any[] = [];
  const unknownItems: any[] = [];

  cleanItems.forEach((item) => {
    if (item.type !== 'category') {
      unknownItems.push(item);
      return;
    }

    // Sort internal document items in descending order of build version/date
    const sortedSubItems = [...item.items].sort((a: any, b: any) => {
      if (a.type !== 'doc' || b.type !== 'doc') {
        if (a.type === 'doc' && b.type !== 'doc') return -1;
        if (a.type !== 'doc' && b.type === 'doc') return 1;
        return 0;
      }
      return compareChangelogs(a.id, b.id);
    });

    let link = item.link;
    if (sortedSubItems.length > 0 && sortedSubItems[0].type === 'doc') {
      link = {
        type: 'doc',
        id: sortedSubItems[0].id,
      };
    }

    const codename = getCodenameFromCategory({ items: sortedSubItems });
    const matchingDevices = devicesMetadata.filter((device: any) => {
      const folderForDevice = device.folder || device.codename;
      return folderForDevice.toLowerCase() === (codename || '').toLowerCase();
    });
    const dev = matchingDevices.length > 0 ? matchingDevices[0] : null;
    let label = item.label;
    let series = 'unknown';
    let brand = 'Nothing';

    if (matchingDevices.length > 1) {
      const cleanNames = matchingDevices.map((d: any) => d.name.split(' (')[0]);
      cleanNames.sort();
      const joinedNames = cleanNames.join(' / ').replace(/\/ Phone \(/g, '/ (');
      
      const cleanCodenames = matchingDevices.map((d: any) => {
        const parts = d.name.match(/\(([^)]+)\)$/);
        return parts ? parts[1] : d.codename;
      });
      cleanCodenames.sort();
      let joinedCodenames = cleanCodenames.join(' / ');
      if (cleanCodenames.includes('Asteroids') && cleanCodenames.includes('AsteroidsPro')) {
        joinedCodenames = 'Asteroids(Pro)';
      }
      
      label = `${joinedNames} (${joinedCodenames})`;
      series = matchingDevices[0].series;
      brand = matchingDevices[0].brand;
    } else if (dev) {
      label = dev.name;
      series = dev.series;
      brand = dev.brand;
    } else {
      label = label.replace(/^Nothing Phone /i, 'Phone ');
    }

    const processedCategory = {
      ...item,
      label,
      link,
      items: sortedSubItems,
    };

    if (!dev) {
      unknownItems.push(processedCategory);
    } else if (brand === 'CMF') {
      cmfItems.push(processedCategory);
    } else if (series === 'number') {
      numberItems.push(processedCategory);
    } else if (series === 'a') {
      aItems.push(processedCategory);
    } else if (series === 'b') {
      bItems.push(processedCategory);
    } else {
      unknownItems.push(processedCategory);
    }
  });

  // Sort each category group internally
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
      label: 'CMF by Nothing',
      collapsible: true,
      collapsed: false,
      items: cmfItems,
    });
  }
  newSubItems.push(...unknownItems);

  return newSubItems;
}


const siteUrl = process.env.SITE_URL || (process.env.GITHUB_ACTIONS === 'true' ? 'https://nothingarchive.tech' : 'http://localhost:3000');
const baseUrl = process.env.BASE_URL || '/';

const config: Config = {
  title: 'Nothing Archive',
  tagline: 'A curated hub for everything related to the Nothing ecosystem.',
  favicon: 'img/brand/favicon.ico',

  future: {
    v4: true,
    experimental_faster: true,
  },

  url: siteUrl,
  baseUrl: baseUrl,
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
        const changelogLinks: Record<string, string> = {};
        
        if (fs.existsSync(changelogsDir)) {
          const folders = fs.readdirSync(changelogsDir);
          for (const folder of folders) {
            const folderPath = path.join(changelogsDir, folder);
            if (fs.statSync(folderPath).isDirectory()) {
              const files = fs.readdirSync(folderPath).filter(
                (f) => f.endsWith('.md') && f !== '_category_.json'
              );

              for (const file of files) {
                const filename = file.replace(/\.md$/, '');
                changelogLinks[filename.toLowerCase()] = `${baseUrl}docs/changelogs/${folder}/${filename}`;
              }
              
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

                // Handle virtual codenames mapped to this physical folder
                const mappedCodenames = devicesMetadata
                  .filter((d: any) => d.folder && d.folder.toLowerCase() === folder.toLowerCase() && d.codename.toLowerCase() !== folder.toLowerCase())
                  .map((d: any) => d.codename.toLowerCase());
                
                for (const codename of mappedCodenames) {
                  latestLinks[codename] = latestPath;
                }

                // Create a dynamic route for the category folder that redirects to the latest changelog
                // Must include baseUrl for both the route path and redirect target
                const redirectData = await actions.createData(
                  `redirect-${folder}.json`,
                  JSON.stringify({ to: `${baseUrl}docs/changelogs/${folder}/${latestFile}` })
                );

                actions.addRoute({
                  path: `${baseUrl}docs/changelogs/${folder}`,
                  component: '@site/src/components/RedirectToLatest.tsx',
                  exact: true,
                  modules: {
                    data: redirectData,
                  },
                });

                // Add redirect routes for the virtual codenames too
                for (const codename of mappedCodenames) {
                  const redirectDataVirt = await actions.createData(
                    `redirect-${codename}.json`,
                    JSON.stringify({ to: `${baseUrl}docs/changelogs/${folder}/${latestFile}` })
                  );
                  actions.addRoute({
                    path: `${baseUrl}docs/changelogs/${codename}`,
                    component: '@site/src/components/RedirectToLatest.tsx',
                    exact: true,
                    modules: {
                      data: redirectDataVirt,
                    },
                  });
                }
              }
            }
          }
        }
        
        setGlobalData({ latestLinks, changelogLinks });
      }
    }),
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: `${baseUrl}img/brand/icon-512.png`,
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: `${baseUrl}manifest.json`,
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#080808',
          },
        ],
      },
    ],
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
            if (args.item.dirName === 'changelogs') {
              return groupAndSortChangelogSidebar(sidebarItems);
            }
            return sidebarItems;
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
              if (item.url.includes('/docs/intro') || item.url.endsWith(baseUrl)) {
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
        href: `${baseUrl}img/brand/favicon.ico`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: `${baseUrl}manifest.json`,
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
        sizes: '192x192',
        href: `${baseUrl}img/brand/icon-192.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: `${baseUrl}img/brand/icon-512.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: `${baseUrl}img/brand/apple-touch-icon.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: `${baseUrl}fonts/InterVariable.woff2`,
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'style',
      attributes: {},
      innerHTML: `
        @font-face {
          font-family: 'Inter var';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url('${baseUrl}fonts/InterVariable.woff2') format('woff2');
        }
      `,
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
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
      },
    },
  ],

  themeConfig: {
    image: 'img/brand/social-banner.png',
    metadata: [
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Nothing Archive' },
      { property: 'og:image', content: `${siteUrl}${baseUrl}img/brand/social-banner.png` },
      { property: 'og:image:width', content: '2160' },
      { property: 'og:image:height', content: '1080' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:alt', content: 'Nothing Archive — Nothing OS Firmware & Community Resources' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: `${siteUrl}${baseUrl}img/brand/social-banner.png` },
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
        src: 'img/brand/logo-light-nav.webp',
        srcDark: 'img/brand/logo-dark-nav.webp',
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
          type: 'custom-SupportButton',
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
      copyright: `<div class="footer-custom"><div class="footer-links"><a href="${baseUrl}docs/contributing">Contributing</a><span class="separator">•</span><a href="${baseUrl}docs/licensing">License</a><span class="separator">•</span><a href="${baseUrl}docs/acknowledgements">Credits</a></div><div class="footer-info"><span>© 2026 NOTHING ARCHIVE</span><span class="info-dot">•</span><span>A community initiative led by <a href="https://github.com/spike0en" target="_blank" rel="noopener noreferrer" class="credit-link">Spike</a></span></div><div class="footer-disclaimer">Not affiliated with Nothing Technology Limited</div></div>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

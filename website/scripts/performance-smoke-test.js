/**
 * @file performance-smoke-test.js
 * @description Pre-release smoke test script verifying critical performance optimizations,
 * asset existence, responsive image attributes, and bundle configuration.
 *
 * Layer: Build and verification scripts.
 * Boundary: Reads local files and executes Node assertions.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const siteRoot = path.resolve(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(siteRoot, ...parts), 'utf8');
const readRepositoryFile = (...parts) => fs.readFileSync(path.join(siteRoot, '..', ...parts), 'utf8');
const assetExists = (...parts) => fs.existsSync(path.join(siteRoot, ...parts));

assert(assetExists('static', 'img', 'brand', 'logo-dark-hero.webp'));
assert(assetExists('static', 'img', 'brand', 'logo-dark-hero-256.webp'));
assert(assetExists('static', 'img', 'brand', 'logo-dark-hero-384.webp'));
assert(assetExists('static', 'img', 'brand', 'logo-dark-nav.webp'));
assert(assetExists('static', 'img', 'brand', 'logo-light-nav.webp'));
assert(assetExists('static', 'fonts', 'InterVariable.woff2'));

const config = read('docusaurus.config.ts');
assert(!config.includes('https://rsms.me/inter/inter.css'));
assert(!config.includes('https://nowpayments.io'));
assert(!config.includes('logo-dark.gif'));
assert(!config.includes('logo-light.gif'));
assert(config.includes('changelogLinks'));
assert(config.includes('`${baseUrl}fonts/InterVariable.woff2`'));
assert(config.includes("src: url('${baseUrl}fonts/InterVariable.woff2')"));
assert(config.includes("appId: 'LIS46M13N2'"));
assert(config.includes("indexName: 'Nothing Archive crawl'"));
assert(config.includes('contextualSearch: true'));
assert(config.includes("searchPagePath: 'search'"));
assert(config.includes('insights: false'));
assert(!config.includes('@easyops-cn/docusaurus-search-local'));
assert(config.includes("'@docusaurus/theme-mermaid'"));
assert(config.includes("light: 'neutral'"));
assert(config.includes("dark: 'dark'"));
assert(config.includes("name: 'algolia-site-verification'"));
assert(config.includes("'@type': 'WebSite'"));
assert(config.includes("lastmod: 'date'"));

const packageJson = JSON.parse(read('package.json'));
assert.equal(packageJson.packageManager, 'bun@1.3.14');
assert.equal(packageJson.dependencies['@docusaurus/theme-mermaid'], '3.10.2');
assert.equal(packageJson.dependencies['@easyops-cn/docusaurus-search-local'], undefined);
// Verify test:performance command supports execution via node or bun for cross-environment compatibility
assert(packageJson.scripts['test:performance'].startsWith('node ') || packageJson.scripts['test:performance'].startsWith('bun '));

const workflow = readRepositoryFile('.github', 'workflows', 'deploy.yml');
assert(workflow.includes('oven-sh/setup-bun@v2'));
assert(workflow.includes("bun-version: '1.3.14'"));
assert(workflow.includes('bun install --frozen-lockfile'));
assert(workflow.includes('bun run test:performance'));
assert(!workflow.includes('package-lock'));

const firmware = read('docs', 'firmware.md');
const guides = read('docs', 'guides.md');
assert(!firmware.includes('```mermaid'));
assert(!guides.includes('```mermaid'));

const hero = read('src', 'components', 'HeroGlyphLogo.tsx');
assert(hero.includes('logo-dark-hero.webp'));
assert(hero.includes('logo-dark-hero-256.webp'));
assert(hero.includes('logo-dark-hero-384.webp'));
assert(hero.includes('srcSet='));
assert(hero.includes('sizes="(max-width: 576px) 146px, (max-width: 996px) 164px, 184px"'));
assert(hero.includes('fetchPriority="high"'));

const homepage = read('src', 'pages', 'index.tsx');
const pointerMoveStart = homepage.indexOf('const handlePointerMove');
const pointerMoveEnd = homepage.indexOf("header.addEventListener('pointermove'", pointerMoveStart);
assert(pointerMoveStart >= 0 && pointerMoveEnd > pointerMoveStart);
assert(homepage.includes('const updateHeaderRect = () =>'));
assert(!homepage.slice(pointerMoveStart, pointerMoveEnd).includes('getBoundingClientRect'));

const customCss = read('src', 'css', 'custom.css');
assert(!customCss.includes('InterVariable.woff2'));
assert(customCss.includes('.DocSearch-Button'));
assert(customCss.includes('.DocSearch-Modal'));
assert(!customCss.includes('navbar__search-input'));
assert(!customCss.includes('details:not([open]):has(+ details:not([open]))'));
assert(!customCss.includes('details:not([open]) + details:not([open])'));

const releaseFeed = read('src', 'components', 'ReleaseFeed.tsx');
const announcement = read('src', 'components', 'AnnouncementBanner.tsx');
assert(!releaseFeed.includes('require.context('));
assert(!announcement.includes('require.context('));
assert(releaseFeed.includes('styles.releaseLink'));

const githubCache = read('src', 'utils', 'github-cache.ts');
assert(!githubCache.includes('const [status, setStatus] = useState<DataStatus>(() =>'));
assert(!githubCache.includes('const [loading, setLoading] = useState(() =>'));

const supportModal = read('src', 'components', 'SupportModal.tsx');
assert(supportModal.includes('const [loadPaymentWidget, setLoadPaymentWidget] = useState(false);'));
assert(supportModal.includes('{loadPaymentWidget && iframeLoading && ('));
assert(supportModal.includes('onClick={() => setLoadPaymentWidget(true)}'));

const manifest = JSON.parse(read('static', 'manifest.json'));
assert.equal(manifest.start_url, '.');
assert.equal(manifest.scope, '.');
assert(manifest.icons.every((icon) => !icon.src.startsWith('/')));

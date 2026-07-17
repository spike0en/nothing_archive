const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const siteRoot = path.resolve(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(siteRoot, ...parts), 'utf8');
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

const releaseFeed = read('src', 'components', 'ReleaseFeed.tsx');
const announcement = read('src', 'components', 'AnnouncementBanner.tsx');
assert(!releaseFeed.includes('require.context('));
assert(!announcement.includes('require.context('));
assert(releaseFeed.includes('styles.releaseLink'));

const githubCache = read('src', 'utils', 'github-cache.ts');
assert(!githubCache.includes('const [status, setStatus] = useState<DataStatus>(() =>'));
assert(!githubCache.includes('const [loading, setLoading] = useState(() =>'));

const manifest = JSON.parse(read('static', 'manifest.json'));
assert.equal(manifest.start_url, '.');
assert.equal(manifest.scope, '.');
assert(manifest.icons.every((icon) => !icon.src.startsWith('/')));

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const build = path.join(__dirname, '..', 'build');
const read = (file) => fs.readFileSync(path.join(build, file), 'utf8');
const sitemap = read('sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
assert(urls.length > 0);
assert.equal(new Set(urls.map((url) => url.href)).size, urls.length, 'Duplicate sitemap URLs');
const basePath = new URL(read('index.html').match(/<link\b[^>]*\brel=["']?canonical["']?[^>]*\bhref=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i).slice(1).find(Boolean)).pathname;
for (const url of urls) {
  assert(!/\/docs\/changelogs\/[^/]+\/?$/.test(url.pathname), `Redirect helper in sitemap: ${url}`);
  assert(!url.pathname.endsWith('/search'), 'Search page in sitemap');
  assert(url.pathname.startsWith(basePath), `URL outside site base: ${url}`);
  const relative = url.pathname.slice(basePath.length).replace(/\/$/, '');
  const file = relative ? `${relative}.html` : 'index.html';
  assert(fs.existsSync(path.join(build, file)), `Missing page: ${url}`);
}
const robots = (html) => [...html.matchAll(/<meta\b[^>]*>/gi)].filter(([tag]) =>
  /\bname=["']?robots(?:["'\s>])/i.test(tag)
).map(([tag]) => tag.match(/\bcontent=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i)?.slice(1).find(Boolean) || '').join(',');
assert(/\bnoindex\b/.test(robots(read('search.html'))), 'Search must have name="robots" noindex');
const helperDir = path.join(build, 'docs', 'changelogs');
const helpers = fs.readdirSync(helperDir).filter((file) => file.endsWith('.html'));
assert(helpers.length > 0);
for (const file of helpers) assert(/\bnoindex\b/.test(robots(read(`docs/changelogs/${file}`))), `Helper must be noindex: ${file}`);
for (const page of ['intro', 'devices', 'guides', 'firmware']) {
  assert(!/\bnoindex\b/.test(robots(read(`docs/${page}.html`))), `Content must stay indexable: ${page}`);
}
console.log(`SEO smoke passed: ${urls.length} sitemap URLs and ${helpers.length} latest-release helpers.`);

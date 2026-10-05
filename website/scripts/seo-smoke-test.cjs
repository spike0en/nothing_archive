/** Static SEO smoke checks for the final Docusaurus build. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const siteRoot = path.resolve(__dirname, '..');
const buildRoot = path.join(siteRoot, 'build');
const read = (file) => fs.readFileSync(file, 'utf8');
const decode = (value) => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/gi, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (value) => decode(value.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
assert(fs.existsSync(buildRoot), `Missing build output: ${buildRoot}`);
function attrs(tag) {
  return Object.fromEntries([...tag.matchAll(/\s([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)]
    .map((match) => [match[1].toLowerCase(), decode(match[2] ?? match[3] ?? match[4] ?? '')]));
}
function open(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => attrs(match[0]));
}
function blocks(html, name) {
  const pattern = new RegExp(`<${name}\\b([^>]*)>([\\s\\S]*?)<\\/${name}>`, 'gi');
  return [...html.matchAll(pattern)].map((match) => ({ attributes: attrs(`<${name}${match[1]}>`), text: text(match[2]) }));
}
function hrefs(html) {
  return open(html, 'a').map((attribute) => attribute.href).filter(Boolean);
}
function walk(directory, extension) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => { const file = path.join(directory, entry.name); return entry.isDirectory() ? walk(file, extension) : entry.name.endsWith(extension) ? [file] : []; });
}
function routeFor(file) {
  const relative = path.relative(buildRoot, file).split(path.sep).join('/');
  return relative === 'index.html' ? '/' : relative.endsWith('/index.html') ? `/${relative.slice(0, -11)}` : relative.endsWith('.html') ? `/${relative.slice(0, -5)}` : null;
}
const htmlFiles = walk(buildRoot, '.html');
function fileFor(route) {
  const normalized = route.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
  const relative = normalized.slice(1);
  const candidates = normalized.endsWith('.html') ? [path.join(buildRoot, relative)] : normalized === '/' ? [path.join(buildRoot, 'index.html')] : [path.join(buildRoot, `${relative}.html`), path.join(buildRoot, relative, 'index.html')];
  const file = candidates.find((candidate) => fs.existsSync(candidate)); assert(file, `No generated HTML for ${route}`); return file;
}
const meta = (html, name) => open(html, 'meta').find((attributes) => attributes.name?.toLowerCase() === name)?.content || '';
const canonical = (html) => open(html, 'link').find((attributes) => attributes.rel?.toLowerCase() === 'canonical')?.href || '';
function normalizedUrl(value, base) {
  const url = new URL(value, base); return `${url.origin}${url.pathname.replace(/\/+$/, '') || '/'}${url.search}${url.hash}`;
}
function parseBuild(name) {
  const match = name.match(/^([A-Za-z0-9]+)[_-]([A-Za-z])(\d+(?:\.\d+)*)-\d{6}-\d{4}$/); return match ? { codename: match[1].toLowerCase(), osVersion: match[3] } : null;
}
const slug = (name) => require('@docusaurus/utils').createSlugger().slug(name);
const devices = JSON.parse(read(path.join(siteRoot, 'src', 'data', 'devices-metadata.json')));
const devicesByCodename = new Map(devices.map((device) => [device.codename.toLowerCase(), device]));
const sourceChangelogs = [...walk(path.join(siteRoot, 'docs', 'changelogs'), '.md'), ...walk(path.join(siteRoot, 'docs', 'changelogs'), '.mdx')]
  .filter((file) => !/^index\.(?:md|mdx)$/i.test(path.basename(file)) && !path.basename(file).startsWith('_'));
const sourceRoutes = sourceChangelogs.map((file) => {
  const name = path.basename(file, path.extname(file));
  assert(parseBuild(name), `Unparsed changelog source filename: ${file}`);
  return `/docs/changelogs/${path.basename(path.dirname(file))}/${name}`;
});
const releasePages = htmlFiles
  .filter((file) => path.basename(file) !== 'index.html')
  .map((file) => ({ file, route: routeFor(file) }))
  .filter(({ route }) => {
    const parts = route?.split('/') || [];
    return parts.length === 5 && parts[1] === 'docs' && parts[2] === 'changelogs' && Boolean(parseBuild(parts[4]));
  });
assert.equal(new Set(releasePages.map(({ route }) => route)).size, sourceRoutes.length, 'Generated changelog count differs from source');
for (const route of sourceRoutes) assert(releasePages.some((page) => page.route === route), `Missing generated changelog ${route}`);
const assertNoindex = (route) => assert(/(?:^|[\s,])noindex(?:$|[\s,])/i.test(meta(read(fileFor(route)), 'robots')), `${route} must be noindex`);
function assertMetadata() {
  for (const { file, route } of releasePages) {
    const name = route.split('/').pop();
    const build = parseBuild(name);
    const device = devicesByCodename.get(build.codename);
    assert(device, `${route} has no device metadata for ${build.codename}`);
    const html = read(file);
    const title = text(blocks(html, 'title')[0]?.text || '').toLowerCase(); const description = meta(html, 'description').toLowerCase(); const headings = blocks(html, 'h1');
    const model = device.name.toLowerCase().replace(new RegExp(`\\s*\\(${device.codename}\\)$`, 'i'), '');
    const hasDevice = (value) => value.includes(device.name.toLowerCase()) || value.includes(model);
    const os = `nothing os ${build.osVersion}`;
    assert(hasDevice(title) && title.includes(os), `${route} title lacks device/OS context`);
    assert(hasDevice(description) && description.includes(os), `${route} description lacks device/OS context`);
    assert(headings.some(({ text: value }) => hasDevice(value.toLowerCase()) && value.toLowerCase().includes(os)), `${route} H1 lacks device/OS context`);
    assert(headings.some(({ attributes }) => attributes.id?.toLowerCase() === slug(name)), `${route} lost its build H1 anchor`);
  }
}
function assertLegacyAnchors() {
  for (const file of sourceChangelogs) {
    const heading = read(file).match(/^# (.+)$/m)?.[1]?.trim();
    if (!heading) continue;
    const route = `/docs/changelogs/${path.basename(path.dirname(file))}/${path.basename(file, path.extname(file))}`;
    const ids = open(read(fileFor(route)), '[a-zA-Z][\\w:-]*').map((attribute) => attribute.id);
    assert(ids.includes(slug(heading)), `${route} lost legacy heading #${slug(heading)}`);
  }
  for (const [route, anchors] of Object.entries({
    '/docs/official': ['cmf-phones', 'cmf-by-nothing-phones', 'audio', 'nothing-audio', 'watches', 'cmf-by-nothing-watches'],
    '/docs/contributing': ['contributing', 'contributing-to-nothing-archive', 'naming-conventions', '2-naming-conventions', '2-alphabetical-sorting', '3-alphabetical-sorting', 'how-to-submit-changes', 'how-to-contribute'],
    '/docs/projects': ['desktop--ide-themes', 'desktop-rices--application-themes'],
  })) {
    const ids = open(read(fileFor(route)), '[a-zA-Z][\\w:-]*').map((attribute) => attribute.id);
    for (const id of anchors) assert(ids.includes(id), `${route} lost #${id}`);
  }
}
function assertFirmwareLinksAndAnchors() {
  const firmware = read(fileFor('/docs/firmware'));
  const buildLinks = hrefs(firmware).map((href) => new URL(href, 'https://nothingarchive.test/docs/firmware'))
    .filter((url) => /^\/docs\/changelogs\/[^/]+\/[^/]+$/.test(url.pathname) && parseBuild(url.pathname.split('/').pop()));
  assert(buildLinks.length > 0, 'Firmware page has no matched changelog build links');
  for (const route of new Set(buildLinks.map((url) => url.pathname))) fileFor(route);
  const detailIds = new Set(open(firmware, 'details').map((attribute) => attribute.id?.toLowerCase()).filter(Boolean));
  assert(detailIds.size > 0, 'Firmware page has no device detail IDs');
  const sourcePages = ['/docs/devices', ...releasePages.map(({ route }) => route)];
  const detailLinks = sourcePages.flatMap((route) => hrefs(read(fileFor(route))).map((href) => new URL(href, `https://nothingarchive.test${route}`)))
    .filter((url) => url.pathname === '/docs/firmware' && url.hash);
  assert(detailLinks.length > 0, 'No device/changelog links target firmware detail anchors');
  for (const link of detailLinks) assert(detailIds.has(decodeURIComponent(link.hash.slice(1)).toLowerCase()), `Unresolved firmware detail ${link.hash}`);
}
function assertAliases() {
  const aliases = htmlFiles.filter((file) => routeFor(file) === '/docs' && path.basename(file) === 'index.html');
  assert.equal(aliases.length, 1, 'Only the docs landing alias should be generated');
  const alias = read(aliases[0]);
  assert(/(?:^|[\s,])noindex(?:$|[\s,])/i.test(meta(alias, 'robots')), 'Docs landing alias must be noindex');
  const target = decode(alias.match(/url=([^;"'\s>]+)/i)?.[1] || alias.match(/var target\s*=\s*["']([^"']+)/i)?.[1] || '');
  const canonicalHref = canonical(alias);
  assert(target && canonicalHref, 'Docs landing alias must have target and canonical');
  const targetUrl = new URL(target, canonicalHref);
  assert.equal(normalizedUrl(canonicalHref, canonicalHref), normalizedUrl(targetUrl.href, canonicalHref), 'Docs alias canonical/target mismatch');
  assert.equal(targetUrl.pathname, '/docs/intro', 'Docs landing alias must target intro');
  fileFor(targetUrl.pathname);
  const helperRoutes = new Set([...new Set([...devices.map((device) => device.folder.toLowerCase()), ...devices.map((device) => device.codename.toLowerCase())])].map((id) => `/docs/changelogs/${id}`));
  for (const file of htmlFiles.filter((candidate) => !candidate.endsWith('/index.html') && routeFor(candidate) !== '/search' && routeFor(candidate) !== '/404' && !helperRoutes.has(routeFor(candidate)))) {
    const html = read(file);
    assert(!/window\.location\.replace|http-equiv=["']?refresh/i.test(html), `Canonical content redirects unexpectedly: ${file}`);
    assert(!/(?:^|[\s,])noindex(?:$|[\s,])/i.test(meta(html, 'robots')), `Canonical content is noindex: ${file}`);
  }
}
function assertFonts() {
  const html = read(fileFor('/'));
  const fontPreloads = open(html, 'link').filter((attribute) => attribute.rel?.toLowerCase() === 'preload' && attribute.as?.toLowerCase() === 'font').map((attribute) => attribute.href || '');
  assert(fontPreloads.some((href) => /fonts\/Geist-Variable\.woff2/.test(href)), 'Geist font preload missing');
  assert(fontPreloads.some((href) => /fonts\/NType82-Headline\.woff2/.test(href)), 'NType headline font preload missing');
  assert(fontPreloads.every((href) => /fonts\/(?:Geist-Variable|NType82-Headline)\.woff2/.test(href)), 'Unexpected font preload');
  assert(!/JetBrains(?:\+|\s)Mono|fonts\.googleapis\.com[^"']*JetBrains/i.test(html), 'External JetBrains stylesheet remains');
  for (const font of ['Geist-Variable', 'GeistMono-Variable', 'NType82-Headline', 'NType82-Regular', 'NType82Mono-Regular', 'LetteraMono-LL']) {
    assert(html.includes('@font-face') && html.includes(`fonts/${font}.woff2`), `Local ${font} face missing`);
  }
  assert(!fontPreloads.some((href) => /fonts\/InterVariable\.woff2|fonts\/GeistMono-Variable\.woff2/.test(href)), 'Removed font is still preloaded');
}
function assertSitemap() {
  const sitemap = read(path.join(buildRoot, 'sitemap.xml'));
  const locations = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decode(match[1].trim()));
  assert(locations.length > 0, 'sitemap.xml contains no URLs');
  assert.equal(new Set(locations).size, locations.length, 'sitemap.xml contains duplicate URLs');
  const paths = new Set();
  for (const location of locations) {
    const url = new URL(location);
    assert.equal(url.search, '', `Sitemap query URL: ${location}`);
    assert.equal(url.hash, '', `Sitemap fragment URL: ${location}`);
    paths.add(url.pathname.replace(/\/+$/, '') || '/');
    const html = read(fileFor(url.pathname));
    assert(canonical(html), `Sitemap URL has no canonical: ${location}`);
    assert.equal(normalizedUrl(canonical(html), location), normalizedUrl(location, location), `Not self-canonical: ${location}`);
  }
  assert(!paths.has('/search') && !paths.has('/404') && !paths.has('/404.html'), 'Search/404 must be absent from sitemap');
  const physical = new Set(devices.map((device) => device.folder.toLowerCase()));
  const helpers = [...new Set([...physical, ...devices.map((device) => device.codename.toLowerCase())])].map((id) => `/docs/changelogs/${id}`);
  assert.equal(helpers.length, physical.size + devices.filter((device) => !physical.has(device.codename.toLowerCase())).length);
  for (const route of helpers) {
    assertNoindex(route);
    assert(!paths.has(route), `Redirect helper in sitemap: ${route}`);
  }
  return locations.length;
}
assertNoindex('/search'); assertNoindex('/404.html'); const sitemapCount = assertSitemap();
assertMetadata(); assertLegacyAnchors(); assertFirmwareLinksAndAnchors();
assertAliases();
assertFonts();
console.log(`SEO smoke passed: ${sitemapCount} sitemap URLs, ${sourceRoutes.length} changelog pages, generated aliases and firmware links verified.`);

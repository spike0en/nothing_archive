const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { enrichDoc } = require('./enrich-docs.cjs');

const docsDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nothing-enrich-docs-'));
const changelogDir = path.join(docsDir, 'changelogs', 'asteroids');
fs.mkdirSync(changelogDir, { recursive: true });
fs.writeFileSync(path.join(changelogDir, 'Asteroids-B4.1-260414-1749.md'), '# source\n');

const devices = [
  { name: 'Phone (3a) Pro (AsteroidsPro)', codename: 'asteroidspro', folder: 'asteroids', brand: 'Nothing' },
  { name: 'Phone (3a) (Asteroids)', codename: 'asteroids', folder: 'asteroids', brand: 'Nothing' },
];

const changelogPath = path.join(docsDir, 'changelogs', 'asteroids', 'Asteroids-B4.1-260414-1749.md');
const first = enrichDoc({
  filePath: changelogPath,
  content: '# Asteroids-B4.1-260414-1749\n\n## Update changelogs\n',
  frontMatter: { sidebar_position: 2 },
}, { docsDir, devices });

assert.match(first.frontMatter.title, /^Nothing OS 4\.1 for Nothing Phone \(3a\)/);
assert.strictEqual(first.frontMatter.sidebar_label, 'Asteroids-B4.1-260414-1749');
assert.match(first.frontMatter.description, /release notes/);
assert.match(first.content, /# Nothing OS 4\.1 for Nothing Phone \(3a\) \/ Phone \(3a\) Pro/);
assert.match(first.content, /\{\/\* #asteroids-b41-260414-1749 \*\/\}/);
assert.match(first.content, /\/docs\/firmware#asteroids/);
assert.match(first.content, /\/docs\/devices/);
assert.match(first.content, /\/docs\/guides#ota-sideloading/);
assert.strictEqual(
  enrichDoc({ ...first, filePath: changelogPath }, { docsDir, devices }).content,
  first.content,
  'changelog enrichment is idempotent'
);

const legacy = enrichDoc({
  filePath: changelogPath,
  content: '# Asteroids-B4.1-260414-1749 (Nothing OS 4.1)\n\n## Update changelogs\n',
  frontMatter: {},
}, { docsDir, devices });
assert.match(legacy.content, /<span id="asteroids-b41-260414-1749-nothing-os-41"/);
assert.match(legacy.content, /\{\/\* #asteroids-b41-260414-1749 \*\/\}/);
assert.strictEqual(enrichDoc({ ...legacy, filePath: changelogPath }, { docsDir, devices }).content, legacy.content);

const firmware = enrichDoc({
  filePath: path.join(docsDir, 'firmware.md'),
  content: '<details>\n  <summary><span class="summary-title">Phone (3a)</span><span class="summary-subtitle">Asteroids</span></summary>\n\n| OS | Build Number | OTA |\n|---|---|---|\n| 4.1 | Asteroids-B4.1-260414-1749 | N/A |\n| 4.1 | Asteroids-B4.1-260999-0000 | N/A |\n\n</details>\n',
  frontMatter: {},
}, { docsDir, devices });

assert.match(firmware.content, /<details id="asteroids">/);
assert.match(firmware.content, /\[Asteroids-B4\.1-260414-1749\]\(\.\/changelogs\/asteroids\/Asteroids-B4\.1-260414-1749\.md\)/);
assert.match(firmware.content, /\| 4\.1 \| Asteroids-B4\.1-260999-0000 \|/);
assert.strictEqual(
  enrichDoc({ ...firmware, filePath: path.join(docsDir, 'firmware.md') }, { docsDir, devices }).content,
  firmware.content,
  'firmware enrichment is idempotent'
);

const index = enrichDoc({
  filePath: path.join(docsDir, 'changelogs', 'index.md'),
  content: '# Nothing OS Updates & Changelogs {#updates}\n',
  frontMatter: { pagination_next: 'guides' },
}, { docsDir, devices });
assert.strictEqual(index.frontMatter.title, 'Nothing OS Update Changelogs');
assert.strictEqual(index.frontMatter.sidebar_label, 'Changelogs');
assert.match(index.frontMatter.description, /Nothing and CMF/);
assert.strictEqual(index.content, '# Nothing OS Updates & Changelogs {#updates}\n');

fs.rmSync(docsDir, { recursive: true, force: true });
console.log('enrich-docs: ok');

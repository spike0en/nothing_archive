'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const plugin = require('./canonical-redirects.cjs');

function writeFile(root, relative, contents) {
  const filePath = path.join(root, relative);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, 'utf8');
}

async function main() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'canonical-redirects-'));
  const collision = fs.mkdtempSync(path.join(os.tmpdir(), 'canonical-redirects-'));
  const subpath = fs.mkdtempSync(path.join(os.tmpdir(), 'canonical-redirects-'));
  try {
    writeFile(root, 'docs/intro.html', 'intro');
    writeFile(root, 'docs/devices.html', 'devices');
    await plugin({ siteConfig: { url: 'https://example.test', baseUrl: '/' } }).postBuild({ outDir: root });
    const rootRedirect = fs.readFileSync(path.join(root, 'docs/index.html'), 'utf8');
    assert.match(rootRedirect, /href="https:\/\/example\.test\/docs\/intro"/);
    assert.match(rootRedirect, /noindex,follow,noai,noimageai/);
    assert.match(rootRedirect, /window\.location\.search/);
    assert.match(rootRedirect, /window\.location\.hash/);
    assert.equal(fs.existsSync(path.join(root, 'docs/devices/index.html')), false);

    writeFile(collision, 'docs/intro.html', 'intro');
    writeFile(collision, 'docs/index.html', 'keep');
    await plugin({ siteConfig: { url: 'https://example.test', baseUrl: '/' } }).postBuild({ outDir: collision });
    assert.equal(fs.readFileSync(path.join(collision, 'docs/index.html'), 'utf8'), 'keep');

    writeFile(subpath, 'archive/docs/intro.html', 'intro');
    await plugin({ siteConfig: { url: 'https://example.test', baseUrl: '/archive/' } }).postBuild({ outDir: subpath });
    assert.match(
      fs.readFileSync(path.join(subpath, 'archive/docs/index.html'), 'utf8'),
      /https:\/\/example\.test\/archive\/docs\/intro/,
    );
  } finally {
    for (const directory of [root, collision, subpath]) fs.rmSync(directory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

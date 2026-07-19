const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const siteRoot = path.resolve(__dirname, '..');
const read = (relativePath) =>
  fs.readFileSync(path.join(siteRoot, relativePath), 'utf8');

const config = read('docusaurus.config.ts');
for (const locale of ['en', 'fr', 'de', 'es', 'ru', 'zh-CN', 'ja', 'pt-BR', 'pl', 'tr', 'ko', 'id', 'hi']) {
  assert.match(config, new RegExp(`['\"]${locale}['\"]`), `missing ${locale} locale`);
}
assert.match(config, /type:\s*'localeDropdown'/, 'missing locale dropdown');

const packageJson = JSON.parse(read('package.json'));
for (const script of ['write-translations', 'crowdin', 'translations:check']) {
  assert.ok(packageJson.scripts[script], `missing ${script} script`);
}

const crowdinConfig = read('crowdin.yml');
assert.match(crowdinConfig, /project_id_env:\s*CROWDIN_PROJECT_ID/);
assert.match(crowdinConfig, /api_token_env:\s*CROWDIN_PERSONAL_TOKEN/);
assert.match(crowdinConfig, /source:\s*\/i18n\/en\/\*\*\/\*/);
assert.match(crowdinConfig, /source:\s*\/docs\/\*\*\/\*/);

const workflow = read('../.github/workflows/i18n.yml');
assert.match(workflow, /crowdin upload sources/);
assert.match(workflow, /crowdin download/);
assert.match(workflow, /automation\/crowdin-translations/);

const homepage = read('src/pages/index.tsx');
assert.match(homepage, /homepage\.feature\.devices/);
const codeCatalogPath = path.join(siteRoot, 'i18n/en/code.json');
assert.ok(fs.existsSync(codeCatalogPath), 'missing extracted code catalog');
const codeCatalog = JSON.parse(fs.readFileSync(codeCatalogPath, 'utf8'));
for (const id of [
  'homepage.feature.devices',
  'announcement.releaseAvailable',
  'telemetry.commit.lastCommit',
  'support.nudge.title',
  'heroGame.instructions',
]) {
  assert.ok(codeCatalog[id], `missing extracted ${id} message`);
}

console.log('i18n smoke test passed');

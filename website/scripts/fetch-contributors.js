/**
 * Prebuild script: fetches contributor data from the GitHub API
 * and writes it to src/data/contributors.json.
 *
 * Runs automatically before every `npm run build` / `npm start` via
 * the `prebuild` and `prestart` npm lifecycle hooks in package.json.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'src', 'data');
const OUT_FILE = path.join(OUT_DIR, 'contributors.json');

const options = {
  hostname: 'api.github.com',
  path: '/repos/spike0en/nothing_archive/contributors?per_page=100',
  headers: { 'User-Agent': 'Nothing-Archive-Build' },
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      try {
        const contributors = JSON.parse(data).map((c) => ({
          login: c.login,
          avatar_url: c.avatar_url,
          html_url: c.html_url,
          contributions: c.contributions,
        }));
        fs.mkdirSync(OUT_DIR, { recursive: true });
        fs.writeFileSync(OUT_FILE, JSON.stringify(contributors, null, 2));
        console.log(`[contributors] Fetched ${contributors.length} contributors.`);
      } catch (e) {
        console.warn('[contributors] Parse error, writing empty fallback.', e.message);
        writeFallback();
      }
    } else {
      console.warn(`[contributors] API returned ${res.statusCode}, writing empty fallback.`);
      writeFallback();
    }
  });
}).on('error', (err) => {
  console.warn('[contributors] Network error, writing empty fallback.', err.message);
  writeFallback();
});

function writeFallback() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Preserve previously fetched data; only write empty array if no file exists at all
  if (!fs.existsSync(OUT_FILE)) {
    fs.writeFileSync(OUT_FILE, '[]');
    console.warn('[contributors] No cached file found, wrote empty fallback.');
  } else {
    console.log('[contributors] Keeping previously fetched data.');
  }
}

/**
 * Prebuild script: fetches GitHub repository data and writes static JSON
 * files to src/data/ for bundling as fallback data.
 *
 * Consolidates what was previously only contributor fetching into a single
 * script that also captures releases, commits, and repo stats. This gives
 * every visitor instant data from the bundle — live API calls become
 * optional freshness upgrades, not hard requirements.
 *
 * Runs automatically before every `npm run build` / `npm start` via
 * the `prebuild` and `prestart` npm lifecycle hooks in package.json.
 *
 * Uses GITHUB_TOKEN if available (automatic in GitHub Actions CI) to
 * avoid the 60 req/hour unauthenticated rate limit.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'src', 'data');

// GitHub API auth: use token from environment if available (CI), otherwise unauthenticated
const AUTH_TOKEN = process.env.GITHUB_TOKEN || '';

/** Shared HTTPS GET with optional bearer auth and JSON parsing. */
function fetchJSON(urlPath) {
  return new Promise((resolve, reject) => {
    const headers = { 'User-Agent': 'Nothing-Archive-Build' };
    if (AUTH_TOKEN) {
      headers['Authorization'] = `Bearer ${AUTH_TOKEN}`;
    }

    const options = {
      hostname: 'api.github.com',
      path: urlPath,
      headers,
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve({ data: JSON.parse(data), headers: res.headers, status: res.statusCode });
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}`));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Writes data to a JSON file. On failure, preserves any existing file.
 * If no file exists at all, writes the provided fallback.
 */
function safeWrite(filePath, data, label) {
  try {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    const count = Array.isArray(data) ? `${data.length} items` : 'object';
    console.log(`[${label}] Wrote ${count}.`);
  } catch (e) {
    console.warn(`[${label}] Write failed: ${e.message}`);
  }
}

function writeFallback(filePath, fallback, label) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
    console.warn(`[${label}] No cached file found, wrote empty fallback.`);
  } else {
    console.log(`[${label}] Keeping previously fetched data.`);
  }
}

// --- Individual fetchers ---

async function fetchContributors() {
  const filePath = path.join(OUT_DIR, 'contributors.json');
  const label = 'contributors';
  try {
    const { data } = await fetchJSON('/repos/spike0en/nothing_archive/contributors?per_page=100');
    const contributors = data.map((c) => ({
      login: c.login,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
      contributions: c.contributions,
    }));
    safeWrite(filePath, contributors, label);
  } catch (e) {
    console.warn(`[${label}] Fetch failed: ${e.message}`);
    writeFallback(filePath, [], label);
  }
}

async function fetchReleases() {
  const filePath = path.join(OUT_DIR, 'releases.json');
  const label = 'releases';
  try {
    const { data: rawReleases, headers } = await fetchJSON('/repos/spike0en/nothing_archive/releases?per_page=100');

    let totalCount = rawReleases.length;

    // Parse Link header to calculate total count across all pages
    const linkHeader = headers['link'] || '';
    if (linkHeader) {
      const lastPageMatch = linkHeader.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/);
      if (lastPageMatch) {
        const lastPage = parseInt(lastPageMatch[1], 10);
        if (lastPage > 1) {
          try {
            const { data: lastPageReleases } = await fetchJSON(
              `/repos/spike0en/nothing_archive/releases?per_page=100&page=${lastPage}`
            );
            totalCount = (lastPage - 1) * 100 + lastPageReleases.length;
          } catch (e) {
            console.warn(`[${label}] Last page fetch failed, using first-page count.`);
          }
        }
      }
    }

    const releases = rawReleases.map((item) => {
      const tagName = item.tag_name || '';
      const parts = tagName.split('_');
      let codename = 'Archive';
      let version = tagName;
      if (parts.length > 1) {
        codename = parts[0];
        version = parts.slice(1).join('_');
      }
      const downloads = item.assets
        ? item.assets.reduce((sum, asset) => sum + (asset.download_count || 0), 0)
        : 0;

      return {
        id: item.id,
        tagName,
        codename,
        version,
        name: item.name || tagName,
        publishedAt: item.published_at || new Date().toISOString(),
        htmlUrl: item.html_url || '',
        downloads,
      };
    });

    safeWrite(filePath, { releases, totalCount }, label);
  } catch (e) {
    console.warn(`[${label}] Fetch failed: ${e.message}`);
    writeFallback(filePath, { releases: [], totalCount: 0 }, label);
  }
}

async function fetchCommits() {
  const filePath = path.join(OUT_DIR, 'commits.json');
  const label = 'commits';
  try {
    const { data: rawCommits } = await fetchJSON('/repos/spike0en/nothing_archive/commits?per_page=100');

    const commits = rawCommits.map((item) => {
      const fullMessage = item.commit.message || '';
      const author = item.commit.author?.name || item.author?.login || 'Contributor';

      // Extract co-author names from commit message trailers
      const coAuthors = [];
      const coAuthorRegex = /Co-authored-by:\s*(.+?)\s*<[^>]*>/gi;
      let match;
      while ((match = coAuthorRegex.exec(fullMessage)) !== null) {
        const name = match[1].trim();
        if (name && name !== author) coAuthors.push(name);
      }

      return {
        sha: item.sha.substring(0, 7),
        author,
        coAuthors,
        date: item.commit.author?.date || new Date().toISOString(),
        message: fullMessage.split('\n')[0] || 'Code updates',
      };
    });

    safeWrite(filePath, commits, label);
  } catch (e) {
    console.warn(`[${label}] Fetch failed: ${e.message}`);
    writeFallback(filePath, [], label);
  }
}

async function fetchRepoStats() {
  const filePath = path.join(OUT_DIR, 'repo-stats.json');
  const label = 'repo-stats';
  try {
    const { data } = await fetchJSON('/repos/spike0en/nothing_archive');
    const stats = {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
    };
    safeWrite(filePath, stats, label);
  } catch (e) {
    console.warn(`[${label}] Fetch failed: ${e.message}`);
    writeFallback(filePath, { stars: 0, forks: 0 }, label);
  }
}

// --- Main ---

async function main() {
  if (!AUTH_TOKEN) {
    console.warn('[prefetch] No GITHUB_TOKEN found — running unauthenticated (60 req/hour limit).');
  } else {
    console.log('[prefetch] Using GITHUB_TOKEN for authenticated requests.');
  }

  // Run all fetchers in parallel for speed
  await Promise.allSettled([
    fetchContributors(),
    fetchReleases(),
    fetchCommits(),
    fetchRepoStats(),
  ]);

  console.log('[prefetch] Done.');
}

main();

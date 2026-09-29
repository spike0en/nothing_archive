/**
 * Prebuild script fetching GitHub repository data (contributors, releases,
 * commits, stats) and caching static fallback JSON files in src/data/.
 */

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'src', 'data');

// GitHub API auth: use token from environment if available (CI), otherwise unauthenticated
const AUTH_TOKEN = process.env.GITHUB_TOKEN || '';

/** Shared HTTPS GET with optional bearer auth and JSON parsing. */
async function fetchJSON(urlPath) {
  const headers = { 'User-Agent': 'Nothing-Archive-Build' };
  if (AUTH_TOKEN) {
    headers['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  }
  const url = urlPath.startsWith('http') ? urlPath : `https://api.github.com${urlPath}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = await res.json();
  const link = res.headers.get('link') || '';
  return { data, headers: { link }, status: res.status };
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

/**
 * Compiles contributors into a static JSON fallback file.
 * Pulls profile names, avatars, and URLs for core team members, branding,
 * and top contributors. If a core member is missing from the top-100 list,
 * fetches their profile directly from the GitHub user endpoint.
 */
async function fetchContributors() {
  const filePath = path.join(OUT_DIR, 'contributors.json');
  const label = 'contributors';

  // Load existing name and URL mappings to reduce network calls and preserve custom links
  const existingNames = {};
  const existingHtmlUrls = {};
  try {
    if (fs.existsSync(filePath)) {
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (Array.isArray(existing)) {
        for (const c of existing) {
          if (c.login && c.name) {
            existingNames[c.login] = c.name;
          }
          if (c.login && c.html_url) {
            existingHtmlUrls[c.login] = c.html_url;
          }
        }
      }
    }
  } catch (e) {
    console.warn(`[${label}] Failed to load existing names: ${e.message}`);
  }

  try {
    const { data } = await fetchJSON('/repos/spike0en/nothing_archive/contributors?per_page=100');

    const metadataPath = path.join(OUT_DIR, 'contributor-metadata.json');
    let coreLogins = [];
    let keyLogins = [];
    let brandingLogin = '';
    let customUrls = {};
    let customNames = {};
    let customAvatars = {};
    try {
      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        const leadLogins = metadata.lead ? [metadata.lead] : [];
        const foundationalLogins = metadata.foundational || [];
        keyLogins = metadata.key || [];
        coreLogins = metadata.core || [...leadLogins, ...foundationalLogins];
        brandingLogin = metadata.branding?.login || '';
        customUrls = metadata.customUrls || {};
        customNames = metadata.customNames || {};
        customAvatars = metadata.customAvatars || {};
      }
    } catch (e) {
      console.warn(`[${label}] Failed to read contributor-metadata.json: ${e.message}`);
    }

    const loginsToResolve = new Set();
    coreLogins.forEach(login => loginsToResolve.add(login));
    keyLogins.forEach(login => loginsToResolve.add(login));

    if (brandingLogin) {
      loginsToResolve.add(brandingLogin);
    }

    for (const c of data) {
      if (c && c.login) {
        loginsToResolve.add(c.login);
      }
    }

    const contributors = [];
    for (const login of loginsToResolve) {
      const apiContrib = data.find(c => c.login === login);

      let name = customNames[login] || existingNames[login];
      let avatar_url = customAvatars[login] || (apiContrib ? apiContrib.avatar_url : '');
      let html_url = customUrls[login] || `https://github.com/spike0en/nothing_archive/commits?author=${login}`;
      let contributions = apiContrib ? apiContrib.contributions : 0;

      // Profile details are only queried when avatar_url is missing from the list
      if (!avatar_url) {
        try {
          const userProfile = await fetchJSON(`/users/${login}`);
          name = name || userProfile.data?.name || login;
          avatar_url = avatar_url || userProfile.data?.avatar_url || '';
        } catch (err) {
          console.warn(`[${label}] Failed to fetch profile details for ${login}: ${err.message}`);
          name = name || login;
        }
      } else if (!name) {
        name = login;
      }

      contributors.push({
        login,
        name,
        avatar_url,
        html_url,
        contributions,
      });
    }

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
          } catch {
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
        // Committer date preserves chronological ordering when author dates are altered or rebased.
        date: item.commit.committer?.date || item.commit.author?.date || new Date().toISOString(),
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

async function main() {
  if (!AUTH_TOKEN) {
    console.warn('[prefetch] No GITHUB_TOKEN found: running unauthenticated (60 req/hour limit).');
  } else {
    console.log('[prefetch] Using GITHUB_TOKEN for authenticated requests.');
  }

  await Promise.allSettled([
    fetchContributors(),
    fetchReleases(),
    fetchCommits(),
    fetchRepoStats(),
  ]);

  // Run parse-devices and parse-showcase to extract local device and showcase metadata
  try {
    const { execSync } = require('child_process');
    execSync('node ' + path.join(__dirname, 'parse-devices.js'), { stdio: 'inherit' });
    execSync('node ' + path.join(__dirname, 'parse-showcase.js'), { stdio: 'inherit' });
  } catch (e) {
    console.error(`[prefetch] local parsers failed: ${e.message}`);
  }

  // Auto-sync root CONTRIBUTING.md to website/docs/contributing.md with Docusaurus frontmatter
  const rootContrib = path.join(__dirname, '..', '..', 'CONTRIBUTING.md');
  const docContrib = path.join(__dirname, '..', 'docs', 'contributing.md');
  if (fs.existsSync(rootContrib)) {
    const frontmatter = `---\nsidebar_position: 2\ntitle: Contributing\ndescription: Guidelines for contributing documentation, showcase entries, and code maintenance.\n---\n\n`;
    fs.writeFileSync(docContrib, frontmatter + fs.readFileSync(rootContrib, 'utf8'));
  }

  // Auto-sync root README.md "## Credits & Acknowledgements" to website/docs/acknowledgements.md with Docusaurus frontmatter
  const rootReadme = path.join(__dirname, '..', '..', 'README.md');
  const docAck = path.join(__dirname, '..', 'docs', 'acknowledgements.md');
  if (fs.existsSync(rootReadme)) {
    const readmeContent = fs.readFileSync(rootReadme, 'utf8');
    const ackMatch = readmeContent.match(/## Credits & Acknowledgements\s*([\s\S]*?)(?=\n##\s+|$)/);
    if (ackMatch) {
      const ackBody = ackMatch[1].trim().replace(/^Special thanks to:\s*/i, '');
      const frontmatter = `---\nsidebar_position: 3\ntitle: Acknowledgements\ndescription: Credits and attributions for open-source tools, scripts, and community contributors.\n---\n\n# Acknowledgements\n\nNothing Archive builds upon community contributions. Special thanks to:\n\n`;
      const closing = `\n\nThanks to all app developers, project maintainers, and Nothing community members supporting this project.\n`;
      fs.writeFileSync(docAck, frontmatter + ackBody + closing);
    }
  }

  console.log('[prefetch] Done.');
}

main();

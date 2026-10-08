/**
 * Synchronizes docs/firmware.md with changelog index files and device anchors.
 * Injects codename IDs into <details> blocks, adds quick navigation anchors,
 * and converts plain build number strings into changelog documentation links.
 */

const fs = require('fs');
const path = require('path');

const FW_PATH = path.join(__dirname, '..', 'docs', 'firmware.md');
const CHANGELOGS_DIR = path.join(__dirname, '..', 'docs', 'changelogs');

// Map lowercase build identifier to changelog directory folder and file basename.
const changelogMap = new Map();
const folders = fs.readdirSync(CHANGELOGS_DIR);
for (const folder of folders) {
  const folderPath = path.join(CHANGELOGS_DIR, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md') && f !== '_category_.json');
    for (const file of files) {
      const base = file.replace(/\.md$/, '');
      changelogMap.set(base.toLowerCase(), { folder, originalName: base });
    }
  }
}

let fwContent = fs.readFileSync(FW_PATH, 'utf8');

const METADATA_PATH = path.join(__dirname, '..', 'src', 'data', 'devices-metadata.json');
const devices = fs.existsSync(METADATA_PATH) ? JSON.parse(fs.readFileSync(METADATA_PATH, 'utf8')) : [];

// Dynamically map summary subtitles and codenames to device anchors and changelog folders
const subtitleMap = {
  'Asteroids(Pro)': { id: 'asteroids', name: 'Phone (3a) & (3a) Pro', folder: 'asteroids' },
};

for (const dev of devices) {
  const baseName = dev.name.replace(/\s*\([^)]+\)$/, '');
  const config = { id: dev.folder || dev.codename, name: baseName, folder: dev.folder || dev.codename };
  subtitleMap[dev.codename.toLowerCase()] = config;
  const matchCap = dev.name.match(/\(([^)]+)\)$/);
  if (matchCap) {
    subtitleMap[matchCap[1].trim()] = config;
    subtitleMap[matchCap[1].trim().toLowerCase()] = config;
  }
}

function formatSeriesLinks(list) {
  const seen = new Set();
  const links = [];
  for (const d of list) {
    const id = d.folder || d.codename;
    if (!seen.has(id)) {
      seen.add(id);
      const label = d.name.replace(/\s*\([^)]+\)$/, '');
      links.push(`[${label}](#${id})`);
    }
  }
  return links.join(' · ');
}

if (!fwContent.includes('id="quick-device-navigation"')) {
  const numberLinks = formatSeriesLinks(devices.filter(d => d.brand === 'Nothing' && d.series === 'number'));
  const aLinks = formatSeriesLinks(devices.filter(d => d.brand === 'Nothing' && d.series === 'a'));
  const bLinks = formatSeriesLinks(devices.filter(d => d.brand === 'Nothing' && d.series === 'b'));
  const cmfLinks = formatSeriesLinks(devices.filter(d => d.brand === 'CMF' || d.series === 'cmf'));

  const quickJumpBlock = `## Downloads

<div id="quick-device-navigation">

:::tip[Quick Device Navigation]
Select a device model to jump directly to its download index:
- **Nothing Phone Series**: ${numberLinks}
- **Nothing Phone (a) Series**: ${aLinks}
- **Nothing Phone (b / Lite) Series**: ${bLinks}
- **CMF Phone Series**: ${cmfLinks}
:::

</div>
`;

  fwContent = fwContent.replace(
    '## Downloads\n\nSelect your device model to access its Release Index.',
    quickJumpBlock + '\nSelect your device model to access its Release Index.'
  );
}

// Matches device <details> blocks and strips residual banners before the download table.
const deviceDetailsRegex = /<details(?: id="[^"]*")?>\s*\n\s*(<summary><span class="summary-title">[\s\S]*?<\/span><span class="summary-subtitle">([^<]+)<\/span><\/summary>)([\s\S]*?)(?=\n\| \*\*Nothing OS Version\*\*)/g;

let detailsCount = 0;
fwContent = fwContent.replace(deviceDetailsRegex, (match, summaryHtml, subtitle) => {
  const cleanSubtitle = subtitle.trim();
  const config = subtitleMap[cleanSubtitle];
  if (!config) {
    console.warn('Unknown subtitle in summary:', cleanSubtitle);
    return match;
  }
  detailsCount++;
  return `<details id="${config.id}">\n  ${summaryHtml}\n`;
});

console.log(`Updated ${detailsCount} device <details> blocks.`);

const lines = fwContent.split('\n');
let linkedCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes('| **Nothing OS Version** | **Build Number**')) {
    lines[i] = line.replace('| **Build Number**', '| **Build Number (Changelog)**');
    continue;
  }

  if (line.trim().startsWith('|') && !line.includes('---') && !line.includes('Nothing OS Version')) {
    const cols = line.split('|');
    if (cols.length >= 4) {
      const buildCell = cols[2].trim();
      // Matches OTA build tag format: [Codename]-[AndroidLetter][Version]-[YYMMDD]-[HHMM].
      if (!buildCell.startsWith('[') && /-[A-Z0-9.]+-\d{6}-\d{4}/i.test(buildCell)) {
        const buildKey = buildCell.toLowerCase();
        if (changelogMap.has(buildKey)) {
          const entry = changelogMap.get(buildKey);
          const link = `[${buildCell}](/docs/changelogs/${entry.folder}/${entry.originalName})`;
          cols[2] = ` ${link} `;
          lines[i] = cols.join('|');
          linkedCount++;
        }
      }
    }
  }
}

fwContent = lines.join('\n');
fs.writeFileSync(FW_PATH, fwContent, 'utf8');
console.log(`Success: Updated firmware.md with IDs, changelog links, and linked ${linkedCount} build numbers.`);

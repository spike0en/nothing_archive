const fs = require('fs');
const path = require('path');

const DEVICES_MD_PATH = path.join(__dirname, '..', 'docs', 'devices.md');
const COLORS_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'device-colors.json');
const OUT_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'devices-metadata.json');
const CHANGELOGS_DIR = path.join(__dirname, '..', 'docs', 'changelogs');

function parseNames(columnVal) {
  const links = [];
  const regex = /\[([^\]]+)\]\([^)]+\)/g;
  let match;
  while ((match = regex.exec(columnVal)) !== null) {
    links.push(match[1].trim());
  }
  if (links.length > 0) {
    return links;
  }
  return columnVal.split('/').map(s => s.trim());
}

function parseCodenames(columnVal) {
  // e.g. "Spacewar / Abra" -> ["spacewar", "abra"]
  const parts = columnVal.split('/').map(p => p.trim());
  if (parts.length > 1) {
    // Exclude the last codename (internal Pokemon name)
    return parts.slice(0, -1).map(p => p.toLowerCase());
  }
  return parts.map(p => p.toLowerCase());
}

function getSeries(name) {
  const cleanName = name.toLowerCase();
  if (cleanName.includes('lite') || /\([0-9]+b\)/.test(cleanName)) {
    return 'b';
  }
  if (/\([0-9]+a\)/.test(cleanName)) {
    return 'a';
  }
  return 'number';
}

function resolveDeviceName(folder, names, rowCodenames, changelogsDir) {
  if (names.length === 1) return names[0];

  const folderLower = folder.toLowerCase();
  if (folderLower.includes('pro')) {
    const match = names.find(n => n.toLowerCase().includes('pro'));
    if (match) return match;
  }
  if (folderLower.includes('plus')) {
    const match = names.find(n => n.toLowerCase().includes('plus'));
    if (match) return match;
  }
  if (folderLower.includes('lite')) {
    const match = names.find(n => n.toLowerCase().includes('lite'));
    if (match) return match;
  }

  // Check if other folders exist for other codenames in this row
  const otherCodenames = rowCodenames.filter(c => c !== folderLower);
  const otherFoldersExist = otherCodenames.some(c => fs.existsSync(path.join(changelogsDir, c)));
  
  if (!otherFoldersExist) {
    // No other folders exist, so this folder represents all names in the row
    let joined = names.join(' / ');
    return joined.replace(/\/ Phone \(/g, '/ (');
  }

  // If other folders exist, default to the one without "pro"/"plus"/"lite"
  const match = names.find(n => !n.toLowerCase().includes('pro') && !n.toLowerCase().includes('plus') && !n.toLowerCase().includes('lite'));
  return match || names[0];
}

function capitalizeCodename(codename, originalCodenames) {
  // Find matching codename in original list to preserve casing (e.g. PacmanPro)
  const match = originalCodenames.find(c => c.toLowerCase() === codename.toLowerCase());
  return match ? match.trim() : codename.charAt(0).toUpperCase() + codename.slice(1);
}

function parseDevices() {
  console.log('[parse-devices] Reading devices.md and device-colors.json...');
  
  if (!fs.existsSync(DEVICES_MD_PATH)) {
    console.error(`[parse-devices] Error: devices.md not found at ${DEVICES_MD_PATH}`);
    process.exit(1);
  }

  const content = fs.readFileSync(DEVICES_MD_PATH, 'utf-8');
  const lines = content.split('\n');

  let currentBrand = 'Nothing';
  let inPhones = false;
  const parsedRows = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## Nothing')) {
      currentBrand = 'Nothing';
      inPhones = false;
    } else if (trimmed.startsWith('## CMF by Nothing')) {
      currentBrand = 'CMF';
      inPhones = false;
    } else if (trimmed.startsWith('### Phones')) {
      inPhones = true;
    } else if (trimmed.startsWith('##') || trimmed.startsWith('###')) {
      inPhones = false;
    }

    if (inPhones && trimmed.startsWith('|') && trimmed.split('|').length >= 6) {
      const cols = trimmed.split('|').map(c => c.trim());
      if (cols[1].toLowerCase().includes('device name') || cols[1].includes('---')) {
        continue;
      }

      const names = parseNames(cols[1]);
      const codenames = parseCodenames(cols[3]);
      const releaseDate = cols[5].trim();
      const originalCodenamesList = cols[3].split('/').map(c => c.trim());

      parsedRows.push({
        names,
        codenames,
        releaseDate,
        brand: currentBrand,
        originalCodenamesList
      });
    }
  }

  // Retrieve device colors from the static config file to merge with the parsed catalog.
  let deviceColors = {};
  if (fs.existsSync(COLORS_JSON_PATH)) {
    try {
      deviceColors = JSON.parse(fs.readFileSync(COLORS_JSON_PATH, 'utf-8'));
    } catch (e) {
      console.warn(`[parse-devices] Warning: Failed to parse device-colors.json: ${e.message}`);
    }
  }

  // Iterate over the filesystem directories under docs/changelogs to find folders that match catalog codenames.
  const folders = fs.readdirSync(CHANGELOGS_DIR).filter(f => {
    return fs.statSync(path.join(CHANGELOGS_DIR, f)).isDirectory();
  });

  const metadata = [];

  for (const folder of folders) {
    const folderLower = folder.toLowerCase();
    const row = parsedRows.find(r => r.codenames.includes(folderLower));
    if (!row) {
      console.warn(`[parse-devices] Warning: Folder '${folder}' has no matching row in devices.md.`);
      continue;
    }

    let resolvedName = resolveDeviceName(folder, row.names, row.codenames, CHANGELOGS_DIR);

    let displayCodename = '';
    const otherCodenames = row.codenames.filter(c => c !== folderLower);
    const otherFoldersExist = otherCodenames.some(c => fs.existsSync(path.join(CHANGELOGS_DIR, c)));
    
    if (!otherFoldersExist && row.codenames.length > 1) {
      const base = row.codenames[0];
      const pro = row.codenames[1];
      if (pro === base + 'pro') {
        const baseCap = capitalizeCodename(base, row.originalCodenamesList);
        displayCodename = `${baseCap}(Pro)`;
      } else {
        displayCodename = row.codenames
          .map(c => capitalizeCodename(c, row.originalCodenamesList))
          .join(' / ');
      }
    } else {
      displayCodename = capitalizeCodename(folder, row.originalCodenamesList);
    }

    const displayName = `${resolvedName} (${displayCodename})`;

    const colors = deviceColors[folderLower] || [];
    const variants = colors.map(colorName => {
      const variantNameClean = colorName.toLowerCase().replace(/\s+/g, '');
      const suffix = variantNameClean === 'ce' ? 'CE' : variantNameClean;
      return {
        name: colorName,
        imageUrl: `/img/devices/${folderLower}_${suffix}.webp`
      };
    });

    // Convert catalog date strings to millisecond timestamps for sorting comparisons.
    const timestamp = new Date(row.releaseDate).getTime();

    metadata.push({
      name: displayName,
      codename: folderLower,
      codenames: [folderLower, ...otherCodenames],
      brand: row.brand,
      series: row.brand === 'CMF' ? 'cmf' : getSeries(resolvedName),
      releaseDate: row.releaseDate,
      timestamp,
      variants
    });
  }

  // Order the devices array to align Nothing Number, A, B/Lite series and CMF brand chronologically.
  function getDeviceSeriesRank(series) {
    switch (series) {
      case 'number': return 1;
      case 'a': return 2;
      case 'b': return 3;
      default: return 4;
    }
  }

  metadata.sort((a, b) => {
    if (a.brand !== b.brand) {
      return a.brand === 'Nothing' ? -1 : 1;
    }

    if (a.brand === 'Nothing') {
      const rankA = getDeviceSeriesRank(a.series);
      const rankB = getDeviceSeriesRank(b.series);
      if (rankA !== rankB) {
        return rankA - rankB;
      }
      if (a.timestamp !== b.timestamp) {
        return b.timestamp - a.timestamp;
      }
      const isProA = a.name.toLowerCase().includes('pro') || a.name.toLowerCase().includes('plus') || a.codename.includes('pro');
      const isProB = b.name.toLowerCase().includes('pro') || b.name.toLowerCase().includes('plus') || b.codename.includes('pro');
      if (isProA !== isProB) {
        return isProA ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    } else {
      if (a.timestamp !== b.timestamp) {
        return b.timestamp - a.timestamp;
      }
      const isProA = a.name.toLowerCase().includes('pro') || a.name.toLowerCase().includes('plus') || a.codename.includes('pro');
      const isProB = b.name.toLowerCase().includes('pro') || b.name.toLowerCase().includes('plus') || b.codename.includes('pro');
      if (isProA !== isProB) {
        return isProA ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    }
  });

  fs.mkdirSync(path.dirname(OUT_JSON_PATH), { recursive: true });
  fs.writeFileSync(OUT_JSON_PATH, JSON.stringify(metadata, null, 2));
  console.log(`[parse-devices] Success: Wrote ${metadata.length} device metadata entries to devices-metadata.json.`);
}

parseDevices();

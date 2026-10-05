const fs = require('fs');
const path = require('path');

const CHANGELOG_RE = /^([A-Za-z0-9]+)[_-]([A-Za-z])([0-9]+(?:\.[0-9]+)*)-(\d{6})-(\d{4})$/;
const CONTEXT_MARKER = '{/* enrich-docs:changelog-context */}';

function normaliseSlashes(value) {
  return String(value || '').replace(/\\/g, '/');
}

function relativeDocPath(filePath, docsDir) {
  const file = normaliseSlashes(filePath);
  const root = normaliseSlashes(docsDir).replace(/\/+$/, '');
  if (root && file.toLowerCase().startsWith(`${root.toLowerCase()}/`)) {
    return file.slice(root.length + 1);
  }
  return file.replace(/^.*?\/docs\//i, '');
}

function asDevices(devices) {
  if (Array.isArray(devices)) return devices.filter(Boolean);
  if (devices && typeof devices === 'object') return Object.values(devices).filter(Boolean);
  return [];
}

function deviceFolder(device) {
  return String(device.folder || device.codename || '').toLowerCase();
}

function deviceModel(device) {
  const name = String(device.name || '').trim();
  const codename = String(device.codename || '').trim();
  if (!name || !codename) return name;
  const suffix = new RegExp(`\\s*\\(${codename.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}\\)$`, 'i');
  return name.replace(suffix, '').trim();
}

function modelRank(model) {
  const lower = model.toLowerCase();
  if (lower.includes('pro plus') || lower.includes('pro+')) return 3;
  if (lower.includes('pro') || lower.includes('plus') || lower.includes('lite')) return 2;
  return 1;
}

function resolveDevices(folder, devices) {
  const wanted = String(folder || '').toLowerCase();
  return asDevices(devices).filter((device) => deviceFolder(device) === wanted);
}

function displayDeviceName(matchingDevices) {
  if (matchingDevices.length === 0) return '';
  const models = [...new Set(matchingDevices.map(deviceModel).filter(Boolean))].sort((a, b) => {
    const rank = modelRank(a) - modelRank(b);
    return rank || a.localeCompare(b);
  });
  const brand = matchingDevices[0].brand === 'CMF' ? 'CMF by Nothing' : 'Nothing';
  return `${brand} ${models.join(' / ')}`.trim();
}

function parseBuild(build) {
  const match = String(build || '').match(CHANGELOG_RE);
  if (!match) return null;
  return {
    code: match[0],
    codename: match[1],
    androidPrefix: match[2],
    osVersion: match[3],
    buildDate: match[4],
    buildTime: match[5],
  };
}

function headingAnchor(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9_\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function firmwareAnchor(summaryCodename, devices) {
  const summary = String(summaryCodename || '').trim();
  const compact = summary.toLowerCase().replace(/[^a-z0-9]/g, '');
  const candidates = asDevices(devices).filter((device) => {
    const codename = String(device.codename || '').toLowerCase();
    const folder = deviceFolder(device);
    return codename === summary.toLowerCase() || folder === summary.toLowerCase() || codename === compact;
  });
  if (candidates.length === 0) return null;
  return deviceFolder(candidates[0]);
}

function existingChangelog(docsDir, folder, build) {
  const directory = path.join(docsDir, 'changelogs', folder);
  const requested = `${build}.md`;
  const exact = path.join(directory, requested);
  if (fs.existsSync(exact)) return requested;
  if (!fs.existsSync(directory)) return null;
  const canonical = (value) => String(value).toLowerCase().replace(/_/g, '-');
  const match = fs.readdirSync(directory).find((file) => canonical(file) === canonical(requested));
  return match || null;
}

function splitTableRow(line) {
  const cells = line.split('|');
  if (cells.length < 3 || cells[0].trim() !== '' || cells[cells.length - 1].trim() !== '') return null;
  return cells;
}

function enrichFirmware(content, docsDir, devices) {
  return content.replace(/<details\b[^>]*>[\s\S]*?<\/details>/gi, (block) => {
    const subtitleMatch = block.match(/<span\s+class=["']summary-subtitle["'][^>]*>([^<]+)<\/span>/i);
    if (!subtitleMatch) return block;
    const folder = firmwareAnchor(subtitleMatch[1], devices);
    if (!folder) return block;

    const idMatch = block.match(/^\s*<details\b([^>]*)>/i);
    if (!idMatch) return block;
    let enriched = block;
    if (!/\bid\s*=\s*["'][^"']+["']/i.test(idMatch[1])) {
      enriched = enriched.replace(/^(\s*<details\b)/i, `$1 id="${folder}"`);
    }

    const lines = enriched.split(/(\r?\n)/);
    let buildColumn = -1;
    let inTable = false;
    for (let index = 0; index < lines.length; index += 2) {
      const line = lines[index];
      if (!line || !line.includes('|')) continue;
      const cells = splitTableRow(line);
      if (!cells) continue;
      const labels = cells.map((cell) => cell.replace(/[*`]/g, '').trim().toLowerCase());
      if (labels.some((label) => label === 'build number')) {
        buildColumn = labels.indexOf('build number');
        inTable = true;
        continue;
      }
      if (!inTable || buildColumn < 0 || cells.length <= buildColumn) continue;
      if (/^\s*:?-{3,}:?\s*$/.test(cells[buildColumn])) continue;
      const build = cells[buildColumn].trim();
      if (!build || /[[\]()`<>]/.test(build)) continue;
      const file = existingChangelog(docsDir, folder, build);
      if (!file) continue;
      const link = `[${build}](./changelogs/${folder}/${file})`;
      cells[buildColumn] = cells[buildColumn].replace(build, link);
      lines[index] = cells.join('|');
    }
    return lines.join('');
  });
}

function enrichChangelog({ filePath, content, frontMatter }, docsDir, devices) {
  const relative = relativeDocPath(filePath, docsDir).split('/').filter(Boolean);
  if (relative.length !== 3 || relative[0].toLowerCase() !== 'changelogs' || !relative[2].toLowerCase().endsWith('.md')) {
    return null;
  }
  if (relative[2].toLowerCase() === 'index.md') return null;

  const build = parseBuild(relative[2].slice(0, -3));
  if (!build) return null;
  const matchingDevices = resolveDevices(relative[1], devices);
  if (matchingDevices.length === 0) return null;
  const deviceName = displayDeviceName(matchingDevices);
  const firmwareId = deviceFolder(matchingDevices[0]);
  const title = `Nothing OS ${build.osVersion} for ${deviceName} — ${build.code}`;
  const description = `Nothing OS ${build.osVersion} release notes for ${deviceName}, build ${build.code}.`;
  const nextFrontMatter = {
    ...(frontMatter || {}),
    title,
    description,
    sidebar_label: build.code,
  };

  let nextContent = String(content || '');
  if (!nextContent.includes(CONTEXT_MARKER)) {
    const anchor = headingAnchor(build.code);
    const context = `> **${deviceName}** · Nothing OS ${build.osVersion} · [Firmware](/docs/firmware#${firmwareId}) · [Device catalog](/docs/devices) · [OTA guide](/docs/guides#ota-sideloading)\n\n${CONTEXT_MARKER}`;
    const heading = new RegExp(`(^|\\n)([ \\t]*)# (?!#)([^\\n]*)`, 'm');
    const match = nextContent.match(heading);
    if (match) {
      const headingText = match[3].trim();
      const hasAnchor = headingText.includes(`{#${anchor}}`) || headingText.includes(`{/* #${anchor} */}`);
      const legacyAnchor = headingAnchor(headingText);
      const alias = !hasAnchor && headingText !== title && legacyAnchor !== anchor
        ? `<span id="${legacyAnchor}" className="legacy-heading-anchor" />\n\n` : '';
      const replacement = hasAnchor ? `# ${match[3]}` : `# ${title} {/* #${anchor} */}`;
      nextContent = nextContent.replace(heading, `${match[1]}${alias}${match[2]}${replacement}\n\n${context}`);
    } else {
      nextContent = `# ${title} {/* #${anchor} */}\n\n${context}\n\n${nextContent.trimStart()}`;
    }
  }
  return { content: nextContent, frontMatter: nextFrontMatter };
}

function enrichIndex({ content, frontMatter }) {
  return {
    content,
    frontMatter: {
      ...(frontMatter || {}),
      title: 'Nothing OS Update Changelogs',
      sidebar_label: 'Changelogs',
      description: 'Nothing and CMF by Nothing OS release notes, build history, update cadence, and device changelog directories.',
    },
  };
}

function enrichDoc({ filePath, content, frontMatter }, { docsDir, devices } = {}) {
  const relative = relativeDocPath(filePath, docsDir).split('/').filter(Boolean).map((part) => part.toLowerCase());
  if (relative.join('/') === 'changelogs/index.md') return enrichIndex({ content, frontMatter });
  if (relative[0] === 'firmware.md' && relative.length === 1) {
    return {
      content: enrichFirmware(String(content || ''), docsDir, devices),
      frontMatter: { ...(frontMatter || {}) },
    };
  }
  return enrichChangelog({ filePath, content, frontMatter }, docsDir, devices) || {
    content,
    frontMatter: { ...(frontMatter || {}) },
  };
}

module.exports = {
  enrichDoc,
};

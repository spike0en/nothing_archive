export interface DeviceEntry {
  name: string;
  codename: string;
  folder?: string;
  brand: string;
  series: string;
}

/** Merges variants in one folder into a single label (e.g. Base(Pro)). */
export function formatMergedDeviceLabel(group: readonly DeviceEntry[]): string {
  if (group.length === 1) return group[0].name;

  const cleanNames = group
    .map((d) => d.name.match(/^(.*)\s\([^(]+\)$/)?.[1] ?? d.name)
    .sort();
  const joinedNames = cleanNames.join(' / ').replace(/\/ Phone \(/g, '/ (');

  const cleanCodenames = group
    .map((d) => d.name.match(/\(([^)]+)\)$/)?.[1] ?? d.codename)
    .sort();

  const [base, ...rest] = cleanCodenames;
  const suffixes =
    rest.length > 0 && rest.every((c) => c.startsWith(base))
      ? rest.map((c) => c.slice(base.length)).filter(Boolean)
      : [];
  const joinedCodenames =
    suffixes.length > 0 ? `${base}(${suffixes.join('/')})` : cleanCodenames.join(' / ');

  return `${joinedNames} (${joinedCodenames})`;
}

/** Maps each variant codename to its shared firmware folder ID. */
export function getDeviceHashAliases(devices: readonly DeviceEntry[]): Map<string, string> {
  const aliases = new Map<string, string>();
  for (const d of devices) {
    if (d.folder && d.folder.toLowerCase() !== d.codename.toLowerCase()) {
      aliases.set(d.codename.toLowerCase(), d.folder);
    }
  }
  return aliases;
}

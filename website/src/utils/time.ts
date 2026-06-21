/**
 * Calculates a clean relative time difference string (e.g. 3m, 2h, 4d).
 * Used across telemetry feed components.
 * 
 * @param dateStr The ISO date string or timestamp string to compare.
 * @returns A formatted relative age string (e.g., "5m", "3h", "2d", or "N/A").
 */
export function getTimeLag(dateStr: string): string {
  if (!dateStr) return 'N/A';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  return `${Math.max(1, mins)}m`;
}

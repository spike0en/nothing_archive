/**
 * @file time.ts
 * @description Time formatting utility for computing human-readable relative ages.
 * 
 * Layer: Shared utilities.
 * Boundary: Pure date calculation functions.
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

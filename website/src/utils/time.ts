/**
 * Formats an ISO timestamp into a compact relative age (e.g., "5m", "3h", "2d").
 * Used across commit feeds and release badges where screen space is constrained.
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

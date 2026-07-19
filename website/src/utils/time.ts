/**
 * @file time.ts
 * @description Time formatting utility for computing human-readable relative ages.
 * 
 * Layer: Shared utilities.
 * Boundary: Pure date calculation functions.
 * 
 * @param dateStr The ISO date string or timestamp string to compare.
 * @param locale BCP 47 locale used for the relative-time message.
 * @returns A localized relative-time message.
 */
export function getTimeLag(dateStr: string, locale: string): string {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  if (!Number.isFinite(diff)) return '—';
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const formatter = new Intl.RelativeTimeFormat(locale, {numeric: 'auto', style: 'short'});
  if (days > 0) return formatter.format(-days, 'day');
  if (hours > 0) return formatter.format(-hours, 'hour');
  return formatter.format(-Math.max(1, mins), 'minute');
}

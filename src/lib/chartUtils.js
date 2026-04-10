// ── Time-range helpers shared by chart components ─────────────────────────────

export function getDateRange(range) {
  const now    = new Date();
  const cutoff = new Date();

  if (range === '30d') {
    cutoff.setDate(now.getDate() - 30);
    return { cutoff, groupBy: 'day' };
  }
  if (range === '90d') {
    cutoff.setDate(now.getDate() - 90);
    return { cutoff, groupBy: 'week' };
  }
  // YTD
  cutoff.setMonth(0, 1);
  cutoff.setHours(0, 0, 0, 0);
  return { cutoff, groupBy: 'month' };
}

export function getPeriodKey(date, groupBy) {
  if (groupBy === 'day') {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }
  if (groupBy === 'week') {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay()); // roll back to Sunday
    return d.toISOString().split('T')[0];
  }
  // month
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function formatPeriodLabel(key, groupBy) {
  const parts     = key.split('-').map(Number);
  const [y, m, d] = parts;

  if (groupBy === 'day') {
    return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  if (groupBy === 'week') {
    const date        = new Date(y, m - 1, d);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const weekNum     = Math.ceil(((date - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
    return `Wk${weekNum}`;
  }
  return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'short' });
}

export function groupItemsByPeriod(items, range) {
  const { cutoff, groupBy } = getDateRange(range);
  const filtered            = items.filter((item) => item.timestamp >= cutoff);
  const map                 = new Map();

  filtered.forEach((item) => {
    const key = getPeriodKey(item.timestamp, groupBy);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  });

  return { map, groupBy, filtered };
}

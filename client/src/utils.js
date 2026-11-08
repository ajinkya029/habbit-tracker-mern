// Date helpers work in the user's local calendar using 'YYYY-MM-DD' strings.

export function toISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayISO() {
  return toISO(new Date());
}

export function addDays(iso, n) {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + n);
  return toISO(d);
}

// Consecutive completed days ending today (or yesterday, if today isn't done yet)
export function computeStreak(dates, today = todayISO()) {
  const set = new Set(dates);
  let cursor = set.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (set.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

// Last n days, oldest first, for the history strip
export function lastNDays(n) {
  const today = todayISO();
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = addDays(today, -i);
    const label = new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
      weekday: 'narrow',
    });
    out.push({ date, label });
  }
  return out;
}

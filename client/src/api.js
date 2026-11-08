const BASE = '/api/habits';

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || res.statusText);
  return body;
}

export const api = {
  list: () => request(BASE),
  create: (name, color) =>
    request(BASE, { method: 'POST', body: JSON.stringify({ name, color }) }),
  toggle: (id, date) =>
    request(`${BASE}/${id}/toggle`, { method: 'POST', body: JSON.stringify({ date }) }),
  remove: (id) => request(`${BASE}/${id}`, { method: 'DELETE' }),
};

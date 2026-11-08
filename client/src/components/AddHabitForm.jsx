import { useState } from 'react';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#0ea5e9'];

export default function AddHabitForm({ onAdd }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setBusy(true);
    await onAdd(trimmed, color);
    setName('');
    setBusy(false);
  }

  return (
    <form className="add" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New habit, e.g. Read 20 pages"
        maxLength={80}
        aria-label="Habit name"
      />
      <div className="swatches">
        {COLORS.map((c) => (
          <button
            type="button"
            key={c}
            className={`swatch ${c === color ? 'sel' : ''}`}
            style={{ background: c }}
            onClick={() => setColor(c)}
            aria-label={`Color ${c}`}
          />
        ))}
      </div>
      <button type="submit" disabled={busy || !name.trim()}>
        Add
      </button>
    </form>
  );
}

import { useEffect, useState } from 'react';
import { api } from './api';
import { todayISO } from './utils';
import HabitCard from './components/HabitCard';
import AddHabitForm from './components/AddHabitForm';

export default function App() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const today = todayISO();

  // Runs an action and surfaces any error in the banner instead of throwing
  async function run(fn) {
    try {
      setError('');
      await fn();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    run(async () => setHabits(await api.list())).finally(() => setLoading(false));
  }, []);

  const doneCount = habits.filter((h) => h.completedDates.includes(today)).length;

  const handleAdd = (name, color) =>
    run(async () => {
      const habit = await api.create(name, color);
      setHabits((hs) => [...hs, habit]);
    });

  const handleToggle = (id) =>
    run(async () => {
      const updated = await api.toggle(id, today);
      setHabits((hs) => hs.map((h) => (h._id === id ? updated : h)));
    });

  const handleDelete = (id) => {
    if (!window.confirm('Delete this habit?')) return;
    return run(async () => {
      await api.remove(id);
      setHabits((hs) => hs.filter((h) => h._id !== id));
    });
  };

  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="container">
      <header>
        <h1>Habit Tracker</h1>
        <p className="subtitle">
          {todayLabel} · {doneCount} of {habits.length} done
        </p>
      </header>

      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}

      <AddHabitForm onAdd={handleAdd} />

      {loading ? (
        <p className="empty">Loading…</p>
      ) : habits.length === 0 ? (
        <p className="empty">No habits yet. Add one above to get started.</p>
      ) : (
        <section className="list">
          {habits.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}
    </main>
  );
}

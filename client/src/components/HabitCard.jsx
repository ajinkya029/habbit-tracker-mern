import { computeStreak, lastNDays, todayISO } from '../utils';

export default function HabitCard({ habit, onToggle, onDelete }) {
  const today = todayISO();
  const doneToday = habit.completedDates.includes(today);
  const streak = computeStreak(habit.completedDates, today);
  const days = lastNDays(7);

  return (
    <article className="card" style={{ '--accent': habit.color }}>
      <button
        className={`check ${doneToday ? 'done' : ''}`}
        onClick={() => onToggle(habit._id)}
        aria-label={doneToday ? `Mark ${habit.name} not done` : `Mark ${habit.name} done`}
        aria-pressed={doneToday}
      >
        {doneToday ? '✓' : ''}
      </button>

      <div className="info">
        <h3 className="name">{habit.name}</h3>
        <div className="meta">
          🔥 {streak} day{streak === 1 ? '' : 's'} · {habit.completedDates.length} total
        </div>
        <div className="week">
          {days.map((d) => (
            <span
              key={d.date}
              title={d.date}
              className={`dot ${habit.completedDates.includes(d.date) ? 'on' : ''} ${
                d.date === today ? 'today' : ''
              }`}
            >
              {d.label}
            </span>
          ))}
        </div>
      </div>

      <button className="delete" onClick={() => onDelete(habit._id)} aria-label="Delete habit">
        ×
      </button>
    </article>
  );
}

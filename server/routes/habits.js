import { Router } from 'express';
import Habit from '../models/Habit.js';

const router = Router();
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// List all habits
router.get('/', async (req, res, next) => {
  try {
    const habits = await Habit.find().sort({ createdAt: 1 });
    res.json(habits);
  } catch (err) {
    next(err);
  }
});

// Create a habit
router.post('/', async (req, res, next) => {
  try {
    const { name, color } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }
    const habit = await Habit.create({ name, color });
    res.status(201).json(habit);
  } catch (err) {
    next(err);
  }
});

// Toggle completion for a given date
router.post('/:id/toggle', async (req, res, next) => {
  try {
    const { date } = req.body;
    if (!DATE_RE.test(date || '')) {
      return res.status(400).json({ message: 'date must be YYYY-MM-DD' });
    }
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    const idx = habit.completedDates.indexOf(date);
    if (idx >= 0) habit.completedDates.splice(idx, 1);
    else habit.completedDates.push(date);

    await habit.save();
    res.json(habit);
  } catch (err) {
    next(err);
  }
});

// Delete a habit
router.delete('/:id', async (req, res, next) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;

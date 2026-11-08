import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    color: { type: String, default: '#6366f1' },
    // Stored as 'YYYY-MM-DD' strings in the user's local calendar
    completedDates: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Habit', habitSchema);

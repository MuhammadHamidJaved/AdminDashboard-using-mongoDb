const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, required: true },
  isDone: { type: Boolean, default: false }
});

module.exports = mongoose.model('Reminder', ReminderSchema);

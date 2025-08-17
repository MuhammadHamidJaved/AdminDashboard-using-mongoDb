const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  progress: { type: Number, default: 0 },
  target: { type: Number, required: true },
  deadline: { type: Date }
});

module.exports = mongoose.model('Goal', GoalSchema);

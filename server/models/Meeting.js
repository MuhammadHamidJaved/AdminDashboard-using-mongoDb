const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  participants: [{ type: String }],
  location: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model('Meeting', MeetingSchema);

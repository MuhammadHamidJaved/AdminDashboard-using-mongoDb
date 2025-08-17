const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);

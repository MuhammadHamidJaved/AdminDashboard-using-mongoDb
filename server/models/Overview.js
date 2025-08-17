const mongoose = require('mongoose');

const OverviewSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: Number, required: true }
});

module.exports = mongoose.model('Overview', OverviewSchema);

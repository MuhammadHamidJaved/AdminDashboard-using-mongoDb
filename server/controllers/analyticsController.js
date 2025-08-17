const Analytics = require('../models/Analytics');

const getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ date: -1 });
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAnalytics = async (req, res) => {
  try {
    const analytic = new Analytics(req.body);
    await analytic.save();
    res.status(201).json(analytic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAnalytics,
  createAnalytics
};

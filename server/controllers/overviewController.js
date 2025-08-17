const Overview = require('../models/Overview');

const getOverview = async (req, res) => {
  try {
    const overview = await Overview.find();
    res.json(overview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOverview = async (req, res) => {
  try {
    const overviewItem = new Overview(req.body);
    await overviewItem.save();
    res.status(201).json(overviewItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOverview = async (req, res) => {
  try {
    const overview = await Overview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!overview) {
      return res.status(404).json({ error: 'Overview item not found' });
    }
    res.json(overview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOverview,
  createOverview,
  updateOverview
};

const Meeting = require('../models/Meeting');

const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ date: 1 });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMeeting = async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).json(meeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }
    res.json(meeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }
    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting
};

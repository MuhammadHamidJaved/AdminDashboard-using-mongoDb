const Reminder = require('../models/Reminder');

const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ date: 1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReminder = async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    res.json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    res.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder
};

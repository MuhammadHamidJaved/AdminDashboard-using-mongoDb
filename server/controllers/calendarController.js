const CalendarEvent = require('../models/CalendarEvent');

const getCalendarEvents = async (req, res) => {
  try {
    const events = await CalendarEvent.find().sort({ start: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCalendarEvent = async (req, res) => {
  try {
    const event = new CalendarEvent(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCalendarEvent = async (req, res) => {
  try {
    const event = await CalendarEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCalendarEvent = async (req, res) => {
  try {
    const event = await CalendarEvent.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent
};

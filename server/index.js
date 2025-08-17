
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import seed function
const seedDatabase = require('./seedData');

const Meeting = require('./models/Meeting');
const Task = require('./models/Task');
const Reminder = require('./models/Reminder');
const Goal = require('./models/Goal');
const CalendarEvent = require('./models/CalendarEvent');
const Analytics = require('./models/Analytics');
const Overview = require('./models/Overview');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  
  // Seed database with dummy data (uncomment to run once)
  // await seedDatabase();
});

// API to get all meetings
app.get('/api/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to create a meeting
app.post('/api/meetings', async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).json(meeting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API to delete a meeting
app.delete('/api/meetings/:id', async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meeting deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- Tasks ---
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Reminders ---
app.get('/api/reminders', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/reminders', async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete('/api/reminders/:id', async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reminder deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Goals ---
app.get('/api/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/goals', async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete('/api/goals/:id', async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Calendar Events ---
app.get('/api/calendar', async (req, res) => {
  try {
    const events = await CalendarEvent.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/calendar', async (req, res) => {
  try {
    const event = new CalendarEvent(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete('/api/calendar/:id', async (req, res) => {
  try {
    await CalendarEvent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Analytics ---
app.get('/api/analytics', async (req, res) => {
  try {
    const analytics = await Analytics.find();
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/analytics', async (req, res) => {
  try {
    const analytic = new Analytics(req.body);
    await analytic.save();
    res.status(201).json(analytic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete('/api/analytics/:id', async (req, res) => {
  try {
    await Analytics.findByIdAndDelete(req.params.id);
    res.json({ message: 'Analytic deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Overview ---
app.get('/api/overview', async (req, res) => {
  try {
    const overview = await Overview.find();
    res.json(overview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/overview', async (req, res) => {
  try {
    const overviewItem = new Overview(req.body);
    await overviewItem.save();
    res.status(201).json(overviewItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete('/api/overview/:id', async (req, res) => {
  try {
    await Overview.findByIdAndDelete(req.params.id);
    res.json({ message: 'Overview item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seed endpoint (for manual seeding)
app.post('/api/seed', async (req, res) => {
  try {
    await seedDatabase();
    res.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

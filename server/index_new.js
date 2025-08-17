const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const taskRoutes = require('./routes/taskRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const goalRoutes = require('./routes/goalRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const overviewRoutes = require('./routes/overviewRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Import middleware
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Import seed function
const seedDatabase = require('./seedData');

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

// Use routes
app.use('/api/tasks', taskRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/analytics', analyticsRoutes);

// Seed endpoint (for manual seeding)
app.post('/api/seed', async (req, res) => {
  try {
    await seedDatabase();
    res.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

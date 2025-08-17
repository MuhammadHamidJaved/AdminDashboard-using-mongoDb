const mongoose = require('mongoose');
const Task = require('./models/Task');
const Meeting = require('./models/Meeting');
const Goal = require('./models/Goal');
const Reminder = require('./models/Reminder');
const CalendarEvent = require('./models/CalendarEvent');
const Analytics = require('./models/Analytics');
const Overview = require('./models/Overview');

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Task.deleteMany({});
    await Meeting.deleteMany({});
    await Goal.deleteMany({});
    await Reminder.deleteMany({});
    await CalendarEvent.deleteMany({});
    await Analytics.deleteMany({});
    await Overview.deleteMany({});

    // Seed Tasks
    const tasks = [
      {
        title: "Complete Dashboard UI",
        description: "Finish the user interface for the admin dashboard",
        status: "In progress",
        dueDate: new Date('2025-08-20'),
        priority: "High"
      },
      {
        title: "Database Migration",
        description: "Migrate user data to new database schema",
        status: "Complete",
        dueDate: new Date('2025-08-15'),
        priority: "Medium"
      },
      {
        title: "API Testing",
        description: "Test all REST API endpoints",
        status: "Closed",
        dueDate: new Date('2025-08-18'),
        priority: "High"
      },
      {
        title: "User Authentication",
        description: "Implement JWT-based authentication",
        status: "In progress",
        dueDate: new Date('2025-08-25'),
        priority: "High"
      }
    ];
    await Task.insertMany(tasks);

    // Seed Meetings
    const meetings = [
      {
        title: "Team Standup",
        date: new Date('2025-08-18'),
        time: "09:00 AM",
        participants: ["John Doe", "Jane Smith", "Mike Johnson"],
        location: "Conference Room A",
        notes: "Daily progress update"
      },
      {
        title: "Client Review",
        date: new Date('2025-08-19'),
        time: "02:00 PM",
        participants: ["Sarah Wilson", "Client Team"],
        location: "Zoom",
        notes: "Project milestone review"
      },
      {
        title: "Sprint Planning",
        date: new Date('2025-08-21'),
        time: "10:00 AM",
        participants: ["Development Team", "Product Owner"],
        location: "Conference Room B",
        notes: "Plan next sprint activities"
      }
    ];
    await Meeting.insertMany(meetings);

    // Seed Goals
    const goals = [
      {
        title: "Complete Project Alpha",
        progress: 75,
        target: 100,
        deadline: new Date('2025-09-01')
      },
      {
        title: "Increase Test Coverage",
        progress: 60,
        target: 90,
        deadline: new Date('2025-08-30')
      },
      {
        title: "Performance Optimization",
        progress: 30,
        target: 100,
        deadline: new Date('2025-09-15')
      }
    ];
    await Goal.insertMany(goals);

    // Seed Reminders
    const reminders = [
      {
        message: "Submit weekly report",
        date: new Date('2025-08-18'),
        isDone: false
      },
      {
        message: "Call insurance company",
        date: new Date('2025-08-19'),
        isDone: false
      },
      {
        message: "Team lunch planning",
        date: new Date('2025-08-20'),
        isDone: true
      },
      {
        message: "Update project documentation",
        date: new Date('2025-08-22'),
        isDone: false
      }
    ];
    await Reminder.insertMany(reminders);

    // Seed Calendar Events
    const events = [
      {
        title: "Product Demo",
        start: new Date('2025-08-20T14:00:00'),
        end: new Date('2025-08-20T15:30:00'),
        location: "Main Hall",
        description: "Quarterly product demonstration"
      },
      {
        title: "Code Review Session",
        start: new Date('2025-08-21T10:00:00'),
        end: new Date('2025-08-21T11:00:00'),
        location: "Dev Room",
        description: "Weekly code review meeting"
      },
      {
        title: "Client Presentation",
        start: new Date('2025-08-23T16:00:00'),
        end: new Date('2025-08-23T17:00:00'),
        location: "Zoom",
        description: "Final project presentation"
      }
    ];
    await CalendarEvent.insertMany(events);

    // Seed Analytics
    const analytics = [
      { type: "tasks_completed", value: 12, date: new Date('2025-08-17') },
      { type: "meetings_attended", value: 8, date: new Date('2025-08-17') },
      { type: "goals_achieved", value: 3, date: new Date('2025-08-17') },
      { type: "productivity_score", value: 85, date: new Date('2025-08-17') }
    ];
    await Analytics.insertMany(analytics);

    // Seed Overview
    const overview = [
      { key: "total_tasks", value: 24 },
      { key: "completed_tasks", value: 18 },
      { key: "pending_meetings", value: 5 },
      { key: "active_goals", value: 7 },
      { key: "overdue_items", value: 2 }
    ];
    await Overview.insertMany(overview);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;

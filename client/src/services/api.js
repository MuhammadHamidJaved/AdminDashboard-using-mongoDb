import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tasks API
export const taskAPI = {
  getAll: () => api.get('/tasks'),
  create: (task) => api.post('/tasks', task),
  update: (id, task) => api.put(`/tasks/${id}`, task),
  delete: (id) => api.delete(`/tasks/${id}`)
};

// Meetings API
export const meetingAPI = {
  getAll: () => api.get('/meetings'),
  create: (meeting) => api.post('/meetings', meeting),
  update: (id, meeting) => api.put(`/meetings/${id}`, meeting),
  delete: (id) => api.delete(`/meetings/${id}`)
};

// Goals API
export const goalAPI = {
  getAll: () => api.get('/goals'),
  create: (goal) => api.post('/goals', goal),
  update: (id, goal) => api.put(`/goals/${id}`, goal),
  delete: (id) => api.delete(`/goals/${id}`)
};

// Reminders API
export const reminderAPI = {
  getAll: () => api.get('/reminders'),
  create: (reminder) => api.post('/reminders', reminder),
  update: (id, reminder) => api.put(`/reminders/${id}`, reminder),
  delete: (id) => api.delete(`/reminders/${id}`)
};

// Calendar API
export const calendarAPI = {
  getAll: () => api.get('/calendar'),
  create: (event) => api.post('/calendar', event),
  update: (id, event) => api.put(`/calendar/${id}`, event),
  delete: (id) => api.delete(`/calendar/${id}`)
};

// Overview API
export const overviewAPI = {
  getAll: () => api.get('/overview'),
  create: (overview) => api.post('/overview', overview),
  update: (id, overview) => api.put(`/overview/${id}`, overview)
};

// Analytics API
export const analyticsAPI = {
  getAll: () => api.get('/analytics'),
  create: (analytics) => api.post('/analytics', analytics)
};

// Seed API
export const seedAPI = {
  seedDatabase: () => api.post('/seed')
};

export default api;

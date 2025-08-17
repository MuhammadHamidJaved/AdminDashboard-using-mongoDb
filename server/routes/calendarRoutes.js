const express = require('express');
const {
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent
} = require('../controllers/calendarController');

const router = express.Router();

router.route('/').get(getCalendarEvents).post(createCalendarEvent);
router.route('/:id').put(updateCalendarEvent).delete(deleteCalendarEvent);

module.exports = router;

const express = require('express');
const {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder
} = require('../controllers/reminderController');

const router = express.Router();

router.route('/').get(getReminders).post(createReminder);
router.route('/:id').put(updateReminder).delete(deleteReminder);

module.exports = router;

const express = require('express');
const {
  getAnalytics,
  createAnalytics
} = require('../controllers/analyticsController');

const router = express.Router();

router.route('/').get(getAnalytics).post(createAnalytics);

module.exports = router;

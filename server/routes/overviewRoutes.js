const express = require('express');
const {
  getOverview,
  createOverview,
  updateOverview
} = require('../controllers/overviewController');

const router = express.Router();

router.route('/').get(getOverview).post(createOverview);
router.route('/:id').put(updateOverview);

module.exports = router;

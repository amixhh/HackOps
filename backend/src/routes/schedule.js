const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const auth = require('../middleware/auth');

// POST /api/schedule/availability
router.post('/availability', auth, scheduleController.setAvailability);

// GET /api/schedule/availability/:doctorId
router.get('/availability/:doctorId', auth, scheduleController.getAvailability);

// GET /api/schedule/slots/:doctorId
router.get('/slots/:doctorId', auth, scheduleController.getAvailableSlots);

module.exports = router;

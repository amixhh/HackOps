const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// GET /api/users/profile
router.get('/profile', auth, userController.getProfile);

// PUT /api/users/profile
router.put('/profile', auth, userController.updateProfile);

// GET /api/users/doctors
router.get('/doctors', auth, userController.getDoctors);

// GET /api/users/patients
router.get('/patients', auth, userController.getPatients);

module.exports = router;

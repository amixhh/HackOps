const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const auth = require('../middleware/auth');

// POST /api/consultation
router.post('/', auth, consultationController.createConsultation);

// GET /api/consultation/:id
router.get('/:id', auth, consultationController.getConsultation);

// PUT /api/consultation/:id/status
router.put(
  '/:id/status',
  auth,
  consultationController.updateConsultationStatus
);

// POST /api/consultation/:id/transcription
router.post(
  '/:id/transcription',
  auth,
  consultationController.saveTranscription
);

module.exports = router;

const express = require('express');
const router = express.Router();
const transcriptionController = require('../controllers/transcriptionController');
const auth = require('../middleware/auth');

// POST /api/transcription/:consultationId/start
router.post(
  '/:consultationId/start',
  auth,
  transcriptionController.startTranscription
);

// POST /api/transcription/:consultationId/save
router.post(
  '/:consultationId/save',
  auth,
  transcriptionController.saveTranscription
);

// GET /api/transcription/:consultationId
router.get('/:consultationId', auth, transcriptionController.getTranscription);

module.exports = router;

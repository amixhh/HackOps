const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const auth = require('../middleware/auth');
const paymentVerification = require('../middleware/paymentVerification');

// POST /api/video/room/:consultationId
router.post(
  '/room/:consultationId',
  auth,
  paymentVerification,
  videoController.createRoom
);

// POST /api/video/waiting-room/:consultationId
router.post(
  '/waiting-room/:consultationId',
  auth,
  videoController.createWaitingRoom
);

// DELETE /api/video/room/:roomName
router.delete('/room/:roomName', auth, videoController.endRoom);

module.exports = router;

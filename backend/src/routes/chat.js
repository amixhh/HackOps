const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

// GET /api/chat/:consultationId/history
router.get('/:consultationId/history', auth, chatController.getChatHistory);

// POST /api/chat/:consultationId/message
router.post('/:consultationId/message', auth, chatController.saveMessage);

module.exports = router;

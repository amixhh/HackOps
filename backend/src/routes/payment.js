const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

// POST /api/payment
router.post('/', auth, paymentController.createPayment);

// GET /api/payment/status/:consultationId
router.get('/status/:consultationId', auth, paymentController.getPaymentStatus);

module.exports = router;

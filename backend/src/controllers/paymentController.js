const PaymentService = require('../services/PaymentService');
const Consultation = require('../models/Consultation');

class PaymentController {
  async createPayment(req, res) {
    try {
      const { amount, currency, sourceId, consultationId } = req.body;

      // Process payment
      const payment = await PaymentService.createPayment(
        amount,
        currency,
        sourceId
      );

      // Update consultation payment status
      const consultation = await Consultation.findById(consultationId);
      consultation.paymentStatus = 'completed';
      await consultation.save();

      res.json({
        success: true,
        payment,
        consultation,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error processing payment', error: error.message });
    }
  }

  async getPaymentStatus(req, res) {
    try {
      const consultation = await Consultation.findById(
        req.params.consultationId
      );

      if (!consultation) {
        return res.status(404).json({ message: 'Consultation not found' });
      }

      res.json({
        paymentStatus: consultation.paymentStatus,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching payment status',
        error: error.message,
      });
    }
  }
}

module.exports = new PaymentController();

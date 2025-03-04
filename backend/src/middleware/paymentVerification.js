const Consultation = require('../models/Consultation');

module.exports = async (req, res, next) => {
  try {
    const consultationId = req.params.id;
    const consultation = await Consultation.findById(consultationId);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    if (consultation.paymentStatus !== 'completed') {
      return res.status(403).json({
        message: 'Payment required before joining consultation',
      });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error verifying payment', error: error.message });
  }
};

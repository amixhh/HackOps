const Consultation = require('../models/Consultation');
const ChatService = require('../services/ChatService');

class ChatController {
  async getChatHistory(req, res) {
    try {
      const consultation = await Consultation.findById(
        req.params.consultationId
      );

      if (!consultation) {
        return res.status(404).json({ message: 'Consultation not found' });
      }

      // Verify user is part of the consultation
      if (
        consultation.patientId.toString() !== req.userData.userId &&
        consultation.doctorId.toString() !== req.userData.userId
      ) {
        return res
          .status(403)
          .json({ message: 'Not authorized to view this chat' });
      }

      res.json(consultation.chatHistory);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching chat history', error: error.message });
    }
  }

  async saveMessage(req, res) {
    try {
      const { message } = req.body;
      const consultationId = req.params.consultationId;
      const consultation = await Consultation.findById(consultationId);

      if (!consultation) {
        return res.status(404).json({ message: 'Consultation not found' });
      }

      // Verify user is part of the consultation
      if (
        consultation.patientId.toString() !== req.userData.userId &&
        consultation.doctorId.toString() !== req.userData.userId
      ) {
        return res
          .status(403)
          .json({ message: 'Not authorized to send messages' });
      }

      const savedMessage = await ChatService.saveMessage(consultationId, {
        sender: req.userData.userId,
        message,
        timestamp: new Date(),
      });

      res.json(savedMessage);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error saving message', error: error.message });
    }
  }
}

module.exports = new ChatController();

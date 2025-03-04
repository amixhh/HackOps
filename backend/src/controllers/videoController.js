const VideoService = require('../services/VideoService');
const Consultation = require('../models/Consultation');

class VideoController {
  async createRoom(req, res) {
    try {
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
          .json({ message: 'Not authorized for this consultation' });
      }

      const roomUrl = await VideoService.createRoom(consultationId);
      res.json({ roomUrl });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error creating video room', error: error.message });
    }
  }

  async createWaitingRoom(req, res) {
    try {
      const consultationId = req.params.consultationId;
      const consultation = await Consultation.findById(consultationId);

      if (!consultation) {
        return res.status(404).json({ message: 'Consultation not found' });
      }

      // Only patients should be in waiting room
      if (req.userData.role !== 'patient') {
        return res
          .status(403)
          .json({ message: 'Only patients can join waiting room' });
      }

      const roomUrl = await VideoService.createWaitingRoom(consultationId);
      res.json({ roomUrl });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error creating waiting room', error: error.message });
    }
  }

  async endRoom(req, res) {
    try {
      const { roomName } = req.params;
      await VideoService.endRoom(roomName);
      res.json({ message: 'Room ended successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error ending video room', error: error.message });
    }
  }
}

module.exports = new VideoController();

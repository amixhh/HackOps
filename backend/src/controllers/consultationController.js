const Consultation = require('../models/Consultation');
const VideoService = require('../services/VideoService');
const TranscriptionService = require('../services/TranscriptionService');

class ConsultationController {
  async createConsultation(req, res) {
    try {
      const { patientId, doctorId, specialty, startTime } = req.body;

      const consultation = new Consultation({
        patientId,
        doctorId,
        specialty,
        startTime,
      });

      await consultation.save();

      // Create video room
      const roomUrl = await VideoService.createRoom(consultation._id);

      res.status(201).json({
        consultation,
        roomUrl,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error creating consultation', error: error.message });
    }
  }

  async getConsultation(req, res) {
    try {
      const consultation = await Consultation.findById(req.params.id)
        .populate('patientId', 'name email')
        .populate('doctorId', 'name email specialty');

      if (!consultation) {
        return res.status(404).json({ message: 'Consultation not found' });
      }

      res.json(consultation);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching consultation', error: error.message });
    }
  }

  async updateConsultationStatus(req, res) {
    try {
      const { status } = req.body;
      const consultation = await Consultation.findById(req.params.id);

      if (!consultation) {
        return res.status(404).json({ message: 'Consultation not found' });
      }

      consultation.status = status;
      if (status === 'completed') {
        consultation.endTime = new Date();
      }

      await consultation.save();
      res.json(consultation);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error updating consultation', error: error.message });
    }
  }

  async saveTranscription(req, res) {
    try {
      const { audioBuffer } = req.body;
      const consultationId = req.params.id;

      const transcript = await TranscriptionService.transcribeAudio(
        audioBuffer
      );
      const entities = await TranscriptionService.analyzeTranscript(transcript);

      const consultation = await Consultation.findById(consultationId);
      consultation.transcription = transcript;
      await consultation.save();

      res.json({ transcript, entities });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error saving transcription', error: error.message });
    }
  }
}

module.exports = new ConsultationController();

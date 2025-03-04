const TranscriptionService = require('../services/TranscriptionService');
const Consultation = require('../models/Consultation');

class TranscriptionController {
  async startTranscription(req, res) {
    try {
      const { audioStream } = req.body;
      const consultationId = req.params.consultationId;

      const consultation = await Consultation.findById(consultationId);
      if (!consultation) {
        return res.status(404).json({ message: 'Consultation not found' });
      }

      const transcript = await TranscriptionService.startRealtimeTranscription(
        audioStream
      );
      res.json({ transcript });
    } catch (error) {
      res.status(500).json({
        message: 'Error starting transcription',
        error: error.message,
      });
    }
  }

  async saveTranscription(req, res) {
    try {
      const { transcript } = req.body;
      const consultationId = req.params.consultationId;

      const consultation = await Consultation.findById(consultationId);
      if (!consultation) {
        return res.status(404).json({ message: 'Consultation not found' });
      }

      consultation.transcription = transcript;
      await consultation.save();

      const entities = await TranscriptionService.analyzeTranscript(transcript);
      res.json({ transcript, entities });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error saving transcription', error: error.message });
    }
  }

  async getTranscription(req, res) {
    try {
      const consultation = await Consultation.findById(
        req.params.consultationId
      );
      if (!consultation) {
        return res.status(404).json({ message: 'Consultation not found' });
      }

      res.json({ transcription: consultation.transcription });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching transcription',
        error: error.message,
      });
    }
  }
}

module.exports = new TranscriptionController();

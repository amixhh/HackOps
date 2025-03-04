const { createClient } = require('@deepgram/sdk');
const {
  ComprehendMedicalClient,
  DetectEntitiesV2Command,
} = require('@aws-sdk/client-comprehendmedical');

class TranscriptionService {
  constructor() {
    // Initialize Deepgram client
    this.deepgram = createClient(process.env.DEEPGRAM_API_KEY);

    // Initialize AWS Comprehend Medical with v3 SDK
    this.comprehendMedical = new ComprehendMedicalClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async transcribeAudio(audioBuffer) {
    try {
      const response = await this.deepgram.transcribe({
        buffer: audioBuffer,
        mimetype: 'audio/webm',
        options: {
          smart_format: true,
          model: 'general',
          language: 'en-US',
        },
      });

      return response.results.channels[0].alternatives[0].transcript;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  }

  async analyzeTranscript(transcript) {
    try {
      const command = new DetectEntitiesV2Command({
        Text: transcript,
      });

      const result = await this.comprehendMedical.send(command);
      return result.Entities;
    } catch (error) {
      console.error('Error analyzing transcript:', error);
      throw error;
    }
  }

  async startRealtimeTranscription(audioStream) {
    try {
      // Using v3 format for real-time transcription
      const project = this.deepgram.projects.get(
        process.env.DEEPGRAM_PROJECT_ID
      );
      const connection = await project.connect({
        options: {
          smart_format: true,
          model: 'general',
          language: 'en-US',
          interim_results: true,
        },
      });

      connection.on('transcription', (data) => {
        const { transcript, is_final } = data;
        if (is_final) {
          this.analyzeTranscript(transcript);
        }
        return transcript;
      });

      audioStream.pipe(connection);
    } catch (error) {
      console.error('Error in real-time transcription:', error);
      throw error;
    }
  }
}

module.exports = new TranscriptionService();

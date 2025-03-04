const axios = require('axios');

class VideoService {
  constructor() {
    this.apiKey = process.env.DAILY_API_KEY;
    this.baseURL = 'https://api.daily.co/v1';
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  async createRoom(consultationId) {
    try {
      const response = await this.axiosInstance.post('/rooms', {
        name: `consultation-${consultationId}`,
        properties: {
          max_participants: 2,
          enable_chat: true,
          enable_recording: false,
          exp: Math.round(Date.now() / 1000) + 3600, // Room expires in 1 hour
        },
      });
      return `https://your-domain.daily.co/${response.data.name}`;
    } catch (error) {
      console.error('Error creating video room:', error);
      throw error;
    }
  }

  async endRoom(roomName) {
    try {
      await this.axiosInstance.delete(`/rooms/${roomName}`);
    } catch (error) {
      console.error('Error ending video room:', error);
      throw error;
    }
  }

  async createWaitingRoom(consultationId) {
    try {
      const response = await this.axiosInstance.post('/rooms', {
        name: `waiting-${consultationId}`,
        properties: {
          max_participants: 1,
          enable_chat: false,
          enable_recording: false,
          exp: Math.round(Date.now() / 1000) + 7200, // 2 hours
          waiting_room: true,
        },
      });
      return `https://pratt.daily.co/${response.data.name}`;
    } catch (error) {
      console.error('Error creating waiting room:', error);
      throw error;
    }
  }
}

module.exports = new VideoService();

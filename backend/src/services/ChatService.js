const WebSocket = require('ws');

class ChatService {
  constructor() {
    this.wss = new WebSocket.Server({ noServer: true });
    this.rooms = new Map();

    this.wss.on('connection', (ws, consultationId) => {
      if (!this.rooms.has(consultationId)) {
        this.rooms.set(consultationId, new Set());
      }
      this.rooms.get(consultationId).add(ws);

      ws.on('message', async (message) => {
        const parsedMessage = JSON.parse(message);
        await this.saveMessage(consultationId, parsedMessage);
        this.broadcastToRoom(consultationId, parsedMessage);
      });

      ws.on('close', () => {
        this.rooms.get(consultationId).delete(ws);
      });
    });
  }

  broadcastToRoom(consultationId, message) {
    this.rooms.get(consultationId).forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  async saveMessage(consultationId, message) {
    const consultation = await Consultation.findById(consultationId);
    consultation.chatHistory.push({
      sender: message.sender,
      message: message.text,
      timestamp: new Date(),
    });
    await consultation.save();
  }
}

module.exports = new ChatService();

const { SquareClient } = require('square');
const { v4: uuid } = require('uuid');

class PaymentService {
  constructor() {
    this.client = new SquareClient({
      token: process.env.SQUARE_ACCESS_TOKEN,
    });
  }

  async createPayment(amount, currency, sourceId) {
    try {
      const response = await this.client.payments.create({
        idempotencyKey: uuid(),
        amountMoney: {
          amount: BigInt(amount),
          currency: currency,
        },
        sourceId: sourceId,
        autocomplete: true,
      });

      return response.result;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }
}

module.exports = new PaymentService();

const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: Date,
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    consultationNotes: {
      type: String,
      default: '',
    },
    transcription: {
      type: String,
      default: '',
    },
    chatHistory: [
      {
        sender: String,
        message: String,
        timestamp: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Encrypt sensitive fields before saving
consultationSchema.pre('save', async function (next) {
  if (this.isModified('consultationNotes')) {
    this.consultationNotes = await encrypt(this.consultationNotes);
  }
  next();
});

module.exports = mongoose.model('Consultation', consultationSchema);

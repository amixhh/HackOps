require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const authRoutes = require('./routes/auth');
const consultationRoutes = require('./routes/consultation');
const paymentRoutes = require('./routes/payment');
const userRoutes = require('./routes/user');
const scheduleRoutes = require('./routes/schedule');
const videoRoutes = require('./routes/video');
const chatRoutes = require('./routes/chat');
const transcriptionRoutes = require('./routes/transcription');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/transcription', transcriptionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

# API Documentation

## Authentication Endpoints

### POST /api/auth/register

Register a new user.

- Body:
  - `name`: string
  - `email`: string
  - `password`: string
  - `role`: string ('patient' or 'doctor')
  - `specialty`: string (required if role is 'doctor')
- Returns: User object and JWT token

### POST /api/auth/login

Login existing user.

- Body:
  - `email`: string
  - `password`: string
- Returns: User object and JWT token

## Consultation Endpoints

### POST /api/consultations

Create a new consultation.

- Body:
  - `patientId`: string
  - `doctorId`: string
  - `specialty`: string
  - `startTime`: date
- Returns: Consultation object and video room URL

### GET /api/consultations/:id

Get consultation by ID.

- Parameters:
  - `id`: Consultation ID
- Returns: Populated consultation object with patient and doctor details

## Transcription Endpoints

### POST /api/transcriptions/:consultationId/start

Start real-time transcription for consultation.

- Parameters:
  - `consultationId`: Consultation ID
- Body:
  - `audioStream`: Audio stream data
- Returns: Transcript

### POST /api/transcriptions/:consultationId/save

Save transcription for consultation.

- Parameters:
  - `consultationId`: Consultation ID
- Body:
  - `transcript`: string
- Returns: Saved transcript and analyzed medical entities

### GET /api/transcriptions/:consultationId

Get transcription for consultation.

- Parameters:
  - `consultationId`: Consultation ID
- Returns: Consultation transcription

## Environment Variables Required

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port number (default: 3000)
- `DEEPGRAM_API_KEY`: API key for Deepgram transcription service
- `AWS_ACCESS_KEY_ID`: AWS access key for Comprehend Medical
- `AWS_SECRET_ACCESS_KEY`: AWS secret key for Comprehend Medical
- `AWS_REGION`: AWS region for Comprehend Medical service

## Payment Endpoints

### POST /api/payment/create-payment

Create a payment intent for consultation.

- Body:
  - `amount`: number (in cents)
  - `currency`: string (default: 'usd')
  - `consultationId`: string
- Returns: Payment intent details from Square

### POST /api/payment/confirm-payment

Confirm a payment for consultation.

- Body:
  - `paymentId`: string
  - `consultationId`: string
- Returns: Payment confirmation details

## User Endpoints

### GET /api/users/profile

Get current user profile.

- Headers:
  - `Authorization`: Bearer token
- Returns: User profile details

### PUT /api/users/profile

Update user profile.

- Headers:
  - `Authorization`: Bearer token
- Body:
  - `name`: string (optional)
  - `email`: string (optional)
  - `specialty`: string (optional, for doctors)
- Returns: Updated user profile

## Schedule Endpoints

### POST /api/schedule/availability

Set doctor availability.

- Headers:
  - `Authorization`: Bearer token
- Body:
  - `slots`: array of time slots
- Returns: Updated availability

### GET /api/schedule/available-slots

Get available slots for a doctor.

- Parameters:
  - `doctorId`: string
  - `date`: date
- Returns: Array of available time slots

## Video Endpoints

### POST /api/video/room

Create a video consultation room.

- Body:
  - `consultationId`: string
- Returns: Room connection details

### GET /api/video/token

Get video room access token.

- Parameters:
  - `roomId`: string
- Returns: Access token for video room

## Chat Endpoints

### POST /api/chat/message

Send a chat message.

- Body:
  - `consultationId`: string
  - `message`: string
  - `senderId`: string
- Returns: Created message

### GET /api/chat/:consultationId

Get chat history for consultation.

- Parameters:
  - `consultationId`: string
- Returns: Array of chat messages

## Additional Dependencies

- `square`: Payment processing
- `@deepgram/sdk`: Real-time speech-to-text
- `@aws-sdk/client-comprehendmedical`: Medical entity extraction
- `ws`: WebSocket support for real-time features
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT authentication
- `cors`: Cross-origin resource sharing
- `mongoose`: MongoDB object modeling
- `express`: Web framework
- `dotenv`: Environment variable management

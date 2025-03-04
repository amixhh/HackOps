import React, { useState, useEffect } from 'react';

function Transcription({ isCallConnected }) {
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    if (isCallConnected) {
      // Simulate real-time transcription
      const mockTranscript = [
        {
          id: 1,
          speaker: 'Doctor',
          text: "Hello, I'm Dr. Johnson. How are you feeling today?",
          timestamp: '00:05'
        },
        {
          id: 2,
          speaker: 'Patient',
          text: "Hi doctor, I've been having some headaches for the past week.",
          timestamp: '00:10'
        }
      ];

      const timer = setTimeout(() => {
        setTranscript(mockTranscript);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isCallConnected]);

  return (
    <div className="transcription-container">
      <h3>Live Transcription</h3>
      <div className="transcript-content">
        {transcript.map((entry) => (
          <div key={entry.id} className="transcript-entry">
            <span className="timestamp">{entry.timestamp}</span>
            <span className="speaker">{entry.speaker}:</span>
            <span className="text">{entry.text}</span>
          </div>
        ))}
        {!isCallConnected && (
          <div className="connecting-message">
            Waiting for connection...
          </div>
        )}
      </div>
    </div>
  );
}

export default Transcription; 
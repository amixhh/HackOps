import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../chat/Chat';
import Transcription from '../Transcription';

function VideoConsultation() {
  const { sessionId } = useParams();
  const [isCallConnected, setIsCallConnected] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  useEffect(() => {
    // Simulate connection
    const timer = setTimeout(() => setIsCallConnected(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleCamera = () => setIsCameraOn(!isCameraOn);
  const toggleMic = () => setIsMicOn(!isMicOn);

  return (
    <div className="video-consultation">
      <div className="video-main">
        <div className="video-grid">
          <div className="remote-video">
            {isCallConnected ? (
              <div className="video-placeholder">Doctor's Video</div>
            ) : (
              <div className="connecting">Connecting...</div>
            )}
          </div>
          <div className="local-video">
            <div className="video-placeholder">Your Video</div>
            {!isCameraOn && <div className="camera-off">Camera Off</div>}
            {!isMicOn && <div className="mic-off">Muted</div>}
          </div>
        </div>
        
        <div className="controls">
          <button onClick={toggleCamera}>
            {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
          </button>
          <button onClick={toggleMic}>
            {isMicOn ? 'Mute' : 'Unmute'}
          </button>
        </div>
      </div>

      <div className="consultation-sidebar">
        <Transcription isCallConnected={isCallConnected} />
        <Chat isCallConnected={isCallConnected} />
      </div>
    </div>
  );
}

export default VideoConsultation; 
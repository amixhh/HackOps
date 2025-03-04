import React, { useState, useRef, useEffect } from 'react';

function Chat({ isCallConnected }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const doctorTimeout = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    return () => {
      if (doctorTimeout.current) {
        clearTimeout(doctorTimeout.current);
      }
    };
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !isCallConnected) return;

    const message = {
      id: messages.length + 1,
      sender: 'patient',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate doctor's response
    doctorTimeout.current = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'doctor',
        text: "I see. Can you tell me more about your symptoms?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 3000);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message ${msg.sender === 'patient' ? 'sent' : 'received'}`}
          >
            <div className="message-content">{msg.text}</div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!isCallConnected}
        />
        <button 
          type="submit" 
          disabled={!isCallConnected || !newMessage.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat; 
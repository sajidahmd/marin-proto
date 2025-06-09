import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'bot', text: "Hello! How can we help you with your marine marketing needs today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (text) {
      setMessages(prev => [...prev, { type: 'user', text }]);
      setInputValue('');

      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: "Thank you for your message! A member of our team will get back to you shortly. In the meantime, feel free to explore our features or contact us directly." }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-widget" id="chat-widget">
      <div className={`chat-toggle ${isOpen ? 'active' : ''}`} id="chat-toggle" onClick={toggleChat} role="button" tabIndex={0}>
        <MessageSquare className="chat-icon" />
        <X className="close-icon" />
      </div>

      <div className={`chat-popup ${isOpen ? 'active' : ''}`} id="chat-popup">
        <div className="chat-header">
          <h3>Live Chat</h3>
          <p>We&apos;re here to help!</p>
        </div>
        <div className="chat-messages" id="chat-messages" ref={chatMessagesRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type === 'bot' ? 'bot-message' : 'user-message'}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input 
            type="text" 
            id="chat-input-field" // Renamed id to avoid conflict with css selector
            placeholder="Type your message..." 
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button id="send-message-btn" onClick={handleSendMessage}> {/* Renamed id */}
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}

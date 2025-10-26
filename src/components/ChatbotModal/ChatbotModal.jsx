import { useState } from "react";
import "./ChatbotModal.css";

const ChatbotModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m SkillBot 👋 Ask me about trending skills, career tips, or projects." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simple bot response logic (can be expanded with API)
    setTimeout(() => {
      const botReply = generateBotReply(input);
      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    }, 600);
  };

  const generateBotReply = (text) => {
    const lower = text.toLowerCase();
  
    // Skill related
    if (lower.includes("react")) 
      return "React is trending! You should also check out Next.js and React Native.";
    if (lower.includes("python")) 
      return "Python is versatile! Data science and AI are booming areas.";
    if (lower.includes("mern")) 
      return "The MERN stack is powerful: MongoDB, Express, React, and Node.js. Great for full-stack projects!";
    if (lower.includes("mongo")) 
      return "MongoDB is a flexible NoSQL database, widely used in MERN stack applications.";
    if (lower.includes("node")) 
      return "Node.js allows you to run JavaScript on the server, ideal for building scalable backend services.";
    if (lower.includes("trending")) 
      return "Trending skills right now include React, Python, AI/ML, and MERN stack development.";
  
    // Career & polite responses
    if (lower.includes("career")) 
      return "For career growth, focus on in-demand skills and personal projects.";
    if (lower.includes("thank")) 
      return "You're welcome! Happy to help.";
    if (lower.includes("bye") || lower.includes("goodbye") || lower.includes("good bye")) 
      return "Goodbye! Wish you all the best with your learning and projects.";
  
    // Default fallback
    return "Interesting! Can you tell me more or ask about another skill?";
  };

  return (
    <div className="chatbot-modal-backdrop">
      <div className="chatbot-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="chatbot-title">💬 SkillBot Assistant</h2>

        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;

import React, { useState } from "react";
import { sendToVeo } from "../api/veoApi"; // backend call
import ChatBubble from "./ChatBubble";
import InputArea from "./InputArea";
import { v4 as uuidv4 } from "uuid";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (data, type = "text") => {
    // Add user message
    const userMsg = {
      id: uuidv4(),
      from: "user",
      type:
        type === "file"
          ? data.type.startsWith("image")
            ? "image"
            : "video"
          : type,
      content: type === "text" ? data : data.name,
    };
    setMessages((prev) => [...prev, userMsg]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Call backend
      const response = await sendToVeo(
        type === "text" ? data : data.name,
        type === "file"
          ? data.type.startsWith("image")
            ? "image"
            : "video"
          : type
      );

      // Add bot response
      const botMsg = {
        id: uuidv4(),
        from: "bot",
        type: response.type,
        content: response.content,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          from: "bot",
          type: "text",
          content: "Error contacting backend",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <div className="bubble bot typing">  Thinking...</div>}
      </div>
      <InputArea onSend={handleSend} />
    </div>
  );
}

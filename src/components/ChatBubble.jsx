import React from "react";
import ReactPlayer from "react-player";

export default function ChatBubble({ message }) {
  return (
    <div className={`bubble ${message.from === "user" ? "user" : "bot"} animate-bubble`}>
      {message.type === "text" && <p>{message.content}</p>}
      {message.type === "image" && <img src={message.content} alt="response" className="bubble-img" />}
      {message.type === "video" && <ReactPlayer url={message.content} controls width="300px" height="200px" />}
    </div>
  );
}

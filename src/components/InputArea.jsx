import React, { useState } from "react";

export default function InputArea({ onSend }) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (file) {
      onSend(file, file.type.startsWith("image") ? "image" : "video");
      setFile(null);
    } else if (input.trim() !== "") {
      onSend(input, "text");
      setInput("");
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        value={input}
        placeholder="Type your prompt..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/*,video/*"
      />
      <button onClick={handleSend} className="send-btn">Send</button>
    </div>
  );
}

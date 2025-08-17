// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const API_KEY = process.env.GENERATIVE_LANGUAGE_API_KEY;   //generated api key in .env file
if (!API_KEY) {
  console.error("Google Generative Language API key is missing!");
  process.exit(1);
}


app.post("/api/veo", async (req, res) => {
  try {
    const { prompt, type = "text" } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const endpoint =
      type === "image"
        ? "https://generativelanguage.googleapis.com/v1beta2/models/image-bison-001:generateImage"
        : "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText";

    const body =
      type === "image"
        ? { prompt, size: "1024x1024" }
        : { prompt: { text: prompt }, temperature: 0.7, maxOutputTokens: 500 };

    const response = await fetch(`${endpoint}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    
    const content =
      type === "image"
        ? data.images?.[0]?.imageUri || "No image returned"
        : data.candidates?.[0]?.output || "No response from Google AI";

    res.json({ type, content });
  } catch (err) {
    console.error("Error calling Google Gemini API:", err);
    res.status(500).json({ type: "text", content: "Error calling Google API" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

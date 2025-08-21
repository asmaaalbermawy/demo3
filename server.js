import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!keyPath) {
  console.error("GOOGLE_APPLICATION_CREDENTIALS not set in .env");
  process.exit(1);
}

if (!path.isAbsolute(keyPath)) {
  keyPath = path.join(__dirname, keyPath);
}

console.log("Resolved absolute key path =", keyPath);

if (!fs.existsSync(keyPath)) {
  console.error("service-account.json NOT found!");
  process.exit(1);
}

console.log("service-account.json found and ready!");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, type } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    res.json({
      type: type || "text",
      content: prompt,
    });
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

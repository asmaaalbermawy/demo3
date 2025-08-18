import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!keyPath) {
  console.error("❌ GOOGLE_APPLICATION_CREDENTIALS not set in .env");
  process.exit(1);
}

if (!path.isAbsolute(keyPath)) {
  keyPath = path.join(__dirname, keyPath);
}

console.log("Resolved key path =", keyPath);

// Check if file exists !!
if (!fs.existsSync(keyPath)) {
  console.error("❌ File does NOT exist at this path!");
  process.exit(1);
}

console.log("✅ File exists and ready!");

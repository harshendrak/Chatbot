/* ============================================
   Mishri AI Chatbot — Express Proxy Server
   Reads GEMINI_API_KEY from .env and proxies
   requests to the Google Gemini API.
   ============================================ */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// ---- Middleware ----
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // serve index.html, style.css, script.js

// ---- Gemini Config ----
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemma-3-27b-it";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;

// ---- Chat Endpoint (streaming) ----
app.post("/api/chat", async (req, res) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_api_key_here") {
    return res.status(500).json({ error: "GEMINI_API_KEY not set in .env file" });
  }

  const { messages } = req.body;

  // Convert our message format to Gemini format
  let systemInstruction = "";
  const contents = [];

  for (const msg of messages) {
    if (msg.role === "system") {
      systemInstruction = msg.content;
    } else {
      contents.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      });
    }
  }

  // Prepend system prompt into the first user message for Gemma models
  if (systemInstruction && contents.length > 0 && contents[0].role === "user") {
    contents[0].parts[0].text =
      `[System Instruction]: ${systemInstruction}\n\n[User]: ${contents[0].parts[0].text}`;
  }

  const geminiBody = {
    contents,
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      maxOutputTokens: 2048
    }
  };

  try {
    // Set up SSE headers so we can stream to the client
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error:", response.status, errText);
      res.write(`data: ${JSON.stringify({ error: `Gemini API returned ${response.status}` })}\n\n`);
      res.write("data: [DONE]\n\n");
      return res.end();
    }

    // Pipe the SSE stream from Gemini to the client
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      // Forward the raw SSE data to client
      res.write(chunk);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Server Error:", err.message);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
  }
});

// ---- Fallback: serve index.html ----
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ---- Start ----
app.listen(PORT, () => {
  console.log(`\n  🌸 Mishri Chatbot Server running at http://localhost:${PORT}\n`);
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_api_key_here") {
    console.log("  ⚠️  GEMINI_API_KEY not set! Edit your .env file.\n");
  } else {
    console.log("  ✅ Gemini API key loaded successfully.\n");
  }
});

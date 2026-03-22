# 🌸 Mishri — AI Persona Chatbot

A beautiful, interactive AI chatbot with a warm persona named **Mishri** — a creative, kind, 19-year-old who loves arts, crafts, dancing, and making your day brighter.

Built with a premium **"Radiant Atelier"** design system (crafted via Google Stitch), powered by **Google Gemini API** with real-time streaming responses.

![Mishri Chatbot Preview](https://img.shields.io/badge/Powered_by-Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

---

## ✨ Features

- 🌸 **Persona-Based AI** — Mishri responds with warmth, empathy, and her unique personality
- ⚡ **Streaming Responses** — Real-time token-by-token message rendering via SSE
- 💬 **Quick-Start Chips** — One-click conversation starters to break the ice
- 🎨 **Three Views** — Chat, About Mishri, and a Creative Gallery
- 📱 **Fully Responsive** — Works seamlessly on desktop and mobile
- 🔒 **Secure API Key** — Key stays server-side via `.env`, never exposed to the browser
- ✨ **Premium Design** — Glassmorphism, ambient gradient blobs, soft animations

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [Google Gemini API Key](https://aistudio.google.com/apikey)

### Installation

```bash
# 1. Clone or navigate to the project
cd mishri-chatbot

# 2. Install dependencies
npm install

# 3. Add your Gemini API key
#    Open .env and replace 'your_api_key_here' with your actual key
```

### Configure `.env`

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### Run

```bash
npm start
```

Open **http://localhost:3000** in your browser and start chatting! 🌸

---

## 📁 Project Structure

```
mishri-chatbot/
├── .env             # Gemini API key (edit this)
├── server.js        # Express proxy server → Gemini API (streaming)
├── package.json     # Dependencies
├── index.html       # UI layout (sidebar, chat, about, gallery)
├── style.css        # Radiant Atelier design system
├── script.js        # Frontend chat logic & SSE parsing
└── README.md        # You are here
```

---

## 🎨 Design System — "The Radiant Atelier"

Designed using **Google Stitch** with a warm, editorial aesthetic:

| Element        | Details                                                          |
|----------------|------------------------------------------------------------------|
| **Palette**    | Soft pinks `#FFB6C1`, coral `#FF7F7F`, peach `#FFDAB9`, cream `#FFF5EE` |
| **Typography** | Plus Jakarta Sans (headings) + Be Vietnam Pro (body)             |
| **Effects**    | Glassmorphism, ambient floating blobs, micro-animations          |
| **Corners**    | Fully rounded (24px–32px) for a soft, friendly feel              |
| **Philosophy** | No hard borders — depth via tonal layering and color shifts      |

---

## 🤖 Mishri's Persona

Mishri is a **19-year-old girl** who is:

- 💖 Kind, empathetic, and always positive
- 🎨 Passionate about arts, crafts, painting, and drawing
- 💃 Can't stop dancing when music plays
- 🎤 Has a beautiful, calming singing voice
- 🍳 Loves experimenting with new recipes
- 💻 A Computer Science student
- 🌟 Has an aura that makes everyone happy

She talks gently, greets with respect, and makes you feel at home.

---

## ⚙️ Configuration

### Change the AI Model

Edit the model name in `server.js` (line 22):

```javascript
const GEMINI_MODEL = "gemma-3-27b-it"; // or "gemini-2.0-flash", etc.
```

### Supported Models

Any model available via the [Gemini API](https://ai.google.dev/gemini-api/docs/models), including:
- `gemini-2.0-flash` — Fast and capable
- `gemma-3-27b-it` — Open model, strong reasoning
- `gemini-2.0-pro` — Most capable

---

## 🛠️ Tech Stack

- **Frontend** — HTML5, Vanilla CSS, JavaScript (no frameworks)
- **Backend** — Node.js, Express
- **AI** — Google Gemini API (streaming via SSE)
- **Design** — Google Stitch

---

## 📝 License

This project is for personal/educational use. Feel free to modify and build upon it.

---

<p align="center">Made with 💖 and a lot of creativity</p>

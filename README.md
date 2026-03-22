# ⚡ FutureBlink AI Flow

A MERN stack application that lets users type a prompt, get an AI response, and visualize the flow using React Flow — with MongoDB history saving.

🔗 **Live Demo**: https://futureblink-mern-app.vercel.app/

---

## 🛠️ Tech Stack

- **MongoDB** — Saves prompt & response history
- **Express.js & Node.js** — Backend API server
- **React + Vite** — Frontend UI
- **React Flow** — Visual node-based flow diagram
- **OpenRouter API** — Free AI responses (Google Gemma)

---

## ✨ Features

- 🤖 AI-powered prompt & response flow
- 🗂️ Conversation history sidebar
- 💾 Save prompts to MongoDB
- ⏳ Animated loading dots while AI thinks
- 🕐 Timestamps on saved history
- 📱 Responsive design (mobile + desktop)

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- OpenRouter API key

### 1. Clone the repo
```bash
git clone https://github.com/adarshkumar23/futureblink-mern-app.git
cd futureblink-mern-app
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file inside `/server`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
OPENROUTER_API_KEY=your_openrouter_api_key
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📁 Project Structure
```
futureblink-mern-app/
├── server/
│   ├── index.js          # Express server
│   ├── models/
│   │   └── Prompt.js     # MongoDB schema
│   └── routes/
│       └── ai.js         # API routes
└── client/
    └── src/
        ├── App.jsx        # Main app
        ├── Sidebar.jsx    # History sidebar
        └── nodes/
            ├── InputNode.jsx   # Prompt input node
            └── ResultNode.jsx  # AI response node
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ask-ai` | Send prompt, get AI response |
| POST | `/api/save` | Save prompt & response to MongoDB |
| GET | `/api/history` | Fetch saved history |

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `OPENROUTER_API_KEY` | OpenRouter API key |

---

## 📦 Deployment

- **Frontend**: Vercel
- **Backend**: Render.com
- **Database**: MongoDB Atlas

---

Made with ❤️ by Adarsh Kumar

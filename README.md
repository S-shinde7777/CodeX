# CodeX — AI Teach-Back Code Learning Editor

**CodeX** flips the standard AI-coding-tool pattern. Instead of AI explaining code to you, **you explain your code to the AI** — and it evaluates your explanation for gaps and accuracy, based on the Feynman Technique (the idea that truly understanding something means being able to teach it simply).

Built as a 12-week diploma internship / final-year project.

Live Link:- https://codex-teachback-code-editor.vercel.app/

---

## Why CodeX

Most AI coding tools (Copilot, Cursor, ChatGPT) help students get answers faster — write the code, explain it, fix it. This encourages passive learning: students copy-paste AI output without truly understanding the logic.

CodeX does the opposite: you write code, then **teach it back** to the AI in your own words. The AI checks what you got right, what you missed, and asks a follow-up question if your explanation has gaps — closing understanding gaps instead of skipping them.

---

## Features

- **Code Editor** — Monaco Editor (the engine behind VS Code) with JavaScript and Python support
- **Code Execution** — Run code via Judge0, see output instantly
- **Teach-Back Engine** — Explain your code, get structured AI feedback (correct points / gaps / follow-up question)
- **My Files** — Save, open, and manage your code snippets
- **Explanation History** — Review all past teach-back attempts
- **Progress Dashboard** — Track total sessions, strong explanations vs. explanations with gaps
- **Auth** — Secure signup/login with JWT and hashed passwords

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, React Router |
| Code Editor | Monaco Editor (`@monaco-editor/react`) |
| Code Execution | Judge0 API |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT, bcrypt |
| AI | Groq API (Llama 3.3 70B) |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
codex-backend/
  models/         → User, CodeSnippet, TeachBackAttempt schemas
  routes/         → auth, snippets, execute, teachback routes
  middleware/     → JWT auth middleware
  server.js

codex-frontend/
  src/
    components/   → Navbar, ActivityBar, TeachBackPanel
    context/      → AuthContext (global auth state)
    pages/        → LandingPage, Login, Signup, Editor, Dashboard, History
    App.jsx
```

---

## Getting Started (Local Setup)

### Backend
```bash
cd codex-backend
npm install
# create a .env file with MONGO_URI, JWT_SECRET, GROQ_API_KEY
npm run dev
```

### Frontend
```bash
cd codex-frontend
npm install
npm run dev
```

---

## How It Works

1. Write code in the editor
2. Click **"Explain This"**
3. Type your explanation of what the code does
4. AI compares your explanation against the actual code logic
5. Get feedback: what you got right, what's missing, and a follow-up question
6. Track your progress over time in the Dashboard

---

## Future Scope

- Voice-based explanation input (Web Speech API)
- HTML/CSS live preview support
- Mistake-pattern detection across sessions
- More languages (C++, Java) with concept tagging
- Classroom mode for teachers

---

## Author

Sagar Shinde — Diploma CSE, 3rd Year

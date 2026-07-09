# 🧠 AI Study Buddy

**Smart Quiz & Flashcard Generator for Students**  
Final Internship Capstone Project — SoftGrid Solutions (AI/ML Internship)

---

## 📖 Project Overview

AI Study Buddy is a student productivity dashboard that turns any study notes or topic into an instant quiz or flashcard set using AI. It also includes a Pomodoro Timer, To-Do List, Daily Affirmations, Sticky Notes, and a Doodle Pad to help students stay focused, motivated, and organized — all wrapped in one simple, friendly dashboard.

## ✨ Features

- **📝 AI Quiz Generator** — Paste notes or type a topic, choose how many questions (3–20), and get an instant multiple-choice quiz with scoring and explanations.
- **🗂️ AI Flashcards** — Generate flip-style flashcards (term + definition) from any notes or topic for quick revision.
- **⏱️ Pomodoro Timer** — Study/Short Break/Long Break modes with Start, Pause, and Reset controls, plus keyboard shortcuts (Space to Start/Pause, R to Reset).
- **✅ To-Do List** — Add tasks with optional due dates, complete, and delete them. Saved in the browser (localStorage) so tasks persist across refreshes.
- **💛 Daily Affirmations** — A rotating set of motivational messages to keep students encouraged during study sessions.
- **📌 Sticky Notes** — Draggable, color-coded notes for quick reminders. Positions and content saved in localStorage.
- **🎨 Doodle Pad** — A freeform canvas with pencil and eraser tools, adjustable brush size and color, for sketching or thinking visually.
- **🔥 Study Streak** — Tracks consecutive days the app has been used.
- **🏠 Home Dashboard** — A central menu to access all tools in one place.

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **AI Integration:** Groq API (llama-3.3-70b-versatile)
- **Storage:** Browser localStorage (To-Do List, Sticky Notes, Streak), session-based for AI features
- **Version Control:** Git & GitHub

## 📂 Project Structure
ai-study-buddy/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env (not included — see setup below)
├── public/
│   ├── index.html
│   ├── quiz.html
│   ├── flashcards.html
│   ├── pomodoro.html
│   ├── todo.html
│   ├── affirmations.html
│   ├── stickynotes.html
│   ├── doodle.html
│   ├── style.css
│   ├── script.js
│   ├── flashcards.js
│   ├── pomodoro.js
│   ├── todo.js
│   ├── affirmations.js
│   ├── stickynotes.js
│   ├── doodle.js
│   ├── streak.js
│   └── images/
└── README.md

## ⚙️ Installation & Setup

1. **Clone the repository:**
git clone https://github.com/fizaakhtar805-code/ai-study-buddy.git
cd ai-study-buddy/backend

2. **Install dependencies:**
npm install

3. **Add your Groq API key:**
   Create a `.env` file inside the `backend` folder with:
GROQ_API_KEY=your_groq_api_key_here
   (Get a free key at [console.groq.com/keys](https://console.groq.com/keys))

4. **Start the server:**
node server.js

5. **Open the app:**
   Visit `http://localhost:5000` in your browser.

## 🎮 Usage

1. From the home dashboard, choose a tool.
2. For Quiz/Flashcards: paste your notes or type a topic, select how many items you want, and click Generate.
3. For Pomodoro: pick a mode and use Start/Pause/Reset (or keyboard shortcuts).
4. For To-Do: add tasks with an optional due date and check them off as you complete them.
5. For Affirmations: click "New Affirmation" for a fresh motivational message.
6. For Sticky Notes: type a note, click "+ Add Note", then drag it anywhere on the board.
7. For Doodle Pad: pick a color and brush size, switch between Pencil and Eraser, and sketch freely.


## 🚀 Future Improvements

- Shared/multi-user to-do list with a real database
- Quiz history and past scores
- Dark mode
- Mood tracker with AI-personalized study suggestions

## 👩‍💻 Developed By

Fiza — AI/ML Intern, SoftGrid Solutions

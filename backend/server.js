const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Groq = require("groq-sdk");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Generate Quiz
app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { content, numQuestions } = req.body;
    const questionCount = numQuestions || 5;

    const prompt = `You are a quiz generator. Based on the following study notes or topic, create exactly ${questionCount} multiple-choice questions.

Study material: "${content}"

Respond ONLY with valid JSON in this exact format, no extra text, no markdown formatting:
{
  "questions": [
    {
      "question": "question text",
      "options": ["option A", "option B", "option C", "option D"],
      "correctAnswer": "the correct option text exactly as written above",
      "explanation": "short explanation of why this is correct"
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    let text = completion.choices[0].message.content.trim();
    text = text.replace(/```json|```/g, "").trim();

    const quizData = JSON.parse(text);
    res.json(quizData);
  } catch (error) {
    console.error("Quiz generation error:", error);
    res.status(500).json({ error: "Failed to generate quiz. Please try again." });
  }
});

// Generate Flashcards
app.post("/api/generate-flashcards", async (req, res) => {
  try {
    const { content, numCards } = req.body;
    const cardCount = numCards || 6;

    const prompt = `You are a flashcard generator. Based on the following study notes or topic, create exactly ${cardCount} flashcards.

Study material: "${content}"

Respond ONLY with valid JSON in this exact format, no extra text, no markdown formatting:
{
  "flashcards": [
    {
      "term": "term or question",
      "definition": "clear, concise definition or answer"
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    let text = completion.choices[0].message.content.trim();
    text = text.replace(/```json|```/g, "").trim();

    const flashcardData = JSON.parse(text);
    res.json(flashcardData);
  } catch (error) {
    console.error("Flashcard generation error:", error);
    res.status(500).json({ error: "Failed to generate flashcards. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
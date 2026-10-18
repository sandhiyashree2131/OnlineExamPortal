const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenAI } = 
require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Online Exam Portal backend is running!" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});
app.get("/api/questions", (req, res) => {
  const questions = [
    {
      id: 1,
      subject: "JavaScript",
      topic: "Variables",
      difficulty: "Easy",
      question: "Which keyword declares a block-scoped variable?",
      options: ["var", "let", "print", "echo"],
      answer: "let"
    },
    {
      id: 2,
      subject: "JavaScript",
      topic: "Functions",
      difficulty: "Easy",
      question: "Which keyword defines a function?",
      options: ["function", "method", "define", "func"],
      answer: "function"
    }
  ];

  res.json(questions);
});
const PORT = process.env.PORT || 5000;
let createdExams = [];
app.get("/api/exams", (req, res) => {
  res.json(createdExams);
});

app.post("/api/exams", (req, res) => {
  const { title, subject } = req.body;

  if (!title || !subject) {
    return res.status(400).json({
      message: "Exam title and subject are required"
    });
  }

  const newExam = {
    id: Date.now(),
    title: title.trim(),
    subject: subject.trim(),
    createdAt: new Date().toISOString()
  };

  createdExams.push(newExam);

  res.status(201).json({
    message: "Exam created successfully",
    exam: newExam
  });
});
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("AI chat error:", error.message);
    res.status(500).json({ error: "AI assistant failed. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

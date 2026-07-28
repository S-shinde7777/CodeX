const express = require("express");
const authMiddleware = require("../middleware/auth");
const TeachBackAttempt = require("../models/TeachBackAttempt");

const router = express.Router();
router.use(authMiddleware);

router.post("/evaluate", async (req, res) => {
  try {
    const { code, language, studentExplanation } = req.body;

    const prompt = `You are evaluating a student's understanding of their own code.

Code (${language}):
${code}

Student's explanation of what this code does:
${studentExplanation}

Compare the explanation against the actual code logic. Respond ONLY with valid JSON in this exact format, nothing else:
{
  "correctPoints": ["point 1", "point 2"],
  "gaps": ["gap 1", "gap 2"],
  "followUpQuestion": "a question to help them fill the biggest gap, or empty string if explanation was complete"
}`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
        }),
      },
    );

    const data = await response.json();
    let aiText = data.choices[0].message.content;

    aiText = aiText.replace(/```json|```/g, "").trim();
    const aiFeedback = JSON.parse(aiText);

    const codePreview = code.length > 300 ? code.slice(0, 300) + "..." : code;

    const attempt = await TeachBackAttempt.create({
      userId: req.userId,
      code: codePreview,
      language,
      studentExplanation,
      aiFeedback,
    });

    res.json(attempt);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Evaluation failed", error: error.message });
  }
});
// GET history
router.get("/history", async (req, res) => {
  try {
    const attempts = await TeachBackAttempt.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(attempts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

module.exports = router;

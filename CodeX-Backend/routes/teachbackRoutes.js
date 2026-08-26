const express = require("express");
const authMiddleware = require("../middleware/auth");
const TeachBackAttempt = require("../models/TeachBackAttempt");

const router = express.Router();
router.use(authMiddleware);

router.post('/evaluate', async (req, res) => {
  try {
    const { code, language, studentExplanation, level } = req.body;

    const levelInstructions = {
      beginner: 'The student is a BEGINNER. Only check if they understood the basic logic and purpose of the code — what it does, in simple terms. Do NOT expect them to mention edge cases, error handling, time/space complexity, or advanced terminology. Be encouraging and lenient — focus on whether the core idea is understood.',
      intermediate: 'The student is at an INTERMEDIATE level. Check if they understood the logic clearly AND can explain the flow of execution step by step. Expect some awareness of common edge cases (like empty input, zero values) but don\'t require deep optimization discussion.',
      advanced: 'The student is ADVANCED. Hold them to a high standard — check for logic, execution flow, edge cases (invalid input, boundary conditions, error handling), and where relevant, time/space complexity or design tradeoffs. Be strict about completeness.'
    };

    const instruction = levelInstructions[level] || levelInstructions.beginner;

    const prompt = `You are evaluating a student's understanding of their own code. The student's explanation may be in any language (English, Hindi, Marathi, or mixed). Understand it regardless of language, but ALWAYS respond in English only, in the JSON format below.

${instruction}

Code (${language}):
${code}

Student's explanation of what this code does:
${studentExplanation}

Compare the explanation against the actual code logic, evaluating at the appropriate level described above. Respond ONLY with valid JSON in this exact format, nothing else:
{
  "correctPoints": ["point 1", "point 2"],
  "gaps": ["gap 1", "gap 2"],
  "followUpQuestion": "a question to help them fill the biggest gap, or empty string if explanation was complete"
}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    console.log('Groq response:', JSON.stringify(data));
    let aiText = data.choices[0].message.content;

    aiText = aiText.replace(/```json|```/g, '').trim();
    const aiFeedback = JSON.parse(aiText);

    const codePreview = code.length > 300 ? code.slice(0, 300) + '...' : code;

    const attempt = await TeachBackAttempt.create({
      userId: req.userId,
      code: codePreview,
      language,
      studentExplanation,
      level: level || 'beginner',
      aiFeedback
    });

    res.json(attempt);
  } catch (error) {
  console.error('TeachBack evaluation error:', error);
  res.status(500).json({ message: 'Evaluation failed', error: error.message });
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

// DELETE a teach-back attempt
router.delete('/:id', async (req, res) => {
  try {
    const attempt = await TeachBackAttempt.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;

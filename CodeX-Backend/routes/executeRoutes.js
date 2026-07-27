const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71
};

router.post('/', async (req, res) => {
  try {
    const { code, language } = req.body;
    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return res.status(400).json({ message: 'Unsupported language' });
    }

    const response = await fetch('https://ce.judge0.com/submissions?wait=true', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId
      })
    });

    const result = await response.json();

    res.json({
      stdout: result.stdout,
      stderr: result.stderr,
      status: result.status
    });
  } catch (error) {
    res.status(500).json({ message: 'Execution failed', error: error.message });
  }
});

module.exports = router;
const express = require('express');
const CodeSnippet = require('../models/CodeSnippet');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All snippet routes require login
router.use(authMiddleware);

// CREATE a new snippet
router.post('/', async (req, res) => {
  try {
    const { title, language, code } = req.body;

    const snippet = await CodeSnippet.create({
      userId: req.userId,
      title,
      language,
      code
    });

    res.status(201).json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// READ all snippets for logged-in user
router.get('/', async (req, res) => {
  try {
    const snippets = await CodeSnippet.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// READ one snippet by ID
router.get('/:id', async (req, res) => {
  try {
    const snippet = await CodeSnippet.findOne({ _id: req.params.id, userId: req.userId });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// UPDATE (save) a snippet
router.put('/:id', async (req, res) => {
  try {
    const { title, language, code } = req.body;

    const snippet = await CodeSnippet.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, language, code, updatedAt: Date.now() },
      { new: true }
    );

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// DELETE a snippet
router.delete('/:id', async (req, res) => {
  try {
    const snippet = await CodeSnippet.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;
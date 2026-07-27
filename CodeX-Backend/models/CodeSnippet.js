const mongoose = require('mongoose');

const codeSnippetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    default: 'Untitled'
  },
  language: {
    type: String,
    required: true,
    enum: ['javascript', 'python'],
    default: 'javascript'
  },
  code: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);
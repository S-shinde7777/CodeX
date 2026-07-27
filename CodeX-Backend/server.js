require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const snippetRoutes = require('./routes/snippetRoutes');
const executeRoutes = require('./routes/executeRoutes');
const teachbackRoutes = require('./routes/teachbackRoutes');



const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/snippets', snippetRoutes);
app.use('/api/execute', executeRoutes);
app.use('/api/teachback', teachbackRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'CodeX API running' });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
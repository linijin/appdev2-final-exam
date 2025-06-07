const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error(err));

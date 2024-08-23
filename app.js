const express = require('express');
const connectDB = require('./config/db');
const familyRoutes = require('./routes/familyRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Testing Branch');
});

// Use the family routes
app.use('/api/families', familyRoutes);

// Use the error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
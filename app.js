const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const familyRoutes = require('./routes/familyRoutes');
const { protect } = require('./middlewares/authMiddleware');
const app = express();
const cors = require('cors');

app.use(
  cors({
    origin: "*", // Allow requests from this origin
    credentials: true, // Allow cookies to be sent
  })
);

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Testing Branch');
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protect, familyRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

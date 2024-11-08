const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const familyRoutes = require("./routes/familyRoutes");
const { protect } = require("./middlewares/authMiddleware");
const cors = require("cors"); // Import the CORS package

const app = express();
app.use(
  cors({
    origin: "https://vaanshika.netlify.app/", // Allow requests from this origin
    credentials: true, // Allow cookies to be sent
  })
);

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Testing Branch Works fine on reboot");
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protect, familyRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

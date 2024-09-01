const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, jwtExpire } = require("../config/auth");
const { v4: uuidv4 } = require("uuid"); // Import uuid library

// Generate JWT with user_id
const generateToken = (id, userUniqueId) => {
  return jwt.sign({ id, user_id: userUniqueId }, JWT_SECRET, {
    expiresIn: jwtExpire,
  });
};

// Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    // Create user with a unique user_id
    const user = await User.create({
      username,
      email,
      password,
      user_id: uuidv4(),
    });

    // Generate token with user_id
    const token = generateToken(user._id, user.user_id);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user._id, user.user_id);
    res.cookie("token", token, { httpOnly: true });
    res.json({ success: true, data: user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: "Logged out" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
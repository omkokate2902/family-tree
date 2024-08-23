const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/auth');

const protect = async (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Not authorized, token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Not authorized, token invalid' });
  }
};

module.exports = { protect };
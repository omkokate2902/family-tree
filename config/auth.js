require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  jwtExpire: '24h' // Token expiry time
};
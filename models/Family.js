const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true // Ensure `user_id` is unique
  },
  name: String,
  attributes: {
    DOB: Date,
  },
  children: [{
    name: String,
    attributes: {
      DOB: Date,
    },
    children: [{
      name: String,
      attributes: {
        DOB: Date,
      },
      children: [{
        name: String,
        attributes: {
          DOB: Date,
        },
      }]
    }]
  }]
});

const Family = mongoose.model('Family', familySchema, 'families');

module.exports = Family;
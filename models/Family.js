const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  member_id: {
    type: String,
    required: true,
  },
  name: String,
  attributes: {
    DOB: Date,
  },
  children: [{
    member_id: String,
    name: String,
    attributes: {
      DOB: Date,
    },
    children: [{
      member_id: String,
      name: String,
      attributes: {
        DOB: Date,
      },
      children: [{
        member_id: String,
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
const Family = require('../models/Family');

const createFamily = async (familyData) => {
  const newFamily = new Family(familyData);
  return await newFamily.save();
};

module.exports = {
  createFamily,
};
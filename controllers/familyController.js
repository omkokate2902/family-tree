const Family = require('../models/Family');
const familyService = require('../services/familyService');

// POST API to add family tree data
const addFamily = async (req, res) => {
  try {
    const familyData = req.body;
    const newFamily = await familyService.createFamily(familyData);
    res.status(201).json("Tree saved");
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'User ID already exists.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = {
  addFamily,
};
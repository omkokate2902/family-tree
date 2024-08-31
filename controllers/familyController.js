const Family = require('../models/Family');
const familyService = require('../services/familyService');

// POST API to add family tree data
const addFamily = async (req, res) => {
  try {
    const familyData = req.body;

    // Ensure the user_id from the logged-in user is included in the JSON
    familyData.user_id = req.user.user_id; 

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

// GET API to retrieve family tree data by user_id
const getFamilyByUserId = async (req, res) => {
  try {
    const userId = req.user.user_id;  // Extract user_id from the decoded JWT token
    const family = await Family.findOne({ user_id: userId });
    
    if (!family) {
      return res.status(404).json({ error: 'Family not found' });
    }
    
    res.json(family);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

module.exports = {
  addFamily,
  getFamilyByUserId,
};
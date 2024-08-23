const express = require('express');
const { addFamily, getFamilyByUserId } = require('../controllers/familyController');

const router = express.Router();

// Route to add family data
router.post('/families', addFamily);

// Route to get family data by user_id
router.get('/families/:user_id', getFamilyByUserId);

module.exports = router;
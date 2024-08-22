const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

router.post('/', familyController.addFamily);

module.exports = router;
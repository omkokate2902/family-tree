const express = require('express');
const { addFamily, getFamilyByUserId } = require('../controllers/familyController');
const { deleteFamilyMember, deleteChild } = require('../controllers/deleteChil'); // Importing delete function
const { deleteFamilyTree }= require('../controllers/deleteIndiv');
const { updateChild } = require('../controllers/patchChild');
const { addChild } = require('../controllers/addChildController');


const router = express.Router();

// Route to add family data
router.post('/families', addFamily);

// Route to get family data by user_id
router.get('/families', getFamilyByUserId);

// Route to delete a family member/child member 
router.delete('/families/delete-child', deleteChild);

// Route to update a family member/child member
router.patch('/families/updateChild', updateChild);

// Route to update a family tree
router.delete('/families/delete-tree', deleteFamilyTree);

// Add Child route
router.post('/families/addChild', addChild);

module.exports = router;

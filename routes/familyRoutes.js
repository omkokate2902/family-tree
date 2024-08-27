const express = require('express');
const { addFamily, getFamilyByUserId } = require('../controllers/familyController');
const { deleteChild } = require('../controllers/deleteChil'); 
const { updateChild } = require('../controllers/patchChild');
const { deleteFamilyTree }= require('../controllers/deleteIndiv')

const router = express.Router();

// Route to add family data
router.post('/families', addFamily);

// Route to get family data by user_id
router.get('/families/:user_id', getFamilyByUserId);

// Route to delete a family member/child member 
router.delete('/families/delete-child', deleteChild);

// Route to update a family member/child member
router.patch('/families/updateChild', updateChild);

// Route to update a family tree
router.delete('/families/delete-tree', deleteFamilyTree);

module.exports = router;
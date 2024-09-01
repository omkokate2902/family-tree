const Family = require('../models/Family');

// Helper function to find a member recursively and add a child
const addChildRecursive = (member, parentId, child) => {
  if (member.member_id === parentId) {
    // Assign new member_id to the child
    const newMemberId = `${parentId}.${member.children.length + 1}`;
    child.member_id = newMemberId;
    member.children.push(child);
    return true; // Child added successfully
  }

  for (let childMember of member.children) {
    if (addChildRecursive(childMember, parentId, child)) {
      return true; // Child added in deeper nested structure
    }
  }

  return false; // Parent ID not found in this branch
};

// Add Child API
const addChild = async (req, res) => {
  // Extract user_id from the decoded JWT token
  const user_id = req.user.user_id;
  const { parent_id, name, attributes } = req.body;

  try {
    const family = await Family.findOne({ user_id });
    if (!family) {
      return res.status(404).json({ error: 'Family not found' });
    }

    const newChild = { name, attributes, children: [] };

    const added = addChildRecursive(family, parent_id, newChild);

    if (!added) {
      return res.status(404).json({ error: 'Parent not found' });
    }

    await family.save();
    res.status(201).json({ success: true, message: 'Child added successfully', family });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addChild,
};
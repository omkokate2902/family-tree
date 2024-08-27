const Family = require('../models/Family');

const deleteFamilyTree = async (req, res) => {
  const { user_id, member_id } = req.body; // Get user_id and member_id from the request body

  try {
    const familyMember = await Family.findOne({ user_id, member_id });

    if (!familyMember) {
      return res.status(404).json({ error: 'Family member not found' });
    }

    // Recursive function to delete a family member and all their descendants
    const deleteFamilyMembers = async (member) => {
      if (member.children && member.children.length > 0) {
        for (const child of member.children) {
          await deleteFamilyMembers(child);
        }
      }
      await Family.deleteOne({ user_id, member_id: member.member_id });
    };

    await deleteFamilyMembers(familyMember);

    res.json({ success: true, message: 'Family tree deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  deleteFamilyTree,
};

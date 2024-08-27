const Family = require('../models/Family');  // Adjust the path as needed

const updateChild = async (req, res) => {
    const { user_id, member_id, updates } = req.body;  // Extract user_id, member_id, and updates from the request body

    try {
        const family = await Family.findOne({ user_id: user_id });

        if (!family) {
            return res.status(404).json({ message: 'Family not found' });
        }

        // Recursive function to find and update a child by member_id
        function updateChildById(parent, memberId, updates) {
            if (!parent.children) return false;

            for (let i = 0; i < parent.children.length; i++) {
                if (parent.children[i].member_id === memberId) {
                    // Update the child's fields with the provided updates
                    Object.assign(parent.children[i], updates);
                    return true;
                }

                if (updateChildById(parent.children[i], memberId, updates)) {
                    return true;
                }
            }

            return false;
        }

        const updateSuccess = updateChildById(family, member_id, updates);

        if (updateSuccess) {
            await family.save();  // Save the updated document
            res.status(200).json({ message: 'Child updated successfully' });
        } else {
            res.status(404).json({ message: 'Child not found' });
        }
    } catch (error) {
        console.error('Error updating child:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = {
    updateChild
};

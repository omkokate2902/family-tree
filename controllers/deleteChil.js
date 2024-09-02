const Family = require('../models/Family');  

const deleteChild = async (req, res) => {
    const { member_id } = req.body;

    try {
        const family = await Family.findOne({});  

        if (!family) {
            return res.status(404).json({ message: 'Family not found' });
        }

        function deleteChildById(parent, memberId) {
            if (!parent.children) return false;

            for (let i = 0; i < parent.children.length; i++) {
                if (parent.children[i].member_id === memberId) {
                    parent.children.splice(i, 1);  // Delete the child
                    return true;
                }

                if (deleteChildById(parent.children[i], memberId)) {
                    return true;
                }
            }

            return false;
        }

        const deletionSuccess = deleteChildById(family, member_id);

        if (deletionSuccess) {
            await family.save();  // Save the updated document
            res.status(200).json({ message: 'Child deleted successfully' });
        } else {
            res.status(404).json({ message: 'Child not found' });
        }
    } catch (error) {
        console.error('Error deleting child:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = {
    deleteChild
};

const Family = require('../models/Family'); 

const deleteTree = async (req, res) => {
    const { member_id } = req.body;

    try {
        const family = await Family.findOne({});  

        if (!family) {
            return res.status(404).json({ message: 'Family not found' });
        }

        if (family.member_id === member_id) {
            await Family.deleteOne({ _id: family._id });  // Delete the entire family tree
            return res.status(200).json({ message: 'Root tree deleted successfully' });
        }

        function deleteTreeById(parent, memberId) {
            if (!parent.children) return false;

            for (let i = 0; i < parent.children.length; i++) {
                if (parent.children[i].member_id === memberId) {
                    parent.children.splice(i, 1);  // Delete the tree
                    return true;
                }

                if (deleteTreeById(parent.children[i], memberId)) {
                    return true;
                }
            }

            return false;
        }

        const deleteSuccess = deleteTreeById(family, member_id);

        if (deleteSuccess) {
            await family.save();  // Save the updated document
            res.status(200).json({ message: 'Tree deleted successfully' });
        } else {
            res.status(404).json({ message: 'Tree not found' });
        }
    } catch (error) {
        console.error('Error deleting tree:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = {
    deleteTree
};

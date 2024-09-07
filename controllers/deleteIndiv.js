const Family = require('../models/Family');  // Adjust the path as needed

const deleteTree = async (req, res) => {
    try {
        const result = await Family.deleteOne({});  // Deletes the entire collection
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Family tree deleted successfully' });
        } else {
            res.status(404).json({ message: 'Family tree not found' });
        }
    } catch (error) {
        console.error('Error deleting family tree:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = {
    deleteTree
};

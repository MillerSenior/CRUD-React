const express = require('express');
const router = express.Router();
const db = require('../db');  // Import the db connection

// Route to add a new category
router.post('/', async (req, res) => {
    const { categoryName } = req.body;

    // Basic validation
    if (!categoryName) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    try {
        // Example SQL query to insert a new category
        const query = 'INSERT INTO categories (name) VALUES (?)';
        db.query(query, [categoryName], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(201).json({ message: 'Category added successfully' });
        });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Error adding category' });
    }
});

module.exports = router;

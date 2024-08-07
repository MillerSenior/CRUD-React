// const express = require('express');
// const router = express.Router();
// const db = require('../db');  // Import the db connection
//
// // Route to add a new category
// router.post('/', async (req, res) => {
//     const { categoryName } = req.body;
//
//     // Basic validation
//     if (!categoryName) {
//         return res.status(400).json({ message: 'Category name is required' });
//     }
//
//     try {
//         // Example SQL query to insert a new category
//         const query = 'INSERT INTO categories (name) VALUES (?)';
//         db.query(query, [categoryName], (err, results) => {
//             if (err) {
//                 console.error('Database error:', err);
//                 return res.status(500).json({ message: 'Database error' });
//             }
//             res.status(201).json({ message: 'Category added successfully' });
//         });
//     } catch (error) {
//         console.error('Error adding category:', error);
//         res.status(500).json({ message: 'Error adding category' });
//     }
// });
//
// module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db');  // Import the db connection
const jwt = require('jsonwebtoken');

// Middleware to verify the token and extract user information
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        console.log('Access denied. No token provided.');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        console.error('Invalid token:', ex.message);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Route to add a new category
router.post('/', authMiddleware, async (req, res) => {
    const { categoryName } = req.body;
    const userId = req.user.id; // Extract user ID from token

    // Basic validation
    if (!categoryName) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    try {
        // Example SQL query to insert a new category with userId
        const query = 'INSERT INTO categories (name, user_id) VALUES (?, ?)';
        db.query(query, [categoryName, userId], (err, results) => {
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

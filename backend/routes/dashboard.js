const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Middleware to verify the token and extract user information
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        console.log('Access denied. No token provided.');
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        console.error('Invalid token:', ex.message);
        res.status(400).json({message: 'Invalid token.'});
    }
};

router.get('/user/:id', authMiddleware, (req, res) => {
    const userId = req.user.id;

    if (userId !== parseInt(req.params.id, 10)) {
        return res.status(403).json({message: 'Access denied. You can only access your own data.'});
    }

    const query = 'SELECT username, email FROM users WHERE id = ?'; // Adjust the query to select needed fields
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Database error', error: err});
        }

        if (results.length === 0) {
            return res.status(404).json({message: 'User not found'});
        }

        res.json(results[0]);
    });
});

module.exports = router;

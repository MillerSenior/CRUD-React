const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the db connection
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken package

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

// Route to get all US states data
router.get('/', authMiddleware, (req, res) => {
    const query = 'SELECT state_name, prisons, state_pop, num_inside, incarceration_rate, region FROM us_states';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});
// Route to get data for a specific state
router.get('/state-data', authMiddleware, (req, res) => {
    const stateName = req.query.state;
    if (!stateName) {
        return res.status(400).json({ message: 'State name is required' });
    }

    const query = 'SELECT * FROM us_states WHERE state_name = ?';
    db.query(query, [stateName], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});

module.exports = router;

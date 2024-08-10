// backend/routes/usStates.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the db connection
const authMiddleware = require('../authMiddleware'); // Import the auth middleware

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

module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');  // Import the db connection
const router = express.Router();

// Add your JWT secret here
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    const { username, password, email } = req.body;

    console.log('Received registration request:', { username, email });

    if (!isValidUsername(username) || !isValidEmail(email)) {
        console.log('Invalid username or email:', { username, email });
        return res.status(400).json({ message: 'Invalid username or email' });
    }

    try {
        const checkQuery = 'SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?';
        db.query(checkQuery, [username, email], async (err, results) => {
            if (err) {
                console.error('Database error during username/email check:', err);
                return res.status(500).json({ message: 'Database error', error: err });
            }
            const count = results[0].count;

            if (count > 0) {
                console.log('Username or email already exists:', { username, email });
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed password:', hashedPassword);

            const insertQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
            db.query(insertQuery, [username, hashedPassword, email], (err, results) => {
                if (err) {
                    console.error('Database error during user insertion:', err);
                    return res.status(500).json({ message: 'Database error', error: err });
                }

                const userId = results.insertId;
                const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });

                console.log('User registered successfully:', { userId, token });

                res.status(201).json({
                    message: 'User registered successfully',
                    token,
                    userId
                });
            });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

const isValidUsername = (username) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(username) && username.length >= 3 && username.length <= 20;
};

const isValidEmail = (emails) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(emails);
};
module.exports = router;
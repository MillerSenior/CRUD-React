const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Validate input data
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  try {
    // Query user from database
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Database error:', err); // Log database error
        return res.status(500).json({ message: 'Database error', error: err });
      }

      if (results.length === 0) {
        console.log('Invalid username or password:', { username }); // Log invalid username
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const user = results[0];
      console.log('User found:', user); // Log the user found in the database

      // Compare hashed password from database with provided password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log('Invalid password for user:', { username }); // Log invalid password
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Respond with token and userId
      console.log('Login successful, responding with token and userId:', { token, userId: user.id });
      res.json({ token, userId: user.id }); // Ensure userId is included in the response
    });
  } catch (error) {
    console.error('Login error:', error); // Log unexpected errors
    res.status(500).json({ message: 'Error logging in user', error });
  }
});

module.exports = router;

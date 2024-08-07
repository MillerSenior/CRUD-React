require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');  // Import the db connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// JWT Authentication Middleware
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

// Routes
const authRoutes = require('./routes/auth');
const registerRoute = require('./routes/register'); // Import the register route
const dashboardRoute = require('./routes/dashboard'); // Import the dashboard route
const categoriesRoute = require('./routes/categories'); // Import the categories route
const eventsRoute = require('./routes/events'); // Import the categories route

app.use('/auth', authRoutes); // Authentication routes
app.use('/api/register', registerRoute); // Registration route
app.use('/api/categories', categoriesRoute); // Categories route
app.use('/api/dashboard', dashboardRoute);
app.use('/api/events', eventsRoute);
//app.use('/api', dashboardRoute); // Add this line to use the dashboard route

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  try {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, userId: user.id }); // Include userId in the response
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
});

// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send(`Hello user ${req.user.id}, this is a protected route!`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
console.log('Loaded environment variables:', process.env);

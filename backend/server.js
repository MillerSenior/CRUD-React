// require('dotenv').config();
// const express = require('express');
// const multer = require('multer');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const db = require('./db');  // Import the db connection
// const bcrypt = require('bcrypt');
// const path = require('path');
// const jwt = require('jsonwebtoken');
//
// const app = express();
// const port = process.env.PORT || 5000;
//
// // Setup multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 5 } // Limit to 5MB
// });
//
//
// app.use(express.static(path.join(__dirname, "../frontend/build")));
//
// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// // JWT Authentication Middleware
// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//
//   if (!token) {
//     console.log('Access denied. No token provided.');
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }
//
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     console.error('Invalid token:', ex.message);
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };
//
// // Routes
// const authRoutes = require('./routes/auth');
// const registerRoute = require('./routes/register'); // Import the register route
// const dashboardRoute = require('./routes/dashboard'); // Import the dashboard route
// const categoriesRoute = require('./routes/categories'); // Import the categories route
// const eventsRoute = require('./routes/events'); // Import the categories route
// const usStatesRouter = require('./routes/usStates');
// const imageRoutes = require('./routes/images');
// const imageViewRoute = require('./routes/imageView');
//
// app.use('/auth', authRoutes); // Authentication routes
// app.use('/api/register', registerRoute); // Registration route
// app.use('/api/categories', categoriesRoute); // Categories route
// app.use('/api/dashboard', dashboardRoute);
// app.use('/api/events', eventsRoute);
// app.use('/api/us-states', usStatesRouter);
// app.use('/api/images', imageRoutes);
// app.use('/api/imageView', imageViewRoute);
// //
//
// // Login route
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;
//
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Please provide username and password' });
//   }
//
//   try {
//     const query = 'SELECT * FROM users WHERE username = ?';
//     db.query(query, [username], async (err, results) => {
//       if (err) {
//         return res.status(500).json({ message: 'Database error', error: err });
//       }
//
//       if (results.length === 0) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
//
//       const user = results[0];
//       const isMatch = await bcrypt.compare(password, user.password);
//
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
//
//       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token, userId: user.id }); // Include userId in the response
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in user', error });
//   }
// });
//
// // Protected route example
// app.get('/api/protected', authMiddleware, (req, res) => {
//   res.send(`Hello user ${req.user.id}, this is a protected route!`);
// });
//
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// })
//
// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
// console.log('Loaded environment variables:', process.env);
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Increased limit for face descriptors

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
const registerRoute = require('./routes/register');
const dashboardRoute = require('./routes/dashboard');
const categoriesRoute = require('./routes/categories');
const eventsRoute = require('./routes/events');
const usStatesRouter = require('./routes/usStates');
const imageRoutes = require('./routes/images');
const imageViewRoute = require('./routes/imageView');
const facialAuthRoute = require('./routes/facialAuth'); // Add this line

app.use('/auth', authRoutes);
app.use('/api/register', registerRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/events', eventsRoute);
app.use('/api/us-states', usStatesRouter);
app.use('/api/images', imageRoutes);
app.use('/api/imageView', imageViewRoute);
app.use('/api', facialAuthRoute); // Add this line
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));  // Ensure the public folder is served


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
      res.json({ token, userId: user.id });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
});

// Facial registration route
app.post('/api/register-face', authMiddleware, async (req, res) => {
  const { faceDescriptor } = req.body;
  const userId = req.user.id;

  if (!faceDescriptor || !Array.isArray(faceDescriptor)) {
    return res.status(400).json({ message: 'Invalid face descriptor' });
  }

  try {
    // Check if user already has a face descriptor
    const checkQuery = 'SELECT id FROM facial_auth WHERE user_id = ?';
    db.query(checkQuery, [userId], (checkErr, checkResults) => {
      if (checkErr) {
        return res.status(500).json({ message: 'Database error', error: checkErr });
      }

      const query = checkResults.length > 0
          ? 'UPDATE facial_auth SET face_descriptor = ? WHERE user_id = ?'
          : 'INSERT INTO facial_auth (user_id, face_descriptor) VALUES (?, ?)';

      const params = checkResults.length > 0
          ? [JSON.stringify(faceDescriptor), userId]
          : [userId, JSON.stringify(faceDescriptor)];

      db.query(query, params, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json({ message: 'Face registered successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering face', error });
  }
});

// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send(`Hello user ${req.user.id}, this is a protected route!`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
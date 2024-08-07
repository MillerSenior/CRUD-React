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

// Route to get categories for a specific user
router.get('/categories', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const query = 'SELECT id, name FROM categories WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});

// Route to get events for a specific user
router.get('/', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const query = 'SELECT * FROM events WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});

// Route to add a new event
router.post('/', authMiddleware, (req, res) => {
    const { eventName, date, time, attendees, categoryId } = req.body;
    const userId = req.user.id;

    // Basic validation
    if (!eventName || !date || !time || !attendees || !categoryId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // SQL query to insert a new event with userId and categoryId
        const query = 'INSERT INTO events (name, date, time, attendees, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [eventName, date, time, attendees, categoryId, userId], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(201).json({ message: 'Event added successfully' });
        });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: 'Error adding event' });
    }
});

router.put('/:id', authMiddleware, (req, res) => {
    const { eventName, date, time, attendees, categoryId } = req.body;
    const userId = req.user.id;
    const eventId = req.params.id;

    console.log('Received Data:', req.body);  // Log the received data

    // Basic validation
    if (!eventName || !date || !time || !attendees || !categoryId) {
        console.log('Validation Error:', { eventName, date, time, attendees, categoryId });  // Log validation errors
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const query = 'UPDATE events SET name = ?, date = ?, time = ?, attendees = ?, category_id = ? WHERE id = ? AND user_id = ?';
        db.query(query, [eventName, date, time, attendees, categoryId, eventId, userId], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(200).json({ message: 'Event updated successfully' });
        });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Error updating event' });
    }
});

// Route to delete an event
router.delete('/:id', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.id;

    try {
        const query = 'DELETE FROM events WHERE id = ? AND user_id = ?';
        db.query(query, [eventId, userId], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(200).json({ message: 'Event deleted successfully' });
        });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Error deleting event' });
    }
});
// Route to get events for a specific category
router.get('/category/:categoryId', authMiddleware, async (req, res) => {
    const { categoryId } = req.params;
    const userId = req.user.id;

    try {
        const categoryQuery = 'SELECT name FROM categories WHERE id = ? AND user_id = ?';
        db.query(categoryQuery, [categoryId, userId], (categoryErr, categoryResult) => {
            if (categoryErr) {
                console.error('Database error:', categoryErr);
                return res.status(500).json({ message: 'Database error' });
            }

            if (categoryResult.length === 0) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const eventsQuery = 'SELECT * FROM events WHERE category_id = ? AND user_id = ?';
            db.query(eventsQuery, [categoryId, userId], (eventsErr, eventsResult) => {
                if (eventsErr) {
                    console.error('Database error:', eventsErr);
                    return res.status(500).json({ message: 'Database error' });
                }

                res.json({ categoryName: categoryResult[0].name, events: eventsResult });
            });
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Database error' });
    }
});


module.exports = router;

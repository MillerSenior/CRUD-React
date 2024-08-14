const express = require('express');
const multer = require('multer');
const db = require('../db');
const authMiddleware = require('../authMiddleware'); // Adjust the path as needed

const router = express.Router();

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit to 5MB
});

// Image upload route
router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
    const { id: user_id } = req.user; // Assuming you have user info from authMiddleware
    const { originalname, mimetype, buffer } = req.file;

    // Save image to the database
    const query = 'INSERT INTO images (user_id, image_data, file_name, mime_type) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, buffer, originalname, mimetype], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(201).json({ message: 'Image uploaded successfully', imageId: result.insertId });
    });
});

// // Image retrieval route
router.get('/:id', authMiddleware, (req, res) => {
    const imageId = req.params.id;
    const query = 'SELECT image_data, mime_type FROM images WHERE id = ?';

    db.query(query, [imageId], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'Image not found' });

        const { image_data, mime_type } = results[0];
        res.set('Content-Type', mime_type);
        res.send(image_data);
    });
});

// Fetch all images by user ID route
router.get('/user-images', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const query = 'SELECT id, file_name, mime_type FROM images WHERE user_id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.json(results);
    });
});

//fetch user
router.get('/user', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const query = 'SELECT id, file_name, mime_type FROM images WHERE user_id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.json(results);
    });
});
module.exports = router;

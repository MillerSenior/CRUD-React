const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const db = require('../db');
const authMiddleware = require('../authMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }
});

// Image upload route with optimization
router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { id: user_id } = req.user;
        const { originalname, mimetype, buffer } = req.file;

        // Optimize image
        const optimizedBuffer = await sharp(buffer)
            .resize(1500, 1500, { // Desktop size, adjust as needed
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality: 80 }) // Adjust quality as needed
            .toBuffer();

        const query = 'INSERT INTO images (user_id, image_data, file_name, mime_type) VALUES (?, ?, ?, ?)';
        db.query(query, [user_id, optimizedBuffer, originalname, 'image/jpeg'], (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err });
            res.status(201).json({ message: 'Image uploaded successfully', imageId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing image', error: error.message });
    }
});

// Delete route
router.delete('/:id', authMiddleware, (req, res) => {
    const imageId = req.params.id;
    const userId = req.user.id;

    const query = 'DELETE FROM images WHERE id = ? AND user_id = ?';
    db.query(query, [imageId, userId], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Image not found or unauthorized' });
        res.json({ message: 'Image deleted successfully' });
    });
});

// Keep your existing routes...

module.exports = router;
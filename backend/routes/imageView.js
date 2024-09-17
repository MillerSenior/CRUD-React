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


// router.get('/user-images', authMiddleware, (req, res) => {
//     const userId = req.user.id;
//     const query = 'SELECT id, imager_data, file_name, mime_type FROM images WHERE user_id = ?';
//
//     db.query(query, [userId], (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Database error', error: err });
//         }
//
//         // Log the response for debugging
//         console.log(results);
//
//         res.json(results);
//     });
// });
router.get('/user-images', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const query = 'SELECT id, image_data, file_name, mime_type FROM images WHERE user_id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        // Convert image data (Buffer) to base64 for frontend rendering
        const processedResults = results.map(row => ({
            id: row.id,
            file_name: row.file_name,
            mime_type: row.mime_type,
            image_data: row.image_data.toString('base64') // Convert to base64
        }));

        // Log for debugging
        console.log(processedResults);

        res.json(processedResults);
    });
});


module.exports = router;

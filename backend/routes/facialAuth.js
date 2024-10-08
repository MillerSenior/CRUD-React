const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

// Helper function to calculate Euclidean distance between face descriptors
function euclideanDistance(descriptor1, descriptor2) {
    return Math.sqrt(
        descriptor1.reduce((sum, value, index) => {
            const diff = value - descriptor2[index];
            return sum + diff * diff;
        }, 0)
    );
}

router.post('/facial-login', async (req, res) => {
    const { faceDescriptor } = req.body;

    if (!faceDescriptor || !Array.isArray(faceDescriptor)) {
        return res.status(400).json({ message: 'Invalid face descriptor' });
    }

    try {
        const query = `
            SELECT user_id, face_descriptor
            FROM facial_auth
            WHERE face_descriptor IS NOT NULL
        `;

        db.query(query, [], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            let bestMatch = null;
            let bestDistance = Infinity;

            results.forEach(result => {
                const storedDescriptor = JSON.parse(result.face_descriptor);
                const distance = euclideanDistance(faceDescriptor, storedDescriptor);

                if (distance < bestDistance && distance < 0.6) { // Threshold for match
                    bestDistance = distance;
                    bestMatch = result;
                }
            });

            if (bestMatch) {
                const token = jwt.sign({ id: bestMatch.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token, userId: bestMatch.user_id });
            } else {
                res.status(401).json({ message: 'Face not recognized' });
            }
        });
    } catch (error) {
        console.error('Facial login error:', error);
        res.status(500).json({ message: 'Error during facial login' });
    }
});

module.exports = router;
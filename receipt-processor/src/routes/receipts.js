const express = require('express');
const router = express.Router();
const { processReceipt, getPoints } = require('../services/receiptService');

router.post('/process', (req, res) => {
    try {
        console.log("Received POST body:", JSON.stringify(req.body, null, 2));
        const id = processReceipt(req.body);
        res.json({ id });
    } catch (err) {
        console.log( err );
        res.status(400).json({ error: 'Invalid input' });
    }
});

router.get('/:id/points', (req, res) => {
    const points = getPoints(req.params.id);
    if (points === null) {
        return res.status(404).json({ error: 'Receipt not found' });
    }
    res.json({ points });
});

module.exports = router;
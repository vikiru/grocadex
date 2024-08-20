import express = require('express');
const router = express.Router();

router.get('/receipts/:receiptId/groceries');
router.post('/receipts/:receiptId/groceries');
router.get('/receipts/:receiptId/groceries/:id');
router.put('/receipts/:receiptId/groceries/:id');
router.delete('/receipts/:receiptId/groceries/:id');

export { router };

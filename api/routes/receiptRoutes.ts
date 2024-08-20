import express = require('express');
const router = express.Router();

router.get('/users/:userId/receipts');
router.post('/users/:userId/receipts');
router.get('/users/:userId/receipts/:id');
router.put('/users/:userId/receipts/:id');
router.delete('/users/:userId/receipts/:id');

export { router };

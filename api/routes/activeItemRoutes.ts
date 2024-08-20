import express = require('express');
const router = express.Router();

router.post('/active-items');
router.get('/active-items');
router.get('/active-items/:id');
router.put('/active-items/:id');
router.delete('/active-items/:id');

export { router };

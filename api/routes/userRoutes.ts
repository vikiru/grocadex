import express = require('express');
const router = express.Router();

router.get('/users');
router.post('/users');
router.get('/users/:id');

export { router };

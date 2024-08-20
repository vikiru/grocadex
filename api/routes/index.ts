import express = require('express');
const router = express.Router();

const userRouter = require('./userRoutes');
const activeItemRouter = require('./activeItemRoutes');
const groceryItemRouter = require('./groceryItemRoutes');
const receiptRouter = require('./receiptRoutes');

router.use('/users', userRouter);
router.use('/active-items', activeItemRouter);
router.use('/grocery-items', groceryItemRouter);
router.use('/receipts', receiptRouter);

export { router };

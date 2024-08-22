import express = require('express');

import { ActiveItemRouter } from './activeItemRoutes';
import { GroceryItemRouter } from './groceryItemRoutes';
import { ReceiptRouter } from './receiptRoutes';
import { UserRouter } from './userRoutes';

const router = express.Router();

router.use('/users', UserRouter);
router.use('/active-items', ActiveItemRouter);
router.use('/grocery-items', GroceryItemRouter);
router.use('/receipts', ReceiptRouter);

export { router };

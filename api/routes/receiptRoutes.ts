import express = require('express');

import { ReceiptController } from '../controllers';

const ReceiptRouter = express.Router();

ReceiptRouter.get('/users/:userId/receipts', ReceiptController.getReceiptsByUserId);
ReceiptRouter.post('/users/:userId/receipts', ReceiptController.createReceipt);
ReceiptRouter.get('/users/:userId/receipts/:id', ReceiptController.getReceiptById);
ReceiptRouter.put('/users/:userId/receipts/:id', ReceiptController.updateReceipt);
ReceiptRouter.delete('/users/:userId/receipts/:id', ReceiptController.deleteReceiptById);

export { ReceiptRouter };

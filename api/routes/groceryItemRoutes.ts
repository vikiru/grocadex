import express = require('express');

import { GroceryItemController } from '../controllers';

const GroceryItemRouter = express.Router();

GroceryItemRouter.get('/receipts/:receiptId/groceries', GroceryItemController.getGroceryItemsByReceiptId);
GroceryItemRouter.post('/receipts/:receiptId/groceries', GroceryItemController.createGroceryItem);
GroceryItemRouter.get('/receipts/:receiptId/groceries/:id', GroceryItemController.getGroceryItemById);
GroceryItemRouter.put('/receipts/:receiptId/groceries/:id', GroceryItemController.updateGroceryItem);
GroceryItemRouter.delete('/receipts/:receiptId/groceries/:id', GroceryItemController.deleteGroceryItem);

export { GroceryItemRouter };

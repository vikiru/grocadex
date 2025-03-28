import express from 'express';
import { apiVersionString } from '~config/index';
import { GroceryItemController } from '~controllers/';

const GroceryItemRouter = express.Router();
const baseUrl = `/${apiVersionString}/receipts`;

GroceryItemRouter.get(
    `${baseUrl}/:receiptId/groceries`,

    GroceryItemController.getGroceryItemsByReceiptId,
);

GroceryItemRouter.get(
    `${baseUrl}/groceries/active`,

    GroceryItemController.getActiveGroceryItems,
);

GroceryItemRouter.post(
    `${baseUrl}/:receiptId/groceries`,

    GroceryItemController.createGroceryItem,
);

GroceryItemRouter.get(
    `${baseUrl}/:receiptId/groceries/:groceryItemId`,

    GroceryItemController.getGroceryItemById,
);

GroceryItemRouter.put(
    `${baseUrl}/:receiptId/groceries/:groceryItemId`,

    GroceryItemController.updateGroceryItem,
);

GroceryItemRouter.delete(
    `${baseUrl}/:receiptId/groceries/:groceryItemId`,

    GroceryItemController.deleteGroceryItem,
);

export { GroceryItemRouter };

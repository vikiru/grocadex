import express from 'express';
import { apiVersionString } from '~config/index';
import { GroceryItemController } from '~controllers/';
import { ensureAuthenticated } from '~middlewares/';

const GroceryItemRouter = express.Router();
const baseUrl = `/${apiVersionString}/receipts`;

GroceryItemRouter.get(
    `${baseUrl}/:receiptId/groceries`,
    ensureAuthenticated,
    GroceryItemController.getGroceryItemsByReceiptId,
);

GroceryItemRouter.get(
    `${baseUrl}/groceries/active`,
    ensureAuthenticated,
    GroceryItemController.getActiveGroceryItems,
);

GroceryItemRouter.post(
    `${baseUrl}/:receiptId/groceries`,
    ensureAuthenticated,
    GroceryItemController.createGroceryItem,
);

GroceryItemRouter.get(
    `${baseUrl}/:receiptId/groceries/:groceryItemId`,
    ensureAuthenticated,
    GroceryItemController.getGroceryItemById,
);

GroceryItemRouter.put(
    `${baseUrl}/:receiptId/groceries/`,
    GroceryItemController.updateGroceryItem,
);

GroceryItemRouter.delete(
    `${baseUrl}/:receiptId/groceries/:groceryItemId`,
    ensureAuthenticated,
    GroceryItemController.deleteGroceryItem,
);

export { GroceryItemRouter };

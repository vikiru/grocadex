import express from 'express';
import passport from 'passport';
import { apiVersionString } from '~config/index';
import { GroceryItemController } from '~controllers/';

const GroceryItemRouter = express.Router();
const baseUrl = `/${apiVersionString}/receipts`;

GroceryItemRouter.get(
    `${baseUrl}/:receiptId/groceries`,
    passport.authenticate('jwt', { session: false }),
    GroceryItemController.getGroceryItemsByReceiptId,
);

GroceryItemRouter.get(
    `${baseUrl}/groceries/active`,
    passport.authenticate('jwt', { session: false }),
    GroceryItemController.getActiveGroceryItems,
);

GroceryItemRouter.post(
    `${baseUrl}/:receiptId/groceries`,
    passport.authenticate('jwt', { session: false }),
    GroceryItemController.createGroceryItem,
);

GroceryItemRouter.get(
    `${baseUrl}/:receiptId/groceries/:groceryItemId`,
    passport.authenticate('jwt', { session: false }),
    GroceryItemController.getGroceryItemById,
);

GroceryItemRouter.put(
    `${baseUrl}/:receiptId/groceries/:groceryItemId`,
    passport.authenticate('jwt', { session: false }),
    GroceryItemController.updateGroceryItem,
);

GroceryItemRouter.delete(
    `${baseUrl}/:receiptId/groceries/:groceryItemId`,
    passport.authenticate('jwt', { session: false }),
    GroceryItemController.deleteGroceryItem,
);

export { GroceryItemRouter };

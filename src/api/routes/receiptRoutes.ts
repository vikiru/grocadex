import express from 'express';
import passport from 'passport';
import { apiVersionString } from '~config/index';
import { ReceiptController } from '~controllers/';

const ReceiptRouter = express.Router();
const baseUrl = `/${apiVersionString}/receipts`;

ReceiptRouter.get(
    `${baseUrl}`,
    passport.authenticate('jwt', { session: false }),
    ReceiptController.getReceiptsByUserId,
);

ReceiptRouter.post(
    `${baseUrl}`,
    passport.authenticate('jwt', { session: false }),
    ReceiptController.createReceipt,
);

ReceiptRouter.get(
    `${baseUrl}/:id`,
    passport.authenticate('jwt', { session: false }),
    ReceiptController.getReceiptById,
);
ReceiptRouter.put(
    `${baseUrl}/:id`,
    passport.authenticate('jwt', { session: false }),
    ReceiptController.updateReceipt,
);
ReceiptRouter.delete(
    `${baseUrl}/:id`,
    passport.authenticate('jwt', { session: false }),
    ReceiptController.deleteReceiptById,
);
ReceiptRouter.get(
    `${baseUrl}/:startMonth/:endMonth`,
    passport.authenticate('jwt', { session: false }),
    ReceiptController.getReceiptsByMonth,
);
ReceiptRouter.get(
    `${baseUrl}/:year`,
    passport.authenticate('jwt', { session: false }),
    ReceiptController.getReceiptsByYear,
);

export { ReceiptRouter };

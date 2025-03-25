import express from 'express';

import { apiVersionString } from '~config/index';
import { ReceiptController } from '~controllers/';
import { ensureAuthenticated } from '~middlewares/';

const ReceiptRouter = express.Router();
const baseUrl = `/${apiVersionString}/receipts`;

ReceiptRouter.get(
    `${baseUrl}`,
    ensureAuthenticated,
    ReceiptController.getReceiptsByUserId,
);

ReceiptRouter.post(
    `${baseUrl}`,
    ensureAuthenticated,
    ReceiptController.createReceipt,
);

ReceiptRouter.get(
    `${baseUrl}/:id`,
    ensureAuthenticated,
    ReceiptController.getReceiptById,
);
ReceiptRouter.put(
    `${baseUrl}/:id`,
    ensureAuthenticated,
    ReceiptController.updateReceipt,
);
ReceiptRouter.delete(
    `${baseUrl}/:id`,
    ensureAuthenticated,
    ReceiptController.deleteReceiptById,
);
ReceiptRouter.get(
    `${baseUrl}/:startMonth/:endMonth`,
    ensureAuthenticated,
    ReceiptController.getReceiptsByMonth,
);
ReceiptRouter.get(
    `${baseUrl}/:year`,
    ensureAuthenticated,
    ReceiptController.getReceiptsByYear,
);

export { ReceiptRouter };

import express from 'express';
import { apiVersionString } from '~config/index';
import { ReceiptController } from '~controllers/';

const ReceiptRouter = express.Router();
const baseUrl = `/${apiVersionString}/receipts`;

ReceiptRouter.get(
    `${baseUrl}`,

    ReceiptController.getReceiptsByUserId,
);

ReceiptRouter.post(
    `${baseUrl}`,

    ReceiptController.createReceipt,
);

ReceiptRouter.get(
    `${baseUrl}/:id`,

    ReceiptController.getReceiptById,
);
ReceiptRouter.put(
    `${baseUrl}/:id`,

    ReceiptController.updateReceipt,
);
ReceiptRouter.delete(
    `${baseUrl}/:id`,

    ReceiptController.deleteReceiptById,
);
ReceiptRouter.get(
    `${baseUrl}/:startMonth/:endMonth`,

    ReceiptController.getReceiptsByMonth,
);
ReceiptRouter.get(
    `${baseUrl}/:year`,

    ReceiptController.getReceiptsByYear,
);

export { ReceiptRouter };

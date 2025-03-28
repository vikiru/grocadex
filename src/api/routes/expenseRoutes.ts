import express from 'express';
import { apiVersionString } from '~config/index';
import { ExpenseController } from '~controllers/';

const baseUrl = `/${apiVersionString}/expenses`;

const ExpenseRouter = express.Router();

ExpenseRouter.get(
    `${baseUrl}`,

    ExpenseController.getExpenses,
);

ExpenseRouter.post(
    `${baseUrl}`,

    ExpenseController.saveExpense,
);

ExpenseRouter.put(
    `${baseUrl}/:id`,

    ExpenseController.updateExpenseById,
);

ExpenseRouter.delete(
    `${baseUrl}/:id`,

    ExpenseController.deleteExpenseById,
);

ExpenseRouter.get(
    `${baseUrl}/:id`,

    ExpenseController.retrieveExpenseById,
);

export { ExpenseRouter };

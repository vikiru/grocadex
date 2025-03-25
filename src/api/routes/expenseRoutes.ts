import express from 'express';
import { apiVersionString } from '~config/index';
import { ExpenseController } from '~controllers/*';
import { ensureAuthenticated } from '~middlewares/*';

const baseUrl = `/${apiVersionString}/expenses`;

const ExpenseRouter = express.Router();

ExpenseRouter.get(
    `${baseUrl}`,
    ensureAuthenticated,
    ExpenseController.getExpenses,
);

ExpenseRouter.post(
    `${baseUrl}`,
    ensureAuthenticated,
    ExpenseController.saveExpense,
);

ExpenseRouter.put(
    `${baseUrl}/:id`,
    ensureAuthenticated,
    ExpenseController.updateExpenseById,
);

ExpenseRouter.delete(
    `${baseUrl}/:id`,
    ensureAuthenticated,
    ExpenseController.deleteExpenseById,
);

ExpenseRouter.get(
    `${baseUrl}/:id`,
    ensureAuthenticated,
    ExpenseController.retrieveExpenseById,
);

export { ExpenseRouter };

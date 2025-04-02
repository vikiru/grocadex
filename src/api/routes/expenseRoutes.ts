import express from 'express';
import passport from 'passport';
import { apiVersionString } from '~config/index';
import { ExpenseController } from '~controllers/';

const baseUrl = `/${apiVersionString}/expenses`;

const ExpenseRouter = express.Router();

ExpenseRouter.get(
    `${baseUrl}`,
    passport.authenticate('jwt', { session: false }),
    ExpenseController.getExpenses,
);

ExpenseRouter.post(
    `${baseUrl}`,
    passport.authenticate('jwt', { session: false }),
    ExpenseController.saveExpense,
);

ExpenseRouter.put(
    `${baseUrl}/:id`,
    passport.authenticate('jwt', { session: false }),
    ExpenseController.updateExpenseById,
);

ExpenseRouter.delete(
    `${baseUrl}/:id`,
    passport.authenticate('jwt', { session: false }),
    ExpenseController.deleteExpenseById,
);

ExpenseRouter.get(
    `${baseUrl}/:id`,
    passport.authenticate('jwt', { session: false }),
    ExpenseController.retrieveExpenseById,
);

export { ExpenseRouter };

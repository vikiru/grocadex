import { NextFunction, Request, Response } from 'express';
import { logger } from '~config/logger';
import { ExpenseService } from '~services';
import { ResponsePayload } from '~types';

export async function deleteExpenseById(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const response = {
        message: '',
        data: null,
        success: false,
        error: '',
    };
    const userId = req.user;
    const expenseId = parseInt(req.params.expenseId, 10);

    try {
        const success = await ExpenseService.deleteExpenseById(
            userId,
            expenseId,
        );

        if (success) {
            response['message'] =
                `Successfully deleted expense with id ${expenseId}.`;
            response['success'] = true;
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = `No expense found with id ${expenseId}.`;
            response['error'] = 'There was no expense found with the given id.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error deleting expense with id ${expenseId}: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'There was an error deleting the expense.';
        res.status(500).json(response);
    }
}

export async function getExpenses(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    const userId = req.user;

    try {
        const expenses =
            await ExpenseService.retrieveAllExpensesByUserId(userId);

        if (expenses) {
            response.message = 'Successfully retrieved expenses.';
            response.data = expenses;
            response.success = true;
            response.error = '';
            return res.status(200).json(response);
        } else {
            response.message = 'No expenses found for the user.';
            response.error = 'No expenses found.';
            return res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error retrieving expenses from database: ${error}`);
        response.message = 'Internal server error.';
        response.error = 'There was an error retrieving expenses.';
        return res.status(500).json(response);
    }
}

export async function retrieveAllExpenses(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const response = {
        message: '',
        data: null,
        success: false,
        error: '',
    };
    const userId = req.user;

    try {
        const expenses =
            await ExpenseService.retrieveAllExpensesByUserId(userId);

        if (expenses) {
            response['message'] = 'Successfully retrieved all expenses.';
            response['data'] = expenses;
            response['success'] = true;
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = 'No expenses found for the user.';
            response['error'] = 'There were no expenses found for the user.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error retrieving all expenses for user: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'There was an error retrieving the expenses.';
        res.status(500).json(response);
    }
}

export async function retrieveExpenseById(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const response = {
        message: '',
        data: null,
        success: false,
        error: '',
    };
    const userId = req.user;
    const expenseId = parseInt(req.params.expenseId, 10);

    try {
        const expense = await ExpenseService.retrieveExpenseById(
            userId,
            expenseId,
        );

        if (expense) {
            response['message'] =
                `Successfully retrieved expense with id ${expenseId}.`;
            response['data'] = expense;
            response['success'] = true;
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = `No expense found with id ${expenseId}.`;
            response['error'] = 'There was no expense found with the given id.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error retrieving expense with id ${expenseId}: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'There was an error retrieving the expense.';
        res.status(500).json(response);
    }
}

export async function saveExpense(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const response = {
        message: '',
        data: null,
        success: false,
        error: '',
    };
    const userId = req.user;
    const { newExpense } = req.body;

    try {
        const savedExpense = await ExpenseService.saveExpense(
            userId,
            newExpense,
        );

        if (savedExpense) {
            response['message'] = 'Successfully saved expense.';
            response['data'] = savedExpense;
            response['success'] = true;
            response['error'] = 'No error occurred.';
            res.status(201).json(response);
        } else {
            response['message'] = 'Failed to save expense.';
            response['error'] = 'There was an error saving the expense.';
            res.status(400).json(response);
        }
    } catch (error) {
        logger.error(`Error saving expense: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'There was an error saving the expense.';
        res.status(500).json(response);
    }
}

export async function updateExpenseById(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const response = {
        message: '',
        data: null,
        success: false,
        error: '',
    };
    const userId = req.user;
    const { expenseId } = req.params;
    const { updatedExpense } = req.body;

    try {
        const updated = await ExpenseService.updateExpenseById(
            expenseId,
            updatedExpense,
        );

        if (updated) {
            response['message'] =
                `Successfully updated expense with id ${expenseId}.`;
            response['data'] = updated;
            response['success'] = true;
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = `No expense found with id ${expenseId}.`;
            response['error'] = 'There was no expense found with the given id.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error updating expense with id ${expenseId}: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'There was an error updating the expense.';
        res.status(500).json(response);
    }
}

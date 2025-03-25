import { Expense } from '.prisma/client';
import { logger } from '~config/logger';
import { prisma } from '~data/*';

export async function deleteExpenseById(
    userId: number,
    expenseId: number,
): Promise<boolean> {
    try {
        await prisma.expense.delete({
            where: {
                id: expenseId,
            },
        });

        logger.info(
            `Successfully deleted expense with id ${expenseId} for user ${userId}.`,
        );
        return true;
    } catch (error) {
        logger.error(
            `Error deleting expense with id ${expenseId} for user ${userId}: ${error}`,
        );
        return false;
    }
}

export async function retrieveAllExpensesByUserId(
    userId: number,
): Promise<Expense[] | null> {
    try {
        const expenses = await prisma.expense.findMany({
            where: {
                userId: userId,
            },
        });

        if (expenses.length > 0) {
            logger.info(
                `Successfully retrieved all expenses for user with id ${userId}.`,
            );
        }
        return expenses;
    } catch (error) {
        logger.error(
            `Error retrieving expenses for user with id ${userId}: ${error}`,
        );
        return null;
    }
}

export async function retrieveExpenseById(
    userId: number,
    expenseId: number,
): Promise<Expense | null> {
    try {
        const expense = await prisma.expense.findFirst({
            where: {
                userId: userId,
                id: expenseId,
            },
        });

        if (expense) {
            logger.info(
                `Successfully retrieved expense, ${expenseId} for user with id ${userId}.`,
            );
            return expense;
        } else {
            logger.info(
                `No expense found with id ${expenseId} for user with id ${userId}.`,
            );
            return null;
        }
    } catch (error) {
        logger.error(
            `Error retrieving expense, ${expenseId} for user with id ${userId}: ${error}`,
        );
        return null;
    }
}

export async function saveExpense(
    userId: number,
    newExpense: Expense,
): Promise<Expense | null> {
    try {
        const savedExpense = await prisma.expense.create({
            data: {
                userId: userId,
                ...newExpense,
            },
        });

        logger.info(`Successfully saved expense for user with id ${userId}.`);
        return savedExpense;
    } catch (error) {
        logger.error(
            `Error saving expense for user with id ${userId}: ${error}`,
        );
        return null;
    }
}

export async function updateExpenseById(
    expenseId: number,
    updatedExpense: Expense,
): Promise<Expense | null> {
    try {
        const updated = await prisma.expense.update({
            where: {
                id: expenseId,
            },
            data: {
                ...updatedExpense,
            },
        });

        logger.info(`Successfully updated expense with id ${expenseId}.`);
        return updated;
    } catch (error) {
        logger.error(`Error updating expense with id ${expenseId}: ${error}`);
        return null;
    }
}

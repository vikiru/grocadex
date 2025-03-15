import { Expense, Receipt } from '~types/index';

import { Months } from '~constants/Dates';
import { convertDatetoDateTime } from '~utils/date';
import { filterReceiptsByMonthYear } from '~utils/receipt';

export const constructExpenses = (receipts: Receipt[]): Expense[] => {
    const expenseMap: Map<string, { total: number; stores: Set<string> }> =
        new Map();

    receipts.forEach((receipt) => {
        const date = convertDatetoDateTime(receipt.purchaseDate);
        const year = date.year;
        const month = date.month;
        const key = `${year}-${month}`;

        if (!expenseMap.has(key)) {
            expenseMap.set(key, { total: 0, stores: new Set<string>() });
        }

        const entry = expenseMap.get(key);
        if (entry) {
            entry.total += Number(receipt.total);
            entry.stores.add(receipt.store);
        }
    });

    return Array.from(expenseMap.entries()).map(([key, { total, stores }]) => {
        const [year, month] = key.split('-').map(Number);
        return {
            date: new Date(year, month, 1).toISOString(),
            month,
            year,
            amount: total,
            stores: Array.from(stores),
        };
    });
};

export const calculateMonthlyStoreBreakdown = (
    receipts: Receipt[],
    month: number,
    year: number,
): { store: string; amount: number; percentage: string }[] => {
    const filteredReceipts = filterReceiptsByMonthYear(receipts, month, year);
    const uniqueStores: Set<string> = new Set(
        filteredReceipts.map((receipt) => receipt.store),
    );
    const total = filteredReceipts.reduce(
        (total, receipt) => total + receipt.total,
        0,
    );
    const breakdown: { store: string; amount: number; percentage: string }[] =
        [];

    for (const store of uniqueStores) {
        const storeReceipts = filteredReceipts.filter(
            (receipt) => receipt.store === store,
        );
        const storeAmount = storeReceipts.reduce(
            (total, receipt) => total + receipt.total,
            0,
        );
        const percentage = (storeAmount / total) * 100;
        breakdown.push({
            store,
            amount: storeAmount,
            percentage: percentage.toFixed(2),
        });
    }

    return breakdown;
};

export const calculateExpenses = (expenses: Expense[]): number => {
    return expenses.reduce((total, expense) => {
        return total + expense.amount;
    }, 0);
};

export const constructGraphData = (expenses: Expense[]) => {
    const expenseMap = new Map<number, number>();
    expenses.forEach((expense) => {
        if (expense.month && expense.amount !== undefined) {
            expenseMap.set(expense.month, expense.amount);
        }
    });

    return Months.map((month, index) => {
        const monthNumber = index + 1;
        return {
            label: month,
            amount: expenseMap.get(monthNumber) || 0,
        };
    });
};

import { Expense, Receipt } from '~types';
import { Months } from '~constants/Dates';
import { parseDate } from '~utils/date';
import { filterReceiptsByMonthYear } from '~utils/receipt';

export const constructExpense = (receipts: Receipt[]): Expense | null => {
    if (receipts.length === 0) return null;
    let total = 0;
    const { purchaseDate } = receipts[0];
    const date = parseDate(purchaseDate);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    receipts.forEach((receipt) => {
        total += Number(receipt.total);
    });

    return {
        month,
        year,
        total,
    };
};

export const constructExpenses = (receipts: Receipt[]): (Expense | null)[] => {
    if (receipts.length === 0) return [];

    const expenseMap = new Map<string, Receipt[]>();

    for (const receipt of receipts) {
        const date = parseDate(receipt.purchaseDate);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!expenseMap.has(key)) {
            expenseMap.set(key, []);
        }
        expenseMap.get(key)!.push(receipt);
    }

    return Array.from(expenseMap.values()).map(constructExpense);
};

export const calculateExpenses = (expenses: Expense[]): number => {
    return expenses.reduce((total, expense) => {
        return total + expense.total;
    }, 0);
};

export const constructGraphData = (expenses: Expense[]) => {
    const expenseMap = new Map<number, number>();
    expenses.forEach((expense) => {
        if (expense.month && expense.total !== undefined) {
            expenseMap.set(expense.month, expense.total);
        }
    });

    return Months.map((month, index) => {
        const monthNumber = index + 1;
        return {
            label: month,
            value: expenseMap.get(monthNumber) || 0,
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

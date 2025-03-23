import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '~store/zustandStorage';
import { Expense } from '~types/Expense';

type ExpenseState = {
    expenses: Expense[];
    getExpenses: () => Expense[];
    getExpenseFromId: (id: number) => Expense | undefined;
    getExpensesByMonth: (month: number) => Expense[] | undefined;
    getExpensesByMonthYear: (
        month: number,
        year: number,
    ) => Expense[] | undefined;
    getExpenseIdFromReceiptId: (receiptId: number) => number | undefined;
    setExpenses: (expenses: Expense[]) => void;
    addExpense: (expense: Expense) => void;
    deleteExpense: (expenseId: number) => void;
    updateExpense: (expenseId: number, updatedExpense: Expense) => void;
    resetExpenses: () => void;
    getCurrentMonthlyExpenses: (month: number, year: number) => number;
    getCurrentYearlyExpenses: (year: number) => number;
    addReceiptToExpenses: (
        expenseId: number,
        receiptId: number,
        receiptTotal: number,
    ) => void;
    updateReceiptInExpenses: (
        expenseId: number,
        receiptId: number,
        previousReceiptTotal: number,
        newReceiptTotal: number,
    ) => void;
    removeReceiptFromExpenses: (
        expenseId: number,
        receiptId: number,
        receiptTotal: number,
    ) => void;
};

export const useExpenseStore = create<ExpenseState>()(
    persist(
        (set, get) => ({
            expenses: [],
            getExpenses: () => get().expenses,
            getExpenseFromId: (id: number) =>
                get().expenses.find((expense) => expense.id === id),
            getExpensesByMonth: (month: number) =>
                get().expenses.filter((expense) => expense.month === month),
            getExpensesByMonthYear: (month: number, year: number) =>
                get().expenses.filter(
                    (expense) =>
                        expense.month === month && expense.year === year,
                ),
            getExpenseIdFromReceiptId: (receiptId: number) =>
                get().expenses.find((expense) =>
                    expense.receiptIds.includes(receiptId),
                )?.id,
            setExpenses: (expenses: Expense[]) => set({ expenses }),
            addExpense: (expense: Expense) => {
                set({ expenses: [...get().expenses, expense] });
            },
            deleteExpense: (expenseId: number) => {
                set({
                    expenses: get().expenses.filter(
                        (expense) => expense.id !== expenseId,
                    ),
                });
            },
            updateExpense: (expenseId: number, updatedExpense: Expense) => {
                set({
                    expenses: get().expenses.map((expense) =>
                        expense.id === expenseId ? updatedExpense : expense,
                    ),
                });
            },
            resetExpenses: () => set({ expenses: [] }),
            getCurrentMonthlyExpenses: (month: number, year: number) => {
                return get()
                    .expenses.filter(
                        (expense) =>
                            expense.month === month && expense.year === year,
                    )
                    .reduce((total, expense) => total + expense.total, 0);
            },
            getCurrentYearlyExpenses: (year: number) => {
                return get()
                    .expenses.filter((expense) => expense.year === year)
                    .reduce((total, expense) => total + expense.total, 0);
            },
            addReceiptToExpenses: (
                expenseId: number,
                receiptId: number,
                receiptTotal: number,
            ) => {
                const expense = get().getExpenseFromId(expenseId);

                if (expense && !expense.receiptIds.includes(receiptId)) {
                    const updatedReceiptIds = [
                        ...expense.receiptIds,
                        receiptId,
                    ];
                    const updatedTotal = expense.total + receiptTotal;
                    const updatedExpense = {
                        ...expense,
                        receiptIds: updatedReceiptIds,
                        total: updatedTotal,
                    };

                    set({
                        expenses: get().expenses.map((exp) =>
                            exp.id === expenseId ? updatedExpense : exp,
                        ),
                    });
                }
            },
            updateReceiptInExpenses: (
                expenseId: number,
                receiptId: number,
                previousReceiptTotal: number,
                newReceiptTotal: number,
            ) => {
                const expense = get().getExpenseFromId(expenseId);

                if (expense && expense.receiptIds.includes(receiptId)) {
                    const updatedTotal =
                        expense.total - previousReceiptTotal + newReceiptTotal;
                    const updatedExpense = { ...expense, total: updatedTotal };

                    set({
                        expenses: get().expenses.map((exp) =>
                            exp.id === expenseId ? updatedExpense : exp,
                        ),
                    });
                }
            },
            removeReceiptFromExpenses: (
                expenseId: number,
                receiptId: number,
                receiptTotal: number,
            ) => {
                const expense = get().getExpenseFromId(expenseId);

                if (expense && expense.receiptIds.includes(receiptId)) {
                    const updatedReceiptIds = expense.receiptIds.filter(
                        (id) => id !== receiptId,
                    );
                    const updatedTotal = expense.total - receiptTotal;
                    const updatedExpense = {
                        ...expense,
                        receiptIds: updatedReceiptIds,
                        total: updatedTotal,
                    };

                    set({
                        expenses: get().expenses.map((exp) =>
                            exp.id === expenseId ? updatedExpense : exp,
                        ),
                    });
                }
            },
        }),
        {
            name: 'expense-storage',
            storage: createJSONStorage(() => zustandStorage),
        },
    ),
);

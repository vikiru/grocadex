import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '~store/store';
import { Expense } from '~types/index';

type ExpenseState = {
    expenses: Expense[] | Partial<Expense>[];
    monthlyExpenses: Expense[] | Partial<Expense>[];
    yearlyExpenses: Expense[] | Partial<Expense>[];
    monthlyTotal: number;
    yearlyTotal: number;
};

const initialState: ExpenseState = {
    expenses: [],
    monthlyExpenses: [],
    yearlyExpenses: [],
    monthlyTotal: 0,
    yearlyTotal: 0,
};

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setExpenses: (state, action) => {
            state.expenses = action.payload;
        },
        setMonthlyExpenses: (state, action) => {
            state.monthlyExpenses = action.payload;
        },
        setYearlyExpenses: (state, action) => {
            state.yearlyExpenses = action.payload;
        },
        setMonthlyTotal: (state, action) => {
            state.monthlyTotal = action.payload;
        },
        setYearlyTotal: (state, action) => {
            state.yearlyTotal = action.payload;
        },
        incrementMonthlyExpenses: (state, action) => {
            state.monthlyTotal += action.payload;
        },
        incrementYearlyExpenses: (state, action) => {
            state.yearlyTotal += action.payload;
        },
        resetExpenses: (state) => {
            state.expenses = [];
            state.monthlyExpenses = [];
            state.yearlyExpenses = [];
            state.monthlyTotal = 0;
            state.yearlyTotal = 0;
        },
    },
});

export const {
    setExpenses,
    setMonthlyExpenses,
    setYearlyExpenses,
    setMonthlyTotal,
    setYearlyTotal,
    incrementMonthlyExpenses,
    incrementYearlyExpenses,
    resetExpenses,
} = expenseSlice.actions;

export const selectExpenses = (state: RootState) => state.expense.expenses;
export const selectMonthlyExpenses = (state: RootState) => state.expense.monthlyExpenses;
export const selectYearlyExpenses = (state: RootState) => state.expense.yearlyExpenses;
export const selectMonthlyTotal = (state: RootState) => state.expense.monthlyTotal;
export const selectYearlyTotal = (state: RootState) => state.expense.yearlyTotal;

export default expenseSlice.reducer;

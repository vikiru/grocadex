import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { Expense } from './../types/Expense';

interface ExpenseState {
    expenses: Expense[] | Partial<Expense>[];
    monthlyExpenses: number;
    yearlyExpenses: number;
}

const initialState: ExpenseState = {
    expenses: [],
    monthlyExpenses: 0,
    yearlyExpenses: 0,
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
        incrementMonthlyExpenses: (state, action) => {
            state.monthlyExpenses += action.payload;
        },
        incrementYearlyExpenses: (state, action) => {
            state.yearlyExpenses += action.payload;
        },
        resetExpenses: (state) => {
            state.expenses = [];
            state.monthlyExpenses = 0;
            state.yearlyExpenses = 0;
        },
    },
});

export const {
    setExpenses,
    setMonthlyExpenses,
    setYearlyExpenses,
    incrementMonthlyExpenses,
    incrementYearlyExpenses,
    resetExpenses,
} = expenseSlice.actions;

export const selectExpenses = (state: RootState) => state.expense.expenses;
export const selectMonthlyExpenses = (state: RootState) => state.expense.monthlyExpenses;
export const selectYearlyExpenses = (state: RootState) => state.expense.yearlyExpenses;

export default expenseSlice.reducer;

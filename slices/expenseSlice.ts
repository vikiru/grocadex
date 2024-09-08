import { createSlice } from '@reduxjs/toolkit';

export const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        expenses: [],
        monthlyExpenses: 0,
        yearlyExpenses: 0,
    },
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

export default expenseSlice.reducer;

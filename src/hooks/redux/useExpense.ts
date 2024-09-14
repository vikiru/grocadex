import { useDispatch, useSelector } from 'react-redux';
import {
    resetExpenses,
    selectExpenses,
    selectMonthlyExpenses,
    selectYearlyExpenses,
    setExpenses,
    setMonthlyExpenses,
    setYearlyExpenses,
} from '~slices/expenseSlice';

import { Expense } from '~types/Expense';

export const useExpense = () => {
    const expenses = useSelector(selectExpenses);
    const monthlyExpenses = useSelector(selectMonthlyExpenses);
    const yearlyExpenses = useSelector(selectYearlyExpenses);
    const dispatch = useDispatch();

    const updateExpenses = (expenses: Expense[]) => {
        dispatch(setExpenses(expenses));
    };

    const resetExpense = () => {
        dispatch(resetExpenses());
    };

    const updateMonthlyExpenses = (expenses: Expense[]) => {
        dispatch(setMonthlyExpenses(expenses));
    };

    const updateYearlyExpenses = (expenses: Expense[]) => {
        dispatch(setYearlyExpenses(expenses));
    };

    return {
        expenses,
        monthlyExpenses,
        yearlyExpenses,
        updateExpenses,
        updateMonthlyExpenses,
        updateYearlyExpenses,
        resetExpense,
    };
};

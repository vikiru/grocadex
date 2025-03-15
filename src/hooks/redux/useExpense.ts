import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetExpenses,
    selectExpenses,
    selectMonthlyExpenses,
    selectMonthlyTotal,
    selectYearlyExpenses,
    selectYearlyTotal,
    setExpenses,
    setMonthlyExpenses,
    setMonthlyTotal,
    setYearlyExpenses,
    setYearlyTotal,
} from '~slices/expenseSlice';
import { Expense } from '~types/index';
import { calculateExpenses } from '~utils/expense';

export const useExpense = () => {
    const expenses = useSelector(selectExpenses);
    const monthlyExpenses = useSelector(selectMonthlyExpenses);
    const yearlyExpenses = useSelector(selectYearlyExpenses);
    const monthlyTotal = useSelector(selectMonthlyTotal);
    const yearlyTotal = useSelector(selectYearlyTotal);
    const dispatch = useDispatch();

    const updateExpenses = (expenses: Expense[]) => {
        dispatch(setExpenses(expenses));
        const date = DateTime.now();
        const currentMonth = date.month;
        const currentYear = date.year;
        console.log(date, currentMonth, currentYear);
        const filteredYearlyExpenses = expenses.filter(
            (expense) => expense.year === currentYear,
        );
        const filteredMonthlyExpenses = expenses.filter(
            (expense) => expense.month === currentMonth,
        );
        const yearlyTotal = calculateExpenses(filteredYearlyExpenses);
        const monthlyTotal = calculateExpenses(filteredMonthlyExpenses);
        dispatch(setMonthlyExpenses(filteredMonthlyExpenses));
        dispatch(setYearlyExpenses(filteredYearlyExpenses));
        dispatch(setMonthlyTotal(monthlyTotal));
        dispatch(setYearlyTotal(yearlyTotal));
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

    const updateMonthlyTotal = (total: number) => {
        dispatch(setMonthlyTotal(total));
    };

    const updateYearlyTotal = (total: number) => {
        dispatch(setYearlyTotal(total));
    };

    return {
        expenses,
        monthlyExpenses,
        yearlyExpenses,
        monthlyTotal,
        yearlyTotal,
        updateExpenses,
        updateMonthlyExpenses,
        updateYearlyExpenses,
        updateMonthlyTotal,
        updateYearlyTotal,
        resetExpense,
    };
};

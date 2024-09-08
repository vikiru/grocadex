import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

interface DateState {
    date: Date;
    currentDay: number;
    currentMonth: number;
    currentYear: number;
}

const initialState: DateState = {
    date: new Date(),
    currentDay: new Date().getDate(),
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
};

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setCurrentDay: (state) => {
            state.currentDay = new Date().getDate();
        },
        setCurrentMonth: (state) => {
            state.currentMonth = new Date().getMonth();
        },
        setCurrentYear: (state) => {
            state.currentYear = new Date().getFullYear();
        },
        incrementDate: (state) => {
            state.date.setDate(state.date.getDate() + 1);
        },
        decrementDate: (state) => {
            state.date.setDate(state.date.getDate() - 1);
        },
        incrementMonth: (state) => {
            state.date.setMonth(state.date.getMonth() + 1);
        },
        decrementMonth: (state) => {
            state.date.setMonth(state.date.getMonth() - 1);
        },
        incrementYear: (state) => {
            state.date.setFullYear(state.date.getFullYear() + 1);
        },
        decrementYear: (state) => {
            state.date.setFullYear(state.date.getFullYear() - 1);
        },
    },
});

export const {
    setDate,
    setCurrentDay,
    setCurrentMonth,
    setCurrentYear,
    incrementDate,
    decrementDate,
    incrementMonth,
    decrementMonth,
    incrementYear,
    decrementYear,
} = dateSlice.actions;

export const selectDate = (state: RootState) => state.date.date;
export const selectCurrentDay = (state: RootState) => state.date.currentDay;
export const selectCurrentMonth = (state: RootState) => state.date.currentMonth;
export const selectCurrentYear = (state: RootState) => state.date.currentYear;

export default dateSlice.reducer;

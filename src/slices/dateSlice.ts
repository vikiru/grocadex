import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type DateState = {
    date: string;
    currentDay: number;
    currentMonth: number;
    currentYear: number;
};

const initialState: DateState = {
    date: new Date().toISOString(),
    currentDay: new Date().getDate(),
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
};

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate: (state, action) => {
            const newDate = action.payload;
            state.date = newDate.toISOString();
            state.currentDay = newDate.getDate();
            state.currentMonth = newDate.getMonth();
            state.currentYear = newDate.getFullYear();
        },
        updateDate: (state) => {
            const now = new Date();
            state.date = now.toISOString();
            state.currentDay = now.getDate();
            state.currentMonth = now.getMonth();
            state.currentYear = now.getFullYear();
        },
    },
});

export const { setDate, updateDate } = dateSlice.actions;

export const selectDate = (state: RootState) => state.date.date;
export const selectCurrentDay = (state: RootState) => state.date.currentDay;
export const selectCurrentMonth = (state: RootState) => state.date.currentMonth;
export const selectCurrentYear = (state: RootState) => state.date.currentYear;

export default dateSlice.reducer;

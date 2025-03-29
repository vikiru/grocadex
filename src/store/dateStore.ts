import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '~store';

type DateState = {
    date: Date | number;
    getCurrentDay: () => number;
    getCurrentMonth: () => number;
    getCurrentYear: () => number;
    setDate: (date: Date) => void;
    resetDate: () => void;
};

export const useDateStore = create<DateState>()(
    persist(
        (set, get) => ({
            date: Date.now(),
            getCurrentDay: () => {
                const currentDate = new Date(get().date);
                return currentDate.getDate();
            },
            getCurrentMonth: () => {
                const currentDate = new Date(get().date);
                return currentDate.getMonth() + 1;
            },
            getCurrentYear: () => {
                const currentDate = new Date(get().date);
                return currentDate.getFullYear();
            },
            setDate: (date: Date) => set({ date }),
            resetDate: () => set({ date: Date.now() }),
        }),
        {
            name: 'date-storage',
            storage: createJSONStorage(() => zustandStorage),
        },
    ),
);

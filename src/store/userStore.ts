import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '~store/zustandStorage';
import { User } from '~types/User';

type UserState = {
    user: null | User;
    getUser: () => null | User;
    setUser: (user: User) => void;
    resetUser: () => void;
};

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            getUser: () => get().user,
            setUser: (user: User) => set({ user }),
            resetUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => zustandStorage),
        },
    ),
);

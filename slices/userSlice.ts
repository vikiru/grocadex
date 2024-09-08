import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { User } from '../types/User';

interface UserState {
    user: User | Partial<User> | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        resetUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import activeItemReducer from '~slices/activeItemSlice';
import dateReducer from '~slices/dateSlice';
import expenseReducer from '~slices/expenseSlice';
import groceryReducer from '~slices/groceryItemSlice';
import receiptReducer from '~slices/receiptSlice';
import userReducer from '~slices/userSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    activeItem: activeItemReducer,
    receipt: receiptReducer,
    grocery: groceryReducer,
    user: userReducer,
    date: dateReducer,
    expense: expenseReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

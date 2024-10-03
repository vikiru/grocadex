export const API_VERSION = `v1`;
export const API_VERSION_STRING = `/api/${API_VERSION}`;
export const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/${API_VERSION_STRING}`;

export const LOGIN_ROUTE = `${BASE_URL}/auth/login`;
export const LOGOUT_ROUTE = `${BASE_URL}/auth/logout`;

export const USER_ROUTE = `${BASE_URL}/users`;
export const ACTIVE_ITEM_ROUTE = `${BASE_URL}/active-items`;
export const GROCERY_ITEM_ROUTE = `${BASE_URL}/grocery-items`;
export const RECEIPT_ROUTE = `${BASE_URL}/receipts`;

export const DASHBOARD_ROUTE = `${BASE_URL}/dashboard`;

export const constructGroceryRoute = (receiptId: number, groceryId: number): string => {
    return `${RECEIPT_ROUTE}/${receiptId}/groceries/${groceryId}`;
};

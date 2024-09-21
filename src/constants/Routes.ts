export const API_VERSION = `v1`;
export const API_VERSION_STRING = `/api/${API_VERSION}`;

export const LOGIN_ROUTE = `${API_VERSION_STRING}/auth/login`;
export const LOGOUT_ROUTE = `${API_VERSION_STRING}/auth/logout`;

export const USER_ROUTE = `${API_VERSION_STRING}/users`;
export const ACTIVE_ITEM_ROUTE = `${API_VERSION_STRING}/active-items`;
export const GROCERY_ITEM_ROUTE = `${API_VERSION_STRING}/grocery-items`;
export const RECEIPT_ROUTE = `${API_VERSION_STRING}/receipts`;

export const DASHBOARD_ROUTE = `${USER_ROUTE}/dashboard`;

export const constructGroceryRoute = (receiptId: number, groceryId: number): string => {
    return `${RECEIPT_ROUTE}/${receiptId}/groceries/${groceryId}`;
};

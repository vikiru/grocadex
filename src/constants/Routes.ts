// API Routes
export const API_VERSION = `v1`;
export const API_VERSION_STRING = `/api/${API_VERSION}`;
export const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}${API_VERSION_STRING}`;

export const LOGIN_ROUTE = `${BASE_URL}/auth/login`;
export const LOGOUT_ROUTE = `${BASE_URL}/auth/logout`;
export const USER_ROUTE = `${BASE_URL}/users`;
export const ACTIVE_ITEM_ROUTE = `${BASE_URL}/receipts/groceries/active`;
export const EXPENSE_ROUTE = `${BASE_URL}/expenses`;
export const RECEIPT_ROUTE = `${BASE_URL}/receipts`;
export const DASHBOARD_ROUTE = `${USER_ROUTE}/dashboard`;

// Frontend Routes
export const FRONTEND_DASHBOARD_ROUTE = '/dashboard';
export const FRONTEND_EXPIRY_ROUTE = '/expiry';
export const FRONTEND_EXPENSE_ROUTE = '/expense';
export const FRONTEND_RECEIPT_ROUTE = '/receipt';

export const FRONTEND_LOGIN_ROUTE = '/auth/login';
export const FRONTEND_LOGOUT_ROUTE = '/auth/logout';
export const FRONTEND_REGISTRATION_ROUTE = '/auth/signup';

export const FRONTEND_GROCERY_CREATE_ROUTE = '/grocery/create';
export const FRONTEND_GROCERY_MODIFY_ROUTE = `/grocery/modify`;

export const FRONTEND_RECEIPT_CREATE_ROUTE = '/receipt/create';
export const FRONTEND_RECEIPT_MODIFY_ROUTE = `/receipt/modify`;

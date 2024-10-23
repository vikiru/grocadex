export type Expense = {
    date: Date | string;
    amount: number;
    stores: string[];
    storeBreakdown?: {
        storeName: string;
        amount: number;
    };
    month: number;
    year: number;
};

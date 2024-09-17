export type Expense = {
    date: Date | string;
    amount: number;
    stores?: string[];
    month: number;
    year: number;
};

// TODO: convert stores -> storeBreakdown: [{ storeName: string, amount: number }]

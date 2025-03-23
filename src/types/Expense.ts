export type Expense = {
    id?: number;
    month: number;
    year: number;
    total: number;
    stores: string[];
    receiptIds: number[];
};

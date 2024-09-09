export interface Expense {
    date: Date;
    amount: number;
    stores?: string[];
    month: number;
    year: number;
}

import { Expense } from './expense';

export type ShortExpense = Pick<
    Expense,
    'id' | 'name' | 'paidAmount' | 'orderStatus'
> & { price: number };

export interface Expense {
    id: string;
    name: string;
    description: string;
    unit: string;
    unitPriceNet: number;
    quantity: number;
    paidAmount: number;
    orderStatus: string;
    url: string;
    vatRate: number;
}

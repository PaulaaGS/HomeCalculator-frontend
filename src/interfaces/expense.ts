import { OrderStatus } from '../enums/order-status';
import { Unit } from '../enums/unit';

export interface Expense {
    id: string;
    name: string;
    description: string | null;
    unit: Unit;
    unitPriceNet: number;
    quantity: number;
    paidAmount: number;
    orderStatus: OrderStatus;
    url: string | null;
    vatRate: number;
}

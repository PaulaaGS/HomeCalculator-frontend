import { OrderStatus } from '../enums/order-status';

type OrderStatusObj = {
    [key in OrderStatus]: string;
};

const orderStatusLabel: OrderStatusObj = {
    notOrdered: 'Niezamówione',
    ordered: 'Zamówione',
    delivered: 'Dostarczone',
};

export const getOrderStatusLabel = (orderStatus: OrderStatus) => {
    return orderStatusLabel[orderStatus];
};

import { useState } from 'react';
import { OrderStatus } from '../../enums/order-status';
import { Unit } from '../../enums/unit';
import { ExpenseForm, FormValues } from '../ExpenseForm/ExpenseForm';
import { useNavigate } from 'react-router-dom';

const initialValues: FormValues = {
    description: null,
    unit: Unit.PIECE,
    orderStatus: OrderStatus.NOT_ORDERED,
    url: null,
    vatRate: 0.23,
};

export const AddExpenseView = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onFormSubmit = async (values: FormValues) => {
        setLoading(true);

        try {
            await fetch('http://localhost:3001/expense/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                }),
            });

            navigate('/expenses');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ExpenseForm
            loading={loading}
            initialValues={initialValues}
            onFormSubmit={onFormSubmit}
        />
    );
};

import { useState } from 'react';
import { OrderStatus } from '../../enums/order-status';
import { Unit } from '../../enums/unit';
import { ExpenseForm, FormValues } from '../ExpenseForm/ExpenseForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialValues: FormValues = {
    unit: Unit.PIECE,
    orderStatus: OrderStatus.NOT_ORDERED,
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

            toast('Dodano wydatek!', { type: 'success' });
            navigate('/expenses');
        } catch {
            toast('Coś poszło nie tak!', { type: 'error' });
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

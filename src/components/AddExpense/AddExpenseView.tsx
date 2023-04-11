import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OrderStatus } from '../../enums/order-status';
import { Unit } from '../../enums/unit';
import { API_BASE_URL } from '../../utils/base-url';
import { ExpenseForm, FormValues } from '../ExpenseForm/ExpenseForm';
import { Category } from '../../enums/category';

const initialValues: FormValues = {
    name: '',
    unitPriceGross: undefined,
    quantity: undefined,
    unit: Unit.PIECE,
    orderStatus: OrderStatus.NOT_ORDERED,
    category: Category.MAIN,
    vatRate: 0.23,
};

export const AddExpenseView = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onFormSubmit = async (values: FormValues) => {
        setLoading(true);

        try {
            await fetch(`${API_BASE_URL}/expense`, {
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

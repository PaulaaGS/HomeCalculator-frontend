import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Expense } from '../../interfaces/expense';
import { API_BASE_URL } from '../../utils/base-url';
import { ExpenseForm, FormValues } from '../ExpenseForm/ExpenseForm';

export const EditExpenseView = () => {
    const [oneExpense, setOneExpense] = useState<Expense | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { idOfExpense } = useParams();

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_BASE_URL}/expense/${idOfExpense}`);
            setOneExpense(await res.json());
        })();
    }, []);

    const onFormSubmit = async (values: FormValues) => {
        setLoading(true);

        try {
            await fetch(`${API_BASE_URL}/expense/${idOfExpense}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                }),
            });

            toast('Zapisano zmiany!', { type: 'success' });
            navigate('/expenses');
        } catch {
            toast('Coś poszło nie tak!', { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return oneExpense ? (
        <ExpenseForm
            loading={loading}
            initialValues={oneExpense}
            onFormSubmit={onFormSubmit}
        />
    ) : null;
};

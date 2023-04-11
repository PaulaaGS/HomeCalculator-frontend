import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Expense } from '../../interfaces/expense';
import { API_BASE_URL } from '../../utils/base-url';
import { ExpenseForm, FormValues } from '../ExpenseForm/ExpenseForm';
import { Spinner } from '../Spinner/Spinner';

export const EditExpenseView = () => {
    const [oneExpense, setOneExpense] = useState<Expense | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const { idOfExpense } = useParams();

    useEffect(() => {
        if (!idOfExpense) {
            return;
        }

        const fetchExpense = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `${API_BASE_URL}/expense/${idOfExpense}`,
                );
                setOneExpense(await res.json());
            } catch {
                toast('Coś poszło nie tak!', { type: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchExpense();
    }, [idOfExpense]);

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

    if (!oneExpense && loading) {
        return <Spinner />;
    }

    return oneExpense ? (
        <ExpenseForm
            loading={loading}
            initialValues={oneExpense}
            onFormSubmit={onFormSubmit}
        />
    ) : null;
};

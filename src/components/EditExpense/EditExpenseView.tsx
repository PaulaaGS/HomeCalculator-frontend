import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Expense } from '../../interfaces/expense';
import { ExpenseForm, FormValues } from '../ExpenseForm/ExpenseForm';
import { useNavigate } from 'react-router-dom';

export const EditExpenseView = () => {
    const [oneExpense, setOneExpense] = useState<Expense | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { idOfExpense } = useParams();

    useEffect(() => {
        (async () => {
            const res = await fetch(
                `http://localhost:3001/expense/${idOfExpense}`,
            );
            setOneExpense(await res.json());
        })();
    }, []);

    const onFormSubmit = async (values: FormValues) => {
        setLoading(true);

        try {
            await fetch(`http://localhost:3001/expense/${idOfExpense}`, {
                method: 'PUT',
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

    return oneExpense ? (
        <ExpenseForm
            loading={loading}
            initialValues={oneExpense}
            onFormSubmit={onFormSubmit}
        />
    ) : null;
};

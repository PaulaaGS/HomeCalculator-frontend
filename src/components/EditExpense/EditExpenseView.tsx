import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Expense } from '../../interfaces/expense';
import { ExpenseForm, FormValues } from '../ExpenseForm/ExpenseForm';

export const EditExpenseView = () => {
    const [oneExpense, setOneExpense] = useState<Expense | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
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
        } finally {
            setLoading(false);
        }
    };

    return oneExpense ? (
        <ExpenseForm
            initialValues={oneExpense}
            onFormSubmit={onFormSubmit}
            loading={loading}
        />
    ) : null;
};

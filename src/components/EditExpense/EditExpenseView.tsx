import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Expense } from '../../interfaces/expense';
import { EditExpenseForm, FormValues } from './EditExpenseForm';

export const EditExpenseView = () => {
    const [oneExpense, setOneExpense] = useState<Expense | null>(null);
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
        await fetch(`http://localhost:3001/expense/${idOfExpense}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...values,
            })
        });
    }

    return oneExpense ? (
        <EditExpenseForm
            initialValues={oneExpense}
            onFormSubmit={onFormSubmit}
        />
    ) : null;
};

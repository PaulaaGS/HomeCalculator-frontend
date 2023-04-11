import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import { Expense } from '../../interfaces/expense';
import { API_BASE_URL } from '../../utils/base-url';
import { GreenButton } from '../Button/GreenButton';
import { OrangeButton } from '../Button/OrangeButton';
import { RedButton } from '../Button/RedButton';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { ExpenseDetails } from './ExpenseDetails';
import { Spinner } from '../Spinner/Spinner';

export const ExpenseView = () => {
    const [oneExpense, setOneExpense] = useState<Expense | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { idOfExpense } = useParams();
    const navigate = useNavigate();

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

    const { isModalOpen, handleModalOpen, handleCancel, handleConfirm } =
        useDeleteConfirmation({ onDeleteSuccess: () => navigate('/expenses') });

    if (!oneExpense && loading) {
        return <Spinner />;
    }

    if (!oneExpense) {
        return null;
    }

    return (
        <>
            <Box width={'60%'} margin={'0 auto'}>
                <ExpenseDetails oneExpense={oneExpense} />
                <Box
                    margin='20px 0'
                    justifyContent={'flex-end'}
                    display={'flex'}
                    gap='10px'
                >
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to={`/expenses/edit/${idOfExpense}`}
                    >
                        <GreenButton>Edytuj</GreenButton>
                    </NavLink>
                    <RedButton onClick={() => handleModalOpen(oneExpense.id)}>
                        Usuń
                    </RedButton>
                </Box>
                <Box margin={'20px 0'} textAlign={'center'}>
                    <NavLink style={{ textDecoration: 'none' }} to='/expenses'>
                        <OrangeButton width={200}>Powrót do listy</OrangeButton>
                    </NavLink>
                </Box>
            </Box>

            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    );
};

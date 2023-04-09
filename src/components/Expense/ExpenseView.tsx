import { useEffect, useState } from 'react';
import { Expense } from '../../interfaces/expense';
import { useNavigate, useParams } from 'react-router';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { ExpenseDetails } from './ExpenseDetails';
import { GreenButton } from '../Button/GreenButton';
import { RedButton } from '../Button/RedButton';
import { OrangeButton } from '../Button/OrangeButton';
import { toast } from 'react-toastify';

export const ExpenseView = () => {
    const [oneExpense, setOneExpense] = useState<Expense | null>(null);
    const { idOfExpense } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!idOfExpense) {
            return;
        }

        const fetchExpense = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3001/expense/${idOfExpense}`,
                );
                setOneExpense(await res.json());
            } catch {
                toast('Coś poszło nie tak!', { type: 'error' });
            }
        };

        fetchExpense();
    }, [idOfExpense]);

    const { isModalOpen, handleModalOpen, handleCancel, handleConfirm } =
        useDeleteConfirmation({ onDeleteSuccess: () => navigate('/expenses') });

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

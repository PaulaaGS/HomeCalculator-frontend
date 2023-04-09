import { useEffect, useState } from 'react';
import { Expense } from '../../interfaces/expense';
import { useNavigate, useParams } from 'react-router';
import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { ExpenseDetails } from './ExpenseDetails';
import { GreenButton } from '../Button/GreenButton';
import { RedButton } from '../Button/RedButton';

export const ExpenseView = () => {
    const [oneExpense, setOneExpense] = useState<Expense | null>(null);
    const { idOfExpense } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!idOfExpense) {
            return;
        }

        const fetchExpense = async () => {
            const res = await fetch(
                `http://localhost:3001/expense/${idOfExpense}`,
            );
            setOneExpense(await res.json());
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
                        <Button
                            variant='contained'
                            sx={{
                                ':hover': {
                                    backgroundColor: '#e07824',
                                },
                                backgroundColor: '#f48529',
                            }}
                        >
                            Powrót do listy wydatków
                        </Button>
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

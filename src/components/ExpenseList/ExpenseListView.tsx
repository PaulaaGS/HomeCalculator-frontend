import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShortExpense } from '../../interfaces/short-expense';

import { toast } from 'react-toastify';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import { API_BASE_URL } from '../../utils/base-url';
import { GreenButton } from '../Button/GreenButton';
import { OrangeButton } from '../Button/OrangeButton';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { ExpenseTable } from './ExpenseTable';

export const ExpenseListView = () => {
    const [allExpenses, setAllExpenses] = useState<ShortExpense[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const loadExpenses = async () => {
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/expense/short-list`);
            const data = await res.json();

            setAllExpenses(data);
        } catch {
            toast('Coś poszło nie tak!', { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    const { isModalOpen, handleModalOpen, handleCancel, handleConfirm } =
        useDeleteConfirmation({ onDeleteSuccess: loadExpenses });

    if (loading) {
        return null;
    }

    return (
        <>
            <Box
                textAlign={'center'}
                width='80%'
                margin='0 auto'
                overflow='hidden'
            >
                <ExpenseTable
                    allExpenses={allExpenses}
                    onDeleteClick={handleModalOpen}
                />
                <Box
                    margin='20px 0'
                    justifyContent={'flex-end'}
                    display={'flex'}
                    gap='10px'
                >
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/expenses/add'
                    >
                        <GreenButton width={160}>Dodaj wydatek</GreenButton>
                    </NavLink>
                </Box>
            </Box>

            <Box margin={'5px 0'} textAlign={'center'}>
                <NavLink style={{ textDecoration: 'none' }} to='/'>
                    <OrangeButton width={200}>Podsumowanie</OrangeButton>
                </NavLink>
            </Box>

            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    );
};

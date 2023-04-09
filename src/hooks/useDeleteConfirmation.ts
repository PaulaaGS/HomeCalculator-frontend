import { useState } from 'react';
import { toast } from 'react-toastify';

type DeleteConfirmationProps = {
    onDeleteSuccess?: () => void;
};

export const useDeleteConfirmation = ({
    onDeleteSuccess,
}: DeleteConfirmationProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [clickedId, setClickedId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        try {
            await fetch(`http://localhost:3001/expense/${id}`, {
                method: 'DELETE',
            });
            toast('Usunięto wydatek!', { type: 'success' });
            onDeleteSuccess?.();
        } catch {
            toast('Coś poszło nie tak!', { type: 'error' });
        }
    };

    const handleModalOpen = (id: string) => {
        setClickedId(id);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setClickedId(null);
    };

    const handleCancel = () => {
        handleModalClose();
    };

    const handleConfirm = () => {
        clickedId && handleDelete(clickedId);
        handleModalClose();
    };

    return {
        isModalOpen,
        handleModalOpen,
        handleCancel,
        handleConfirm,
    };
};

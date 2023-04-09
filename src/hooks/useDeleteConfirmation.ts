import { useState } from 'react';

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
            onDeleteSuccess?.();
        } catch {
            console.error('Error occurred while deleting expense.');
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
        handleConfirm
    };
};

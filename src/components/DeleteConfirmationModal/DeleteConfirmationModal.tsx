import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { RedOutlinedButton } from '../Button/RedOutlinedButton';
import { GreenOutlinedButton } from '../Button/GreenOutlinedButton';

type DeleteConfirmationModalProps = {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export const DeleteConfirmationModal = ({
    isOpen,
    onCancel,
    onConfirm,
}: DeleteConfirmationModalProps) => {
    const handleCancel = () => {
        onCancel();
    };

    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Dialog open={isOpen}>
            <DialogContent>Czy na pewno chcesz usunąć wydatek?</DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
                <GreenOutlinedButton onClick={handleCancel}>
                    Anuluj
                </GreenOutlinedButton>
                <RedOutlinedButton onClick={handleConfirm}>
                    Usuń
                </RedOutlinedButton>
            </DialogActions>
        </Dialog>
    );
};

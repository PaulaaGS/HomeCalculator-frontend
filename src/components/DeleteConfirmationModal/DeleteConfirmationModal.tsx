import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from '@mui/material';

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
                <Button
                    variant='outlined'
                    sx={{
                        ':hover': {
                            color: '#ffffff',
                            borderColor: '#2a5f4b',
                            backgroundColor: '#2a5f4b',
                        },
                        color: '#2a5f4b',
                        borderColor: '#2a5f4b',
                        width: '100px'
                    }}
                    onClick={handleCancel}
                >
                    Anuluj
                </Button>
                <Button
                    variant='outlined'
                    sx={{
                        ':hover': {
                            color: '#ffffff',
                            borderColor: '#a6010f',
                            backgroundColor: '#a6010f',
                        },
                        color: '#c30010',
                        borderColor: '#c30010',
                        width: '100px'
                    }}
                    onClick={handleConfirm}
                >
                    Usuń
                </Button>
            </DialogActions>
        </Dialog>
    );
};

import { Button, ButtonProps } from '@mui/material';

type OrangeButtonProps = ButtonProps & { width?: number };

export const OrangeButton = ({
    children,
    width = 100,
    ...buttonProps
}: OrangeButtonProps) => {
    return (
        <Button
            variant='contained'
            sx={{
                ':hover': {
                    backgroundColor: '#e07824',
                },
                width: `${width}px`,
                backgroundColor: '#f48529',
            }}
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

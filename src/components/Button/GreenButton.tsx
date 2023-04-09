import { Button, ButtonProps } from '@mui/material';

type GreenButtonProps = ButtonProps & { width?: number };

export const GreenButton = ({
    children,
    width = 100,
    ...buttonProps
}: GreenButtonProps) => {
    return (
        <Button
            variant='contained'
            sx={{
                ':hover': {
                    backgroundColor: '#1e4536',
                },
                width: `${width}px`,
                backgroundColor: '#2a5f4b',
            }}
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

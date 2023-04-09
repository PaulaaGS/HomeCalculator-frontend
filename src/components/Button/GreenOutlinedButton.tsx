import { Button, ButtonProps } from '@mui/material';

type GreenOutlinedButtonProps = ButtonProps & { width?: number };

export const GreenOutlinedButton = ({
    children,
    width = 100,
    ...buttonProps
}: GreenOutlinedButtonProps) => {
    return (
        <Button
            variant='outlined'
            sx={{
                ':hover': {
                    color: '#ffffff',
                    borderColor: '#2a5f4b',
                    backgroundColor: '#2a5f4b',
                },
                width: `${width}px`,
                color: '#2a5f4b',
                borderColor: '#2a5f4b',
            }}
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

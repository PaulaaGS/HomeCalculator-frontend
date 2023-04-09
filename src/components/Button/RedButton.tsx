import { Button, ButtonProps } from '@mui/material';

type RedButtonProps = ButtonProps & { width?: number };

export const RedButton = ({
    children,
    width = 100,
    ...buttonProps
}: RedButtonProps) => {
    return (
        <Button
            variant='contained'
            sx={{
                ':hover': {
                    backgroundColor: '#a6010f',
                },
                width: `${width}px`,
                backgroundColor: '#c30010',
            }}
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

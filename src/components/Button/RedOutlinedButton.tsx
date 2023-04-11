import { Button, ButtonProps } from '@mui/material';

type RedOutlinedButtonProps = ButtonProps & { width?: number };

export const RedOutlinedButton = ({
    children,
    width = 100,
    ...buttonProps
}: RedOutlinedButtonProps) => {
    return (
        <Button
            variant='outlined'
            sx={{
                ':hover': {
                    color: '#ffffff',
                    borderColor: '#a6010f',
                    backgroundColor: '#a6010f',
                },
                width: `${width}px`,
                color: '#c30010',
                borderColor: '#c30010',
            }}
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

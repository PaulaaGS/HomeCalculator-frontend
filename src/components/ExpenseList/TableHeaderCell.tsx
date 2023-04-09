import { TableCell } from '@mui/material';
import { ReactNode } from 'react';

type TableHeaderCellProps = {
    children: ReactNode;
};

export const TableHeaderCell = (props: TableHeaderCellProps) => {
    return (
        <TableCell
            style={{ fontWeight: 'bold', background: '#faceaa' }}
            align='center'
        >
            {props.children}
        </TableCell>
    );
};

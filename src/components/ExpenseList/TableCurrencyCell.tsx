import { TableCell } from '@mui/material';
import { getAmountWithCurrency } from '../../utils/utils';

type TableCurrencyCellProps = {
    amount: number;
};

export const TableCurrencyCell = (props: TableCurrencyCellProps) => {
    return (
        <TableCell align='center'>
            {getAmountWithCurrency(props.amount)}
        </TableCell>
    );
};

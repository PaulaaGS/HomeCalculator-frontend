import { TableCell } from '@mui/material';
import { getAmountWithCurrency } from '../../utils/currency';

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

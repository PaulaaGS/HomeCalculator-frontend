import { TableCell } from '@mui/material';

type TableCurrencyCellProps = {
    amount: number;
};

export const TableCurrencyCell = (props: TableCurrencyCellProps) => {
    const formatter = new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
    });

    return (
        <TableCell align='center'>{formatter.format(props.amount)}</TableCell>
    );
};

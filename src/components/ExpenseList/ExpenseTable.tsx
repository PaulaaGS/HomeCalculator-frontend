import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    IconButton,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getOrderStatusLabel } from '../../utils/order-status';
import { TableCurrencyCell } from './TableCurrencyCell';
import { TableHeaderCell } from './TableHeaderCell';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ShortExpense } from '../../interfaces/short-expense';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

type ExpenseTableProps = {
    allExpenses: ShortExpense[];
    onDeleteClick: (id: string) => void;
};

export const ExpenseTable = ({
    allExpenses,
    onDeleteClick,
}: ExpenseTableProps) => {
    return (
        <TableContainer style={{ maxHeight: '60vh' }} component={Paper}>
            <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                aria-label='expense table'
            >
                <TableHead
                    style={{
                        textTransform: 'uppercase',
                    }}
                >
                    <TableRow>
                        <TableHeaderCell>Wydatek</TableHeaderCell>
                        <TableHeaderCell>Cena</TableHeaderCell>
                        <TableHeaderCell>Zapłacona kwota</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell> </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allExpenses.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <NavLink
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}
                                    to={row.id}
                                >
                                    {row.name}
                                </NavLink>
                            </TableCell>
                            <TableCurrencyCell amount={row.price} />
                            <TableCurrencyCell amount={row.paidAmount} />
                            <TableCell align='center'>
                                {getOrderStatusLabel(row.orderStatus)}
                            </TableCell>
                            <TableCell align='center' width={100}>
                                <NavLink
                                    style={{ textDecoration: 'none' }}
                                    to={`edit/${row.id}`}
                                >
                                    <IconButton>
                                        <BorderColorOutlinedIcon
                                            fontSize='small'
                                            style={{
                                                color: 'black',
                                                textDecoration: 'none',
                                            }}
                                        />
                                    </IconButton>
                                </NavLink>
                                <IconButton
                                    onClick={() => onDeleteClick(row.id)}
                                    sx={{
                                        ':hover': {
                                            backgroundColor: '#ff004419',
                                        },
                                    }}
                                >
                                    <DeleteOutlineOutlinedIcon
                                        fontSize='medium'
                                        style={{
                                            color: 'black',
                                            textDecoration: 'none',
                                        }}
                                    />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

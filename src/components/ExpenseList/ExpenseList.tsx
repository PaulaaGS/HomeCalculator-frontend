import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { ShortExpense } from '../../interfaces/short-expense';
import { TableCurrencyCell } from './TableCurrencyCell';
import { TableHeaderCell } from './TableHeaderCell';
import { NavLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { getOrderStatusLabel } from '../../utils/order-status';

export const ExpenseListView = () => {
    const [allExpenses, setAllExpenses] = useState<ShortExpense[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3001/expense/short-list');
            const data = await res.json();

            setAllExpenses(data);
        })();
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead
                        style={{
                            textTransform: 'uppercase',
                            background: '#faceaa',
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
                            <TableRow key={row.name}>
                                <TableCell>
                                    <NavLink
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
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
                                        <BorderColorOutlinedIcon
                                            style={{
                                                color: 'black',
                                                textDecoration: 'none',
                                            }}
                                        />
                                    </NavLink>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box margin={'20px 0'} textAlign={'center'}>
                <NavLink style={{ textDecoration: 'none' }} to='/'>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#f48529',
                        }}
                    >
                        Podsumowanie
                    </Button>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to='/expenses/add'>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#2a5f4b',
                        }}
                    >
                        Dodaj wydatek
                    </Button>
                </NavLink>
            </Box>
        </>
    );
};

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Box, Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShortExpense } from '../../interfaces/short-expense';
import { getOrderStatusLabel } from '../../utils/order-status';
import { TableCurrencyCell } from './TableCurrencyCell';
import { TableHeaderCell } from './TableHeaderCell';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export const ExpenseListView = () => {
    const [allExpenses, setAllExpenses] = useState<ShortExpense[]>([]);

    const loadExpenses = async () => {
        const res = await fetch('http://localhost:3001/expense/short-list');
        const data = await res.json();

        setAllExpenses(data);
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await fetch(`http://localhost:3001/expense/${id}`, {
                method: 'DELETE',
            });
            await loadExpenses();
        } catch {
            console.error('Error occurred while deleting expense.');
        }
    };

    return (
        <>
            <Box
                textAlign={'center'}
                width='80%'
                margin='0 auto'
                overflow='hidden'
            >
                <TableContainer style={{ maxHeight: '60vh' }} component={Paper}>
                    <Table
                        stickyHeader
                        sx={{ minWidth: 650 }}
                        aria-label='simple table'
                    >
                        <TableHead
                            style={{
                                textTransform: 'uppercase',
                                background: '#faceaa',
                            }}
                        >
                            <TableRow>
                                <TableHeaderCell>Wydatek</TableHeaderCell>
                                <TableHeaderCell>Cena</TableHeaderCell>
                                <TableHeaderCell>
                                    Zapłacona kwota
                                </TableHeaderCell>
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
                                                fontWeight: 'bold',
                                            }}
                                            to={row.id}
                                        >
                                            {row.name}
                                        </NavLink>
                                    </TableCell>
                                    <TableCurrencyCell amount={row.price} />
                                    <TableCurrencyCell
                                        amount={row.paidAmount}
                                    />
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
                                            onClick={() => handleDelete(row.id)}
                                            sx={{
                                                ':hover': {
                                                    backgroundColor:
                                                        '#ff004419',
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
                <Box
                    margin='20px 0'
                    justifyContent={'flex-end'}
                    display={'flex'}
                    gap='10px'
                >
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to='/expenses/add'
                    >
                        <Button
                            variant='contained'
                            sx={{
                                ':hover': {
                                    backgroundColor: '#1e4536',
                                },
                                backgroundColor: '#2a5f4b',
                            }}
                        >
                            Dodaj wydatek
                        </Button>
                    </NavLink>
                </Box>
            </Box>

            <Box margin={'20px 0'} textAlign={'center'}>
                <NavLink style={{ textDecoration: 'none' }} to='/'>
                    <Button
                        variant='contained'
                        sx={{
                            ':hover': {
                                backgroundColor: '#e07824',
                            },
                            backgroundColor: '#f48529',
                        }}
                    >
                        Podsumowanie
                    </Button>
                </NavLink>
            </Box>
        </>
    );
};

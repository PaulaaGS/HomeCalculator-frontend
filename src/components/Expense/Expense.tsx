import { useEffect, useState } from 'react';
import { Expense } from '../../interfaces/expense';
import { useNavigate, useParams } from 'react-router';
import { getAmountWithCurrency } from '../../utils/currency';
import TextField from '@mui/material/TextField';
import { Box, Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getOrderStatusLabel } from '../../utils/order-status';
import { getUnitLabel } from '../../utils/unit';

export const ExpenseView = () => {
    const [oneExpense, setOneExpense] = useState<Expense | null>(null);
    const { idOfExpense } = useParams();
    const navigate = useNavigate();

    if (!idOfExpense) {
        return null;
    }

    useEffect(() => {
        (async () => {
            const res = await fetch(
                `http://localhost:3001/expense/${idOfExpense}`,
            );
            setOneExpense(await res.json());
        })();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await fetch(`http://localhost:3001/expense/${id}`, {
                method: 'DELETE',
            });
            navigate('/expenses');
        } catch {
            console.error('Error occurred while deleting expense.');
        }
    };

    if (!oneExpense) {
        return null;
    }

    return (
        <>
            <Box width={'60%'} margin={'0 auto'}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label='Wydatek'
                            name='name'
                            defaultValue={oneExpense.name}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label='Opis wydatku'
                            name='description'
                            defaultValue={oneExpense.description}
                            multiline
                            maxRows={8}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            label='Cena jednostkowa (netto)'
                            name='unitPriceNet'
                            defaultValue={getAmountWithCurrency(
                                oneExpense.unitPriceNet,
                            )}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label='Stawka VAT'
                            name='vatRate'
                            defaultValue={oneExpense.vatRate * 100 + '%'}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label='Cena jednostkowa (brutto)'
                            name='unitPriceGross'
                            defaultValue={getAmountWithCurrency(
                                oneExpense.unitPriceNet *
                                    (oneExpense.vatRate + 1),
                            )}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            label='Ilość'
                            name='quantity'
                            defaultValue={oneExpense.quantity}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label='Jednostka'
                            name='unit'
                            defaultValue={getUnitLabel(oneExpense.unit)}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label='Cena końcowa (brutto)'
                            name='finalPriceGross'
                            defaultValue={getAmountWithCurrency(
                                oneExpense.unitPriceNet *
                                    (oneExpense.vatRate + 1) *
                                    oneExpense.quantity,
                            )}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label='Zapłacona kwota'
                            name='paidAmount'
                            defaultValue={getAmountWithCurrency(
                                oneExpense.paidAmount,
                            )}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Status zamówienia'
                            name='orderStatus'
                            defaultValue={getOrderStatusLabel(
                                oneExpense.orderStatus,
                            )}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label='Link do strony'
                            name='url'
                            defaultValue={oneExpense.url}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Box
                    margin='20px 0'
                    justifyContent={'flex-end'}
                    display={'flex'}
                    gap='10px'
                >
                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to={`/expenses/edit/${idOfExpense}`}
                    >
                        <Button
                            variant='contained'
                            sx={{
                                ':hover': {
                                    backgroundColor: '#1e4536',
                                },
                                width: '100px',
                                backgroundColor: '#2a5f4b',
                            }}
                        >
                            Edytuj
                        </Button>
                    </NavLink>
                    <Button
                        onClick={() => handleDelete(idOfExpense)}
                        variant='contained'
                        sx={{
                            ':hover': {
                                backgroundColor: '#a6010f',
                            },
                            width: '100px',
                            backgroundColor: '#c30010',
                        }}
                    >
                        Usuń
                    </Button>
                </Box>
                <Box margin={'20px 0'} textAlign={'center'}>
                    <NavLink style={{ textDecoration: 'none' }} to='/expenses'>
                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: '#f48529',
                            }}
                        >
                            Powrót do listy wydatków
                        </Button>
                    </NavLink>
                </Box>
            </Box>
        </>
    );
};

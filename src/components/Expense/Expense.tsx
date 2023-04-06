import { useEffect, useState } from 'react';
import { Expense } from '../../interfaces/expense';
import { useParams } from 'react-router';
import { getAmountWithCurrency } from '../../utils/utils';
import TextField from '@mui/material/TextField';
import { Box, Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const ExpenseView = () => {
    const [oneExpense, setOneExpense] = useState<Expense | null>(null);
    const { idOfExpense } = useParams();

    useEffect(() => {
        (async () => {
            const res = await fetch(
                `http://localhost:3001/expense/${idOfExpense}`,
            );
            setOneExpense(await res.json());
        })();
    }, []);

    if (oneExpense === null) {
        return null;
    }

    return (
        <>
            <Box width={'60%'} margin={'0 auto'}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label='Expense'
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
                            label='Description'
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
                            label='Unit price (net)'
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
                            label='Vat rate'
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
                            label='Unit price (gross)'
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
                            label='Quantity'
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
                            label='Unit'
                            name='unit'
                            defaultValue={oneExpense.unit}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label='Final price (gross)'
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
                            label='Paid amount'
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
                            label='Order status'
                            name='orderStatus'
                            defaultValue={oneExpense.orderStatus}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label='URL'
                            name='url'
                            defaultValue={oneExpense.url}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Box margin={'20px 0'} textAlign={'center'}>
                    <NavLink style={{ textDecoration: 'none' }} to='/expenses'>
                        <Button variant='outlined'>Back to list</Button>
                    </NavLink>
                </Box>
            </Box>
        </>
    );
};

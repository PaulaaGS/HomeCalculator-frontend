import { useEffect, useState } from 'react';
import { Expense } from '../../interfaces/expense';
import { useParams } from 'react-router';
import { getAmountWithCurrency } from '../../utils/utils';
import TextField from '@mui/material/TextField';
import { Box, Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

type FormValues = Partial<Omit<Expense, 'id'>>;

export const EditExpenseView = () => {
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

    const validationSchema = yup.object({
        name: yup.string().required('Email is required'),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            name: oneExpense?.name,
            description: oneExpense?.description,
            unit: oneExpense?.unit,
            unitPriceNet: oneExpense?.unitPriceNet,
            quantity: oneExpense?.quantity,
            paidAmount: oneExpense?.paidAmount,
            orderStatus: oneExpense?.orderStatus,
            url: oneExpense?.url,
            vatRate: oneExpense?.vatRate,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    if (!oneExpense) {
        return null;
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box width={'60%'} margin={'0 auto'}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id='name'
                            name='name'
                            label='Expense'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            maxRows={8}
                            id='description'
                            name='description'
                            label='Description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.description &&
                                Boolean(formik.errors.description)
                            }
                            helperText={
                                formik.touched.description &&
                                formik.errors.description
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            id='unitPriceNet'
                            name='unitPriceNet'
                            label='Unit price (net)'
                            value={formik.values.unitPriceNet}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.unitPriceNet &&
                                Boolean(formik.errors.unitPriceNet)
                            }
                            helperText={
                                formik.touched.unitPriceNet &&
                                formik.errors.unitPriceNet
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            id='vatRate'
                            name='vatRate'
                            label='Vat rate'
                            defaultValue={oneExpense.vatRate * 100 + '%'}
                            value={formik.values.vatRate}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.vatRate &&
                                Boolean(formik.errors.vatRate)
                            }
                            helperText={
                                formik.touched.vatRate && formik.errors.vatRate
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            id='quantity'
                            name='quantity'
                            label='Quantity'
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.quantity &&
                                Boolean(formik.errors.quantity)
                            }
                            helperText={
                                formik.touched.quantity &&
                                formik.errors.quantity
                            }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            id='unit'
                            name='unit'
                            label='Unit'
                            value={formik.values.unit}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.unit &&
                                Boolean(formik.errors.unit)
                            }
                            helperText={
                                formik.touched.unit && formik.errors.unit
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id='paidAmount'
                            name='paidAmount'
                            label='Paid amount'
                            defaultValue={getAmountWithCurrency(
                                oneExpense.paidAmount,
                            )}
                            value={formik.values.paidAmount}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.paidAmount &&
                                Boolean(formik.errors.paidAmount)
                            }
                            helperText={
                                formik.touched.paidAmount &&
                                formik.errors.paidAmount
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id='orderStatus'
                            name='orderStatus'
                            label='Order status'
                            value={formik.values.orderStatus}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.orderStatus &&
                                Boolean(formik.errors.orderStatus)
                            }
                            helperText={
                                formik.touched.orderStatus &&
                                formik.errors.orderStatus
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id='url'
                            name='url'
                            label='URL'
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.url && Boolean(formik.errors.url)
                            }
                            helperText={formik.touched.url && formik.errors.url}
                        />
                    </Grid>
                </Grid>
                <Box margin={'20px 0'} textAlign={'center'}>
                    <NavLink style={{ textDecoration: 'none' }} to='/expenses'>
                        <Button variant='outlined'>Back to list</Button>
                    </NavLink>

                    <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

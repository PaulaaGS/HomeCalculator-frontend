import {
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
} from '@mui/material';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import { Expense } from '../../interfaces/expense';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Unit } from '../../enums/unit';
import { OrderStatus } from '../../enums/order-status';
import { getOrderStatusLabel } from '../../utils/order-status';

export type FormValues = Partial<Omit<Expense, 'id'>>;

type ExpenseFormProps = {
    initialValues: FormValues;
    onFormSubmit: (values: FormValues) => void;
    loading: boolean;
};

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Pole obowiązkowe')
        .min(3, 'Nazwa musi mieć od 3 do 60 znaków')
        .max(60, 'Nazwa musi mieć od 3 do 60 znaków'),
    description: yup
        .string()
        .nullable()
        .max(10000, 'Opis może mieć maksymalnie 10000 znaków'),
    unitPriceNet: yup
        .number()
        .required('Pole obowiązkowe')
        .min(0, 'Cena nie może być ujemna'),
    quantity: yup
        .number()
        .required('Pole obowiązkowe')
        .min(1, 'Ilość musi być większa od zera'),
    paidAmount: yup
        .number()
        .nullable()
        .min(0, 'Zapłacona kwota nie może być ujemna'),
    url: yup
        .string()
        .nullable()
        .max(2048, 'Link do strony może mieć maksymalnie 2048 znaków'),
});

export const ExpenseForm = ({
    initialValues,
    onFormSubmit,
    loading,
}: ExpenseFormProps) => {
    const formik = useFormik<FormValues>({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            onFormSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box width={'60%'} margin={'0 auto'}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id='name'
                            name='name'
                            label='Nazwa'
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
                            label='Opis'
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

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id='unitPriceNet'
                            name='unitPriceNet'
                            label='Cena jedn. (netto)'
                            type='number'
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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        zł
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id='vatRateLabel'>
                                Stawka VAT
                            </InputLabel>
                            <Select
                                labelId='vatRateLabel'
                                id='vatRate'
                                name='vatRate'
                                label='Stawka VAT'
                                value={formik.values.vatRate}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.vatRate &&
                                    Boolean(formik.errors.vatRate)
                                }
                            >
                                <MenuItem value={0}>0%</MenuItem>
                                <MenuItem value={0.05}>5%</MenuItem>
                                <MenuItem value={0.08}>8%</MenuItem>
                                <MenuItem value={0.23}>23%</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            id='quantity'
                            name='quantity'
                            label='Ilość'
                            type='number'
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

                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id='unitLabel'>Jednostka</InputLabel>
                            <Select
                                labelId='unitLabel'
                                id='unit'
                                name='unit'
                                label='Jednostka'
                                value={formik.values.unit}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.unit &&
                                    Boolean(formik.errors.unit)
                                }
                            >
                                <MenuItem value={Unit.PIECE}>szt.</MenuItem>
                                <MenuItem value={Unit.METER}>m</MenuItem>
                                <MenuItem value={Unit.SQUARE_METER}>
                                    m²
                                </MenuItem>
                                <MenuItem value={Unit.CUBIC_METER}>m³</MenuItem>
                                <MenuItem value={Unit.LITER}>l</MenuItem>
                                <MenuItem value={Unit.GRAM}>g</MenuItem>
                                <MenuItem value={Unit.KILO}>kg</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id='paidAmount'
                            name='paidAmount'
                            label='Zapłacona kwota (brutto)'
                            type='number'
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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        zł
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id='orderStatusLabel'>
                                Status zamówienia
                            </InputLabel>
                            <Select
                                labelId='orderStatusLabel'
                                id='orderStatus'
                                name='orderStatus'
                                label='Status zamówienia'
                                value={formik.values.orderStatus}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.orderStatus &&
                                    Boolean(formik.errors.orderStatus)
                                }
                            >
                                <MenuItem value={OrderStatus.NOT_ORDERED}>
                                    {getOrderStatusLabel(
                                        OrderStatus.NOT_ORDERED,
                                    )}
                                </MenuItem>
                                <MenuItem value={OrderStatus.ORDERED}>
                                    {getOrderStatusLabel(OrderStatus.ORDERED)}
                                </MenuItem>
                                <MenuItem value={OrderStatus.DELIVERED}>
                                    {getOrderStatusLabel(OrderStatus.DELIVERED)}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id='url'
                            name='url'
                            label='Link do strony'
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.url && Boolean(formik.errors.url)
                            }
                            helperText={formik.touched.url && formik.errors.url}
                        />
                    </Grid>
                </Grid>
                <Box
                    margin='20px 0'
                    justifyContent={'flex-end'}
                    display={'flex'}
                    gap='10px'
                >
                    <Button
                        disabled={loading}
                        color='primary'
                        variant='contained'
                        type='submit'
                        sx={{
                            ':hover': {
                                backgroundColor: '#1e4536',
                            },
                            backgroundColor: '#2a5f4b',
                            width: '100px',
                        }}
                    >
                        Zapisz
                    </Button>
                </Box>
                <Box textAlign={'center'}>
                    <NavLink style={{ textDecoration: 'none' }} to='/expenses'>
                        <Button
                            variant='contained'
                            sx={{
                                ':hover': {
                                    backgroundColor: '#e07824',
                                },
                                backgroundColor: '#f48529',
                            }}
                        >
                            Powrót do listy wydatków
                        </Button>
                    </NavLink>
                </Box>
            </Box>
        </form>
    );
};

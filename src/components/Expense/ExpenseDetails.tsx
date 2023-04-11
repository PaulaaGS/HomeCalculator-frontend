import { Grid, TextField } from '@mui/material';
import { getAmountWithCurrency } from '../../utils/currency';
import { getOrderStatusLabel } from '../../utils/order-status';
import { getUnitLabel } from '../../utils/unit';
import { Expense } from '../../interfaces/expense';
import { getCategoryLabel } from '../../utils/category';

type ExpenseDetailsProps = {
    oneExpense: Expense;
};

export const ExpenseDetails = ({ oneExpense }: ExpenseDetailsProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label='Nazwa'
                    name='name'
                    defaultValue={oneExpense.name}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    maxRows={8}
                    multiline
                    label='Opis'
                    name='description'
                    defaultValue={oneExpense.description}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField
                    fullWidth
                    label='Cena jedn. (brutto)'
                    name='unitPriceGross'
                    defaultValue={getAmountWithCurrency(
                        oneExpense.unitPriceGross,
                    )}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    fullWidth
                    label='Stawka VAT'
                    name='vatRate'
                    defaultValue={oneExpense.vatRate * 100 + '%'}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label='Cena końcowa (netto)'
                    name='finalPriceNet'
                    defaultValue={getAmountWithCurrency(
                        (oneExpense.unitPriceGross / (oneExpense.vatRate + 1)) *
                            oneExpense.quantity,
                    )}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <Grid item xs={4}>
                <TextField
                    fullWidth
                    label='Ilość'
                    name='quantity'
                    defaultValue={oneExpense.quantity}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    fullWidth
                    label='Jednostka'
                    name='unit'
                    defaultValue={getUnitLabel(oneExpense.unit)}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label='Cena końcowa (brutto)'
                    name='finalPriceGross'
                    defaultValue={getAmountWithCurrency(
                        oneExpense.unitPriceGross * oneExpense.quantity,
                    )}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label='Zapłacona kwota (brutto)'
                    name='paidAmount'
                    defaultValue={getAmountWithCurrency(oneExpense.paidAmount)}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    fullWidth
                    label='Kategoria'
                    name='category'
                    defaultValue={getCategoryLabel(oneExpense.category)}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    fullWidth
                    label='Status zamówienia'
                    name='orderStatus'
                    defaultValue={getOrderStatusLabel(oneExpense.orderStatus)}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    maxRows={8}
                    multiline
                    label='Link do strony'
                    name='url'
                    defaultValue={oneExpense.url}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
        </Grid>
    );
};

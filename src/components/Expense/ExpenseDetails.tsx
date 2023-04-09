import { Grid, TextField } from '@mui/material';
import { getAmountWithCurrency } from '../../utils/currency';
import { getOrderStatusLabel } from '../../utils/order-status';
import { getUnitLabel } from '../../utils/unit';
import { Expense } from '../../interfaces/expense';

type ExpenseDetailsProps = {
    oneExpense: Expense;
};

export const ExpenseDetails = ({ oneExpense }: ExpenseDetailsProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label='Nazwa'
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
                    label='Opis'
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
                    label='Cena jedn. (netto)'
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
            <Grid item xs={2}>
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
            <Grid item xs={6}>
                <TextField
                    label='Cena jedn. (brutto)'
                    name='unitPriceGross'
                    defaultValue={getAmountWithCurrency(
                        oneExpense.unitPriceNet * (oneExpense.vatRate + 1),
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
            <Grid item xs={2}>
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
            <Grid item xs={6}>
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
                    label='Zapłacona kwota (brutto)'
                    name='paidAmount'
                    defaultValue={getAmountWithCurrency(oneExpense.paidAmount)}
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
                    defaultValue={getOrderStatusLabel(oneExpense.orderStatus)}
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
    );
};

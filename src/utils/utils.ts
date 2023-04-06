export const getAmountWithCurrency = (amount: number) => {
    const formatter = new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
    });

    return formatter.format(amount);
};

export function formatCurrency(value: number, currencySymbol: string = 'zł'): string {
    const formattedValue = value.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 2,
    });

    return formattedValue.replace('PLN', currencySymbol);
}

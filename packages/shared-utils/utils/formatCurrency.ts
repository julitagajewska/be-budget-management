export function formatCurrency(value: number, currencySymbol: string = 'zł'): string {
    // Format the number as a currency string with thousand separators and two decimal places
    const formattedValue = value.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 2,
    });

    // Replace default currency symbol with provided one
    return formattedValue.replace('PLN', currencySymbol);
}

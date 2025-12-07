// Funcion para formatear la moneda
export function formatCurrency(amount: number, locale: string = 'en-US', currency: string = 'USD'): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
}

// Funcion para formatear fechas
export function formatDateTime(dateString: string, locale: string = 'en-US'): string {
    const date = new Date(dateString);
    // Opciones para incluir hora y minuto
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',   
        minute: '2-digit',    
        hour12: false,       
    };

    return new Intl.DateTimeFormat(locale, options).format(date);
}
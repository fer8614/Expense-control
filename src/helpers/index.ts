
export function formatCurrency( amount: number ) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount)
}
//To use dates in english
export function formatDataEnglish( dateString: string ) : string {
    const dateObj = new Date(dateString)
    const options : Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('en-US', options).format(dateObj)
}

//To use dates in spanish
export function formatDataSpanish( dateString: string ) : string {
    const dateObj = new Date(dateString)
    const options : Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}
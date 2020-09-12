class Formatter {
    formatDate = (timestamp) => new Date(timestamp.slice(0, -6)).toDateString()
    
    formatCurrency = (number) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number)
}

export default new Formatter()
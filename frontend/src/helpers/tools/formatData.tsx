
/**
 * @param date - a string containing the date to be formatted in ISO format
 * @returns a string containing the formatted date in the format: "month day, year"
 */
function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
}

export default formatDate;
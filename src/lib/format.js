const DATE_OPTIONS = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
const LOCALE = 'it-IT'

const date = date => date.toLocaleDateString(LOCALE, DATE_OPTIONS)

export {date}

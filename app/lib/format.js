const DATE_OPTIONS = {year: 'numeric', month: 'long', day: 'numeric'}
const TIME_OPTIONS = {hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Rome'}
const LOCALE = 'it-IT'

const date = date => date.toLocaleDateString(LOCALE, DATE_OPTIONS)

const dateTime = d => {
  const s = date(d)
  const time = d.toLocaleTimeString(LOCALE, TIME_OPTIONS)
  return `${s}, ${time}`
}

const dateWithOptionalTime = d => {
  return dateTime(d).replace(', 00:00', '')
}

export {date, dateTime, dateWithOptionalTime}

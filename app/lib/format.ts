const DATE_OPTIONS: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'}
const TIME_OPTIONS: Intl.DateTimeFormatOptions = {hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Rome'}
const LOCALE = 'it-IT'

const date = (date: Date): string => date.toLocaleDateString(LOCALE, DATE_OPTIONS)

const dateTime = (d: Date): string => {
  const s = date(d)
  const time = d.toLocaleTimeString(LOCALE, TIME_OPTIONS)
  return `${s}, ${time}`
}

const dateWithOptionalTime = (d: Date) : string => {
  return dateTime(d).replace(', 00:00', '')
}

export {date, dateTime, dateWithOptionalTime}

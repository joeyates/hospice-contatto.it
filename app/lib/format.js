const DATE_OPTIONS = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
const LOCALE = 'it-IT'

const date = date => date.toLocaleDateString(LOCALE, DATE_OPTIONS)

const isDateOnly = d => d.getHours() === 0 && d.getMinutes() === 0 && d.getSeconds() === 0

const dateTime = d => {
  const s = date(d)
  const time = d.toLocaleTimeString(LOCALE)
  return `${s}, ${time}`
}

const dateWithOptionalTime = d => {
  const dateOnly = isDateOnly(d)
  if(dateOnly) {
    return date(d)
  } else {
    return dateTime(d)
  }
}

export {date, dateTime, dateWithOptionalTime}

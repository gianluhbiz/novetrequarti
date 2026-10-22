// Real opening hours (Tripadvisor + menù digitale), always evaluated in Nuoro's time zone.

export type Status = 'IN ORARIO' | 'IN PARTENZA' | 'ULTIMA CHIAMATA' | 'PARTITO' | 'SOPPRESSO'

export type Departure = { time: string; dest: string; short: string; from: number; to: number }

const H = (h: number, m = 0) => h * 60 + m

/** Closing time in minutes for a weekday (0 = Sunday). null = closed. */
export const closingFor = (day: number): number | null => {
  if (day === 0) return null
  return day === 5 || day === 6 ? H(24) : H(23)
}

export const OPENING = H(8)

export const nowInNuoro = () => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0'
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  const minutes = Number(get('hour')) * 60 + Number(get('minute'))
  return { day, minutes }
}

export const departuresFor = (day: number): Departure[] => {
  const close = closingFor(day) ?? H(23)
  return [
    { time: '08:00', dest: 'COLAZIONE', short: 'COLAZIONE', from: H(8), to: H(12, 30) },
    { time: '12:30', dest: 'PRANZO', short: 'PRANZO', from: H(12, 30), to: H(14, 30) },
    { time: '14:30', dest: 'TAGLIERI E COCKTAIL', short: 'COCKTAIL', from: H(14, 30), to: close - 30 },
    { time: close === H(24) ? '00:00' : '23:00', dest: 'ULTIMA CORSA', short: 'ULTIMA CORSA', from: close - 30, to: close },
  ]
}

export const statusOf = (d: Departure, day: number, minutes: number): Status => {
  if (closingFor(day) === null) return 'SOPPRESSO'
  if (minutes < d.from) return 'IN ORARIO'
  if (minutes < d.to) return d.dest === 'ULTIMA CORSA' ? 'ULTIMA CHIAMATA' : 'IN PARTENZA'
  return 'PARTITO'
}

const DAY_NAMES = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato']

export const openState = (day: number, minutes: number) => {
  const close = closingFor(day)
  if (close !== null && minutes >= OPENING && minutes < close) {
    return { open: true, label: `Aperto · fino alle ${close === H(24) ? '00:00' : '23:00'}` }
  }
  // Find next opening day.
  let next = minutes < OPENING && close !== null ? day : (day + 1) % 7
  while (closingFor(next) === null) next = (next + 1) % 7
  const when = next === day ? 'alle 8:00' : `${DAY_NAMES[next]} alle 8:00`
  return { open: false, label: `Chiuso · riapre ${when}` }
}

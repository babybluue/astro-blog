export const displayDate = (date: Date) => {
  const localDate = date.getTime() + date.getTimezoneOffset() * 60 * 1000
  return new Date(localDate).toISOString().slice(0, 11).replace('T', '')
}

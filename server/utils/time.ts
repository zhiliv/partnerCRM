import moment from 'moment-timezone'

/*
 * Получение текущей даты
 * @function DateNow
 */
export const DateNow = () => {
  return moment().tz('Europe/Moscow').format('YYYY-MM-DD HH:mm:ss')
}

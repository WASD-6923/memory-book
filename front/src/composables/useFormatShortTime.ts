import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const useFormatShortTime = (date: string, format = 'HH:mm') => {
  return dayjs.utc(date).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(format)
}

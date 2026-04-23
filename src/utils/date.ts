import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ru';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ru');

export function formatMatchDate(utcDate: string): string {
  return dayjs.utc(utcDate).local().format('DD.MM.YYYY');
}

export function formatMatchTime(utcDate: string): string {
  return dayjs.utc(utcDate).local().format('HH:mm');
}

export function toApiDate(date: dayjs.Dayjs): string {
  return date.format('YYYY-MM-DD');
}

export function isValidDateRange(from: dayjs.Dayjs | null, to: dayjs.Dayjs | null): boolean {
  if (!from || !to) return false;
  if (!from.isValid() || !to.isValid()) return false;
  if (from.year() < 1000 || to.year() < 1000) return false;
  return true;
}

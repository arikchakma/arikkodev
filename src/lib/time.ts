import { DateTime } from 'luxon';

export function formatDate(date: Date) {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);
}

export function getYearFromDate(date: Date) {
  return DateTime.fromJSDate(date).year;
}

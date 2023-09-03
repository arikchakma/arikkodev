import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getRelativeTime(date: Date) {
  return dayjs(date).fromNow();
}

export function formatDate(date: Date) {
  return dayjs(date).format('MM/DD/YYYY');
}

export function getYear(date: Date) {
  return dayjs(date).year();
}

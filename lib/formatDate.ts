import { format, parseISO } from 'date-fns';

export function formatDate(date: string): string {
  return format(parseISO(date), 'dd/MM/yyyy');
}

export function formatDateFull(date: string): string {
  return format(parseISO(date), 'EEEE MMM dd yyyy');
}

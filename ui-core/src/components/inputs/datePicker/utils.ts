import { CalendarSlot } from './type';

export function isValidSlot(slot: CalendarSlot) {
  if(slot.start && slot.end){
    return slot.start.getTime() <= slot.end.getTime();
  }
  return true;
}

/**
 *  Get the dates from the previous month that are in the first week of the current month
 * @param month The month of the current date
 * @param fullYear The year of the current date
 * @returns   An array of dates from the previous month that are in the first week of the current month
 */
export function getPrevMonthDatesInFirstWeek(month: number, fullYear: number): Date[] {
  const firstDayOfMonth = new Date(fullYear, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // if the first day of the week is Monday, we don't need to return any dates from the previous month
  if (firstDayOfWeek === 1) {
    return [];
  }

  const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const lastDayPrevMonth = new Date(fullYear, month, 0);

  const dates: Date[] = [];
  for (let i = 0; i < daysFromPrevMonth; i++) {
    const day = lastDayPrevMonth.getDate() - i;
    dates.push(new Date(lastDayPrevMonth.getFullYear(), lastDayPrevMonth.getMonth(), day));
  }

  return dates;
}

/**
 *  Get the dates from the next month that are in the last week of the current month
 * @param month The month of the current date
 * @param fullYear The year of the current date
 * @returns  An array of dates from the next month that are in the last week of the current month
 */
export function getNextMonthDatesInLastWeek(month: number, fullYear: number) {
  const lastDayOfMonth = new Date(fullYear, month + 1, 0);
  const lastDayOfWeek = lastDayOfMonth.getDay();
  const daysFromNextMonth = (7 - lastDayOfWeek) % 7;

  if (daysFromNextMonth === 0) {
    return [];
  }

  const nextMonth = new Date(fullYear, month + 1, 1);

  const dates: Date[] = [];
  for (let i = 0; i < daysFromNextMonth; i++) {
    const day = i + 1;
    dates.push(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day));
  }

  return dates;
}

/**
 * Get all the dates in the month of the given date
 * @param month The month of the current date
 * @param fullYear The year of the current date
 * @returns An array of all the dates in the month of the given date
 */
export function getAllDatesInMonth(month: number, fullYear: number) {
  const lastDayOfMonth = new Date(fullYear, month + 1, 0);
  const totalDaysInMonth = lastDayOfMonth.getDate();

  const dates: Date[] = [];
  for (let day = 1; day <= totalDaysInMonth; day++) {
    dates.push(new Date(fullYear, month, day));
  }

  return dates;
}

export function isSameDay(date1: Date | null, date2: Date | null) {
  if (date1 === null || date2 === null) {
    return false;
  }

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function isWithinInterval(date: Date, interval: { start: Date; end: Date }) {
  return date.getTime() >= interval.start.getTime() && date.getTime() <= interval.end.getTime();
}

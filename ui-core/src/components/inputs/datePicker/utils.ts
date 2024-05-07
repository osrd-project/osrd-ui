import { CalendarSlot } from './type';

/**
 * Check if the given slot is valid
 * @param slot The slot to check
 * @returns True if the slot is valid, false otherwise
 */
export function isValidSlot(slot: CalendarSlot) {
  if (slot.start && slot.end) {
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

/**
 * Check if the given dates are the same day
 * @param date1 The first date
 * @param date2 The second date
 * @returns True if the dates are the same day, false otherwise
 */
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

/**
 * Check if the given date is within the given slot
 * if the slot is not provided, the date is considered to be within the slot
 * if a boundary of the slot is not provided, it's considered to be an open boundary
 * @param date The date to check
 * @param slot The slot to check
 * @returns True if the date is within the slot, false otherwise
 */
export function isWithinInterval(date: Date, slot?: CalendarSlot) {
  if (
    slot &&
    ((slot.start && slot.start.getTime() > date.getTime()) ||
      (slot.end && slot.end.getTime() < date.getTime()))
  ) {
    return false;
  }
  return true;
}

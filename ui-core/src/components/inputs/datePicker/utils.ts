import { CalendarSlot } from './type';

/**
 * Check if the given slot is valid
 * @param slot The slot to check
 * @returns True if the slot is valid, false otherwise
 */
export function isValidSlot(slot: CalendarSlot) {
  if (slot.start && slot.end) {
    return normalizeDate(slot.start).getTime() <= normalizeDate(slot.end).getTime();
  }
  return true;
}

/**
 *  Get the dates from the previous month that are in the first week of the current month
 * @param month The month of the current date
 * @param fullYear The year of the current date
 * @returns   An array of dates from the previous month that are in the first week of the current month
 */
export function getDatesFromPreviousMonthInFirstWeek(month: number, fullYear: number): Date[] {
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
    dates.unshift(new Date(lastDayPrevMonth.getFullYear(), lastDayPrevMonth.getMonth(), day));
  }

  return dates;
}

/**
 *  Get the dates from the next month that are in the last week of the current month
 * @param month The month of the current date
 * @param fullYear The year of the current date
 * @returns  An array of dates from the next month that are in the last week of the current month
 */
export function getDatesFromNextMonthInLastWeek(month: number, fullYear: number) {
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
 * Normalize the given date to midnight
 * @param date The date to normalize
 * @returns The normalized date
 */
export function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
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
  if (!slot) return true;

  const normalizedDate = normalizeDate(date);
  const normalizedStart = slot.start ? normalizeDate(slot.start) : undefined;
  const normalizedEnd = slot.end ? normalizeDate(slot.end) : undefined;

  const isAfterStart = normalizedStart ? normalizedDate >= normalizedStart : true;
  const isBeforeEnd = normalizedEnd ? normalizedDate <= normalizedEnd : true;

  return isAfterStart && isBeforeEnd;
}

/**
 * Generates a list of dates, each representing the start of a month,
 * starting from a given date and continuing for a specified number of months.
 * This function correctly handles year rollover.
 * @param startDate - The date from which to start generating month start dates.
 * @param monthsCount - The number of month start dates to generate.
 * @returns An array of Dates, each set to the first day of consecutive months starting from startDate.
 */
export function generateSequentialDates(startDate: Date, monthsCount: number) {
  const dates = [];
  for (let i = 0; i < monthsCount; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    dates.push(new Date(date.getFullYear(), date.getMonth(), 1));
  }
  return dates;
}
/**
 * Format the given date as a string in the format 'dd/mm/yy'.
 * @param date The date to format
 * @returns The formatted date string
 */
export function formatDateString(date: Date | null) {
  if (date === null) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

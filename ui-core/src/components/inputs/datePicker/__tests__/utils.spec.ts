import {
  isValidSlot,
  getDatesFromPreviousMonthInFirstWeek,
  getDatesFromNextMonthInLastWeek,
  getAllDatesInMonth,
  isSameDay,
  isWithinInterval,
  normalizeDate,
} from '../utils';
import { describe, expect, it } from 'vitest';

describe('isValidSlot', () => {
  it('should return true if start and end are not defined', () => {
    const slot = { start: null, end: null };
    expect(isValidSlot(slot)).toBe(true);
  });

  it('should return true if start is before end', () => {
    const slot = { start: new Date(2022, 0, 1), end: new Date(2022, 0, 2) };
    expect(isValidSlot(slot)).toBe(true);
  });

  it('should return true if start is the same as end', () => {
    const date = new Date(2022, 0, 1);
    const slot = { start: date, end: date };
    expect(isValidSlot(slot)).toBe(true);
  });

  it('should return false if start is after end', () => {
    const slot = { start: new Date(2022, 0, 2), end: new Date(2022, 0, 1) };
    expect(isValidSlot(slot)).toBe(false);
  });
});

describe('getDatesFromPreviousMonthInFirstWeek', () => {
  it('should return an empty array if the first day of the month is a Monday', () => {
    // 1st April 2024 is a Monday
    const dates = getDatesFromPreviousMonthInFirstWeek(3, 2024);
    expect(dates).toEqual([]);
  });

  it('should return dates from the previous month if the first day of the month is not a Monday', () => {
    // 1st May 2024 is a Wednesday
    const dates = getDatesFromPreviousMonthInFirstWeek(4, 2024);
    expect(dates).toEqual([new Date(2024, 3, 29), new Date(2024, 3, 30)]);
  });

  it('should handle the case where the first day of the month is a Sunday', () => {
    // 1st September 2024 is a Sunday, so the function should return the dates of the last 6 days of August
    const dates = getDatesFromPreviousMonthInFirstWeek(8, 2024);
    expect(dates).toEqual([
      new Date(2024, 7, 26),
      new Date(2024, 7, 27),
      new Date(2024, 7, 28),
      new Date(2024, 7, 29),
      new Date(2024, 7, 30),
      new Date(2024, 7, 31),
    ]);
  });
});

describe('getDatesFromNextMonthInLastWeek', () => {
  it('should return an empty array if the last day of the month is a Sunday', () => {
    // June 2024 ends on a Sunday
    const dates = getDatesFromNextMonthInLastWeek(5, 2024);
    expect(dates).toEqual([]);
  });

  it('should return dates from the next month if the last day of the month is not a Sunday', () => {
    // April 2024 ends on a Tuesday
    const dates = getDatesFromNextMonthInLastWeek(3, 2024);
    expect(dates).toEqual([
      new Date(2024, 4, 1),
      new Date(2024, 4, 2),
      new Date(2024, 4, 3),
      new Date(2024, 4, 4),
      new Date(2024, 4, 5),
    ]);
  });

  it('should handle the case where the last day of the month is a Saturday', () => {
    // August 2024 ends on a Saturday
    const dates = getDatesFromNextMonthInLastWeek(7, 2024);
    expect(dates).toEqual([new Date(2024, 8, 1)]);
  });
});

describe('getAllDatesInMonth', () => {
  it('should return all dates in February 2024', () => {
    const dates = getAllDatesInMonth(1, 2024);
    const expectedDates = Array.from({ length: 29 }, (_, i) => new Date(2024, 1, i + 1));
    expect(dates).toEqual(expectedDates);
  });

  it('should return all dates in April 2024', () => {
    const dates = getAllDatesInMonth(3, 2024);
    const expectedDates = Array.from({ length: 30 }, (_, i) => new Date(2024, 3, i + 1));
    expect(dates).toEqual(expectedDates);
  });

  it('should return all dates in July 2024', () => {
    const dates = getAllDatesInMonth(6, 2024);
    const expectedDates = Array.from({ length: 31 }, (_, i) => new Date(2024, 6, i + 1));
    expect(dates).toEqual(expectedDates);
  });
});

describe('isSameDay', () => {
  it('should return false if either date is null', () => {
    const date = new Date(2024, 1, 1);
    expect(isSameDay(date, null)).toBe(false);
    expect(isSameDay(null, date)).toBe(false);
    expect(isSameDay(null, null)).toBe(false);
  });

  it('should return true if the dates are the same', () => {
    const date1 = new Date(2024, 1, 1);
    const date2 = new Date(2024, 1, 1);
    expect(isSameDay(date1, date2)).toBe(true);
  });

  it('should return false if the dates are different', () => {
    const date1 = new Date(2024, 1, 1);
    const date2 = new Date(2024, 1, 2);
    expect(isSameDay(date1, date2)).toBe(false);
  });
});

describe('isWithinInterval', () => {
  it('should return true if slot is undefined', () => {
    const date = new Date(2024, 1, 1);
    expect(isWithinInterval(date)).toBe(true);
  });

  it('should return false if date is before slot start', () => {
    const date = new Date(2024, 1, 1);
    const slot = { start: new Date(2024, 1, 2), end: new Date(2024, 1, 3) };
    expect(isWithinInterval(date, slot)).toBe(false);
  });

  it('should return false if date is after slot end', () => {
    const date = new Date(2024, 1, 4);
    const slot = { start: new Date(2024, 1, 2), end: new Date(2024, 1, 3) };
    expect(isWithinInterval(date, slot)).toBe(false);
  });

  it('should return true if date is within slot', () => {
    const date = new Date(2024, 1, 2, 12);
    const slot = { start: new Date(2024, 1, 2, 13), end: new Date(2024, 1, 3) };
    expect(isWithinInterval(date, slot)).toBe(true);
  });

  it('should return true if start is null', () => {
    const date = new Date(2024, 1, 2);
    const slot = { start: null, end: new Date(2024, 1, 3) };
    expect(isWithinInterval(date, slot)).toBe(true);
  });

  it('should return true if end is null', () => {
    const date = new Date(2024, 1, 2);
    const slot = { start: new Date(2024, 1, 1), end: null };
    expect(isWithinInterval(date, slot)).toBe(true);
  });

  it('should return true if start and end are null', () => {
    const date = new Date(2024, 1, 2);
    const slot = { start: null, end: null };
    expect(isWithinInterval(date, slot)).toBe(true);
  });
});

describe('normalizeDate', () => {
  it('should normalize a date to midnight', () => {
    const inputDate = new Date(2023, 3, 10, 15, 30, 45); // 10 Avril 2023, 15:30:45
    const expectedDate = new Date(2023, 3, 10); // 10 Avril 2023, 00:00:00
    expect(normalizeDate(inputDate)).toEqual(expectedDate);
  });

  it('should keep the year, month, and day of the input date', () => {
    const inputDate = new Date(2023, 3, 10);
    const normalizedDate = normalizeDate(inputDate);
    expect(normalizedDate.getFullYear()).toBe(2023);
    expect(normalizedDate.getMonth()).toBe(3);
    expect(normalizedDate.getDate()).toBe(10);
  });

  it('should reset hours, minutes, and seconds to zero', () => {
    const inputDate = new Date(2023, 3, 10, 23, 59, 59);
    const normalizedDate = normalizeDate(inputDate);
    expect(normalizedDate.getHours()).toBe(0);
    expect(normalizedDate.getMinutes()).toBe(0);
    expect(normalizedDate.getSeconds()).toBe(0);
  });
});

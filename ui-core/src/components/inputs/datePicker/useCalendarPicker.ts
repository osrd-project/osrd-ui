import { useState } from 'react';
import { CalendarPickerProps } from './CalendarPicker';
import {
  getAllDatesInMonth,
  isValidSlot,
  isSameDay,
  generateSequentialDates,
  normalizeDate,
} from './utils';

export const INVALID_SELECTED_SLOT_ERROR =
  'Invalid selectedSlot: If start and end are defined, the start date must be before the end date.';
export const INVALID_SELECTABLE_SLOT_ERROR =
  'Invalid selectableSlot: If start and end are defined, the start date must be before the end date.';
export const INVALID_SELECTED_SLOT_BASED_ON_SELECTABLE_SLOT_ERROR =
  'selectedSlot must be within selectableSlot';
export const INVALID_INITIAL_DATE_ERROR = 'initialDate must be within selectableSlot';

export default function useCalendarPicker({
  initialDate,
  selectedSlot,
  selectableSlot,
  numberOfMonths = 1,
  isRangeMode = false,
  onDateChange,
}: Omit<CalendarPickerProps, 'modalPosition' | 'calendarPickerRef'>) {
  if (selectedSlot && !isValidSlot(selectedSlot)) {
    throw new Error(INVALID_SELECTED_SLOT_ERROR);
  }

  if (selectableSlot && !isValidSlot(selectableSlot)) {
    throw new Error(INVALID_SELECTABLE_SLOT_ERROR);
  }

  if (
    selectedSlot?.start &&
    selectedSlot?.end &&
    selectableSlot?.start &&
    selectableSlot?.end &&
    (normalizeDate(selectedSlot.start) < normalizeDate(selectableSlot.start) ||
      normalizeDate(selectedSlot.end) > normalizeDate(selectableSlot.end))
  ) {
    throw new Error(INVALID_SELECTED_SLOT_BASED_ON_SELECTABLE_SLOT_ERROR);
  }

  if (
    initialDate &&
    selectableSlot?.start &&
    selectableSlot?.end &&
    (normalizeDate(initialDate) < normalizeDate(selectableSlot.start) ||
      normalizeDate(initialDate) > normalizeDate(selectableSlot.end))
  ) {
    throw new Error(INVALID_INITIAL_DATE_ERROR);
  }

  const initialActiveDate =
    initialDate ?? selectedSlot?.start ?? selectableSlot?.start ?? new Date();
  const [activeDate, setActiveDate] = useState<Date>(initialActiveDate);
  const displayedMonthsStartDates = generateSequentialDates(activeDate, numberOfMonths);

  const activeYear = activeDate.getFullYear();
  const activeMonth = activeDate.getMonth();
  const daysInMonth = displayedMonthsStartDates
    .map((date) => getAllDatesInMonth(date.getMonth(), date.getFullYear()))
    .flat();
  const canGoToPreviousMonth =
    selectableSlot === undefined || selectableSlot.start === null
      ? true
      : !daysInMonth.some((d) => isSameDay(d, selectableSlot.start));

  const canGoToNextMonth =
    selectableSlot === undefined || selectableSlot.end === null
      ? true
      : !daysInMonth.some((d) => isSameDay(d, selectableSlot.end));

  const showNavigationBtn = canGoToPreviousMonth || canGoToNextMonth;

  const handleGoToPreviousMonth = () => {
    if (canGoToPreviousMonth) {
      const previousActiveMonth = activeMonth === 0 ? 11 : activeMonth - 1;
      const previousActiveYear = activeMonth === 0 ? activeYear - 1 : activeYear;
      setActiveDate(new Date(previousActiveYear, previousActiveMonth, 1));
    }
  };

  const handleGoToNextMonth = () => {
    if (canGoToNextMonth) {
      const nextActiveMonth = activeMonth === 11 ? 0 : activeMonth + 1;
      const nextActiveYear = activeMonth === 11 ? activeYear + 1 : activeYear;
      setActiveDate(new Date(nextActiveYear, nextActiveMonth, 1));
    }
  };

  const handleDayClick = (clickedDate: Date) => {
    const newSelectedSlot = computeNewSelectedSlot(clickedDate);
    onDateChange?.(newSelectedSlot);
  };

  /**
   * Handles the logic for when a day is clicked on the calendar.
   *
   * @param clickedDate - The date that was clicked.
   * Spec 0: If the mode is not range (single), set the selected slot to the clicked date.
   * Spec 1: If the user clicks on a single date, that date is set as the start date of the slot.
   * Spec 2: If the user selects the same end date as the start date, clear the slot
   * Spec 3: If the user clicks on a date that is before the currently selected start date, the new date becomes the start date and the previous start date becomes the end date.
   * Spec 4: If the user clicks on a date that is after the currently selected start date, that date becomes the end date of the slot.
   * Spec 5: If a slot is already defined (i.e., both start and end dates are defined) and the user clicks on a new date, the existing slot is cleared and the new date becomes the start date of the new slot.
   */
  const computeNewSelectedSlot = (clickedDate: Date) => {
    if (!isRangeMode) {
      // Spec 0
      return { start: clickedDate, end: clickedDate };
    }

    if (!selectedSlot || selectedSlot?.start === null) {
      // Spec 1

      return { start: clickedDate, end: null };
    } else if (!selectedSlot.end) {
      if (normalizeDate(clickedDate).getTime() === normalizeDate(selectedSlot.start).getTime()) {
        // Spec 2
        return undefined;
      } else if (normalizeDate(clickedDate) < normalizeDate(selectedSlot.start)) {
        // Spec 3
        return { start: clickedDate, end: selectedSlot.start };
      } else {
        // Spec 4
        return { start: selectedSlot.start, end: clickedDate };
      }
    } else {
      // Spec 5
      return { start: clickedDate, end: null };
    }
  };

  return {
    displayedMonthsStartDates,
    showNavigationBtn,
    canGoToPreviousMonth,
    canGoToNextMonth,
    handleGoToPreviousMonth,
    handleGoToNextMonth,
    handleDayClick,
    selectedSlot,
  };
}

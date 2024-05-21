import { useState } from 'react';
import { CalendarPickerProps } from './CalendarPicker';
import { CalendarSlot } from './type';
import { getAllDatesInMonth, isValidSlot } from './utils';

export default function useCalendarPicker({
  initialDate,
  selectedSlot: initialSelectedSlot,
  selectableSlot,
  numberOfMonths = 1,
  mode = 'single',
  onDateChange,
}: Omit<CalendarPickerProps, 'modalPosition' | 'calendarPickerRef'>) {
  if (initialSelectedSlot && !isValidSlot(initialSelectedSlot)) {
    throw new Error(
      'Invalid selectedSlot: If start and end are defined, the start date must be before the end date.'
    );
  }

  if (selectableSlot && !isValidSlot(selectableSlot)) {
    throw new Error(
      'Invalid selectableSlot: If start and end are defined, the start date must be before the end date.'
    );
  }

  if (
    initialSelectedSlot?.start &&
    initialSelectedSlot?.end &&
    selectableSlot?.start &&
    selectableSlot?.end &&
    (initialSelectedSlot.start < selectableSlot.start ||
      initialSelectedSlot.end > selectableSlot.end)
  ) {
    throw new Error('selectedSlot must be within selectableSlot');
  }

  if (
    initialDate &&
    selectableSlot?.start &&
    selectableSlot?.end &&
    (initialDate < selectableSlot.start || initialDate > selectableSlot.end)
  ) {
    throw new Error('initialDate must be within selectableSlot');
  }

  const initialActiveDate = initialDate ?? selectableSlot?.start ?? new Date();
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | undefined>(initialSelectedSlot);
  const [activeDate, setActiveDate] = useState<Date>(initialActiveDate);
  const displayedMonthsStartDates = Array.from({ length: numberOfMonths }).map((_, index) => {
    const month = activeDate.getMonth() + index;
    const year = activeDate.getFullYear() + Math.floor(month / 12);
    return new Date(year, month % 12, 1);
  });

  const activeYear = activeDate.getFullYear();
  const activeMonth = activeDate.getMonth();
  const daysInMonth = displayedMonthsStartDates
    .map((date) => getAllDatesInMonth(date.getMonth(), date.getFullYear()))
    .flat();
  const canGoToPreviousMonth =
    selectableSlot?.start === null
      ? true
      : !daysInMonth.some((d) => d.getTime() === selectableSlot?.start?.getTime());

  const canGoToNextMonth =
    selectableSlot?.end === null
      ? true
      : !daysInMonth.some((d) => d.getTime() === selectableSlot?.end?.getTime());

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

  /**
   * Handles the logic for when a day is clicked on the calendar.
   *
   * @param clickedDate - The date that was clicked.
   * Spec 0: If the mode is single, set the selected slot to the clicked date.
   * Spec 1: If the user clicks on a single date, that date is set as the start date of the slot.
   * Spec 2: If the user selects the same end date as the start date, clear the slot
   * Spec 3: If the user clicks on a date that is before the currently selected start date, the new date becomes the start date and the previous start date becomes the end date.
   * Spec 4: If the user clicks on a date that is after the currently selected start date, that date becomes the end date of the slot.
   * Spec 5: If a slot is already defined (i.e., both start and end dates are defined) and the user clicks on a new date, the existing slot is cleared and the new date becomes the start date of the new slot.
   */
  const handleDayClick = (clickedDate: Date) => {
    if (mode === 'single') {
      // Spec 0
      setSelectedSlot({ start: clickedDate, end: clickedDate });
      onDateChange?.(clickedDate);
      return;
    }

    if (!selectedSlot || selectedSlot?.start === null) {
      // Spec 1
      setSelectedSlot({ start: clickedDate, end: null });
      onDateChange?.(clickedDate);
    } else if (!selectedSlot.end) {
      if (clickedDate.getTime() === selectedSlot.start.getTime()) {
        // Spec 2
        setSelectedSlot(undefined);
        onDateChange?.('');
      } else if (clickedDate.getTime() < selectedSlot.start.getTime()) {
        // Spec 3
        setSelectedSlot({ start: clickedDate, end: selectedSlot.start });
        onDateChange?.(clickedDate);
      } else {
        // Spec 4
        setSelectedSlot({ start: selectedSlot.start, end: clickedDate });
        onDateChange?.(clickedDate);
      }
    } else {
      // Spec 5
      setSelectedSlot({ start: clickedDate, end: null });
      onDateChange?.(clickedDate);
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

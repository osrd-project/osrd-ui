import React, { useState } from 'react';
import cx from 'classnames';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from '@osrd-project/ui-icons';
import Input, { InputProps } from '../Input';
import Calendar from './Calendar';
import { getAllDatesInMonth, isValidSlot } from './utils';
import { CalendarSlot } from './type';

export type CalendarPickerProps = {
  selectedSlot?: CalendarSlot;
  selectableSlot?: CalendarSlot;
  calendarCount?: 1 | 2 | 3;
};

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  selectedSlot: initialSelectedSlot,
  selectableSlot,
  calendarCount = 1,
}) => {
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

  const initialActiveDate = selectableSlot?.start ? selectableSlot.start : new Date();
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | undefined>(initialSelectedSlot);
  const [activeDate, setActiveDate] = useState<Date>(initialActiveDate);
  const displayedMonthsStartDates = Array.from({ length: calendarCount }).map((_, index) => {
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
   *
   * Spec 1: A user can select a start date and an end date to create a slot.
   * Spec 2: If the user clicks on a single date, that date is set as the start date of the slot.
   * Spec 3: If the user clicks on a date that is before the currently selected start date, the new date becomes the start date and the previous start date becomes the end date.
   * Spec 4: If the user clicks on a date that is after the currently selected start date, that date becomes the end date of the slot.
   * Spec 5: If the user selects the same end date as the start date, clear the slot
   * Spec 6: If a slot is already defined (i.e., both start and end dates are defined) and the user clicks on a new date, the existing slot is cleared and the new date becomes the start date of the new slot.
   */
  const handleDayClick = (clickedDate: Date) => {
    if (!selectedSlot || selectedSlot?.start === null) {
      // Spec 2
      setSelectedSlot({ start: clickedDate, end: null });
    } else if (!selectedSlot.end) {
      if (clickedDate.getTime() === selectedSlot.start.getTime()) {
        // Spec 5
        setSelectedSlot(undefined);
      } else if (clickedDate.getTime() < selectedSlot.start.getTime()) {
        // Spec 3
        setSelectedSlot({ start: clickedDate, end: selectedSlot.start });
      } else {
        // Spec 4
        setSelectedSlot({ start: selectedSlot.start, end: clickedDate });
      }
    } else {
      // Spec 6
      setSelectedSlot({ start: clickedDate, end: null });
    }
  };

  return (
    <div className="calendar-picker">
      {showNavigationBtn && (
        <span
          className={cx('calendar-navigation-btn', 'previous', {
            disabled: !canGoToPreviousMonth,
          })}
          onClick={handleGoToPreviousMonth}
        >
          <ChevronLeft size="lg" />
        </span>
      )}
      <div className={cx('calendar-list', { 'navigation-btn-hidden': !showNavigationBtn })}>
        {displayedMonthsStartDates.map((date, index) => {
          return (
            <Calendar
              key={index}
              displayedMonthStartDate={date}
              selectableSlot={selectableSlot}
              selectedSlot={selectedSlot}
              onClickDay={handleDayClick}
            />
          );
        })}
      </div>
      {showNavigationBtn && (
        <span
          className={cx('calendar-navigation-btn', 'next', {
            disabled: !canGoToNextMonth,
          })}
          onClick={handleGoToNextMonth}
        >
          <ChevronRight size="lg" />
        </span>
      )}
    </div>
  );
};

export type DatePickerProps = {
  inputProps: InputProps;
  calendarPickerProps: CalendarPickerProps;
};
export const DatePicker: React.FC<DatePickerProps> = ({ inputProps, calendarPickerProps }) => {
  const [showPicker, toggleShowPicker] = useState(true);
  const { overrideClassname, ...restInputProps } = inputProps;

  return (
    <div className="date-picker">
      <Input
        {...restInputProps}
        type="text"
        trailingContent={{
          content: <CalendarIcon />,
          onClickCallback: () => toggleShowPicker(!showPicker),
        }}
        overrideClassname={cx('date-picker-input', overrideClassname)}
      />
      {showPicker && <CalendarPicker {...calendarPickerProps} />}
    </div>
  );
};

export default DatePicker;

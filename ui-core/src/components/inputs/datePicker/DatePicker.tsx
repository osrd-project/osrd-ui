import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from '@osrd-project/ui-icons';
import Input, { InputProps } from '../Input';
import Calendar from './Calendar';
import { getAllDatesInMonth, isValidSlot } from './utils';
import cx from 'classnames';
import { CalendarSlot } from './type';

export type CalendarPickerProps = {
  selectedSlot?: CalendarSlot;
  selectableSlot?: CalendarSlot;
};

const CalendarPicker: React.FC<CalendarPickerProps> = (props) => {
  if (props.selectedSlot && !isValidSlot(props.selectedSlot)) {
    throw new Error('props.selectedSlot is invalid');
  }

  if (props.selectableSlot && !isValidSlot(props.selectableSlot)) {
    throw new Error('props.selectableSlot is invalid');
  }

  if (
    props.selectedSlot?.start &&
    props.selectedSlot?.end &&
    props.selectableSlot?.start &&
    props.selectableSlot?.end &&
    (props.selectedSlot.start < props.selectableSlot.start ||
      props.selectedSlot.end > props.selectableSlot.end)
  ) {
    throw new Error('props.selectedSlot must be within props.selectableSlot');
  }

  const initialCurrentDate = props.selectableSlot?.start ? props.selectableSlot.start : new Date();

  const [currentDate, setCurrentDate] = useState<Date>(initialCurrentDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getAllDatesInMonth(currentMonth, currentYear);
  const canGoToPreviousMonth =
    props.selectableSlot?.start === null
      ? true
      : !daysInMonth.some((d) => d.getTime() === props.selectableSlot?.start?.getTime());

  const canGoToNextMonth =
    props.selectableSlot?.end === null
      ? true
      : !daysInMonth.some((d) => d.getTime() === props.selectableSlot?.end?.getTime());

  const showNavigationBtn = canGoToPreviousMonth || canGoToNextMonth;

  const handleGoToPreviousMonth = () => {
    if (canGoToPreviousMonth) {
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      setCurrentDate(new Date(previousYear, previousMonth, 1));
    }
  };

  const handleGoToNextMonth = () => {
    if (canGoToNextMonth) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      setCurrentDate(new Date(nextYear, nextMonth, 1));
    }
  };

  return (
    <div className="date-picker-calendar">
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
      <Calendar
        currentDate={currentDate}
        selectableSlot={props.selectableSlot}
        selectedSlot={props.selectedSlot}
      />
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

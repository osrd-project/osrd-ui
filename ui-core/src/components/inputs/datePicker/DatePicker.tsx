import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from '@osrd-project/ui-icons';
import Input, { InputProps } from '../Input';
import {
  getAllDatesInMonth,
  getDatesFromPreviousMonthInFirstWeek,
  getDatesFromNextMonthInLastWeek,
  isValidSlot,
  isSameDay,
  isWithinInterval,
} from './utils';
import cx from 'classnames';
import { CalendarSlot } from './type';

export type CalendarProps = {
  selectedSlot?: CalendarSlot;
  selectableSlot?: CalendarSlot;
};

const Calendar: React.FC<CalendarProps> = (props) => {
  if (props.selectedSlot && !isValidSlot(props.selectedSlot)) {
    throw new Error('props.selectedSlot is invalid');
  }

  if (props.selectableSlot && !isValidSlot(props.selectableSlot)) {
    throw new Error('props.selectableSlot is invalid');
  }
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | undefined>(props.selectedSlot);

  const initialCurrentDate = props.selectableSlot?.start ? props.selectableSlot.start : new Date();

  const [currentDate, setCurrentDate] = useState<Date>(initialCurrentDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getAllDatesInMonth(currentMonth, currentYear);
  const daysInLastMonth = getDatesFromPreviousMonthInFirstWeek(currentMonth, currentYear);
  const daysInNextMonth = getDatesFromNextMonthInLastWeek(currentMonth, currentYear);
  const allDays = [...daysInLastMonth, ...daysInMonth, ...daysInNextMonth];

  const handleDayClick = (clickedDate: Date) => {
    if (
      !isWithinInterval(clickedDate, props.selectableSlot) ||
      clickedDate.getMonth() !== currentMonth ||
      clickedDate.getTime() < today.getTime()
    ) {
      return;
    }

    if (!selectedSlot || (selectedSlot && selectedSlot.end)) {
      setSelectedSlot({ start: clickedDate, end: null });
    } else if (selectedSlot?.start && clickedDate.getTime() < selectedSlot.start.getTime()) {
      setSelectedSlot({ start: clickedDate, end: selectedSlot.start });
    } else {
      setSelectedSlot({ ...selectedSlot, end: clickedDate });
    }
  };

  const handleGoToPreviousMonth = () => {
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    setCurrentDate(new Date(previousYear, previousMonth, 1));
  };

  const handleGoToNextMonth = () => {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    setCurrentDate(new Date(nextYear, nextMonth, 1));
  };

  const buildDayWrapperClassName = (date: Date) => {
    let classNames = {
      'inside-selectable-slot': isWithinInterval(date, props.selectableSlot),
      'current-month': date.getMonth() === currentMonth,
      past: date.getTime() < today.getTime(),
    } as Record<string, boolean | null>;

    const isStart = (selectedSlot && isSameDay(date, selectedSlot.start)) || false;
    const isEnd = (selectedSlot && isSameDay(date, selectedSlot.end)) || false;
    const withinSelectedSlot =
      (selectedSlot &&
        selectedSlot.start &&
        selectedSlot.end &&
        isWithinInterval(date, selectedSlot)) ||
      isStart ||
      isEnd;

    if (selectedSlot) {
      classNames = {
        ...classNames,
        start: isStart,
        'start-only': isStart && !selectedSlot.end,
        end: isEnd,
        'within-selected-slot': withinSelectedSlot,
      };
    }

    return cx('day-wrapper', classNames);
  };

  return (
    <div className="date-picker-calendar">
      <span className="calendar-navigation-btn previous" onClick={handleGoToPreviousMonth}>
        <ChevronLeft size="lg" />
      </span>
      <div className="date-picker-calendar-wrapper">
        <div className="calendar-body">
          <p className="calendar-month-label">
            {currentDate.toLocaleString('en-GB', { month: 'short' })}
          </p>
          <div className="calendar-grid-wrapper">
            <div className="calendar-weekday-labels">
              <p>M</p>
              <p>T</p>
              <p>W</p>
              <p>T</p>
              <p>F</p>
              <p>S</p>
              <p>S</p>
            </div>
            <div className="calendar-days-grid">
              {allDays.map((date, index) => {
                return (
                  <div key={index} onClick={() => handleDayClick(date)} className="day-background">
                    <div className={buildDayWrapperClassName(date)}>
                      <span className="day">{date.getDate()}</span>
                      {date.getTime() === today.getTime() && (
                        <span className="current-date-highlight" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <span className="calendar-navigation-btn next" onClick={handleGoToNextMonth}>
        <ChevronRight size="lg" />
      </span>
    </div>
  );
};

export type DatePickerProps = {
  inputProps: InputProps;
  calendarProps: CalendarProps;
};
export const DatePicker: React.FC<DatePickerProps> = ({ inputProps, calendarProps }) => {
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
      {showPicker && <Calendar {...calendarProps} />}
    </div>
  );
};

export default DatePicker;

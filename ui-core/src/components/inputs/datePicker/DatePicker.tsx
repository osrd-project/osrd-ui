import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from '@osrd-project/ui-icons';
import Input, { InputProps } from '../Input';
import {
  getAllDatesInMonth,
  getPrevMonthDatesInFirstWeek,
  getNextMonthDatesInLastWeek,
  isValidSlot,
  isSameDay,
  isWithinInterval,
} from './utils';
import cx from 'classnames';
import { CalendarSlot } from './type';

export type CalendarProps = {
  selectedSlot?: CalendarSlot;
  selectableSlot?: CalendarSlot;
  currentDate?: Date;
};

const Calendar: React.FC<CalendarProps> = (props) => {
  if (props.selectedSlot && !isValidSlot(props.selectedSlot)) {
    throw new Error('props.selectedSlot is invalid');
  }

  if (props.selectableSlot && !isValidSlot(props.selectableSlot)) {
    throw new Error('props.selectableSlot is invalid');
  }
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | undefined>(props.selectedSlot);
  const [selectableSlot, setSelectableSlot] = useState<CalendarSlot | undefined>(
    props.selectableSlot
  );

  const currentDate = selectableSlot?.start ? selectableSlot.start : new Date();

  const [currentMonth, setCurrentMonth] = useState<number>(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysInMonth = getAllDatesInMonth(currentMonth, currentYear);
  const daysInLastMonth = getPrevMonthDatesInFirstWeek(currentMonth, currentYear);
  const daysInNextMonth = getNextMonthDatesInLastWeek(currentMonth, currentYear);
  const allDays = [...daysInLastMonth, ...daysInMonth, ...daysInNextMonth];

  const handleDayClick = (clickedDate: Date) => {
    if (!selectedSlot || (selectedSlot && selectedSlot.end)) {
      setSelectedSlot({ start: clickedDate, end: null });
    } else if (selectedSlot?.start && clickedDate.getTime() < selectedSlot.start.getTime()) {
      setSelectedSlot({ start: clickedDate, end: selectedSlot.start });
    } else {
      setSelectedSlot({ ...selectedSlot, end: clickedDate });
    }
  };

  const buildDayWrapperClassName = (date: Date) => {
    const insideSelectableSlot = () => {
      if (
        selectableSlot &&
        ((selectableSlot.start && selectableSlot.start.getTime() > date.getTime()) ||
          (selectableSlot.end && selectableSlot.end.getTime() < date.getTime()))
      ) {
        return false;
      }
      return true;
    };

    let classNames = {
      'inside-selectable-slot': insideSelectableSlot(),
      'current-month': date.getMonth() === currentMonth,
      past: date.getTime() < today.getTime(),
    } as Record<string, boolean | null>;

    if (selectedSlot) {
      classNames = {
        ...classNames,
        start: isSameDay(date, selectedSlot.start),
        end: isSameDay(date, selectedSlot.end),
        within:
          selectedSlot.start &&
          selectedSlot.end &&
          isWithinInterval(date, { start: selectedSlot.start, end: selectedSlot.end }),
      };
    }

    return cx('day-wrapper', classNames);
  };

  return (
    <div className="date-picker-calendar">
      <span className="calendar-navigation-btn previous">
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
      <span className="calendar-navigation-btn next">
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

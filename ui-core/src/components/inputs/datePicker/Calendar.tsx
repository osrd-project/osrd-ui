import React, { useState } from 'react';
import {
  getAllDatesInMonth,
  getDatesFromPreviousMonthInFirstWeek,
  getDatesFromNextMonthInLastWeek,
  isSameDay,
  isWithinInterval,
} from './utils';
import cx from 'classnames';
import { CalendarSlot } from './type';

export type CalendarProps = {
  selectedSlot?: CalendarSlot;
  selectableSlot?: CalendarSlot;
  currentDate: Date;
};

const Calendar: React.FC<CalendarProps> = (props) => {
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | undefined>(props.selectedSlot);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentYear = props.currentDate.getFullYear();
  const currentMonth = props.currentDate.getMonth();
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

  const buildDayWrapperClassName = (date: Date) => {
    const isStart = (selectedSlot && isSameDay(date, selectedSlot.start)) || false;
    const isEnd = (selectedSlot && isSameDay(date, selectedSlot.end)) || false;
    const withinSelectedSlot =
      (selectedSlot &&
        selectedSlot.start &&
        selectedSlot.end &&
        isWithinInterval(date, selectedSlot)) ||
      isStart ||
      isEnd;
    const insideSelectableSlot = isWithinInterval(date, props.selectableSlot);

    let classNames = {
      'inside-selectable-slot': insideSelectableSlot,
      'outside-selectable-slot': !insideSelectableSlot,
      'current-month': date.getMonth() === currentMonth,
      past: date.getTime() < today.getTime(),
    } as Record<string, boolean | null>;

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
    <div className="date-picker-calendar-wrapper">
      <div className="calendar-body">
        <p className="calendar-month-label">
          {props.currentDate.toLocaleString('en-GB', { month: 'short' })}
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
  );
};

export default Calendar;

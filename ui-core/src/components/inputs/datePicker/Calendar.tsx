import React from 'react';
import cx from 'classnames';
import {
  getAllDatesInMonth,
  getDatesFromPreviousMonthInFirstWeek,
  getDatesFromNextMonthInLastWeek,
  isSameDay,
  isWithinInterval,
} from './utils';
import { CalendarSlot } from './type';

export type CalendarProps = {
  selectedSlot?: CalendarSlot;
  selectableSlot?: CalendarSlot;
  displayedMonthStartDate: Date;
  onClickDay: (date: Date) => void;
};

const Calendar: React.FC<CalendarProps> = (props) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const displayedYear = props.displayedMonthStartDate.getFullYear();
  const displayedMonth = props.displayedMonthStartDate.getMonth();
  const daysInMonth = getAllDatesInMonth(displayedMonth, displayedYear);
  const daysInLastMonth = getDatesFromPreviousMonthInFirstWeek(displayedMonth, displayedYear);
  const daysInNextMonth = getDatesFromNextMonthInLastWeek(displayedMonth, displayedYear);
  const allDays = [...daysInLastMonth, ...daysInMonth, ...daysInNextMonth];

  const buildDayWrapperClassName = (date: Date) => {
    const isStart = (props.selectedSlot && isSameDay(date, props.selectedSlot.start)) || false;
    const isEnd = (props.selectedSlot && isSameDay(date, props.selectedSlot.end)) || false;
    const withinSelectedSlot =
      (props.selectedSlot &&
        props.selectedSlot.start &&
        props.selectedSlot.end &&
        isWithinInterval(date, props.selectedSlot)) ||
      isStart ||
      isEnd;
    const insideSelectableSlot = isWithinInterval(date, props.selectableSlot);

    let classNames = {
      'inside-selectable-slot': insideSelectableSlot,
      'outside-selectable-slot': !insideSelectableSlot,
      'current-month': date.getMonth() === displayedMonth,
      past: date.getTime() < today.getTime(),
    } as Record<string, boolean | null>;

    if (props.selectedSlot) {
      classNames = {
        ...classNames,
        start: isStart,
        'start-only': isStart && !props.selectedSlot.end,
        end: isEnd,
        'within-selected-slot': withinSelectedSlot,
      };
    }

    return cx('day-wrapper', classNames);
  };

  const isDateSelectable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the date is within the selectable interval
    if (!isWithinInterval(date, props.selectableSlot)) return false;

    // Check if the date is in the currently displayed month
    if (date.getMonth() !== displayedMonth) return false;

    // Check if the date is not in the past
    if (date.getTime() < today.getTime()) return false;

    return true;
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-body">
        <p className="calendar-month-label">
          {props.displayedMonthStartDate.toLocaleString('en-GB', { month: 'short' })}
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
                <div
                  key={index}
                  onClick={() => {
                    if (isDateSelectable(date)) props.onClickDay(date);
                  }}
                  className="day-background"
                >
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

import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from '@osrd-project/ui-icons';

import Input, { InputProps } from './Input';
import cx from 'classnames';

const Calendar: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const currentMonth = date.toLocaleString('default', { month: 'long' }).slice(0, 3);

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const startDay = startDate.getDay();
  const currentDay = date.getDate();

  const daysInMonth = [];
  for (let i = 1; i <= endDate.getDate(); i++) {
    daysInMonth.push({ day: i, currentMonth: true });
  }

  const daysInLastMonth = [];
  if (startDay !== 1) {
    const lastMonthEndDate = new Date(year, month, 0);
    for (let i = lastMonthEndDate.getDate() - startDay + 2; i <= lastMonthEndDate.getDate(); i++) {
      daysInLastMonth.push({ day: i, currentMonth: false });
    }
  }

  const daysInNextMonth = [];
  const totalDays = daysInLastMonth.length + daysInMonth.length;
  const remainingDays = 7 - (totalDays % 7);
  for (let i = 1; i <= remainingDays; i++) {
    daysInNextMonth.push({ day: i, currentMonth: false });
  }

  const allDays = [...daysInLastMonth, ...daysInMonth, ...daysInNextMonth];

  return (
    <div className="date-picker-calendar">
      <span className="calendar-navigation-btn previous">
        <ChevronLeft size="lg" />
      </span>
      <div className="date-picker-calendar-wrapper">
        <div className="calendar-body">
          <p className="calendar-month-label">{currentMonth}</p>
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
              {allDays.map((day, index) => (
                <div
                  key={index}
                  className={cx('month-day-background', {
                    'current-month-day': day.currentMonth && day.day >= currentDay,
                    'other-month-day': !day.currentMonth || day.day < currentDay,
                  })}
                >
                  <div className="month-day-wrapper">
                    <span className="month-day">{day.day}</span>
                    {day.day === currentDay && <span className="current-date-highlight" />}
                  </div>
                </div>
              ))}
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

export const DatePicker: React.FC<InputProps> = ({ overrideClassname, ...restProps }) => {
  const [showPicker, toggleShowPicker] = useState(true);

  return (
    <div className="date-picker">
      <Input
        {...restProps}
        type="text"
        trailingContent={{
          content: <CalendarIcon />,
          onClickCallback: () => toggleShowPicker(!showPicker),
        }}
        overrideClassname={cx('date-picker-input', overrideClassname)}
      />
      {showPicker && <Calendar />}
    </div>
  );
};

export default DatePicker;

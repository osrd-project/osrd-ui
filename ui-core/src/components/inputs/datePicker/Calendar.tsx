import React from 'react';
import { CalendarSlot } from './type';
import useCalendar from './useCalendar';

const WEEKDAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export type CalendarProps = {
  selectedSlot?: CalendarSlot;
  selectableSlot?: CalendarSlot;
  displayedMonthStartDate: Date;
  onClickDay: (date: Date) => void;
};

type DayProps = {
  date: Date;
  isSelectable: boolean;
  isToDay: boolean;
  dayWrapperClassName: string;
  onClick: (date: Date) => void;
};

const Day: React.FC<DayProps> = ({ date, isToDay, isSelectable, dayWrapperClassName, onClick }) => (
  <div
    onClick={() => {
      if (isSelectable) onClick(date);
    }}
    className="day-background"
  >
    <div className={dayWrapperClassName}>
      <span className="day">{date.getDate()}</span>
      {isToDay && <span className="current-date-highlight" />}
    </div>
  </div>
);

const Calendar: React.FC<CalendarProps> = (props) => {
  const { displayedMonthStartDate, onClickDay } = props;
  const { days, isToday, isDateSelectable, buildDayWrapperClassName } = useCalendar(props);
  return (
    <div className="calendar-wrapper">
      <div className="calendar-anatomy">
        <p className="calendar-month-label">
          {displayedMonthStartDate.toLocaleString('en-GB', { month: 'short' })}
        </p>
        <div className="calendar-grid-wrapper">
          <div className="calendar-weekday-labels">
            {WEEKDAY_LABELS.map((label, index) => (
              <p key={index}>{label}</p>
            ))}
          </div>
          <div className="calendar-days-grid">
            {days.map((date, index) => {
              return (
                <Day
                  key={index}
                  date={date}
                  isToDay={isToday(date)}
                  isSelectable={isDateSelectable(date)}
                  dayWrapperClassName={buildDayWrapperClassName(date)}
                  onClick={onClickDay}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

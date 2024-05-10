import React from 'react';
import cx from 'classnames';
import { ChevronLeft, ChevronRight } from '@osrd-project/ui-icons';
import Calendar from './Calendar';
import { CalendarSlot } from './type';
import useCalendarPicker from './useCalendarPicker';

export type CalendarPickerProps = {
  initialDate?: Date;
  selectedSlot?: CalendarSlot;
  selectableSlot?: CalendarSlot;
  numberOfMonths?: 1 | 2 | 3;
};

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  initialDate,
  selectedSlot: initialSelectedSlot,
  selectableSlot,
  numberOfMonths = 1,
}) => {
  const {
    selectedSlot,
    displayedMonthsStartDates,
    showNavigationBtn,
    canGoToNextMonth,
    canGoToPreviousMonth,
    handleDayClick,
    handleGoToNextMonth,
    handleGoToPreviousMonth,
  } = useCalendarPicker({
    initialDate,
    selectedSlot: initialSelectedSlot,
    selectableSlot,
    numberOfMonths,
  });

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

export default CalendarPicker;

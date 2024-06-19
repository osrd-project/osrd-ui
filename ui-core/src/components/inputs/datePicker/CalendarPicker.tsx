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
  mode?: 'single' | 'range';
  onDateChange?: (date: Date | string) => void;
  modalPosition: {
    top: number;
    left: number;
  };
  calendarPickerRef: React.RefObject<HTMLDivElement>;
};

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  initialDate,
  selectedSlot: initialSelectedSlot,
  selectableSlot,
  numberOfMonths = 1,
  mode = 'single',
  onDateChange = () => {},
  modalPosition,
  calendarPickerRef,
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
    mode,
    onDateChange,
  });

  return (
    <div
      ref={calendarPickerRef}
      className="calendar-picker"
      style={{ top: modalPosition?.top, left: modalPosition?.left }}
    >
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

import React from 'react';
import cx from 'classnames';
import { Calendar as CalendarIcon } from '@osrd-project/ui-icons';
import Input, { InputProps } from '../Input';
import CalendarPicker, { CalendarPickerProps } from './CalendarPicker';
import useDatePicker from './useDatePicker';

export type DatePickerProps = {
  inputProps: InputProps;
  calendarPickerProps: Omit<
    CalendarPickerProps,
    'modalPosition' | 'calendarPickerRef' | 'onDateChange'
  >;
};

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    inputValue,
    showPicker,
    modalPosition,
    calendarPickerRef,
    selectedSlot,
    toggleShowPicker,
    setRefs,
    handleInputValueChange,
    handleCalendarPickerChange,
  } = useDatePicker(props);
  const { overrideClassname, ...restInputProps } = props.inputProps;
  return (
    <div className="date-picker">
      <div>
        <Input
          ref={setRefs}
          value={inputValue}
          onChange={handleInputValueChange}
          {...restInputProps}
          type="text"
          trailingContent={{
            content: <CalendarIcon />,
            onClickCallback: () => toggleShowPicker(!showPicker),
          }}
          overrideClassname={cx('date-picker-input', overrideClassname)}
          readOnly //TODO wait spec. to allow user to type date manually
        />
      </div>
      {showPicker && (
        <div className="calendar-picker-wrapper">
          <CalendarPicker
            {...props.calendarPickerProps}
            selectedSlot={selectedSlot}
            onDateChange={handleCalendarPickerChange}
            modalPosition={modalPosition}
            calendarPickerRef={calendarPickerRef}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;

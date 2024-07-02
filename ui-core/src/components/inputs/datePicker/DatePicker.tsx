import React from 'react';
import cx from 'classnames';
import { Calendar as CalendarIcon } from '@osrd-project/ui-icons';
import Input, { InputProps } from '../Input';
import CalendarPicker, { CalendarPickerProps } from './CalendarPicker';
import useDatePicker from './useDatePicker';

export type DatePickerProps = {
  inputProps: InputProps;
  calendarPickerProps: Omit<CalendarPickerProps, 'modalPosition' | 'calendarPickerRef'>;
};

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    inputValue,
    showPicker,
    modalPosition,
    inputRef,
    calendarPickerRef,
    setShowPicker,
    handleCalendarPickerChange,
    handleInputClick,
  } = useDatePicker(props);
  const { inputFieldWrapperClassname, ...restInputProps } = props.inputProps;
  return (
    <div className="date-picker">
      <div>
        <Input
          ref={inputRef}
          value={inputValue}
          onClick={handleInputClick}
          {...restInputProps}
          type="text"
          trailingContent={{
            content: <CalendarIcon />,
            onClickCallback: () => setShowPicker(!showPicker),
          }}
          inputFieldWrapperClassname={cx('date-picker-input', inputFieldWrapperClassname)}
          autoComplete="off"
        />
      </div>
      {showPicker && (
        <div className="calendar-picker-wrapper">
          <CalendarPicker
            {...props.calendarPickerProps}
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

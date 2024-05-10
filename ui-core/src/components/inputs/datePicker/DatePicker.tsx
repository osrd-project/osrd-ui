import React, { useState } from 'react';
import cx from 'classnames';
import { Calendar as CalendarIcon } from '@osrd-project/ui-icons';
import Input, { InputProps } from '../Input';
import CalendarPicker, { CalendarPickerProps } from './CalendarPicker';

export type DatePickerProps = {
  inputProps: InputProps;
  calendarPickerProps: CalendarPickerProps;
};
export const DatePicker: React.FC<DatePickerProps> = ({ inputProps, calendarPickerProps }) => {
  const [showPicker, toggleShowPicker] = useState(false);
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
      {showPicker && <CalendarPicker {...calendarPickerProps} />}
    </div>
  );
};

export default DatePicker;

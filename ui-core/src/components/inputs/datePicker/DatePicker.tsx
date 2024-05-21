import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import { Calendar as CalendarIcon } from '@osrd-project/ui-icons';
import Input, { InputProps } from '../Input';
import CalendarPicker, { CalendarPickerProps } from './CalendarPicker';
import { withMask } from 'use-mask-input';
import useClickOutside from '../../hooks/useOutsideClick';
import { useModalPosition } from '../../hooks/useModalPosition';

export type DatePickerProps = {
  inputProps: InputProps;
  calendarPickerProps: Omit<CalendarPickerProps, 'modalPosition' | 'calendarPickerRef'>;
};

export const DatePicker: React.FC<DatePickerProps> = ({ inputProps, calendarPickerProps }) => {
  const [showPicker, toggleShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { overrideClassname, onChange, ...restInputProps } = inputProps;
  const calendarPickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useClickOutside(calendarPickerRef, () => toggleShowPicker(false));
  const { calculatePosition, modalPosition } = useModalPosition(
    inputRef,
    calendarPickerRef,
    3,
    -24
  );

  const handleDateChange = (date: Date | string) => {
    let formattedDate = '';
    if (date instanceof Date) {
      formattedDate = date.toLocaleDateString();
    } else {
      formattedDate = date;
    }
    setInputValue(formattedDate);
    onChange?.({ target: { value: formattedDate } } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    if (showPicker) {
      calculatePosition();
    }
  }, [showPicker, calculatePosition]);

  const setRefs = (el: HTMLInputElement | null) => {
    if (el) {
      inputRef.current = el;
      withMask('datetime', {
        inputFormat: 'dd/mm/yy',
      });
    }
  };

  return (
    <div className="date-picker">
      <div>
        <Input
          ref={setRefs}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange?.(e);
          }}
          {...restInputProps}
          type="text"
          trailingContent={{
            content: <CalendarIcon />,
            onClickCallback: () => toggleShowPicker(!showPicker),
          }}
          overrideClassname={cx('date-picker-input', overrideClassname)}
        />
      </div>
      {showPicker && (
        <div className="calendar-picker-wrapper">
          <CalendarPicker
            {...calendarPickerProps}
            onDateChange={handleDateChange}
            modalPosition={modalPosition}
            calendarPickerRef={calendarPickerRef}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;

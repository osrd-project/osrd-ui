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
  calendarPickerProps: Omit<
    CalendarPickerProps,
    'modalPosition' | 'calendarPickerRef' | 'onDateChange'
  >;
};

export const DatePicker: React.FC<DatePickerProps> = ({ inputProps, calendarPickerProps }) => {
  const [showPicker, toggleShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
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

  const formatDateString = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const updateInputValue = (start: Date, end: Date | null) => {
    if (start && end && calendarPickerProps.mode === 'range') {
      const startYear = start.getFullYear();
      const endYear = end.getFullYear();
      let formattedDate = '';

      if (startYear === endYear) {
        formattedDate = `${formatDateString(start).slice(0, 5)} - ${formatDateString(end)}`;
      } else {
        formattedDate = `${formatDateString(start)} - ${formatDateString(end)}`;
      }
      setInputValue(formattedDate);
      onChange?.({ target: { value: formattedDate } } as React.ChangeEvent<HTMLInputElement>);
    } else if (start && calendarPickerProps.mode === 'single') {
      const formattedDate = formatDateString(start);
      setInputValue(formattedDate);
      onChange?.({ target: { value: formattedDate } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDateChange = (date: Date | string) => {
    let newStartDate = startDate;
    let newEndDate = endDate;

    if (date instanceof Date) {
      if (calendarPickerProps.mode === 'single') {
        newStartDate = date;
        newEndDate = null;
      } else {
        if (!startDate) {
          newStartDate = date;
          newEndDate = null;
        } else if (!endDate) {
          newEndDate = date;
        } else {
          newStartDate = date;
          newEndDate = null;
        }
      }
    } else {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        if (calendarPickerProps.mode === 'single') {
          newStartDate = parsedDate;
          newEndDate = null;
        } else {
          if (!startDate) {
            newStartDate = parsedDate;
            newEndDate = null;
          } else if (!endDate) {
            newEndDate = parsedDate;
          } else {
            newStartDate = parsedDate;
            newEndDate = null;
          }
        }
      }
    }

    if (newStartDate && newEndDate && newStartDate > newEndDate) {
      // Swap the dates if startDate is after endDate
      const tempDate = newStartDate;
      newStartDate = newEndDate;
      newEndDate = tempDate;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    updateInputValue(newStartDate!, newEndDate);
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

import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import { Calendar as CalendarIcon } from '@osrd-project/ui-icons';
import Input, { InputProps } from '../Input';
import CalendarPicker, { CalendarPickerProps } from './CalendarPicker';
import { withMask } from 'use-mask-input';
import useClickOutside from '../../hooks/useOutsideClick';
import { useModalPosition } from '../../hooks/useModalPosition';
import { CalendarSlot } from './type';

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
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | undefined>(
    calendarPickerProps.selectedSlot
  );
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

  const isSingleMode = calendarPickerProps.mode === 'single';
  const isRangeMode = calendarPickerProps.mode === 'range';

  const formatDateString = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const updateInputValue = (newSelectedSlot: CalendarSlot | undefined) => {
    let formattedDate = '';

    if (newSelectedSlot) {
      if (isSingleMode && newSelectedSlot.start) {
        formattedDate = formatDateString(newSelectedSlot.start);
      }

      if (isRangeMode) {
        const { start, end } = newSelectedSlot;
        if (start && end) {
          formattedDate =
            start.getFullYear() === end.getFullYear()
              ? `${formatDateString(start).slice(0, 5)} - ${formatDateString(end)}`
              : `${formatDateString(start)} - ${formatDateString(end)}`;
        }
      }
    }

    setInputValue(formattedDate);
    onChange?.({ target: { value: formattedDate } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDateChange = (newSelectedSlot: CalendarSlot | undefined) => {
    setSelectedSlot(newSelectedSlot);
    updateInputValue(newSelectedSlot);
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
            selectedSlot={selectedSlot}
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

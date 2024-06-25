import { useState, useRef, useEffect } from 'react';
import { withMask } from 'use-mask-input';
import useClickOutside from '../../hooks/useOutsideClick';
import { useModalPosition } from '../../hooks/useModalPosition';
import { CalendarSlot } from './type';
import { formatDateString } from './utils';
import { DatePickerProps } from './DatePicker';

const MODAL_HORIZONTAL_OFFSET = -24;
const MODAL_VERTICAL_OFFSET = 3;
const INPUT_FORMAT = 'dd/mm/yy';

export default function useDatePicker({ calendarPickerProps, inputProps }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const calendarPickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useClickOutside(calendarPickerRef, (e) => {
    // Do not close the picker if any children in input wrapper is clicked.
    // This wrapper include, the input itself, the trailing content (which contains the calendar icon) and the leading content
    if (inputRef.current && inputRef.current.parentElement?.contains(e.target as Node)) return;
    setShowPicker(false);
  });
  const { calculatePosition, modalPosition } = useModalPosition(
    inputRef,
    calendarPickerRef,
    MODAL_VERTICAL_OFFSET,
    MODAL_HORIZONTAL_OFFSET
  );

  const formatSlotToInputValue = (newSelectedSlot: CalendarSlot | undefined) => {
    let formattedDate = '';

    if (newSelectedSlot) {
      if (!calendarPickerProps.isRangeMode && newSelectedSlot.start) {
        formattedDate = formatDateString(newSelectedSlot.start);
      }

      if (calendarPickerProps.isRangeMode) {
        const { start, end } = newSelectedSlot;
        if (start && end) {
          formattedDate =
            start.getFullYear() === end.getFullYear()
              ? `${formatDateString(start).slice(0, 5)} - ${formatDateString(end)}`
              : `${formatDateString(start)} - ${formatDateString(end)}`;
        }

        if (start && !end) {
          formattedDate = `${formatDateString(start)} -`;
        }
      }
    }
    return formattedDate;
  };

  const handleCalendarPickerChange = (newSelectedSlot: CalendarSlot | undefined) => {
    const formattedDate = formatSlotToInputValue(newSelectedSlot);
    setInputValue(formattedDate);
    calendarPickerProps.onDateChange(newSelectedSlot);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setShowPicker(true);
    inputProps.onClick?.(e);
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
        inputFormat: INPUT_FORMAT,
      });
    }
  };

  return {
    showPicker,
    inputValue,
    modalPosition,
    calendarPickerRef,
    setShowPicker,
    setRefs,
    handleCalendarPickerChange,
    handleInputClick,
  };
}

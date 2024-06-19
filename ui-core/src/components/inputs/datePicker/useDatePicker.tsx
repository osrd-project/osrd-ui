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
  const [showPicker, toggleShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | undefined>(
    calendarPickerProps.selectedSlot
  );

  const calendarPickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useClickOutside(calendarPickerRef, () => toggleShowPicker(false));
  const { calculatePosition, modalPosition } = useModalPosition(
    inputRef,
    calendarPickerRef,
    MODAL_VERTICAL_OFFSET,
    MODAL_HORIZONTAL_OFFSET
  );

  const isSingleMode = calendarPickerProps.mode === 'single';
  const isRangeMode = calendarPickerProps.mode === 'range';

  const formatSlotToInputValue = (newSelectedSlot: CalendarSlot | undefined) => {
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

        if (start && !end) {
          formattedDate = `${formatDateString(start)} -`;
        }
      }
    }
    return formattedDate;
  };

  const handleCalendarPickerChange = (newSelectedSlot: CalendarSlot | undefined) => {
    setSelectedSlot(newSelectedSlot);
    const formattedDate = formatSlotToInputValue(newSelectedSlot);
    setInputValue(formattedDate);
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    inputProps.onChange?.(e);
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
    selectedSlot,
    modalPosition,
    calendarPickerRef,
    toggleShowPicker,
    setRefs,
    handleCalendarPickerChange,
    handleInputValueChange,
  };
}

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CalendarSlot } from '../type';
import useDatePicker from '../useDatePicker';

describe('useDatePicker', () => {
  describe('day click on calendar handling', () => {
    describe('single mode', () => {
      it('should set input value with a formatted selected slot', () => {
        const { result } = renderHook(() =>
          useDatePicker({
            calendarPickerProps: { isRangeMode: false },
            inputProps: { id: 'id', label: 'single' },
          })
        );
        const newSelectedSlot = { start: new Date(2024, 0, 1), end: null };

        act(() => {
          result.current.handleCalendarPickerChange(newSelectedSlot);
        });

        expect(result.current.selectedSlot).toEqual(newSelectedSlot);
        expect(result.current.inputValue).toBe('01/01/24');
      });
    });

    describe('range mode', () => {
      it('should set input value with a formatted selected slot', () => {
        const { result } = renderHook(() =>
          useDatePicker({
            calendarPickerProps: { isRangeMode: true },
            inputProps: { id: 'id', label: 'range' },
          })
        );
        let newSelectedSlot: CalendarSlot = { start: new Date(2024, 0, 1), end: null };

        act(() => {
          result.current.handleCalendarPickerChange(newSelectedSlot);
        });

        expect(result.current.selectedSlot).toEqual(newSelectedSlot);
        expect(result.current.inputValue).toBe('01/01/24 -');

        newSelectedSlot = { start: new Date(2024, 0, 1), end: new Date(2024, 0, 2) };
        act(() => {
          result.current.handleCalendarPickerChange(newSelectedSlot);
        });

        expect(result.current.selectedSlot).toEqual(newSelectedSlot);
        expect(result.current.inputValue).toBe('01/01 - 02/01/24');
      });
    });
  });
});

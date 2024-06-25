import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useCalendarPicker from '../useCalendarPicker';
import { generateSequentialDates } from '../utils';

describe('useCalendarPicker', () => {
  const january = 0;
  const february = 1;
  const june = 5;
  const july = 6;
  const august = 7;
  const december = 11;
  describe('Initialization', () => {
    it('should initialize with the correct default values', () => {
      const { result } = renderHook(() => useCalendarPicker({}));

      const expectedDates = generateSequentialDates(new Date(), 1);

      expect(result.current.displayedMonthsStartDates).toEqual(expectedDates);
      expect(result.current.showNavigationBtn).toEqual(true);
      expect(result.current.canGoToNextMonth).toEqual(true);
      expect(result.current.canGoToPreviousMonth).toEqual(true);
      expect(result.current.selectedSlot).toBeUndefined();
    });

    it('should throw an error if selectedSlot is not valid', () => {
      expect(() =>
        renderHook(() =>
          useCalendarPicker({
            selectedSlot: { start: new Date(2024, february, 2), end: new Date(2024, february, 1) },
          })
        )
      ).toThrowError();
    });

    it('should throw an error if selectableSlot is not valid', () => {
      const selectableSlot = {
        start: new Date(2024, february, 2),
        end: new Date(2024, february, 1),
      };

      expect(() => renderHook(() => useCalendarPicker({ selectableSlot }))).toThrowError();
    });

    it('should throw an error if selectedSlot is not within selectableSlot', () => {
      const selectedSlot = { start: new Date(2024, february, 1), end: new Date(2024, february, 2) };
      const selectableSlot = {
        start: new Date(2024, february, 3),
        end: new Date(2024, february, 4),
      };

      expect(() =>
        renderHook(() => useCalendarPicker({ selectedSlot, selectableSlot }))
      ).toThrowError();
    });

    it('should throw an error when initialDate is not a valid date', () => {
      const initialDate = new Date(2024, february, 1);
      const selectableSlot = {
        start: new Date(2024, february, 3),
        end: new Date(2024, february, 4),
      };

      expect(() =>
        renderHook(() => useCalendarPicker({ initialDate, selectableSlot }))
      ).toThrowError();
    });
  });

  describe('Day click handling', () => {
    describe('Single mode', () => {
      it('should set clicked date as start date all the time', () => {
        const { result } = renderHook(() => useCalendarPicker({}));
        const firstClickedDate = new Date(2024, february, 1);
        const secondClickedDate = new Date(2024, june, 1);
        act(() => result.current.handleDayClick(firstClickedDate));
        expect(result.current.selectedSlot).toEqual({
          start: firstClickedDate,
          end: firstClickedDate,
        });

        act(() => result.current.handleDayClick(secondClickedDate));
        expect(result.current.selectedSlot).toEqual({
          start: secondClickedDate,
          end: secondClickedDate,
        });
      });
    });

    describe('Range mode', () => {
      it('should set clicked date as start date when no slot is selected', () => {
        const { result } = renderHook(() => useCalendarPicker({ isRangeMode: true }));
        const clickedDate = new Date(2024, february, 1);
        act(() => result.current.handleDayClick(clickedDate));

        expect(result.current.selectedSlot).toEqual({ start: clickedDate, end: null });
      });

      it('should clear the slot when the same date is clicked', () => {
        const { result } = renderHook(() => useCalendarPicker({ isRangeMode: true }));
        const clickedDate = new Date(2024, february, 1);
        act(() => result.current.handleDayClick(clickedDate));
        act(() => result.current.handleDayClick(clickedDate));

        expect(result.current.selectedSlot).toBeUndefined();
      });

      it('should set clicked date as start date and previous start date as end date when clicked date is before current start date', () => {
        const { result } = renderHook(() => useCalendarPicker({ isRangeMode: true }));
        const firstClickedDate = new Date(2024, february, 2);
        const secondClickedDate = new Date(2024, february, 1);
        act(() => result.current.handleDayClick(firstClickedDate));
        act(() => result.current.handleDayClick(secondClickedDate));

        expect(result.current.selectedSlot).toEqual({
          start: secondClickedDate,
          end: firstClickedDate,
        });
      });

      it('should set clicked date as end date when clicked date is after current start date', () => {
        const { result } = renderHook(() => useCalendarPicker({ isRangeMode: true }));
        const firstClickedDate = new Date(2024, february, 1);
        const secondClickedDate = new Date(2024, february, 2);
        act(() => result.current.handleDayClick(firstClickedDate));
        act(() => result.current.handleDayClick(secondClickedDate));

        expect(result.current.selectedSlot).toEqual({
          start: firstClickedDate,
          end: secondClickedDate,
        });
      });

      it('should clear existing slot and set clicked date as start date of new slot when a slot is already defined', () => {
        const { result } = renderHook(() => useCalendarPicker({ isRangeMode: true }));
        const firstClickedDate = new Date(2024, february, 1);
        const secondClickedDate = new Date(2024, february, 2);
        const thirdClickedDate = new Date(2024, february, 3);
        act(() => result.current.handleDayClick(firstClickedDate));
        act(() => result.current.handleDayClick(secondClickedDate));
        act(() => result.current.handleDayClick(thirdClickedDate));

        expect(result.current.selectedSlot).toEqual({ start: thirdClickedDate, end: null });
      });
    });
  });

  describe('Navigation handling', () => {
    it('should navigate to the next month correctly during the year', () => {
      const { result } = renderHook(() =>
        useCalendarPicker({ initialDate: new Date(2024, july, 1) })
      );
      act(() => result.current.handleGoToNextMonth());

      expect(result.current.displayedMonthsStartDates[0].getMonth()).toBe(august);
      expect(result.current.displayedMonthsStartDates[0].getFullYear()).toBe(2024);
    });

    it('should navigate to the next month correctly at the end of the year', () => {
      const { result } = renderHook(() =>
        useCalendarPicker({ initialDate: new Date(2024, december, 1) })
      );
      act(() => result.current.handleGoToNextMonth());

      expect(result.current.displayedMonthsStartDates[0].getMonth()).toBe(january);
      expect(result.current.displayedMonthsStartDates[0].getFullYear()).toBe(2025);
    });

    it('should navigate to the previous month correctly during the year', () => {
      const { result } = renderHook(() =>
        useCalendarPicker({ initialDate: new Date(2024, july, 1) })
      );
      act(() => result.current.handleGoToPreviousMonth());

      expect(result.current.displayedMonthsStartDates[0].getMonth()).toBe(june);
      expect(result.current.displayedMonthsStartDates[0].getFullYear()).toBe(2024);
    });

    it('should navigate to the previous month correctly at the start of the year', () => {
      const { result } = renderHook(() =>
        useCalendarPicker({ initialDate: new Date(2024, january, 1) })
      );
      act(() => result.current.handleGoToPreviousMonth());

      expect(result.current.displayedMonthsStartDates[0].getMonth()).toBe(december);
      expect(result.current.displayedMonthsStartDates[0].getFullYear()).toBe(2023);
    });
  });

  describe('Month display', () => {
    it('should display the correct number of months', () => {
      const { result } = renderHook(() => useCalendarPicker({ numberOfMonths: 3 }));
      expect(result.current.displayedMonthsStartDates.length).toBe(3);
    });

    it('should display the correct start dates for each month', () => {
      const { result } = renderHook(() => useCalendarPicker({ numberOfMonths: 3 }));
      const startDates = result.current.displayedMonthsStartDates;

      for (let i = 0; i < startDates.length - 1; i++) {
        const currentMonth = startDates[i].getMonth();
        const nextMonth = startDates[i + 1].getMonth();
        const expectedMonth = (currentMonth + 1) % 12;
        expect(nextMonth).toBe(expectedMonth);
      }
    });
  });
});
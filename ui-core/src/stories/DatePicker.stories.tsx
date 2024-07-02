import React, { useState } from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { DatePicker, DatePickerProps } from '../components/inputs/datePicker';
import '@osrd-project/ui-core/dist/theme.css';
import { CalendarSlot } from '../components/inputs/datePicker';

const startSelectableDate = new Date();
const endSelectableDate = new Date(startSelectableDate);
endSelectableDate.setMonth(endSelectableDate.getMonth() + 3);

const DatePickerStory = (props: DatePickerProps) => {
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | undefined>(
    props.calendarPickerProps.selectedSlot
  );
  const onDateChange = (nextSelectedSlot: CalendarSlot | undefined) =>
    setSelectedSlot(nextSelectedSlot);
  return (
    <DatePicker
      {...props}
      calendarPickerProps={{ ...props.calendarPickerProps, selectedSlot, onDateChange }}
    />
  );
};

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      story: {
        height: '500px',
      },
    },
  },
  args: {
    calendarPickerProps: {
      numberOfMonths: 1,
      selectableSlot: { start: startSelectableDate, end: endSelectableDate },
      onDateChange: () => {},
    },
    inputProps: {
      id: 'date-picker',
      label: 'Select a date',
    },
  },
  render: (props) => <DatePickerStory {...props} />,
  title: 'core/DatePicker',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Single: Story = {
  args: {
    calendarPickerProps: {
      ...meta.args?.calendarPickerProps,
      isRangeMode: false,
      onDateChange: () => {},
    },
  },
};

export const Range: Story = {
  args: {
    calendarPickerProps: {
      ...meta.args?.calendarPickerProps,
      isRangeMode: true,
      onDateChange: () => {},
    },
  },
};

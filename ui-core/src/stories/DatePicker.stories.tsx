import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import DatePicker from '../components/inputs/datePicker/DatePicker';
import '@osrd-project/ui-core/dist/theme.css';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    calendarPickerProps: {
      numberOfMonths: 1,
      selectableSlot: { start: new Date(2024, 4, 3), end: new Date(2024, 6, 31) },
    },
    inputProps: {
      id: 'date-picker',
      label: 'Select a date',
    },
  },
  title: 'DatePicker',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Single: Story = {
  args: {
    calendarPickerProps: {
      ...meta.args?.calendarPickerProps,
      mode: 'single',
    },
  },
};

export const Range: Story = {
  args: {
    calendarPickerProps: {
      ...meta.args?.calendarPickerProps,
      mode: 'range',
    },
  },
};

import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { DatePicker } from '../components/inputs/datePicker';
import '@osrd-project/ui-core/dist/theme.css';

const startSelectableDate = new Date();
const endSelectableDate = new Date(startSelectableDate);
endSelectableDate.setMonth(endSelectableDate.getMonth() + 3);

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

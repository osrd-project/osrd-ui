import { StoryObj, Meta } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';

import DatePicker from '../components/inputs/datePicker/DatePicker';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  args: {
    calendarProps: {
      selectableSlot: { start: new Date(2024, 4, 3), end: new Date(2024, 5, 28) },
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

export const Default: Story = {
  args: {},
};

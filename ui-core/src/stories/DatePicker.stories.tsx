import { StoryObj, Meta } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';

import DatePicker from '../components/inputs/DatePicker';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  args: {
    label: 'Departure date',
  },
  title: 'DatePicker',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {},
};

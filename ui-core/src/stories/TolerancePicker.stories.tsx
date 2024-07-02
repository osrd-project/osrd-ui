import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TolerancePicker from '../components/inputs/TolerancePicker';

import '@osrd-project/ui-core/dist/theme.css';

const meta: Meta<typeof TolerancePicker> = {
  component: TolerancePicker,
  args: {
    label: 'TolerancePicker',
    id: 'time-picker',
  },
  title: 'TolerancePicker',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '11em' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TolerancePicker>;

export const Default: Story = {
  args: {
    label: 'Tolerance',
  },
};

export const DisabledTolerancePicker: Story = {
  args: {
    disabled: true,
    label: 'Tolerance',
  },
};

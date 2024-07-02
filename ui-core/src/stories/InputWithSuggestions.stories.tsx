import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import '@osrd-project/ui-core/dist/theme.css';

import InputWithSuggestions from '../components/inputs/InputWithSuggestions';

type Suggestion = { id: string; label: string };

const suggestions = [
  { id: '1', label: 'Manuel' },
  { id: '2', label: 'Manuela' },
  { id: '3', label: 'Manuella', value: 'ed' },
] as Suggestion[];

const meta: Meta<typeof InputWithSuggestions> = {
  component: InputWithSuggestions,
  args: {
    small: false,
    disabled: false,
    readOnly: false,
    onChange: () => {},
    getSuggestionLabel: (option) => (option as Suggestion).label,
    getSuggestionKey: (option) => (option as Suggestion).id,
    suggestions: suggestions,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '20rem' }}>
        <Story />
      </div>
    ),
  ],
  title: 'core/InputWithSuggestions',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputWithSuggestions>;

export const Default: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    suggestions: ['Manuel', 'Manuela', 'Manuella'],
    getSuggestionLabel: (option) => option as string,
    getSuggestionKey: (option) => option as string,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    disabled: true,
  },
};

export const Hint: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    hint: 'You can type Manu to have suggestions',
  },
};

export const RequiredInput: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    required: true,
  },
};

export const LoadingInput: Story = {
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    statusWithMessage: {
      status: 'loading',
    },
  },
};

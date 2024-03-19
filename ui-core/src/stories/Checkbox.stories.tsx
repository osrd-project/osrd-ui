import type {Meta, StoryObj} from '@storybook/react';
import Checkbox from '../components/inputs/checkbox/Checkbox';

const meta: Meta<typeof Checkbox> = {
    component: Checkbox,
    title: 'Checkbox',
    argTypes: {
        isChecked: { control: 'boolean' },
        isIndeterminate: { control: 'boolean' },
        small: { control: 'boolean' },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        label: 'Checkbox',
    },
};
export const Checked: Story = {
    args: {
        label: 'Checkbox',
        isChecked: true,
    },
};
export const Indeterminate: Story = {
    args: {
        label: 'Checkbox',
        isIndeterminate: true,
    },
};
export const Small: Story = {
    args: {
        label: 'Checkbox',
        small: true,
    },
};
export const SmallChecked: Story = {
    args: {
        label: 'Checkbox',
        isChecked: true,
        small: true,
    },
};
export const SmallIndeterminate: Story = {
    args: {
        label: 'Checkbox',
        isIndeterminate: true,
        small: true,
    },
};

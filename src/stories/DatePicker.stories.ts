import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from '../components/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    isSelectionRange: true,
    type: 'russian',
  },
};
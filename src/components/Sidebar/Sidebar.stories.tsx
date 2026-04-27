import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from './index';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onNewComparison: { action: 'clicked new comparison' },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onNewComparison: () => alert('New Comparison Clicked!'),
  },
  parameters: {
    reactRouter: {
      routePath: '/',
    }
  }
};

export const ActiveExplore: Story = {
  args: {
    onNewComparison: () => alert('New Comparison Clicked!'),
  },
  parameters: {
    reactRouter: {
      routePath: '/explore',
    }
  }
};

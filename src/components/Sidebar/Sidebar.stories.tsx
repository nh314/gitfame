import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';
import Sidebar from './index';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withRouter],
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

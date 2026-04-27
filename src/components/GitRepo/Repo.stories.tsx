import type { Meta, StoryObj } from '@storybook/react';
import Repo, { GitRepo } from './Repo';

const mockRepo: GitRepo = {
  id: 10270250,
  node_id: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
  name: 'react',
  full_name: 'facebook/react',
  html_url: 'https://github.com/facebook/react',
  private: false,
  owner: {
    html_url: 'https://github.com/facebook',
  },
  stargazers_count: 203000,
  forks_count: 42000,
  watchers: 203000,
  open_issues: 1200,
};

const meta = {
  title: 'Components/GitRepo',
  component: Repo,
  tags: ['autodocs'],
  argTypes: {
    onRemoveButtonClick: { action: 'removed' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Repo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchResultItem: Story = {
  args: {
    repo: mockRepo,
  },
  decorators: [
    (Story) => (
      <div className="w-80 border border-outline-variant/20 rounded-lg overflow-hidden shadow-sm">
        <Story />
      </div>
    ),
  ],
};

export const CompareCard: Story = {
  args: {
    repo: mockRepo,
    context: 'compare',
  },
  decorators: [
    (Story) => (
      <div className="w-96 p-4">
        <Story />
      </div>
    ),
  ],
};

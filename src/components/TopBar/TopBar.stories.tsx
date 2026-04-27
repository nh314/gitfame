import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import TopBar from './index';

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
    onTermChange: { action: 'term changed' },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const formRef = useRef<HTMLFormElement>(null);
  return <TopBar {...args} formRef={formRef} />;
};

export const Default: Story = {
  render: Template,
  args: {
    term: '',
    isLoading: false,
    onSubmit: () => {},
    onTermChange: () => {},
    formRef: null as any,
  },
};

export const WithText: Story = {
  render: Template,
  args: {
    term: 'facebook/react',
    isLoading: false,
    onSubmit: () => {},
    onTermChange: () => {},
    formRef: null as any,
  },
};

export const Loading: Story = {
  render: Template,
  args: {
    term: 'facebook/react',
    isLoading: true,
    onSubmit: () => {},
    onTermChange: () => {},
    formRef: null as any,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import DefaultHeader from '@/components/header/DefaultHeader';

function Header() {
  return (
    <div>
      <DefaultHeader label="회원가입" />
    </div>
  );
}

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

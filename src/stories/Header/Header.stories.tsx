import type { Meta, StoryObj } from '@storybook/react';
import DefaultHeader from '@/components/header/DefaultHeader';
import DateControlHeader from '@/components/header/DateControlHeader';

function Header() {
  return (
    <div className="w-[500px] flex flex-col gap-1.5">
      <h2>DefaultHeader</h2>
      <DefaultHeader label="환경설정" />
      <DefaultHeader label="회원가입" hasBackButton />
      <DefaultHeader label="카테고리 추가" hasPlusButton />
      <DefaultHeader label="가계부 편집" hasBackButton hasTrashButton />
      <h2>DateControlHeader</h2>
      <DateControlHeader date="2024년 1월" />
      <DateControlHeader date="2024년" />
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

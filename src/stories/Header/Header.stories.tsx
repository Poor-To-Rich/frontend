import type { Meta, StoryObj } from '@storybook/react';
import DefaultHeader from '@/components/header/DefaultHeader';
import DateControlHeader from '@/components/header/DateControlHeader';
import LeftArrowButton from '@/components/button/icon/LeftArrowButton';
import PlusButton from '@/components/button/icon/PlusButton';
import TrashButton from '@/components/button/icon/TrashButton';

function Header() {
  return (
    <div className="flex flex-col gap-1.5">
      <h2>DefaultHeader</h2>
      <DefaultHeader label="환경설정" />
      <DefaultHeader label="회원가입" leftButton={<LeftArrowButton />} />
      <DefaultHeader label="카테고리 추가" rightButton={<PlusButton />} />
      <DefaultHeader label="가계부 편집" leftButton={<LeftArrowButton />} rightButton={<TrashButton />} />
      <DefaultHeader leftButton={<LeftArrowButton />} label={'가계부 추가'} />
      <br />
      <h2>DateControlHeader</h2>
      <DateControlHeader headerDate={new Date()} setHeaderDate={() => {}} />
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

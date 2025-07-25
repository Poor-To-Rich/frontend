import ChatActionBox from '@/components/input/chatroom/ChatActionBox';
import InputActionBox from '@/components/input/chatroom/InputActionBox';
import PasswordActionBox from '@/components/input/modal/PasswordActionBox';
import type { Meta, StoryObj } from '@storybook/react';

function Input() {
  return (
    <div className="flex flex-col gap-3">
      <PasswordActionBox />
      <InputActionBox placeholder="검색어를 입력해주세요" buttonLabel="검색" />
      <InputActionBox placeholder="닉네임 검색" />
      <ChatActionBox />
    </div>
  );
}
const meta: Meta<typeof Input> = {
  title: 'Chatroom/Input',
  component: Input,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

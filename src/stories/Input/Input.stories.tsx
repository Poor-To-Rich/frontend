import ChatActionBox from '@/pages/ChatroomPage/components/ChatActionBox';
import InputActionBox from '@/components/chatroom/input/InputActionBox';
import PasswordActionBox from '@/pages/ChatroomCoverPage/components/modal/PasswordActionBox';
import type { Meta, StoryObj } from '@storybook/react';

function Input() {
  return (
    <div className="flex flex-col gap-3">
      <PasswordActionBox />
      <InputActionBox placeholder="검색어를 입력해주세요" buttonLabel="검색" />
      <InputActionBox placeholder="닉네임 검색" />
      <ChatActionBox chatroomId={1} />
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

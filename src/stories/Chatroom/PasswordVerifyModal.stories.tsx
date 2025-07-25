import type { Meta, StoryObj } from '@storybook/react';
import PasswordVerifyModal from '@/components/chatroom/modal/PasswordVerifyModal';

function ChatroomModal() {
  return (
    <div className="w-[500px] relative">
      <PasswordVerifyModal />;
    </div>
  );
}

const meta = {
  title: 'Chatroom/ChatroomModal',
  component: ChatroomModal,
} satisfies Meta<typeof ChatroomModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

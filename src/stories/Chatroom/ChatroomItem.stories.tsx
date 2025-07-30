import JoinedChatroomItem from '@/components/chatroom/chat/JoinedChatroomItem';
import PublicChatroomItem from '@/components/chatroom/chat/PublicChatroomItem';
import Profile from '/image/default-profile-image.webp';
import type { Meta, StoryObj } from '@storybook/react';

function ChatroomItem() {
  return (
    <div>
      <JoinedChatroomItem
        chatroomId={1}
        isHost
        chatroomImage={Profile}
        chatroomTitle="나는야 부자될거야"
        lastMessage="오늘은 빗물을 받아 마셨어요"
        currentMemberCount={51}
        lastMessageTime="오후 8:35"
      />
      <JoinedChatroomItem
        chatroomId={1}
        chatroomImage={Profile}
        isHost
        chatroomTitle="나는야 부자될거야"
        lastMessage="오늘은 빗물을 받아 마셨어요"
        currentMemberCount={51}
        lastMessageTime="오후 8:35"
        unreadMessageCount={99}
      />
      <JoinedChatroomItem
        chatroomId={1}
        chatroomImage={Profile}
        isHost
        chatroomTitle="나는야 부자될거야"
        lastMessage="오늘은 빗물을 받아 마셨어요 오늘은 빗물을 받아 마셨어요 오늘은 빗물을 받아 마셨어요"
        currentMemberCount={51}
        lastMessageTime="오후 8:35"
        unreadMessageCount={99}
        isEditMode
      />
      <PublicChatroomItem
        chatroomId={1}
        chatroomImage={Profile}
        chatroomTitle="나는야 부자될거야 나는야 부자될거야 나는야 부자될거야 나는야 부자될거야"
        description="부자될사람만 오세요 부자될사람만 오세요 부자될사람만 오세요 부자될사람만 오세요"
        currentMemberCount={51}
        maxMemberCount={100}
        hashtags={['절약', '부자', '거지']}
        lastMessageTime="30분전"
      />
      <PublicChatroomItem
        chatroomId={1}
        chatroomImage={Profile}
        chatroomTitle="나는야 부자될거야 나는야 부자될거야 나는야 부자될거야 나는야 부자될거야"
        description="부자될사람만 오세요 부자될사람만 오세요 부자될사람만 오세요 부자될사람만 오세요"
        currentMemberCount={51}
        maxMemberCount={100}
        hashtags={['절약', '부자', '거지']}
        lastMessageTime="30분전"
        isEditMode
      />
    </div>
  );
}

const meta = {
  title: 'Chatroom/ChatroomItem',
  component: ChatroomItem,
} satisfies Meta<typeof ChatroomItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

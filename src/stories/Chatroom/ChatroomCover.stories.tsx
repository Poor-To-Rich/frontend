import CoverProfilePhoto from '@/components/chatroom/cover/CoverProfilePhoto';
import ProfileImage from '/image/Logo.webp';
import type { Meta, StoryObj } from '@storybook/react';
import ChatroomInfoItem from '@/components/chatroom/cover/ChatroomInfoItem';
import ChatroomSummary from '@/components/chatroom/cover/ChatroomSummary';

function ChatroomCover() {
  return (
    <div>
      <CoverProfilePhoto photo={ProfileImage} />
      <ChatroomSummary
        chatroomTitle="채팅을 곁들인 수다방"
        currentMemberCount={50}
        maxMemberCount={100}
        createdAt="2025.07.03"
        likeCount={0}
      />
      <ChatroomInfoItem
        label="채팅방 소개"
        content="부자될사람만 오세요 제발 진짜 제발 부자될사람만 오세요 제발 진짜 제발 부자될사람만 오세요 제발 진짜 제발 부자될사람만 오세요 제발 진짜 제발"
      />
      <ChatroomInfoItem label="해시태그" content="#부자 #거지 #진짜제발" />
    </div>
  );
}

const meta: Meta<typeof ChatroomCover> = {
  title: 'Chatroom/ChatroomCover',
  component: ChatroomCover,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

import ChatBody from '@/pages/ChatroomPage/components/message/ChatBody';
import NoticeSection from '@/pages/ChatroomPage/components/notice/NoticeSection';
import { ChatMessageUnion } from '@/types/messageType';
import { RecentNoticeType } from '@/types/noticeType';
import { UserProfileType } from '@/types/profileType';
import type { Meta, StoryObj } from '@storybook/react';

function ChatroomMessage() {
  const previousMessagesResponse = {
    messages: [
      {
        type: 'CHAT_MESSAGE',
        messageId: 100,
        chatroomId: 1,
        senderId: 101,
        messageType: 'TEXT',
        content: '안녕하세요~',
        sentAt: '2025-07-27T09:00:00Z',
        unreadBy: [102, 103],
      },
      {
        type: 'CHAT_MESSAGE',
        messageId: 101,
        chatroomId: 1,
        senderId: 101,
        messageType: 'TEXT',
        content: '다들 오늘 점심 뭐 먹을 예정이에요?',
        sentAt: '2025-07-27T09:00:10Z',
        unreadBy: [102],
      },
      {
        type: 'SYSTEM_MESSAGE',
        messageId: 102,
        chatroomId: 1,
        userId: 103,
        messageType: 'ENTER',
        content: '짠돌이부자님이 입장했습니다.',
        sentAt: '2025-07-27T09:01:00Z',
      },
      {
        type: 'CHAT_MESSAGE',
        messageId: 103,
        chatroomId: 1,
        senderId: 103,
        messageType: 'TEXT',
        content: '김치찌개 먹으러 갑니다.',
        sentAt: '2025-07-27T09:02:15Z',
        unreadBy: [101],
      },
      {
        type: 'CHAT_MESSAGE',
        messageId: 104,
        chatroomId: 1,
        senderId: 103,
        messageType: 'IMAGE',
        content: '/image/default-profile-image.webp',
        sentAt: '2025-07-27T09:02:45Z',
        unreadBy: [],
      },
      {
        type: 'RANKING_STATUS',
        messageId: 105,
        chatroomId: 1,
        isChatEnabled: false,
        sentAt: '2025-07-27T09:03:00Z',
      },
      {
        type: 'CHAT_MESSAGE',
        messageId: 106,
        chatroomId: 1,
        senderId: 102,
        messageType: 'TEXT',
        content: '채팅 막힘 뭐야? 😅',
        sentAt: '2025-07-28T09:03:10Z',
        unreadBy: [102, 103],
      },
      {
        type: 'RANKING_MESSAGE',
        messageId: 107,
        rankingId: 17,
        chatroomId: 1,
        rankedAt: '2025-07-26',
        sentAt: '2025-07-27T09:05:00Z',
        saverRankings: [
          {
            userId: 101,
            profileImage: '/image/default-profile-image.webp',
            nickname: '짠돌이부자',
            isHost: true,
            rankingType: 'SAVER',
          },
          {
            userId: 102,
            profileImage: '/image/default-profile-image.webp',
            nickname: '짠돌이부자2',
            isHost: false,
            rankingType: 'NONE',
          },
          {
            userId: 103,
            profileImage: '/image/default-profile-image.webp',
            nickname: '짠돌이부자3',
            isHost: false,
            rankingType: 'FLEXER',
          },
        ],
        flexerRankings: [
          {
            userId: 103,
            profileImage: '/image/default-profile-image.webp',
            nickname: '짠돌이부자3',
            isHost: false,
            rankingType: 'FLEXER',
          },
        ],
      },
    ],
    users: {
      '101': {
        userId: 101,
        nickname: '짠돌이부자',
        profileImage: '/image/default-profile-image.webp',
        isHost: true,
        rankingType: 'SAVER',
      },
      '102': {
        userId: 102,
        nickname: '짠돌이부자2',
        profileImage: '/image/default-profile-image.webp',
        isHost: false,
        rankingType: 'NONE',
      },
      '103': {
        userId: 103,
        nickname: '짠돌이부자3',
        profileImage: '/image/default-profile-image.webp',
        isHost: false,
        rankingType: 'FLEXER',
      },
    },
  };

  const notice: RecentNoticeType = {
    status: 'DEFAULT',
    noticeId: 1,
    preview: '[ 필독 사항 ] 수다를 걸들인 거지방 이용하실 분들 확인해 주세요 다 같이 부자됩시다!',
    createdAt: '2025-07-01T15:14:00Z',
    authorNickname: '데굴',
  };

  return (
    <div className="w-full relative h-screen overflow-y-auto">
      <NoticeSection {...notice} />
      <ChatBody
        myUserId={103}
        chatroomId="1"
        messages={previousMessagesResponse.messages as ChatMessageUnion[]}
        users={previousMessagesResponse.users as Record<string, UserProfileType>}
      />
    </div>
  );
}

const meta = {
  title: 'Chatroom/ChatroomMessage',
  component: ChatroomMessage,
} satisfies Meta<typeof ChatroomMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

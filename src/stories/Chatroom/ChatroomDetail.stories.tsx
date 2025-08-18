import PhotoPreviewBox from '@/pages/ChatroomDetailPage/components/PhotoPreviewBox';
import Photo from '/image/default-profile-image.webp';
import type { Meta, StoryObj } from '@storybook/react';
import NoticePreviewBox from '@/pages/ChatroomDetailPage/components/NoticePreviewBox';
import RankingPreviewBox from '@/pages/ChatroomDetailPage/components/RankingPreviewBox';
import { RankingType } from '@/types/profileType';
import ChatMemberBox from '@/pages/ChatroomDetailPage/components/ChatMemberBox';
import NoticeItem from '@/pages/ChatroomDetailPage/components/notice/NoticeItem';
import RankingItem from '@/pages/ChatroomDetailPage/components/ranking/RankingItem';
import { BaseRankingType } from '@/types/rankingType';
import DateGroupedImageGrid from '@/components/photo/DateGroupedImageGrid';

function ChatroomDetail() {
  const photos = (() => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      result.push({ photoId: i, photoUrl: Photo });
    }
    return result;
  })();

  const notice = {
    noticeId: 1,
    preview: '[ 필독 사항 ] 수다를 걸들인 거지방 이용하실 분들 확인해 주세요 다들 부자됩시다',
    createdAt: '2025-07-01T15:14:00Z',
    authorNickname: '데굴',
  };

  const rankings = {
    rankingId: 3246,
    rankedAt: '2025-07-01',
    saverRankings: [
      {
        userId: 555,
        profileImage: Photo,
        nickname: '짠돌이부자',
        isHost: true,
        rankingType: 'SAVER' as RankingType,
      },
      {
        userId: 556,
        profileImage: Photo,
        nickname: '짠돌이부자2',
        isHost: false,
        rankingType: 'NONE' as RankingType,
      },
    ],
    flexerRankings: [
      {
        userId: 6123,
        profileImage: Photo,
        nickname: '짠돌이부자3' as RankingType,
        isHost: true,
        rankingType: 'FLEXER' as RankingType,
      },
      {
        userId: 3545,
        profileImage: Photo,
        nickname: '짠돌이부자4' as RankingType,
        isHost: false,
        rankingType: 'NONE',
      },
    ],
  } as BaseRankingType;

  const photoByDate = {
    date: '2027-01-02',
    photos: photos,
  };

  return (
    <div>
      <PhotoPreviewBox chatroomId="1" />
      <NoticePreviewBox chatroomId="1" />
      <RankingPreviewBox chatroomId="1" />
      <ChatMemberBox chatroomId="1" />
      <NoticeItem {...notice} hasUnderLine />
      <RankingItem {...rankings} hasUnderLine />
      <DateGroupedImageGrid {...photoByDate} />
    </div>
  );
}

const meta: Meta<typeof ChatroomDetail> = {
  title: 'Chatroom/ChatroomDetail',
  component: ChatroomDetail,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

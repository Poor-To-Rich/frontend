import PhotoPreviewBox from '@/components/chatroom/detail/PhotoPreviewBox';
import Photo from '/image/default-profile-image.webp';
import type { Meta, StoryObj } from '@storybook/react';
import NoticePreviewBox from '@/components/chatroom/detail/NoticePreviewBox';

function ChatroomDetail() {
  const photos = (() => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push({ photoId: i, photoUrl: Photo });
    }
    return result;
  })();

  const notices = [
    {
      noticeId: 1,
      preview: '[ 필독 사항 ] 수다를 걸들인 거지방 이용하실 분들 확인해 주세요 부자됩시다',
    },
    {
      noticeId: 2,
      preview: '[ 필독 사항 ] 수다를 걸들인 거지방 이용하실 분들 확인해 주세요 부자됩시다',
    },
    {
      noticeId: 3,
      preview: '[ 필독 사항 ] 수다를 걸들인 거지방 이용하실 분들 확인해 주세요 부자됩시다',
    },
  ];

  return (
    <div>
      <PhotoPreviewBox photos={photos} />
      <NoticePreviewBox notices={notices} />
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

import PhotoPreviewBox from '@/components/chatroom/detail/PhotoPreviewBox';
import Photo from '/image/default-profile-image.webp';
import type { Meta, StoryObj } from '@storybook/react';

function ChatroomDetail() {
  const photos = (() => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push({ photoId: i, photoUrl: Photo });
    }
    return result;
  })();

  return (
    <div>
      <PhotoPreviewBox photos={photos} />
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

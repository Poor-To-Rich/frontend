import type { Meta, StoryObj } from '@storybook/react';
import UserProfile from '@/components/profile/UserProfile';

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
  title: 'Photo/UserProfile',
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
  args: {
    profileImage: '/image/default-profile-image.webp',
    nickname: '데굴',
    isHost: true,
    userId: 1,
    rankingType: 'FLEXER',
    profileType: 'default',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import RankingUserProfile from '@/components/profile/RankingUserProfile';

const meta: Meta<typeof RankingUserProfile> = {
  component: RankingUserProfile,
  title: 'Profile/RankingUserProfile',
};

export default meta;
type Story = StoryObj<typeof RankingUserProfile>;

export const Default: Story = {
  args: {
    profileImage: '/image/default-profile-image.webp',
    nickname: '데굴',
    userId: 1,
  },
};

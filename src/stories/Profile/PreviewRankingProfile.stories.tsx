import type { Meta, StoryObj } from '@storybook/react';
import PreviewRankingProfile from '@/components/profile/PreviewRankingProfile';

const meta: Meta<typeof PreviewRankingProfile> = {
  component: PreviewRankingProfile,
  title: 'Profile/PreviewRankingProfile',
};

export default meta;
type Story = StoryObj<typeof PreviewRankingProfile>;

export const Default: Story = {
  args: {
    profileImage: '/image/default-profile-image.webp',
    nickname: '데굴',
    userId: 1,
    rankingType: 'FLEXER',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import TapBar from '@/components/tapbar/TapBar';

function TapBarStory() {
  return (
    <div>
      <TapBar page="main" />
    </div>
  );
}

const meta = {
  component: TapBarStory,
} satisfies Meta<typeof TapBarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

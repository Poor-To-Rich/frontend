import Calender from '@/components/calender/Calender';
import type { Meta, StoryObj } from '@storybook/react';

function CalenderStory() {
  return (
    <div>
      <Calender />
    </div>
  );
}

const meta = {
  component: CalenderStory,
} satisfies Meta<typeof CalenderStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

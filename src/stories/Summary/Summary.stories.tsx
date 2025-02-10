import PeriodReport from '@/components/summary/PeriodReport ';
import type { Meta, StoryObj } from '@storybook/react';

function Summary() {
  return (
    <div className="flex flex-col">
      <PeriodReport period="25.01~25.02" balance={45678465468} />
    </div>
  );
}

const meta = {
  component: Summary,
} satisfies Meta<typeof Summary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

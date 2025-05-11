import PeriodSummary from '@/components/summary/PeriodSummary';
import TransactionSummary from '@/components/summary/TransactionSummary';
import type { Meta, StoryObj } from '@storybook/react';

function Summary() {
  return (
    <div className="flex flex-col gap-2.5">
      <PeriodSummary period="25.01~25.02" balance={45678465468} transactionType="지출" />
      <TransactionSummary income={865133} expense={15648124124} total={4685165} />
      <TransactionSummary
        income={865133}
        expense={1564865133}
        total={4685165}
        isWeekSummary
        startDate={'25.01.01'}
        endDate={'25.01.13'}
      />
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

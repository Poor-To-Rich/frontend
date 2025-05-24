import MonthlyOverview from '@/pages/MonthWeekPage/components/MonthlyOverview';
import WeeklyOverview from '@/pages/MonthWeekPage/components/WeeklyOverview';
import type { Meta, StoryObj } from '@storybook/react';

function Overview() {
  const monthlyReport = [
    {
      period: '01.01~01.31',
      totalIncome: 100000,
      totalExpense: 900000,
      totalAmount: -800000,
    },
    {
      period: '02.01~02.28',
      totalIncome: 100004558748489000,
      totalExpense: 1001651489465000,
      totalAmount: 900000,
    },
    {
      period: '03.01~03.31',
      totalIncome: 10000000,
      totalExpense: 100000,
      totalAmount: 900000,
    },
  ];

  return (
    <div className="flex flex-col items-end">
      <MonthlyOverview targetYear="2025" monthlyLogs={monthlyReport} />
      <WeeklyOverview targetDate="2025-01" />
    </div>
  );
}

const meta = {
  component: Overview,
} satisfies Meta<typeof Overview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

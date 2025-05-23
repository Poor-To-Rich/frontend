import MonthlyOverview from '@/pages/MonthWeekPage/components/MonthlyOverview';
import WeeklyOverview from '@/pages/MonthWeekPage/components/WeeklyOverview';
import type { Meta, StoryObj } from '@storybook/react';

function Overview() {
  const monthlyReport = [
    {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      totalIncome: 100000,
      totalExpense: 900000,
      totalBalance: -800000,
    },
    {
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      totalIncome: 100004558748489000,
      totalExpense: 1001651489465000,
      totalBalance: 900000,
    },
    {
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      totalIncome: 10000000,
      totalExpense: 100000,
      totalBalance: 900000,
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

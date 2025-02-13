import MonthlyOverview from '@/components/overview/MonthlyOverview';
import WeeklyOverview from '@/components/overview/WeeklyOverview';
import type { Meta, StoryObj } from '@storybook/react';

function Overview() {
  const monthlyReport = [
    {
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-31'),
      totalIncome: 100000,
      totalExpense: 900000,
      totalBalance: -800000,
    },
    {
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-02-28'),
      totalIncome: 100004558748489000,
      totalExpense: 1001651489465000,
      totalBalance: 900000,
    },
    {
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-03-31'),
      totalIncome: 10000000,
      totalExpense: 100000,
      totalBalance: 900000,
    },
  ];

  return (
    <div className="flex flex-col items-end">
      <MonthlyOverview monthlyLogs={monthlyReport} />
      <WeeklyOverview weeklyLogs={monthlyReport} />
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

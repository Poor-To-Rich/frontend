import DateControlHeader from '@/components/header/DateControlHeader';
import MonthlyOverview from '@/components/overview/MonthlyOverview';
import TransactionSummary from '@/components/summary/TransactionSummary';
import TapBar from '@/components/tapbar/TapBar';
import { OverviewLogType } from '@/types/types';
import { format } from 'date-fns';

const MonthWeekPage = () => {
  const monthlyReport: OverviewLogType[] = [
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
      totalIncome: 10000000,
      totalExpense: 100000,
      totalBalance: 900000,
    },
    {
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-03-31'),
      totalIncome: 10000000,
      totalExpense: 100000,
      totalBalance: 900000,
    },
    {
      startDate: new Date('2025-04-01'),
      endDate: new Date('2025-04-31'),
      totalIncome: 10000000,
      totalExpense: 100000,
      totalBalance: 900000,
    },
    {
      startDate: new Date('2025-05-01'),
      endDate: new Date('2025-05-30'),
      totalIncome: 10000000,
      totalExpense: 100000,
      totalBalance: 900000,
    },
    {
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-06-31'),
      totalIncome: 10000000,
      totalExpense: 100000,
      totalBalance: 900000,
    },
    {
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-07-31'),
      totalIncome: 10000000,
      totalExpense: 100000,
      totalBalance: 900000,
    },
    {
      startDate: new Date('2025-08-01'),
      endDate: new Date('2025-08-31'),
      totalIncome: 10000000,
      totalExpense: 100000,
      totalBalance: 900000,
    },
    {
      startDate: new Date('2025-09-01'),
      endDate: new Date('2025-09-31'),
      totalIncome: 10000000,
      totalExpense: 100000,
      totalBalance: 900000,
    },
  ];

  return (
    <div className="w-full h-fit min-h-screen max-h-fit flex flex-col relative">
      <DateControlHeader date={format(new Date(), 'yyyy년 MM월')} />
      <div className="grow">
        <TransactionSummary income={0} expense={0} total={0} />
        <MonthlyOverview monthlyLogs={monthlyReport} />
      </div>
      <TapBar page="month-week" />
    </div>
  );
};

export default MonthWeekPage;

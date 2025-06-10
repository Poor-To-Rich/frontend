import MonthlyOverview from '@/pages/MonthWeekPage/components/MonthlyOverview';
import TransactionSummary from '@/components/summary/TransactionSummary';
import useGetYearlySummary from '@/hooks/apis/report/useGetYearlySummary';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { format } from 'date-fns';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

const YearlySummarySection = () => {
  const { monthWeekHeaderDate } = useHeaderDateStore();
  const targetYear = format(monthWeekHeaderDate, 'yyyy');
  const { data: yearlySummaryData, isPending } = useGetYearlySummary(targetYear);

  if (isPending || !yearlySummaryData) {
    return (
      <div className="flex flex-col grow justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }
  return (
    <div className="grow">
      <TransactionSummary
        income={yearlySummaryData.yearTotalIncome}
        expense={yearlySummaryData.yearTotalExpense}
        total={yearlySummaryData.yearTotalAmount}
      />
      <MonthlyOverview targetYear={targetYear} monthlyLogs={yearlySummaryData.monthlyLogs} />
    </div>
  );
};

export default YearlySummarySection;

import DateControlHeader from '@/components/header/DateControlHeader';
import MonthlyOverview from '@/components/overview/MonthlyOverview';
import TransactionSummary from '@/components/summary/TransactionSummary';
import TapBar from '@/components/tapbar/TapBar';
import useGetYearlySummary from '@/hooks/apis/report/useGetYearlySummary';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { format } from 'date-fns';

const MonthWeekPage = () => {
  const { monthWeekHeaderDate, setMonthWeekHeaderDate } = useHeaderDateStore();
  const { data: yearlySummaryData, isFetching } = useGetYearlySummary(format(monthWeekHeaderDate, 'yyyy'));

  return (
    <div className="w-full h-fit min-h-screen max-h-fit flex flex-col relative">
      <DateControlHeader headerDate={monthWeekHeaderDate} setHeaderDate={setMonthWeekHeaderDate} />
      {isFetching || !yearlySummaryData ? (
        <div>로딩중</div>
      ) : (
        <div className="grow">
          <TransactionSummary
            income={yearlySummaryData.yearTotalIncome}
            expense={yearlySummaryData.yearTotalExpense}
            total={yearlySummaryData.yearTotalBalance}
          />
          <MonthlyOverview monthlyLogs={yearlySummaryData.monthlyReport} />
        </div>
      )}
      <TapBar page="month-week" />
    </div>
  );
};

export default MonthWeekPage;

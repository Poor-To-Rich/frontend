import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import DefaultHeader from '@/components/header/DefaultHeader';
import TransactionSummary from '@/components/summary/TransactionSummary';
import useGetWeeklyDetailsSummary from '@/hooks/apis/report/useGetWeeklyDetailsSummary';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

const WeeklyDetailsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get('date') || '';
  const week = searchParams.get('week') || '';

  const { data: weeklyDetailsSummary, isFetching } = useGetWeeklyDetailsSummary(date, week);

  return !weeklyDetailsSummary || isFetching ? (
    <div>로딩중..</div>
  ) : (
    <div>
      <DefaultHeader label="주별 상세내역" hasBackButton />
      <TransactionSummary
        period={weeklyDetailsSummary.period}
        income={weeklyDetailsSummary.totalIncome}
        expense={weeklyDetailsSummary.totalExpense}
        total={weeklyDetailsSummary.totalAmount}
        isWeekSummary
      />
      {weeklyDetailsSummary.dailyDetails.map(({ date, transactions }, indx) => (
        <div className="w-full flex flex-col gap-3.5 pt-8" key={indx}>
          <span className="pl-3">{format(date, 'MM.dd')}</span>
          <div className="w-full flex flex-col items-center gap-3">
            {transactions.map(transaction => (
              <TransactionDetailItem key={transaction.id} {...transaction} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyDetailsPage;

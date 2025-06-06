import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import DefaultHeader from '@/components/header/DefaultHeader';
import FetchingMessage from '@/components/loading/FetchingMessage';
import TransactionSummary from '@/components/summary/TransactionSummary';
import useGetWeeklyDetailsInfiniteQuery from '@/hooks/apis/report/useGetWeeklyDetailsInfiniteQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { format } from 'date-fns';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

const WeeklyDetailsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get('date') || '';
  const week = searchParams.get('week') || '';
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetWeeklyDetailsInfiniteQuery(date, week);
  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });
  const weeklyDetailsSummary = data?.pages?.flatMap(page => page.dailyDetails) || [];
  const totalCount = data?.pages[0]?.countOfLogs ?? 0;
  const isEmpty = weeklyDetailsSummary?.length === 0;

  if (!data) return <div>로딩중..</div>;

  return (
    <div className="w-full min-h-screen flex flex-col">
      <DefaultHeader label="주별 상세내역" hasBackButton />
      <TransactionSummary
        period={data.pages[0].period}
        income={data.pages[0].totalIncome}
        expense={data.pages[0].totalExpense}
        total={data.pages[0].totalAmount}
        isWeekSummary
      />
      <div className={`w-full ${isEmpty && 'flex flex-grow items-center justify-center'}`}>
        {isEmpty ? (
          <span className="text-defaultGrey">내역이 없습니다</span>
        ) : (
          <>
            <p className="w-full flex justify-end px-6 p-3.5">총 {totalCount}건</p>
            <div className="flex flex-col gap-8">
              {weeklyDetailsSummary.map(({ date, transactions }, indx) => (
                <div className="w-full flex flex-col gap-3.5" key={indx}>
                  <span className="pl-3">{format(date, 'MM.dd')}</span>
                  <div className="w-full flex flex-col items-center gap-3">
                    {transactions.map(transaction => (
                      <TransactionDetailItem key={transaction.id} {...transaction} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <FetchingMessage isFetchingNextPage={isFetchingNextPage} />
      </div>
      {!isEmpty && <div ref={observerRef} className="h-4" />}
    </div>
  );
};

export default WeeklyDetailsPage;

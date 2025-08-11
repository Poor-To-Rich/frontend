import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import FetchingMessage from '@/components/loading/FetchingMessage';
import TransactionSummary from '@/components/summary/TransactionSummary';
import { useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useGetWeeklyDetailsInfiniteQuery from '@/hooks/apis/transactions/useGetWeeklyDetailsInfiniteQuery';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useScrollToSelectedRef from '@/hooks/useScrollToSelectedRef';

const WeeklyDetailsSection = () => {
  const location = useLocation();
  const { date, week } = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      date: searchParams.get('date') || '',
      week: searchParams.get('week') || '',
    };
  }, [location.search]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { selectedRef, targetItem } = useScrollToSelectedRef('id');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useGetWeeklyDetailsInfiniteQuery(
    date,
    week,
  );

  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });
  const weeklyDetailsSummary = data?.pages?.flatMap(page => page.dailyDetails) || [];
  const totalCount = data?.pages[0]?.countOfLogs ?? 0;
  const isEmpty = weeklyDetailsSummary?.length === 0;

  if (!data || isPending) {
    return (
      <div className="flex flex-col grow justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <>
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
                  <span className="pl-3">{date}</span>
                  <div className="w-full flex flex-col items-center gap-3">
                    {transactions.map(transaction => (
                      <TransactionDetailItem
                        key={transaction.id}
                        {...transaction}
                        selectedRef={selectedRef}
                        targetItem={targetItem}
                      />
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
    </>
  );
};

export default WeeklyDetailsSection;

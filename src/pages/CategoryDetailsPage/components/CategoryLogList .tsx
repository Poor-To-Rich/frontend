import SortingButton from '@/components/button/icon/SortingButton';
import { useEffect, useRef, useState } from 'react';
import { formatNumber } from '@/utils/number';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import useCategoryLogsInfiniteQuery from '@/hooks/apis/chart/useCategoryLogsInfiniteQuery';

interface Props {
  transactionType: string;
  categoryId: string;
  date: string;
  isSavings: boolean;
}

const CategoryLogList = ({ transactionType, categoryId, date, isSavings }: Props) => {
  const navigate = useNavigate();
  const [isDescending, setIsDescending] = useState<boolean>(true);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCategoryLogsInfiniteQuery(categoryId, date);
  const allCategoryLogs = data?.pages?.flatMap(page => page.categoryLogs) || [];
  const totalCount = data?.pages[0]?.countOfLogs ?? 0;
  const isEmpty = allCategoryLogs?.length === 0;
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setIsDescending(prev => !prev);
  };

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    const current = observerRef.current;
    observer.observe(current);

    return () => {
      observer.unobserve(current);
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (!data) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="w-full flex flex-col flex-grow mt-5">
      <div className="flex justify-between px-6 py-1.5 items-center w-full h-[3.5rem] border-b border-strokeGray">
        <span>총 {totalCount}건</span>
        <SortingButton isDescending={isDescending} onClick={handleClick} />
      </div>
      <div className={`w-full ${isEmpty && 'flex grow items-center justify-center'}`}>
        {isEmpty ? (
          <span className="text-defaultGrey">내역이 없습니다</span>
        ) : (
          allCategoryLogs.map(({ date, transactions }, idx) => (
            <div key={`${date}-${idx}`} className="w-full flex justify-between">
              <div className=" w-full flex flex-col flex-grow">
                <span className="px-5 py-3">{date}</span>
                {transactions.map(({ id, title, amount }) => (
                  <div
                    key={id}
                    className={clsx(
                      title ? 'justify-between' : 'justify-end',
                      (transactionType === '지출' || isSavings) && 'text-sunsetRose',
                      transactionType === '수입' && !isSavings && 'text-oceanBlue',
                      `flex items-center px-8 gap-8  h-[4.8rem] cursor-pointer hover:bg-strokeGray active:bg-strokeGray`,
                    )}
                    onClick={() => navigate(`/transaction?type=edit&id=${id}`)}>
                    <span className="text-[#555555]">{title}</span>
                    <span className="text-lg truncate">{formatNumber(amount)}원</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        {isFetchingNextPage && <div className="text-center py-4 text-defaultGrey">불러오는 중...</div>}
      </div>
      <div ref={observerRef} className="h-4" />
    </div>
  );
};

export default CategoryLogList;

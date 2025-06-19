import SortingButton from '@/components/button/icon/SortingButton';
import { useRef, useState } from 'react';
import useCategoryLogsInfiniteQuery from '@/hooks/apis/chart/useCategoryLogsInfiniteQuery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import CategoryLogList from '@/pages/CategoryDetailsPage/components/Log/CategoryLogList ';
import { IncomeExpenseType } from '@/types/transactionTypes';

interface Props {
  transactionType: IncomeExpenseType;
  categoryId: string;
  date: string;
  isSavings: boolean;
}

const CategoryLogListSection = ({ transactionType, categoryId, date, isSavings }: Props) => {
  const [isDescending, setIsDescending] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useCategoryLogsInfiniteQuery(
    categoryId,
    date,
  );
  useInfiniteScroll({ observerRef, hasNextPage, isFetchingNextPage, fetchNextPage });

  const allCategoryLogs = data?.pages?.flatMap(page => page.categoryLogs) || [];
  const totalCount = data?.pages[0]?.countOfLogs ?? 0;
  const isEmpty = allCategoryLogs?.length === 0;

  const handleClick = () => {
    if (!isPending) {
      setIsDescending(prev => !prev);
    }
  };

  return (
    <div className="w-full flex flex-col flex-grow mt-5">
      <div className="flex justify-between px-6 py-1.5 items-center w-full h-[3.5rem] border-b border-strokeGray">
        <span>총 {totalCount}건</span>
        <SortingButton isDescending={isDescending} onClick={handleClick} />
      </div>
      <CategoryLogList
        transactionType={transactionType}
        isEmpty={isEmpty}
        isPending={isPending}
        isSavings={isSavings}
        isFetchingNextPage={isFetchingNextPage}
        allCategoryLogs={allCategoryLogs}
      />
      {!isEmpty && <div ref={observerRef} className="h-4" />}
    </div>
  );
};

export default CategoryLogListSection;

import FetchingMessage from '@/components/loading/FetchingMessage';
import { CategoryLogsType } from '@/types/chartTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';
import Skeleton from '@/components/loading/Skeleton';
import CategoryLogItem from '@/pages/CategoryDetailsPage/components/Log/CategoryLogItem';
import useScrollToSelectedRef from '@/hooks/useScrollToSelectedRef';
import { format } from 'date-fns';

interface Props {
  isEmpty: boolean;
  isPending: boolean;
  isSavings: boolean;
  isFetchingNextPage: boolean;
  allCategoryLogs: CategoryLogsType[];
  transactionType: IncomeExpenseType;
}

const CategoryLogList = ({
  isEmpty,
  isPending,
  isFetchingNextPage,
  allCategoryLogs,
  isSavings,
  transactionType,
}: Props) => {
  const { selectedRef } = useScrollToSelectedRef();

  if (isPending) {
    return (
      <div className="flex flex-col">
        <div className="px-5 py-3">
          <Skeleton width="w-[8rem]" height="h-[3rem]" />
        </div>
        <div className="flex flex-col gap-2.5 px-8">
          <Skeleton height="h-[3.5rem]" />
          <Skeleton height="h-[3.5rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${isEmpty && 'flex grow items-center justify-center'}`}>
      {isEmpty ? (
        <span className="text-defaultGrey">내역이 없습니다</span>
      ) : (
        allCategoryLogs.map(({ date, transactions }, idx) => (
          <div key={`${date}-${idx}`} className="w-full flex justify-between">
            <div className=" w-full flex flex-col flex-grow">
              <span className="px-5 py-3">{format(new Date(date), 'MM.dd')}</span>
              {transactions.map(transaction => (
                <CategoryLogItem
                  key={transaction.id}
                  date={date}
                  isSavings={isSavings}
                  transactionType={transactionType}
                  selectedRef={selectedRef}
                  {...transaction}
                />
              ))}
            </div>
          </div>
        ))
      )}
      <FetchingMessage isFetchingNextPage={isFetchingNextPage} />
    </div>
  );
};

export default CategoryLogList;

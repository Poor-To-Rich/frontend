import { formatNumber } from '@/utils/number';
import { clsx } from 'clsx';
import FetchingMessage from '@/components/loading/FetchingMessage';
import { CategoryLogsType } from '@/types/chartTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@/components/loading/Skeleton';

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
  const navigate = useNavigate();

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
      <FetchingMessage isFetchingNextPage={isFetchingNextPage} />
    </div>
  );
};

export default CategoryLogList;

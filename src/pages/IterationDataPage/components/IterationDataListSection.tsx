import { clsx } from 'clsx';
import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import { IncomeExpenseType } from '@/types/transactionTypes';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useGetIterationData from '@/hooks/apis/transaction/useGetIterationData';
import useScrollToSelectedRef from '@/hooks/useScrollToSelectedRef';

interface Props {
  type: IncomeExpenseType;
}

const IterationDataListSection = ({ type }: Props) => {
  const { data: iterationData, isPending: isGetIterationDataPending } = useGetIterationData(type as IncomeExpenseType);
  const { selectedRef, targetItem } = useScrollToSelectedRef('id');
  const isEmpty = iterationData?.iterationAccountBooks.length === 0;

  if (!iterationData || isGetIterationDataPending) {
    return (
      <div className="w-full flex grow justify-center items-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <>
      <div className="w-full px-5 py-3">
        <p
          className={clsx(
            type === '지출' && 'text-sunsetRose',
            type === '수입' && 'text-oceanBlue',
            'font-semibold text-lg',
          )}>
          총액 : {iterationData.totalAmount.toLocaleString()}원
        </p>
      </div>
      <div className={clsx('w-full flex flex-col grow items-center gap-2.5', isEmpty && 'justify-center')}>
        {isEmpty ? (
          <span className="text-defaultGrey">내역이 없습니다.</span>
        ) : (
          iterationData.iterationAccountBooks.map(iterationData => (
            <TransactionDetailItem
              key={iterationData.id}
              selectedRef={selectedRef}
              targetItem={targetItem}
              {...iterationData}
            />
          ))
        )}
      </div>
    </>
  );
};

export default IterationDataListSection;

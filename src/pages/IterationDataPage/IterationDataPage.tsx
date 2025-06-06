import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import DefaultHeader from '@/components/header/DefaultHeader';
import useGetIterationData from '@/hooks/apis/transaction/useGetIterationData';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { clsx } from 'clsx';
import { useLocation } from 'react-router-dom';

const IterationDataPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') || '지출';

  const { data: iterationData, isPending } = useGetIterationData(type as IncomeExpenseType);

  if (!iterationData || isPending) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <DefaultHeader label={`반복 ${type} 데이터`} hasBackButton />
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
      <div className="w-full flex flex-col items-center gap-2.5">
        {iterationData.transactions.map(({ id, color, categoryName, title, isIteration, type, cost }) => (
          <TransactionDetailItem
            key={id}
            id={id}
            color={color}
            categoryName={categoryName}
            title={title}
            isIteration={isIteration}
            type={type}
            cost={cost}
          />
        ))}
      </div>
    </div>
  );
};

export default IterationDataPage;

import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import DefaultHeader from '@/components/header/DefaultHeader';
import { TransactionItemType } from '@/types/transactionTypes';
import { clsx } from 'clsx';
import { useLocation } from 'react-router-dom';

const IterationDataPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  const transactions: TransactionItemType[] = [
    {
      id: 1,
      color: '#ff55ad',
      category: '식비',
      title: '상하이버거세트',
      isIteration: true,
      type: 'EXPENSE',
      cost: 45626546888,
    },
    {
      id: 2,
      color: '#9ADEF1',
      category: '용돈',
      title: '용돈이지롱',
      type: 'INCOME',
      cost: 12678689,
    },
  ];

  return (
    <div>
      <DefaultHeader label={`반복 ${type} 데이터`} hasBackButton />
      <div className="w-full px-5 py-3">
        <span
          className={clsx(
            type === '지출' && 'text-sunsetRose',
            type === '수입' && 'text-oceanBlue',
            'font-semibold text-lg',
          )}>
          총액 : 6,458,735원
        </span>
      </div>
      <div className="w-full flex flex-col items-center gap-2.5">
        {transactions.map(({ id, color, category, title, isIteration, type, cost }) => (
          <TransactionDetailItem
            key={id}
            id={id}
            color={color}
            category={category}
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

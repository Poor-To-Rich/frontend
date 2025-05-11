import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import DefaultHeader from '@/components/header/DefaultHeader';
import TransactionSummary from '@/components/summary/TransactionSummary';
import { WeeklyDetailType } from '@/types/transactionTypes';
import { format } from 'date-fns';
// import { useLocation } from 'react-router-dom';

const WeeklyDetailsPage = () => {
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const date = searchParams.get('date');
  // const week = searchParams.get('week');

  const dailyDetails: WeeklyDetailType[] = [
    {
      date: new Date('2025-01-01'),
      transactions: [
        {
          id: 5,
          color: '#FDB248',
          category: '식비',
          title: '상하이 치킨 버거',
          isIteration: false,
          type: 'EXPENSE',
          cost: 8400,
        },
        {
          id: 7,
          color: '#FDB248',
          category: '식비',
          title: '상하이 치킨 버거',
          isIteration: false,
          type: 'EXPENSE',
          cost: 8400,
        },
      ],
    },
    {
      date: new Date('2025-01-04'),
      transactions: [
        {
          id: 9,
          color: '#FDB248',
          category: '식비',
          title: '상하이 치킨 버거',
          isIteration: false,
          type: 'EXPENSE',
          cost: 8400,
        },
        {
          id: 10,
          color: '#FDB248',
          category: '식비',
          title: '상하이 치킨 버거',
          isIteration: false,
          type: 'EXPENSE',
          cost: 8400,
        },
      ],
    },
  ];

  return (
    <div>
      <DefaultHeader label="주별 상세내역" hasBackButton />
      <TransactionSummary startDate="25.01.01" endDate="25.01.05" isWeekSummary income={0} expense={0} total={0} />
      {dailyDetails.map(({ date, transactions }, indx) => (
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

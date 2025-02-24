import PlusCircleButton from '@/components/button/icon/PlusCircleButton';
import Calender from '@/components/calender/Calender';
import DateControlHeader from '@/components/header/DateControlHeader';
import TransactionSummary from '@/components/summary/TransactionSummary';
import TapBar from '@/components/tapbar/TapBar';
import { format } from 'date-fns';
import DailyTransactionList from '@/pages/MainPage/components/DailyTransactionList';
import { TransactionItemType } from '@/types/types';

const index = () => {
  const transactions: TransactionItemType[] = [
    {
      id: 1,
      color: '#ff55ad',
      category: '식비',
      title: '상하이버거세트',
      isIteration: true,
      type: 'EXPENSE',
      cost: 45626546888798978,
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
    <div className="w-full min-h-screen relative">
      <DateControlHeader date={format(new Date(), 'yyyy년 M월')} />
      <TransactionSummary income={0} expense={0} total={0} />
      <Calender />
      <DailyTransactionList transactions={transactions} total={0} />
      <PlusCircleButton />
      <TapBar page="main" />
    </div>
  );
};

export default index;

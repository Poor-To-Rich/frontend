import PlusCircleButton from '@/pages/MainPage/components/PlusCircleButton';
import Calender from '@/pages/MainPage/components/calender/Calender';
import DateControlHeader from '@/components/header/DateControlHeader';
import TransactionSummary from '@/components/summary/TransactionSummary';
import TapBar from '@/components/tapbar/TapBar';
import DailyTransactionList from '@/pages/MainPage/components/DailyTransactionList';
import { TransactionItemType } from '@/types/transactionTypes';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import useGetMonthlyTotal from '@/hooks/apis/transaction/useGetMonthlyTotal';
import { format } from 'date-fns';

const MainPage = () => {
  const { mainHeaderDate, setMainHeaderDate } = useHeaderDateStore();
  const { data: monthlyTotal, isPending } = useGetMonthlyTotal(format(mainHeaderDate, 'yyyy-MM'));
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
    <div className="w-full min-h-screen flex flex-col relative">
      <DateControlHeader headerDate={mainHeaderDate} setHeaderDate={setMainHeaderDate} />
      <div className="grow">
        {isPending || !monthlyTotal ? (
          <div>로딩중</div>
        ) : (
          <>
            <TransactionSummary
              income={monthlyTotal.totalIncome}
              expense={monthlyTotal.totalExpense}
              total={monthlyTotal.totalAmount}
            />
            <Calender transactions={monthlyTotal.transactions} />
            <DailyTransactionList transactions={transactions} total={0} />
            <PlusCircleButton />
          </>
        )}
      </div>
      <TapBar page="main" />
    </div>
  );
};

export default MainPage;

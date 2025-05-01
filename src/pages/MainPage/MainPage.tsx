import PlusCircleButton from '@/pages/MainPage/components/PlusCircleButton';
import Calender from '@/pages/MainPage/components/calender/Calender';
import DateControlHeader from '@/components/header/DateControlHeader';
import TransactionSummary from '@/components/summary/TransactionSummary';
import TapBar from '@/components/tapbar/TapBar';
import DailyTransactionList from '@/pages/MainPage/components/DailyTransactionList';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import useGetMonthlyTotal from '@/hooks/apis/transaction/useGetMonthlyTotal';
import { format } from 'date-fns';

const MainPage = () => {
  const { mainHeaderDate, setMainHeaderDate } = useHeaderDateStore();
  const { data: monthlyTotal, isPending } = useGetMonthlyTotal(format(mainHeaderDate, 'yyyy-MM'));

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DateControlHeader headerDate={mainHeaderDate} setHeaderDate={setMainHeaderDate} />
      <div className="flex flex-col grow">
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
            <DailyTransactionList />
            <PlusCircleButton />
          </>
        )}
      </div>
      <TapBar page="main" />
    </div>
  );
};

export default MainPage;

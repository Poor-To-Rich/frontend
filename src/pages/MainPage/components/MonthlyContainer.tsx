import TransactionSummary from '@/components/summary/TransactionSummary';
import useGetMonthlyTotal from '@/hooks/apis/transaction/useGetMonthlyTotal';
import Calender from '@/pages/MainPage/components/calender/Calender';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { format } from 'date-fns';

const MonthlyContainer = () => {
  const { mainHeaderDate } = useHeaderDateStore();
  const { data: monthlyTotal, isPending } = useGetMonthlyTotal(format(mainHeaderDate, 'yyyy-MM'));

  return (
    <>
      {isPending || !monthlyTotal ? (
        <div className="w-full grow flex items-center justify-center">로딩중</div>
      ) : (
        <>
          <TransactionSummary
            income={monthlyTotal.totalIncome}
            expense={monthlyTotal.totalExpense}
            total={monthlyTotal.totalAmount}
          />
          <Calender transactions={monthlyTotal.transactions} />
        </>
      )}
    </>
  );
};

export default MonthlyContainer;

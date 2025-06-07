import Skeleton from '@/components/loading/Skeleton';
import TransactionSummary from '@/components/summary/TransactionSummary';
import useGetMonthlyTotal from '@/hooks/apis/transaction/useGetMonthlyTotal';
import Calender from '@/pages/MainPage/components/calender/Calender';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { format } from 'date-fns';

const MonthlyContainer = () => {
  const { mainHeaderDate } = useHeaderDateStore();
  const { data: monthlyTotal, isPending } = useGetMonthlyTotal(format(mainHeaderDate, 'yyyy-MM'));

  if (!monthlyTotal || isPending) {
    return (
      <div className="flex flex-col gap-2.5 p-5">
        <Skeleton height="h-32" />
        <Skeleton height="h-[38rem]" />
      </div>
    );
  }

  return (
    <div className={isPending ? 'opacity-20 pointer-events-none' : ''}>
      <TransactionSummary
        income={monthlyTotal.totalIncome}
        expense={monthlyTotal.totalExpense}
        total={monthlyTotal.totalAmount}
      />
      <Calender transactions={monthlyTotal.transactions} />
    </div>
  );
};

export default MonthlyContainer;

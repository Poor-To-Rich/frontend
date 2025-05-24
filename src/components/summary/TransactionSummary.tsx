import SummeryItem from '@/components/summary/SummeryItem';
import { clsx } from 'clsx';

interface Props {
  income: number;
  expense: number;
  total: number;
  isWeekSummary?: boolean;
  period?: string;
}

const TransactionSummary = ({ income, expense, total, isWeekSummary, period }: Props) => {
  return (
    <div
      className={clsx(
        'w-full p-5 flex flex-col justify-between',
        isWeekSummary ? 'bg-pastelLime h-[12rem]' : 'bg-vanillaCream h-[8rem]',
      )}>
      {isWeekSummary && <div className="text-xl">{period}</div>}
      <div className="w-full flex gap-3.5">
        <SummeryItem label="수입" amount={income.toLocaleString()} />
        <SummeryItem label="지출" amount={expense.toLocaleString()} />
      </div>
      <div className="w-full flex gap-3.5">
        <SummeryItem label="합계" amount={total.toLocaleString()} />
        <div className="w-1/2" />
      </div>
    </div>
  );
};

export default TransactionSummary;

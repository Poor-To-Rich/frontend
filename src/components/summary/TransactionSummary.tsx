import { formatSignedNumber } from '@/utils/number';
import SummeryItem from '@/components/summary/SummeryItem';
import clsx from 'clsx';

interface Props {
  income: number;
  expense: number;
  total: number;
  isWeekSummary?: boolean;
  startDate?: string;
  endDate?: string;
}

const TransactionSummary = ({ income, expense, total, isWeekSummary, startDate, endDate }: Props) => {
  return (
    <div
      className={clsx(
        'w-full p-5 flex flex-col justify-between',
        isWeekSummary ? 'bg-pastelLime h-[12rem]' : 'bg-vanillaCream h-[8rem]',
      )}>
      {isWeekSummary && (
        <div className="text-xl">
          {startDate} ~ {endDate}
        </div>
      )}
      <div className="w-full flex gap-3.5">
        <SummeryItem label="수입" amount={income.toLocaleString()} />
        <SummeryItem label="지출" amount={expense.toLocaleString()} />
      </div>
      <div className="w-full flex gap-3.5">
        <SummeryItem label="합계" amount={formatSignedNumber(total)} />
        <div className="w-1/2" />
      </div>
    </div>
  );
};

export default TransactionSummary;

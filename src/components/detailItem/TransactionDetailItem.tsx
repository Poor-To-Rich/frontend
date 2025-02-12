import clsx from 'clsx';
import IterationIcon from '@/components/icon/IterationIcon';

interface Props {
  id: number;
  color: string;
  category: string;
  title?: string | null;
  isIteration?: boolean;
  type: 'INCOME' | 'EXPENSE';
  cost: number;
}

const TransactionDetailItem = ({ id, color, category, title, isIteration, type, cost }: Props) => {
  return (
    <div className="w-[95%] h-[3.5rem] flex justify-between items-center px-3 border border-strokeGray bg-white rounded-lg">
      <div className="flex items-center gap-2.5">
        <span style={{ color }} className="font-semibold min-w-fit">
          {category}
        </span>
        {title && <span className="text-sm text-defaultGrey min-w-fit">{title}</span>}
        {isIteration && <IterationIcon />}
      </div>
      <span
        className={clsx(
          'truncate-text max-w-1/2',
          type === 'INCOME' && 'text-oceanBlue',
          type === 'EXPENSE' && 'text-sunsetRose',
        )}>
        {cost.toLocaleString()}원
      </span>
    </div>
  );
};

export default TransactionDetailItem;

import { clsx } from 'clsx';
import IterationIcon from '@/components/icon/IterationIcon';
import { Link } from 'react-router-dom';
import { TransactionItemType } from '@/types/transactionTypes';

interface Props extends TransactionItemType {}

const TransactionDetailItem = ({ id, color, category, title, isIteration, type, cost }: Props) => {
  return (
    <Link
      to={{
        pathname: '/transaction',
        search: `?type=edit&transactionType=${type === 'EXPENSE' ? '지출' : '수입'}&id=${id}`,
      }}
      className="w-[98%] h-[3.5rem] flex justify-between items-center px-3 border border-strokeGray bg-white rounded-lg">
      <div className="flex items-center gap-2.5">
        <span style={{ color }} className="font-semibold min-w-fit">
          {category}
        </span>
        {title && <span className="text-sm text-defaultGrey min-w-fit">{title}</span>}
        {isIteration && <IterationIcon />}
      </div>
      <span
        className={clsx(
          'truncate max-w-1/2 text-md sm:text-base',
          type === 'INCOME' && 'text-oceanBlue',
          type === 'EXPENSE' && 'text-sunsetRose',
        )}>
        {cost.toLocaleString()}원
      </span>
    </Link>
  );
};

export default TransactionDetailItem;

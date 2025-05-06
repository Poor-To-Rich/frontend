import { clsx } from 'clsx';
import IterationIcon from '@/components/icon/IterationIcon';
import { TransactionItemType } from '@/types/transactionTypes';
import { useNavigate } from 'react-router-dom';

interface Props extends TransactionItemType {}

const TransactionDetailItem = ({ id, color, category, title, isIteration, type, cost }: Props) => {
  const navigate = useNavigate();

  const handleClick = (id: number, type: string) => {
    const transactionType = type === 'EXPENSE' ? '지출' : '수입';
    navigate(`/transaction?type=edit&transactionType=${transactionType}&id=${id}`);
  };

  return (
    <button
      onClick={() => handleClick(id, type)}
      className="w-[98%] h-[3.5rem] flex justify-between items-center px-3 border border-strokeGray bg-white rounded-lg cursor-pointer">
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
    </button>
  );
};

export default TransactionDetailItem;

import { clsx } from 'clsx';
import IterationIcon from '@/components/icon/IterationIcon';
import { TransactionItemType } from '@/types/transactionTypes';
import { useNavigate } from 'react-router-dom';

interface Props extends TransactionItemType {
  selectedRef?: React.MutableRefObject<HTMLButtonElement | null>;
  targetItem?: string | null;
}

const TransactionDetailItem = ({
  id,
  color,
  categoryName,
  date,
  title,
  isIteration,
  type,
  cost,
  memo,
  selectedRef,
  targetItem,
}: Props) => {
  const isSelected = String(id) === targetItem;
  const navigate = useNavigate();

  const handleClick = (id: number, type: string) => {
    const transactionType = type === 'EXPENSE' ? '지출' : '수입';
    sessionStorage.setItem('selected-id', JSON.stringify(id));
    navigate(`/edit-transaction?transactionType=${transactionType}&date=${date}&id=${id}`);
  };

  return (
    <button
      onClick={() => handleClick(id, type)}
      ref={isSelected ? selectedRef : undefined}
      className={clsx(
        'w-[98%] h-[5rem] flex justify-between items-center px-3 border border-strokeGray rounded-lg cursor-pointer hover:bg-lightGray active:bg-lightGray',
        isSelected ? 'bg-lightGray' : 'bg-white',
      )}>
      <div className="flex items-center gap-3 overflow-hidden">
        <p style={{ color }} className="font-semibold min-w-fit">
          {categoryName}
        </p>
        <div className="flex flex-col items-start p-2.5 overflow-hidden">
          {title && <p className="text-md w-fit">{title}</p>}
          {memo && <p className="text-sm text-start text-defaultGrey truncate max-w-[160px] w-[160px]">{memo}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <span
          className={clsx(
            'text-md sm:text-base text-right',
            type === 'INCOME' && 'text-oceanBlue',
            type === 'EXPENSE' && 'text-sunsetRose',
          )}>
          {cost.toLocaleString()}원
        </span>
        {isIteration && <IterationIcon />}
      </div>
    </button>
  );
};

export default TransactionDetailItem;

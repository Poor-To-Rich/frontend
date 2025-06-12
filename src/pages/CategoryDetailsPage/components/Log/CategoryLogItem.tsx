import { CategoryDetailsTransactionType } from '@/types/chartTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';
import { formatNumber } from '@/utils/number';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

interface Props extends CategoryDetailsTransactionType {
  date: string;
  transactionType: IncomeExpenseType;
  isSavings: boolean;
  selectedRef: React.MutableRefObject<HTMLButtonElement | null>;
}

const CategoryLogItem = ({ id, title, amount, date, transactionType, isSavings, selectedRef }: Props) => {
  const navigate = useNavigate();
  const targetId = sessionStorage.getItem('selected-id');
  const isSelected = String(id) === targetId;

  const handleClick = (id: number) => {
    sessionStorage.setItem('selected-id', JSON.stringify(id));
    navigate(`/transaction?type=edit&transactionType=${transactionType}&date=${date}&id=${id}`);
  };

  return (
    <button
      ref={isSelected ? selectedRef : undefined}
      className={clsx(
        title ? 'justify-between' : 'justify-end',
        isSelected ? 'bg-lightGray' : 'bg-white',
        (transactionType === '지출' || isSavings) && 'text-sunsetRose',
        transactionType === '수입' && !isSavings && 'text-oceanBlue',
        `flex items-center px-8 gap-8  h-[4.8rem] cursor-pointer hover:bg-lightGray active:bg-lightGray`,
      )}
      onClick={() => handleClick(id)}>
      <span className="text-[#555555]">{title}</span>
      <span className="text-lg truncate">{formatNumber(amount)}원</span>
    </button>
  );
};

export default CategoryLogItem;

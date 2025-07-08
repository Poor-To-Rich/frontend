import { IncomeExpenseType } from '@/types/transactionTypes';
import { clsx } from 'clsx';

interface Props {
  type: IncomeExpenseType;
  onClick: (value: IncomeExpenseType) => void;
  isEdit?: boolean;
}

const IncomeExpenseButton = ({ type, onClick, isEdit }: Props) => {
  const options: { label: IncomeExpenseType; color: string }[] = [
    { label: '지출', color: 'bg-pinkRed font-bold' },
    { label: '수입', color: 'bg-lightBlue font-bold' },
  ];

  return (
    <div className="w-full flex justify-center gap-6">
      {options.map(({ label, color }) => (
        <button
          data-testid={`${label === '지출' ? 'expense' : 'income'}-toggle-button`}
          key={label}
          value={label}
          type="button"
          disabled={isEdit}
          className={clsx(
            'w-1/2 h-[3rem] rounded-lg cursor-pointer',
            label === '지출' && 'text-sunsetRose',
            label === '수입' && 'text-oceanBlue',
            type === label ? color : 'border border-strokeGray',
            isEdit && type !== label && 'bg-strokeGray text-defaultGrey!',
          )}
          onClick={() => onClick(label)}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default IncomeExpenseButton;

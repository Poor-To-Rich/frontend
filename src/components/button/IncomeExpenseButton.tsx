import { IncomeExpenseButtonType } from '@/types/types';
import clsx from 'clsx';

interface Props {
  type: IncomeExpenseButtonType;
  onClick: (value: IncomeExpenseButtonType) => void;
}

const IncomeExpenseButton = ({ type, onClick }: Props) => {
  const options: { label: IncomeExpenseButtonType; color: string }[] = [
    { label: '지출', color: 'bg-pinkRed font-bold' },
    { label: '수입', color: 'bg-lightBlue font-bold' },
  ];

  return (
    <div className="w-full flex justify-center gap-6">
      {options.map(({ label, color }) => (
        <button
          key={label}
          value={label}
          type="button"
          className={clsx(
            'w-1/2 h-[3rem] rounded-lg cursor-pointer',
            label === '지출' && 'text-sunsetRose',
            label === '수입' && 'text-oceanBlue',
            type === label ? color : 'border border-strokeGray',
          )}
          onClick={() => onClick(label)}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default IncomeExpenseButton;

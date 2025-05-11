import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import { IncomeExpenseButtonType } from '@/types/transactionTypes';
import { clsx } from 'clsx';
import { useEffect } from 'react';

const TransactionTypeButton = () => {
  const { currentTransactionType, setCurrentTransactionType, clearTransactionType } = useTransactionReportTypeStore();

  const options: { label: IncomeExpenseButtonType; color: string }[] = [
    { label: '지출', color: 'bg-pinkRed' },
    { label: '수입', color: 'bg-lightBlue' },
  ];

  useEffect(() => {
    return () => clearTransactionType();
  }, []);

  return (
    <div className="flex w-[11rem] h-[3rem]">
      {options.map(({ label, color }) => (
        <button
          key={label}
          value={label}
          onClick={() => setCurrentTransactionType(label)}
          className={clsx(
            'w-1/2 border border-strokeGray text-md cursor-pointer',
            label === '지출' ? 'text-sunsetRose rounded-l-lg' : 'text-oceanBlue rounded-r-lg',
            label === currentTransactionType && color,
          )}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default TransactionTypeButton;

import { SummaryItemProps } from '@/types/transactionTypes';
import clsx from 'clsx';

const DailySummeryItem = ({ label, amount }: SummaryItemProps) => {
  return (
    <div className="flex gap-3 items-center">
      <span className="min-w-fit">{label}: </span>
      <span
        className={clsx(
          'truncate text-md',
          label === '수입' && 'text-oceanBlue',
          label === '지출' && 'text-sunsetRose',
          label === '합계' && 'text-defaultGrey',
        )}>
        {amount}원
      </span>
    </div>
  );
};

export default DailySummeryItem;

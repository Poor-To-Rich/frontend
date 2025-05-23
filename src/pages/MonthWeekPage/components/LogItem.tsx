import { OverviewLogType } from '@/types/reportTypes';
import { monthDayFormatter } from '@/utils/date';
import { clsx } from 'clsx';

interface Props {
  type: 'month' | 'week';
  order: number;
  log: OverviewLogType;
  hasUnderLine?: boolean;
  onClick?: () => void;
}

const LogItem = ({ type, order, log, hasUnderLine, onClick }: Props) => {
  return (
    <button
      className={clsx(
        'flex w-full justify-between items-center cursor-pointer',
        hasUnderLine && 'border-b border-strokeGray',
        type === 'month' && 'py-5 px-4',
        type === 'week' && 'py-1.5 px-2.5',
      )}
      onClick={onClick}>
      <div className="flex flex-col items-start">
        <span>
          {order}
          {type === 'month' && '월'}
          {type === 'week' && '주차'}
        </span>
        <span className="text-sm">
          {monthDayFormatter(log.startDate)}~{monthDayFormatter(log.endDate)}
        </span>
      </div>
      <div className="flex flex-col items-end w-[60%] text-md">
        <div className="flex justify-end gap-2.5 w-full">
          <span className="text-oceanBlue truncate max-w-1/2">{log.totalIncome.toLocaleString()}원</span>
          <span className="text-sunsetRose truncate max-w-1/2">{log.totalExpense.toLocaleString()}원</span>
        </div>
        <span className="text-defaultGrey truncate">{log.totalAmount.toLocaleString()}원</span>
      </div>
    </button>
  );
};

export default LogItem;

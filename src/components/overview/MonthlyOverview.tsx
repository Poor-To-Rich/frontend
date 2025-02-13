import { OverviewLogType } from '@/types/types';
import { formatDate } from '@/utils/date';
import { formatSignedNumber } from '@/utils/number';

interface Props {
  monthlyLogs: OverviewLogType[];
}

const MonthlyOverview = ({ monthlyLogs }: Props) => {
  return (
    <div>
      {monthlyLogs.map((log, index) => (
        <button key={index} className="flex w-full px-2.5 py-1.5 justify-between items-center">
          <div className="flex flex-col items-start">
            <span className="text-lg">{index + 1}월</span>
            <span className="text-sm">
              {formatDate(log.startDate)}~{formatDate(log.endDate)}
            </span>
          </div>
          <div className="flex flex-col items-end w-[60%] text-md">
            <div className="flex justify-end gap-2.5 w-full">
              <span className="text-oceanBlue truncate max-w-1/2">{log.totalIncome.toLocaleString()}원</span>
              <span className="text-sunsetRose truncate max-w-1/2">{log.totalExpense.toLocaleString()}원</span>
            </div>
            <span className="text-defaultGrey truncate">{formatSignedNumber(log.totalBalance)}원</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MonthlyOverview;

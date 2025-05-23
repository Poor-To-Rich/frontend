import WeeklyOverview from '@/pages/MonthWeekPage/components/WeeklyOverview';
import { useState } from 'react';
import { OverviewLogType } from '@/types/reportTypes';
import LogItem from '@/pages/MonthWeekPage/components/LogItem';

interface Props {
  targetYear: string;
  monthlyLogs: OverviewLogType[];
}

const MonthlyOverview = ({ targetYear, monthlyLogs }: Props) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleClick = (index: number) => {
    setOpenIndexes(prevIndexes =>
      prevIndexes.includes(index) ? prevIndexes.filter(i => i !== index) : [...prevIndexes, index],
    );
  };

  return (
    <div className="w-full">
      {monthlyLogs.map((log, index) => (
        <div className="flex flex-col items-end">
          <LogItem key={index} order={index + 1} log={log} type="month" onClick={() => handleClick(index)} />
          {openIndexes.includes(index) && (
            <WeeklyOverview targetDate={`${targetYear}-${(index + 1).toString().padStart(2, '0')}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default MonthlyOverview;

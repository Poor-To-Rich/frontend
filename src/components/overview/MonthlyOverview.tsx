import { OverviewLogType } from '@/types/types';
import LogItem from '@/components/overview/LogItem';
import WeeklyOverview from './WeeklyOverview';
import { useState } from 'react';

interface Props {
  monthlyLogs: OverviewLogType[];
}

const MonthlyOverview = ({ monthlyLogs }: Props) => {
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
          {openIndexes.includes(index) && <WeeklyOverview weeklyLogs={monthlyLogs} />}
        </div>
      ))}
    </div>
  );
};

export default MonthlyOverview;

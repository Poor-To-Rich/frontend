import { OverviewLogType } from '@/types/types';
import LogItem from '@/components/overview/LogItem';

interface Props {
  monthlyLogs: OverviewLogType[];
}

const MonthlyOverview = ({ monthlyLogs }: Props) => {
  return (
    <div className="w-full">
      {monthlyLogs.map((log, index) => (
        <LogItem order={index + 1} log={log} type="month" />
      ))}
    </div>
  );
};

export default MonthlyOverview;

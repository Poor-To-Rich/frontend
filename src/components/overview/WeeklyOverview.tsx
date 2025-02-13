import { OverviewLogType } from '@/types/types';
import LogItem from '@/components/overview/LogItem';

interface Props {
  weeklyLogs: OverviewLogType[];
}

const WeeklyOverview = ({ weeklyLogs }: Props) => {
  return (
    <div className="w-[90%] mr-[5%] border border-strokeGray">
      {weeklyLogs.map((log, index) => (
        <LogItem
          order={index + 1}
          log={log}
          type="week"
          hasUnderLine={index !== 0 || index !== weeklyLogs.length - 1}
        />
      ))}
    </div>
  );
};

export default WeeklyOverview;

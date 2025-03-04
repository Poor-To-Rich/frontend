import { OverviewLogType } from '@/types/types';
import LogItem from '@/components/overview/LogItem';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface Props {
  weeklyLogs: OverviewLogType[];
}

const WeeklyOverview = ({ weeklyLogs }: Props) => {
  const navigate = useNavigate();

  const handleClick = (date: string, week: number) => {
    navigate(`/weeklyDetails?date=${date}&week=${week}`);
  };

  return (
    <div className="w-[90%] mr-[5%] border border-strokeGray mb-2.5">
      {weeklyLogs.map((log, index) => (
        <LogItem
          key={index}
          order={index + 1}
          log={log}
          type="week"
          hasUnderLine={index !== weeklyLogs.length - 1}
          onClick={() => handleClick(format(log.startDate, 'yyyy-MM'), index + 1)}
        />
      ))}
    </div>
  );
};

export default WeeklyOverview;

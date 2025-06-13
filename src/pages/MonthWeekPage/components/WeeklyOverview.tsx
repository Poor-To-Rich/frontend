import LogItem from '@/pages/MonthWeekPage/components/LogItem';
import { useNavigate } from 'react-router-dom';
import useGetWeeklySummary from '@/hooks/apis/report/useGetWeeklySummary';
import Skeleton from '@/components/loading/Skeleton';

interface Props {
  targetDate: string;
}

const WeeklyOverview = ({ targetDate }: Props) => {
  const navigate = useNavigate();
  const { data: weeklyLogs, isPending } = useGetWeeklySummary(targetDate);

  const handleClick = (week: number) => {
    navigate(`/weeklyDetails?date=${targetDate}&week=${week}`);
  };

  return (
    <div className="w-[90%] mr-[5%] border border-strokeGray mb-2.5">
      {!weeklyLogs || isPending ? (
        <div className="flex flex-col grow gap-1.5 p-3">
          <Skeleton height="h-[4.5rem]" />
          <Skeleton height="h-[4.5rem]" />
          <Skeleton height="h-[4.5rem]" />
          <Skeleton height="h-[4.5rem]" />
          <Skeleton height="h-[4.5rem]" />
        </div>
      ) : (
        weeklyLogs.map((log, index) => (
          <LogItem
            key={index}
            order={index + 1}
            log={log}
            type="week"
            hasUnderLine={index !== weeklyLogs.length - 1}
            onClick={() => handleClick(index + 1)}
          />
        ))
      )}
    </div>
  );
};

export default WeeklyOverview;

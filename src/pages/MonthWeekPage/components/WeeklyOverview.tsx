import LogItem from '@/pages/MonthWeekPage/components/LogItem';
import { useNavigate } from 'react-router-dom';
import useGetWeeklySummary from '@/hooks/apis/report/useGetWeeklySummary';

interface Props {
  targetDate: string;
}

const WeeklyOverview = ({ targetDate }: Props) => {
  const navigate = useNavigate();
  const { data: weeklyLogs, isFetching } = useGetWeeklySummary(targetDate);

  const handleClick = (week: number) => {
    navigate(`/weeklyDetails?date=${targetDate}&week=${week}`);
  };

  return (
    <div className="w-[90%] mr-[5%] border border-strokeGray mb-2.5">
      {!weeklyLogs || isFetching ? (
        <div>로딩중</div>
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

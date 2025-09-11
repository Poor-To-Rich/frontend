import WeeklyOverview from '@/pages/MonthWeekPage/components/WeeklyOverview';
import { OverviewLogType } from '@/types/reportTypes';
import LogItem from '@/pages/MonthWeekPage/components/LogItem';
import useOpenIndexStore from '@/stores/useOpenIndexStore';
import useScrollToSelectedRef from '@/hooks/scroll/useScrollToSelectedRef';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';

interface Props {
  targetYear: string;
  monthlyLogs: OverviewLogType[];
}

const MonthlyOverview = ({ targetYear, monthlyLogs }: Props) => {
  const { openIndexes, addOpenIndex } = useOpenIndexStore();
  const { selectedRef, targetItem } = useScrollToSelectedRef('period');

  return (
    <div className="w-full">
      {monthlyLogs.map((log, index) => (
        <div key={index} className="flex flex-col items-end">
          <LogItem order={index + 1} log={log} type="month" onClick={() => addOpenIndex(index)} />
          {openIndexes.includes(index) && (
            <FetchErrorBoundary>
              <WeeklyOverview
                selectedRef={selectedRef}
                targetItem={targetItem}
                targetDate={`${targetYear}-${(index + 1).toString().padStart(2, '0')}`}
              />
            </FetchErrorBoundary>
          )}
        </div>
      ))}
    </div>
  );
};

export default MonthlyOverview;

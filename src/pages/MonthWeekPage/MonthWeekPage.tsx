import DateControlHeader from '@/components/header/DateControlHeader';
import TapBar from '@/components/tapbar/TapBar';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import YearlySummarySection from '@/pages/MonthWeekPage/components/YearlySummarySection';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';

const MonthWeekPage = () => {
  const { monthWeekHeaderDate, setMonthWeekHeaderDate } = useHeaderDateStore();

  return (
    <div className="w-full h-fit min-h-screen max-h-fit flex flex-col relative">
      <DateControlHeader headerDate={monthWeekHeaderDate} setHeaderDate={setMonthWeekHeaderDate} />
      <PageErrorBoundary>
        <YearlySummarySection />
      </PageErrorBoundary>
      <TapBar page="month-week" />
    </div>
  );
};

export default MonthWeekPage;

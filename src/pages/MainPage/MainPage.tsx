import PlusCircleButton from '@/pages/MainPage/components/PlusCircleButton';
import DateControlHeader from '@/components/header/DateControlHeader';
import TapBar from '@/components/tapbar/TapBar';
import DailyTransactionList from '@/pages/MainPage/components/daily/DailyTransactionList';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import MonthlyContainer from '@/pages/MainPage/components/MonthlyContainer';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';

const MainPage = () => {
  const { mainHeaderDate, setMainHeaderDate } = useHeaderDateStore();
  const { calenderDate } = useCalenderDateStore();

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DateControlHeader headerDate={mainHeaderDate} setHeaderDate={setMainHeaderDate} />
      <div className="flex flex-col grow">
        <PageErrorBoundary>
          <FetchErrorBoundary key={mainHeaderDate.toISOString()}>
            <MonthlyContainer />
          </FetchErrorBoundary>
          <FetchErrorBoundary key={calenderDate.toISOString()}>
            <DailyTransactionList />
          </FetchErrorBoundary>
          <PlusCircleButton />
        </PageErrorBoundary>
      </div>
      <TapBar page="main" />
    </div>
  );
};

export default MainPage;

import PlusCircleButton from '@/pages/MainPage/components/PlusCircleButton';
import DateControlHeader from '@/components/header/DateControlHeader';
import TapBar from '@/components/tapbar/TapBar';
import DailyTransactionList from '@/pages/MainPage/components/daily/DailyTransactionList';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import MonthlyContainer from '@/pages/MainPage/components/MonthlyContainer';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';

const MainPage = () => {
  const { mainHeaderDate, setMainHeaderDate } = useHeaderDateStore();

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <DateControlHeader headerDate={mainHeaderDate} setHeaderDate={setMainHeaderDate} />
      <div className="flex flex-col grow">
        <PageErrorBoundary>
          <MonthlyContainer />
          <DailyTransactionList />
          <PlusCircleButton />
        </PageErrorBoundary>
      </div>
      <TapBar page="main" />
    </div>
  );
};

export default MainPage;

import TransactionTypeButton from '@/components/button/TransactionTypeButton';
import DateControlHeader from '@/components/header/DateControlHeader';
import PeriodComparisonChart from '@/pages/ChartPage/components/period/PeriodComparisonChart';
import Divider from '@/components/Divider';
import TapBar from '@/components/tapbar/TapBar';
import ReportTypeSelection from '@/pages/ChartPage/components/ReportTypeSelection';
import ReportSummary from '@/pages/ChartPage/components/summary/ReportSummary';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import CategoryChartBoard from '@/pages/ChartPage/components/categories/CategoryChartBoard';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';

const ChartPage = () => {
  const { chartHeaderDate, setChartHeaderDate } = useHeaderDateStore();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <DateControlHeader headerDate={chartHeaderDate} setHeaderDate={setChartHeaderDate} />
      <div className="flex flex-col grow">
        <PageErrorBoundary>
          <div className="w-full flex justify-between items-center p-5">
            <ReportTypeSelection />
            <TransactionTypeButton />
          </div>
          <ReportSummary />
          <CategoryChartBoard />
          <Divider />
          <PeriodComparisonChart />
        </PageErrorBoundary>
      </div>
      <TapBar page="chart" />
    </div>
  );
};

export default ChartPage;

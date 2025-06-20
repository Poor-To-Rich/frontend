import TransactionTypeButton from '@/components/button/TransactionTypeButton';
import DateControlHeader from '@/components/header/DateControlHeader';
import PeriodComparisonChart from '@/pages/ChartPage/components/period/PeriodComparisonChart';
import Divider from '@/components/Divider';
import TapBar from '@/components/tapbar/TapBar';
import ReportTypeSelection from '@/pages/ChartPage/components/ReportTypeSelection';
import ReportSummary from '@/pages/ChartPage/components/summary/ReportSummary';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import CategoryChartBoard from '@/pages/ChartPage/components/categories/CategoryChartBoard';
import FetchErrorBoundary from '@/components/error/FetchErrorBoundary';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import useFormattedReportDate from '@/hooks/chart/useFormattedReportDate';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';

const ChartPage = () => {
  const { chartHeaderDate, setChartHeaderDate } = useHeaderDateStore();
  const formattedDate = useFormattedReportDate();
  const { currentTransactionType } = useTransactionReportTypeStore();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <DateControlHeader headerDate={chartHeaderDate} setHeaderDate={setChartHeaderDate} />
      <div className="flex flex-col grow">
        <PageErrorBoundary>
          <div className="w-full flex justify-between items-center p-5">
            <ReportTypeSelection />
            <TransactionTypeButton />
          </div>
          <FetchErrorBoundary key={`${currentTransactionType}-${formattedDate}-summary`}>
            <ReportSummary />
          </FetchErrorBoundary>
          <FetchErrorBoundary key={`${currentTransactionType}-${formattedDate}-chartBoard`}>
            <CategoryChartBoard />
          </FetchErrorBoundary>
          <Divider />
          <FetchErrorBoundary key={`${currentTransactionType}-${formattedDate}-period`}>
            <PeriodComparisonChart />
          </FetchErrorBoundary>
        </PageErrorBoundary>
      </div>
      <TapBar page="chart" />
    </div>
  );
};

export default ChartPage;

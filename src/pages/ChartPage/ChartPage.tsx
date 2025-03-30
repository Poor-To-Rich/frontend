import TransactionTypeButton from '@/components/button/TransactionTypeButton';
import DateControlHeader from '@/components/header/DateControlHeader';
import StackedBarChart from '@/pages/ChartPage/components/categories/StackedBarChart';
import CategorySummary from '@/pages/ChartPage/components/categories/CategorySummary';
import PeriodComparisonChart from '@/pages/ChartPage/components/period/PeriodComparisonChart';
import Divider from '@/components/Divider';
import TapBar from '@/components/tapbar/TapBar';
import ReportTypeSelection from '@/pages/ChartPage/components/ReportTypeSelection';
import ReportSummary from '@/pages/ChartPage/components/summary/ReportSummary';

const ChartPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <DateControlHeader />
      <div className="grow">
        <div className="w-full flex justify-between items-center p-5">
          <ReportTypeSelection />
          <TransactionTypeButton />
        </div>
        <ReportSummary />
        <StackedBarChart />
        <CategorySummary />
        <Divider />
        <PeriodComparisonChart />
      </div>
      <TapBar page="chart" />
    </div>
  );
};

export default ChartPage;

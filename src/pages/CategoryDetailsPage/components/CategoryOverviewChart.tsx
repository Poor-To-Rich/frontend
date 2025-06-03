import PeriodSummary from '@/components/summary/PeriodSummary';
import CategoryLineChart from '@/pages/CategoryDetailsPage/components/lineChart/CategoryLineChart';
import CategoryBarChart from '@/pages/CategoryDetailsPage/components/barChart/CategoryBarChart';
import useGetCategoryDetailsBarChart from '@/hooks/apis/chart/useGetCategoryDetailsBarChart';
import useGetCategoryDetailsLineChart from '@/hooks/apis/chart/useGetCategoryDetailsLineChart';
import { ReportType } from '@/types/reportTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';

interface Props {
  reportType: ReportType;
  transactionType: IncomeExpenseType;
  categoryId: string;
  date: string;
  isSavings?: boolean;
}

const CategoryOverviewChart = ({ reportType, transactionType, categoryId, date, isSavings }: Props) => {
  const isWeekly = reportType === '월별';
  const { data: monthlyChartData, isFetching: isBarChartFetching } = useGetCategoryDetailsBarChart(
    categoryId,
    date,
    !isWeekly,
  );
  const { data: weeklyChartData, isFetching: isLineChartFetching } = useGetCategoryDetailsLineChart(
    categoryId,
    date,
    isWeekly,
  );

  if ((!monthlyChartData && !isWeekly) || (!weeklyChartData && isWeekly) || isBarChartFetching || isLineChartFetching) {
    return <div>로딩중..</div>;
  }

  const period = isWeekly ? weeklyChartData?.period : monthlyChartData?.period;
  const balance = isWeekly ? weeklyChartData?.totalAmount : monthlyChartData?.totalAmount;

  return (
    <div className="w-full">
      <PeriodSummary period={period} balance={balance} transactionType={isSavings ? '저축/투자' : transactionType} />
      <div className="w-full h-[300px] p-5">
        {isWeekly && weeklyChartData && <CategoryLineChart weeklyAmounts={weeklyChartData.weeklyAmounts} />}
        {!isWeekly && monthlyChartData && <CategoryBarChart monthlyAmounts={monthlyChartData.monthlyAmounts} />}
      </div>
    </div>
  );
};

export default CategoryOverviewChart;

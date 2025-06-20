import PeriodSummary from '@/components/summary/PeriodSummary';
import CategoryLineChart from '@/pages/CategoryDetailsPage/components/lineChart/CategoryLineChart';
import CategoryBarChart from '@/pages/CategoryDetailsPage/components/barChart/CategoryBarChart';
import useGetCategoryDetailsBarChart from '@/hooks/apis/chart/useGetCategoryDetailsBarChart';
import useGetCategoryDetailsLineChart from '@/hooks/apis/chart/useGetCategoryDetailsLineChart';
import { IncomeExpenseType } from '@/types/transactionTypes';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

interface Props {
  transactionType: IncomeExpenseType;
  categoryId: string;
  date: string;
  isWeekly: boolean;
  isSavings?: boolean;
}

const CategoryOverviewChart = ({ transactionType, categoryId, date, isSavings, isWeekly }: Props) => {
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
    return (
      <div className="flex justify-center items-center w-full h-[39rem]">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  const period = isWeekly ? weeklyChartData?.period : monthlyChartData?.period;
  const balance = isWeekly ? weeklyChartData?.totalAmount : monthlyChartData?.totalAmount;

  return (
    <div className="w-full">
      <PeriodSummary period={period} balance={balance} transactionType={isSavings ? '저축/투자' : transactionType} />
      <div className="w-full h-[300px] p-5">
        {isWeekly && weeklyChartData && (
          <CategoryLineChart
            transactionType={isSavings ? '저축/투자' : transactionType}
            weeklyAmounts={weeklyChartData.weeklyAmounts}
          />
        )}
        {!isWeekly && monthlyChartData && (
          <CategoryBarChart
            transactionType={isSavings ? '저축/투자' : transactionType}
            monthlyAmounts={monthlyChartData.monthlyAmounts}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryOverviewChart;

import useGetStackedBarChart from '@/hooks/apis/chart/useGetStackedBarChart';
import useFormattedReportDate from '@/hooks/chart/useFormattedReportDate';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import StackedBarChart from '@/pages/ChartPage/components/categories/StackedBarChart';
import CategoryDashBoard from '@/pages/ChartPage/components/categories/CategoryDashBoard';
import Skeleton from '@/components/loading/Skeleton';

const CategoryChartBoard = () => {
  const { currentTransactionType } = useTransactionReportTypeStore();
  const formattedDate = useFormattedReportDate();

  const { data: stackedBarChartData, isPending } = useGetStackedBarChart(currentTransactionType, formattedDate);

  if (!stackedBarChartData || isPending) {
    return (
      <>
        <div className="p-5">
          <Skeleton height="h-[5rem]" />
        </div>
        <div className="flex flex-col gap-2 px-8 pb-4">
          <Skeleton height="h-[3.5rem]" />
          <Skeleton height="h-[3.5rem]" />
        </div>
      </>
    );
  }

  return (
    <>
      <StackedBarChart
        categoryColors={stackedBarChartData.categoryColors}
        aggregatedData={stackedBarChartData.aggregatedData}
      />
      <CategoryDashBoard categoryCharts={stackedBarChartData.categoryCharts} />
    </>
  );
};

export default CategoryChartBoard;

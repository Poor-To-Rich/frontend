import useGetStackedBarChart from '@/hooks/apis/chart/useGetStackedBarChart';
import useFormattedReportDate from '@/hooks/chart/useFormattedReportDate';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import StackedBarChart from '@/pages/ChartPage/components/categories/StackedBarChart';
import CategoryDashBoard from '@/pages/ChartPage/components/categories/CategoryDashBoard';

const CategoryChartBoard = () => {
  const { currentTransactionType } = useTransactionReportTypeStore();
  const formattedDate = useFormattedReportDate();

  const { data: stackedBarChartData, isFetching } = useGetStackedBarChart(currentTransactionType, formattedDate);

  if (!stackedBarChartData || isFetching) {
    return <div>로딩중..</div>;
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

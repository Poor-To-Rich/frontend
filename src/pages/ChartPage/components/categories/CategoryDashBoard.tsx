import RightArrowButton from '@/components/button/icon/RightArrowButton';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import { formatNumber } from '@/utils/number';
import { useNavigate } from 'react-router-dom';
import { StackedBarCategoryChartItem } from '@/types/chartTypes';
import { handleClickCategoryChart } from '@/pages/ChartPage/utils/handleClickCategoryChart';

interface Props {
  categoryCharts: StackedBarCategoryChartItem[];
}

const CategoryDashBoard = ({ categoryCharts }: Props) => {
  const { chartHeaderDate } = useHeaderDateStore();
  const { currentTransactionType } = useTransactionReportTypeStore();
  const { currentReportType } = useReportTypeStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pl-8 pr-5 pb-4">
      {categoryCharts.map(categoryItem => (
        <div
          className="flex justify-between gap-3.5 cursor-pointer py-3"
          key={categoryItem.id}
          onClick={() =>
            handleClickCategoryChart(
              navigate,
              categoryItem.id,
              categoryItem.name,
              currentTransactionType,
              currentReportType,
              chartHeaderDate,
            )
          }>
          <div className="flex w-fit gap-4.5">
            <span style={{ color: categoryItem.color }}>{categoryItem.name}</span>
            <span>{categoryItem.rate}%</span>
          </div>
          <div className="flex max-w-2/5 w-fit gap-2.5">
            <span className="whitespace-nowrap truncate">{formatNumber(categoryItem.amount)}원</span>
            <div className="w-[2.4rem]">
              <RightArrowButton />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryDashBoard;

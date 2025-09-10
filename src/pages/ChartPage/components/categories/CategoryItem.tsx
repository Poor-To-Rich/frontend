import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import { useNavigate } from 'react-router-dom';
import { handleClickCategoryChart } from '@/pages/ChartPage/utils/handleClickCategoryChart';
import useFormattedReportDate from '@/hooks/chart/useFormattedReportDate';
import RightArrowButton from '@/components/button/icon/RightArrowButton';
import { formatNumber } from '@/utils/number';
import { StackedBarCategoryChartItem } from '@/types/chartTypes';

interface Props extends StackedBarCategoryChartItem {
  selectedRef: React.MutableRefObject<HTMLButtonElement | null>;
  targetItem: string | null;
}

const CategoryItem = ({ id, color, name, rate, amount, selectedRef, targetItem }: Props) => {
  const navigate = useNavigate();
  const date = useFormattedReportDate();
  const { currentTransactionType } = useTransactionReportTypeStore();
  const { currentReportType } = useReportTypeStore();
  const isSelected = String(id) === targetItem;

  return (
    <button
      className="flex justify-between gap-3.5 cursor-pointer py-3"
      ref={isSelected ? selectedRef : undefined}
      onClick={() => {
        sessionStorage.setItem('selected-category', String(id));
        handleClickCategoryChart(navigate, id, name, currentTransactionType, currentReportType, date);
      }}>
      <div className="flex w-fit gap-4.5">
        <span style={{ color }}>{name}</span>
        <span>{rate}%</span>
      </div>
      <div className="flex max-w-2/5 w-fit gap-2.5">
        <span className="whitespace-nowrap truncate">{formatNumber(amount)}원</span>
        <RightArrowButton />
      </div>
    </button>
  );
};

export default CategoryItem;

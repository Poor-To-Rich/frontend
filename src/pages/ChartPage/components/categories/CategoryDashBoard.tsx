import { StackedBarCategoryChartItem } from '@/types/chartTypes';
import CategoryItem from '@/pages/ChartPage/components/categories/CategoryItem';
import useScrollToSelectedRef from '@/hooks/scroll/useScrollToSelectedRef';

interface Props {
  categoryCharts: StackedBarCategoryChartItem[];
}

const CategoryDashBoard = ({ categoryCharts }: Props) => {
  const { selectedRef, targetItem } = useScrollToSelectedRef('category');

  return (
    <div className="flex flex-col pl-8 pr-5 pb-4">
      {categoryCharts.length === 0 ? (
        <div className="text-center text-defaultGrey">내역이 없습니다.</div>
      ) : (
        categoryCharts.map(categoryItem => (
          <CategoryItem key={categoryItem.id} selectedRef={selectedRef} targetItem={targetItem} {...categoryItem} />
        ))
      )}
    </div>
  );
};

export default CategoryDashBoard;

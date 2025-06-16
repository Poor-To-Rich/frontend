import { BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer, Tooltip } from 'recharts';
import CategoryBarCustomLabel from '@/pages/CategoryDetailsPage/components/barChart/CategoryBarCustomLabel';
import CustomizedTooltip from '@/pages/CategoryDetailsPage/components/CustomizedTooltip';
import '@/styles/recharts-tooltip.css';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';
import { CharTransactionType, monthlyAmountType } from '@/types/chartTypes';
import { BAR_CHART_COLORS } from '@/constants/charts';

interface Props {
  transactionType: CharTransactionType;
  monthlyAmounts: monthlyAmountType[];
}

const CategoryBarChart = ({ transactionType, monthlyAmounts }: Props) => {
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleEnd } =
    useDraggableScroll();

  const maxAmount = Math.max(...monthlyAmounts.map(item => item.totalAmount));
  const chartColor = BAR_CHART_COLORS[transactionType];

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}>
      <div className="min-w-[700px]">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyAmounts} margin={{ top: 30, right: 10, bottom: 0, left: 10 }} barSize={25}>
            <XAxis type="category" dataKey="period" axisLine={false} tickLine={false} interval={0} />
            <YAxis type="number" dataKey="totalAmount" hide domain={[1, maxAmount]} />
            <Tooltip content={<CustomizedTooltip />} />
            <Bar
              dataKey="totalAmount"
              fill={chartColor}
              background={{ fill: '#f0f0f0', stroke: 'none', radius: 15 }}
              radius={15}>
              <LabelList dataKey="totalAmount" position="top" fontSize={11} content={CategoryBarCustomLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryBarChart;

import { BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer, Tooltip } from 'recharts';
import CustomizedLabel from '@/pages/CategoryDetailsPage/components/barChart/CustomizedLabel';
import CustomizedTooltip from '@/pages/CategoryDetailsPage/components/CustomizedTooltip';
import '@/styles/recharts-tooltip.css';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';
import { monthlyAmountType } from '@/types/chartTypes';
import { IncomeExpenseType } from '@/types/transactionTypes';

interface Props {
  transactionType: IncomeExpenseType;
  monthlyAmounts: monthlyAmountType[];
}

const CategoryBarChart = ({ transactionType, monthlyAmounts }: Props) => {
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleEnd } =
    useDraggableScroll();

  const maxAmount = Math.max(...monthlyAmounts.map(item => item.totalAmount));
  const chartColor = transactionType === '지출' ? '#ffcbc4' : '#D2E2FF';

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
              <LabelList dataKey="totalAmount" position="top" fontSize={11} content={CustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryBarChart;

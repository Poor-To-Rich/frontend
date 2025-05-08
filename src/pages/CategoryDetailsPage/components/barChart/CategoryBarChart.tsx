import { BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer, Tooltip } from 'recharts';
import CustomizedLabel from '@/pages/CategoryDetailsPage/components/barChart/CustomizedLabel';
import CustomizedTooltip from '@/pages/CategoryDetailsPage/components/CustomizedTooltip';
import '@/styles/recharts-tooltip.css';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';

const CategoryBarChart = () => {
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleEnd } =
    useDraggableScroll();
  const monthlyBalances = [
    { month: '1월', amount: 11000 },
    { month: '2월', amount: 9000 },
    { month: '3월', amount: 15000 },
    { month: '4월', amount: 8000 },
    { month: '5월', amount: 11000 },
    { month: '6월', amount: 9500 },
    { month: '7월', amount: 1400 },
    { month: '8월', amount: 10000 },
    { month: '9월', amount: 1300 },
    { month: '10월', amount: 0 },
    { month: '11월', amount: 12500 },
    { month: '12월', amount: 8500 },
  ];
  const maxAmount = Math.max(...monthlyBalances.map(item => item.amount));

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
          <BarChart data={monthlyBalances} margin={{ top: 30, right: 10, bottom: 0, left: 10 }} barSize={25}>
            <XAxis type="category" dataKey="month" axisLine={false} tickLine={false} cycle={0} />
            <YAxis type="number" dataKey="amount" hide domain={[1, maxAmount]} />
            <Tooltip content={<CustomizedTooltip />} />
            <Bar
              dataKey="amount"
              fill="#ffcbc4"
              background={{ fill: '#f0f0f0', stroke: 'none', radius: 15 }}
              radius={15}>
              <LabelList dataKey="amount" position="top" fontSize={11} content={CustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryBarChart;

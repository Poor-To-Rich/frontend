import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CustomizedXAxisTick from '@/pages/CategoryDetailsPage/components/lineChart/CustomizedXAxisTick';
import { WeeklyAmountType } from '@/types/chartTypes';
import CustomizedTooltip from '@/pages/CategoryDetailsPage/components/CustomizedTooltip';
import '@/styles/recharts-line.css';
import { IncomeExpenseType } from '@/types/transactionTypes';

interface Props {
  transactionType: IncomeExpenseType;
  weeklyAmounts: WeeklyAmountType[];
}

const CategoryLineChart = ({ transactionType, weeklyAmounts }: Props) => {
  const chartColor = transactionType === '지출' ? '#eb6060' : '#81AAF6';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={weeklyAmounts} margin={{ top: 0, right: 30, bottom: 0, left: 30 }}>
        <XAxis
          dataKey="period"
          type="category"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={CustomizedXAxisTick}
        />
        <YAxis dataKey="totalAmount" type="number" hide domain={[0, 'auto']} />
        <Tooltip content={<CustomizedTooltip />} />
        <Line type="linear" dataKey="totalAmount" stroke={chartColor} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CategoryLineChart;

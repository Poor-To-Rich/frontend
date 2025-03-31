import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CustomizedXAxisTick from '@/pages/CategoryDetailsPage/components/lineChart/CustomizedXAxisTick';
import { WeeklyBalanceType } from '@/types/chartTypes';
import CustomizedTooltip from '@/pages/CategoryDetailsPage/components/lineChart/CustomizedTooltip';

interface Props {
  weeklyBalances: WeeklyBalanceType[];
}

const CategoryLineChart = ({ weeklyBalances }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={weeklyBalances} margin={{ top: 30, right: 30, bottom: 0, left: 30 }}>
        <XAxis
          dataKey="period"
          type="category"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={CustomizedXAxisTick}
        />
        <YAxis dataKey="amount" type="number" scale="pow" exponent={0.5} hide domain={[1, 'auto']} />
        <Tooltip content={<CustomizedTooltip />} />
        <Line type="linear" dataKey="amount" stroke="#eb6060" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CategoryLineChart;

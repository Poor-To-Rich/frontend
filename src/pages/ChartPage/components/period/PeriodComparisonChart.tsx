import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import PeriodSummary from '@/pages/ChartPage/components/period/PeriodSummary';
import { useTransactionTypeStore } from '@/stores/useTransactionTypeStore';
import { useReportTypeStore } from '@/stores/useReportTypeStore';

const PeriodComparisonChart = () => {
  const { currentTransactionType } = useTransactionTypeStore();
  const { currentReportType } = useReportTypeStore();
  const data = {
    extraAmount: 300,
    averageAmount: 255,
    monthlyExpenses: [
      {
        date: '2025-08',
        totalExpenseAmount: 250,
      },
      {
        date: '2025-09',
        totalExpenseAmount: 180,
      },
      {
        date: '2025-10',
        totalExpenseAmount: 500,
      },
      {
        date: '2025-11',
        totalExpenseAmount: 300,
      },
      {
        date: '2025-12',
        totalExpenseAmount: 100,
      },
      {
        date: '2025-01',
        totalExpenseAmount: 100,
      },
    ],
  };

  return (
    <div>
      <PeriodSummary
        currentTransactionType={currentTransactionType}
        currentReportType={currentReportType}
        extraAmount={data.extraAmount}
        averageAmount={data.averageAmount}
      />
      <div className="w-full h-[300px] flex justify-center items-center ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.monthlyExpenses} margin={{ top: 20, right: 10, bottom: 0, left: 10 }}>
            <XAxis
              dataKey="date"
              type="category"
              axisLine={false}
              tickLine={false}
              interval={0}
              tickFormatter={tickItem =>
                `${currentReportType === '월별' ? `${tickItem.slice(-2)}월` : `${tickItem.slice(0, 4)}`}`
              }
            />
            <YAxis type="number" hide scale="pow" exponent={0.5} domain={[1, 'auto']} />
            <Bar
              dataKey={'totalExpenseAmount'}
              label={{ position: 'top', fill: '#000000', fontSize: 14 }}
              onClick={target => console.log(target.date)}
              className="cursor-pointer">
              {data.monthlyExpenses.map((entry, index) => (
                <Cell key={entry.date} fill={index === data.monthlyExpenses.length - 1 ? '#e7f6d1' : '#E6E6E6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeriodComparisonChart;

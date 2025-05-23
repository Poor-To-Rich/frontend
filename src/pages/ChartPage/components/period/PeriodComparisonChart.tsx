import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import PeriodSummary from '@/pages/ChartPage/components/period/PeriodSummary';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import useGetBarChart from '@/hooks/apis/chart/useGetBarChart';
import useFormattedReportDate from '@/hooks/chart/useFormattedReportDate';

const PeriodComparisonChart = () => {
  const formattedDate = useFormattedReportDate();
  const { setChartHeaderDate } = useHeaderDateStore();
  const { currentTransactionType } = useTransactionReportTypeStore();
  const { currentReportType } = useReportTypeStore();

  const { data: barChartData, isFetching } = useGetBarChart(currentTransactionType, formattedDate);

  const handleBarCharClick = (date: string) => {
    setChartHeaderDate(new Date(date));
  };

  if (!barChartData || isFetching) {
    return <div>로딩중..</div>;
  }

  return (
    <div>
      <PeriodSummary
        currentTransactionType={currentTransactionType}
        currentReportType={currentReportType}
        extraAmount={barChartData.extraAmount}
        averageAmount={barChartData.averageAmount}
      />
      <div className="w-full h-[250px] flex justify-center items-center ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData.totalAmounts} margin={{ top: 20, right: 10, bottom: 0, left: 10 }}>
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
              dataKey={'totalAmount'}
              label={{ position: 'top', fill: '#000000', fontSize: 14 }}
              onClick={target => handleBarCharClick(target.date)}
              className="cursor-pointer">
              {barChartData.totalAmounts.map((entry, index) => (
                <Cell key={entry.date} fill={index === barChartData.totalAmounts.length - 1 ? '#e7f6d1' : '#E6E6E6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeriodComparisonChart;

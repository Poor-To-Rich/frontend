import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import PeriodSummary from '@/pages/ChartPage/components/period/PeriodSummary';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import useGetBarChart from '@/hooks/apis/chart/useGetBarChart';
import useFormattedReportDate from '@/hooks/chart/useFormattedReportDate';
import Skeleton from '@/components/loading/Skeleton';
import CustomXAxisTick from '@/pages/ChartPage/components/period/CustomXAxisTick';
import PeriodComparisonCustomLabel from '@/pages/ChartPage/components/period/PeriodComparisonCustomLabel';

const PeriodComparisonChart = () => {
  const formattedDate = useFormattedReportDate();
  const { setChartHeaderDate } = useHeaderDateStore();
  const { currentTransactionType } = useTransactionReportTypeStore();
  const { currentReportType } = useReportTypeStore();

  const { data: barChartData, isPending } = useGetBarChart(currentTransactionType, formattedDate);

  const handleBarCharClick = (date: string) => {
    setChartHeaderDate(new Date(date));
  };

  if (!barChartData || isPending) {
    return (
      <div className="flex flex-col grow p-5 gap-30">
        <div className="flex flex-col gap-3">
          <Skeleton width="w-[80%]" height="h-[3rem]" />
          <Skeleton width="w-1/2" height="h-[2.4rem]" />
        </div>
        <div className="flex gap-6 grow">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} width="w-1/6" height="h-[20rem]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PeriodSummary
        currentTransactionType={currentTransactionType}
        currentReportType={currentReportType}
        differenceAmount={barChartData.differenceAmount}
        averageAmount={barChartData.averageAmount}
      />
      <div className="w-full h-[250px] mb-4 flex justify-center items-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData.totalAmounts} margin={{ top: 20, right: 10, bottom: 0, left: 10 }}>
            <XAxis
              dataKey="period"
              type="category"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={props => (
                <CustomXAxisTick {...props} onClickTick={handleBarCharClick} currentReportType={currentReportType} />
              )}
            />
            <YAxis
              type="number"
              hide
              scale="pow"
              exponent={0.5}
              domain={barChartData.totalAmounts.every(entry => entry.totalAmount === 0) ? [0, 1] : [0, 'auto']}
            />
            <Bar
              dataKey={'totalAmount'}
              onClick={target => handleBarCharClick(target.period)}
              className="cursor-pointer"
              background={{ fill: '#ffffff' }}>
              {barChartData.totalAmounts.map((entry, index) => (
                <Cell
                  key={entry.period}
                  fill={index === barChartData.totalAmounts.length - 1 ? '#e7f6d1' : '#E6E6E6'}
                />
              ))}
              <LabelList
                dataKey="label"
                position="top"
                fill="#000000"
                fontSize={14}
                content={PeriodComparisonCustomLabel}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeriodComparisonChart;

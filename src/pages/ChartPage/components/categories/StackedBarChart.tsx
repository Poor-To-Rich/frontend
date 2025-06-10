import { AggregatedData, CategoryColors } from '@/types/chartTypes';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Props {
  categoryColors: CategoryColors;
  aggregatedData: AggregatedData[];
}

const StackedBarChart = ({ categoryColors, aggregatedData }: Props) => {
  const colorKeys = Object.keys(categoryColors);
  const lastIndex = colorKeys.length - 1;

  return (
    <div className="w-full h-[75px] flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[aggregatedData]}
          layout="vertical"
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          barCategoryGap={0}>
          <XAxis type="number" hide />
          <YAxis type="category" hide />
          {colorKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={categoryColors[key]}
              barSize={500}
              radius={
                colorKeys.length === 1
                  ? [10, 10, 10, 10]
                  : index === 0
                    ? [10, 0, 0, 10]
                    : index === lastIndex
                      ? [0, 10, 10, 0]
                      : [0, 0, 0, 0]
              }
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const StackedBarChart = () => {
  const categoryCharts = [
    {
      주거비: 35,
      식비: 25,
      쇼핑: 15,
      가: 8,
      나: 7,
      다: 6,
      라: 4,
    },
  ];

  const chartColors: Record<string, string> = {
    주거비: '#4A90E2',
    식비: '#7ED321',
    쇼핑: '#33dfab',
    가: '#4A90E2',
    나: '#7ED321',
    다: '#33dfab',
    라: '#4A90E2',
  };

  const colorKeys = Object.keys(chartColors);
  const lastIndex = colorKeys.length - 1;

  return (
    <div className="w-full h-[75px] flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={categoryCharts}
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
              fill={chartColors[key]}
              barSize={500}
              radius={index === 0 ? [10, 0, 0, 10] : index === lastIndex ? [0, 10, 10, 0] : [0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;

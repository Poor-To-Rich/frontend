import { LabelProps } from '@/types/chartTypes';

const PeriodComparisonCustomLabel = (props: LabelProps) => {
  const { x, y, width, value } = props;
  const numericX = Number(x);
  const numericY = Number(y);
  const numericWidth = Number(width);

  const adjustedY = value === '0원' ? 265 : numericY - 10;

  return (
    <text x={numericX + numericWidth / 2} y={adjustedY} fill="#000000" fontSize={14} textAnchor="middle">
      {value}
    </text>
  );
};

export default PeriodComparisonCustomLabel;

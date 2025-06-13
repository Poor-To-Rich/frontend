import { formatNumber } from '@/utils/number';
import { LabelProps } from 'recharts';

const CategoryBarCustomLabel = (props: LabelProps) => {
  const { x, y, width, value = 0 } = props;
  const numericX = Number(x);
  const numericY = Number(y);
  const numericWidth = Number(width);
  const radius = 10;

  const maxLength = 8;
  const truncatedValue = String(value).length > maxLength ? String(value).substring(0, maxLength) + '...' : value;

  const adjustedY = Number(value) === 0 ? 255 : numericY - radius;

  return (
    <g>
      <text
        x={numericX + numericWidth / 2}
        y={adjustedY}
        fill="#00000"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}>
        {formatNumber(truncatedValue)}
      </text>
    </g>
  );
};

export default CategoryBarCustomLabel;

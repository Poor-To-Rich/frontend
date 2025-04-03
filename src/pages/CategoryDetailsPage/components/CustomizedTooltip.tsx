import { formatNumber } from '@/utils/number';
import { TooltipProps } from 'recharts';

const CustomizedTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const value = payload[0].value === undefined ? 0 : payload[0].value;

    return (
      <div className="bg-white p-4 border border-strokeGray rounded-lg min-w-[120px] w-fit">
        <p>기간: {label}</p>
        <p className="whitespace-nowrap">금액: {formatNumber(value)}원</p>
      </div>
    );
  }

  return null;
};

export default CustomizedTooltip;

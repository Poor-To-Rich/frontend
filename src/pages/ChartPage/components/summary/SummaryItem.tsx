import { formatNumber } from '@/utils/number';

interface Props {
  title: string;
  total: number;
}

const SummaryItem = ({ title, total }: Props) => {
  return (
    <div className="flex flex-col w-1/2">
      <span>{title}</span>
      <span className="text-xl truncate">{formatNumber(total)}원</span>
    </div>
  );
};

export default SummaryItem;

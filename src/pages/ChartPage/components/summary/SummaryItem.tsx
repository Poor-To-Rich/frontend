import Skeleton from '@/components/loading/Skeleton';
import { formatNumber } from '@/utils/number';
import clsx from 'clsx';

interface Props {
  title: string;
  total?: number;
  isPending: boolean;
  onClick?: () => void;
}

const SummaryItem = ({ title, total, isPending, onClick }: Props) => {
  return (
    <div className={clsx('flex flex-col w-1/2', onClick && 'cursor-pointer hover:bg-strokeGray')} onClick={onClick}>
      <span>{title}</span>
      {(!total && total !== 0) || isPending ? (
        <Skeleton width="h-[3rem]" />
      ) : (
        <span className="text-xl truncate">{formatNumber(total)}원</span>
      )}
    </div>
  );
};

export default SummaryItem;

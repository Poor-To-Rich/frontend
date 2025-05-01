import { clsx } from 'clsx';

interface Props {
  label: '수입' | '지출' | '합계';
  amount: string;
}

const SummeryItem = ({ label, amount }: Props) => {
  return (
    <div className="flex gap-3 justify-between items-center w-1/2">
      <span className="min-w-fit">{label}: </span>
      <span
        className={clsx(
          'truncate text-md sm:text-lg',
          label === '수입' && 'text-oceanBlue',
          label === '지출' && 'text-sunsetRose',
          label === '합계' && 'text-defaultGrey',
        )}>
        {amount}원
      </span>
    </div>
  );
};

export default SummeryItem;

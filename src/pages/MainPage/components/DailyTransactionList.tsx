import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import { TransactionItemType } from '@/types/transactionTypes';
import { clsx } from 'clsx';

interface Props {
  transactions: TransactionItemType[];
  total: number;
}

const DailyTransactionList = ({ transactions, total }: Props) => {
  const isEmpty = transactions.length === 0;
  return (
    <div
      className={clsx(
        isEmpty && 'justify-center',
        'flex flex-col w-full min-h-[20rem] max-h-[25rem] items-center gap-5 border-t py-5 mb-7 border-strokeGray overflow-y-auto custom-scrollbar',
      )}>
      {isEmpty ? (
        <span className="text-defaultGrey">내역이 없습니다.</span>
      ) : (
        <>
          <div className="w-full flex flex-col items-center gap-2.5">
            {transactions.map(({ id, color, category, title, isIteration, type, cost }) => (
              <TransactionDetailItem
                key={id}
                id={id}
                color={color}
                category={category}
                title={title}
                isIteration={isIteration}
                type={type}
                cost={cost}
              />
            ))}
          </div>
          <div className="w-[95%]">
            <span className="text-[#4c4c4c] text-lg">합계 : </span>
            <span className="text-defaultGrey ">{total}원</span>
          </div>
        </>
      )}
    </div>
  );
};

export default DailyTransactionList;

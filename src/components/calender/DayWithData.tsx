import { TransactionType } from '@/types/types';

interface Props {
  transactions: TransactionType[];
  targetDate: Date;
}

// 가계부 데이터가 있는 날짜 컴포넌트
const DayWithData = ({ transactions, targetDate }: Props) => {
  const transaction = transactions.find(transaction => transaction.date.getDate() === targetDate.getDate());

  return (
    transaction && (
      <div className="flex flex-col grow justify-center max-w-[90%] text-sm">
        <span className="text-oceanBlue truncate-text">{transaction.incomesAmount.toLocaleString()}</span>
        <span className="text-sunsetRose truncate-text">{transaction.expenseAmount.toLocaleString()}</span>
      </div>
    )
  );
};

export default DayWithData;

import { DateTransactionType } from '@/types/transactionTypes';

interface Props {
  transactions: DateTransactionType[];
  targetDate: Date;
}

// 가계부 데이터가 있는 날짜 컴포넌트
const DayWithData = ({ transactions, targetDate }: Props) => {
  const transaction = transactions.find(transaction => {
    const dataDay = new Date(transaction.date);
    return dataDay.getDate() === targetDate.getDate() && dataDay.getMonth() === targetDate.getMonth();
  });

  return (
    transaction && (
      <div className="flex flex-col grow justify-center max-w-[90%] text-sm">
        <span className="text-oceanBlue truncate">{transaction.incomesAmount.toLocaleString()}</span>
        <span className="text-sunsetRose truncate">{transaction.expenseAmount.toLocaleString()}</span>
      </div>
    )
  );
};

export default DayWithData;

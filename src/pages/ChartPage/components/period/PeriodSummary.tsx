import { IncomeExpenseButtonType } from '@/types/transactionTypes';

interface Props {
  currentTransactionType: IncomeExpenseButtonType;
  date?: string;
  extraAmount: number;
  averageAmount: number;
}

const PeriodSummary = ({ currentTransactionType, date, extraAmount, averageAmount }: Props) => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default PeriodSummary;

import { transactionSchema } from '@/schemas/transactionSchema';
import { z } from 'zod';

export type TransactionType = {
  date: string;
  incomesAmount: number;
  expenseAmount: number;
};

export type MonthlyTotalTransactionType = {
  totalAmount: number;
  totalIncome: number;
  totalExpense: number;
  transactions: TransactionType[];
};

export type TransactionItemType = {
  id: number;
  color: string;
  category: string;
  title?: string | null;
  isIteration?: boolean;
  type: 'INCOME' | 'EXPENSE';
  cost: number;
};

export type DailyTransactionType = {
  totalAmount: number;
  totalIncome: number;
  totalExpense: number;
  dailyDetails: TransactionItemType[];
};

export type WeeklyDetailType = {
  date: Date;
  transactions: TransactionItemType[];
};

export type IncomeExpenseButtonType = '지출' | '수입';

export type TransactionFormDataType = z.infer<typeof transactionSchema>;

export interface SummaryItemProps {
  label: '수입' | '지출' | '합계';
  amount: string;
}

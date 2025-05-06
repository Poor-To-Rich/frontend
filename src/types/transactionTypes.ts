import { endSchema } from '@/schemas/customIterationSchema';
import { IterationActionEnum, transactionSchema } from '@/schemas/transactionSchema';
import { z } from 'zod';

export type DateTransactionType = {
  date: string;
  incomesAmount: number;
  expenseAmount: number;
};

export type MonthlyTotalTransactionType = {
  totalAmount: number;
  totalIncome: number;
  totalExpense: number;
  transactions: DateTransactionType[];
};

export type TransactionItemType = {
  id: number;
  color: string;
  category: string;
  title?: string | null;
  isIteration?: boolean;
  type: TransactionType;
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

export type TransactionType = 'INCOME' | 'EXPENSE';

export type TransactionFormDataType = z.infer<typeof transactionSchema>;

export type EndType = z.infer<typeof endSchema>;

export type IterationActionEnumType = z.infer<typeof IterationActionEnum>;

export interface SummaryItemProps {
  label: '수입' | '지출' | '합계';
  amount: string;
}

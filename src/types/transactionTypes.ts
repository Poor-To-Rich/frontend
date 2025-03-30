import { baseSchema } from '@/schemas/transactionSchema';
import { z } from 'zod';

export type TransactionType = {
  date: Date;
  incomesAmount: number;
  expenseAmount: number;
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

export type WeeklyDetailType = {
  date: Date;
  transactions: TransactionItemType[];
};

export type IncomeExpenseButtonType = '지출' | '수입';

export type TransactionFormData = z.infer<typeof baseSchema>;

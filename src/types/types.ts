import { ITERATION_CYCLE } from '@/constants/repeatSchedule';
import { baseSchema } from '@/schemas/transactionSchema';
import { z } from 'zod';

export type TransactionType = {
  date: Date;
  incomesAmount: number;
  expenseAmount: number;
};

export type OverviewLogType = {
  startDate: Date;
  endDate: Date;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
};

export type SelectOptionsType = {
  label: string;
  value: string;
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

export type TapBarType = 'main' | 'monthWeek' | 'chart' | 'talk' | 'setting';

export type VerifyButtonType = '인증' | '확인' | '중복확인';

export type IncomeExpenseButtonType = '지출' | '수입';

export type TransactionFormData = z.infer<typeof baseSchema>;

export type IterationCycleType = (typeof ITERATION_CYCLE)[number];

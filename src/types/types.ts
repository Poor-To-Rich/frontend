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

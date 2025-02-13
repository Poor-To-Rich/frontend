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

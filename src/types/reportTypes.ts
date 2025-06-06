export type ReportType = '월별' | '연별';
import { TransactionItemType } from '@/types/transactionTypes';

export type OverviewLogType = {
  period: string;
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
};

export type AnnualFinanceReportType = {
  yearTotalIncome: number;
  yearTotalExpense: number;
  yearTotalBalance: number;
  monthlyLogs: OverviewLogType[];
};

export type WeeklySummaryType = {
  weeklyLogs: OverviewLogType[];
};

export type WeeklyDetailsType = {
  date: string;
  transactions: TransactionItemType[];
};

export type WeeklyDetailsSummaryType = OverviewLogType & {
  countOfLogs: number;
  hasNext: boolean;
  nextCursor: string;
  dailyDetails: WeeklyDetailsType[];
};

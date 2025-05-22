export type ReportType = '월별' | '연별';

export type OverviewLogType = {
  startDate: string;
  endDate: string;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
};

export type AnnualFinanceReportType = {
  yearTotalIncome: number;
  yearTotalExpense: number;
  yearTotalBalance: number;
  monthlyReport: OverviewLogType[];
};

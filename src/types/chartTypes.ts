export type TickPayload = {
  value: any;
  index: number;
  coordinate: number;
};

export type ChartTotalAndSavingsType = {
  savingCategoryId: number;
  totalAmount: number;
  totalSaving: number;
};

export type AggregatedData = {
  [category: string]: number;
};

export type CategoryColors = {
  [category: string]: string;
};

export type StackedBarCategoryChartItem = {
  id: number;
  color: string;
  name: string;
  rate: number;
  amount: number;
};

export type StackedBarChartResponse = {
  aggregatedData: AggregatedData[];
  categoryColors: CategoryColors;
  categoryCharts: StackedBarCategoryChartItem[];
};

export type BarChartTotalAmountsType = {
  period: string;
  totalAmount: number;
};

export type BarChartResponse = {
  differenceAmount: string;
  averageAmount: string;
  totalAmounts: BarChartTotalAmountsType[];
};

export type BaseCategoryDetailsType = {
  period: string;
  totalAmount: number;
};

export type WeeklyAmountType = {
  period: string;
  totalAmount: number;
};

export type CategoryDetailsLineChartRes = BaseCategoryDetailsType & {
  weeklyAmounts: WeeklyAmountType[];
};

export type monthlyAmountType = {
  month: string;
  totalAmount: number;
};

export type CategoryDetailsBarChartRes = BaseCategoryDetailsType & {
  monthlyAmounts: monthlyAmountType[];
};

export type CategoryDetailsTransactionType = {
  id: number;
  title?: string;
  amount: number;
};

export type CategoryLogsType = {
  date: string;
  countOfTransactions: number;
  transactions: CategoryDetailsTransactionType[];
};

export type CategoryDetailsRes = {
  countOfLogs: number;
  hasNext: boolean;
  nextCursor: string;
  categoryLogs: CategoryLogsType[];
};

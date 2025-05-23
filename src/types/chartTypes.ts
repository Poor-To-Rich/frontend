export type TickPayload = {
  value: any;
  index: number;
  coordinate: number;
};

export type WeeklyBalanceType = {
  period: string;
  amount: number;
};

export type ChartTotalAndSavingsType = {
  savingCategoryId: number;
  totalAmount: number;
  totalSavingsAmount: number;
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

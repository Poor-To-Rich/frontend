export type TickPayload = {
  value: any;
  index: number;
  coordinate: number;
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

export type BarChartTotalAmountsType = {
  date: string;
  totalAmount: number;
};

export type BarChartResponse = {
  extraAmount: string;
  averageAmount: string;
  totalAmounts: BarChartTotalAmountsType[];
};

export type BaseCategoryDetailsType = {
  period: string;
  totalAmount: number;
};

export type WeeklyAmountType = {
  period: string;
  amount: number;
};

export type CategoryDetailsLineChartRes = BaseCategoryDetailsType & {
  weeklyAmounts: WeeklyAmountType[];
};

export type monthlyAmountType = {
  month: string;
  amount: number;
};

export type CategoryDetailsBarChartRes = BaseCategoryDetailsType & {
  monthlyAmounts: monthlyAmountType[];
};

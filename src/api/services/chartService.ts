import { fetchData } from '@/api/axios';
import {
  BarChartResponse,
  CategoryDetailsBarChartRes,
  CategoryDetailsLineChartRes,
  CategoryDetailsRes,
  ChartTotalAndSavingsType,
  StackedBarChartResponse,
} from '@/types/chartTypes';
import { endpoints } from '@/api/endpoints';

export const getExpenseTotalAndSavings = async (date: string) => {
  const res = await fetchData<undefined, ChartTotalAndSavingsType>(
    'GET',
    endpoints.chart.getExpenseTotalAndSavings(date),
  );
  return res.data;
};

export const getIncomeTotalAndSavings = async (date: string) => {
  const res = await fetchData<undefined, ChartTotalAndSavingsType>(
    'GET',
    endpoints.chart.getIncomeTotalAndSavings(date),
  );
  return res.data;
};

export const getExpenseStackedBarChart = async (date: string) => {
  const res = await fetchData<undefined, StackedBarChartResponse>(
    'GET',
    endpoints.chart.getExpenseStackedBarChart(date),
  );
  return res.data;
};

export const getIncomeStackedBarChart = async (date: string) => {
  const res = await fetchData<undefined, StackedBarChartResponse>(
    'GET',
    endpoints.chart.getIncomeStackedBarChart(date),
  );
  return res.data;
};

export const getExpenseBarChart = async (date: string) => {
  const res = await fetchData<undefined, BarChartResponse>('GET', endpoints.chart.getExpenseBarChart(date));
  return res.data;
};

export const getIncomeBarChart = async (date: string) => {
  const res = await fetchData<undefined, BarChartResponse>('GET', endpoints.chart.getIncomeBarChart(date));
  return res.data;
};

export const getCategoryDetailsLineChart = async (categoryId: string, date: string) => {
  const res = await fetchData<undefined, CategoryDetailsLineChartRes>(
    'GET',
    endpoints.chart.getLineChart(categoryId, date),
  );
  return res.data;
};

export const getCategoryDetailsBarChart = async (categoryId: string, date: string) => {
  const res = await fetchData<undefined, CategoryDetailsBarChartRes>(
    'GET',
    endpoints.chart.getVerticalBarChart(categoryId, date),
  );
  return res.data;
};

export const getCategoryLogs = async (categoryId: string, date: string, cursor: string | null) => {
  const res = await fetchData<undefined, CategoryDetailsRes>(
    'GET',
    endpoints.chart.getCategoryLogs(categoryId, date, cursor),
  );

  if (!res.data) throw new Error('No data from server');
  return res.data;
};

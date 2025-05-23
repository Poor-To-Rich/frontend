import { fetchData } from '@/api/axios';
import { BarChartResponse, ChartTotalAndSavingsType, StackedBarChartResponse } from '@/types/chartTypes';
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

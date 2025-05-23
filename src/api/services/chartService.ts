import { fetchData } from '@/api/axios';
import { ChartTotalAndSavingsType } from '@/types/chartTypes';
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

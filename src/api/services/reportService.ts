import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { AnnualFinanceReportType, WeeklyDetailsSummaryType, WeeklySummaryType } from '@/types/reportTypes';

export const getYearlySummary = async (date: string) => {
  const res = await fetchData<undefined, AnnualFinanceReportType>('GET', endpoints.report.getYearlySummary(date));
  if (!res.data) throw new Error('No data');
  return res.data;
};

export const getWeeklySummary = async (date: string) => {
  const res = await fetchData<undefined, WeeklySummaryType>('GET', endpoints.report.getWeeklySummary(date));
  return res.data?.weeklyLogs;
};

export const getWeeklyDetails = async (date: string, week: string, cursor: string | null) => {
  const res = await fetchData<undefined, WeeklyDetailsSummaryType>(
    'GET',
    endpoints.report.getWeeklyDetails(date, week, cursor),
  );
  if (!res.data) throw new Error('No data from server');
  return res.data;
};

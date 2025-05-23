import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { AnnualFinanceReportType, WeeklyDetailsSummaryType, WeeklySummaryType } from '@/types/reportTypes';

export const getYearlySummary = async (date: string) => {
  const res = await fetchData<undefined, AnnualFinanceReportType>('GET', endpoints.report.getYearlySummary(date));
  return res.data;
};

export const getWeeklySummary = async (date: string) => {
  const res = await fetchData<undefined, WeeklySummaryType>('GET', endpoints.report.getWeeklySummary(date));
  return res.data?.weeklyLogs;
};

export const getWeeklyDetails = async (date: string, week: string) => {
  const res = await fetchData<undefined, WeeklyDetailsSummaryType>(
    'GET',
    endpoints.report.getWeeklyDetails(date, week),
  );
  return res.data;
};

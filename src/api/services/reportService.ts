import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { AnnualFinanceReportType } from '@/types/reportTypes';

export const getYearlySummary = async (date: string) => {
  const res = await fetchData<undefined, AnnualFinanceReportType>('GET', endpoints.report.getYearlySummary(date));
  return res.data;
};

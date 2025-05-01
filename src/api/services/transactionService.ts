import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { DailyTransactionType, MonthlyTotalTransactionType } from '@/types/transactionTypes';

export const getMonthlyTotal = async (date: string) => {
  const res = await fetchData<undefined, MonthlyTotalTransactionType>('GET', endpoints.total.getMonthlyTotal(date));
  return res.data;
};

export const getDailyDetails = async (date: string) => {
  const res = await fetchData<undefined, DailyTransactionType>('GET', endpoints.transaction.getDailyDetails(date));
  return res.data;
};

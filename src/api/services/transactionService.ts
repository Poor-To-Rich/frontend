import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { MonthlyTotalTransactionType } from '@/types/transactionTypes';

export const getMonthlyTotal = async (date: string) => {
  const res = await fetchData<undefined, MonthlyTotalTransactionType>('GET', endpoints.total.getMonthlyTotal(date));
  return res.data;
};

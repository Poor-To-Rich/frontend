import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { DailyTransactionType, MonthlyTotalTransactionType, TransactionFormDataType } from '@/types/transactionTypes';

export const getMonthlyTotal = async (date: string) => {
  const res = await fetchData<undefined, MonthlyTotalTransactionType>('GET', endpoints.total.getMonthlyTotal(date));
  return res.data;
};

export const getDailyDetails = async (date: string) => {
  const res = await fetchData<undefined, DailyTransactionType>('GET', endpoints.transaction.getDailyDetails(date));
  return res.data;
};

export const addExpense = async (body: TransactionFormDataType) => {
  const res = await fetchData<TransactionFormDataType>('POST', endpoints.transaction.addExpense, body);
  return res;
};

export const addIncome = async (body: TransactionFormDataType) => {
  const res = await fetchData<TransactionFormDataType>('POST', endpoints.transaction.addIncome, body);
  return res;
};

import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import {
  DailyTransactionType,
  DeleteTransactionReq,
  IterationActionEnumType,
  MonthlyTotalTransactionType,
  TransactionFormDataType,
} from '@/types/transactionTypes';

export const getMonthlyTotal = async (date: string) => {
  const res = await fetchData<undefined, MonthlyTotalTransactionType>('GET', endpoints.total.getMonthlyTotal(date));
  return res.data;
};

export const getDailyDetails = async (date: string) => {
  const res = await fetchData<undefined, DailyTransactionType>('GET', endpoints.transaction.getDailyDetails(date));
  return res.data;
};

export const addExpenseTransaction = async (body: TransactionFormDataType) => {
  const res = await fetchData<TransactionFormDataType>('POST', endpoints.transaction.addExpense, body);
  return res;
};

export const addIncomeTransaction = async (body: TransactionFormDataType) => {
  const res = await fetchData<TransactionFormDataType>('POST', endpoints.transaction.addIncome, body);
  return res;
};

export const getExpenseTransaction = async (id: string) => {
  const res = await fetchData<undefined, TransactionFormDataType>('GET', endpoints.transaction.getExpense(id));
  return res.data;
};

export const getIncomeTransaction = async (id: string) => {
  const res = await fetchData<undefined, TransactionFormDataType>('GET', endpoints.transaction.getIncome(id));
  return res.data;
};

export const updateExpenseTransaction = async (id: string, body: TransactionFormDataType) => {
  const res = await fetchData<TransactionFormDataType>('PUT', endpoints.transaction.updateExpense(id), body);
  return res;
};

export const updateIncomeTransaction = async (id: string, body: TransactionFormDataType) => {
  const res = await fetchData<TransactionFormDataType>('PUT', endpoints.transaction.updateIncome(id), body);
  return res;
};

export const deleteExpenseTransaction = async ({ id, body }: { id: string; body?: DeleteTransactionReq }) => {
  const res = await fetchData<DeleteTransactionReq>('DELETE', endpoints.transaction.deleteExpense(id), body);
  return res;
};

export const deleteIncomeTransaction = async ({ id, body }: { id: string; body?: DeleteTransactionReq }) => {
  const res = await fetchData<DeleteTransactionReq>('DELETE', endpoints.transaction.deleteIncome(id), body);
  return res;
};

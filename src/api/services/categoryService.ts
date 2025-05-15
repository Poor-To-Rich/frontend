import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { DefaultCategoriesRes } from '@/types/categoryTypes';

export const getDefaultExpense = async () => {
  const res = await fetchData<undefined, DefaultCategoriesRes>('GET', endpoints.category.getDefaultExpense);
  return res.data?.defaultCategories;
};

export const getDefaultIncome = async () => {
  const res = await fetchData<undefined, DefaultCategoriesRes>('GET', endpoints.category.getDefaultIncome);
  return res.data?.defaultCategories;
};

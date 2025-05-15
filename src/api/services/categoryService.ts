import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import { ActiveCategoriesRes, CustomCategoriesRes, DefaultCategoriesRes } from '@/types/categoryTypes';

export const getActiveCategory = async (type: string) => {
  const res = await fetchData<undefined, ActiveCategoriesRes>('GET', endpoints.category.getActive(type));
  return res.data?.categories;
};

export const getDefaultExpense = async () => {
  const res = await fetchData<undefined, DefaultCategoriesRes>('GET', endpoints.category.getDefaultExpense);
  return res.data?.defaultCategories;
};

export const getDefaultIncome = async () => {
  const res = await fetchData<undefined, DefaultCategoriesRes>('GET', endpoints.category.getDefaultIncome);
  return res.data?.defaultCategories;
};

export const getCustomExpense = async () => {
  const res = await fetchData<undefined, CustomCategoriesRes>('GET', endpoints.category.getCustomExpense);
  return res.data?.customCategories;
};

export const getCustomIncome = async () => {
  const res = await fetchData<undefined, CustomCategoriesRes>('GET', endpoints.category.getCustomIncome);
  return res.data?.customCategories;
};

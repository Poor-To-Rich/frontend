import { fetchData } from '@/api/axios';
import { endpoints } from '@/api/endpoints';
import {
  ActiveCategoriesRes,
  BaseCategoriesType,
  CategoryVisibility,
  CustomCategoriesRes,
  DefaultCategoriesRes,
} from '@/types/categoryTypes';

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

export const addExpenseCategory = async (body: BaseCategoriesType) => {
  const res = await fetchData<BaseCategoriesType, undefined>('POST', endpoints.category.addExpense, body);
  return res;
};

export const addIncomeCategory = async (body: BaseCategoriesType) => {
  const res = await fetchData<BaseCategoriesType, undefined>('POST', endpoints.category.addIncome, body);
  return res;
};

export const getCategory = async (id: string) => {
  const res = await fetchData<undefined, BaseCategoriesType>('GET', endpoints.category.getCategory(id));
  return res.data;
};

export const updateCategory = async (id: string, body: BaseCategoriesType) => {
  const res = await fetchData<BaseCategoriesType, undefined>('PUT', endpoints.category.updateCategory(id), body);
  return res;
};

export const deleteCategory = async (id: string) => {
  const res = await fetchData<undefined, undefined>('DELETE', endpoints.category.deleteCategory(id));
  return res;
};

export const updateCategoryVisibility = async (id: string, body: CategoryVisibility) => {
  const res = await fetchData<CategoryVisibility, undefined>('PUT', endpoints.category.updateActive(id), body);
  return res;
};

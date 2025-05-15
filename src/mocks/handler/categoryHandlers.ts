import { endpoints } from '@/api/endpoints';
import { http, HttpResponse } from 'msw';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/options';

export const categoryHandlers = [
  http.get(endpoints.category.getDefaultExpense, () => {
    const categoryNamesWithColors = EXPENSE_CATEGORIES.map(({ value, color }) => ({
      name: value,
      color,
    }));

    return HttpResponse.json({
      status: 200,
      message: '기본 지출 카테고리가 조회되었습니다.',
      data: { defaultCategories: categoryNamesWithColors },
    });
  }),
  http.get(endpoints.category.getDefaultIncome, () => {
    const categoryNamesWithColors = INCOME_CATEGORIES.map(({ value, color }) => ({
      name: value,
      color,
    }));

    return HttpResponse.json({
      status: 200,
      message: '기본 수입 카테고리가 조회되었습니다.',
      data: { defaultCategories: categoryNamesWithColors },
    });
  }),
];

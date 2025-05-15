import { endpoints } from '@/api/endpoints';
import { http, HttpResponse } from 'msw';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/options';

export const categoryHandlers = [
  http.get('category/active', ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    if (type === 'expense') {
      const categories = ['주거비', '식비', '교통비', '쇼핑', '건강/의료', '술/유흥', '기타'];

      return HttpResponse.json({
        status: 200,
        message: '활성화된 지출 카테고리가 조회되었습니다.',
        data: { categories },
      });
    }

    if (type === 'income') {
      const categories = ['용돈', '월급', '보너스', '부수입', '기타'];

      return HttpResponse.json({
        status: 200,
        message: '활성화된 수입 카테고리가 조회되었습니다.',
        data: { categories },
      });
    }

    return HttpResponse.json({
      status: 400,
      message: '카테고리의 타입이 적절하지 않습니다.',
    });
  }),
  http.get(endpoints.category.getDefaultExpense, () => {
    const categoryNamesWithColors = EXPENSE_CATEGORIES.map(({ value, color }) => ({
      name: value,
      color,
      visibility: true,
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
      visibility: true,
    }));

    return HttpResponse.json({
      status: 200,
      message: '기본 수입 카테고리가 조회되었습니다.',
      data: { defaultCategories: categoryNamesWithColors },
    });
  }),
  http.get(endpoints.category.getCustomExpense, () => {
    const customCategories = [
      {
        id: 10,
        color: '#E7AEA5',
        name: '냠냠',
      },
      {
        id: 23,
        color: '#D58888',
        name: '쩝쩝',
      },
    ];

    return HttpResponse.json({
      status: 200,
      message: '사용자 지정 지출 카테고리가 조회되었습니다.',
      data: { customCategories },
    });
  }),

  http.get(endpoints.category.getCustomIncome, () => {
    const customCategories = [
      {
        id: 21,
        color: '#543562',
        name: '주식 배당금',
      },
    ];

    return HttpResponse.json({
      status: 200,
      message: '사용자 지정 수입 카테고리가 조회되었습니다.',
      data: { customCategories },
    });
  }),
];

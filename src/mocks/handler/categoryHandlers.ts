import { endpoints } from '@/api/endpoints';
import { http, HttpResponse, delay } from 'msw';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/options';
import { parseRequestBody } from '../utils/parseRequestBody';

export const categoryHandlers = [
  http.get('category/active', ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    if (type === 'expense') {
      const categories = ['주거비', '식비', '교통비', '쇼핑', '건강/의료', '술/유흥', '기타'];

      return HttpResponse.json(
        {
          status: 200,
          message: '활성화된 지출 카테고리가 조회되었습니다.',
          data: { categories },
        },
        { status: 200 },
      );
    }

    if (type === 'income') {
      const categories = ['용돈', '월급', '보너스', '부수입', '기타'];

      return HttpResponse.json(
        {
          status: 200,
          message: '활성화된 수입 카테고리가 조회되었습니다.',
          data: { categories },
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      {
        status: 400,
        message: '카테고리의 타입이 적절하지 않습니다.',
      },
      { status: 400 },
    );
  }),
  http.get(endpoints.category.getDefaultExpense, () => {
    const categoryNamesWithColors = EXPENSE_CATEGORIES.map(({ value, color }, index) => ({
      value: index + 10,
      name: value,
      color,
      visibility: true,
    }));

    return HttpResponse.json(
      {
        status: 200,
        message: '기본 지출 카테고리가 조회되었습니다.',
        data: { defaultCategories: categoryNamesWithColors },
      },
      { status: 200 },
    );
  }),
  http.get(endpoints.category.getDefaultIncome, () => {
    const categoryNamesWithColors = INCOME_CATEGORIES.map(({ value, color }, index) => ({
      id: index + 10,
      name: value,
      color,
      visibility: true,
    }));

    return HttpResponse.json(
      {
        status: 200,
        message: '기본 수입 카테고리가 조회되었습니다.',
        data: { defaultCategories: categoryNamesWithColors },
      },
      { status: 200 },
    );
  }),
  http.get(endpoints.category.getCustomExpense, () => {
    const customCategories = [
      {
        id: 1,
        color: '#E7AEA5',
        name: '냠냠',
      },
      {
        id: 2,
        color: '#D58888',
        name: '쩝쩝',
      },
    ];

    return HttpResponse.json(
      {
        status: 200,
        message: '사용자 지정 지출 카테고리가 조회되었습니다.',
        data: { customCategories },
      },
      { status: 200 },
    );
  }),

  http.get(endpoints.category.getCustomIncome, () => {
    const customCategories = [
      {
        id: 3,
        color: '#543562',
        name: '주식 배당금',
      },
    ];

    return HttpResponse.json(
      {
        status: 200,
        message: '사용자 지정 수입 카테고리가 조회되었습니다.',
        data: { customCategories },
      },
      { status: 200 },
    );
  }),

  http.post(endpoints.category.addExpense, async ({ request }) => {
    const { name } = await parseRequestBody<{ name: string }>(request);
    await delay(2000);

    if (name === '냠냠' || name === '쩝쩝') {
      return HttpResponse.json(
        {
          status: 409,
          message: '이미 사용중인 카테고리 이름입니다.',
        },
        { status: 409 },
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '카테고리를 성공적으로 등록하였습니다.',
      },
      { status: 200 },
    );
  }),

  http.post(endpoints.category.addIncome, async ({ request }) => {
    const { name } = await parseRequestBody<{ name: string }>(request);
    await delay(2000);

    if (name === '주식 배당금') {
      return HttpResponse.json(
        {
          status: 409,
          message: '이미 사용중인 카테고리 이름입니다.',
        },
        { status: 409 },
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '카테고리를 성공적으로 등록하였습니다.',
      },
      { status: 200 },
    );
  }),

  http.get('/category/:id', ({ params }) => {
    const { id } = params;

    if (id === '1') {
      return HttpResponse.json(
        {
          status: 200,
          message: `${id}번 카테고리가 조회되었습니다.`,
          data: {
            color: '#E7AEA5',
            name: '냠냠',
          },
        },
        { status: 200 },
      );
    }

    if (id === '2') {
      return HttpResponse.json(
        {
          status: 200,
          message: `${id}번 카테고리가 조회되었습니다.`,
          data: {
            color: '#D58888',
            name: '쩝쩝',
          },
        },
        { status: 200 },
      );
    }

    if (id === '3') {
      return HttpResponse.json(
        {
          status: 200,
          message: `${id}번 카테고리가 조회되었습니다.`,
          data: {
            color: '#543562',
            name: '주식 배당금',
          },
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      {
        status: 404,
        message: '존재하지 않는 카테고리입니다.',
      },
      { status: 404 },
    );
  }),

  http.put('/category/:id', async ({ request }) => {
    const { name } = await parseRequestBody<{ name: string }>(request);

    if (name === '냠냠' || name === '쩝쩝' || name === '주식 배당금') {
      return HttpResponse.json(
        {
          status: 409,
          message: '이미 사용중인 카테고리 이름입니다.',
        },
        { status: 409 },
      );
    }
    return HttpResponse.json(
      {
        status: 201,
        message: '카테고리를 성공적으로 편집하였습니다.',
      },
      { status: 201 },
    );
  }),

  http.delete('/category/:id', () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '카테고리를 성공적으로 삭제하였습니다.',
      },
      { status: 200 },
    );
  }),
];

import { endpoints } from '@/api/endpoints';
import { http, HttpResponse } from 'msw';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/options';
import { parseRequestBody } from '../utils/parseRequestBody';

const ExpenseCategories = EXPENSE_CATEGORIES.map(({ value, color }, index) => ({
  id: index + 10,
  name: value,
  color,
  visibility: true,
}));

const IncomeCategories = INCOME_CATEGORIES.map(({ value, color }, index) => ({
  id: index + 30,
  name: value,
  color,
  visibility: true,
}));

export const categoryHandlers = [
  http.get('category/active', async ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    if (type === 'expense') {
      const activeCategories = ['식비', '선물/경조사', '교통비', '쇼핑', '건강/의료', '술/유흥', '기타'];

      return HttpResponse.json(
        {
          status: 200,
          message: '활성화된 지출 카테고리가 조회되었습니다.',
          data: { activeCategories },
        },
        { status: 200 },
      );
    }

    if (type === 'income') {
      const activeCategories = ['용돈', '월급', '보너스', '부수입', '기타'];

      return HttpResponse.json(
        {
          status: 200,
          message: '활성화된 수입 카테고리가 조회되었습니다.',
          data: { activeCategories },
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
  http.get(endpoints.category.getDefaultExpense, async () => {
    return HttpResponse.json(
      {
        status: 404,
        message: '기본 지출 카테고리가 조회되었습니다.',
        data: { defaultCategories: ExpenseCategories },
      },
      { status: 404 },
    );
  }),
  http.get(endpoints.category.getDefaultIncome, () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '기본 수입 카테고리가 조회되었습니다.',
        data: { defaultCategories: IncomeCategories },
      },
      { status: 200 },
    );
  }),
  http.get(endpoints.category.getCustomExpense, async () => {
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

  http.delete('/category/:id', async () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '카테고리를 성공적으로 삭제하였습니다.',
      },
      { status: 200 },
    );
  }),

  http.put('/category/active/:id', async ({ params, request }) => {
    const id = params.id as string;
    const { visibility } = await parseRequestBody<{ visibility: boolean }>(request);

    const category =
      ExpenseCategories.find(cat => String(cat.id) === id) || IncomeCategories.find(cat => String(cat.id) === id);
    if (!category) {
      return HttpResponse.json({ message: '카테고리를 찾을 수 없습니다.' }, { status: 404 });
    }

    category.visibility = visibility;

    return HttpResponse.json(
      {
        status: 200,
        message: visibility ? '카테고리를 성공적으로 활성화하였습니다.' : '카테고리를 성공적으로 비활성화하였습니다.',
      },
      { status: 200 },
    );
  }),
];

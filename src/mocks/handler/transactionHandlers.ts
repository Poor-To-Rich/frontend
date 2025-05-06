import { delay, http, HttpResponse } from 'msw';
import { createRandomAmount } from '../utils/createMockTransaction';
import { endpoints } from '@/api/endpoints';

export const transactionHandlers = [
  http.get('/report/daily/details', async ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    const details = [
      {
        id: 1,
        color: '#ff55ad',
        category: '식비',
        title: '상하이버거세트',
        isIteration: true,
        type: 'EXPENSE',
        cost: 4562654688,
      },
      {
        id: 2,
        color: '#9ADEF1',
        category: '용돈',
        title: '용돈이지롱',
        type: 'INCOME',
        cost: 12678689,
      },
      {
        id: 3,
        color: '#FDB248',
        category: '교통비',
        title: '',
        type: 'INCOME',
        cost: 546548,
      },
    ];

    const response = {
      totalExpense: createRandomAmount(),
      totalIncome: createRandomAmount(),
      totalAmount: createRandomAmount(),
      dailyDetails: details,
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 일별 가계부 내역이 조회 되었습니다.`,
        data: { ...response },
      },
      { status: 200 },
    );
  }),
  http.post(endpoints.transaction.addExpense, async () => {
    await delay(3000);

    return HttpResponse.json(
      {
        status: 201,
        message: `지출 가계부를 성공적으로 등록하였습니다.`,
      },
      { status: 201 },
    );
  }),
  http.post(endpoints.transaction.addIncome, async () => {
    await delay(3000);

    return HttpResponse.json(
      {
        status: 201,
        message: `수입 가계부를 성공적으로 등록하였습니다.`,
      },
      { status: 201 },
    );
  }),
  http.get('/expense/:id', async ({ params }) => {
    const { id } = params;
    const response = {
      date: '2025-02-09',
      name: '주거비',
      title: '월세',
      cost: 30000,
      paymentMethod: '계좌이체',
      memo: '이응',
      iterationType: 'custom',
      customIteration: {
        iterationRule: {
          type: 'weekly',
          daysOfWeek: ['월', '금'],
        },
        interval: 2,
        end: {
          type: 'until',
          date: '2025-05-01',
        },
      },
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${id}번 가계부가 성공적으로 조회되었습니다.`,
        data: response,
      },
      { status: 200 },
    );
  }),
  http.get('/income/:id', async ({ params }) => {
    const { id } = params;
    const response = {
      date: '2025-02-09',
      name: '용돈',
      title: '용돈',
      cost: 300000,
      memo: '엄마가 줌',
      iterationType: 'none',
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${id}번 가계부가 성공적으로 조회되었습니다.`,
        data: response,
      },
      { status: 200 },
    );
  }),
  http.put('/expense/:id', async ({ params }) => {
    await delay(3000);
    const { id } = params;

    return HttpResponse.json(
      {
        status: 201,
        message: `${id}번 가계부를 성공적으로 수정하였습니다.`,
      },
      { status: 201 },
    );
  }),
  http.put('/income/:id', async ({ params }) => {
    await delay(3000);
    const { id } = params;

    return HttpResponse.json(
      {
        status: 201,
        message: `${id}번 가계부를 성공적으로 수정하였습니다.`,
      },
      { status: 201 },
    );
  }),
  http.delete('/expense/:id', async ({ params }) => {
    await delay(3000);
    const { id } = params;

    return HttpResponse.json(
      {
        status: 200,
        message: `${id}번 가계부를 성공적으로 삭제하였습니다.`,
      },
      { status: 200 },
    );
  }),
  http.delete('/income/:id', async ({ params }) => {
    await delay(3000);
    const { id } = params;

    return HttpResponse.json(
      {
        status: 200,
        message: `${id}번 가계부를 성공적으로 삭제하였습니다.`,
      },
      { status: 200 },
    );
  }),
];

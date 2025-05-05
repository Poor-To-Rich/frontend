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
];

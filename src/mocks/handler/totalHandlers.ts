import { http, HttpResponse } from 'msw';
import {
  createMockMonthlyTransactions,
  createMockWeeklySummary,
  createMockYearlySummary,
  createRandomAmount,
} from '@/mocks/utils/createMockTransaction';
import { format } from 'date-fns';

export const totalHandlers = [
  http.get('/report/monthly/total', async ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const isYearMonthlyFormat = /^\d{4}-\d{2}$/.test(date ?? '');

    let response = {};
    const expense = createRandomAmount();
    const income = createRandomAmount();

    if (isYearMonthlyFormat) {
      response = {
        totalAmount: income - expense,
        totalIncome: income,
        totalExpense: expense,
        transactions: createMockMonthlyTransactions(date || format(new Date(), 'yyyy-MM-dd')),
      };
    } else {
      response = {
        yearTotalIncome: income,
        yearTotalExpense: expense,
        yearTotalBalance: income - expense,
        monthlyReport: createMockYearlySummary(date || format(new Date(), 'yyyy')),
      };
    }

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 가계부 내역이 조회 되었습니다.`,
        data: response,
      },
      { status: 200 },
    );
  }),

  http.get('/report/weekly/total', async ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const targetDate = new Date(date || '');

    const response = {
      weeklyLogs: createMockWeeklySummary(targetDate),
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 주차별 가계부 내역이 조회 되었습니다.`,
        data: response,
      },
      { status: 200 },
    );
  }),

  http.get('/report/weekly/details', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const week = url.searchParams.get('week');

    const expense = createRandomAmount();
    const income = createRandomAmount();

    const response = {
      startDate: '2024-12-27',
      endDate: '2025-01-04',
      totalBalance: income - expense,
      totalIncome: income,
      totalExpense: expense,
      dailyDetails: [
        {
          date: '2025-01-01',
          transactions: [
            {
              id: 5,
              color: '#FDB248',
              category: '식비',
              title: '상하이 치킨 버거',
              isIteration: false,
              type: 'EXPENSE',
              cost: 8400,
            },
            {
              id: 7,
              color: '#FDB248',
              category: '식비',
              title: '상하이 치킨 버거',
              isIteration: false,
              type: 'EXPENSE',
              cost: 8400,
            },
          ],
        },
        {
          date: '2025-01-04',
          transactions: [
            {
              id: 9,
              color: '#FDB248',
              category: '식비',
              title: '상하이 치킨 버거',
              isIteration: false,
              type: 'EXPENSE',
              cost: 8400,
            },
            {
              id: 10,
              color: '#FDB248',
              category: '식비',
              title: '상하이 치킨 버거',
              isIteration: false,
              type: 'EXPENSE',
              cost: 8400,
            },
          ],
        },
      ],
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} ${week}주차 상세 가계부 내역이 조회 되었습니다.`,
        data: response,
      },
      { status: 200 },
    );
  }),
];

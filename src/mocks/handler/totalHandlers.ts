import { delay, http, HttpResponse } from 'msw';
import {
  createMockMonthlyTransactions,
  createMockWeeklySummary,
  createMockYearlySummary,
  createRandomAmount,
} from '@/mocks/utils/createMockTransaction';
import { format } from 'date-fns';
import { generateDate } from '@/mocks/utils/createMockTransaction';

export const totalHandlers = [
  http.get('/report/monthly/total', async ({ request }) => {
    await delay(5000);
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    let response = {};
    const expense = createRandomAmount();
    const income = createRandomAmount();

    response = {
      totalAmount: income - expense,
      totalIncome: income,
      totalExpense: expense,
      transactions: createMockMonthlyTransactions(date || format(new Date(), 'yyyy-MM-dd')),
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 가계부 내역이 조회 되었습니다.`,
        data: response,
      },
      { status: 200 },
    );
  }),

  http.get('/report/yearly/total', async ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    let response = {};
    const expense = createRandomAmount();
    const income = createRandomAmount();

    response = {
      yearTotalIncome: income,
      yearTotalExpense: expense,
      yearTotalBalance: income - expense,
      monthlyLogs: createMockYearlySummary(date || format(new Date(), 'yyyy')),
    };

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

  http.get('/report/weekly/details', async ({ request }) => {
    const TOTAL_LOGS = 1;
    const PAGE_SIZE = 1;

    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const week = url.searchParams.get('week');
    const cursor = url.searchParams.get('cursor');
    const startIndex = cursor ? parseInt(cursor, 10) : 0;
    const endIndex = startIndex + PAGE_SIZE;

    const expense = createRandomAmount();
    const income = createRandomAmount();

    const generateLog = (index: number) => ({
      date: generateDate(index),
      countOfTransactions: 2,
      transactions: [
        {
          id: 5,
          color: '#FDB248',
          categoryName: '식비',
          title: '상하이 치킨 버거',
          isIteration: false,
          type: 'EXPENSE',
          cost: 8400,
        },
        {
          id: 7,
          color: '#FDB248',
          categoryName: '식비',
          title: '불닭볶음면',
          isIteration: false,
          type: 'EXPENSE',
          cost: 5000,
        },
      ],
    });

    const dailyDetails = Array.from({ length: Math.min(PAGE_SIZE, TOTAL_LOGS - startIndex) }, (_, i) =>
      generateLog(startIndex + i),
    );

    const hasNext = endIndex < TOTAL_LOGS;
    const nextCursor = hasNext ? String(endIndex) : '';

    const response = {
      period: '24.12.29 ~ 25.01.04',
      totalAmount: income - expense,
      totalIncome: income,
      totalExpense: expense,
      countOfLogs: TOTAL_LOGS,
      hasNext,
      nextCursor,
      dailyDetails,
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

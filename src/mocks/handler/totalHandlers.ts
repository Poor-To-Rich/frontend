import { http, HttpResponse } from 'msw';
import { createMockMonthlyTransactions, createRandomAmount } from '../utils/createRandomValue';
import { format } from 'date-fns';

export const totalHandlers = [
  http.get('/report/monthly/total', async ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    const response = {
      totalAmount: createRandomAmount(),
      totalIncome: createRandomAmount(),
      totalExpense: createRandomAmount(),
      transactions: createMockMonthlyTransactions(date || format(new Date(), 'yyyy-MM-dd')),
    };

    return HttpResponse.json({ status: 200, message: `${date} 가계부 내역이 조회 되었습니다.`, data: { ...response } });
  }),
];

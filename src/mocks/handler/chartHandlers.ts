import { http, HttpResponse } from 'msw';

export const chartHandlers = [
  http.get('/chart/expense/total', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 지출 및 저축 금액 조회 성공`,
        data: {
          savingCategoryId: 1,
          totalAmount: 10000000,
          totalSavingsAmount: 4536456,
        },
      },
      { status: 200 },
    );
  }),

  http.get('/chart/income/total', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 수입 및 저축 금액 조회 성공`,
        data: {
          savingCategoryId: 2,
          totalAmount: 5465465,
          totalSavingsAmount: 2313225,
        },
      },
      { status: 200 },
    );
  }),
];

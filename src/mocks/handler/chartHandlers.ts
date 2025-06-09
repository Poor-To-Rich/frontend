import { delay, http, HttpResponse } from 'msw';
import { createMockChart } from '@/mocks/utils/createMockChart';

export const chartHandlers = [
  http.get('/chart/expense/total', async ({ request }) => {
    await delay(5000);
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 지출 및 저축 금액 조회 성공`,
        data: {
          savingCategoryId: 1,
          totalAmount: 546546546,
          totalSaving: 0,
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
          totalAmount: 2132447,
          totalSaving: 2313225,
        },
      },
      { status: 200 },
    );
  }),

  http.get('/chart/category/expense', async ({ request }) => {
    await delay(5000);
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    const response = {
      aggregatedData: {
        주거비: 35.0,
        식비: 25.0,
        쇼핑: 15.0,
        '건강/의료': 8.0,
        '문화/취미': 7.0,
        커피: 6.0,
        기타: 4.0,
      },

      categoryColors: {
        주거비: '#4A90E2',
        식비: '#7ED321',
        쇼핑: '#FF6F61',
        '건강/의료': '#4A90E2',
        '문화/취미': '#E563FF',
        커피: '#B88A69',
        기타: '#ADADAD',
      },
      categoryCharts: [
        {
          id: 1,
          color: '#4A90E2',
          name: '주거비',
          rate: 35.0,
          amount: 270000,
        },
        {
          id: 2,
          color: '#7ED321',
          name: '식비',
          rate: 25.0,
          amount: 220000,
        },
        {
          id: 3,
          color: '#FF6F61',
          name: '쇼핑',
          rate: 15.0,
          amount: 100000,
        },
      ],
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 지출 카테고리별 비율 및 총 금액 조회 성공`,
        data: response,
      },
      { status: 200 },
    );
  }),

  http.get('/chart/category/income', async ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    const response = {
      aggregatedData: [
        {
          월급: 35.0,
          보너스: 25.0,
          용돈: 23.0,
          비상금: 13.0,
          기타: 4.0,
        },
      ],
      categoryColors: {
        월급: '#228B22',
        보너스: '#7ED321',
        용돈: '#E5D038',
        비상금: '#33dfab',
        기타: '#ADADAD',
      },
      categoryCharts: [
        {
          id: 1,
          color: '#228B22',
          name: '월급',
          rate: 35.0,
          amount: 270000,
        },
        {
          id: 2,
          color: '#7ED321',
          name: '보너스',
          rate: 25.0,
          amount: 220000,
        },
        {
          id: 3,
          color: '#E5D038',
          name: '용돈',
          rate: 15.0,
          amount: 100000,
        },
      ],
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 수입 카테고리별 비율 및 총 금액 조회 성공`,
        data: response,
      },
      { status: 200 },
    );
  }),

  http.get('/chart/expense/bar', async ({ request }) => {
    await delay(5000);
    const url = new URL(request.url);
    const date = url.searchParams.get('date') ?? '';
    const isYearMonthlyFormat = /^\d{4}-\d{2}$/.test(date);

    const response = {
      differenceAmount: '10만원 덜',
      averageAmount: '316만원',
      totalAmounts: createMockChart(date, isYearMonthlyFormat),
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 지출 막대그래프 조회 성공`,
        data: response,
      },
      { status: 200 },
    );
  }),

  http.get('/chart/income/bar', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') ?? '';
    const isYearMonthlyFormat = /^\d{4}-\d{2}$/.test(date);

    const response = {
      differenceAmount: '200만원 더',
      averageAmount: '420만원',
      totalAmounts: createMockChart(date, isYearMonthlyFormat),
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 수입 막대그래프 조회 성공`,
        data: response,
      },
      { status: 200 },
    );
  }),

  http.get('/chart/:categoryId/line', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') ?? '';

    const response = {
      period: '25.01.01~25.01.31',
      totalAmount: 5467685412,
      weeklyAmounts: [
        {
          period: '01.01~01.06',
          totalAmount: 123569,
        },
        {
          period: '01.07~01.13',
          totalAmount: 213545,
        },
        {
          period: '01.14~01.20',
          totalAmount: 222,
        },
        {
          period: '01.21~01.27',
          totalAmount: 21245,
        },
        {
          period: '01.28~01.31',
          totalAmount: 120000,
        },
      ],
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 꺾은선 그래프 조회 성공`,
        data: response,
      },
      { status: 200 },
    );
  }),

  http.get('/chart/:categoryId/vertical', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') ?? '';

    const response = {
      period: '25.01.01~25.12.31',
      totalAmount: 132435,
      monthlyAmounts: [
        { month: '1월', totalAmount: 11000 },
        { month: '2월', totalAmount: 9000 },
        { month: '3월', totalAmount: 15000 },
        { month: '4월', totalAmount: 8000 },
        { month: '5월', totalAmount: 11000 },
        { month: '6월', totalAmount: 9500 },
        { month: '7월', totalAmount: 1400 },
        { month: '8월', totalAmount: 10000 },
        { month: '9월', totalAmount: 1300 },
        { month: '10월', totalAmount: 0 },
        { month: '11월', totalAmount: 12500 },
        { month: '12월', totalAmount: 8500 },
      ],
    };

    return HttpResponse.json(
      {
        status: 200,
        message: `${date} 수직 막대그래프 조회 성공`,
        data: response,
      },
      { status: 200 },
    );
  }),
];

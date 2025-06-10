import { CategoryDetailsRes, CategoryLogsType } from '@/types/chartTypes';
import { http, HttpResponse } from 'msw';
import { generateDate } from '@/mocks/utils/createMockTransaction';

const TOTAL_LOGS = 50;
const PAGE_SIZE = 5;

const generateLog = (index: number): CategoryLogsType => ({
  date: generateDate(index),
  countOfTransactions: 2,
  transactions: [
    { id: index * 2 + 1, title: `지출 ${index * 2 + 1}`, amount: 1000 + index * 100 },
    { id: index * 2 + 2, title: `지출 ${index * 2 + 2}`, amount: 2000 + index * 100 },
  ],
});

export const categoryLogsHandler = http.get('/chart/:categoryId/section', async ({ request }) => {
  const url = new URL(request.url);
  const cursor = url.searchParams.get('cursor');
  const startIndex = cursor ? parseInt(cursor, 10) : 0;
  const endIndex = startIndex + PAGE_SIZE;

  const categoryLogs: CategoryLogsType[] = Array.from(
    { length: Math.min(PAGE_SIZE, TOTAL_LOGS - startIndex) },
    (_, i) => generateLog(startIndex + i),
  );

  const hasNext = endIndex < TOTAL_LOGS;
  const nextCursor = hasNext ? String(endIndex) : '';

  const response: CategoryDetailsRes = {
    countOfLogs: TOTAL_LOGS,
    hasNext,
    nextCursor,
    categoryLogs,
  };

  return HttpResponse.json({
    status: 200,
    message: '카테고리 구간 내역 조회 성공',
    data: response,
  });
});

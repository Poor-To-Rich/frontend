import { subDays, format, subYears } from 'date-fns';

export const createMockChart = (date: string, isYearMonthlyFormat: boolean) => {
  const boundary = isYearMonthlyFormat ? 500 : 5000;
  const pattern = isYearMonthlyFormat ? 'yyyy-MM' : 'yyyy';
  let targetDate = isYearMonthlyFormat ? format(new Date(date), pattern) : format(new Date(date), pattern);

  const result = [];

  for (let i = 0; i < 5; i++) {
    result.push({
      period: targetDate,
      totalAmount: Math.floor(Math.random() * boundary + 1),
    });

    const formattedDate = isYearMonthlyFormat
      ? format(subDays(new Date(targetDate), 1), pattern)
      : format(subYears(new Date(targetDate), 1), pattern);

    targetDate = formattedDate;
  }

  return result.reverse();
};

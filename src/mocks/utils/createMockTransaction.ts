import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  lastDayOfMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export const createRandomAmount = () => {
  return Math.floor(Math.random() * 1000000000000);
};

export const createMockMonthlyTransactions = (date: string) => {
  const result = [];
  const usedDays = new Set();
  const length = Math.floor(Math.random() * 28);

  while (usedDays.size < length) {
    const day = Math.floor(Math.random() * 28) + 1;

    if (usedDays.has(day)) continue;

    usedDays.add(day);

    result.push({
      date: `${date}-${day}`,
      incomesAmount: createRandomAmount(),
      expenseAmount: createRandomAmount(),
    });
  }

  return result;
};

export const createMockYearlySummary = (date: string) => {
  const result = [];

  for (let i = 1; i <= 12; i++) {
    const paddedMonth = String(i).padStart(2, '0');
    const startDate = `${date}-${paddedMonth}-01`;

    const end = lastDayOfMonth(new Date(`${startDate}T00:00:00`));
    const endDate = format(end, 'yyyy-MM-dd');

    const totalIncome = createRandomAmount();
    const totalExpense = createRandomAmount();

    result.push({
      period: `${format(startDate, 'MM.dd')}~${format(endDate, 'MM.dd')}`,
      totalIncome,
      totalExpense,
      totalAmount: totalIncome - totalExpense,
    });
  }

  return result;
};

export const createMockWeeklySummary = (date: Date) => {
  const result = [];

  const monthStartDate = startOfWeek(startOfMonth(date));
  const monthEndDate = endOfWeek(endOfMonth(date));
  let startDate = monthStartDate;
  let endDate = addDays(startDate, 6);

  while (isBefore(startDate, monthEndDate) || isSameDay(startDate, monthEndDate)) {
    const totalIncome = createRandomAmount();
    const totalExpense = createRandomAmount();

    result.push({
      period: `${format(startDate, 'MM.dd')}~${format(endDate, 'MM.dd')}`,
      totalIncome: totalIncome,
      totalExpense: totalExpense,
      totalAmount: totalIncome - totalExpense,
    });
    startDate = addDays(endDate, 1);
    endDate = addDays(startDate, 6);
  }

  return result;
};

export const generateDate = (index: number) => {
  const date = new Date();
  date.setDate(date.getDate() - index);
  return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};
